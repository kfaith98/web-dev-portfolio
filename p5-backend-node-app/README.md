# On The Books — Backend API

On The Books is an event organizer's command center for managing supplier
bookings across multiple events. This project is the backend API, built with
Node, Express, and MongoDB, providing persistent data, user authentication,
authorization, and AI-powered supplier recommendations.

The API is built around four resources: Users own Events, Suppliers form a
shared pool, and Arrangements connect Suppliers to Events. An Arrangement
stores what is specific to that booking, such as the negotiated budget,
booking status, and notes. The core design decision is that a supplier's name
and category belong to the supplier, while "quoted ₱45,000, status declined"
belongs to the arrangement.

**Live API:** https://onthebooks-backend.onrender.com
**Live app:** https://onthebooks-fullstack.onrender.com

> Hosted on Render's free tier — the API spins down after inactivity, so the
> first request may take up to a minute to respond.

---

## Tech stack

| Layer                 | Technology                               |
| --------------------- | ---------------------------------------- |
| Runtime               | Node.js                                  |
| Framework             | Express 5                                |
| Database              | MongoDB Atlas                            |
| ODM                   | Mongoose 9                               |
| Authentication        | JSON Web Tokens (`jsonwebtoken`)         |
| Password hashing      | `bcryptjs`                               |
| AI recommendations    | Google Gemini 2.5 Flash (native `fetch`) |
| Security / middleware | `cors`, `helmet`, `dotenv`               |
| Frontend              | React (Vite), React Router, `useReducer` |
| Deployment            | Render (Web Service + Static Site)       |

---

## Getting started

### Prerequisites

- Node.js 18 or higher (the API uses the global `fetch`, available from 18)
- A MongoDB Atlas cluster (or a local MongoDB instance)
- A Google Gemini API key

### Installation

```bash
# Clone the repository and check out the project branch
git clone <repo-url>
cd p5-backend-node-app
git checkout p5-backend-node-app

# Install backend dependencies
npm install

# Create your environment file (see Environment variables below)
cp .env.example .env

# Start the API in development
npm run dev
```

The API runs at `http://localhost:8000`.

### Running the frontend

```bash
cd client
npm install
npm run dev
```

The React app runs at `http://localhost:5173`.

---

## Environment variables

Create a `.env` file in the project root. Never commit it.

| Variable         | Description                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PORT`           | Port the Express server listens on (e.g. `8000`)                                                                                                                                           |
| `MONGODB_URI`    | MongoDB connection string. Uses the **non-SRV** format — SRV lookups fail on some networks.                                                                                                |
| `JWT_SECRET`     | Secret used to sign JSON Web Tokens. Generate one with:<br>`node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`                                                      |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`)                                                                                                                                                                 |
| `GEMINI_API_KEY` | Google Gemini API key for the recommendations endpoint                                                                                                                                     |
| `CLIENT_URL`     | Frontend origin, used for the CORS allowlist. `http://localhost:5173` in development; the deployed frontend URL in production. Must have **no trailing slash** — origin matching is exact. |

---

## API endpoints

All routes are prefixed with `/api/v1`. Every route except register and login
requires a valid JWT sent as `Authorization: Bearer <token>`.

### Authentication

| #   | Method | Endpoint         | Description                             | Status codes    |
| --- | ------ | ---------------- | --------------------------------------- | --------------- |
| 1   | POST   | `/auth/register` | Creates a user with a hashed password.  | 201 · 400 · 409 |
| 2   | POST   | `/auth/login`    | Verifies credentials and returns a JWT. | 200 · 400 · 401 |

### Users

| #   | Method | Endpoint    | Description                                                             | Status codes |
| --- | ------ | ----------- | ----------------------------------------------------------------------- | ------------ |
| 3   | GET    | `/users/me` | Returns the logged-in user, identified from the token.                  | 200 · 401    |
| 4   | PUT    | `/users/me` | Updates the account, or soft deletes it by setting `isActive` to false. | 200 · 401    |

### Events

| #   | Method | Endpoint                           | Description                                                                                                                               | Status codes          |
| --- | ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 5   | GET    | `/events`                          | Returns all active events owned by the logged-in user.                                                                                    | 200 · 401             |
| 6   | POST   | `/events`                          | Creates an event owned by the logged-in user.                                                                                             | 201 · 400 · 401       |
| 7   | GET    | `/events/:id`                      | Returns a single active event.                                                                                                            | 200 · 401 · 404       |
| 8   | PUT    | `/events/:id`                      | Edits an event, or soft deletes it by setting `isActive` to false.                                                                        | 200 · 400 · 401 · 404 |
| 9   | POST   | `/events/:eventId/recommendations` | Takes a plain-language description and returns AI-recommended suppliers, informed by the event's existing arrangements. Nothing is saved. | 200 · 400 · 401 · 404 |

### Arrangements

| #   | Method | Endpoint                            | Description                                                                                                         | Status codes          |
| --- | ------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 10  | GET    | `/events/:eventId/arrangements`     | Returns the event's arrangements with supplier details populated.  | 200 · 401 · 404       |
| 11  | POST   | `/events/:eventId/arrangements`     | Creates an arrangement linking a supplier to the event.                                                             | 201 · 400 · 401 · 404 |
| 12  | PUT    | `/events/:eventId/arrangements/:id` | Edits the budget, status, or notes for that supplier at that event.                                                 | 200 · 400 · 401 · 404 |
| 13  | DELETE | `/events/:eventId/arrangements/:id` | Permanently removes the arrangement and returns the deleted document. The supplier record itself is untouched.      | 200 · 401 · 404       |

### Suppliers

| #   | Method | Endpoint         | Description                                                                                            | Status codes          |
| --- | ------ | ---------------- | ------------------------------------------------------------------------------------------------------ | --------------------- |
| 14  | GET    | `/suppliers`     | Returns all active suppliers from the shared pool. Optional `?category=` filters by category.          | 200 · 401             |
| 15  | POST   | `/suppliers`     | Adds a supplier to the shared pool.                                                                    | 201 · 400 · 401       |
| 16  | PUT    | `/suppliers/:id` | Edits a supplier, or soft deletes it by setting `isActive` to false. Affects all users and all events. | 200 · 400 · 401 · 404 |

### Notes on the endpoint design

- **Endpoints 2 and 9 are reads that use POST.** Both send a payload in the
  request body and neither creates a stored record; GET requests cannot carry
  a body.
- **Endpoint 13 is the only hard delete.** Arrangement has no `isActive` field
  by design — removing a supplier from an event's shortlist is a correction,
  not something that needs recovery. It returns **200 with the deleted
  document** rather than 204, so the client can confirm exactly what was
  removed.
- **Suppliers are a shared pool with no `ownerId`,** so endpoint 16 affects
  every user. This is a deliberate tradeoff: in the events industry the same
  suppliers circulate among producers, so whoever learns of a change first
  updates it for everyone.
- **The recommendations endpoint degrades gracefully.** If the AI provider
  fails or times out, the endpoint still returns 200 with `suggestions: null`
  rather than a 500, so a third-party outage never breaks the page.
- **Constrained values.** `category` accepts twelve fixed values and `status`
  accepts four — `contacted`, `quoted`, `booked`, `declined`. Anything outside
  those sets is rejected with 400.

---
## Known limitations and design tradeoffs

The current implementation has several known limitations. These are deliberate
tradeoffs in the current scope and data model, rather than unknown gaps.

- **Shared supplier pool, no per-user ownership.** Suppliers do not have an
ownerId, so any authenticated user can create or edit any supplier in the
shared pool. This is intentional: suppliers are treated as organization-wide
resources rather than user-owned records. The tradeoff is that there is no
per-user isolation on the supplier collection, and a supplier update is
visible to all users and any events using that supplier.

- **Add Supplier is not transactional.** Adding a supplier and creating its
initial arrangement are currently two sequential requests: the supplier is
created first, followed by the arrangement. If the second request fails, the
supplier remains in the shared pool without a booking attached. The
appropriate fix would be to wrap both operations in a MongoDB transaction so
they either both succeed or both roll back.

- **Create-new supplier flow, no pool picker.** The Add Supplier form currently
always creates a new supplier rather than allowing the user to select an
existing supplier from the shared pool. There is also no UI for soft-deleting
suppliers. As a result, duplicate supplier records can accumulate. This
keeps the current flow simple, but a future iteration could add supplier
selection and a management interface for maintaining the shared pool.

## Project structure

```
p5-backend-node-app/
├── client/                          # React frontend (Vite)
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
├── config/
│   └── db.js                        # Mongoose connection
├── controllers/
│   ├── arrangementController.js
│   ├── authController.js
│   ├── eventController.js
│   ├── recommendationController.js
│   ├── supplierController.js
│   └── userController.js
├── docs/                            # Planning artifacts — proposal, ERD
├── middleware/
│   ├── authMiddleware.js            # Protects routes, attaches req.user
│   └── errorMiddleware.js           # Centralized error handling
├── models/
│   ├── Arrangement.js
│   ├── Event.js
│   ├── Supplier.js
│   └── User.js
├── routes/
│   ├── arrangementRoutes.js
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── recommendationRoutes.js
│   ├── supplierRoutes.js
│   └── userRoutes.js
├── utilities/
│   ├── generateToken.js
│   ├── getSuggestions.js            # Gemini API call
│   └── verifyToken.js
├── .env.example
├── .prettierrc
├── package.json
└── server.js
```

### Why the code is separated this way — MVC

This project follows the MVC (Model-View-Controller) pattern. Routes handle
the URL, controllers hold the logic, models define the schema, middleware runs
before the controller, and utilities provide reusable helpers. This separation
keeps each part of the API focused on one responsibility.

- **`models/`** — The M. Mongoose schemas define what a valid document looks
  like, including enums and the pre-save password hashing hook.
- **`controllers/`** — The C. Controllers handle what actually happens on a
  request: database queries, ownership checks, and response shapes.
- **`routes/`** — The URL surface. Routes map HTTP methods and paths to
  controllers and apply authentication middleware. No business logic lives here.
- **`middleware/`** — Cross-cutting concerns that run across routes, including
  JWT verification and centralized error handling.
- **`utilities/`** — Reusable helpers that have no knowledge of the
  request/response cycle.

The payoff is that changes stay localized. For example, changing how an
endpoint responds or adjusting its status code can be handled inside its
controller without changing the route, model, or middleware around it. The AI
recommendation endpoint also works with the same Event, Supplier, and
Arrangement models as the rest of the API rather than introducing a separate
data layer.

There is no V in this repository because the view is handled by the React
client; this project is focused on the backend API.

---

## Planning and documentation

Planning artifacts are in [`docs/`](./docs):

- **Project proposal** — user stories with acceptance criteria, feature
  breakdown by priority, and the full endpoint specification
- **ERD** — the four-resource data model and its relationships
- **Trello board** — https://trello.com/b/rUWcCCae/on-the-books-p5-backend-api-node

---

## Author

Faith Puton — Uplift Code Camp Fullstack Web Development, Batch 29

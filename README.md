# Web Development Portfolio

I'm **Faith Puton**, a full-stack web developer with a background in events production. After three years planning and producing events for brands and corporate clients, I started building the tools I wished existed — supplier matching, booking systems, and client automation. Most of what's here is that: the same supplier-tracking problem rebuilt four times as my skills grew, from a console script to an AI matcher to a React app to a fullstack API with authentication and a database.

🔗 **Portfolio site:** https://faith-puton.netlify.app

Projects built during the Uplift Code Camp Fullstack Web Development program, Batch 29.

## Projects

| # | Project | What it is | Stack | Live |
|---|---|---|---|---|
| **P7** | [Portfolio site](./p7-final-portfolio) | This portfolio, rebuilt from the ground up with everything learned since P2 | HTML, CSS, JavaScript | [Live](https://faith-puton.netlify.app) |
| **P5** | [On The Books](./p5-backend-node-app) | Fullstack event supplier management — user accounts, per-event budgets and booking statuses, AI supplier recommendations | Node, Express, MongoDB, React, Gemini | [App](https://onthebooks-fullstack.onrender.com) · [API](https://onthebooks-backend.onrender.com) |
| **P4** | [On The Books (frontend)](./p4-react-app/on-the-books) | The same app as a React SPA, persisting to `localStorage` — the interface P5 later connected to a real backend | React, Vite, React Router | [Live](https://on-the-books-events.netlify.app) |
| **P3** | [EventMatch AI](./p3-js-api-app) | Describe an event in plain language, get matched suppliers with AI-generated reasoning for each match | Vanilla JS, Gemini, Netlify Functions | [Live](https://eventmatch-ai.netlify.app) |
| **P1** | [Supplier Console App](./p1-js-console-app) | Where it started — supplier CRUD with input validation, running in the terminal | JavaScript, Node | — |
| **P2** | [First portfolio](./p2-web-dev-portfolio) | The original portfolio build, kept as the "before" to P7 | HTML, CSS, JavaScript | — |

**P6 — Logix WMS** is the group capstone: a pharmaceutical warehouse management system covering receiving, QA release, FEFO allocation, and stock movement. I worked as frontend developer and QA, and held merge authority for the team — every branch went through my review before reaching `dev`. It lives in the team's own repository rather than this one.

## Repository layout

Each project sits in its own folder here on `main`, and also has its own branch carrying that project's full commit history. Start with the README inside any project folder — they cover setup, environment variables, and the design decisions behind each build.

Most projects are deployed on free tiers. Anything on Render sleeps when idle, so the first request after a quiet period can take up to a minute.
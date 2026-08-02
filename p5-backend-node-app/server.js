import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import connectDB from './config/db.js';
import supplierRoutes from './routes/supplierRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
await connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
);

app.get('/', (req, res) => {
  res.send('On The Books API is running...');
});

// Supplier Routes
app.use('/api/v1/suppliers', supplierRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

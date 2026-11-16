import mongoose from 'mongoose';
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
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

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

// Health check: pinged by cron-job.org to keep Render awake
// and the Atlas cluster active. Must stay ABOVE any auth middleware.
app.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Database unreachable' });
  }
});

// Auth Route
app.use('/api/v1/auth', authRoutes);

// User Route
app.use('/api/v1/users', userRoutes);

// Supplier Route
app.use('/api/v1/suppliers', supplierRoutes);

// Event Route
app.use('/api/v1/events', eventRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

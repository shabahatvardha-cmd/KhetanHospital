import express from 'express';
import cors from 'cors';
import { appointmentRouter } from '../backend/src/routes/appointmentRoutes.js';
import { inquiryRouter } from '../backend/src/routes/inquiryRoutes.js';
import { clinicRouter } from '../backend/src/routes/clinicRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Dr. Vatsal Khetan Hospital Serverless API',
    location: 'Betiahata, Gorakhpur'
  });
});

// Mounted Routes
app.use('/api/appointments', appointmentRouter);
app.use('/api/inquiries', inquiryRouter);
app.use('/api/clinic', clinicRouter);

export default app;

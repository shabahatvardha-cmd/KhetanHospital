import express from 'express';
import cors from 'cors';
import { appointmentRouter } from './routes/appointmentRoutes.js';
import { inquiryRouter } from './routes/inquiryRoutes.js';
import { clinicRouter } from './routes/clinicRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Dr. Vatsal Khetan Hospital API',
    location: 'Betiahata, Gorakhpur'
  });
});

// Mounted Routes for Hospital & Admin
app.use('/api/appointments', appointmentRouter);
app.use('/api/inquiries', inquiryRouter);
app.use('/api/clinic', clinicRouter);

app.listen(PORT, () => {
  console.log(`[Khetan Hospital API] running on http://localhost:${PORT}`);
});

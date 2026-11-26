import { Router } from 'express';

export const appointmentRouter = Router();

// In-memory appointments store (ready for SQLite / MongoDB replacement)
const appointments = [
  {
    id: 'APT-1001',
    patientName: 'Rahul Verma',
    phone: '+91 98765 43210',
    email: 'rahul.v@example.com',
    treatment: 'Robotic Knee Replacement',
    preferredDate: '2026-11-25',
    preferredSlot: 'Morning (11:00 AM)',
    status: 'Confirmed',
    notes: 'Severe bilateral osteoarthritis stage 4',
    createdAt: new Date().toISOString()
  },
  {
    id: 'APT-1002',
    patientName: 'Pooja Tiwari',
    phone: '+91 94500 12345',
    email: 'pooja.t@example.com',
    treatment: 'Shoulder Arthroscopy & Rotator Cuff',
    preferredDate: '2026-11-26',
    preferredSlot: 'Evening (05:30 PM)',
    status: 'Pending',
    notes: 'Sports injury during badminton match',
    createdAt: new Date().toISOString()
  }
];

// GET: All appointments (for Admin Panel)
appointmentRouter.get('/', (req, res) => {
  res.json({ success: true, count: appointments.length, data: appointments });
});

// POST: Create appointment (from Patient Site)
appointmentRouter.post('/', (req, res) => {
  const { patientName, phone, email, treatment, preferredDate, preferredSlot, notes } = req.body;
  
  if (!patientName || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }

  const newAppointment = {
    id: `APT-${1000 + appointments.length + 1}`,
    patientName,
    phone,
    email: email || '',
    treatment: treatment || 'General Orthopedic Consultation',
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    preferredSlot: preferredSlot || 'Morning',
    status: 'Pending',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  appointments.unshift(newAppointment);
  res.status(201).json({ success: true, message: 'Appointment requested successfully', data: newAppointment });
});

// PATCH: Update status (Admin Panel)
appointmentRouter.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = appointments.find(a => a.id === id);
  if (!item) return res.status(404).json({ success: false, message: 'Appointment not found' });
  
  item.status = status;
  res.json({ success: true, data: item });
});

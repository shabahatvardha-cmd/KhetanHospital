import { Router } from 'express';

export const inquiryRouter = Router();

const inquiries = [
  {
    id: 'INQ-501',
    name: 'Amit Srivastava',
    phone: '+91 91234 56789',
    subject: 'Robotic Knee Surgery Query & Costs',
    message: 'Wanted to inquire whether cashless TPA mediclaim is accepted for Robotic TKR.',
    status: 'Unread',
    createdAt: new Date().toISOString()
  }
];

inquiryRouter.get('/', (req, res) => {
  res.json({ success: true, data: inquiries });
});

inquiryRouter.post('/', (req, res) => {
  const { name, phone, subject, message } = req.body;
  const newInquiry = {
    id: `INQ-${500 + inquiries.length + 1}`,
    name,
    phone,
    subject,
    message,
    status: 'Unread',
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(newInquiry);
  res.status(201).json({ success: true, message: 'Inquiry received', data: newInquiry });
});

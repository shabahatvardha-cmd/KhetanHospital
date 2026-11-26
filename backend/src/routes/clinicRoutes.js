import { Router } from 'express';

export const clinicRouter = Router();

clinicRouter.get('/details', (req, res) => {
  res.json({
    success: true,
    data: {
      name: "Dr. Vatsal Khetan | Khetan Knee N Shoulder Clinic",
      doctor: {
        name: "Dr. Vatsal Khetan",
        qualifications: "MBBS, MS (Orthopaedics), MRCS, FRCS, IOC Dip (Sports Med)",
        specialty: "Senior Orthopedic & Robotic Joint Replacement Surgeon",
        experienceYears: 12
      },
      contacts: {
        phone: "+91 96623 65917",
        emergencyPhone: "+91 96623 65917",
        whatsapp: "919662365917",
        email: "drvatsalkhetan@gmail.com"
      },
      timings: {
        morning: "10:30 AM – 02:00 PM",
        evening: "05:30 PM – 08:30 PM",
        sunday: "By Prior Emergency Appointment Only"
      },
      location: {
        clinic: "Khetan Knee N Shoulder Clinic",
        complex: "SK Pandey Complex, Betiahata Rd, beside Union Bank",
        locality: "Betiahata",
        city: "Gorakhpur",
        state: "Uttar Pradesh",
        pincode: "273001",
        landmark: "Beside Union Bank of India, Betiahata Chowk"
      }
    }
  });
});

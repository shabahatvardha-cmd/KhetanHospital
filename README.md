# Dr. Vatsal Khetan | Khetan Hospital & Clinic Web Suite (2026 Edition)

An enterprise-grade, modern healthcare web application and administrative management system for **Dr. Vatsal Khetan** (MBBS, MS Orthopedics, MRCS, FRCS) and **Khetan Knee N Shoulder Clinic / Khetan Hospital**, Betiahata, Gorakhpur.

---

## 🏛️ System Architecture

```
Khetan Hospital/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── routes/           # Appointments, Inquiries, Clinic details
│   │   └── server.js         # Express server with CORS & JSON parsing
│   └── package.json
│
├── frontend/                 # Vite + React 18 + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # ✨ 2026 Modern Navbar, MegaMenu, QuickSearch, MobileDrawer
│   │   │   ├── common/       # AppointmentModal (WhatsApp & API dispatch)
│   │   │   └── ui/
│   │   ├── admin/            # Doctor & Staff Admin Portal (Live Appointments & CRM)
│   │   ├── data/             # Complete Clinic Info, Procedures, Doctors, Timings
│   │   ├── App.jsx           # Public site + Hero + Treatments + Admin toggle
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── package.json              # Monorepo management scripts
```

---

## 🌟 The 2026 Modern Healthcare Navbar Breakdown

The Navbar is designed following 2026 digital health UX best practices:

1. **Top Micro-Utility Bar:**
   - **Live OPD Status indicator:** Pulsing green badge showing morning & evening hours in Gorakhpur.
   - **Verified Qualifications:** Instant display of `MBBS, MS, MRCS, FRCS, IOC Dip`.
   - **Priority Dialing:** One-tap emergency phone link (`+91 96623 65917`).
   - **Doctor / Staff Portal Switcher:** Seamless toggle to access the backend Admin Panel.

2. **Adaptive Glass Elevation:**
   - Subtle frosted-glass blur (`backdrop-blur-xl bg-white/90`) that transitions dynamically on scroll.

3. **Multi-Department MegaMenu:**
   - Department categories with live procedure count.
   - Fast-track recovery tags (*"Walking within 24-48 hrs"*, *"Discharge same day"*).
   - Direct booking triggers for specific surgical concerns.

4. **Command Palette / Quick Search (`Ctrl + K`):**
   - Instant live search modal querying treatments, symptoms, OPD hours, and doctor credentials.

5. **Direct Conversion Actions:**
   - One-tap WhatsApp chat pill.
   - Glowing gradient **"Book Priority Consultation"** CTA.

6. **Mobile Slide-Over Sheet:**
   - Category accordions, quick-call emergency dialer, and WhatsApp appointment coordinator.

---

## 🚀 Running the System

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm run dev
```
Healthcheck: `http://localhost:5000/api/health`  
Appointments API: `http://localhost:5000/api/appointments`

### 2. Start the Modern Frontend (Port 3000)
```bash
cd frontend
npm run dev
```
Preview at `http://localhost:3000`

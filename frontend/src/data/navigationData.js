/**
 * 🏥 Khetan Hospital - Centralized Navigation & Brand Architecture
 * Single Source of Truth for:
 * 1. Exactly 6 Main Navigation Items in Navbar (HOME | SERVICES | DOCTORS | BLOGS | LOCATIONS | CONTACT)
 * 2. Dedicated Orthopaedic Services Carousel Cards (Robotic Knee, TKR, Hip, Shoulder, ACL, Spine)
 * 3. Route-to-Section Mapping
 * 4. Verified Hospital Contact & Specialties Metadata
 */

export const mainNavigation = [
  {
    id: 'home',
    label: 'HOME',
    heading: 'HOME',
    supportingLine: 'Discover Khetan Hospital and our approach to orthopaedic care.',
    route: '/',
    image: '/images/backgrounds/hospital-interior.webp',
    isDoctor: false
  },
  {
    id: 'services',
    label: 'SERVICES',
    heading: 'SERVICES',
    supportingLine: 'Explore our orthopaedic treatments and specialised care.',
    route: '/services',
    image: '/images/surgeries/robotic-knee.webp',
    isDoctor: false
  },
  {
    id: 'doctors',
    label: 'DOCTORS',
    heading: 'DOCTORS',
    supportingLine: 'Meet our specialists and discover their expertise.',
    route: '/about',
    image: '/images/dr-vatsal-main.webp',
    isDoctor: true
  },
  {
    id: 'blogs',
    label: 'BLOGS',
    heading: 'BLOGS',
    supportingLine: 'Read articles, insights, and patient education resources.',
    route: '/blogs',
    image: '/images/dr-vatsal-rehab.webp',
    isDoctor: false
  },
  {
    id: 'locations',
    label: 'LOCATIONS',
    heading: 'LOCATIONS',
    supportingLine: 'Find our hospital and consultation locations.',
    route: '/locations',
    image: '/images/dr-vatsal-consult.webp',
    isDoctor: false
  },
  {
    id: 'contact',
    label: 'CONTACT',
    heading: 'CONTACT',
    supportingLine: 'Connect with our hospital and plan your visit.',
    route: '/contact',
    image: '/images/backgrounds/modular-ot.webp',
    isDoctor: false
  }
];

/**
 * 🏥 6 Featured Surgical Services for the 3D Perspective Carousel
 */
export const servicesNavigation = [
  {
    id: 'robotic-knee-surgery',
    label: 'ROBOTIC KNEE',
    heading: 'Robotic Knee Replacement',
    supportingLine: 'Sub-millimeter optical navigation ensuring exact implant alignment and maximal tissue preservation.',
    route: '/services/robotic-knee-surgery',
    image: '/images/surgeries/robotic-knee.webp',
    category: 'Knee Arthroplasty'
  },
  {
    id: 'knee-replacement',
    label: 'KNEE REPLACEMENT',
    heading: 'Total Knee Replacement',
    supportingLine: 'Advanced kinematic joint reconstruction restoring natural motion and rapid painless mobility.',
    route: '/services/knee-replacement',
    image: '/images/surgeries/knee-replacement.webp',
    category: 'Joint Reconstruction'
  },
  {
    id: 'hip-replacement',
    label: 'HIP REPLACEMENT',
    heading: 'Hip Replacement Surgery',
    supportingLine: 'Muscle-sparing arthroplasty preserving soft tissues for lasting relief from osteoarthritis.',
    route: '/services/hip-replacement',
    image: '/images/surgeries/hip-replacement.webp',
    category: 'Hip Arthroplasty'
  },
  {
    id: 'shoulder-replacement',
    label: 'SHOULDER CARE',
    heading: 'Shoulder Arthroscopy',
    supportingLine: 'Minimally invasive keyhole repair for rotator cuff tears and recurring joint instability.',
    route: '/services/shoulder-replacement',
    image: '/images/surgeries/shoulder-surgery.webp',
    category: 'Shoulder Arthroscopy'
  },
  {
    id: 'acl-surgery',
    label: 'SPORTS MEDICINE',
    heading: 'ACL & Sports Medicine',
    supportingLine: 'High-definition keyhole cruciate restoration designed for active return to sports.',
    route: '/services/acl-surgery',
    image: '/images/surgeries/acl-surgery.webp',
    category: 'Sports Rehabilitation'
  },
  {
    id: 'spine-surgery',
    label: 'SPINE CARE',
    heading: 'Spine & Lumbar Surgery',
    supportingLine: 'Targeted neurological decompression and motion-preserving conservative disc care.',
    route: '/services/spine-surgery',
    image: '/images/surgeries/spine-surgery.webp',
    category: 'Spine Care'
  }
];

export const clinicInfo = {
  name: "Dr. Vatsal Khetan",
  qualification: "MBBS, MS (Ortho), MRCS, FRCS (Edinburgh), M.Ch Knee (UK), IOC Dip Sports Med (Switzerland)",
  clinicName: "Khetan Multi Speciality",
  hospitalName: "Khetan Multi Speciality And Medical Research Centre",
  subtitle: "And Medical Research Centre",
  location: "Vikas Nagar Bargadawa Gorakhpur, Gorakhpur, Uttar Pradesh, 273015",
  phone: "+91 96623 65917",
  emergencyPhone: "+91 96623 65917",
  email: "drvatsalkhetan@gmail.com",
  timings: "Mon - Sat: 9:00 AM - 8:00 PM | Sunday by Emergency Appointment",
  opdHours: "Mon - Sat: 9:00 AM - 8:00 PM",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com"
  }
};

export const treatmentsData = [
  { name: "Robotic Knee Surgery", slug: "robotic-knee-surgery", category: "Knee" },
  { name: "Total Knee Replacement", slug: "knee-replacement", category: "Knee" },
  { name: "Hip Replacement Surgery", slug: "hip-replacement", category: "Hip" },
  { name: "Shoulder Replacement", slug: "shoulder-replacement", category: "Shoulder" },
  { name: "ACL & Sports Arthroscopy", slug: "acl-surgery", category: "Sports Medicine" },
  { name: "Spine & Lumbar Surgery", slug: "spine-surgery", category: "Spine" },
  { name: "Trauma & Fracture Fixation", slug: "trauma-surgery", category: "Trauma" },
  { name: "Ankle Surgery & Ligaments", slug: "ankle-surgery", category: "Ankle" },
  { name: "Elbow Arthroscopy & Reconstruction", slug: "elbow-surgery", category: "Elbow" }
];

export const outreachLocations = [
  { city: "Gorakhpur", note: "Primary Hospital - Vikas Nagar, Bargadawa", isMain: true },
  { city: "Deoria", note: "Regular Consultation Outreach" },
  { city: "Basti", note: "Patient Consultation Centre" },
  { city: "Kushinagar", note: "Patient Consultation Outreach" },
  { city: "Maharajganj", note: "Outreach Clinic" },
  { city: "Bettiah", note: "Regional OPD Centre" },
  { city: "Siwan", note: "Outreach Consultations" },
  { city: "Motihari", note: "Regional Clinic" },
  { city: "Gopalganj", note: "Patient Outreach" },
  { city: "Padrauna", note: "Regional Outreach" },
  { city: "Patna", note: "Specialist Surgical Consultation" }
];

export const navMenu = mainNavigation.map(item => ({
  title: item.label,
  href: item.route
}));

/**
 * 🏥 Khetan Hospital - Centralized Image Asset Configuration
 * 
 * This file serves as the single source of truth for all images used across the website.
 * 
 * 💡 HOW TO REPLACE ANY IMAGE LATER:
 * 1. Place your new photo file inside: `d:\Programming\Khetan Hospital\frontend\public\images\`
 * 2. Update the corresponding path below, or simply overwrite the file with the same name.
 * 3. The website updates automatically without touching any UI code!
 */

export const doctorImages = {
  // Primary uncropped photo of Dr. Vatsal Khetan (Transparent cutout in surgical scrubs with "DR. VATSAL" & cap)
  main: "/images/dr-vatsal-main.webp",

  // Hero Section Main Portrait (Clean transparent cutout, zero crop)
  hero: "/images/dr-vatsal-main.webp",

  // About Section & Profile Story Photo
  portrait: "/images/dr-vatsal-main.webp",

  // Secondary / Consultation Photo at Bargadawa Hospital
  consultation: "/images/dr-vatsal-consult.webp",

  // International Fellowship & UK Royal College Credentials
  fellowship: "/images/dr-vatsal-fellowship.webp",

  // Restored Patient Mobility & Happy Rehabilitation Outcome
  rehabOutcome: "/images/dr-vatsal-rehab.webp",
};

export const surgeryImages = {
  "robotic-knee-surgery": {
    image: "/images/surgeries/robotic-knee.webp",
    alt: "Sub-Millimeter Robotic Knee Replacement at Khetan Hospital"
  },
  "knee-replacement": {
    image: "/images/surgeries/knee-replacement.webp",
    alt: "Total Knee Replacement Arthroplasty Implants & Realignment"
  },
  "hip-replacement": {
    image: "/images/surgeries/hip-replacement.webp",
    alt: "Minimally Invasive Hip Replacement & AVN Salvage"
  },
  "shoulder-replacement": {
    image: "/images/surgeries/shoulder-surgery.webp",
    alt: "Arthroscopic Shoulder Surgery & Rotator Cuff Repair"
  },
  "acl-surgery": {
    image: "/images/surgeries/acl-surgery.webp",
    alt: "Keyhole ACL Ligament Reconstruction & Sports Medicine"
  },
  "trauma-surgery": {
    image: "/images/surgeries/trauma-surgery.webp",
    alt: "Complex Trauma & Pelvic-Acetabular Fracture Fixation"
  },
  "spine-surgery": {
    image: "/images/surgeries/spine-surgery.webp",
    alt: "Minimally Invasive Spine Surgery & Lumbar Decompression"
  },
  "ankle-surgery": {
    image: "/images/surgeries/ankle-surgery.webp",
    alt: "Foot & Ankle Arthroscopic Reconstruction & Ligament Care"
  },
  "elbow-surgery": {
    image: "/images/surgeries/elbow-surgery.webp",
    alt: "Elbow Arthroscopy & Complex Joint Preservation"
  }
};

export const backgroundTextures = {
  hospitalModern: "/images/backgrounds/hospital-interior.webp",
  modularOt: "/images/backgrounds/modular-ot.webp",
  statsCounter: "/images/backgrounds/hospital-interior.webp",
  whyChooseUs: "/images/backgrounds/modular-ot.webp",
  bookingBanner: "/images/dr-vatsal-consult.webp"
};

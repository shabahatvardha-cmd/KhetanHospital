# 📸 Khetan Hospital — Image Structure & Replacement Guide

This guide explains how all images across the website are organized, where each photo appears, and how you can easily replace or update them anytime.

All images are stored in:
👉 `d:\Programming\Khetan Hospital\frontend\public\images\`

Central configuration file:
👉 `d:\Programming\Khetan Hospital\frontend\src\data\imageConfig.js`

---

## 👨‍⚕️ 1. Doctor Portraits (Dr. Vatsal Khetan)

| Image Role | File Path | Description / Framing | Where It Appears |
| :--- | :--- | :--- | :--- |
| **Main Doctor Portrait (Featured)** | `/images/dr-vatsal-main.webp` | **Authentic uncropped photo in surgical scrubs** with "DR. VATSAL" embroidery and surgical cap. Transparent cutout with zero clipping. | **Hero Section** (Top right with ambient lighting and FRCS accreditation pill) & **About Doctor Section** |
| **Doctor Profile Portrait** | `/images/dr-vatsal-portrait.webp` | Professional doctor portrait in natural vertical framing. | **About Page** (`/about`) & Doctor Story |
| **OPD Consultation** | `/images/dr-vatsal-consult.webp` | Dr. Vatsal Khetan in clinical consultation at Betiahata Clinic. | **Booking Invitation Card** |
| **UK NHS Fellowship** | `/images/dr-vatsal-fellowship.webp` | Fellowship & surgical accreditation in the UK. | **Doctor Story & Credentials** |

> [!TIP]
> **Zero Cropping Guarantee:** The doctor's portraits are styled using `object-contain` and natural aspect ratio containers. His surgical cap, head, shoulders, and arms are displayed 100% full-frame without being cut off by the browser.

---

## 🔬 2. Specialized Surgery Cards

All procedural photos are stored in: `frontend/public/images/surgeries/`

| Surgery Name | File Path | Featured Procedure |
| :--- | :--- | :--- |
| **Robotic Knee Surgery** | `/images/surgeries/robotic-knee.jpg` | Real-time robotic CT navigation & sub-millimeter knee alignment |
| **Total Knee Replacement** | `/images/surgeries/knee-replacement.jpg` | High-durability knee arthroplasty implants (20+ yr longevity) |
| **Hip Replacement & AVN** | `/images/surgeries/hip-replacement.jpg` | Wrightington UK ceramic bearings & hip preservation |
| **Shoulder Surgery & Repair** | `/images/surgeries/shoulder-surgery.jpg` | High-definition arthroscopic rotator cuff repair |
| **ACL & Sports Medicine** | `/images/surgeries/acl-surgery.jpg` | Minimally invasive keyhole arthroscopy & ligament repair |
| **Trauma & Fracture Care** | `/images/surgeries/trauma-surgery.jpg` | Emergency titanium locking plates & pelvic-acetabular fixation |
| **Spine Care & Decompression** | `/images/surgeries/spine-surgery.jpg` | Optical microscope & minimally invasive spine navigation |
| **Foot & Ankle Reconstruction** | `/images/surgeries/ankle-surgery.jpg` | Ankle arthroscopy & sports ligament stabilization |
| **Elbow Arthroscopy** | `/images/surgeries/elbow-surgery.jpg` | Complex joint preservation & tendon repair |

---

## 🏛️ 3. Section Background Textures

All background textures are stored in: `frontend/public/images/backgrounds/`

| Section | File Path | Visual Effect |
| :--- | :--- | :--- |
| **Stats Counter Bar** | `/images/backgrounds/hospital-interior.jpg` | Modern hospital wing interior with purple overlay (`mix-blend-overlay`) |
| **Why Choose Us Section** | `/images/backgrounds/modular-ot.jpg` | High-tech modular operating theater with deep navy overlay |

---

## 🚀 How to Replace Any Image in Seconds

You have two easy ways to update any photo:

### Method A (Direct File Overwrite — Fastest):
Simply copy your new image file into `frontend/public/images/` with the exact same name (e.g. `dr-vatsal-main.webp` or `surgeries/robotic-knee.jpg`). The website updates instantly!

### Method B (Update Configuration):
Add your new photo to `frontend/public/images/`, open `frontend/src/data/imageConfig.js`, and point the relevant line to your new filename.

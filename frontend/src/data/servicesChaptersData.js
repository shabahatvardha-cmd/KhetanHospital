/**
 * 🏥 Khetan Hospital - Services Page Chapters Data
 * 
 * Centralized data architecture for the 8 Full-Screen Shutter Chapters:
 * 1. Introduction to Orthopaedic Services
 * 2. Knee Care
 * 3. Hip Care
 * 4. Sports Medicine & ACL
 * 5. Shoulder Care
 * 6. Spine Care
 * 7. Complex Trauma & Specialised Procedures
 * 8. Technology, Surgical Precision & Patient Approach
 */

export const serviceChapters = [
  {
    id: 'chapter-1',
    chapterNumber: '01',
    navLabel: 'Intro',
    badge: 'SPECIALIZED SURGICAL EXCELLENCE',
    title: 'ORTHOPAEDIC CARE, DESIGNED AROUND YOU',
    subtitle: 'Advanced surgical precision, tissue-sparing techniques, and dedicated joint recovery under British-trained surgical leadership.',
    isIntro: true,
    introImage: '/images/backgrounds/hospital-interior.jpg',
    introHighlights: [
      {
        title: 'Sub-Millimeter Optical Precision',
        desc: 'Restoring your natural constitutional joint kinematics with 0.5mm alignment accuracy.'
      },
      {
        title: 'Tissue-Sparing Surgical Protocol',
        desc: 'Preserving muscular integrity, joint ligaments, and peri-articular blood supply.'
      },
      {
        title: 'Rapid Mobilization & Recovery',
        desc: 'Supported standing and assisted walking within 24 hours post-procedure.'
      }
    ]
  },
  {
    id: 'chapter-2',
    chapterNumber: '02',
    navLabel: 'Knee',
    badge: 'CHAPTER 02 • KNEE SPECIALTY',
    title: 'KNEE ARTHROPLASTY & RESTORATION',
    subtitle: 'From sub-millimeter robotic joint reconstruction to tissue-sparing total knee replacements.',
    panels: [
      {
        title: 'Robotic Knee Replacement',
        tag: 'Sub-Millimeter Optical Navigation',
        subtitle: 'Real-time 3D optical tracking for precise bone resection and balanced joint kinematics.',
        image: '/images/surgeries/robotic-knee.jpg',
        route: '/services/robotic-knee-surgery'
      },
      {
        title: 'Total Knee Replacement (TKR)',
        tag: '20+ Year Longevity Implants',
        subtitle: 'High-durability implants engineered to eliminate chronic pain and restore natural extension.',
        image: '/images/surgeries/knee-replacement.jpg',
        route: '/services/knee-replacement'
      }
    ]
  },
  {
    id: 'chapter-3',
    chapterNumber: '03',
    navLabel: 'Hip',
    badge: 'CHAPTER 03 • HIP SPECIALTY',
    title: 'HIP RECONSTRUCTION & ARTHROPLASTY',
    subtitle: 'Anatomical ceramic-on-ceramic bearings and tissue-preserving anterior/posterior approaches.',
    panels: [
      {
        title: 'Total Hip Arthroplasty',
        tag: 'Low-Friction Ceramic Bearings',
        subtitle: 'Minimally invasive hip replacement restoring smooth pain-free gait and lifelong joint mobility.',
        image: '/images/surgeries/hip-replacement.jpg',
        route: '/services/hip-replacement'
      },
      {
        title: 'Avascular Necrosis (AVN) Protocol',
        tag: 'Core Decompression & Salvage',
        subtitle: 'Targeted head decompression and biological preservation to prevent premature femoral head collapse.',
        image: '/images/dr-vatsal-rehab.webp',
        route: '/services/hip-replacement'
      }
    ]
  },
  {
    id: 'chapter-4',
    chapterNumber: '04',
    navLabel: 'Sports & ACL',
    badge: 'CHAPTER 04 • SPORTS ARTHROSCOPY',
    title: 'SPORTS MEDICINE & ACL RECONSTRUCTION',
    subtitle: 'Keyhole ligament repair following International Olympic Committee return-to-sport protocols.',
    panels: [
      {
        title: 'Anatomic ACL Reconstruction',
        tag: 'Keyhole Arthroscopy',
        subtitle: 'Anatomical remnant-preserving cruciate ligament repair restoring dynamic rotational stability.',
        image: '/images/surgeries/acl-surgery.jpg',
        route: '/services/acl-surgery'
      },
      {
        title: 'Meniscus Repair & Joint Preservation',
        tag: 'Inside-Out Biological Suturing',
        subtitle: 'Biologic preservation of native shock-absorbing cartilage using advanced suture stabilization.',
        image: '/images/dr-vatsal-fellowship.webp',
        route: '/services/acl-surgery'
      }
    ]
  },
  {
    id: 'chapter-5',
    chapterNumber: '05',
    navLabel: 'Shoulder',
    badge: 'CHAPTER 05 • SHOULDER SPECIALTY',
    title: 'SHOULDER ARTHROPLASTY & CUFF REPAIR',
    subtitle: 'Keyhole rotator cuff repair, labral stabilization, and reverse total shoulder replacement.',
    panels: [
      {
        title: 'Shoulder Joint Replacement',
        tag: 'Anatomical & Reverse Arthroplasty',
        subtitle: 'Advanced joint reconstruction restoring pain-free overhead reach for severe cuff tear arthropathy.',
        image: '/images/surgeries/shoulder-surgery.jpg',
        route: '/services/shoulder-replacement'
      },
      {
        title: 'Rotator Cuff & Bankart Repair',
        tag: 'Day-Care Arthroscopic Suture',
        subtitle: 'Minimally invasive suture anchors stabilizing torn tendons with rapid soft-tissue healing.',
        image: '/images/backgrounds/modular-ot.jpg',
        route: '/services/shoulder-replacement'
      }
    ]
  },
  {
    id: 'chapter-6',
    chapterNumber: '06',
    navLabel: 'Spine',
    badge: 'CHAPTER 06 • SPINE SPECIALTY',
    title: 'SPINE CARE & LUMBAR DECOMPRESSION',
    subtitle: 'Evidence-based surgical and conservative management for disc herniation and nerve compression.',
    panels: [
      {
        title: 'Lumbar Nerve Decompression',
        tag: 'Micro-Endoscopic Discectomy',
        subtitle: 'Targeted keyhole decompression relieving sciatic nerve irritation and chronic lumbar pain.',
        image: '/images/surgeries/spine-surgery.jpg',
        route: '/services/spine-surgery'
      },
      {
        title: 'Spine Rehabilitation Protocol',
        tag: 'Conservative Stabilization',
        subtitle: 'Targeted nerve roots blocks, core biomechanical stabilization, and functional spine recovery.',
        image: '/images/dr-vatsal-consult.webp',
        route: '/services/spine-surgery'
      }
    ]
  },
  {
    id: 'chapter-7',
    chapterNumber: '07',
    navLabel: 'Trauma',
    badge: 'CHAPTER 07 • COMPLEX TRAUMA & EXTREMITIES',
    title: 'TRAUMA FIXATION & EXTREMITY CARE',
    subtitle: 'Anatomical fracture fixation, complex joint salvage, and delicate extremity reconstruction.',
    panels: [
      {
        title: 'Advanced Trauma Surgery',
        tag: '24/7 Pelvic & Polytrauma Care',
        subtitle: 'Locking plate and anatomical intramedullary fixation for severe multi-fragment fractures.',
        image: '/images/surgeries/trauma-surgery.jpg',
        route: '/services/trauma-surgery'
      },
      {
        title: 'Foot & Ankle Reconstruction',
        tag: 'Ligament & Cartilage Repair',
        subtitle: 'Arthroscopic ligament repair and anatomical joint salvage for chronic ankle instability.',
        image: '/images/surgeries/ankle-surgery.jpg',
        route: '/services/ankle-surgery'
      },
      {
        title: 'Elbow Arthroscopy',
        tag: 'Stiffness & Ligament Repair',
        subtitle: 'Keyhole stiffness release, tennis elbow debridement, and complex joint preservation.',
        image: '/images/surgeries/elbow-surgery.jpg',
        route: '/services/elbow-surgery'
      }
    ]
  },
  {
    id: 'chapter-8',
    chapterNumber: '08',
    navLabel: 'Technology',
    badge: 'CHAPTER 08 • SURGICAL METHODOLOGY',
    title: 'SURGICAL TECHNOLOGY & CARE APPROACH',
    subtitle: 'Our commitment to sub-millimeter precision, tissue preservation, and permanent functional outcomes.',
    isTechnology: true,
    techCards: [
      {
        title: 'Intra-Operative Optical Tracking',
        badge: '0.5mm Accuracy',
        desc: 'Eliminating guesswork with active digital optical trackers that verify bone alignment in real-time.'
      },
      {
        title: 'Tissue-Sparing Surgical Protocol',
        badge: 'British Surgical Standards',
        desc: 'Dr. Vatsal Khetan’s Edinburgh-trained approach minimizes muscle division and promotes rapid healing.'
      },
      {
        title: 'Dedicated Physical Rehabilitation',
        badge: 'Same-Day Mobilization',
        desc: 'Supported walking within 24 hours, multi-modal pain protocols, and structured recovery milestones.'
      }
    ]
  }
];

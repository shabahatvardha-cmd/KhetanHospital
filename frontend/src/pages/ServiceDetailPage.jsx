import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Activity,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { allServices } from '../data/clinicContent';
import { surgeryImages } from '../data/imageConfig';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 SURGICAL SERVICES FLOW ORDER (For Continuous Previous/Next Navigation)
 */
const SURGERY_FLOW = [
  { slug: 'robotic-knee-surgery', title: 'Robotic Knee Replacement', shortName: 'Robotic Knee', script: 'Sub-Millimeter' },
  { slug: 'knee-replacement', title: 'Total Knee Replacement', shortName: 'Knee Arthroplasty', script: 'Kinematic Realignment' },
  { slug: 'hip-replacement', title: 'Total Hip Replacement', shortName: 'Hip Replacement', script: 'Ceramic Bearings' },
  { slug: 'shoulder-replacement', title: 'Shoulder Arthroscopy & Repair', shortName: 'Shoulder Surgery', script: 'Keyhole Optics' },
  { slug: 'acl-surgery', title: 'ACL & Sports Ligament Reconstruction', shortName: 'ACL Reconstruction', script: 'Sports Medicine' },
  { slug: 'spine-surgery', title: 'Minimally Invasive Spine Surgery', shortName: 'Spine Care', script: 'Nerve Decompression' },
  { slug: 'trauma-surgery', title: 'Complex Trauma & Fracture Care', shortName: 'Trauma Surgery', script: 'Anatomical Fixation' },
];

/**
 * 🎨 Tubik-Inspired Specialty Theming & Specifications with Detailed Clinical Points
 */
const SERVICE_SPECS = {
  'robotic-knee-surgery': {
    script: 'Sub-Millimeter',
    meta: 'SUB-MILLIMETER OPTICAL GUIDANCE | 24-HR MOBILITY',
    accent: '#f59e0b', // Warm Golden Amber
    accentHover: '#d97706',
    specTolerance: '0.5 MM OPTICAL GUIDANCE',
    specMobility: 'WITHIN 24 HOURS OF SURGERY',
    specLongevity: '20+ YEAR HIGH-FLEX IMPLANTS',
    bannerBg: 'bg-[#f59e0b] hover:bg-[#d97706] text-slate-950',
    footerHeadline: 'EXPERIENCE ADVANCED ROBOTIC PRECISION',
    footerTagline: 'Sub-Millimeter Optical Guidance • Rapid 24-Hour Mobility Protocol',
    cards: [
      {
        script: 'Kinematic Alignment',
        title: '3D PRE-OP CT MAPPING',
        desc: 'A personalized 3D digital model of your knee joint plans implant sizing and bone resection down to a fraction of a millimeter.',
        image: '/images/surgeries/robotic-knee.webp',
        bg: 'from-amber-100/70 via-amber-50 to-orange-50',
        points: [
          { title: 'Personalized 3D Bone Geometry', desc: 'High-resolution digital CT modeling creates an exact virtual replica of your natural knee alignment.' },
          { title: 'Virtual Implant Sizing', desc: 'Pre-determines optimal implant dimensions to ensure 100% anatomical bone coverage with zero overhang.' },
          { title: 'Pre-Operative Kinematic Simulation', desc: 'Simulates natural range of motion and ligament tension balance before making any physical incision.' },
          { title: 'Eliminates Alignment Guesswork', desc: 'Cuts bone strictly within the planned sub-millimeter envelope, eradicating manual surgical error.' },
        ]
      },
      {
        script: 'Cruciate Sparing',
        title: 'HAPTIC ROBOTIC ARM SURGERY',
        desc: 'Active robotic boundaries guide bone preparation with sub-millimeter precision, sparing healthy collateral ligaments and soft tissue.',
        image: '/images/surgeries/knee-replacement.webp',
        bg: 'from-sky-100/70 via-sky-50 to-blue-50',
        points: [
          { title: 'Active Haptic Boundary Protection', desc: 'Robotic feedback mechanically constrains surgical tools within safe margins to prevent soft tissue injury.' },
          { title: 'Cruciate & Collateral Sparing', desc: 'Preserves healthy natural ligaments, ensuring your restored knee retains natural stability and feel.' },
          { title: 'Reduced Blood Loss & Swelling', desc: 'Minimal bone resection significantly minimizes post-operative swelling, tissue trauma, and bruising.' },
          { title: 'Rapid 24-Hour Mobilization', desc: 'Sub-millimeter accuracy allows most patients to stand and take assisted steps on Day 1.' },
        ]
      }
    ]
  },
  'knee-replacement': {
    script: 'Kinematic Realignment',
    meta: 'HIGH-DURABILITY ARTHROPLASTY | 20+ YR SURVIVORSHIP',
    accent: '#f59e0b',
    accentHover: '#d97706',
    specTolerance: 'TISSUE-SPARING REALIGNMENT',
    specMobility: 'ASSISTED WALKING ON DAY 1',
    specLongevity: '20+ YEAR PROVEN LONGEVITY',
    bannerBg: 'bg-[#f59e0b] hover:bg-[#d97706] text-slate-950',
    footerHeadline: 'RESTORE NATURAL PAIN-FREE KNEE MOBILITY',
    footerTagline: '20+ Year Survivorship Implants • Kinematic Tissue-Sparing Realignment',
    cards: [
      {
        script: 'Total Joint Restoration',
        title: 'TOTAL KNEE RECONSTRUCTION (TKR)',
        desc: 'Complete joint resurfacing with high-durability implants engineered to eradicate chronic bone-on-bone arthritic pain.',
        image: '/images/surgeries/knee-replacement.webp',
        bg: 'from-amber-100/70 via-amber-50 to-orange-50',
        points: [
          { title: 'Complete Arthritic Joint Resurfacing', desc: 'Resurfaces severely degenerated cartilage with ultra-smooth cobalt-chromium and ceramic bearings.' },
          { title: '20+ Year High-Flex Longevity', desc: 'Implants engineered to endure decades of active daily living, squatting, and unassisted walking.' },
          { title: 'Varus / Valgus Realignment', desc: 'Corrects severe bowleggedness or knock-knees, restoring a straight, natural mechanical leg axis.' },
          { title: 'Multimodal Pain Protocol', desc: 'Targeted local nerve blocks allow rapid awakening with minimal pain and early physiotherapy.' },
        ]
      },
      {
        script: 'Compartmental Preservation',
        title: 'PARTIAL KNEE RESURFACING (PKR)',
        desc: 'Preserves your natural undamaged compartments when arthritis affects only one side, enabling a completely natural knee feel.',
        image: '/images/surgeries/robotic-knee.webp',
        bg: 'from-sky-100/70 via-sky-50 to-blue-50',
        points: [
          { title: 'Single Compartment Focus', desc: 'Replaces only the worn inner or outer joint surface while keeping 75% of your natural knee intact.' },
          { title: 'Natural Knee Kinematics', desc: 'Retains both ACL and PCL ligaments, resulting in a knee that bends and feels completely natural.' },
          { title: 'Smaller Keyhole Incision', desc: 'Tissue-sparing approach requires a smaller incision with minimal blood loss and fast healing.' },
          { title: 'Shorter Hospital Stay', desc: 'Most patients return home within 24 to 48 hours and resume normal routines within weeks.' },
        ]
      }
    ]
  },
  'hip-replacement': {
    script: 'Ceramic Bearings',
    meta: 'MINIMALLY INVASIVE HIP | LOW-FRICTION CERAMIC',
    accent: '#10b981', // Fresh Emerald
    accentHover: '#059669',
    specTolerance: 'CERAMIC-ON-CERAMIC BEARINGS',
    specMobility: 'SAME-DAY GAIT RESTORATION',
    specLongevity: 'LIFELONG LOW-WEAR BEARINGS',
    bannerBg: 'bg-[#10b981] hover:bg-[#059669] text-white',
    footerHeadline: 'EXPERIENCE LIFELONG CERAMIC HIP PRECISION',
    footerTagline: 'Direct Anterior Muscle Sparing • Lifelong Low-Wear Ceramic Bearings',
    cards: [
      {
        script: 'Muscle-Sparing',
        title: 'MINIMALLY INVASIVE HIP ARTHROPLASTY',
        desc: 'Direct anterior and tissue-preserving pathways sparing hip abductors for rapid stability and zero dislocation risk.',
        image: '/images/surgeries/hip-replacement.webp',
        bg: 'from-emerald-100/70 via-emerald-50 to-teal-50',
        points: [
          { title: 'Preserves Critical Hip Abductors', desc: 'Tissue-sparing approach navigates between muscle intervals without detaching vital tendons.' },
          { title: 'Immediate Joint Stability', desc: 'Lower risk of dislocation, allowing immediate unrestricted sitting and side-sleeping.' },
          { title: 'Rapid Gait & Walking Restoration', desc: 'Patients take their first assisted steps on Day 1 with significantly less post-op pain.' },
          { title: 'Accelerated Hospital Discharge', desc: 'Most patients achieve unassisted stairs and walking within 48 to 72 hours.' },
        ]
      },
      {
        script: 'AVN Salvage',
        title: 'CERAMIC HEAD & SOCKET RECONSTRUCTION',
        desc: 'UK Wrightington-trained protocols utilizing ultra-durable ceramic bearings designed for active, younger patients.',
        image: '/images/backgrounds/hospital-interior.webp',
        bg: 'from-sky-100/70 via-sky-50 to-slate-50',
        points: [
          { title: 'Ultra-Durable Ceramic Bearings', desc: 'Diamond-hard ceramic-on-ceramic surfaces with negligible, near-zero annual wear rates.' },
          { title: 'Avascular Necrosis (AVN) Relief', desc: 'Replaces collapsed femoral heads damaged by AVN, completely eradicating deep groin pain.' },
          { title: 'Titanium Porous Shell Ingrowth', desc: 'Acetabular socket features bio-integrating titanium coating that permanently bonds with natural bone.' },
          { title: 'Full Return to Active Living', desc: 'Freedom to resume long walks, driving, swimming, and travel without joint restriction.' },
        ]
      }
    ]
  },
  'shoulder-replacement': {
    script: 'Keyhole Optics',
    meta: 'ARTHROSCOPIC PRECISION | ROTATOR CUFF RESTORATION',
    accent: '#8b5cf6', // Royal Purple
    accentHover: '#7c3aed',
    specTolerance: 'HIGH-DEFINITION ARTHROSCOPY',
    specMobility: 'SAME-DAY DISCHARGE PROTOCOL',
    specLongevity: 'FULL OVERHEAD REACH RESTORED',
    bannerBg: 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white',
    footerHeadline: 'RESTORE HIGH-PERFORMANCE SHOULDER POWER',
    footerTagline: 'High-Definition Keyhole Optics • Advanced Deltoid Biomechanical Mastery',
    cards: [
      {
        script: 'Keyhole Optics',
        title: 'ARTHROSCOPIC ROTATOR CUFF REPAIR',
        desc: 'Minimally invasive keyhole tendon repair using bio-composite anchors restoring pain-free overhead reach and strength.',
        image: '/images/surgeries/shoulder-surgery.webp',
        bg: 'from-purple-100/70 via-purple-50 to-indigo-50',
        points: [
          { title: 'High-Definition Arthroscopic View', desc: 'Microscopic optical camera inspects the subacromial space through millimeter keyhole portals.' },
          { title: 'Bio-Composite Suture Anchors', desc: 'Secures torn supraspinatus and subscapularis tendons back to the humeral footprint with knotless anchors.' },
          { title: 'Decompression of Bone Spurs', desc: 'Smooths subacromial impingement spurs to prevent future tendon tearing and chronic friction.' },
          { title: 'Restored Overhead Reach', desc: 'Dedicated post-op rehabilitation protocol enables full, painless overhead arm movement and night sleep.' },
        ]
      },
      {
        script: 'Biomechanical Shift',
        title: 'REVERSE SHOULDER ARTHROPLASTY',
        desc: 'Specialized joint reconstruction for complex rotator cuff arthropathy, transferring lifting load safely to the deltoid muscle.',
        image: '/images/surgeries/elbow-surgery.webp',
        bg: 'from-sky-100/70 via-sky-50 to-slate-50',
        points: [
          { title: 'Solves Irreparable Cuff Tears', desc: 'Biomechanically reverses ball-and-socket anatomy to bypass non-functioning rotator cuff muscles.' },
          { title: 'Deltoid Power Optimization', desc: 'Transfers arm elevation load directly to the strong deltoid muscle for effortless lifting.' },
          { title: 'Eliminates Night Shoulder Pain', desc: 'Provides immediate, lasting relief for severe cuff tear arthropathy and joint degeneration.' },
          { title: 'Custom Implants for Joint Stability', desc: 'Modular components tailored to bone anatomy, ensuring optimal soft-tissue tension.' },
        ]
      }
    ]
  },
  'acl-surgery': {
    script: 'Sports Medicine',
    meta: 'IOC OLYMPIC ACCREDITATION | KEYHOLE GRAFT FIXATION',
    accent: '#ef4444', // Coral Red
    accentHover: '#dc2626',
    specTolerance: 'ANATOMIC TUNNEL DRILLING',
    specMobility: 'EARLY FULL EXTENSION PROTOCOL',
    specLongevity: 'PERMANENT SPORTS STABILITY',
    bannerBg: 'bg-[#ef4444] hover:bg-[#dc2626] text-white',
    footerHeadline: 'RETURN TO PEAK ATHLETIC PERFORMANCE',
    footerTagline: 'IOC Olympic Sports Protocol • Biological Meniscus Preservation',
    cards: [
      {
        script: 'Anatomical Graft',
        title: 'KEYHOLE ACL RECONSTRUCTION',
        desc: 'High-strength autograft placement restoring complete rotational knee stability under athletic cutting and pivoting loads.',
        image: '/images/surgeries/acl-surgery.webp',
        bg: 'from-rose-100/70 via-rose-50 to-orange-50',
        points: [
          { title: 'Anatomical Tunnel Positioning', desc: 'High-precision arthroscopic tunnel placement replicates the natural footprint of the native ACL.' },
          { title: 'High-Strength Autograft Fixation', desc: 'Utilizes strong hamstring or bone-patellar tendon autografts anchored with titanium cortical buttons.' },
          { title: 'Rotational Knee Stability', desc: 'Prevents knee giving way during sharp cutting, pivoting, jumping, and sudden deceleration.' },
          { title: 'IOC Olympic Sports Protocol', desc: 'Guided biological rehabilitation protocol designed to safely return athletes to competitive sports.' },
        ]
      },
      {
        script: 'Shock Absorption',
        title: 'MENISCUS PRESERVATION & REPAIR',
        desc: 'Biological suture repair preserving natural meniscus shock-absorbing cushions to prevent early-onset degenerative arthritis.',
        image: '/images/dr-vatsal-rehab.webp',
        bg: 'from-emerald-100/70 via-emerald-50 to-slate-50',
        points: [
          { title: 'Preserves Joint Cushioning', desc: 'Avoids unnecessary tissue removal; repairs torn meniscus fibers using advanced all-inside suture devices.' },
          { title: 'Long-Term Arthritis Prevention', desc: 'Keeping the natural meniscus intact preserves shock absorption and prevents early cartilage degeneration.' },
          { title: 'Biological Healing Enhancement', desc: 'Micro-fracture and marrow stimulation at the repair site stimulate robust fibrocartilage healing.' },
          { title: 'Fast Return to Weight-Bearing', desc: 'Progressive weight-bearing protocol tailored to tear pattern, ensuring safe, durable recovery.' },
        ]
      }
    ]
  },
  'spine-surgery': {
    script: 'Nerve Decompression',
    meta: 'MICROSCOPIC LUMBAR CARE | IMMEDIATE PAIN RELIEF',
    accent: '#0d9488', // Teal
    accentHover: '#0f766e',
    specTolerance: 'MICROSCOPIC OPTICAL PRECISION',
    specMobility: 'WALKING WITHIN 24 HOURS',
    specLongevity: 'PERMANENT SCIATICA RELIEF',
    bannerBg: 'bg-[#0d9488] hover:bg-[#0f766e] text-white',
    footerHeadline: 'MINIMALLY INVASIVE MICROSCOPIC SPINE RELIEF',
    footerTagline: 'Targeted Nerve Decompression • Same-Day & 24-Hour Walking Protocol',
    cards: [
      {
        script: 'Tissue Sparing',
        title: 'MICROSCOPIC LUMBAR DISCECTOMY',
        desc: 'Targeted keyhole decompression of compressed nerve roots, instantly relieving chronic radiating sciatica and leg numbness.',
        image: '/images/surgeries/spine-surgery.webp',
        bg: 'from-teal-100/70 via-teal-50 to-cyan-50',
        points: [
          { title: 'High-Magnification Optical Scope', desc: 'Surgical microscope provides clear visualization of compressed nerve roots through a sub-inch incision.' },
          { title: 'Targeted Herniation Removal', desc: 'Removes only the ruptured disc fragment compressing the sciatic nerve, preserving disc height.' },
          { title: 'Immediate Sciatica Relief', desc: 'Instantly resolves severe radiating leg pain, burning sensations, and muscular weakness.' },
          { title: 'Same-Day or 24-Hour Discharge', desc: 'Minimal paraspinal muscle retraction enables walking on the day of surgery with rapid discharge.' },
        ]
      },
      {
        script: 'Structural Stability',
        title: 'MINIMALLY INVASIVE SPINAL STABILIZATION',
        desc: 'Percutaneous titanium fixation stabilizing degenerated spinal segments with minimal muscular disruption.',
        image: '/images/backgrounds/modular-ot.webp',
        bg: 'from-slate-100/70 via-slate-50 to-sky-50',
        points: [
          { title: 'Percutaneous Pedicle Screws', desc: 'Placed through tiny skin punctures under real-time fluoroscopic guidance without stripping spine muscles.' },
          { title: 'Corrects Spondylolisthesis & Instability', desc: 'Stabilizes slipping vertebrae and decompresses spinal stenosis to prevent nerve damage.' },
          { title: 'Significantly Less Blood Loss', desc: 'Tissue-sparing pathway causes minimal surgical bleeding and reduces post-op wound complications.' },
          { title: 'Early Standing & Functional Recovery', desc: 'Rigid titanium stability allows patients to stand and walk comfortably within 24 to 48 hours.' },
        ]
      }
    ]
  },
  'trauma-surgery': {
    script: 'Anatomical Fixation',
    meta: 'UK TRAUMA GOVERNANCE | 24/7 EMERGENCY CARE',
    accent: '#2563eb', // Royal Blue
    accentHover: '#1d4ed8',
    specTolerance: 'ANATOMIC REDUCTION & LOCKING',
    specMobility: 'EARLY LOAD-BEARING MOBILITY',
    specLongevity: 'PERMANENT STRUCTURAL FUSION',
    bannerBg: 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white',
    footerHeadline: 'ADVANCED 3D ANATOMICAL FRACTURE RESTORATION',
    footerTagline: 'UK Fellowship Trauma Mastery • 24/7 Emergency Pelvic & Polytrauma Care',
    cards: [
      {
        script: 'High-Velocity Care',
        title: 'PELVIC & ACETABULAR RECONSTRUCTION',
        desc: 'Sub-specialist UK-trained fixation for complex fractures restoring perfect joint congruence and early mobility.',
        image: '/images/surgeries/trauma-surgery.webp',
        bg: 'from-blue-100/70 via-blue-50 to-indigo-50',
        points: [
          { title: 'UK Fellowship Trained Mastery', desc: 'Sub-specialist surgical reduction for severe high-energy pelvic ring and acetabular fractures.' },
          { title: 'Anatomic Joint Congruence', desc: 'Restores exact femoral head socket alignment to prevent traumatic post-injury hip arthritis.' },
          { title: 'Rigid Titanium Reconstruction Plates', desc: 'Contoured anatomic locking plates provide multi-planar structural stability under body weight.' },
          { title: '24/7 Emergency Trauma Response', desc: 'Immediate resuscitation, hemorrhage control, and comprehensive critical care infrastructure.' },
        ]
      },
      {
        script: 'Biological Plating',
        title: 'MINIMALLY INVASIVE FRACTURE PLATING (MIPO)',
        desc: 'Preserving natural periosteal blood flow to accelerate bone union and prevent post-traumatic deformities.',
        image: '/images/surgeries/ankle-surgery.webp',
        bg: 'from-slate-100/70 via-slate-50 to-cyan-50',
        points: [
          { title: 'Preserves Periosteal Blood Supply', desc: 'Plates inserted through small remote incisions without opening or devitalizing the fracture site.' },
          { title: 'Accelerated Natural Bone Callus', desc: 'Untouched biological fracture hematoma dramatically speeds up sound bone union.' },
          { title: 'Significantly Lower Infection Risk', desc: 'Minimal soft-tissue exposure ensures clean healing and reduces scarring.' },
          { title: 'Early Joint Motion', desc: 'Rigid internal fixation enables adjacent joints (knee, ankle, elbow) to start moving immediately.' },
        ]
      }
    ]
  }
};

const DEFAULT_SPEC = {
  script: 'Surgical Precision',
  meta: 'UK SURGICAL GOVERNANCE | 24-HR MOBILITY',
  accent: '#f59e0b',
  accentHover: '#d97706',
  specTolerance: 'SUB-MILLIMETER SURGICAL ACCURACY',
  specMobility: 'ASSISTED WALKING WITHIN 24 HOURS',
  specLongevity: '20+ YEAR IMPLANT SURVIVORSHIP',
  bannerBg: 'bg-[#f59e0b] hover:bg-[#d97706] text-slate-950',
  footerHeadline: 'EXPERIENCE ADVANCED CLINICAL SURGICAL PRECISION',
  footerTagline: 'Sub-Millimeter Joint Excellence • Rapid 24-Hour Mobility Protocol',
  cards: [
    {
      script: 'Advanced Arthroplasty',
      title: 'PRIMARY RECONSTRUCTION',
      desc: 'High-durability implants relieving chronic arthritic pain and restoring active mobility.',
      image: '/images/surgeries/knee-replacement.webp',
      bg: 'from-amber-100/70 via-amber-50 to-orange-50',
      points: [
        { title: 'Precision Anatomical Mapping', desc: 'Detailed evaluation through digital imaging and bone alignment analysis.' },
        { title: 'High-Flex Longevity Implants', desc: 'High-durability ceramic alloys engineered to relieve chronic joint pain.' },
        { title: 'Soft-Tissue Balance Protocol', desc: 'Ensures stable joint kinematics and natural flexion across full range.' },
        { title: 'Day 1 Assisted Standing', desc: 'Dedicated physiotherapy enables patients to stand and walk within 24 hours.' },
      ]
    },
    {
      script: 'Robotic Navigation',
      title: 'TISSUE-SPARING TECHNIQUES',
      desc: 'Sub-millimeter guidance sparing natural bone and ligaments for lifelong comfort.',
      image: '/images/surgeries/robotic-knee.webp',
      bg: 'from-sky-100/70 via-sky-50 to-blue-50',
      points: [
        { title: 'Sub-Millimeter Surgical Precision', desc: 'Optical guidance cuts bone strictly within planned tolerances.' },
        { title: 'Preserves Natural Ligaments', desc: 'Protects surrounding soft tissue for a natural-feeling restored joint.' },
        { title: 'Minimal Post-Op Swelling', desc: 'Smaller tissue disruption reduces bruising and hospital stay duration.' },
        { title: 'Structured Home Rehabilitation', desc: 'Comprehensive exercise guidance for independent walking and stair climbing.' },
      ]
    }
  ]
};

export const ServiceDetailPage = ({ onBookClick }) => {
  const params = useParams();
  const navigate = useNavigate();
  const currentSlug = params.chapterId || params.slug || 'knee-replacement';

  // Match by slug or alias or partial string
  const service = allServices.find(s =>
    s.slug === currentSlug ||
    s.aliases?.includes(currentSlug) ||
    currentSlug.includes(s.slug) ||
    s.slug.includes(currentSlug)
  ) || allServices[0];

  const spec = SERVICE_SPECS[service.slug] || DEFAULT_SPEC;
  const imageAsset = surgeryImages[service.slug]?.image || "/images/surgeries/knee-replacement.webp";
  const imageAlt = surgeryImages[service.slug]?.alt || service.title;

  // Dual-sided Specialty Transition Banner: Loop through SURGERY_FLOW (Previous on Left, Next on Right)
  const currentIndex = SURGERY_FLOW.findIndex(s => s.slug === service.slug);
  const safeIndex = currentIndex !== -1 ? currentIndex : 0;
  const prevIndex = (safeIndex - 1 + SURGERY_FLOW.length) % SURGERY_FLOW.length;
  const nextIndex = (safeIndex + 1) % SURGERY_FLOW.length;
  const prevSurgery = SURGERY_FLOW[prevIndex];
  const nextSurgery = SURGERY_FLOW[nextIndex];

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="relative w-full bg-[#faf8f5] text-slate-900 select-none">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: SPLIT-SCREEN MOTION HERO (Tubik Video Screen Separation)
          - Left Panel: Distinct Tint (#eae7df), STICKY PINNED in viewport
          - Right Panel: Warm Ivory (#faf8f5), SCROLLS INDEPENDENTLY
      ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-slate-300/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
          
          {/* ══════════════════════════════════════════════════════════
              LEFT PANEL (5 Cols): STICKY PINNED VIEWPORT COMPARTMENT
              Distinct background tint matching Tubik 00:00 - 00:06
          ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 bg-[#eae7df] lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)] flex flex-col justify-between p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-300/80 z-20">
            
            {/* Top Left: Minimalist Back Link */}
            <div className="shrink-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>All Specialties</span>
              </Link>
            </div>

            {/* Center: The Core 3D/Visual Asset with Realistic Shadow & Floating Motion */}
            <div className="my-auto flex items-center justify-center py-6 sm:py-10">
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full max-w-[270px] sm:max-w-[310px] lg:max-w-[350px] aspect-square rounded-3xl overflow-hidden bg-white shadow-[0_25px_60px_rgba(0,0,0,0.14)] border-4 border-white p-2.5 group"
              >
                <img
                  src={imageAsset}
                  alt={imageAlt}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition-transform duration-700"
                  loading="eager"
                />
              </motion.div>
            </div>

            {/* Bottom Left: Hospital Seal & Geographic Marker */}
            <div className="shrink-0 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest pt-2 border-t border-slate-300/60">
              <span>KHETAN HOSPITAL</span>
              <span>GORAKHPUR &bull; UP</span>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT PANEL (7 Cols): SCROLLING CONTENT FLOW
              Warm Ivory (#faf8f5) that scrolls past the pinned left panel
          ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 bg-[#faf8f5] p-6 sm:p-10 lg:p-14 xl:p-16 space-y-6 sm:space-y-8">

            {/* Signature Layered Typography: Cursive Script Accent + Bold Sans-Serif Title */}
            <div className="relative pt-2">
              <span 
                className="font-script text-3xl sm:text-4xl lg:text-5xl block select-none pointer-events-none -mb-2 sm:-mb-3.5 transform -rotate-2 origin-left"
                style={{ color: spec.accent }}
              >
                {spec.script}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.95]">
                {service.title}
              </h1>
            </div>

            {/* 2 to 3 Line Concise Narrative */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-xl">
              {service.summary}
            </p>

            {/* Solid Pill Action Trigger Button */}
            <div className="pt-1">
              <button
                onClick={onBookClick}
                className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: spec.accent }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = spec.accentHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = spec.accent; }}
              >
                Book Priority Consultation
              </button>
            </div>

            {/* Technical Clinical Specifications Table (Tubik Nutritional Format) */}
            <div className="pt-4 space-y-3 border-t border-slate-200">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900">
                CLINICAL SPECIFICATIONS &amp; BENCHMARKS
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center py-2 border-b border-slate-200/80 text-slate-600">
                  <span className="font-semibold text-slate-500 uppercase">PRECISION TOLERANCE</span>
                  <span className="font-bold text-slate-900">— {spec.specTolerance}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200/80 text-slate-600">
                  <span className="font-semibold text-slate-500 uppercase">SAME-DAY MOBILITY</span>
                  <span className="font-bold text-slate-900">— {spec.specMobility}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200/80 text-slate-600">
                  <span className="font-semibold text-slate-500 uppercase">IMPLANT LONGEVITY</span>
                  <span className="font-bold text-slate-900">— {spec.specLongevity}</span>
                </div>
              </div>

              {/* Minimalist Square Outline Badges (Tubik 5-Badge Row) */}
              <div className="pt-3 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl border border-slate-300 flex items-center justify-center text-slate-700 bg-white shadow-2xs" title="UK Royal College Fellow">
                  <Award className="w-4 h-4" />
                </div>
                <div className="w-9 h-9 rounded-xl border border-slate-300 flex items-center justify-center text-slate-700 bg-white shadow-2xs" title="Sub-Millimeter Robotic Precision">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="w-9 h-9 rounded-xl border border-slate-300 flex items-center justify-center text-slate-700 bg-white shadow-2xs" title="24-Hour Walking Protocol">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="w-9 h-9 rounded-xl border border-slate-300 flex items-center justify-center text-slate-700 bg-white shadow-2xs" title="100% Sterile Modular OT">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="w-9 h-9 rounded-xl border border-slate-300 flex items-center justify-center text-slate-700 bg-white shadow-2xs" title="IOC Sports Medicine">
                  <Stethoscope className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: STACKED HALF-AND-HALF CARDS WITH 4 CLINICAL POINTS
          Spacious horizontal banners with alternating zigzag layout (Card 1: text left, pic right | Card 2: pic left, text right)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12 sm:space-y-16">
        
        {spec.cards.map((card, cIdx) => {
          const isReversed = cIdx % 2 === 1; // Last part swaps: picture on left, text on right

          return (
            <div
              key={cIdx}
              className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg grid grid-cols-1 md:grid-cols-12 bg-white"
            >
              {/* Text Block: Left on Card 1 (md:order-1), Right on Card 2 (md:order-2) */}
              <div 
                className={`md:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4 bg-gradient-to-br ${card.bg} ${
                  isReversed ? 'md:order-2' : 'md:order-1'
                }`}
              >
                <div className="space-y-1">
                  <span 
                    className="font-script text-2xl sm:text-3xl block select-none"
                    style={{ color: spec.accent }}
                  >
                    {card.script}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                    {card.title}
                  </h3>
                </div>

                {card.desc && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light pb-1 border-b border-slate-200/60">
                    {card.desc}
                  </p>
                )}

                {/* At least 4 Clinical Bullet Points */}
                <div className="space-y-2.5 pt-1">
                  {card.points?.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <span 
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 shadow-2xs"
                        style={{ backgroundColor: spec.accent }}
                      />
                      <div>
                        <strong className="font-semibold text-slate-900 mr-1">{pt.title}:</strong>
                        <span className="font-light text-slate-600">{pt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Photo Block: Right on Card 1 (md:order-2), Left on Card 2 (md:order-1) */}
              <div 
                className={`md:col-span-6 relative min-h-[280px] md:min-h-auto overflow-hidden bg-slate-100 group ${
                  isReversed ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: BALANCED DUAL-DIRECTION NAVIGATION BANNER
          Tubik 00:11 Style: Previous Procedure on Left, Next Procedure on Right
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full border-t border-b border-black/10 overflow-hidden">
        <div className={`grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/15 ${spec.bannerBg}`}>
          
          {/* ══════════════════════════════════════════════════════════
              LEFT SIDE: PREVIOUS PROCEDURE (Pointing Left <<)
          ══════════════════════════════════════════════════════════ */}
          <button
            onClick={() => {
              navigate(`/services/${prevSurgery.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-8 sm:py-12 px-6 sm:px-10 flex items-center justify-between text-left transition-all duration-300 group cursor-pointer hover:bg-black/10"
          >
            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <motion.span 
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl sm:text-5xl font-black tracking-tight shrink-0 select-none"
              >
                &lt;&lt;
              </motion.span>
              <div className="min-w-0 text-left">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase opacity-85 block truncate">
                  EXPLORE PREVIOUS SPECIALTY
                </span>
                <span className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight block truncate">
                  {prevSurgery.title}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider group-hover:-translate-x-2 transition-transform shrink-0 ml-4">
              <ArrowLeft className="w-5 h-5" />
              <span>Previous Procedure</span>
            </div>
          </button>

          {/* ══════════════════════════════════════════════════════════
              RIGHT SIDE: NEXT PROCEDURE (Pointing Right >>)
          ══════════════════════════════════════════════════════════ */}
          <button
            onClick={() => {
              navigate(`/services/${nextSurgery.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-8 sm:py-12 px-6 sm:px-10 flex items-center justify-between text-right transition-all duration-300 group cursor-pointer hover:bg-black/10"
          >
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform shrink-0 mr-4">
              <span>Next Procedure</span>
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-end gap-3 sm:gap-6 min-w-0 ml-auto text-right">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase opacity-85 block truncate">
                  EXPLORE NEXT SPECIALTY
                </span>
                <span className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight block truncate">
                  {nextSurgery.title}
                </span>
              </div>
              <motion.span 
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl sm:text-5xl font-black tracking-tight shrink-0 select-none"
              >
                &gt;&gt;
              </motion.span>
            </div>
          </button>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: CLEAN PATIENT FAQS ACCORDION ("DIRECT SURGEON ANSWERS")
      ────────────────────────────────────────────────────────────── */}
      {service.faqs && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">
          
          <div className="text-center space-y-1">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-slate-400 block">
              CLINICAL CLARITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-slate-900' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed font-light border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: COMPREHENSIVE HOSPITAL SHUTTER FOOTER
      ────────────────────────────────────────────────────────────── */}
      <Footer isShutter={true} onBookClick={onBookClick} themeSpec={spec} serviceTitle={service.title} />

    </div>
  );
};

export default ServiceDetailPage;

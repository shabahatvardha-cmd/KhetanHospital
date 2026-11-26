import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';
import { doctorImages } from '../../data/imageConfig';

export const DoctorStorySection = ({ onBookClick }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header with Cyan Vertical Bar */}
        <div className="mb-14">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#00bcd4] inline-block rounded-full"></span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              About <span className="font-normal text-slate-600">Us</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 pl-3.5">
            Premier Orthopedic &amp; Joint Replacement Hospital in Gorakhpur
          </p>
        </div>

        {/* 2-Column Split: Image on Left with Decorative Horizontal Line, Story on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Doctor Photo with decorative line & zero cropping */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Decorative horizontal accent line */}
            <div className="hidden lg:block absolute -left-12 top-1/2 w-16 h-0.5 bg-slate-800 -translate-y-1/2"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-gradient-to-b from-sky-50 via-slate-50 to-slate-100 max-w-sm w-full p-6 flex flex-col items-center">
              <div className="relative w-full flex justify-center">
                <img
                  src={doctorImages.portrait}
                  alt="Dr. Vatsal Khetan - Senior Consultant Orthopaedic & Joint Replacement Surgeon"
                  className="w-auto max-h-[440px] object-contain drop-shadow-xl"
                  loading="lazy"
                />
              </div>

              {/* Doctor Details Bar */}
              <div className="w-full mt-4 pt-4 border-t border-slate-200/80 text-center">
                <div className="text-base font-extrabold text-slate-900">Dr. Vatsal Khetan</div>
                <div className="text-xs font-bold text-[#00bcd4] mt-0.5">Chief Orthopedic &amp; Joint Surgeon</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">FRCS (Edinburgh) &bull; M.Ch (UK) &bull; MS (Ortho)</div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Details */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
              <strong className="text-slate-900 font-extrabold">Khetan Hospital</strong> is a premier centre of surgical excellence where every patient is guided to painless, active mobility.
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Led by <strong>Dr. Vatsal Khetan</strong>, an experienced and pioneering orthopedic surgeon in Gorakhpur specializing in robotic knee replacement, hip reconstruction, arthroscopy, and sports medicine. After completing his MBBS (2014) and MS in Orthopaedics (2018), he underwent extensive sub-specialty fellowship training under two of India's most celebrated pioneers — Dr. Nilen Shah (Advanced Knee Arthroplasty) and Dr. Anant Joshi (Sportsmed Mumbai).
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dr. Khetan acquired advanced international surgical credentials in the United Kingdom, completing an <strong>M.Ch. in Knee Arthroplasty</strong> at Edge Hill University, clinical training at <strong>Rotherham NHS Foundation Trust Hospital (UK)</strong> and <strong>Wrightington Hospital</strong> (the historic birthplace of modern hip arthroplasty), and earning the prestigious <strong>FRCS (Trauma &amp; Orthopaedics)</strong> from the Royal College of Surgeons of Edinburgh.
            </p>

            {/* Core Clinical Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00bcd4] shrink-0" />
                <span>Sub-Millimeter Robotic Joint Alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00bcd4] shrink-0" />
                <span>Assisted Walking Within 24 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00bcd4] shrink-0" />
                <span>IOC Switzerland Olympic Sports Protocols</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00bcd4] shrink-0" />
                <span>100% Cashless TPA Hospitalization</span>
              </div>
            </div>

            {/* Rounded Outline Button */}
            <div className="pt-4">
              <Link
                to="/about"
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#ff5722] border-2 border-[#ff5722] hover:bg-[#ff5722] hover:text-white transition-all duration-200 inline-flex items-center gap-2"
              >
                <span>View More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

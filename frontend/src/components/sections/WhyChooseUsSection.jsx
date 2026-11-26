import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { surgeryImages, backgroundTextures } from '../../data/imageConfig';

export const WhyChooseUsSection = ({ onBookClick }) => {
  return (
    <div className="w-full">
      
      {/* 1. Dark Navy "Why Choose Us" Box */}
      <section className="bg-[#282d3c] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Modular OT Overlay */}
        <img 
          src={backgroundTextures.modularOt} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none select-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#282d3c]/95 via-[#282d3c]/90 to-[#282d3c]/95 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header with Cyan Vertical Bar */}
          <div className="mb-12">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#00bcd4] inline-block rounded-full"></span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Why <span className="font-normal text-slate-300">Choose Us</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 pl-3.5">
              Advanced surgical navigation and evidence-based protocols
            </p>
          </div>

          {/* 2-Column Split: Content on Left, Photo on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light text-slate-100 leading-snug">
                Our goal is to make sure <strong className="font-extrabold text-white">with advances in technology</strong>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                At Khetan Hospital, we have integrated state-of-the-art robotic 3D CT mapping and sub-millimeter surgical instruments. Dr. Vatsal Khetan’s British-fellowship training ensures that implant positioning aligns with your unique natural kinematics, reducing post-operative pain and enabling unassisted walking within 24 hours.
              </p>

              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00bcd4]" />
                  <span>Sub-millimeter implant positioning for 20+ year joint longevity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00bcd4]" />
                  <span>Minimally invasive keyhole arthroscopy with minimal scarring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00bcd4]" />
                  <span>100% Cashless TPA insurance admission with zero hidden costs</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/services/robotic-knee-surgery"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff5722] hover:bg-[#e64a19] text-white shadow-lg transition-all duration-200 inline-flex items-center gap-2"
                >
                  <span>More about practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700 max-w-md w-full bg-slate-900 group">
                <img 
                  src={surgeryImages["robotic-knee-surgery"].image} 
                  alt="Sub-Millimeter Robotic Surgery Technology at Khetan Hospital"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. 24/7 Customer / Emergency Support Band (Exact Oreo Page 3) */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-100 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <h3 className="text-xl sm:text-2xl font-normal text-slate-800">
            We provide 24/7 customer support.
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Please feel free to contact us at <strong>+91 96623 65917</strong> for emergency case.
          </p>
          <div className="pt-2">
            <a
              href="tel:9662365917"
              className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#ff5722] border border-[#ff5722] hover:bg-[#ff5722] hover:text-white transition-all inline-block"
            >
              Read More
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

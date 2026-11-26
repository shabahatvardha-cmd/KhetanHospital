import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ShieldCheck,
  Bot,
  Stethoscope,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import { surgeryImages } from '../../data/imageConfig';

export const CareSection = ({ onBookClick }) => {
  const services = [
    {
      slug: "robotic-knee-surgery",
      title: "Robotic Knee Surgery",
      icon: Bot,
      tag: "Robotic 3D Guidance",
      desc: "Sub-millimeter 3D CT mapping and real-time robotic guidance ensure natural knee alignment, reduced blood loss, and walking within 24 hours."
    },
    {
      slug: "knee-replacement",
      title: "Total Knee Replacement",
      icon: Activity,
      tag: "20+ Year Longevity",
      desc: "Advanced total and partial knee arthroplasty using high-durability implants engineered for 20+ year longevity, eradicating chronic arthritic pain."
    },
    {
      slug: "hip-replacement",
      title: "Hip Replacement & AVN",
      icon: ShieldCheck,
      tag: "Wrightington UK Technique",
      desc: "Minimally invasive hip arthroplasty utilizing ceramic bearings and Wrightington UK techniques for severe avascular necrosis and arthritis."
    },
    {
      slug: "shoulder-replacement",
      title: "Shoulder Surgery & Repair",
      icon: Stethoscope,
      tag: "Keyhole Cuff Repair",
      desc: "Comprehensive anatomical and reverse shoulder arthroplasty, rotator cuff repair, and frozen shoulder relief with smooth overhead mobility."
    },
    {
      slug: "acl-surgery",
      title: "ACL & Sports Medicine",
      icon: Sparkles,
      tag: "Olympic IOC Protocol",
      desc: "Keyhole arthroscopic ligament reconstruction (ACL/PCL), inside-out meniscus preservation, and cartilage restoration for active athletes."
    },
    {
      slug: "trauma-surgery",
      title: "Trauma & Fracture Care",
      icon: Award,
      tag: "24/7 Fracture Fixation",
      desc: "Emergency surgical reconstruction of complex pelvic-acetabular fractures, peri-articular injuries, non-unions, and geriatric fragility."
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header with Cyan Vertical Bar */}
        <div className="mb-14">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#00bcd4] inline-block rounded-full"></span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Our <span className="font-normal text-slate-600">Best Services</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 pl-3.5">
            World-class orthopedic surgical procedures and joint preservation
          </p>
        </div>

        {/* 6 Services Grid with Rich Procedural Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const imgData = surgeryImages[srv.slug];
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Procedural Photo Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={imgData?.image}
                      alt={imgData?.alt || srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20"></div>

                    {/* Floating Icon Badge */}
                    <div className="absolute top-3.5 left-3.5 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#00bcd4] group-hover:bg-[#00bcd4] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>

                    {/* Clinical Feature Tag */}
                    <span className="absolute top-3.5 right-3.5 text-[10px] font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-slate-100">
                      {srv.tag}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-[#00bcd4] transition-colors mb-2">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100/80 flex items-center justify-between">
                  <Link
                    to={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5722] hover:text-[#e64a19] transition-colors"
                  >
                    <span>View More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={onBookClick}
                    className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#00bcd4] hover:bg-[#00acc1] text-white shadow-xs transition-all cursor-pointer"
                  >
                    Book OPD
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

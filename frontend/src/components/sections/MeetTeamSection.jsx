import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, Award } from 'lucide-react';

export const MeetTeamSection = ({ onBookClick }) => {
  const team = [
    {
      name: "Dr. Vatsal Khetan",
      role: "Chief Orthopaedic & Robotic Surgeon",
      qualification: "MBBS, MS (Ortho), MRCS, FRCS (Edinburgh), M.Ch (UK)",
      image: "/images/dr-vatsal-portrait.webp",
      link: "/about"
    },
    {
      name: "Robotic Arthroplasty Team",
      role: "Sub-Millimeter Knee Team",
      qualification: "Wrightington & Rotherham NHS Protocols",
      image: "/images/dr-vatsal-robotic.webp",
      link: "/services/robotic-knee-surgery"
    },
    {
      name: "Sports Medicine & Arthroscopy",
      role: "Ligament & Meniscus Specialists",
      qualification: "IOC Switzerland Olympic Diploma Standards",
      image: "/images/dr-vatsal-fellowship.webp",
      link: "/services/acl-surgery"
    },
    {
      name: "Trauma & Fracture Salvage",
      role: "Emergency Pelvic & Complex Trauma",
      qualification: "24/7 Dedicated Emergency Operation Theatre",
      image: "/images/dr-vatsal-consult.webp",
      link: "/services/trauma-surgery"
    }
  ];

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Oreo Section Header with Cyan Vertical Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#00bcd4] inline-block rounded-full"></span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                Meet <span className="font-normal text-slate-600">Our Team</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 pl-3.5">
              Fellowship-trained surgical consultants and clinical care teams
            </p>
          </div>

          <p className="text-xs text-slate-500 max-w-md leading-relaxed">
            <strong>Khetan Hospital</strong> brings together UK NHS fellowship qualifications and leading Indian mentor techniques to deliver world-class joint care in Gorakhpur.
          </p>
        </div>

        {/* 4 Doctor Cards Grid (Exact Oreo Team Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 text-center shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo */}
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden bg-slate-100 mb-5 border-2 border-slate-100 shadow-sm">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#00bcd4] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  {member.role}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  {member.qualification}
                </p>
              </div>

              {/* Social / Contact Icons & Outline Button */}
              <div className="pt-5 mt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-center gap-3 text-slate-400">
                  <a href="tel:9662365917" className="hover:text-[#00bcd4] transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://wa.me/919662365917" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>

                <Link
                  to={member.link}
                  className="w-full py-1.5 px-4 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#ff5722] border border-[#ff5722] hover:bg-[#ff5722] hover:text-white transition-all inline-block"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

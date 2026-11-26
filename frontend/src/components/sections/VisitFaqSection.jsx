import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight, ShieldCheck, HelpCircle, Phone } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';

export const VisitFaqSection = ({ onBookClick }) => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Where is Khetan Hospital located in Gorakhpur and what are the OPD hours?",
      a: "Khetan Hospital is conveniently located at Vikas Nagar Bargadawa Gorakhpur, Gorakhpur, Uttar Pradesh, 273015. Consultation timings are Monday to Saturday: 09:00 AM - 01:00 PM and 02:00 PM - 08:00 PM."
    },
    {
      q: "Do you accept health insurance and provide cashless TPA facilities?",
      a: "Yes. We support 100% cashless hospitalization across all leading health insurance companies and Third Party Administrators (TPAs) including Star Health, Care Health, HDFC ERGO, ICICI Lombard, Bajaj Allianz, National Insurance, New India Assurance, and all corporate TPAs. Our on-site desk handles pre-authorization and paperless billing."
    },
    {
      q: "What medical documents should I bring to my first orthopedic consultation?",
      a: "Please bring any recent Knee or Shoulder X-rays, MRI scans, CT scans, blood work reports, a list of ongoing medications, and previous surgical discharge summaries if applicable. If you do not have recent X-rays, our clinic coordinates digital weight-bearing views."
    },
    {
      q: "How soon can a patient stand or walk after robotic knee replacement?",
      a: "With advanced robotic alignment and multimodal pain management, most patients begin assisted standing and gentle knee bending within 24 hours of surgery. Full independent walking and climbing stairs is typically restored within 4 to 8 weeks."
    },
    {
      q: "Do I always need open surgery for an ACL tear or rotator cuff injury?",
      a: "No! The vast majority of ACL reconstructions and rotator cuff repairs performed by Dr. Vatsal Khetan use minimally invasive keyhole arthroscopy. With pencil-sized incisions and high-definition cameras, muscle cutting is minimized, resulting in faster athletic recovery and minimal scarring."
    },
    {
      q: "Can knee pain be treated without surgery?",
      a: "Absolutely. Dr. Vatsal Khetan's clinical philosophy prioritizes joint preservation first. For mild to moderate arthritis or early sports injuries, we explore conservative management including targeted physiotherapy, weight reduction counseling, viscosupplementation, and biological injections before ever recommending surgery."
    }
  ];

  return (
    <section id="your-visit" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 relative" aria-labelledby="visit-title">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Intro & Insurance Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-sky-100 text-[#08284d]">
            <HelpCircle className="w-3.5 h-3.5 text-[#00b4d8]" />
            05 / BEFORE WE SAY HELLO
          </span>

          <h2 id="visit-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#08284d] leading-tight">
            Less wondering.<br />
            <span className="text-[#00b4d8]">More peace of mind.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            A little preparation makes a big difference. Here is everything you need to know regarding cashless insurance, consultation prep, and recovery expectations at Khetan Hospital, Bargadawa.
          </p>

          {/* Cashless Insurance Note Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#08284d]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>CASHLESS HEALTH INSURANCE &amp; TPA</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We help you verify your policy benefits prior to planned procedures. 100% cashless eligibility, pre-authorizations, and claim submissions are facilitated smoothly by our dedicated coordinator.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <button 
                onClick={onBookClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08284d] hover:text-[#00b4d8] transition-colors"
              >
                <span>Book OPD Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#f37021]" />
              </button>
              <a 
                href="tel:9662365917"
                className="text-[11px] font-bold text-slate-500 hover:text-[#08284d] inline-flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#f37021]" />
                <span>9662365917</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive FAQ Accordion (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#08284d] hover:text-[#00b4d8] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#08284d] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}

          <div className="p-4 text-center">
            <p className="text-[11px] text-slate-400">
              Have another question? Reach out directly to Khetan Hospital OPD Desk at <strong>+91 96623 65917</strong>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

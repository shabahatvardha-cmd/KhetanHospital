import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calendar, Phone, MessageCircle, Award, ShieldCheck } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';
import { doctorImages } from '../../data/imageConfig';

export const HeroSection = ({ onBookClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    doctor: 'Dr. Vatsal Khetan (FRCS Edinburgh)',
    department: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNameChange = (e) => {
    const textOnly = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData(prev => ({ ...prev, name: textOnly }));
    setErrorMsg('');
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: digitsOnly }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter patient full name.');
      return;
    }
    if (formData.phone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.department) {
      setErrorMsg('Please select a department / treatment.');
      return;
    }

    const msg = `*Appointment Request - Khetan Hospital*%0A` +
      `👤 *Patient:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Mobile:* +91 ${encodeURIComponent(formData.phone)}%0A` +
      `📅 *Date:* ${encodeURIComponent(formData.date)}%0A` +
      `👨‍⚕️ *Doctor:* ${encodeURIComponent(formData.doctor)}%0A` +
      `🏥 *Department:* ${encodeURIComponent(formData.department)}`;

    window.open(`https://wa.me/919662365917?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="relative bg-[#edf1f5] pt-12 pb-20 sm:pb-28 overflow-hidden">

      {/* Hero Banner Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-6 pt-4 lg:pt-0">
            <div>
              <span className="text-sm sm:text-base font-normal text-slate-500 block mb-1">
                Welcome to
              </span>
              <h1 className="text-4xl sm:text-6xl font-light text-slate-800 tracking-tight leading-none">
                Khetan <strong className="font-extrabold text-slate-900">Hospital</strong>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
              Gorakhpur's premier centre for sub-millimeter robotic knee replacements, hip reconstruction, and sports medicine under the clinical leadership of <strong>Dr. Vatsal Khetan</strong> (FRCS Edinburgh, UK NHS Fellowship).
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onBookClick}
                className="px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff5722] hover:bg-[#e64a19] text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                View More
              </button>

              <a
                href="tel:9662365917"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#00bcd4] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#ff5722]" />
                <span>Emergency: 9662365917</span>
              </a>
            </div>
          </div>

          {/* Right Column: Doctor Portrait Photo (Uncropped Transparent Cutout) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            {/* Ambient Backlight Glow behind doctor */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#00bcd4]/20 via-sky-300/15 to-transparent blur-3xl"></div>
            </div>

            {/* Doctor Image Container */}
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={doctorImages.hero}
                alt="Dr. Vatsal Khetan - Senior Consultant Orthopaedic & Joint Replacement Surgeon"
                className="w-auto max-h-[460px] sm:max-h-[520px] lg:max-h-[560px] object-contain drop-shadow-2xl select-none"
                loading="eager"
              />

              {/* Floating Badge / Accreditation Pill */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00bcd4] to-sky-600 flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0">
                  FRCS
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 leading-tight">Dr. Vatsal Khetan</div>
                  <div className="text-[10px] text-slate-500 font-medium">FRCS (Edinburgh) &bull; M.Ch (UK)</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating "Make an Appointment" Form Card (Exact Oreo Overlap) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8">

          <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00bcd4]"></span>
            Make an Appointment
          </h2>

          {submitted ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you! Your appointment request has been transmitted via WhatsApp.</span>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs underline font-bold"
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                  {errorMsg}
                </div>
              )}
              {/* Row 1: 3 Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Enter Name (letters only)"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full text-xs px-4 py-2.5 rounded-full bg-white border border-slate-200 focus:outline-hidden focus:border-[#00bcd4] text-slate-700"
                />

                <div className="flex rounded-full overflow-hidden border border-slate-200 focus-within:border-[#00bcd4] bg-white">
                  <span className="inline-flex items-center px-3 bg-slate-100 text-slate-700 font-bold text-xs border-r border-slate-200 select-none">
                    +91
                  </span>
                  <input 
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="flex-1 text-xs px-3 py-2.5 bg-white focus:outline-hidden text-slate-700"
                  />
                </div>

                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs px-4 py-2.5 rounded-full bg-white border border-slate-200 focus:outline-hidden focus:border-[#00bcd4] text-slate-700"
                />
              </div>

              {/* Row 2: 2 Dropdowns + Submit Button */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <select
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full text-xs px-4 py-2.5 rounded-full bg-white border border-slate-200 focus:outline-hidden focus:border-[#00bcd4] text-slate-700"
                >
                  <option value="Dr. Vatsal Khetan (FRCS Edinburgh)">Dr. Vatsal Khetan (FRCS Edinburgh)</option>
                  <option value="Orthopedic Trauma Unit">Orthopedic Trauma &amp; Fracture Unit</option>
                  <option value="Sports Medicine Specialist">Sports Medicine Specialist Desk</option>
                </select>

                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className={`w-full text-xs px-4 py-2.5 rounded-full bg-white border border-slate-200 focus:outline-hidden focus:border-[#00bcd4] ${formData.department ? 'text-slate-700' : 'text-slate-400'}`}
                >
                  <option value="" disabled className="text-slate-400">Select treatment / department *</option>
                  <option value="Robotic Knee Replacement">Robotic Knee Replacement</option>
                  <option value="Total Knee Replacement (TKR)">Total Knee Replacement (TKR)</option>
                  <option value="Hip Replacement & AVN">Hip Replacement &amp; AVN</option>
                  <option value="Shoulder Surgery & Arthroscopy">Shoulder Surgery &amp; Arthroscopy</option>
                  <option value="ACL & Sports Ligament Repair">ACL &amp; Sports Ligament Repair</option>
                  <option value="General Joint Pain Consultation">General Joint Pain Consultation</option>
                </select>

                <button
                  type="submit"
                  className="w-full py-2.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff5722] hover:bg-[#e64a19] text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
};

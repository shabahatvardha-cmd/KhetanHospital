import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Stethoscope, 
  ArrowUpRight 
} from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';

export const BookingInvitationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    slot: 'Evening (02:00 PM - 08:00 PM)',
    city: 'Gorakhpur',
    symptoms: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
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
      setErrorMsg('Please select a department or treatment.');
      return;
    }
    
    // Construct structured WhatsApp message
    const message = `*OPD Appointment Request - Khetan Hospital (Dr. Vatsal Khetan)*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `👤 *Patient Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Mobile No:* +91 ${encodeURIComponent(formData.phone)}%0A` +
      `🏥 *Department:* ${encodeURIComponent(formData.department)}%0A` +
      `📍 *District / City:* ${encodeURIComponent(formData.city)}%0A` +
      `📅 *Preferred Date:* ${encodeURIComponent(formData.date)}%0A` +
      `⏰ *Preferred Slot:* ${encodeURIComponent(formData.slot)}%0A` +
      `📝 *Symptoms / History:* ${encodeURIComponent(formData.symptoms || 'General Orthopedic Consultation')}%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `_Sent from drvatsalkhetan.com_`;

    window.open(`https://wa.me/919662365917?text=${message}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="book-appointment" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 to-slate-200/70 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[#08284d] text-[#00b4d8] mb-3">
            FAST-TRACK CONSULTATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#08284d]">
            Make an Appointment at Khetan Hospital
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Schedule your evaluation with Dr. Vatsal Khetan at Bargadawa, Gorakhpur. Avoid long queues and receive priority slot confirmation directly on WhatsApp.
          </p>
        </div>

        {/* Two-Column Booking Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Doctor Profile & Contact Quick-Links */}
          <div className="lg:col-span-5 bg-[#08284d] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#00b4d8]/10 pointer-events-none blur-2xl"></div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/images/dr-vatsal-consult.webp" 
                  alt="Dr. Vatsal Khetan Consultation" 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00b4d8] shadow-md"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Dr. Vatsal Khetan</h3>
                  <p className="text-xs text-[#00b4d8] font-semibold">
                    MBBS &bull; MS (Ortho) &bull; MRCS &bull; FRCS (UK)
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Chief Orthopedic Surgeon &bull; Khetan Hospital
                  </p>
                </div>
              </div>

              <div className="space-y-5 border-t border-white/10 pt-6">
                {/* Emergency Phone */}
                <a 
                  href="tel:9662365917"
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f37021] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Priority / Emergency Call
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#f37021] transition-colors">
                      +91 96623 65917
                    </span>
                    <p className="text-[10px] text-slate-400">Direct hospital helpline</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/919662365917?text=Hello%20Dr.%20Vatsal%20Khetan%20Clinic,%20I%20would%20like%20to%20book%20an%20OPD%20appointment."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Instant WhatsApp Desk
                    </span>
                    <span className="text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      Chat on WhatsApp
                    </span>
                    <p className="text-[10px] text-slate-400">Send reports &amp; queries</p>
                  </div>
                </a>

                {/* OPD Timings */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#00b4d8] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      OPD Timings (Mon - Sat)
                    </span>
                    <span className="text-xs font-bold text-white">
                      09:00 AM - 01:00 PM &bull; 02:00 PM - 08:00 PM
                    </span>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Sunday by Prior Emergency Appointment</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Hospital Location
                    </span>
                    <span className="text-xs font-bold text-white">
                      Vikas Nagar, Bargadawa
                    </span>
                    <p className="text-[10px] text-slate-300">Gorakhpur, Uttar Pradesh, 273015</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Note */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#00b4d8] shrink-0" />
              <p className="text-[11px] text-slate-300 leading-snug">
                <strong>Cashless TPA Support:</strong> 100% cashless hospitalization support across Star Health, Care, HDFC ERGO, ICICI Lombard, Bajaj, and all government/corporate TPAs.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-[#08284d]">
                  Appointment Request Sent!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your consultation request for <strong>{formData.department}</strong> on <strong>{formData.date}</strong> has been transmitted to Khetan Hospital's clinical coordinator on WhatsApp.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <a 
                    href="tel:9662365917"
                    className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#08284d] text-white hover:bg-[#00458b] transition-all inline-flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#f37021]" />
                    <span>Call Hospital Desk: 9662365917</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        ...formData,
                        name: '',
                        phone: '',
                        symptoms: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#08284d] mb-1">
                    Book Priority Consultation
                  </h3>
                  <p className="text-xs text-slate-500 mb-5">
                    Please provide your patient details. We will confirm your OPD slot immediately.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rajesh Kumar (letters only)"
                      value={formData.name}
                      onChange={handleNameChange}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00b4d8] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00b4d8] transition-all">
                      <span className="inline-flex items-center px-3.5 bg-slate-100 text-slate-700 font-bold text-xs border-r border-slate-200 select-none">
                        +91
                      </span>
                      <input 
                        type="tel" 
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="flex-1 text-xs p-3 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Department / Concern *
                    </label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className={`w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00b4d8] transition-all ${
                        formData.department ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      <option value="" disabled className="text-slate-400">
                        Select treatment / service needed *
                      </option>
                      <option value="Robotic Knee Surgery" className="text-slate-800">Robotic Knee Replacement</option>
                      <option value="Total Knee Replacement" className="text-slate-800">Total Knee Replacement (TKR)</option>
                      <option value="Hip Replacement" className="text-slate-800">Hip Replacement &amp; AVN Care</option>
                      <option value="Shoulder Surgery & Arthroscopy" className="text-slate-800">Shoulder Surgery &amp; Keyhole Repair</option>
                      <option value="ACL & Sports Injury" className="text-slate-800">ACL &amp; Ligament Sports Injury</option>
                      <option value="Knee Keyhole Arthroscopy" className="text-slate-800">Knee Arthroscopy (Meniscus/Cartilage)</option>
                      <option value="Complex Trauma & Fractures" className="text-slate-800">Complex Trauma &amp; Fracture Fixation</option>
                      <option value="General Orthopedic Consultation" className="text-slate-800">General Orthopedic Consultation / Second Opinion</option>
                    </select>
                  </div>

                  {/* District / City */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient District / City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00b4d8] transition-all"
                    >
                      <option value="Gorakhpur">Gorakhpur</option>
                      <option value="Deoria">Deoria</option>
                      <option value="Basti">Basti</option>
                      <option value="Kushinagar">Kushinagar</option>
                      <option value="Maharajganj">Maharajganj</option>
                      <option value="Siddharthnagar">Siddharthnagar</option>
                      <option value="Sant Kabir Nagar">Sant Kabir Nagar</option>
                      <option value="Siwan (Bihar)">Siwan (Bihar)</option>
                      <option value="Bettiah (Bihar)">Bettiah (Bihar)</option>
                      <option value="Gopalganj (Bihar)">Gopalganj (Bihar)</option>
                      <option value="Other / Nepal">Other / Nepal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Date *
                    </label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00b4d8] transition-all"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.slot}
                      onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00b4d8] transition-all"
                    >
                      <option value="Morning (09:00 AM - 01:00 PM)">Morning: 09:00 AM - 01:00 PM</option>
                      <option value="Evening (02:00 PM - 08:00 PM)">Evening: 02:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Symptoms / Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Describe Your Pain / Previous Surgery (Optional)
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Severe knee pain for 2 years, trouble walking stairs, have previous X-rays..."
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00b4d8] transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#08284d] to-[#0c3668] hover:from-[#0c3668] hover:to-[#08284d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Confirm OPD Appointment via WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-[#f37021]" />
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  * No advance payment required for OPD slot booking. Pay directly at Bargadawa clinic counter.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

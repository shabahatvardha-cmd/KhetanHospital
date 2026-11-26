import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { clinicInfo, treatmentsData } from '../data/navigationData';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Strictly text and spaces only for patient name
  const handleNameChange = (e) => {
    const textOnly = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData(prev => ({ ...prev, name: textOnly }));
    setErrorMsg('');
  };

  // Strictly digits only, max 10 digits for mobile number
  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: digitsOnly }));
    setErrorMsg('');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter patient full name.');
      return;
    }
    if (formData.phone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.service) {
      setErrorMsg('Please select a treatment or service.');
      return;
    }

    const msg = `*New Inquiry - Khetan Hospital (Dr. Vatsal Khetan)*%0A` +
      `👤 *Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone:* +91 ${encodeURIComponent(formData.phone)}%0A` +
      `📍 *City:* ${encodeURIComponent(formData.city || 'Gorakhpur')}%0A` +
      `🩺 *Inquiry For:* ${encodeURIComponent(formData.service)}%0A` +
      `📝 *Message:* ${encodeURIComponent(formData.message || 'General consultation request')}`;

    window.open(`https://wa.me/${clinicInfo.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen select-none">

      {/* 1. Header Banner */}
      <section className="bg-[#edf1f5] border-b border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#00bcd4] inline-block rounded-full"></span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                Contact <span className="font-normal text-slate-600">Khetan Hospital</span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-3.5">
              Priority hospital desk &bull; Vikas Nagar, Bargadawa, Gorakhpur
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Hospital Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#00bcd4] inline-block rounded-full"></span>
                <h3 className="text-lg font-bold text-slate-800">
                  Hospital Information
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-[#ff5722] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="block text-slate-900 text-xs sm:text-sm font-bold">Hospital Address</strong>
                    {clinicInfo.location}
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-[#00bcd4] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="block text-slate-900 text-xs sm:text-sm font-bold">Priority Phone / Helpline</strong>
                    <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="font-bold text-[#ff5722] hover:underline">
                      {clinicInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="block text-slate-900 text-xs sm:text-sm font-bold">Direct Email</strong>
                    <a href={`mailto:${clinicInfo.email}`} className="text-sky-700 hover:underline">
                      {clinicInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#08284d] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="block text-slate-900 text-xs sm:text-sm font-bold">OPD Timings</strong>
                    {clinicInfo.timings}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-5 bg-[#ff5722] inline-block rounded-full"></span>
                <h3 className="text-lg font-bold text-slate-800">
                  Send an Inquiry
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    We have redirected your message to Khetan Hospital's official WhatsApp consultation line.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', city: '', service: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00bcd4] text-white hover:bg-[#00acc1] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-4">
                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Patient Full Name (Text only) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="e.g. Ramesh Kumar (letters only)"
                        className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs focus:border-[#00bcd4] focus:outline-hidden"
                      />
                    </div>

                    {/* Mobile Number (Country code + 10 digits only) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (10 Digits) *</label>
                      <div className="flex rounded-full overflow-hidden border border-slate-200 focus-within:border-[#00bcd4]">
                        <span className="inline-flex items-center px-3.5 bg-slate-100 text-slate-700 font-bold text-xs border-r border-slate-200 select-none">
                          +91
                        </span>
                        <input 
                          type="tel" 
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="9876543210"
                          className="flex-1 px-4 py-2.5 text-xs bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Gorakhpur, Deoria, Basti..."
                        className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs focus:border-[#00bcd4] focus:outline-hidden"
                      />
                    </div>

                    {/* Service Select (Not auto-selected) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Service / Treatment Required *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs focus:border-[#00bcd4] focus:outline-hidden bg-white cursor-pointer ${
                          formData.service ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        <option value="" disabled className="text-slate-400">
                          Select treatment / service needed *
                        </option>
                        {treatmentsData.map((t, i) => (
                          <option key={i} value={t.name} className="text-slate-800">
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes / Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Brief Symptoms or Notes</label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Severe knee pain when walking, previous X-ray shows osteoarthritis..."
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:border-[#00bcd4] focus:outline-hidden resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff5722] hover:bg-[#e64a19] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Send Inquiry to Hospital</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};

export default ContactPage;

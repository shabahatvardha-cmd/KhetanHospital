import React, { useState, useEffect } from 'react';
import { X, User, Phone, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { treatmentsData, clinicInfo } from '../../data/navigationData';

export const AppointmentModal = ({ isOpen, onClose, initialPhone = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: '',
    date: new Date().toISOString().split('T')[0],
    slot: 'Morning (10:30 AM - 02:00 PM)',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen && initialPhone) {
      const digits = String(initialPhone).replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: digits }));
    }
  }, [isOpen, initialPhone]);

  if (!isOpen) return null;

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
    if (!formData.treatment) {
      setErrorMsg('Please select a treatment or service.');
      return;
    }

    const msg = `*Appointment Request - Khetan Hospital (Dr. Vatsal Khetan)*%0A` +
      `👤 *Patient:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone:* +91 ${encodeURIComponent(formData.phone)}%0A` +
      `🩺 *Service:* ${encodeURIComponent(formData.treatment)}%0A` +
      `📅 *Date:* ${encodeURIComponent(formData.date)}%0A` +
      `⏰ *Slot:* ${encodeURIComponent(formData.slot)}%0A` +
      `📝 *Notes:* ${encodeURIComponent(formData.notes || 'None')}`;

    window.open(`https://wa.me/${clinicInfo.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0b2545] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Book An Appointment</h3>
            <p className="text-xs text-cyan-300">{clinicInfo.clinicName} &bull; Bargadawa, Gorakhpur</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Request Sent to Khetan Hospital!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We have forwarded your consultation request to Khetan Hospital's clinical team on WhatsApp.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="bg-[#0b2545] text-white text-xs font-bold py-2 px-6 rounded-xl hover:bg-[#133966] cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. Patient Full Name (Text only) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar (letters only)"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full text-xs p-2.5 pl-8 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                />
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* 2. Mobile Number (Country code + 10 digits only) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (10 Digits) *</label>
              <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
                <span className="inline-flex items-center px-3 bg-slate-100 text-slate-700 font-bold text-xs border-r border-slate-200 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="flex-1 text-xs p-2.5 bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Treatment / Service Dropdown (Not auto-selected) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Treatment / Concern *</label>
              <select
                required
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                className={`w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-600 cursor-pointer ${
                  formData.treatment ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                <option value="" disabled className="text-slate-400">
                  Select treatment / service needed *
                </option>
                {treatmentsData.map(proc => (
                  <option key={proc.name} value={proc.name} className="text-slate-800">
                    {proc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Preferred Date & OPD Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">OPD Slot</label>
                <select
                  value={formData.slot}
                  onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-hidden"
                >
                  <option value="Morning (10:30 AM - 02:00 PM)">Morning (10:30 AM - 2:00 PM)</option>
                  <option value="Evening (05:30 PM - 08:30 PM)">Evening (05:30 PM - 8:30 PM)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-[#0077b6] hover:bg-[#00529b] text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Appointment via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;

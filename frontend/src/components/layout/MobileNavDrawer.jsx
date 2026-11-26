import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronRight, 
  MessageCircle, 
  Activity, 
  Clock, 
  ShieldCheck,
  Lock
} from 'lucide-react';
import { clinicInfo, treatmentsData } from '../../data/navigationData';

export const MobileNavDrawer = ({ isOpen, onClose, onBookAppointment, onOpenAdmin, isAdminView, onSelectTreatment }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  if (!isOpen) return null;

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="font-bold text-navy-900 text-sm">{clinicInfo.name}</h3>
            <p className="text-[11px] text-brand-700 font-medium">{clinicInfo.clinicName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Links & Accordions */}
        <div className="p-4 space-y-4 flex-1">
          {/* Quick Action Badges */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onBookAppointment();
                onClose();
              }}
              className="bg-brand-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            <a
              href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=Hello%20Dr.%20Vatsal%20Khetan%20Clinic,%20I%20would%20like%20to%20consult%20for%20orthopedic%20treatment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Navigation Accordion: Treatments */}
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Surgical Specialities & Treatments
            </p>

            <div className="space-y-1">
              {treatmentsData.map((cat) => {
                const isExpanded = expandedCategory === cat.id;
                return (
                  <div key={cat.id} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full text-left p-3 flex items-center justify-between text-xs font-bold text-navy-900 hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-2">
                        <Activity className="w-3.5 h-3.5 text-brand-600" />
                        <span>{cat.category}</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-brand-600' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="p-2.5 bg-slate-50/70 border-t border-slate-100 space-y-1.5">
                        {cat.procedures.map((proc) => (
                          <div
                            key={proc.slug}
                            onClick={() => {
                              onSelectTreatment && onSelectTreatment(proc);
                              onClose();
                            }}
                            className="p-2 rounded-lg bg-white border border-slate-200/60 text-xs font-semibold text-slate-800 hover:text-brand-700 flex items-center justify-between cursor-pointer"
                          >
                            <span>{proc.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-300" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinic & Doctor Info */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="p-3 bg-navy-50 rounded-xl text-navy-900 space-y-1">
              <div className="font-bold flex items-center text-navy-950">
                <Clock className="w-3.5 h-3.5 text-brand-600 mr-1.5" />
                <span>Gorakhpur OPD Timings</span>
              </div>
              <p className="text-[11px] text-slate-600">Morning: {clinicInfo.contact.opdTimings.morning}</p>
              <p className="text-[11px] text-slate-600">Evening: {clinicInfo.contact.opdTimings.evening}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-slate-700 space-y-1">
              <div className="font-bold flex items-center text-navy-900">
                <MapPin className="w-3.5 h-3.5 text-brand-600 mr-1.5" />
                <span>Clinic Address</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {clinicInfo.contact.address.line1}, {clinicInfo.contact.address.line2}, {clinicInfo.contact.address.city} - {clinicInfo.contact.address.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Controls */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-2.5">
          <a
            href={`tel:${clinicInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="w-full flex items-center justify-center space-x-2 bg-navy-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-navy-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-400" />
            <span>Call Clinic: {clinicInfo.contact.primaryPhone}</span>
          </a>

          <button
            onClick={() => {
              onOpenAdmin();
              onClose();
            }}
            className="w-full flex items-center justify-center space-x-1.5 bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-semibold text-xs py-2 rounded-xl transition-colors"
          >
            <Lock className="w-3 h-3 text-slate-500" />
            <span>{isAdminView ? 'Switch to Patient Site' : 'Staff / Doctor Admin Portal'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

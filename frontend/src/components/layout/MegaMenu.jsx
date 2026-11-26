import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Flame, 
  Bone, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight,
  Stethoscope,
  Award
} from 'lucide-react';
import { treatmentsData, clinicInfo } from '../../data/navigationData';

const iconMap = {
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Flame: Flame,
  Bone: Bone,
  Sparkles: Sparkles,
};

export const MegaMenu = ({ isOpen, onClose, onSelectTreatment, onBookAppointment }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(treatmentsData[0].id);

  if (!isOpen) return null;

  const currentCategory = treatmentsData.find(c => c.id === activeCategoryId) || treatmentsData[0];
  const CurrentIcon = iconMap[currentCategory.iconName] || Activity;

  return (
    <div 
      className="absolute top-full left-0 right-0 w-full glass-dropdown border-b border-slate-200 py-6 px-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 shadow-dropdown"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column: Categories List */}
          <div className="col-span-4 border-r border-slate-200/80 pr-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1 flex items-center justify-between">
              <span>Surgical Specialties</span>
              <span className="text-brand-600 font-semibold">{treatmentsData.length} Departments</span>
            </div>

            {treatmentsData.map((cat) => {
              const Icon = iconMap[cat.iconName] || Activity;
              const isSelected = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  onMouseEnter={() => setActiveCategoryId(cat.id)}
                  className={`w-full text-left flex items-start space-x-3 p-3 rounded-xl transition-all duration-150 ${
                    isSelected
                      ? 'bg-brand-50 border border-brand-200/70 shadow-xs text-navy-950 font-semibold'
                      : 'hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    isSelected ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold truncate">{cat.category}</span>
                      {cat.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          isSelected ? 'bg-brand-200 text-brand-900' : 'bg-slate-200/70 text-slate-600'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
                      {cat.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 my-auto transition-transform ${
                    isSelected ? 'text-brand-600 translate-x-0.5' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Middle Column: Selected Category Procedures */}
          <div className="col-span-5 px-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-brand-100 text-brand-700 rounded-lg">
                  <CurrentIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">{currentCategory.category}</h4>
                  <p className="text-xs text-slate-500">{currentCategory.description}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                {currentCategory.procedures.length} Procedures
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {currentCategory.procedures.map((proc) => (
                <div
                  key={proc.slug}
                  onClick={() => {
                    onSelectTreatment && onSelectTreatment(proc);
                    onClose();
                  }}
                  className="group p-3 rounded-xl border border-slate-100 hover:border-brand-300 hover:bg-slate-50/80 transition-all cursor-pointer flex items-start justify-between"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-navy-900 group-hover:text-brand-700 transition-colors">
                        {proc.name}
                      </span>
                      {proc.tag && (
                        <span className="text-[10px] font-semibold text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded-md">
                          {proc.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {proc.summary}
                    </p>
                    <div className="flex items-center space-x-2 pt-0.5">
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {proc.recoveryTime}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Doctor & Robotic Surgery Spotlight */}
          <div className="col-span-3 bg-gradient-to-br from-navy-900 to-navy-950 text-white p-5 rounded-2xl flex flex-col justify-between shadow-md relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center space-x-1.5 bg-brand-500/20 text-brand-300 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-brand-400/30">
                <Award className="w-3 h-3 text-brand-400" />
                <span>Gorakhpur Center of Excellence</span>
              </div>

              <div>
                <h5 className="text-base font-bold text-white tracking-tight">
                  {clinicInfo.doctor.fullName}
                </h5>
                <p className="text-xs text-brand-300 font-medium mt-0.5">
                  {clinicInfo.doctor.title}
                </p>
                <p className="text-[11px] text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {clinicInfo.doctor.bioSnippet}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-800 text-center">
                <div className="bg-navy-800/60 p-2 rounded-lg">
                  <span className="block text-sm font-extrabold text-brand-400">{clinicInfo.doctor.experienceYears}</span>
                  <span className="text-[10px] text-slate-400">Clinical Exp</span>
                </div>
                <div className="bg-navy-800/60 p-2 rounded-lg">
                  <span className="block text-sm font-extrabold text-brand-400">{clinicInfo.doctor.surgeriesCount}</span>
                  <span className="text-[10px] text-slate-400">Surgeries</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <button
                onClick={() => {
                  onBookAppointment && onBookAppointment();
                  onClose();
                }}
                className="w-full bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-glow hover:shadow-brand-500/50 flex items-center justify-center space-x-1.5"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Book Priority OPD Consultation</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

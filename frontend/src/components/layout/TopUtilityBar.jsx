import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, Lock } from 'lucide-react';
import { clinicInfo } from '../../data/navigationData';

export const TopUtilityBar = ({ onOpenAdmin, isAdminView }) => {
  return (
    <div className="bg-[#0b2847] text-slate-200 text-xs py-2 px-4 border-b border-[#13375e] hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Contact info: Phone, Email, Location */}
        <div className="flex items-center space-x-6">
          <a 
            href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} 
            className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{clinicInfo.phone}</span>
          </a>

          <a 
            href={`mailto:${clinicInfo.email}`} 
            className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{clinicInfo.email}</span>
          </a>

          <div className="flex items-center space-x-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate max-w-xs">{clinicInfo.location.split(',')[0]}, Bargadawa, Gorakhpur</span>
          </div>
        </div>

        {/* Right: Social Links & Staff Portal */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 text-slate-300">
            <a 
              href={clinicInfo.socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a 
              href={clinicInfo.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href={clinicInfo.socials.youtube} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a 
              href={clinicInfo.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>

          <span className="text-slate-600">|</span>

          {/* Admin Switcher */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center space-x-1 bg-[#153e6b] hover:bg-[#1a4f88] text-cyan-300 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
            title="Clinic Staff & Doctor Admin Panel"
          >
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>{isAdminView ? 'View Patient Site' : 'Staff / Doctor Login'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

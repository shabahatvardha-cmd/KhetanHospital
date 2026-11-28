import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { mainNavigation } from '../../data/navigationData';
import { ShiningHospitalName } from './ShiningHospitalName';

/**
 * 🏥 Khetan Hospital - Main Navigation Bar
 * 
 * Strict Specification:
 * 1. Contains exactly the same six main destinations:
 *    HOME | SERVICES | DOCTORS | BLOGS | LOCATIONS | CONTACT
 * 2. When visitor clicks any navbar item, it navigates directly to that section page.
 * 3. Shows active highlight based on the current URL route.
 * 4. Dropdown submenus on hover allow fast navigation to specific surgical procedures.
 * 5. Compact height (~60px) to keep layout seamless.
 */
export const Navbar = ({ onBookClick }) => {
  const { activeSectionId, goToSection } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick sub-routes for hover menus
  const subDropdowns = {
    services: [
      { title: 'Robotic Knee Replacement', href: '/services/robotic-knee-surgery' },
      { title: 'Total Knee Replacement (TKR)', href: '/services/knee-replacement' },
      { title: 'Hip Replacement Surgery', href: '/services/hip-replacement' },
      { title: 'Shoulder Arthroscopy', href: '/services/shoulder-replacement' },
      { title: 'ACL & Sports Ligament Reconstruction', href: '/services/acl-surgery' },
      { title: 'Spine & Lumbar Surgery', href: '/services/spine-surgery' }
    ],
    doctors: [
      { title: 'Dr. Vatsal Khetan (Surgeon Profile)', href: '/about' },
      { title: 'Memorable Moments & Timeline', href: '/memorable-moments' },
      { title: 'Published Research Papers', href: '/published-papers' }
    ]
  };

  const handleItemClick = (sectionId) => {
    goToSection(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header ref={navRef} className="w-full sticky top-0 z-[100] bg-white border-b border-slate-200/90 shadow-2xs select-none shrink-0">

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => {
            handleItemClick('home');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 cursor-pointer"
        >
          <img
            src="/logo.webp"
            alt="Khetan Multi Speciality And Medical Research Centre"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col">
            <ShiningHospitalName text="Khetan Multi Speciality" className="text-sm sm:text-base md:text-lg leading-tight" />
            <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 tracking-wider uppercase leading-tight mt-0.5">
              And Medical Research Centre
            </span>
          </div>
        </Link>

        {/* Desktop 6 Direct Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {mainNavigation.map((item) => {
            const isActive = activeSectionId === item.id;
            const hasDropdown = !!subDropdowns[item.id];
            const isHovered = activeDropdown === item.id;

            return (
              <div
                key={item.id}
                className="relative py-1"
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1 ${isActive
                    ? 'text-sky-700 bg-sky-50 shadow-2xs font-extrabold border-b-2 border-sky-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold'
                    }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isHovered ? 'rotate-180 text-sky-600' : ''}`} />
                  )}
                </button>

                {/* Submenu (Hover) */}
                {hasDropdown && isHovered && (
                  <div className="absolute top-full left-0 pt-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 px-1 ring-1 ring-black/5">
                      {subDropdowns[item.id].map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.href}
                          onClick={() => {
                            setActiveDropdown(null);
                            setMobileMenuOpen(false);
                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                            setTimeout(() => {
                              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }, 50);
                          }}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                        >
                          <span className="truncate">{sub.title}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Hamburger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-sky-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          {mainNavigation.map((item) => {
            const isActive = activeSectionId === item.id;
            const hasDropdown = !!subDropdowns[item.id];
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-between ${isActive
                    ? 'text-sky-700 bg-sky-50 border-l-4 border-sky-500 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[10px] text-sky-600 font-normal">Active</span>}
                </button>
                {hasDropdown && (
                  <div className="pl-3 pr-1 py-1 space-y-1 border-l border-slate-100 ml-2">
                    {subDropdowns[item.id].map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        to={sub.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveDropdown(null);
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                          setTimeout(() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                          }, 50);
                        }}
                        className="block px-2.5 py-1 text-[11px] text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded font-medium"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-2.5 rounded-full text-xs font-bold uppercase bg-[#00bcd4] text-white shadow-xs text-center cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;

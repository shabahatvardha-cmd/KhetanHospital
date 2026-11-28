import React, { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mainNavigation, servicesNavigation } from '../data/navigationData';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const total = servicesNavigation.length; // 6 surgical services cards in carousel

  // Center card index in services carousel (0 to 5)
  const [activeIndex, setActiveIndexState] = useState(0);

  // Robust circular modulo helper: always returns [0, total - 1]
  const wrapIndex = (idx) => ((idx % total) + total) % total;

  const setActiveIndex = (idx) => {
    setActiveIndexState(wrapIndex(idx));
  };

  // Check if current route is homepage
  const isHomePage = location.pathname === '/';

  // Active section id strictly derived from URL route
  const getRouteSectionId = (pathname) => {
    if (pathname.startsWith('/services')) return 'services';
    if (pathname.startsWith('/about') || pathname.startsWith('/memorable-moments') || pathname.startsWith('/published-papers') || pathname === '/timeline') return 'doctors';
    if (pathname.startsWith('/blogs')) return 'blogs';
    if (pathname.startsWith('/locations')) return 'locations';
    if (pathname.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const activeSectionId = getRouteSectionId(location.pathname);

  const scrollToFirstPartOfSection = (sectionId) => {
    if (sectionId === 'services') {
      const intro = document.getElementById('services-intro') || document.getElementById('slide-1');
      if (intro) {
        intro.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Direct Site Navigation Trigger for Navbar links
  const goToSection = (sectionIdOrIndex) => {
    let targetItem = null;

    if (typeof sectionIdOrIndex === 'number') {
      targetItem = mainNavigation[wrapIndex(sectionIdOrIndex)];
    } else {
      targetItem = mainNavigation.find(item => item.id === sectionIdOrIndex);
    }

    if (!targetItem) return;

    // Reset carousel index to first slide whenever navigating to services
    if (targetItem.id === 'services') {
      setActiveIndex(0);
    }

    const isCurrentRoute = location.pathname === targetItem.route;

    if (isCurrentRoute) {
      scrollToFirstPartOfSection(targetItem.id);
    } else {
      if (targetItem.id === 'home') {
        navigate('/');
      } else if (targetItem.route) {
        navigate(targetItem.route);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setTimeout(() => {
        scrollToFirstPartOfSection(targetItem.id);
      }, 50);
    }
  };

  // When a carousel service card is clicked
  const handleCardClick = (index) => {
    const normIndex = wrapIndex(index);
    if (normIndex === activeIndex) {
      // Center service card clicked -> Navigate to that surgical service detail page
      const item = servicesNavigation[normIndex];
      if (item && item.route) {
        navigate(item.route);
      }
    } else {
      // Side card clicked -> Center it smoothly
      setActiveIndex(normIndex);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        activeSectionId,
        isHomePage,
        mainNavigation,
        servicesNavigation,
        goToSection,
        handleCardClick
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppointmentModal } from './components/common/AppointmentModal';
import { FloatingActions } from './components/common/FloatingActions';
import { AdminDashboard } from './admin/AdminDashboard';

// Dedicated Route Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MemorableMomentsPage } from './pages/MemorableMomentsPage';
import { PublishedPapersPage } from './pages/PublishedPapersPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { LocationsPage } from './pages/LocationsPage';
import { BlogsPage } from './pages/BlogsPage';
import { ContactPage } from './pages/ContactPage';

// Helper component to scroll to top whenever route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Global Error Boundary to prevent full unmount on component exceptions
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Khetan Hospital Render Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-800">Something went wrong</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-200 text-left overflow-x-auto">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-full bg-[#00bcd4] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#00acc1] transition-all cursor-pointer"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// AppShell provides natural full-page vertical layout for all routes including homepage
function AppShell({ onBookClick, isAppointmentModalOpen, setIsAppointmentModalOpen, prefilledPhone }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#0b2847] selection:text-white">
      <Navbar onBookClick={onBookClick} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onBookClick={onBookClick} />} />
          <Route path="/about" element={<AboutPage onBookClick={onBookClick} />} />
          <Route path="/about/dr-vatsal-khetan" element={<AboutPage onBookClick={onBookClick} />} />
          <Route path="/memorable-moments" element={<MemorableMomentsPage onBookClick={onBookClick} />} />
          <Route path="/about/memorable-moments" element={<MemorableMomentsPage onBookClick={onBookClick} />} />
          <Route path="/timeline" element={<MemorableMomentsPage onBookClick={onBookClick} />} />
          <Route path="/published-papers" element={<PublishedPapersPage onBookClick={onBookClick} />} />
          <Route path="/about/published-papers" element={<PublishedPapersPage onBookClick={onBookClick} />} />
          <Route path="/services" element={<ServicesPage onBookClick={onBookClick} />} />
          <Route path="/services/:chapterId" element={<ServiceDetailPage onBookClick={onBookClick} />} />
          <Route path="/locations" element={<LocationsPage onBookClick={onBookClick} />} />
          <Route path="/blogs" element={<BlogsPage onBookClick={onBookClick} />} />
          <Route path="/contact" element={<ContactPage onBookClick={onBookClick} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Matching Shutter Footer rendered globally on every page */}
      <Footer onBookClick={onBookClick} />

      {/* Floating Action Buttons (WhatsApp, Quick Dial, Priority Booking) */}
      <FloatingActions onBookClick={onBookClick} />

      {/* Priority Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        initialPhone={prefilledPhone}
      />
    </div>
  );
}

export default function App() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [prefilledPhone, setPrefilledPhone] = useState('');

  const handleBookClick = (phone) => {
    if (typeof phone === 'string' && phone) {
      setPrefilledPhone(phone);
    } else {
      setPrefilledPhone('');
    }
    setIsAppointmentModalOpen(true);
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NavigationProvider>
          <ScrollToTop />
          <AppShell
            onBookClick={handleBookClick}
            isAppointmentModalOpen={isAppointmentModalOpen}
            setIsAppointmentModalOpen={setIsAppointmentModalOpen}
            prefilledPhone={prefilledPhone}
          />
        </NavigationProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Activity, 
  TrendingUp, 
  Search, 
  Filter, 
  ArrowLeft,
  Shield,
  Stethoscope,
  Send,
  MessageCircle
} from 'lucide-react';
import { clinicInfo } from '../data/navigationData';

const initialAppointments = [
  {
    id: 'APT-1001',
    patientName: 'Rahul Verma',
    phone: '+91 98765 43210',
    treatment: 'Robotic Knee Replacement',
    date: '2026-11-25',
    slot: 'Morning (11:00 AM)',
    status: 'Confirmed',
    notes: 'Severe bilateral osteoarthritis stage 4',
    source: 'Website Form'
  },
  {
    id: 'APT-1002',
    patientName: 'Pooja Tiwari',
    phone: '+91 94500 12345',
    treatment: 'Shoulder Arthroscopy & Rotator Cuff',
    date: '2026-11-26',
    slot: 'Evening (05:30 PM)',
    status: 'Pending',
    notes: 'Sports injury during badminton match',
    source: 'WhatsApp'
  },
  {
    id: 'APT-1003',
    patientName: 'Harish Chandra',
    phone: '+91 91234 56789',
    treatment: 'Total Hip Replacement (Dual Mobility)',
    date: '2026-11-27',
    slot: 'Morning (12:30 PM)',
    status: 'Confirmed',
    notes: 'Referred from Deoria for robotic hip evaluation',
    source: 'Website Form'
  },
  {
    id: 'APT-1004',
    patientName: 'Kavita Singh',
    phone: '+91 98390 11223',
    treatment: 'ACL & Meniscus Repair',
    date: '2026-11-28',
    slot: 'Evening (06:00 PM)',
    status: 'Pending',
    notes: 'Twisted knee playing basketball, locking sensation',
    source: 'Direct Portal'
  }
];

export const AdminDashboard = ({ onBackToPublicSite }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesFilter = filterStatus === 'All' || a.status === filterStatus;
    const matchesSearch = a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Admin Top Navigation */}
      <header className="bg-navy-950 text-white px-6 py-4 flex items-center justify-between border-b border-navy-800 shadow-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToPublicSite}
            className="flex items-center space-x-1.5 bg-navy-800 hover:bg-navy-700 text-brand-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Site</span>
          </button>
          <div className="h-4 w-px bg-navy-800"></div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center">
              <span>{clinicInfo.hospitalTitle}</span>
              <span className="ml-2 text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full border border-brand-500/30">
                Staff & Doctor Portal
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Gorakhpur Clinic Management Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="text-right hidden sm:block">
            <span className="block font-bold text-slate-200">{clinicInfo.doctor.fullName}</span>
            <span className="text-[10px] text-brand-400">Chief Surgeon</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            VK
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500">Total Consultations</span>
              <h3 className="text-2xl font-extrabold text-navy-950 mt-1">{appointments.length}</h3>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" /> Today's Pipeline
              </span>
            </div>
            <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500">Confirmed Slots</span>
              <h3 className="text-2xl font-extrabold text-navy-950 mt-1">
                {appointments.filter(a => a.status === 'Confirmed').length}
              </h3>
              <span className="text-[11px] text-brand-600 font-semibold mt-1 block">Scheduled for OPD</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500">Pending Review</span>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
                {appointments.filter(a => a.status === 'Pending').length}
              </h3>
              <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Requires token dispatch</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500">Doctor Status</span>
              <h3 className="text-base font-bold text-navy-950 mt-1">In OPD Clinic</h3>
              <span className="text-[11px] text-brand-600 font-semibold mt-1 block">Gorakhpur Suite</span>
            </div>
            <div className="p-3 bg-navy-50 text-navy-700 rounded-xl">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Appointments Table Section */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
          {/* Table Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-navy-900 text-sm">Patient Appointment Registry</h3>
              <p className="text-xs text-slate-500">Manage online inquiries, phone requests & surgical consultations</p>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by name, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="p-3.5 pl-6">ID & Patient</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Specialty / Treatment</th>
                  <th className="p-3.5">Slot / Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right pr-6">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 pl-6">
                      <span className="font-mono text-[10px] text-slate-400 block">{apt.id}</span>
                      <span className="font-bold text-navy-950 text-xs">{apt.patientName}</span>
                      {apt.notes && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 italic mt-0.5">{apt.notes}</p>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">{apt.phone}</div>
                      <span className="text-[10px] text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-sm">
                        {apt.source}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-navy-900">{apt.treatment}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{apt.date}</div>
                      <div className="text-[10px] text-slate-500">{apt.slot}</div>
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        apt.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right pr-6 space-x-1.5">
                      {apt.status === 'Pending' ? (
                        <button
                          onClick={() => updateStatus(apt.id, 'Confirmed')}
                          className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          onClick={() => updateStatus(apt.id, 'Pending')}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-[11px] px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Revert
                        </button>
                      )}

                      <a
                        href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.patientName)},%20this%20is%20from%20Dr.%20Vatsal%20Khetan's%20Clinic%20Gorakhpur.%20Your%20appointment%20is%20confirmed%20for%20${apt.date}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        title="Dispatch WhatsApp Token"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

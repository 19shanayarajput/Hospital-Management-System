import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  FileText,
  User,
  Users,
  Home,
  UserCircle,
  Calendar as CalendarIcon,
  Hospital,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  LogOut,
  ChevronRight,
  Pill,
  Sparkles,
  MapPin,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [careTeam, setCareTeam] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [toast, setToast] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchPatientProfile();
    fetchDoctors();
    fetchAppointments();
    fetchCareTeam();
    fetchPrescriptions();
  }, []);

  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_URL}/patient/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatientInfo(data);
        setEditedInfo(data);
      } else {
        if (response.status === 401 || response.status === 404) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${API_URL}/doctor/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    if (!doctorId || !date) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/patient/available-slots?doctorId=${doctorId}&date=${date}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const slots = await response.json();
        setAvailableSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${API_URL}/patient/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchCareTeam = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${API_URL}/patient/care-team`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCareTeam(data);
      }
    } catch (error) {
      console.error('Error fetching care team:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${API_URL}/patient/prescriptions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Appointments</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{appointments.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              {appointments.length > 0
                ? `Next: Dr. ${appointments[0]?.doctorId?.firstName || ''} ${appointments[0]?.doctorId?.lastName || ''} at ${appointments[0]?.time || ''}`
                : 'No appointments scheduled for today'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Prescriptions</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{prescriptions.length}</div>
            <p className="text-xs text-slate-500 mt-1">Medications prescribed by doctors</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all text-left space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Care Team Doctors</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{careTeam.length || doctors.length}</div>
            <p className="text-xs text-slate-500 mt-1">Consulted specialists on your team</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Appointments & Prescriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointments Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Your Appointments</h3>
            </div>
            <button
              onClick={() => setActiveTab('Appointment Booking')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>+ Book New</span>
            </button>
          </div>

          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.map((apt, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">
                      Dr. {apt.doctorId?.firstName} {apt.doctorId?.lastName}
                    </p>
                    <p className="text-xs text-slate-500">{apt.reason}</p>
                    <div className="flex items-center gap-2 text-xs text-blue-600 font-medium pt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {apt.status || 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No scheduled appointments today</p>
              <p className="text-xs text-slate-500 mt-1">Book a consultation with our hospital specialists anytime.</p>
              <button
                onClick={() => setActiveTab('Appointment Booking')}
                className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
              >
                Schedule Appointment
              </button>
            </div>
          )}
        </div>

        {/* Prescriptions Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">Medications & Prescriptions</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">{prescriptions.length} Records</span>
          </div>

          {prescriptions.length > 0 ? (
            <div className="space-y-3">
              {prescriptions.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">{p.medication}</p>
                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                      {p.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{p.frequency}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 border-t border-slate-100">
                    <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                    <span>Prescribed by Dr. {p.doctorId?.firstName} {p.doctorId?.lastName}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Pill className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No active prescriptions</p>
              <p className="text-xs text-slate-500 mt-1">Prescriptions issued by your doctor will show up here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/patient/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editedInfo)
        });
        if (response.ok) {
          const updatedProfile = await response.json();
          setPatientInfo(updatedProfile);
          setIsEditing(false);
          showToast('Profile updated successfully!');
        } else {
          const errorData = await response.json();
          showToast(errorData.error || 'Failed to update profile', 'error');
        }
      } catch (error) {
        showToast('Error updating profile. Please try again.', 'error');
      }
    };

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 text-left animate-fade-in space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-lg flex items-center justify-center shadow-md">
              {patientInfo?.firstName?.[0] || 'P'}{patientInfo?.lastName?.[0] || ''}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Patient Profile</h3>
              <p className="text-xs text-slate-500">Manage your personal and contact details</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            Active Patient
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                First Name
              </label>
              <input
                name="firstName"
                value={isEditing ? editedInfo?.firstName : patientInfo?.firstName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isEditing
                    ? 'bg-white border border-blue-300 focus:ring-2 focus:ring-blue-500 text-slate-900'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Last Name
              </label>
              <input
                name="lastName"
                value={isEditing ? editedInfo?.lastName : patientInfo?.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isEditing
                    ? 'bg-white border border-blue-300 focus:ring-2 focus:ring-blue-500 text-slate-900'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={isEditing ? editedInfo?.email : patientInfo?.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                isEditing
                  ? 'bg-white border border-blue-300 focus:ring-2 focus:ring-blue-500 text-slate-900'
                  : 'bg-slate-50 border border-slate-200 text-slate-700'
              }`}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/25 transition-all"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/25 transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderAppointmentBooking = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAppointmentData((prev) => ({ ...prev, [name]: value }));

      if (name === 'date' || name === 'doctorId') {
        const docId = name === 'doctorId' ? value : appointmentData.doctorId;
        const dt = name === 'date' ? value : appointmentData.date;
        fetchAvailableSlots(docId, dt);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!appointmentData.doctorId || !appointmentData.date || !appointmentData.time || !appointmentData.reason) {
        showToast('Please fill in all booking fields', 'error');
        return;
      }

      setBookingLoading(true);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/patient/book-appointment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(appointmentData)
        });

        if (response.ok) {
          showToast('Appointment booked successfully!');
          setAppointmentData({
            doctorId: '',
            date: '',
            time: '',
            reason: ''
          });
          setAvailableSlots([]);
          fetchAppointments();
          setActiveTab('Dashboard');
        } else {
          const errorData = await response.json();
          showToast(errorData.error || 'Failed to book appointment', 'error');
        }
      } catch (error) {
        showToast('Error booking appointment. Please try again.', 'error');
      } finally {
        setBookingLoading(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 text-left animate-fade-in space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Book an Appointment</h3>
            <p className="text-xs text-slate-500">Choose a specialist and select your preferred consultation time</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Select Specialist Doctor
            </label>
            <select
              name="doctorId"
              value={appointmentData.doctorId}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.firstName} {doc.lastName} — {doc.specialty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Appointment Date
            </label>
            <input
              name="date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={appointmentData.date}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            />
          </div>

          {appointmentData.doctorId && appointmentData.date && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Available Time Slots
              </label>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setAppointmentData((prev) => ({ ...prev, time: slot }))}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        appointmentData.time === slot
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  No open slots for this date. Please select another date or doctor.
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Reason for Visit / Symptoms
            </label>
            <textarea
              name="reason"
              rows={3}
              value={appointmentData.reason}
              onChange={handleInputChange}
              placeholder="Briefly describe your symptoms or reason for visit..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={bookingLoading}
            className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {bookingLoading ? (
              <span>Confirming Booking...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Appointment Booking</span>
              </>
            )}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${
              toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 glass-nav px-6 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Hospital className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900">CarePulse</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-2 border border-blue-100">
                Patient Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-medium text-slate-700">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>{patientInfo ? `${patientInfo.firstName} ${patientInfo.lastName}` : 'Patient'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2 overflow-x-auto">
          {[
            { id: 'Dashboard', label: 'Dashboard', icon: Home },
            { id: 'Profile', label: 'My Profile', icon: UserCircle },
            { id: 'Appointment Booking', label: 'Book Appointment', icon: CalendarIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="mb-6 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Welcome back, {patientInfo ? `${patientInfo.firstName} ${patientInfo.lastName}` : 'Patient'}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your consultations, track prescriptions, and view medical care
          </p>
        </div>

        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Profile' && renderProfile()}
        {activeTab === 'Appointment Booking' && renderAppointmentBooking()}
      </main>
    </div>
  );
}
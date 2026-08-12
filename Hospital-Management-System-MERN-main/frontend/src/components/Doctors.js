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
  Stethoscope,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Pill,
  Trash2,
  Edit,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    patientId: '',
    date: '',
    time: '',
    reason: '',
    prescriptionId: '',
    medication: '',
    dosage: '',
    frequency: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedAction, setSelectedAction] = useState('prescribe-medication');
  const [existingPrescriptions, setExistingPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchDoctorProfile();
    fetchPatientsWithAppointments();
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointmentData.patientId) {
      fetchExistingPrescriptions(appointmentData.patientId);
    }
  }, [appointmentData.patientId]);

  const fetchExistingPrescriptions = async (patientId) => {
    if (!patientId) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/doctor/prescriptions/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setExistingPrescriptions(data);
      } else {
        setExistingPrescriptions([]);
      }
    } catch (error) {
      setExistingPrescriptions([]);
    }
  };

  const fetchDoctorProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_URL}/doctor/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctorInfo(data);
        setEditedInfo(data);
      } else if (response.status === 401 || response.status === 404) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
    }
  };

  const fetchPatientsWithAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${API_URL}/doctor/patients-with-appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error('Error fetching patients with appointments:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${API_URL}/doctor/appointments`, {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled Consultations</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{appointments.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              {appointments.length > 0
                ? `Next: ${appointments[0]?.patientId?.firstName || ''} ${appointments[0]?.patientId?.lastName || ''} at ${appointments[0]?.time || ''}`
                : 'No consultations today'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Patients Under Care</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{patients.length}</div>
            <p className="text-xs text-slate-500 mt-1">Assigned patients & medical history</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all text-left space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{doctorInfo?.specialty || 'General Medicine'}</div>
            <p className="text-xs text-slate-500 mt-1">License: {doctorInfo?.licenseNumber || 'Verified Staff'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Your Appointment Queue</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">{appointments.length} Total</span>
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
                      {apt.patientId?.firstName} {apt.patientId?.lastName}
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
              <p className="text-sm font-semibold text-slate-700">No appointments scheduled</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">Active Patients</h3>
            </div>
            <button
              onClick={() => setActiveTab('Patient Management')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Prescribe / Manage
            </button>
          </div>

          {patients.length > 0 ? (
            <div className="space-y-3">
              {patients.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">{p.firstName} {p.lastName}</p>
                    <p className="text-xs text-slate-500">{p.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setAppointmentData((prev) => ({ ...prev, patientId: p._id }));
                      setActiveTab('Patient Management');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Prescribe Rx &rarr;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No active patients registered yet</p>
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
        const response = await fetch(`${API_URL}/doctor/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editedInfo)
        });
        if (response.ok) {
          const updated = await response.json();
          setDoctorInfo(updated);
          setIsEditing(false);
          showToast('Doctor profile updated successfully!');
        } else {
          const err = await response.json();
          showToast(err.error || 'Failed to update profile', 'error');
        }
      } catch (error) {
        showToast('Error updating profile', 'error');
      }
    };

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 text-left animate-fade-in space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold text-lg flex items-center justify-center shadow-md">
              Dr
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Dr. {doctorInfo?.firstName} {doctorInfo?.lastName}</h3>
              <p className="text-xs text-slate-500">{doctorInfo?.specialty} Specialist</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
            Verified Doctor
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">First Name</label>
              <input
                name="firstName"
                value={isEditing ? editedInfo?.firstName : doctorInfo?.firstName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isEditing
                    ? 'bg-white border border-indigo-300 focus:ring-2 focus:ring-indigo-500 text-slate-900'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Last Name</label>
              <input
                name="lastName"
                value={isEditing ? editedInfo?.lastName : doctorInfo?.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isEditing
                    ? 'bg-white border border-indigo-300 focus:ring-2 focus:ring-indigo-500 text-slate-900'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              value={isEditing ? editedInfo?.email : doctorInfo?.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                isEditing
                  ? 'bg-white border border-indigo-300 focus:ring-2 focus:ring-indigo-500 text-slate-900'
                  : 'bg-slate-50 border border-slate-200 text-slate-700'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Specialty</label>
              <input
                name="specialty"
                value={isEditing ? editedInfo?.specialty : doctorInfo?.specialty}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isEditing
                    ? 'bg-white border border-indigo-300 focus:ring-2 focus:ring-indigo-500 text-slate-900'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Phone Number</label>
              <input
                name="phoneNumber"
                value={isEditing ? editedInfo?.phoneNumber : doctorInfo?.phoneNumber}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isEditing
                    ? 'bg-white border border-indigo-300 focus:ring-2 focus:ring-indigo-500 text-slate-900'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              />
            </div>
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
                className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/25 transition-all"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/25 transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderPatientManagement = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAppointmentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDeletePrescription = async (prescriptionId) => {
      if (!window.confirm('Delete this prescription?')) return;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/doctor/prescriptions/${prescriptionId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          showToast('Prescription deleted');
          fetchExistingPrescriptions(appointmentData.patientId);
        }
      } catch (error) {
        showToast('Failed to delete prescription', 'error');
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!appointmentData.patientId) {
        showToast('Please select a patient first', 'error');
        return;
      }

      if (selectedAction === 'prescribe-medication') {
        try {
          const token = localStorage.getItem('token');
          const url = appointmentData.prescriptionId
            ? `${API_URL}/doctor/prescriptions/${appointmentData.prescriptionId}`
            : `${API_URL}/doctor/prescribe-medication`;
          const method = appointmentData.prescriptionId ? 'PUT' : 'POST';

          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              patientId: appointmentData.patientId,
              medication: appointmentData.medication,
              dosage: appointmentData.dosage,
              frequency: appointmentData.frequency
            })
          });

          if (response.ok) {
            showToast(appointmentData.prescriptionId ? 'Prescription updated!' : 'Medication prescribed!');
            setAppointmentData((prev) => ({
              ...prev,
              prescriptionId: '',
              medication: '',
              dosage: '',
              frequency: ''
            }));
            fetchExistingPrescriptions(appointmentData.patientId);
          } else {
            const err = await response.json();
            showToast(err.error || 'Operation failed', 'error');
          }
        } catch (error) {
          showToast('Error saving prescription', 'error');
        }
      }
    };

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 text-left animate-fade-in space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Patient Prescription Manager</h3>
            <p className="text-xs text-slate-500">Issue medications and specify dosages for patients</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Select Patient
            </label>
            <select
              name="patientId"
              value={appointmentData.patientId}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              required
            >
              <option value="">Choose a patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.firstName} {p.lastName} ({p.email})
                </option>
              ))}
            </select>
          </div>

          {appointmentData.patientId && existingPrescriptions.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Existing Prescriptions</span>
              <div className="space-y-2">
                {existingPrescriptions.map((pr) => (
                  <div key={pr._id} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{pr.medication}</p>
                      <p className="text-xs text-slate-500">{pr.dosage} — {pr.frequency}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePrescription(pr._id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Medication Name
              </label>
              <input
                name="medication"
                value={appointmentData.medication}
                onChange={handleInputChange}
                placeholder="e.g. Amoxicillin 500mg"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Dosage
                </label>
                <input
                  name="dosage"
                  value={appointmentData.dosage}
                  onChange={handleInputChange}
                  placeholder="e.g. 1 tablet twice daily"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Frequency / Duration
                </label>
                <input
                  name="frequency"
                  value={appointmentData.frequency}
                  onChange={handleInputChange}
                  placeholder="e.g. After meals for 7 days"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Issue Prescription</span>
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
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

      <header className="sticky top-0 z-40 glass-nav px-6 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Hospital className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900">CarePulse</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full ml-2 border border-indigo-100">
                Doctor Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-medium text-slate-700">
              <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
              <span>Dr. {doctorInfo ? `${doctorInfo.firstName} ${doctorInfo.lastName}` : 'Doctor'}</span>
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

      <div className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2 overflow-x-auto">
          {[
            { id: 'Dashboard', label: 'Dashboard', icon: Home },
            { id: 'Profile', label: 'My Profile', icon: UserCircle },
            { id: 'Patient Management', label: 'Patient Prescriptions', icon: Pill }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="mb-6 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Welcome, Dr. {doctorInfo ? `${doctorInfo.firstName} ${doctorInfo.lastName}` : 'Doctor'}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {doctorInfo?.specialty ? `${doctorInfo.specialty} Department` : 'Clinical Portal'} &bull; CarePulse Medical Staff
          </p>
        </div>

        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Profile' && renderProfile()}
        {activeTab === 'Patient Management' && renderPatientManagement()}
      </main>
    </div>
  );
}
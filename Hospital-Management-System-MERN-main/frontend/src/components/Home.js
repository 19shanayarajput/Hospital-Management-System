import React from 'react';
import {
  Calendar,
  Clipboard,
  Cog,
  DollarSign,
  HeartPulse,
  Hospital,
  Shield,
  User,
  Users,
  Clock,
  ChartBar,
  Globe,
  ArrowRight,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass-nav px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <Hospital className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CarePulse
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-slate-400 ml-2 py-0.5 px-2 bg-slate-100 rounded-full border border-slate-200">
                Hospital OS
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/30 hover:shadow-md transition-all flex items-center gap-1.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[35rem] bg-gradient-to-tr from-blue-200/40 to-indigo-200/30 blur-3xl rounded-full pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Next-Generation Healthcare Management</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Seamless Hospital Care,{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                    Smarter Operations.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                  CarePulse empowers doctors, patients, and administrators with real-time appointment booking, comprehensive clinical records, and intelligent resource tracking.
                </p>

                {/* CTA Action Bar */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <span>Launch Portal</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all"
                  >
                    Create Patient Account
                  </button>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900">99.9%</div>
                    <div className="text-xs text-slate-500 font-medium">Uptime Guarantee</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">4+ Depts</div>
                    <div className="text-xs text-slate-500 font-medium">Specialized Care</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-600">24/7</div>
                    <div className="text-xs text-slate-500 font-medium">Patient Access</div>
                  </div>
                </div>
              </div>

              {/* Interactive Role Card Previews */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/80 space-y-4 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Access Portals</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-200">
                      ● Active Demo
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div
                      onClick={() => navigate('/login')}
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-slate-900">Patient Portal</div>
                          <div className="text-xs text-slate-500">Book visits, view prescriptions</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>

                    <div
                      onClick={() => navigate('/login')}
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-slate-900">Doctor Workspace</div>
                          <div className="text-xs text-slate-500">Manage patients & write Rx</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>

                    <div
                      onClick={() => navigate('/login')}
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-slate-900">Admin Command Center</div>
                          <div className="text-xs text-slate-500">Hospital occupancy & staff analytics</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Engineered for Modern Healthcare
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                A unified architecture that eliminates administrative bottlenecks and puts patient care first.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: 'Real-Time Scheduling',
                  description: 'Dynamic time slot allocation preventing double-booking and optimizing clinical schedules.',
                  color: 'text-blue-600 bg-blue-50 border-blue-100'
                },
                {
                  icon: Clipboard,
                  title: 'Digital Prescriptions',
                  description: 'Instant prescription generation with dosage instructions accessible directly by patients.',
                  color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
                },
                {
                  icon: ChartBar,
                  title: 'Operational Analytics',
                  description: 'Hospital bed occupancy meters and comprehensive doctor-patient metrics at a glance.',
                  color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
                },
                {
                  icon: Shield,
                  title: 'Secure JWT Authentication',
                  description: 'Role-based access controls for Admin, Clinician, and Patient security with encrypted passwords.',
                  color: 'text-amber-600 bg-amber-50 border-amber-100'
                },
                {
                  icon: Users,
                  title: 'Collaborative Care Teams',
                  description: 'Patients can view their designated care doctors and follow up effortlessly after appointments.',
                  color: 'text-purple-600 bg-purple-50 border-purple-100'
                },
                {
                  icon: HeartPulse,
                  title: 'Patient-Centric Portal',
                  description: 'Empowers patients to manage profiles, consult specialists, and track medical history.',
                  color: 'text-rose-600 bg-rose-50 border-rose-100'
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all text-left space-y-3"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Hospital className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-white text-base">CarePulse HMS</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; 2026 CarePulse Hospital Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
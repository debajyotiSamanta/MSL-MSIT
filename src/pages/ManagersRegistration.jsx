import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Image as ImageIcon, 
  Upload, 
  FileCheck, 
  CheckCircle,
  Briefcase,
  ShieldCheck,
  Phone
} from 'lucide-react';

/**
 * Manager Registration Component
 * Tailored for MSL 2026 Team Managers
 */
export default function ManagerRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regData, setRegData] = useState({
    name: '', 
    email: '', 
    rollNo: '', 
    phone: '', 
    image: null, 
    paymentProof: null,
    transactionId: ''
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setRegData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for Manager Registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Manager Registration Received!</h2>
        <p className="text-gray-600 mb-8">Your management application for MSL 2026 is being processed. Our team will verify your credentials and payment proof before granting administrative access.</p>
        <button 
          onClick={() => setIsSubmitted(false)} 
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Register Another Manager
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Section - Indigo Theme for Management */}
        <div className="bg-indigo-700 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight">Manager Registration</h2>
            <p className="opacity-90 font-medium">Official Team Management Enrollment MSL 2026</p>
          </div>
          <Briefcase className="absolute right-[-20px] top-[-20px] text-white opacity-10" size={160} />
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid md:grid-cols-2 gap-10">
          {/* Professional Details Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-indigo-600 pl-3">Credentials</h3>
            
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  className="w-full pl-10 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" 
                  placeholder="Manager's legal name" 
                  value={regData.name} 
                  onChange={e => setRegData({...regData, name: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  type="email" 
                  className="w-full pl-10 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" 
                  placeholder="manager.email@college.edu.in" 
                  value={regData.email} 
                  onChange={e => setRegData({...regData, email: e.target.value})} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">ID / Roll No.</label>
                <input 
                  required 
                  className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" 
                  placeholder="e.g. 14200222023" 
                  value={regData.rollNo} 
                  onChange={e => setRegData({...regData, rollNo: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Phone Number</label>
                <div className="relative">
                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input 
                    required 
                    type="tel"
                    className="w-full pl-9 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="9876543210" 
                    value={regData.phone} 
                    onChange={e => setRegData({...regData, phone: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Identification Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-10 pb-6 border-2 border-dashed rounded-xl bg-gray-50 group relative hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                 <div className="text-center">
                  {regData.image ? (
                      <div className="flex flex-col items-center">
                          <FileCheck className="h-10 w-10 text-green-500" />
                          <p className="text-xs text-green-600 font-bold mt-2 truncate w-40">{regData.image.name}</p>
                      </div>
                  ) : (
                      <>
                          <ImageIcon className="mx-auto h-10 w-10 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                          <p className="text-xs text-gray-500 mt-2 font-medium">Upload manager portrait</p>
                      </>
                  )}
                </div>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'image')} />
              </div>
            </div>
          </div>

          {/* Fee & Verification Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-emerald-500 pl-3">Verification & Fee</h3>
            
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-emerald-600 uppercase block tracking-wider">Management Fee</span>
                <span className="text-3xl font-black text-emerald-900">₹500.00</span>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-md border border-emerald-100">
                {/* <ShieldCheck className="w-10 h-10 text-emerald-600" /> */}
                <img
                  src="../src/assets/msit-logo.png"
                  alt="QRCode"
                  className="h-20 w-20 object-cover"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Payment Confirmation</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl bg-emerald-50/30 group relative hover:border-emerald-400 transition-all">
                 <div className="text-center">
                  {regData.paymentProof ? (
                      <div className="flex flex-col items-center">
                          <FileCheck className="h-10 w-10 text-emerald-500" />
                          <p className="text-xs text-emerald-600 font-bold mt-2 truncate w-40">{regData.paymentProof.name}</p>
                      </div>
                  ) : (
                      <>
                          <Upload className="mx-auto h-10 w-10 text-emerald-400 group-hover:scale-110 transition-transform" />
                          <p className="text-xs text-emerald-500 mt-2 font-medium">Upload Transaction Receipt</p>
                      </>
                  )}
                </div>
                <input required type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'paymentProof')} />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Transaction Reference</label>
              <input 
                required 
                className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none" 
                placeholder="UTR / Transaction ID" 
                value={regData.transactionId}
                onChange={e => setRegData({...regData, transactionId: e.target.value})}
              />
            </div>
            
            <div className="pt-4">
              <button 
                disabled={isSubmitting} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white p-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Register as Manager</span>
                )}
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-4 uppercase font-bold tracking-widest leading-relaxed">
                Management access is subject to manual verification of <br/> academic and payment credentials.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
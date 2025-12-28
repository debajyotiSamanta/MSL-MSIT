import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Image as ImageIcon, 
  Upload, 
  QrCode, 
  FileCheck, 
  CheckCircle 
} from 'lucide-react';

/**
 * Player Registration Component
 * Extracted from the Soccer Tournament Portal
 */
export default function RegistrationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regData, setRegData] = useState({
    name: '', 
    email: '', 
    rollNo: '', 
    position: 'Forward', 
    phone: '', 
    image: null, 
    paymentProof: null 
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Registration Successful!</h2>
        <p className="text-gray-600 mb-8">Your application has been received. Our committee will verify your payment and update the auction pool shortly.</p>
        <button 
          onClick={() => setIsSubmitted(false)} 
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Register Another Player
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight">Player Registration</h2>
            <p className="opacity-90 font-medium">Join the MSL 2026 Player Pool</p>
          </div>
          <Users className="absolute right-[-20px] top-[-20px] text-white opacity-10" size={160} />
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid md:grid-cols-2 gap-10">
          {/* Personal Details Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-3">Personal Details</h3>
            
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  className="w-full pl-10 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" 
                  placeholder="Enter full name" 
                  value={regData.name} 
                  onChange={e => setRegData({...regData, name: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">College Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  type="email" 
                  className="w-full pl-10 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" 
                  placeholder="deb_samantait@college.edu.in" 
                  value={regData.email} 
                  onChange={e => setRegData({...regData, email: e.target.value})} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Roll Number</label>
                <input 
                  required 
                  className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none uppercase" 
                  placeholder="e.g. 14200223025" 
                  value={regData.rollNo} 
                  onChange={e => setRegData({...regData, rollNo: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Position</label>
                <select 
                  className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
                  value={regData.position} 
                  onChange={e => setRegData({...regData, position: e.target.value})}
                >
                  <option>Forward</option>
                  <option>Midfielder</option>
                  <option>Defender</option>
                  <option>Goalkeeper</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Profile Image</label>
              <div className="mt-1 flex justify-center px-6 pt-10 pb-6 border-2 border-dashed rounded-xl bg-gray-50 group relative hover:border-blue-400 hover:bg-blue-50/30 transition-all">
                 <div className="text-center">
                  {regData.image ? (
                      <div className="flex flex-col items-center">
                          <FileCheck className="h-10 w-10 text-green-500" />
                          <p className="text-xs text-green-600 font-bold mt-2 truncate w-40">{regData.image.name}</p>
                      </div>
                  ) : (
                      <>
                          <ImageIcon className="mx-auto h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <p className="text-xs text-gray-500 mt-2 font-medium">Click to upload photo</p>
                      </>
                  )}
                </div>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'image')} />
              </div>
            </div>
          </div>

          {/* Payment Details Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-orange-500 pl-3">Payment Details</h3>
            
            <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-orange-600 uppercase block tracking-wider">Registration Fee</span>
                <span className="text-3xl font-black text-orange-900">₹200.00</span>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-md border border-orange-100">
                {/* <QrCode className="w-14 h-14 text-gray-800" /> */}
                <img
                  src="../src/assets/msit-logo.png"
                  alt="QRCode"
                  className="h-20 w-20 object-cover"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Upload Payment Proof (Screenshot)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl bg-orange-50/50 group relative hover:border-orange-400 transition-all">
                 <div className="text-center">
                  {regData.paymentProof ? (
                      <div className="flex flex-col items-center">
                          <FileCheck className="h-10 w-10 text-orange-500" />
                          <p className="text-xs text-orange-600 font-bold mt-2 truncate w-40">{regData.paymentProof.name}</p>
                      </div>
                  ) : (
                      <>
                          <Upload className="mx-auto h-10 w-10 text-orange-400 group-hover:scale-110 transition-transform" />
                          <p className="text-xs text-orange-500 mt-2 font-medium">Upload Payment Receipt</p>
                      </>
                  )}
                </div>
                <input required type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'paymentProof')} />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Transaction ID / Ref No.</label>
              <input 
                required 
                className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none" 
                placeholder="Enter unique transaction ID" 
              />
            </div>
            
            <div className="pt-4">
              <button 
                disabled={isSubmitting} 
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white p-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-4 uppercase font-bold tracking-widest">
                By submitting, you agree to follow the tournament rules.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
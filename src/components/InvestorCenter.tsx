import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { FileDown, Lock, Unlock, Check, Send, Calendar, Clock, MapPin, Building, ChevronRight, Download, Users, Mail, Phone, Globe, Trash2 } from 'lucide-react';
import { InvestorDoc } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, serverTimestamp, collection, onSnapshot, deleteDoc } from 'firebase/firestore';

interface InvestorCenterProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}

export default function InvestorCenter({ isLoggedIn, onOpenLogin }: InvestorCenterProps) {
  const { language, t, investorDocs } = useLanguage();
  const isIndo = language === 'id';

  // Submission History and Active Tabs
  const [activeTab, setActiveTab] = useState<'files' | 'history'>('files');
  const [eoiRecords, setEoiRecords] = useState<any[]>([]);
  const [apptRecords, setApptRecords] = useState<any[]>([]);
  const [inquiryRecords, setInquiryRecords] = useState<any[]>([]);

  // EOI Form States
  const [formData, setFormData] = useState({
    fullname: '',
    company: '',
    industry: 'High-Tech Manufacturing',
    capital: 'Rp 100 - Rp 500 Miliar',
    email: '',
    phone: '',
    website: '',
    intentNote: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loiError, setLoiError] = useState('');
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Scheduler States
  const [scheduledDate, setScheduledDate] = useState('2026-06-05');
  const [scheduledTime, setScheduledTime] = useState('10:00 WIB');
  const [meetingType, setMeetingType] = useState(isIndo ? 'Dinas PMTSP Kabupaten Majalengka (Majalengka Office)' : 'Kabupaten Majalengka PMTSP Office (Majalengka HQ)');
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);

  // File download notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Hook to fetch records dynamically if logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setEoiRecords([]);
      setApptRecords([]);
      setInquiryRecords([]);
      setActiveTab('files');
      return;
    }

    const unsubEoi = onSnapshot(collection(db, 'expressionOfInterests'), (snapshot) => {
      const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEoiRecords(records);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'expressionOfInterests');
    });

    const unsubAppt = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApptRecords(records);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'appointments');
    });

    const unsubInq = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiryRecords(records);
    }, (error) => {
      // Safe fallback if some rules deny
      console.warn("Unable to fetch inquiries: ", error);
    });

    return () => {
      unsubEoi();
      unsubAppt();
      unsubInq();
    };
  }, [isLoggedIn]);

  const handleDeleteRecord = async (collectionPath: string, recordId: string) => {
    try {
      await deleteDoc(doc(db, collectionPath, recordId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionPath}/${recordId}`);
    }
  };

  const handleDownload = (doc: InvestorDoc) => {
    if (!isLoggedIn && (doc.confidentiality === 'Confidential' || doc.confidentiality === 'Restricted')) {
      setToastMsg(isIndo 
        ? `Akses Terkunci. Dokumen "${doc.title}" berstatus rahasia. Silahkan masukkan kredensial anda di pintu masuk login investor.`
        : `Access Locked. Document "${doc.title}" is confidential. Please submit your credentials at the investor login portal.`
      );
      setTimeout(() => setToastMsg(null), 6000);
      return;
    }
    
    // Simulate active download
    setToastMsg(isIndo 
      ? `Mulai mengunduh: ${doc.title} (${doc.size})`
      : `Downloading: ${doc.title} (${doc.size})`
    );
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullname || !formData.company || !formData.email) {
      setLoiError(isIndo 
        ? 'Silahkan lengkapi Nama, Perusahaan, dan Alamat Email.'
        : 'Please complete Name, Company, and Email address.'
      );
      return;
    }
    setLoiError('');
    setIsSubmittingForm(true);

    const eoiId = "eoi-" + Math.random().toString(36).substring(2, 11);
    try {
      await setDoc(doc(db, 'expressionOfInterests', eoiId), {
        fullname: formData.fullname,
        company: formData.company,
        industry: formData.industry || '',
        capital: formData.capital || '',
        email: formData.email,
        phone: formData.phone || '',
        website: formData.website || '',
        intentNote: formData.intentNote || '',
        createdAt: serverTimestamp()
      });
      setFormSubmitted(true);
    } catch (err) {
      setLoiError(isIndo 
        ? 'Gagal menyimpan data EOI. Silakan coba kembali.' 
        : 'Failed to record Expression of Interest. Please try again.'
      );
      handleFirestoreError(err, OperationType.CREATE, `expressionOfInterests/${eoiId}`);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAppointment(true);

    const apptId = "apt-" + Math.random().toString(36).substring(2, 11);
    try {
      await setDoc(doc(db, 'appointments', apptId), {
        meetingType: meetingType,
        scheduledDate: scheduledDate,
        scheduledTime: scheduledTime,
        createdAt: serverTimestamp()
      });
      setAppointmentBooked(true);
    } catch (err) {
      alert(isIndo ? 'Gagal melakukan pemesanan jadwal pertemuan.' : 'Failed to register appointment.');
      handleFirestoreError(err, OperationType.CREATE, `appointments/${apptId}`);
    } finally {
      setIsSubmittingAppointment(false);
    }
  };

  return (
    <section id="investor-center" className="relative py-24 bg-[#001026] text-white overflow-hidden scroll-mt-14 font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-brand-navy/5 rounded-full filter blur-[150px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {t('inv.caption')}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
            {t('inv.title')}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed font-semibold">
            {t('inv.description')}
          </p>
        </div>

        {/* Global Access alert toasts if present */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#001026]/95 border-2 border-brand-gold rounded-none p-4 font-sans max-w-lg w-full text-center shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-start space-x-3 text-left">
                <div className="p-1 px-1.5 bg-[#001F3F] border border-brand-gold/30 text-brand-gold font-mono rounded-none font-bold text-xs shrink-0 mt-0.5">
                  ALERT
                </div>
                <div>
                  <p className="text-xs text-white leading-relaxed font-semibold">
                    {toastMsg}
                  </p>
                  {!isLoggedIn && (toastMsg.includes('Terkunci') || toastMsg.includes('Locked')) && (
                    <button
                      onClick={() => {
                        setToastMsg(null);
                        onOpenLogin();
                      }}
                      className="mt-2.5 px-3 py-1.5 bg-brand-gold hover:bg-[#c5a030] text-brand-navy font-bold font-sans rounded-none text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {isIndo ? 'Buka Pintu Secure Login' : 'Open Secure Login Portal'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Triple Panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Panel 1: Document Secure Data Room - spans 5 columns */}
          <div className="lg:col-span-12 xl:col-span-5 bg-[#001026] rounded-none border border-slate-900 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-2">
                  {isLoggedIn ? (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-brand-gold animate-pulse" />
                  )}
                  <span className="font-mono text-xs text-slate-350 tracking-wider uppercase font-bold">
                    Secure Data Room ({isIndo ? 'Dokumen Terbatas' : 'Confidential Files'})
                  </span>
                </div>
                {isLoggedIn ? (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-none uppercase">
                    Connected
                  </span>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    className="text-[9px] text-brand-gold font-bold hover:underline"
                  >
                    LOGIN &gt;
                  </button>
                )}
              </div>

              {isLoggedIn && (
                <div className="flex bg-[#00142a] p-1 rounded-none gap-1 mb-4 border border-slate-900/40">
                  <button
                    onClick={() => setActiveTab('files')}
                    className={`flex-1 py-1.5 px-3 font-sans font-bold uppercase tracking-wider text-[9px] transition duration-150 rounded-none cursor-pointer ${
                      activeTab === 'files'
                        ? 'bg-brand-gold text-brand-navy font-extrabold'
                        : 'text-slate-400 hover:text-white hover:bg-[#001f3f]/50'
                    }`}
                  >
                    {isIndo ? 'DOKUMEN' : 'DOCUMENTS'}
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-1.5 px-3 font-sans font-bold uppercase tracking-wider text-[9px] transition duration-150 flex items-center justify-center space-x-1.5 rounded-none cursor-pointer ${
                      activeTab === 'history'
                        ? 'bg-brand-gold text-brand-navy font-extrabold'
                        : 'text-slate-400 hover:text-white hover:bg-[#001f3f]/50'
                    }`}
                  >
                    <span>{isIndo ? 'RESPONS LIVE' : 'LIVE ACTIVITY'}</span>
                    <span className="font-mono bg-[#001026] text-brand-gold font-extrabold px-1.5 rounded-none text-[8px]">
                      {eoiRecords.length + apptRecords.length + inquiryRecords.length}
                    </span>
                  </button>
                </div>
              )}

              {activeTab === 'files' ? (
                <>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed font-semibold">
                    {isIndo
                      ? 'Akses dokumen uji kelayakan (Feasibility Study), proyeksi arus kas, rancangan zonasi, rincian perizinan Amdal, serta prospektus formal Kertajati International Industrial Town.'
                      : 'Get formal Feasibility Studies, financial cashflows, master planning blueprints, detailed AMAL environmental compliance filings, and investor briefing folders.'}
                  </p>

                  {/* Document List ledger */}
                  <div className="space-y-3">
                    {investorDocs.map((doc) => {
                      const isConf = doc.confidentiality === 'Confidential' || doc.confidentiality === 'Restricted';
                      const isLocked = isConf && !isLoggedIn;

                      return (
                        <div
                          key={doc.id}
                          className="p-3.5 rounded-none bg-[#001f3f]/40 border border-slate-900/65 hover:border-slate-800 transition duration-150 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-start space-x-3 max-w-[70%]">
                            <div className="p-1 px-1.5 bg-[#001F3F] border border-slate-800 rounded-none text-brand-gold text-[9px] font-mono font-bold shrink-0 mt-0.5">
                              {doc.type}
                            </div>
                            <div>
                              <span className="block font-sans font-extrabold text-slate-150 truncate leading-tight">
                                {doc.title}
                              </span>
                              <span className="block text-[9.5px] font-mono text-slate-500 mt-1">
                                {doc.category} &bull; SIZ: {doc.size}
                              </span>
                            </div>
                          </div>

                          {/* Download actions */}
                          <button
                            onClick={() => handleDownload(doc)}
                            className={`p-2 rounded-none transition-colors shrink-0 cursor-pointer ${
                              isLocked
                                ? 'bg-[#001F3F] text-brand-gold hover:bg-slate-800'
                                : 'bg-brand-gold hover:bg-[#c5a030] text-brand-navy'
                            }`}
                          >
                            {isLocked ? (
                              <Lock className="w-3.5 h-3.5 text-brand-gold" />
                            ) : (
                              <FileDown className="w-3.5 h-3.5 text-brand-navy font-bold" />
                            )}
                          </button>

                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-900/50">
                    <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 uppercase tracking-wider block">
                      &bull; REALTIME SYNC ACTIVE (FIREBASE)
                    </span>
                  </div>

                  {eoiRecords.length === 0 && apptRecords.length === 0 && inquiryRecords.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-slate-900 bg-[#001F3F]/15">
                      <p className="text-xs text-slate-500 font-sans font-semibold">
                        {isIndo ? 'Tidak ada data pengajuan dalam database.' : 'No dynamic transaction history recorded.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      
                      {/* EOI Records */}
                      {eoiRecords.map((rec) => (
                        <div key={rec.id} className="p-3 bg-[#001F3F]/20 border border-brand-gold/15 relative group">
                          <button
                            onClick={() => handleDeleteRecord('expressionOfInterests', rec.id)}
                            className="absolute top-2 right-2 p-1 bg-red-950/45 hover:bg-red-900 text-red-400 hover:text-white transition rounded-none cursor-pointer"
                            title="Delete record from firestore"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          
                          <div className="flex items-center space-x-1.5 mb-1.5">
                            <span className="px-1 bg-amber-500/10 border border-amber-500/25 rounded-none text-[8px] font-mono font-bold text-amber-400 uppercase">
                              LOI/EOI Request
                            </span>
                            <span className="text-[8.5px] font-mono text-slate-500">
                              ID: {rec.id}
                            </span>
                          </div>
                          
                          <h4 className="font-sans font-extrabold text-xs text-slate-100 truncate pr-6">{rec.company}</h4>
                          <p className="text-[10px] text-slate-350 mt-1 font-semibold leading-relaxed">
                            {rec.fullname} &bull; {rec.industry} &bull; <span className="text-brand-gold font-bold">{rec.capital}</span>
                          </p>
                          <p className="text-[9px] text-slate-500 mt-1.5 font-mono truncate">
                            {rec.email} {rec.phone && `• ${rec.phone}`}
                          </p>
                        </div>
                      ))}

                      {/* Appointment Records */}
                      {apptRecords.map((rec) => (
                        <div key={rec.id} className="p-3 bg-[#001F3F]/20 border border-sky-400/15 relative group">
                          <button
                            onClick={() => handleDeleteRecord('appointments', rec.id)}
                            className="absolute top-2 right-2 p-1 bg-red-950/45 hover:bg-red-900 text-red-400 hover:text-white transition rounded-none cursor-pointer"
                            title="Delete record from firestore"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          <div className="flex items-center space-x-1.5 mb-1.5">
                            <span className="px-1 bg-sky-500/10 border border-sky-500/25 rounded-none text-[8px] font-mono font-bold text-sky-400 uppercase">
                              Meeting Schedule
                            </span>
                            <span className="text-[8.5px] font-mono text-slate-500">
                              ID: {rec.id}
                            </span>
                          </div>

                          <h4 className="font-sans font-extrabold text-xs text-slate-100 pr-6 truncate">{rec.meetingType}</h4>
                          <div className="flex items-center space-x-3 mt-1.5 text-[9px] text-slate-400 font-semibold font-mono">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-brand-gold" />
                              <span>{rec.scheduledDate}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-brand-gold" />
                              <span>{rec.scheduledTime}</span>
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Inquiry/Prospectus Records */}
                      {inquiryRecords.map((rec) => (
                        <div key={rec.id} className="p-3 bg-[#001F3F]/20 border border-emerald-400/15 relative group">
                          <button
                            onClick={() => handleDeleteRecord('inquiries', rec.id)}
                            className="absolute top-2 right-2 p-1 bg-red-950/45 hover:bg-red-900 text-red-400 hover:text-white transition rounded-none cursor-pointer"
                            title="Delete record from firestore"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          <div className="flex items-center space-x-1.5 mb-1.5">
                            <span className="px-1 bg-emerald-500/10 border border-emerald-500/25 rounded-none text-[8px] font-mono font-bold text-emerald-400 uppercase">
                              Contact/Prospectus
                            </span>
                            <span className="text-[8.5px] font-mono text-slate-500">
                              ID: {rec.id}
                            </span>
                          </div>

                          <h4 className="font-sans font-extrabold text-xs text-slate-100 pr-6 truncate">{rec.subject}</h4>
                          <p className="text-[10px] text-slate-350 mt-1 font-semibold leading-relaxed">
                            {rec.name} &bull; <span className="font-mono text-slate-400 text-[9px]">{rec.email}</span>
                          </p>
                          <p className="text-[9.5px] text-slate-450 mt-1 px-1.5 py-1 bg-[#001026]/40 border border-slate-900 leading-normal italic line-clamp-2">
                            "{rec.message}"
                          </p>
                        </div>
                      ))}

                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="border-t border-slate-900 pt-6 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase">
              <span>Security Level: OJK & BPN standards</span>
              <span>Updated: 1 June 2026</span>
            </div>
          </div>

          {/* Panel 2: Letter of Intent Form (EOI) - spans 7 columns */}
          <div id="investor-form" className="lg:col-span-12 xl:col-span-7 bg-white rounded-none border border-slate-200 p-6 sm:p-8 text-slate-950 shadow-2xl flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 font-sans text-xs"
                >
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                    <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase">
                      {isIndo ? 'FORMULIR PERNYATAAN MINAT (LOI) ESPRESSION' : 'EXPRESSION OF INTEREST (EOI) FORM'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">OSS Integrated</span>
                  </div>

                  <p className="text-xs text-slate-605 leading-relaxed font-sans font-semibold font-semibold">
                    {isIndo
                      ? 'Lengkapi formulir registrasi minat korporasi di bawah untuk mengagendakan alokasi kavling klaster, negosiasi tax holiday, serta evaluasi readiness pengerjaan sipil.'
                      : 'Complete the corporate registration form below to schedule sector lot allocations, negotiate tax holidays, and evaluate civil work readiness.'}
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                    {loiError && (
                      <div className="p-3 bg-red-100 border border-red-350 text-red-700 text-xs font-bold leading-normal">
                        {loiError}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-widest text-[9.5px] mb-1.5">
                          {isIndo ? 'Nama Lengkap Narahubung *' : 'Contact Liaison Fullname *'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isIndo ? 'Contoh: Raditya Widjaya' : 'e.g. Raditya Widjaya'}
                          value={formData.fullname}
                          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-brand-navy font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-widest text-[9.5px] mb-1.5">
                          {isIndo ? 'Nama Perusahaan / Konsorsium *' : 'Company Name / Consortium *'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isIndo ? 'Contoh: Shanghai Aero-Tech Ltd' : 'e.g. Shanghai Aero-Tech Ltd'}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-brand-navy font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-widest text-[9.5px] mb-1.5">
                          {isIndo ? 'Bidang Sektoral Industri *' : 'Industrial Sector Field *'}
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none cursor-pointer text-brand-navy font-bold"
                        >
                          <option>High-Tech Manufacturing</option>
                          <option>Smart Logistics & Warehousing</option>
                          <option>Aero Dirgantara & MRO</option>
                          <option>Electric Vehicles Ecosystem</option>
                          <option>Modern Food Processing</option>
                          <option>Komersil & Finansial CBD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-widest text-[9.5px] mb-1.5">
                          {isIndo ? 'Rencana Kapasitas Modal (Capex) *' : 'Planned Capital Capacity (CapEx) *'}
                        </label>
                        <select
                          value={formData.capital}
                          onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none cursor-pointer text-brand-navy font-bold"
                        >
                          <option>{isIndo ? 'Rp 10 - Rp 100 Miliar' : 'IDR 10B - IDR 100B'}</option>
                          <option>{isIndo ? 'Rp 100 - Rp 500 Miliar' : 'IDR 100B - IDR 500B'}</option>
                          <option>{isIndo ? 'Rp 500 Miliar - Rp 1 Triliun' : 'IDR 500B - IDR 1T'}</option>
                          <option>{isIndo ? 'Di atas Rp 1 Triliun' : 'Over IDR 1 Trillion'}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 uppercase tracking-widest text-[9.5px] mb-1.5">
                          {isIndo ? 'Alamat Surat Elektronik (Email) *' : 'Corporate Email Address *'}
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="contoh@sperotech.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-brand-navy font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-widest text-[9.5px] mb-1.5">
                          {isIndo ? 'Nomor Telepon M-Bile *' : 'Mobile Phone Number *'}
                        </label>
                        <input
                          type="tel"
                          placeholder="+62 811..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-brand-navy font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-widest text-[9.5px] mb-1.5">
                        {isIndo ? 'Catatan Khusus / Keperluan Spasial (Opsional)' : 'Special Request / Spatial Requirements (Optional)'}
                      </label>
                      <textarea
                        rows={3}
                        placeholder={isIndo 
                          ? 'Contoh: Kami menginginkan akses steril langsung runway kargo (bias untuk sektor MRO Aerospace)...'
                          : 'e.g. We require direct aircraft taxiway access for MRO operations adjacent to the runway...'
                        }
                        value={formData.intentNote}
                        onChange={(e) => setFormData({ ...formData, intentNote: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none resize-none text-brand-navy font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingForm}
                      className="w-full py-3.5 bg-brand-navy hover:bg-[#001026] disabled:bg-slate-300 disabled:text-slate-500 text-white font-sans font-extrabold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg rounded-none disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-brand-gold font-bold" />
                      <span>
                        {isSubmittingForm 
                          ? (isIndo ? 'MENGIRIMKAN..."' : 'SUBMITTING...') 
                          : (isIndo ? 'KIRIM PERNYATAAN MINAT FORMAL (LOI)' : 'SUBMIT EXPRESSION OF INTEREST (EOI)')}
                      </span>
                    </button>

                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-10"
                >
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-none flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-7 h-7 text-emerald-600 font-bold" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold tracking-widest">
                      SUKSES REGISTERED &bull; OK
                    </span>
                    <h3 className="font-sans font-extrabold text-2xl text-slate-900 leading-none">
                      {isIndo ? 'Surat Minat Berhasil Terekam!' : 'Declaration of Interest Logined!'}
                    </h3>
                    <p className="max-w-md mx-auto text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {isIndo 
                        ? <>Terima kasih <strong className="text-slate-900 font-bold">{formData.fullname}</strong> dari <strong className="text-slate-900 font-bold">{formData.company}</strong>. Tim dewan penasihat penanaman modal KIIT bersama perwakilan Bappeda / Dinas PMTSP Kabupaten Majalengka akan meninjau kualifikasi registrasi anda dalam kurun waktu 48 jam pengerjaan. Nomor ID Tiket Pengajuan anda: <strong className="font-mono text-brand-navy font-bold">KIIT-EOI-2026-X83C (SECURE)</strong>.</>
                        : <>Thank you <strong className="text-slate-900 font-bold">{formData.fullname}</strong> from <strong className="text-slate-900 font-bold">{formData.company}</strong>. The KIIT Board along with BKPM Kabupaten Majalengka verifiers will evaluate your sector parameters inside 48 business hours. Reference ID: <strong className="font-mono text-brand-navy font-bold">KIIT-EOI-2026-X83C (SECURE)</strong>.</>
                      }
                    </p>
                  </div>

                  <div className="pt-4 max-w-sm mx-auto">
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="w-full py-3 bg-brand-navy hover:bg-slate-800 rounded-none text-white font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      {isIndo ? 'Kirim Tiket Surat Baru' : 'Submit Another Letter'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Third Section Component: On-site Meeting Booking Scheduler */}
        <div className="bg-[#001026] border border-slate-900 rounded-none p-6 sm:p-8 shadow-2xl">
          <div className="border-b border-slate-900 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <span className="block text-[10px] font-mono text-brand-gold uppercase tracking-widest font-bold mb-1">
                {isIndo ? 'JADWALKAN PERTEMUAN • BOARD MEETING SCHEDULER' : 'SCHEDULE MEETINGS • BOARD MEETING SCHEDULER'}
              </span>
              <h3 className="font-sans font-extrabold text-xl text-white">
                {isIndo ? 'Ajukan Konferensi Tatap Muka' : 'Request Advisory Session'}
              </h3>
            </div>
            <span className="mt-2 sm:mt-0 px-2.5 py-1 bg-[#001F3F] border border-brand-gold/20 rounded-none font-mono text-[10px] text-slate-300 font-bold block">
              {isIndo ? 'Sinkronisasi Jadwal Bupati & Bappeda Kabupaten Majalengka' : 'Synchronized with Majalengka Regent & Kabupaten Majalengka Board Schedule'}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!appointmentBooked ? (
              <motion.form
                key="scheduler-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleScheduleSubmit}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-sans items-end"
              >
                <div>
                  <label className="block font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-2">
                    {isIndo ? 'Pilih Instansi Pertemuan' : 'Select Target Agency'}
                  </label>
                  <select
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                    className="w-full bg-[#001F3F]/45 border border-slate-800 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none cursor-pointer text-white font-bold"
                  >
                    <option>{isIndo ? 'Tim Teknis Proyek KIIT (On-Site Office)' : 'KIIT Engineering Team (On-Site Office)'}</option>
                    <option>{isIndo ? 'Dinas PMTSP Kabupaten Majalengka (Majalengka Office)' : 'Kabupaten Majalengka PMTSP Office (Majalengka HQ)'}</option>
                    <option>{isIndo ? 'Auditor Bappeda Kab. Majalengka' : 'Bappeda Auditor Majalengka Region'}</option>
                    <option>{isIndo ? 'Sesi Konsultasi Khusus Bupati Majalengka (VIP Room)' : 'VIP Advisory with Majalengka Regent'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-2">
                    {isIndo ? 'Pilih Tanggal Rencana' : 'Choose Target Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-[#001F3F]/45 border border-slate-800 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none cursor-pointer text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-2">
                    {isIndo ? 'Pilih Jam Sesi' : 'Choose Time Session'}
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-[#001F3F]/45 border border-slate-800 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none cursor-pointer text-white font-bold"
                  >
                    <option>{isIndo ? '09:00 WIB (Pagi Sesi I)' : '09:00 AM (Morning Session 1)'}</option>
                    <option>{isIndo ? '10:30 WIB (Pagi Sesi II)' : '10:30 AM (Morning Session 2)'}</option>
                    <option>{isIndo ? '13:30 WIB (Siang Sesi III)' : '01:30 PM (Afternoon Session 3)'}</option>
                    <option>{isIndo ? '15:00 WIB (Sore Sesi IV)' : '03:00 PM (Afternoon Session 4)'}</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmittingAppointment}
                    className="w-full py-3 bg-brand-gold hover:bg-[#c5a030] disabled:bg-slate-800 disabled:text-slate-500 text-brand-navy font-extrabold tracking-widest text-xs uppercase cursor-pointer rounded-none transition-colors disabled:cursor-not-allowed"
                  >
                    {isSubmittingAppointment 
                      ? (isIndo ? 'MEMESAN JADWAL...' : 'BOOKING SESSI...') 
                      : (isIndo ? 'Booking Jadwal' : 'Book Appointment')}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="scheduler-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-900 border border-slate-800 rounded-none flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-slate-900 to-[#001026] gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-none text-emerald-400 font-bold">
                    <Check className="w-5 h-5 text-emerald-400 font-extrabold" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      {isIndo ? 'JADWAL PERTEMUAN TEREGISTRASI' : 'MEETING APPOINTMENT BOOKED'}
                    </span>
                    <h4 className="font-sans font-bold text-base text-white mt-1">
                      {meetingType}
                    </h4>
                    <span className="block text-xs font-mono text-slate-400 mt-1">
                      {isIndo ? 'Waktu Sesi:' : 'Booked For:'} {scheduledDate} &bull; {scheduledTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setAppointmentBooked(false)}
                  className="px-4 py-2 border border-slate-850 hover:border-brand-gold text-xs font-mono rounded-none text-slate-300 hover:text-brand-gold tracking-wider transition-colors cursor-pointer"
                >
                  {isIndo ? 'BATAL / RESET JADWAL' : 'CANCEL / RESET APPOINTMENT'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

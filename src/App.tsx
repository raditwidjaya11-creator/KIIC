import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Lock, Download, Check, X, FileBarChart, HardHat } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Custom Sektoral components imports
import Header from './components/Header';
import Hero from './components/Hero';
import KPIDash from './components/KPIDash';
import Masterplan from './components/Masterplan';
import InvestmentProjections from './components/InvestmentProjections';
import LandAcquisition from './components/LandAcquisition';
import IndustrialClusters from './components/IndustrialClusters';
import InvestorCenter from './components/InvestorCenter';
import EconomicImpact from './components/EconomicImpact';
import GisMap from './components/GisMap';
import EsgSustainability from './components/EsgSustainability';
import NewsMedia from './components/NewsMedia';
import ContactFooter from './components/ContactFooter';

export default function App() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Modal toggles
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [prospectusModalOpen, setProspectusModalOpen] = useState(false);
  
  // Custom states inside login modal
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Prospektus modal submission states
  const [prospName, setProspName] = useState('');
  const [prospCompany, setProspCompany] = useState('');
  const [prospPhone, setProspPhone] = useState('');
  const [prospEmail, setProspEmail] = useState('');
  const [prospInterest, setProspInterest] = useState('Direct Investment (Tenant)');
  const [prospDownloaded, setProspDownloaded] = useState(false);
  const [prospError, setProspError] = useState('');
  const [isSubmittingProsp, setIsSubmittingProsp] = useState(false);

  // Tracks Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setLoginModalOpen(false);
      setLoginError('');
    } catch (err: any) {
      setLoginError(language === 'id' ? `Masuk Google gagal: ${err.message}` : `Google log in failed: ${err.message}`);
    }
  };

  // Monitor active scroll positions to update sticky navbar indicators
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      
      const sections = [
        { id: 'hero', top: 0 },
        { id: 'tentang', el: document.getElementById('tentang') },
        { id: 'dashboard', el: document.getElementById('dashboard') },
        { id: 'masterplan', el: document.getElementById('masterplan') },
        { id: 'investasi', el: document.getElementById('investasi') },
        { id: 'lahan', el: document.getElementById('lahan') },
        { id: 'klaster', el: document.getElementById('klaster') },
        { id: 'gis', el: document.getElementById('gis') },
        { id: 'esg', el: document.getElementById('esg') },
        { id: 'berita', el: document.getElementById('berita') },
        { id: 'kontak', el: document.getElementById('kontak') },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s.el) {
          if (scrollPosition >= s.el.offsetTop) {
            setActiveSection(s.id);
            break;
          }
        } else if (s.id === 'hero' && scrollPosition < 300) {
          setActiveSection('hero');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError(language === 'id' ? 'Kredensial wajib diisi.' : 'Credentials are required.');
      return;
    }
    // Simple demo password verification for Bupati presentation: accepts 'admin' / 'kertajati'
    if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'kertajati') {
      setIsLoggedIn(true);
      setLoginError('');
      setLoginModalOpen(false);
      setUsername('');
      setPassword('');
    } else {
      setLoginError(language === 'id' ? 'Username atau sandi salah - Gunakan "kertajati" atau "admin" untuk simulasi.' : 'Invalid credentials - Use "kertajati" or "admin" for simulation.');
    }
  };

  const handleModalClose = () => {
    setLoginModalOpen(false);
    setLoginError('');
  };

  const handleProspectusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prospName || !prospCompany || !prospPhone || !prospEmail) {
      setProspError(language === 'id' 
        ? 'Nama Lengkap, Perusahaan, Kontak, dan Alamat Email Korporasi wajib diisi.' 
        : 'Full Name, Company Name, Contact Phone, and Corporate Email Address are required.');
      return;
    }
    setProspError('');
    setIsSubmittingProsp(true);

    const inquiryId = "prosp-" + Math.random().toString(36).substring(2, 11);
    try {
      await setDoc(doc(db, 'inquiries', inquiryId), {
        name: prospName,
        email: prospEmail,
        subject: `Prospectus Request: ${prospInterest}`,
        message: `Requested KIIT Investment Prospectus. Category of Interest: ${prospInterest}. Company: ${prospCompany}. Phone: ${prospPhone}.`,
        createdAt: serverTimestamp()
      });
      setProspDownloaded(true);
    } catch (err) {
      setProspError(language === 'id' ? 'Gagal mengirimkan permohonan prospektus ke server.' : 'Failed to register prospectus request.');
      handleFirestoreError(err, OperationType.CREATE, `inquiries/${inquiryId}`);
    } finally {
      setIsSubmittingProsp(false);
    }
  };

  return (
    <div className="bg-slate-55 font-sans text-slate-800 antialiased selection:bg-brand-gold selection:text-brand-navy">
      
      {/* Sticky Header Layer */}
      <Header
        onNavigate={handleNavigation}
        activeSection={activeSection}
        onOpenLogin={() => setLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Screen Hero */}
      <Hero
        onExplore={handleNavigation}
        onOpenProspectus={() => setProspectusModalOpen(true)}
        onOpenScheduler={() => handleNavigation('investor-center')}
      />

      {/* SECTION TENTANG: Sejarah, Geografi, Konektivitas */}
      <section id="tentang" className="relative py-24 bg-white overflow-hidden scroll-mt-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Connectivity Diagram - Left panel 5 cols */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-brand-navy/5 rounded-none filter blur-xl opacity-80"></div>
              
              <div className="relative bg-[#001026] border border-slate-900 rounded-none p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
                {/* Tech coordinates details */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-none filter blur-2xl"></div>
                <div className="flex justify-between items-center border-b border-slate-900 pb-3.5 mb-6">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-brand-gold" />
                    <span className="font-mono text-[10px] tracking-wider text-slate-300 font-bold uppercase">
                      {t('about.matrix_title')}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">{t('about.matrix_secure')}</span>
                </div>

                <div className="space-y-5 text-xs font-mono font-bold">
                  <div className="p-3.5 rounded-none bg-[#001A33]/45 border border-slate-900 flex justify-between items-center">
                    <div>
                      <span className="block text-slate-400 font-bold">{t('about.matrix_bijb_label')}</span>
                      <strong className="block text-white text-sm font-sans font-extrabold mt-1">{t('about.matrix_bijb_val')}</strong>
                    </div>
                    <span className="text-[10px] text-brand-gold font-bold uppercase">{t('about.matrix_bijb_tag')}</span>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#001A33]/45 border border-slate-900 flex justify-between items-center">
                    <div>
                      <span className="block text-slate-400 font-bold">{t('about.matrix_toll_label')}</span>
                      <strong className="block text-white text-sm font-sans font-extrabold mt-1">{t('about.matrix_toll_val')}</strong>
                    </div>
                    <span className="text-[10px] text-slate-450 font-bold">{t('about.matrix_toll_tag')}</span>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#001A33]/45 border border-slate-900 flex justify-between items-center">
                    <div>
                      <span className="block text-slate-400 font-bold">{t('about.matrix_port_label')}</span>
                      <strong className="block text-white text-sm font-sans font-extrabold mt-1">{t('about.matrix_port_val')}</strong>
                    </div>
                    <span className="text-[10px] text-slate-450 font-bold">{t('about.matrix_port_tag')}</span>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#001A33]/45 border border-slate-900 flex justify-between items-center">
                    <div>
                      <span className="block text-slate-400 font-bold">{t('about.matrix_bandung_label')}</span>
                      <strong className="block text-white text-sm font-sans font-extrabold mt-1 font-sans">{t('about.matrix_bandung_val')}</strong>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">{t('about.matrix_bandung_tag')}</span>
                  </div>
                </div>

                <div className="border-t border-slate-900 pt-4 mt-6 flex justify-between items-center text-[9px] text-slate-500 uppercase font-bold">
                  <span>GPS: 6°39'S 108°10'E</span>
                  <span>Appraisal Audit: 2026</span>
                </div>
              </div>
            </div>

            {/* Narrative text Column - Right panel 7 cols */}
            <div className="lg:col-span-7 space-y-6 lg:pl-4">
              <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-1">
                {t('about.caption')}
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
                {t('about.title')}
              </h2>
              <p className="font-sans text-slate-600 leading-relaxed text-sm md:text-base font-semibold">
                {t('about.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-sans font-extrabold text-sm text-brand-navy uppercase tracking-wide flex items-center space-x-1.5 font-mono">
                    <span className="w-1.5 h-4 bg-brand-gold inline-block"></span>
                    <span>{t('about.aero_title')}</span>
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-bold">
                    {t('about.aero_desc')}
                  </p>
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-sm text-brand-navy uppercase tracking-wide flex items-center space-x-1.5 font-mono">
                    <span className="w-1.5 h-4 bg-brand-gold inline-block"></span>
                    <span>{t('about.clean_title')}</span>
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-bold">
                    {t('about.clean_desc')}
                  </p>
                </div>
              </div>

              {/* Action prospectus down */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between font-sans">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase leading-none block font-bold">{t('about.status_label')}</span>
                  <strong className="text-emerald-700 text-xs font-sans mt-1 block font-extrabold">{t('about.status_value')}</strong>
                </div>
                <button
                  onClick={() => setProspectusModalOpen(true)}
                  className="px-4 py-2.5 rounded-none bg-brand-navy hover:bg-brand-gold text-white hover:text-brand-navy font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('about.btn_prospectus')}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Operational dynamic dashboards modules */}
      <KPIDash />

      <Masterplan />

      <InvestmentProjections />

      <LandAcquisition />

      <IndustrialClusters />

      <GisMap />

      <EsgSustainability />

      {/* Investor private credentials banner if logged out */}
      <AnimatePresence>
        {!isLoggedIn && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-12 bg-gradient-to-r from-[#001026] to-[#001F3F] border-y border-brand-gold/15 relative overflow-hidden"
          >
            <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
              <span className="px-2 py-0.5 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-mono text-[9px] font-bold uppercase tracking-widest leading-none">
                {t('gate.badge')}
              </span>
              <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight leading-none">
                {t('gate.title')}
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mx-auto font-sans font-semibold leading-relaxed">
                {t('gate.description')}
              </p>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="mt-2.5 px-6 py-3 rounded-none bg-brand-gold hover:bg-brand-gold/90 text-slate-950 font-sans font-extrabold text-xs tracking-widest uppercase transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-slate-950" />
                <span>{t('gate.btn_login')}</span>
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <InvestorCenter
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      <EconomicImpact />

      <NewsMedia />

      <ContactFooter />

      {/* --------------------- MODALS BLOCK --------------------- */}
      
      {/* 1. Modal Login Investor */}
      <AnimatePresence>
        {loginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#001a33] border border-slate-900 rounded-none p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-white"
            >
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 p-1.5 bg-brand-navy hover:bg-brand-navy/80 rounded-none text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 mb-6 text-center">
                <div className="w-12 h-12 rounded-none bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center mx-auto text-brand-gold">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-extrabold text-xl leading-none">
                  {t('modal.login_title')}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed font-semibold">
                  {t('modal.login_desc')}
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
                {loginError && (
                  <p className="p-3 bg-red-500/10 border border-red-500/20 text-red-450 rounded-none font-mono text-center font-bold">
                    {loginError}
                  </p>
                )}

                <div className="space-y-2">
                  <label className="block text-slate-300 tracking-wider font-bold uppercase text-[9px]">{t('modal.field_user')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('modal.field_user_placeholder')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#001F3F]/45 border border-slate-900 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none placeholder:text-slate-500 font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-300 tracking-wider font-bold uppercase text-[9px]">{t('modal.field_pw')}</label>
                  <input
                    type="password"
                    required
                    placeholder={t('modal.field_pw_placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#001F3F]/45 border border-slate-900 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none placeholder:text-slate-500 font-semibold"
                  />
                </div>

                <div className="p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-none text-slate-300 leading-normal font-semibold">
                  💡 <span className="font-bold text-brand-gold bg-transparent">
                    {language === 'id' ? 'Petunjuk Presentasi:' : 'Presentation Cheat-Sheet:'}
                  </span>{' '}
                  {t('modal.login_tip')}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-none bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-bold uppercase tracking-wider transition-all cursor-pointer font-sans"
                >
                  {t('modal.btn_authorize')}
                </button>

                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-slate-900"></div>
                  <span className="mx-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">OR</span>
                  <div className="flex-grow border-t border-slate-900"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-3 border border-brand-gold/30 hover:border-brand-gold bg-[#001F3F]/60 text-slate-300 hover:text-brand-gold font-sans font-extrabold uppercase tracking-widest text-[10px] transition-all rounded-none flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-brand-gold" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.111 4.114-3.555 0-6.44-2.885-6.44-6.44s2.885-6.44 6.44-6.44c1.633 0 3.126.604 4.276 1.62l3.187-3.187C19.167 2.138 15.93 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.898 0 10.237-4.141 10.237-10.237 0-.693-.083-1.362-.222-1.958H12.24z"/>
                  </svg>
                  <span>{language === 'id' ? 'MASUK DENGAN GOOGLE' : 'SIGN IN WITH GOOGLE'}</span>
                </button>

              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Modal Unduh Prospektus Investasi */}
      <AnimatePresence>
        {prospectusModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#001a33] border border-slate-900 rounded-none p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-white"
            >
              <button
                onClick={() => {
                  setProspectusModalOpen(false);
                  setProspDownloaded(false);
                  setProspName('');
                  setProspCompany('');
                  setProspPhone('');
                  setProspEmail('');
                  setProspError('');
                }}
                className="absolute top-4 right-4 p-1.5 bg-brand-navy hover:bg-brand-navy/80 rounded-none text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <AnimatePresence mode="wait">
                {!prospDownloaded ? (
                  <motion.div
                    key="prosp-form"
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="space-y-3 text-center">
                      <div className="w-12 h-12 rounded-none bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center mx-auto text-brand-gold">
                        <FileBarChart className="w-5 h-5" />
                      </div>
                      <h3 className="font-sans font-extrabold text-lg leading-none">
                        {t('modal.prop_title')}
                      </h3>
                      <p className="text-xs text-slate-300 leading-normal font-semibold">
                        {t('modal.prop_desc')}
                      </p>
                    </div>

                    <form onSubmit={handleProspectusSubmit} className="space-y-4 text-xs font-sans">
                      
                      {prospError && (
                        <p className="p-3 bg-red-500/15 border border-red-500/25 text-red-400 rounded-none text-center font-mono font-bold leading-none">
                          {t('modal.prop_err')}
                        </p>
                      )}

                      <div className="space-y-2">
                        <label className="block text-slate-350 font-bold uppercase tracking-widest text-[9px]">{t('modal.field_prop_name')}</label>
                        <input
                           type="text"
                           required
                           placeholder={t('modal.field_prop_name_placeholder')}
                           value={prospName}
                           onChange={(e) => setProspName(e.target.value)}
                           className="w-full bg-[#001F3F]/45 border border-slate-900 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none placeholder:text-slate-550 font-semibold text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-350 font-bold uppercase tracking-widest text-[9px]">{t('modal.field_prop_company')}</label>
                        <input
                           type="text"
                           required
                           placeholder={t('modal.field_prop_company_placeholder')}
                           value={prospCompany}
                           onChange={(e) => setProspCompany(e.target.value)}
                           className="w-full bg-[#001F3F]/45 border border-slate-900 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none placeholder:text-slate-550 font-semibold text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-350 font-bold uppercase tracking-widest text-[9px]">{t('modal.field_prop_phone')}</label>
                        <input
                           type="text"
                           required
                           placeholder={t('modal.field_prop_phone_placeholder')}
                           value={prospPhone}
                           onChange={(e) => setProspPhone(e.target.value)}
                           className="w-full bg-[#001F3F]/45 border border-slate-900 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none placeholder:text-slate-550 font-semibold text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-350 font-bold uppercase tracking-widest text-[9px]">{t('modal.field_prop_email')}</label>
                        <input
                           type="email"
                           required
                           placeholder={t('modal.field_prop_email_placeholder')}
                           value={prospEmail}
                           onChange={(e) => setProspEmail(e.target.value)}
                           className="w-full bg-[#001F3F]/45 border border-slate-900 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none placeholder:text-slate-550 font-semibold text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-350 font-bold uppercase tracking-widest text-[9px]">{t('modal.field_prop_interest')}</label>
                        <select
                          value={prospInterest}
                          onChange={(e) => setProspInterest(e.target.value)}
                          className="w-full bg-[#001F3F]/55 border border-slate-900 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-slate-300 font-bold"
                        >
                          <option value="Direct Investment (Tenant Pabrik)">
                            {language === 'id' ? 'Direct Investment (Tenant Pabrik)' : 'Direct Investment (Factory Tenant)'}
                          </option>
                          <option value="Kontraktor Kawasan Industri (Developer)">
                            {language === 'id' ? 'Kontraktor Kawasan Industri (Developer)' : 'Industrial Park Developer / Contractor'}
                          </option>
                          <option value="Joint Venture / Konsorsium Negara">
                            {language === 'id' ? 'Joint Venture / Konsorsium Negara' : 'Joint Venture / National Consortium'}
                          </option>
                          <option value="Lembaga Ekuitas & Perbankan Swasta">
                            {language === 'id' ? 'Lembaga Ekuitas & Perbankan Swasta' : 'Equity Funds & Private Banking'}
                          </option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingProsp}
                        className="w-full py-3 rounded-none bg-brand-gold hover:bg-[#c5a030] disabled:bg-slate-800 disabled:text-slate-500 text-brand-navy font-bold uppercase tracking-wider transition-all cursor-pointer font-sans disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isSubmittingProsp 
                          ? (language === 'id' ? 'MENGIRIM FORMULIR...' : 'SUBMITTING REQUEST...') 
                          : (language === 'id' ? 'Kirim & Buka Unduh Dokumen' : 'Submit & Open Download Asset')}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="prosp-success"
                    className="space-y-6 text-center py-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-14 h-14 bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 rounded-none flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-sans font-extrabold text-lg text-white">
                        {t('modal.prop_success_title')}
                      </h4>
                      <p className="text-xs text-slate-305 leading-normal max-w-sm mx-auto font-semibold">
                        {t('modal.prop_success_desc').replace('{email}', prospEmail)}
                      </p>
                    </div>

                    <div className="space-y-2 max-w-xs mx-auto pt-4 font-sans">
                      <a
                        href="https://www.customs.go.id/assets/file/faq/kek.pdf"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          setProspectusModalOpen(false);
                          setProspDownloaded(false);
                        }}
                        className="w-full py-3 rounded-none bg-brand-navy hover:bg-brand-gold border border-brand-gold/30 text-white hover:text-brand-navy font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t('modal.prop_btn_download')}</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

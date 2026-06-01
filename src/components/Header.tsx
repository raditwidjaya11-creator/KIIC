import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Menu, X, Landmark, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ onNavigate, activeSection, onOpenLogin, isLoggedIn, onLogout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'tentang', label: t('nav.tentang') },
    { id: 'dashboard', label: t('nav.dashboard') },
    { id: 'masterplan', label: t('nav.masterplan') },
    { id: 'investasi', label: t('nav.investasi') },
    { id: 'lahan', label: t('nav.lahan') },
    { id: 'klaster', label: t('nav.klaster') },
    { id: 'gis', label: t('nav.gis') },
    { id: 'esg', label: t('nav.esg') },
    { id: 'berita', label: t('nav.berita') },
    { id: 'kontak', label: t('nav.kontak') },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200/80 py-3 shadow-md shadow-slate-200/20'
            : 'bg-white/90 backdrop-blur-md border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleItemClick('hero')}
            >
              <div className="w-10 h-10 bg-brand-navy flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-105 shadow-sm">
                <div className="w-5 h-5 border-2 border-brand-gold rotate-45"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-xl tracking-tighter text-brand-navy leading-none">
                  KIIT
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
                  Kertajati International
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`px-3 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 relative cursor-pointer ${
                      isActive
                        ? 'text-brand-navy font-extrabold pb-1'
                        : 'text-slate-500 hover:text-brand-navy'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Investor Button & Language Toggle */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Premium Language Toggler Capsule */}
              <div className="flex bg-slate-100 border border-slate-250 rounded-full p-0.5 mr-1 shadow-inner">
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-2.5 py-1 text-[9px] font-mono font-black uppercase transition-all rounded-full cursor-pointer ${
                    language === 'id'
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-slate-500 hover:text-brand-navy'
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 text-[9px] font-mono font-black uppercase transition-all rounded-full cursor-pointer ${
                    language === 'en'
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-slate-500 hover:text-brand-navy'
                  }`}
                >
                  EN
                </button>
              </div>

              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-500/20 px-2.5 py-1 rounded-sm font-bold">
                    {t('nav.secure_portal')}
                  </span>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-650 text-xs font-bold tracking-widest rounded-sm uppercase transition-all cursor-pointer"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="px-5 py-2 border border-brand-navy text-brand-navy text-[11px] font-extrabold uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-sm cursor-pointer"
                >
                  {t('nav.portal')}
                </button>
              )}
              <button
                onClick={() => handleItemClick('kontak')}
                className="px-5 py-2 bg-brand-navy hover:bg-slate-800 text-white text-[11px] font-extrabold uppercase tracking-widest shadow-lg shadow-slate-200/50 transition-colors rounded-sm cursor-pointer"
              >
                {t('nav.inquire')}
              </button>
            </div>

            {/* Mobile Menu Action */}
            <div className="flex items-center lg:hidden space-x-2">
              {/* Minimalist Mobile Language Selector */}
              <div className="flex bg-slate-100 border border-slate-200 rounded-sm p-0.5 mr-1 text-[10px] font-mono">
                <button
                  onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                  className="px-2 py-0.5 rounded-sm bg-brand-navy text-brand-gold font-bold uppercase transition-all cursor-pointer text-[9px]"
                >
                  {language === 'id' ? 'ID ⇄ EN' : 'EN ⇄ ID'}
                </button>
              </div>

              {!isLoggedIn && (
                <button
                  onClick={onOpenLogin}
                  className="p-1 px-3 border border-brand-navy rounded-sm text-brand-navy text-[10px] font-bold tracking-wider uppercase flex items-center space-x-1 cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>{t('nav.login')}</span>
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-md text-brand-navy hover:bg-slate-100 bg-transparent border border-slate-200 focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-35 bg-white/98 border-b border-brand-gold/20 backdrop-blur-xl shadow-2xl p-5 lg:hidden flex flex-col space-y-3"
          >
            {/* Embedded Mobile Language Selector Inside Drawer */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-500">
              <span className="font-bold tracking-wider uppercase text-[10px]">Pilih Bahasa / Select Language:</span>
              <div className="flex bg-slate-100 border border-slate-200 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-3 py-1 text-[9px] font-mono font-bold uppercase transition-all rounded-full ${
                    language === 'id' ? 'bg-brand-navy text-white' : 'text-slate-500'
                  }`}
                >
                  Bahasa (ID)
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-[9px] font-mono font-bold uppercase transition-all rounded-full ${
                    language === 'en' ? 'bg-brand-navy text-white' : 'text-slate-500'
                  }`}
                >
                  English (EN)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`p-2.5 text-left text-xs font-bold tracking-wide uppercase rounded-md transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-navy/5 text-brand-navy border-l-2 border-brand-gold font-extrabold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {isLoggedIn ? (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-emerald-600 font-mono font-bold">{t('nav.secure_portal')}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-650 border border-red-200 rounded px-3 py-1.5 hover:bg-red-50 font-bold uppercase tracking-wider"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded bg-brand-navy text-white hover:bg-slate-800 font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t('gate.btn_login')}</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

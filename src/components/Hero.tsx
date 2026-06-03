import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, FileSpreadsheet, MapIcon, CalendarRange, ArrowRight, Play, Server, PlaneTakeoff, ShieldAlert, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import VrViewer from './VrViewer';

interface HeroProps {
  onExplore: (sectionId: string) => void;
  onOpenProspectus: () => void;
  onOpenScheduler: () => void;
}

export default function Hero({ onExplore, onOpenProspectus, onOpenScheduler }: HeroProps) {
  const { language, t } = useLanguage();
  const [isVrOpen, setIsVrOpen] = useState<boolean>(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#001026] via-brand-navy to-[#001026] pt-[80px]">
      {/* Visual Engineering Grid & Futuristic Nodes */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Glow Spheres representing active clusters */}
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-brand-navy rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-brand-gold/40 rounded-full filter blur-[150px] animate-pulse duration-5000"></div>
        <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-teal-800/30 rounded-full filter blur-[100px]"></div>
      </div>

      {/* Futuristic aviation and logistics visual elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          {/* flight path */}
          <path
            d="M 100,500 Q 500,100 1200,300 T 1800,200"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeDasharray="8,6"
            className="animate-dash"
          />
          {/* connectivity nodes */}
          <circle cx="500" cy="100" r="4" fill="#D4AF37" className="animate-ping" />
          <line x1="500" y1="100" x2="500" y2="400" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4,4" />
          <circle cx="1200" cy="300" r="4" fill="#60A5FA" />
          {/* coordinates indicator */}
          <text x="50" y="120" className="fill-slate-500 font-mono text-[9px] uppercase tracking-widest">
            {language === 'id' ? 'KAB: MAJALENGKA | KORIDOR REBANA KABUPATEN MAJALENGKA' : 'MAJALENGKA REGENCY | KABUPATEN MAJALENGKA REBANA CORRIDOR'}
          </text>
          <text x="50" y="140" className="fill-slate-500 font-mono text-[9px] uppercase tracking-widest">
            LAT: -6.6508 | LON: 108.1729
          </text>
        </svg>
      </div>

      {/* Decorative Radial Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#001026]/40 to-[#001026] z-0"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-16">
        
        {/* Status Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/30 px-5 py-2.5 rounded-none mb-8 shadow-lg shadow-brand-gold/5 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
          </span>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#FFF] text-opacity-95">
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Portofolio Title & Visual branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="font-sans text-slate-300 text-xs sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
            {t('hero.sub_brand')}
          </h2>
          <h1 className="font-sans font-extrabold tracking-tight text-white text-4xl sm:text-5xl md:text-7xl leading-none">
            {t('hero.brand_title1')}
            <span className="block mt-3 text-brand-gold font-sans tracking-wide">
              {t('hero.brand_title2')}
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Concept Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-3xl mx-auto font-sans font-bold text-lg sm:text-xl text-slate-100 border-y border-slate-800/60 py-3.5 block"
        >
          {t('hero.concept_sub')}
        </motion.p>

        {/* Main Strategic Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 max-w-2xl mx-auto font-sans font-normal text-sm sm:text-base text-slate-300 leading-relaxed"
        >
          {language === 'id' ? (
            <>
              Kawasan ekonomi terpadu seluas <strong className="text-white font-bold">1.000 hektare</strong> yang dirancang strategis menjadi pusat manufaktur canggih, hub logistik pintar, aerospace & aviasi, industri kendaraan listrik (EV) masa depan, agroindustri modern, serta pusat bisnis bertaraf dunia.
            </>
          ) : (
            <>
              A <strong className="text-white font-bold">1,000-hectare</strong> integrated economic zone strategically designed to become a hub for advanced manufacturing, smart logistics, aerospace & aviation, future electric vehicles (EV), modern agro-industry, and premium business districts.
            </>
          )}
        </motion.p>

        {/* High Conversion Action Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest uppercase"
        >
          {/* Button 1: Jelajahi Investasi */}
          <button
            onClick={() => onExplore('investasi')}
            className="flex items-center space-x-2 px-6 py-4 bg-brand-gold hover:bg-[#c5a030] text-brand-navy shadow-lg shadow-brand-gold/15 transition-all duration-300 cursor-pointer rounded-sm"
          >
            <Compass className="w-4 h-4 text-brand-navy" />
            <span>{t('hero.btn_explore')}</span>
            <ArrowRight className="w-4 h-4 text-brand-navy" />
          </button>

          {/* Button 2: Lihat Masterplan */}
          <button
            onClick={() => onExplore('masterplan')}
            className="flex items-center space-x-2 px-6 py-4 bg-brand-navy/60 hover:bg-brand-navy text-white border border-slate-700 hover:border-brand-gold transition-all duration-300 cursor-pointer rounded-sm"
          >
            <MapIcon className="w-4 h-4 text-brand-gold" />
            <span>{t('hero.btn_masterplan')}</span>
          </button>

          {/* Button 3: Download prospectus */}
          <button
            onClick={onOpenProspectus}
            className="flex items-center space-x-2 px-6 py-4 bg-brand-navy/60 hover:bg-brand-navy text-white border border-slate-700 hover:border-brand-gold transition-all duration-300 cursor-pointer rounded-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-brand-gold" />
            <span>{t('hero.btn_prospectus')}</span>
          </button>

          {/* Button 4: Jadwalkan Pertemuan */}
          <button
            onClick={onOpenScheduler}
            className="flex items-center space-x-2 px-6 py-4 bg-brand-navy/80 text-brand-gold border border-brand-gold/45 hover:border-brand-gold transition-all duration-300 cursor-pointer rounded-sm"
          >
            <CalendarRange className="w-4 h-4 text-brand-gold" />
            <span>{t('hero.btn_schedule')}</span>
          </button>

          {/* Button 5: VR SITE TOUR */}
          <button
            onClick={() => setIsVrOpen(true)}
            className="flex items-center space-x-2 px-6 py-4 bg-teal-950/60 text-teal-400 border border-teal-500/35 hover:border-teal-400 hover:bg-teal-900/60 transition-all duration-300 cursor-pointer rounded-sm shadow-xl shadow-teal-950/15"
          >
            <Compass className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>{language === 'id' ? 'Tur VR 360°' : '360° SITE VR TOUR'}</span>
          </button>
        </motion.div>

        {/* Airport Flight Simulation Floating Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="hidden md:flex justify-between items-center bg-brand-navy/60 border border-slate-800 rounded-sm p-3.5 max-w-sm mx-auto mt-16 text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-brand-gold/15 text-brand-gold">
              <PlaneTakeoff className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono tracking-wider text-brand-gold font-bold uppercase">
                {t('hero.bijb_badge_title')}
              </span>
              <span className="block text-[11px] font-sans text-slate-300 font-medium">
                {t('hero.bijb_badge_sub')}
              </span>
            </div>
          </div>
          <div className="text-right pl-3 border-l border-slate-800">
            <span className="block text-[10px] font-mono text-emerald-400 font-extrabold">
              {t('hero.bijb_badge_status')}
            </span>
            <span className="block text-[9px] font-mono text-slate-500 uppercase">
              {t('hero.bijb_badge_detail')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Elegant Fade on Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>

      {isVrOpen && <VrViewer isOpen={isVrOpen} onClose={() => setIsVrOpen(false)} />}
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Plane, Compass, Cpu, Leaf, Landmark, Sparkles, Building, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function IndustrialClusters() {
  const { language, t, industrialClusters } = useLanguage();
  const isIndo = language === 'id';
  const [activeClusterId, setActiveClusterId] = useState<string | null>(null);

  return (
    <section id="klaster" className="relative py-24 bg-[#001026] text-white overflow-hidden scroll-mt-14">
      {/* Abstract Grid Overlayer */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[#001F3F] bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {t('ic.caption')}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
            {t('ic.title')}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-semibold">
            {t('ic.description')}
          </p>
        </div>

        {/* 6 Grid representation board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industrialClusters.map((cl, idx) => {
            const isExpanded = activeClusterId === cl.id;
            
            return (
              <motion.div
                key={cl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#001A33] border border-slate-900/60 hover:border-brand-gold/40 rounded-none overflow-hidden shadow-2xl hover:shadow-brand-gold/5 group flex flex-col justify-between transition-all duration-300 relative font-sans"
              >
                {/* Cluster Visual Image Header */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001026] via-[#001026]/40 to-transparent z-10"></div>
                  <img
                    src={cl.image}
                    alt={cl.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Area Tag */}
                  <span className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#001F3F]/90 border border-brand-gold/30 rounded-none font-mono text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                    {cl.area}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-sans font-extrabold text-lg text-white group-hover:text-brand-gold transition-colors">
                      {cl.title}
                    </h3>
                    <span className="block text-[10px] font-mono text-brand-gold uppercase tracking-widest mt-1">
                      {cl.tagline}
                    </span>
                    <p className="mt-3.5 font-sans text-xs text-slate-300 leading-relaxed font-semibold">
                      {cl.description}
                    </p>
                  </div>

                  {/* Financial & Economic potential grid */}
                  <div className="grid grid-cols-2 gap-4 border-y border-slate-900 py-4 font-sans">
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase font-bold">
                        {isIndo ? 'Potensi Investasi' : 'Investment Potential'}
                      </span>
                      <strong className="block text-sm text-brand-gold mt-1 font-extrabold font-mono">{cl.investmentPotential}</strong>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase font-bold">
                        {isIndo ? 'Nilai Output Ekonomi' : 'Economic Output Value'}
                      </span>
                      <strong className="block text-sm text-white mt-1 font-extrabold font-mono">{cl.economicValue}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase font-bold">
                        {isIndo ? 'Serapan Angkatan Kerja' : 'Labor Absorption Potentials'}
                      </span>
                      <strong className="block text-xs text-slate-300 mt-1 font-bold">{cl.laborPotential}</strong>
                    </div>
                  </div>

                  {/* Bullet Spec Highlights */}
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2 font-extrabold">
                      {isIndo ? 'Spesifikasi Unggulan Klaster:' : 'Excellent Cluster Specifications:'}
                    </span>
                    <ul className="space-y-1.5">
                      {cl.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer Trigger */}
                <div className="p-4 border-t border-slate-900 bg-[#001026]/40 hover:bg-[#001026] transition-colors flex justify-between items-center text-xs font-bold uppercase tracking-widest font-mono">
                  <span className="text-slate-500 text-[10px] font-bold">
                    {isIndo ? 'Status: Siap DED Penyewa' : 'Status: Ready for Tenant DED'}
                  </span>
                  <button
                    onClick={() => {
                      const el = document.getElementById('investor-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-brand-gold hover:text-white flex items-center space-x-1 transition-colors capitalize"
                  >
                    <span>{isIndo ? 'Ajukan Booking' : 'Inquire Plots'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Users, ShieldAlert, Sparkles, CheckCircle, TrendingUp, Cpu, Landmark, ShieldCheck } from 'lucide-react';
import { ESGTheme } from '../types';

export default function EsgSustainability() {
  const { language } = useLanguage();
  const isIndo = language === 'id';
  const [activePillar, setActivePillar] = useState<'E' | 'S' | 'G'>('E');

  const esgThemes: ESGTheme[] = [
    {
      id: 'esg-env',
      pillar: 'E',
      title: isIndo ? 'Environmental Stewardship & Green Action' : 'Environmental Stewardship & Green Action',
      icon: 'Leaf',
      description: isIndo 
        ? 'Menargetkan operasional kawasan Net-Zero Carbon pada 2035 melalui pemanfaatan energi terbersih dan sirkularitas sumber daya.'
        : 'Targeting Net-Zero Carbon industrial operations by 2035 via green power integration and resource circularity.',
      metrics: isIndo ? [
        { label: 'Energi Terbarukan', value: '100 MW Surya Atap terpasang pada 2028' },
        { label: 'Efisiensi Air', value: '95% Pengolahan Air Limbah Terbaur (Circular Recycle)' },
        { label: 'Keanekaragaman Hayati', value: '120 Ha Green Buffer Zone & Eco-Park Konservasi' },
        { label: 'Zero Waste', value: 'Sertifikasi Zero Waste to Landfill untuk seluruh pabrik pelopor' },
      ] : [
        { label: 'Renewable Power', value: '100 MW Solar Roof capacity installed by 2028' },
        { label: 'Water Circularity', value: '95% Recycled industrial wastewater loop' },
        { label: 'Eco-Park Buffer', value: '120 Ha Green Buffer Zone & lake conservation' },
        { label: 'Zero Landfill Target', value: 'Zero Waste to Landfill global certification for core tenants' },
      ],
    },
    {
      id: 'esg-soc',
      pillar: 'S',
      title: isIndo ? 'Social Community Empowerment' : 'Empowering Local Communities',
      icon: 'Users',
      description: isIndo
        ? 'Menjamin kemajuan bersama dengan memberdayakan masyarakat 12 desa penyangga di sekitar Kertajati dan Majalengka.'
        : 'Fostering shared prosperity by uplifting the livelihoods of the 12 buffer villages surrounding Kertajati & Majalengka.',
      metrics: isIndo ? [
        { label: 'Pelatihan Kerja', value: 'KIIT Vocational Council melatih 5.000 pekerja lokal/tahun' },
        { label: 'Inklusi UMKM', value: 'Rp45 Miliar dana kemitraan bergulir bagi pengusaha daerah' },
        { label: 'Fasilitas Sosial', value: 'Pembangunan 3 Puskesmas modern & 5 Sekolah Kejuruan Aviasi' },
        { label: 'Standar Hidup', value: 'Rasio prioritas rekrutmen pekerja lokal di atas 75%' },
      ] : [
        { label: 'Vocational Training', value: 'KIIT Vocational Council to train 5,000 local laborers/year' },
        { label: 'Local SME Support', value: 'IDR 45B in revolving partnership funds for local enterprises' },
        { label: 'Community Infrastructures', value: 'Construction of 3 modern health clinics & 5 aerospace high schools' },
        { label: 'Regional Hiring Quota', value: 'Minimum regional priority hiring quota of over 75%' },
      ],
    },
    {
      id: 'esg-gov',
      pillar: 'G',
      title: isIndo ? 'Ethical Governance & Risk' : 'Ethical Governance & Corporate Integrity',
      icon: 'ShieldCheck',
      description: isIndo
        ? 'Menjunjung integritas kelas dunia melalui sistem perizinan satu pintu digital (OSS) tanpa gratifikasi dan berbasis tata kelola G20.'
        : 'Upholding global standards of integrity through transparent Online Single Submission (OSS) setups and G20 governance models.',
      metrics: isIndo ? [
        { label: 'Transparansi Korupsi', value: 'Sertifikasi ISO 37001 Sistem Manajemen Anti Penyuapan' },
        { label: 'Digital Hub OSS', value: 'Sistem perizinan transparan real-time 100% terekam online' },
        { label: 'Mitigasi Risiko', value: 'Sistem Kesiapsiagaan Krisis Bencana gempa dan banjir berskala 9.0 SR' },
        { label: 'Stabilitas Finansial', value: 'Audit dwi-bulanan berkala oleh 4 Kantor Akuntan Publik global (Big 4)' },
      ] : [
        { label: 'Anti-Bribery Standard', value: 'ISO 37001 Anti-Bribery Management System certified certification' },
        { label: 'OSS Single Portal', value: 'Single portal real-time automated transparent permit tracking' },
        { label: 'Crisis Resiliency', value: 'Disaster mitigation systems scaled to withstand 9.0 SR earthquakes/floods' },
        { label: 'Global Financial Audits', value: 'Regular bi-monthly audits overseen by reputable Big 4 global accounting firms' },
      ],
    },
  ];

  const activeTheme = esgThemes.find((t) => t.pillar === activePillar) || esgThemes[0];

  const getPillarGradient = (p: 'E' | 'S' | 'G') => {
    switch (p) {
      case 'E': return 'from-emerald-800 to-green-950 border-emerald-500/25';
      case 'S': return 'from-brand-navy to-slate-950 border-indigo-500/25';
      case 'G': return 'from-[#b45309] to-amber-950 border-amber-500/25';
    }
  };

  const getPillarIcon = (p: 'E' | 'S' | 'G') => {
    switch (p) {
      case 'E': return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'S': return <Users className="w-5 h-5 text-brand-gold" />;
      case 'G': return <ShieldCheck className="w-5 h-5 text-brand-gold" />;
    }
  };

  return (
    <section id="esg" className="relative py-24 bg-white overflow-hidden scroll-mt-14 border-y border-slate-100 font-sans">
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-[120px]"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-navy/5 rounded-full filter blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {isIndo ? 'KOMITMEN BERKELANJUTAN • ESG STANDARD' : 'COMMITMENT TO SUSTAINABILITY • ESG STANDARD'}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
            {isIndo ? 'Infrastruktur Hijau & Keberlanjutan KIIT' : 'Green Infrastructure & Global ESG Compliance'}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
            {isIndo 
              ? 'Menyelaraskan industrialisasi modern dengan pelestarian alam dan keadilan sosial, Kertajati International Industrial Town meletakkan pilar ESG sebagai roda utama tata kelola kota mandiri.'
              : 'Harmonizing high-tech industrial growth with biodiversity preservation and social equity, Kertajati International Industrial Town positions ESG parameters at the heart of our master development.'}
          </p>
        </div>

        {/* ESG Nav Toggles */}
        <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
          <button
            onClick={() => setActivePillar('E')}
            className={`px-6 py-4.5 rounded-none border font-sans font-extrabold text-xs tracking-wider uppercase transition-all flex items-center space-x-3 cursor-pointer ${
              activePillar === 'E'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-550/5'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Leaf className="w-4 h-4 shrink-0" />
            <span className="text-left">
              <span className="block text-[8px] font-mono font-bold text-slate-400">PILLAR E</span>
              <span>ENVIRONMENTAL</span>
            </span>
          </button>

          <button
            onClick={() => setActivePillar('S')}
            className={`px-6 py-4.5 rounded-none border font-sans font-extrabold text-xs tracking-wider uppercase transition-all flex items-center space-x-3 cursor-pointer ${
              activePillar === 'S'
                ? 'bg-brand-navy/10 border-brand-navy text-brand-navy shadow-lg shadow-indigo-500/5'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="text-left">
              <span className="block text-[8px] font-mono font-bold text-slate-400">PILLAR S</span>
              <span>SOCIAL COMMUNITY</span>
            </span>
          </button>

          <button
            onClick={() => setActivePillar('G')}
            className={`px-6 py-4.5 rounded-none border font-sans font-extrabold text-xs tracking-wider uppercase transition-all flex items-center space-x-3 cursor-pointer ${
              activePillar === 'G'
                ? 'bg-brand-gold/10 border-brand-gold text-brand-navy shadow-lg shadow-amber-500/5'
                : 'bg-slate-50 border-[#cbd5e1] text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-left">
              <span className="block text-[8px] font-mono font-bold text-slate-400">PILLAR G</span>
              <span>GOVERNANCE</span>
            </span>
          </button>
        </div>

        {/* Displaying Current Pillar Core Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Detailed metrics box - Left */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-slate-50 border border-slate-200 rounded-none p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between animate-fade-in">
                    <span className="px-2.5 py-1 bg-brand-navy border border-brand-navy text-brand-gold rounded-none font-mono text-[9px] font-bold uppercase tracking-wider">
                      {isIndo ? 'TERVERIFIKASI & AUDIT INTERNASIONAL' : 'VERIFIED & INTERNATIONALLY AUDITED'}
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                      {isIndo ? 'Standar GRI Index G20' : 'GRI Index G20 Global Standards'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-extrabold text-2xl text-brand-navy flex items-center space-x-2.5 leading-tight">
                      {getPillarIcon(activePillar)}
                      <span>{activeTheme.title}</span>
                    </h3>
                    <p className="mt-3.5 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
                      {activeTheme.description}
                    </p>
                  </div>

                  {/* Bullet specifics parameters */}
                  <div className="space-y-4 pt-4 border-t border-slate-200/60 font-sans">
                    <h4 className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                      {isIndo ? 'Target & Metrik Key Performance Indicators:' : 'Target & Key Performance Indicators:'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeTheme.metrics.map((m, i) => (
                        <div key={i} className="p-4 rounded-none bg-white border border-slate-200 shadow-sm flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                          <div>
                            <span className="block text-xs font-bold font-sans text-brand-navy">{m.label}</span>
                            <span className="block text-xs text-slate-500 mt-1 font-sans leading-relaxed font-semibold">{m.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Verified Badge footnote */}
              <div className="border-t border-slate-200 pt-6 mt-6 flex justify-between items-center text-xs">
                <div className="text-left font-sans">
                  <span className="block text-[9px] font-mono text-slate-400 uppercase leading-none font-bold">Oversight Body</span>
                  <strong className="text-slate-800 block mt-1 font-extrabold">SGS Environmental Services Inc.</strong>
                </div>
                <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-none px-2.5 py-1 font-mono text-[10px] font-bold">
                  ● RATING: ESG-EXCELLENT AA+
                </span>
              </div>

            </div>
          </div>

          {/* Visual Presentation side panel - Right */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-none bg-brand-navy border border-[#001026] p-6 sm:p-8 flex flex-col justify-between text-white shadow-2xl min-h-[350px]">
            <div className={`absolute inset-0 z-0 opacity-20 bg-gradient-to-br ${getPillarGradient(activePillar)}`}></div>
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            
            <div className="relative z-10 text-white">
              <span className="text-[10px] font-mono tracking-wider font-extrabold text-brand-gold uppercase">
                STRATEGIC ROADMAP FOR 2030
              </span>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 space-y-6"
                >
                  <h4 className="font-sans font-extrabold text-xl leading-tight text-white font-sans">
                    {activePillar === 'E' ? (isIndo ? 'Integrasi Eko-Energi & Net-Zero 120 Ha RTH' : 'Eco-Energy Integration & Net-Zero 120 Ha Eco-Park') :
                     activePillar === 'S' ? (isIndo ? 'Mendorong Kolaborasi Vokasional 12 Desa Adat' : 'Empowering Vocational Upskilling in 12 Buffer Villages') :
                     (isIndo ? 'ISO 37001 Pencegahan Suap Terintegrasi' : 'ISO 37001 Anti-Bribery Compliance Protocols')}
                  </h4>
                  <p className="text-xs text-slate-250 font-sans leading-relaxed font-semibold">
                    {activePillar === 'E' ? (
                      isIndo 
                        ? 'Seluruh atap pabrik pelopor di KIIT wajib menginstalasi panel photovoltaic surya guna mensubsidi penyerapan daya andal off-grid, menyuplai cadangan kelistrikan kawasan hijau mandiri.'
                        : 'All pioneer commercial facility rooftops in KIIT are mandated to install solar photovoltaic arrays onto their roof assets, generating clean off-grid energy to secure eco-power reserves.'
                    ) : activePillar === 'S' ? (
                      isIndo
                        ? 'KIIT mendirikan KIIT Vocational Training Center yang menyertifikasi angkatan kerja muda Majalengka agar langsung diserap sebagai operator presisi dan teknisi MRO berlisensi.'
                        : 'KIIT establishes the KIIT Vocational Training School, providing certified programs to Majalengka youth to directly absorb local talents as aerospace maintenance technicians and operators.'
                    ) : (
                      isIndo
                        ? 'Tata kelola keuangan diaudit rutin dwi-bulanan oleh lembaga akuntor terkemuka global Big Four demi menjaga transparansi alokasi dana investor lokal mapun konsorsium investor luar negeri.'
                        : 'Financial operations are audited every two months by a prominent Big Four global accounting firm to enforce absolute accounting clarity for domestic and international consortia.'
                    )}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Simulated timeline chart indicator */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded bg-white/5 border border-white/10 text-brand-gold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>{isIndo ? 'Target Realisasi: 100% (2030)' : 'Execution Target: 100% (2030)'}</span>
              </div>
              <span className="text-brand-gold font-bold uppercase text-[10px]">ROADMAP APPROVED</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

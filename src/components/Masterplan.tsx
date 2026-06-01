import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Layers, CheckCircle, Construction, TrendingUp } from 'lucide-react';

export default function Masterplan() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('manufaktur');
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const { masterplanZones, t, language } = useLanguage();

  const selectedZone = masterplanZones.find((z) => z.id === selectedZoneId) || masterplanZones[0];

  return (
    <section id="masterplan" className="relative py-24 bg-white overflow-hidden scroll-mt-14 border-b border-slate-200">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#001F3F_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Title Presentation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {t('mp.caption')}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
            {t('mp.title')}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
            {t('mp.description')}
          </p>
        </div>

        {/* Masterplan Panel: Left Map, Right Controller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SVG Map Section - spans 7 cols */}
          <div className="lg:col-span-7 bg-[#001026] border border-slate-900 rounded-none p-4 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[450px]">
            {/* Dark background matrix styling */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(212,175,55,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.07)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]"></div>
            
            {/* Map Controls metadata overlay */}
            <div className="flex items-center justify-between relative z-10 mb-4 border-b border-slate-900 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-brand-gold" />
                <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase font-bold">
                  INTEGRATED MASTERPLAN LAYOUT
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-bold">
                {language === 'id' ? 'Skala 1:15.000 (Vector Grid)' : 'Scale 1:15,000 (Vector Grid)'}
              </span>
            </div>

            {/* Main Interactive SVG Map */}
            <div className="relative flex-1 flex items-center justify-center my-4 z-10">
              <svg
                viewBox="0 0 800 500"
                className="w-full h-auto max-h-[400px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Roads / Infrastructure Lines */}
                <g opacity="0.45" stroke="#FFFFFF" strokeWidth="1" fill="none">
                  {/* Tol Cipali - Horizontal Bottom Road */}
                  <path d="M 10 410 C 200 410, 500 430, 790 440" stroke="#D4AF37" strokeWidth="3" strokeDasharray="10,5" />
                  
                  {/* Exit Tol Cipali connecting to Industrial Corridor */}
                  <path d="M 400 422 L 400 250 L 510 180" stroke="#E2E8F0" strokeWidth="2.5" />
                  
                  {/* Airport Runway Reference */}
                  <path d="M 50 40 L 400 40" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 400 40 C 450 40, 550 80, 680 120" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="5,5" />
                </g>

                {/* Airport label */}
                <g transform="translate(180, 25)" opacity="0.8">
                  <rect x="-80" y="-12" width="160" height="22" rx="0" fill="#001F3F" stroke="#60A5FA" strokeWidth="0.5" />
                  <text x="0" y="3" fill="#60A5FA" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    BIJB KERTAJATI RUNWAY
                  </text>
                </g>

                {/* Toll Cipali label */}
                <g transform="translate(160, 435)" opacity="0.8">
                  <text x="0" y="0" fill="#D4AF37" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    {language === 'id' ? 'JALAN TOL CIPALI >>' : 'CIPALI TOLL EXPRESSWAY >>'}
                  </text>
                </g>

                {/* Interactive Polygons / Sectors for KIIT */}
                {/* Zone 1: High Tech Manufaktur (350 Ha) */}
                <polygon
                  points="120,120 320,120 320,290 120,290"
                  fill={selectedZoneId === 'manufaktur' ? '#001E3D' : hoveredZoneId === 'manufaktur' ? '#002852' : '#040d1a'}
                  stroke={selectedZoneId === 'manufaktur' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'manufaktur' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('manufaktur')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('manufaktur')}
                />
                
                {/* Zone 2: Logistics Hub (200 Ha) */}
                <polygon
                  points="340,120 540,120 500,250 340,250"
                  fill={selectedZoneId === 'logistik' ? '#3B2F0F' : hoveredZoneId === 'logistik' ? '#544315' : '#140F03'}
                  stroke={selectedZoneId === 'logistik' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'logistik' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('logistik')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('logistik')}
                />

                {/* Zone 3: Aerospace & Aviation (100 Ha) */}
                <polygon
                  points="120,60 380,60 320,110 120,110"
                  fill={selectedZoneId === 'aerospace' ? '#0E2E5C' : hoveredZoneId === 'aerospace' ? '#144080' : '#061324'}
                  stroke={selectedZoneId === 'aerospace' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'aerospace' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('aerospace')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('aerospace')}
                />

                {/* Zone 4: EV Battery & Electric Vehicles (100 Ha) */}
                <polygon
                  points="120,300 260,300 260,390 120,390"
                  fill={selectedZoneId === 'ev' ? '#053123' : hoveredZoneId === 'ev' ? '#094d37' : '#01140e'}
                  stroke={selectedZoneId === 'ev' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'ev' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('ev')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('ev')}
                />

                {/* Zone 5: Agro industri (80 Ha) */}
                <polygon
                  points="270,300 400,300 400,360 270,390"
                  fill={selectedZoneId === 'agro' ? '#203E05' : hoveredZoneId === 'agro' ? '#32610A' : '#0B1402'}
                  stroke={selectedZoneId === 'agro' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'agro' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('agro')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('agro')}
                />

                {/* Zone 6: Komersial & Financial Center (70 Ha) */}
                <polygon
                  points="510,180 640,120 700,200 550,220"
                  fill={selectedZoneId === 'komersial' ? '#24143D' : hoveredZoneId === 'komersial' ? '#3C2166' : '#0D0817'}
                  stroke={selectedZoneId === 'komersial' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'komersial' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('komersial')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('komersial')}
                />

                {/* Zone 7: Hunian Green Resident (50 Ha) */}
                <polygon
                  points="550,230 700,210 740,290 580,310"
                  fill={selectedZoneId === 'hunian' ? '#4A0B2C' : hoveredZoneId === 'hunian' ? '#7A1249' : '#1A0410'}
                  stroke={selectedZoneId === 'hunian' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'hunian' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('hunian')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('hunian')}
                />

                {/* Zone 8: Ruang Terbuka Hijau & Eco-Park (120 Ha) */}
                <polygon
                  points="550,110 780,110 740,200 650,120"
                  fill={selectedZoneId === 'rth' ? '#043532' : hoveredZoneId === 'rth' ? '#08534E' : '#021817'}
                  stroke={selectedZoneId === 'rth' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'rth' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('rth')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('rth')}
                />

                {/* Zone 9: Fasilitas Umum & Support (30 Ha) */}
                <polygon
                  points="420,300 560,260 580,350 420,395"
                  fill={selectedZoneId === 'fasum' ? '#4D081B' : hoveredZoneId === 'fasum' ? '#7A0D2A' : '#1B0309'}
                  stroke={selectedZoneId === 'fasum' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZoneId === 'fasum' ? '2.5' : '1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredZoneId('fasum')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onClick={() => setSelectedZoneId('fasum')}
                />

                {/* SVGs Labels overlay mapping */}
                <text x="220" y="200" fill="#E2E8F0" fontSize="12" fontWeight="bold" textAnchor="middle" pointerEvents="none">MANUFAKTUR</text>
                <text x="220" y="215" fill="#D4AF37" fontSize="9" fontFamily="monospace" textAnchor="middle" pointerEvents="none">350 Ha</text>

                <text x="440" y="180" fill="#E2E8F0" fontSize="11" fontWeight="bold" textAnchor="middle" pointerEvents="none">LOGISTIK</text>
                <text x="440" y="195" fill="#D4AF37" fontSize="9" fontFamily="monospace" textAnchor="middle" pointerEvents="none">200 Ha</text>

                <text x="250" y="90" fill="#E2E8F0" fontSize="11" fontWeight="bold" textAnchor="middle" pointerEvents="none">AEROSPACE</text>
                <text x="250" y="102" fill="#D4AF37" fontSize="9" fontFamily="monospace" textAnchor="middle" pointerEvents="none">100 Ha</text>

                <text x="190" y="340" fill="#E2E8F0" fontSize="11" fontWeight="bold" textAnchor="middle" pointerEvents="none">EV INDUSTRY</text>
                <text x="190" y="352" fill="#D4AF37" fontSize="9" fontFamily="monospace" textAnchor="middle" pointerEvents="none">100 Ha</text>

                <text x="335" y="340" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">AGRO</text>
                <text x="335" y="352" fill="#D4AF37" fontSize="8" fontFamily="monospace" textAnchor="middle" pointerEvents="none">80 Ha</text>

                <text x="590" y="170" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">KOMERSIAL</text>
                <text x="590" y="182" fill="#D4AF37" fontSize="8" fontFamily="monospace" textAnchor="middle" pointerEvents="none">70 Ha</text>

                <text x="650" y="260" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">HUNIAN</text>
                <text x="650" y="272" fill="#D4AF37" fontSize="8" fontFamily="monospace" textAnchor="middle" pointerEvents="none">50 Ha</text>

                <text x="670" y="130" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">RTH ECO</text>
                <text x="670" y="142" fill="#D4AF37" fontSize="8" fontFamily="monospace" textAnchor="middle" pointerEvents="none">120 Ha</text>

                <text x="490" y="320" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">FASUM</text>
                <text x="490" y="332" fill="#D4AF37" fontSize="8" fontFamily="monospace" textAnchor="middle" pointerEvents="none">30 Ha</text>
              </svg>
            </div>

            {/* Instruction tooltip */}
            <div className="bg-[#001A33] border border-slate-900 rounded-none p-3 text-center text-xs text-slate-300 relative z-10 font-sans font-bold">
              <span className="text-brand-gold font-bold font-mono">
                {language === 'id' ? 'KLIK AREA INTERAKTIF:' : 'CLICK INTERACTIVE BLOCKS:'}
              </span>{' '}
              {language === 'id' 
                ? 'Klik secara langsung petak bidang spasial di atas untuk memperbarui data investor dan klaster penunjang spasial.'
                : 'Click directly on the spatial zoning plots above to update the structural investor dashboard.'}
            </div>
          </div>

          {/* Sizing description dashboard - spans 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-none flex-1 flex flex-col justify-between shadow-2xl">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedZone.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Zone Heading Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-brand-navy/10 border border-brand-navy/20 text-brand-navy rounded-none font-mono text-[9px] font-bold uppercase tracking-widest">
                      {language === 'id' ? 'SEKTOR' : 'ZONE'} {selectedZone.id.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1 font-mono text-xs text-slate-500 font-bold">
                      <Construction className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{language === 'id' ? 'Siap Konstruksi' : 'Ready for Construction'}</span>
                    </div>
                  </div>

                  {/* Zone Main Name */}
                  <div>
                    <h3 className="font-sans font-extrabold text-2xl text-brand-navy">
                      {selectedZone.name}
                    </h3>
                    <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
                      {selectedZone.description}
                    </p>
                  </div>

                  {/* Key Numerical Metrics Blocks */}
                  <div className="grid grid-cols-3 gap-3 border-y border-slate-200 py-4">
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                        {language === 'id' ? 'Luas Area' : 'Area Size'}
                      </span>
                      <span className="block text-lg font-extrabold font-sans text-brand-navy mt-1">
                        {selectedZone.area} Ha
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                        {language === 'id' ? 'Target Kapital' : 'Target Capital'}
                      </span>
                      <span className="block text-lg font-extrabold font-sans text-brand-gold mt-1">
                        Rp {selectedZone.investmentValue}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                        {language === 'id' ? 'Potensi Karir' : 'Career Job Potential'}
                      </span>
                      <span className="block text-lg font-extrabold font-sans text-brand-navy mt-1">
                        {selectedZone.laborPotential.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')} {language === 'id' ? 'Jiwa' : 'Pax'}
                      </span>
                    </div>
                  </div>

                  {/* Specialized Services Offered */}
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy tracking-wider uppercase mb-3 flex items-center space-x-1.5 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{t('mp.facilities_title')}</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedZone.facilities.map((fac, i) => (
                        <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-600 font-semibold" >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-650 mt-0.5 shrink-0" />
                          <span>{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Dynamic Invest action button */}
              <div className="border-t border-slate-200 pt-6 mt-6 flex justify-between items-center bg-transparent">
                <div className="text-left">
                  <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold">
                    Clean & Clear (C&C)
                  </span>
                  <span className="block text-xs font-extrabold text-emerald-500 font-sans">
                    {language === 'id' ? 'Sertifikasi Kementerian ATR' : 'ATR Ministry Land Certified'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('kontak');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-none bg-brand-navy hover:bg-brand-gold text-white hover:text-brand-navy text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                >
                  <span>{language === 'id' ? 'Ajukan Minat' : 'Inquire Segment'}</span>
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

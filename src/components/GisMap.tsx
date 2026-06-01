import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Layers, Eye, EyeOff, Radar, ShieldCheck } from 'lucide-react';

type MapMode = 'standard' | 'satellite' | 'dark';

interface GisLayer {
  id: string;
  label: string;
  active: boolean;
  color: string;
  description: string;
}

export default function GisMap() {
  const { language, t } = useLanguage();
  const isIndo = language === 'id';
  const [mapMode, setMapMode] = useState<MapMode>('satellite');
  
  // Layer list configuration
  const [layers, setLayers] = useState<GisLayer[]>([
    { id: 'batas_kawasan', label: '', active: true, color: '#D4AF37', description: '' },
    { id: 'batas_desa', label: '', active: true, color: '#94A3B8', description: '' },
    { id: 'jalan', label: '', active: true, color: '#F1F5F9', description: '' },
    { id: 'bandara_bijb', label: '', active: true, color: '#1E3A8A', description: '' },
    { id: 'tol_cipali', label: '', active: true, color: '#10b981', description: '' },
    { id: 'status_akuisisi', label: '', active: false, color: '#ef4444', description: '' },
  ]);

  // Effect to update labels/descriptions when language changes
  useEffect(() => {
    setLayers(prev => prev.map(l => {
      switch (l.id) {
        case 'batas_kawasan':
          return {
            ...l,
            label: isIndo ? 'Batas Kawasan KIIT (1.000 Ha)' : 'KIIT Boundary (1,000 Ha)',
            description: isIndo ? 'Garis perimeter kawasan industri inti.' : 'Core industrial perimeter line.'
          };
        case 'batas_desa':
          return {
            ...l,
            label: isIndo ? 'Batas Administrasi Desa Penyangga' : 'Buffer Villages Boundaries',
            description: isIndo ? 'Garis batas teritorial desa adat Kec. Kertajati.' : 'Ancestral boundary lines of Kertajati villages.'
          };
        case 'jalan':
          return {
            ...l,
            label: isIndo ? 'Infrastruktur Jalan Raya Koridor' : 'Corridor Road Networks',
            description: isIndo ? 'Jaringan jalan utama lebar 60m ROW dalam kawasan.' : 'Main internal 60m ROW corridor routes.'
          };
        case 'bandara_bijb':
          return {
            ...l,
            label: isIndo ? 'Kompleks Cargo Bandara Kertajati' : 'Kertajati Cargo Airport Hub',
            description: isIndo ? 'Garis perimeter & runway BIJB.' : 'BIJB airport perimeters & main runway.'
          };
        case 'tol_cipali':
          return {
            ...l,
            label: isIndo ? 'Akses Langsung Gerbang Tol Cipali' : 'Cipali Toll Direct Entry Way',
            description: isIndo ? 'Jalur koneksi jalan bebas hambatan Jakarta-Cirebon.' : 'Inter-city Jakarta-Cirebon highway connection.'
          };
        case 'status_akuisisi':
          return {
            ...l,
            label: isIndo ? 'Heatmap Status Pembebasan Tanah' : 'Acquisition Status Heatmap',
            description: isIndo ? 'Visualisasi warna wilayah yang telah dibayar lunas.' : 'Color heatmap of fully settled land certificates.'
          };
        default:
          return l;
      }
    }));
  }, [isIndo]);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const isLayerActive = (id: string) => {
    return layers.find(l => l.id === id)?.active || false;
  };

  // Switch map coloring based on selected mode
  const getMapColors = () => {
    switch (mapMode) {
      case 'standard':
        return {
          bg: 'bg-[#F8FAFC]',
          grid: 'stroke-slate-200',
          baseRiver: 'fill-sky-100',
          baseZoning: 'fill-slate-100',
          textTitle: 'text-slate-900',
          textSub: 'text-slate-500',
          panelBg: 'bg-white border-slate-200 text-slate-800'
        };
      case 'dark':
        return {
          bg: 'bg-[#030712]',
          grid: 'stroke-slate-900',
          baseRiver: 'fill-blue-950/20',
          baseZoning: 'fill-slate-950',
          textTitle: 'text-white',
          textSub: 'text-slate-400',
          panelBg: 'bg-[#001026] border-slate-900 text-white shadow-2xl'
        };
      case 'satellite':
      default:
        // High tech cybernetic blueprint look
        return {
          bg: 'bg-[#050C16]',
          grid: 'stroke-amber-500/10',
          baseRiver: 'fill-blue-900/15',
          baseZoning: 'fill-slate-900/40',
          textTitle: 'text-white',
          textSub: 'text-slate-300',
          panelBg: 'bg-[#001A33]/90 border-slate-900 text-white shadow-2xl animate-fade-in'
        };
    }
  };

  const c = getMapColors();

  return (
    <section id="gis" className="relative py-24 bg-slate-50 overflow-hidden text-slate-950 scroll-mt-14 border-y border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {t('gis.caption')}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none animate-fade-in">
            {t('gis.title')}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
            {t('gis.description')}
          </p>
        </div>

        {/* GIS Frame layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main GIS Map Panel Grid - 8 columns */}
          <div className="lg:col-span-12 xl:col-span-8 flex flex-col justify-between relative overflow-hidden rounded-none border border-slate-300 shadow-2xl h-[520px] transition-colors duration-300">
            {/* Embedded interactive background based on active theme */}
            <div className={`absolute inset-0 z-0 ${c.bg} transition-colors duration-300`}></div>
            
            {/* Tech grid mesh overlay */}
            <div className="absolute inset-0 z-0 opacity-25">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="gisPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" className={`${c.grid} stroke-1`} />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gisPattern)" />
              </svg>
            </div>

            {/* Radar Sweeps on Satellite view */}
            {mapMode === 'satellite' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
                <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] border border-blue-500/20 rounded-full animate-ping"></div>
                <div className="absolute top-1/4 left-1/3 w-[150px] h-[150px] border border-blue-500/10 rounded-full"></div>
                <div className="absolute top-1/4 left-1/3 w-0.5 h-40 bg-gradient-to-b from-blue-500 to-transparent origin-top rotate-45 transform animate-spin duration-10000"></div>
              </div>
            )}

            {/* GIS Map Header HUD overlay */}
            <div className="p-4 bg-slate-950/80 backdrop-blur border-b border-white/5 relative z-10 text-white flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2 font-bold select-none">
                <Radar className="w-4 h-4 text-brand-gold animate-spin" />
                <span className="font-mono tracking-widest text-brand-gold">{t('gis.hud_title')}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setMapMode('standard')}
                  className={`px-2.5 py-1 rounded-none font-mono text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                    mapMode === 'standard' ? 'bg-brand-gold text-slate-950' : 'bg-white/5 hover:bg-white/10 text-slate-350'
                  }`}
                >
                  {t('gis.btn_standard')}
                </button>
                <button
                  onClick={() => setMapMode('dark')}
                  className={`px-2.5 py-1 rounded-none font-mono text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                    mapMode === 'dark' ? 'bg-brand-gold text-slate-950' : 'bg-white/5 hover:bg-white/10 text-slate-355'
                  }`}
                >
                  {t('gis.btn_dark')}
                </button>
                <button
                  onClick={() => setMapMode('satellite')}
                  className={`px-2.5 py-1 rounded-none font-mono text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                    mapMode === 'satellite' ? 'bg-brand-gold text-slate-950' : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {t('gis.btn_satellite')}
                </button>
              </div>
            </div>

            {/* Simulated Vector GIS Map */}
            <div className="flex-1 relative z-10 p-6 flex items-center justify-center">
              <svg viewBox="0 0 800 450" className="w-full h-full">
                
                {/* Simulated Cimanuk river bed */}
                <path d="M -50 250 C 200 280, 500 180, 850 140" stroke="#001F3F" strokeWidth="8" fill="none" opacity={mapMode === 'standard' ? 0.35 : 0.2} strokeLinecap="round" />
                
                {/* 1. LAYER: BATAS DESA ADMIN (Gray polygon overlays) */}
                {isLayerActive('batas_desa') && (
                  <g opacity="0.32" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4,4" fill="none">
                    {/* Desa Sukawana Boundary */}
                    <polygon points="50,40 380,40 320,190 50,190" />
                    {/* Desa Babakan Boundary */}
                    <polygon points="390,40 760,40 720,190 330,190" />
                    {/* Desa Kertajati Boundary */}
                    <polygon points="50,200 280,200 240,350 50,350" />
                    {/* Desa Mekarjaya Boundary */}
                    <polygon points="290,200 760,200 710,350 250,350" />
                  </g>
                )}

                {/* 2. LAYER: STATUS PEMBEBASAN HEATMAP */}
                {isLayerActive('status_akuisisi') && (
                  <g opacity="0.3" stroke="none">
                    {/* Green indicates fully paid acquired zones */}
                    <polygon points="120,80 320,80 320,250 120,250" fill="#10b981" />
                    <polygon points="340,80 500,80 430,220 340,220" fill="#10b981" />
                    {/* Red/Yellow indicates negotiation or unprocessed */}
                    <polygon points="510,80 730,80 630,220 440,220" fill="#D4AF37" />
                    <polygon points="120,260 250,260 250,340 120,340" fill="#ef4444" />
                  </g>
                )}

                {/* 3. LAYER: COMPLEX BANDARA KERTAJATI */}
                {isLayerActive('bandara_bijb') && (
                  <g>
                    {/* BIJB boundaries */}
                    <polygon points="110,15 480,15 450,75 110,75" fill={mapMode === 'standard' ? '#93C5FD' : '#001F3F'} fillOpacity="0.45" stroke="#3B82F6" strokeWidth="1.5" />
                    {/* BIJB Runway Line */}
                    <line x1="140" y1="45" x2="440" y2="45" stroke="#FFF" strokeWidth="4.5" strokeLinecap="round" />
                    <line x1="140" y1="45" x2="440" y2="45" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,2" />
                    {/* Runway label */}
                    <text x="290" y="38" fill="#FFF" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {isIndo ? 'RUNWAY BIJB KERTAJATI' : 'BIJB KERTAJATI CARGO RUNWAY'}
                    </text>
                  </g>
                )}

                {/* 4. LAYER: BATAS KAWASAN KIIT BOUNDARY */}
                {isLayerActive('batas_kawasan') && (
                  <g>
                    {/* Main perimeter boundary */}
                    <polygon
                      points="120,80 730,80 630,340 120,340"
                      fill={mapMode === 'standard' ? '#FEF3C7' : '#D4AF37'}
                      fillOpacity="0.15"
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                      strokeDasharray={mapMode === 'satellite' ? '7,4' : 'none'}
                    />
                    <text x="380" y="330" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {isIndo
                        ? 'ZONA INTI KERTAJATI INTERNATIONAL INDUSTRIAL TOWN (KIIT) 1.000 HA'
                        : 'KIIT CORE INDUSTRIAL ZONE (1,000 HECTARES)'}
                    </text>
                  </g>
                )}

                {/* 5. LAYER: TOL CIPALI DIRECT ENTRY */}
                {isLayerActive('tol_cipali') && (
                  <g>
                    {/* Tol Cipali Main Line */}
                    <path d="M 10,400 C 200,400 500,410 790,420" stroke="#10b981" strokeWidth="4.5" fill="none" />
                    {/* Tol Signage */}
                    <rect x="220" y="387" width="140" height="15" rx="0" fill="#064E3B" stroke="#10B981" strokeWidth="0.5" />
                    <text x="290" y="398" fill="#FFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                      {isIndo ? 'JALAN TOL TRANS JAWA (CIPALI)' : 'TRANS-JAVA CIPALI TOLL ROAD'}
                    </text>
                  </g>
                )}

                {/* 6. LAYER: ROADS NETWORK */}
                {isLayerActive('jalan') && (
                  <g stroke="#94A3B8" strokeWidth="2.5" opacity="0.8">
                    {/* Inter-highway connecting Toll to Airport through industrial complex */}
                    <line x1="390" y1="404" x2="390" y2="120" />
                    <line x1="390" y1="120" x2="300" y2="45" /> {/* straight airport ramp */}
                    {/* Main internal arteries grids */}
                    <line x1="120" y1="200" x2="710" y2="200" />
                    <line x1="250" y1="80" x2="250" y2="340" />
                    <line x1="560" y1="80" x2="560" y2="340" />
                  </g>
                )}

                {/* Floating GPS coordinates overlay pins */}
                <g transform="translate(390, 200)">
                  <circle cx="0" cy="0" r="5" fill="#D4AF37" className="animate-pulse" />
                  <circle cx="0" cy="0" r="1.5" fill="#FFF" />
                  <text x="10" y="4" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="monospace">KIIT HUB CORE</text>
                </g>

                <g transform="translate(390, 404)">
                  <rect x="-42" y="-14" width="84" height="12" rx="0" fill="#0F172A" stroke="#10B981" strokeWidth="0.5" />
                  <text x="0" y="-5" fill="#10B981" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    {isIndo ? 'SIMPANG SUSUN TOL' : 'TOLL INTERCHANGE'}
                  </text>
                </g>

              </svg>
            </div>

            {/* GIS Footer telemetry */}
            <div className="p-3 bg-slate-950/80 border-t border-white/5 relative z-10 text-[9px] font-mono text-slate-500 flex justify-between uppercase select-none font-bold">
              <span>Sat: GEOLITE-WJ2 • CALIBRATION: OK</span>
              <span>GPS SECURE COOP: -6° 39' 3.0" S - 108° 10' 22.4" E</span>
            </div>

          </div>

          {/* GIS Interactive Layers Panel Controller - 4 columns */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col justify-between">
            <div className={`p-6 sm:p-8 rounded-none border flex-1 flex flex-col justify-between ${c.panelBg} transition-colors duration-300 shadow-2xl`}>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                  <Layers className="w-5 h-5 text-brand-gold" />
                  <h3 className="font-sans font-bold text-sm tracking-widest uppercase">
                    {t('gis.controller_title')}
                  </h3>
                </div>

                <p className="font-sans text-xs text-slate-300 leading-relaxed font-semibold">
                  {t('gis.controller_desc')}
                </p>

                {/* Checklist options */}
                <div className="space-y-3">
                  {layers.map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => toggleLayer(layer.id)}
                      className={`w-full p-3 rounded-none border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        layer.active
                          ? 'bg-[#001F3F]/80 border-brand-gold text-white shadow-none'
                          : 'bg-black/25 border-slate-900 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-3 pr-2">
                        <div className="mt-0.5 shrink-0">
                          {layer.active ? (
                            <div className="p-0.5 bg-brand-gold rounded-none text-slate-950">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="p-0.5 bg-white/5 rounded-none text-slate-500">
                              <EyeOff className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="block text-xs font-extrabold leading-normal font-sans">
                            {layer.label}
                          </span>
                          <span className="block text-[10px] text-slate-500 mt-0.5 font-sans leading-none font-bold">
                            {layer.description}
                          </span>
                        </div>
                      </div>
                      
                      {/* Swatch color bubble */}
                      <span className="w-2.5 h-2.5 rounded-none shrink-0" style={{ backgroundColor: layer.color }}></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* GIS status validation */}
              <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center text-xs font-mono font-bold font-semibold">
                <div className="text-left font-sans">
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">{t('gis.source_label')}</span>
                  <strong className="text-white block font-extrabold">{t('gis.source_val')}</strong>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400 font-extrabold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{t('gis.verify_status')}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

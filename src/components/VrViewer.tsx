import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, Compass, Eye, ShieldAlert, Radio, Landmark, PlaneTakeoff, 
  Sun, BatteryCharging, Power, Activity, ListFilter, HelpCircle, ToggleLeft, ToggleRight
} from 'lucide-react';

interface VrViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Hotspot {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  x: number; // position on our 2400px wide track
  y: number; // vertical position (from 0 to 400)
  icon: React.ElementType;
  meta: string;
}

interface Viewpoint {
  id: string;
  nameId: string;
  nameEn: string;
  lat: string;
  lon: string;
  altitude: string;
  skyColor: string;
  gridColor: string;
}

export default function VrViewer({ isOpen, onClose }: VrViewerProps) {
  const { language } = useLanguage();
  const isIndo = language === 'id';

  // Configurable Viewpoints representing positions in KIIT site
  const viewpoints: Viewpoint[] = [
    {
      id: 'core_tower',
      nameId: 'Kertajati Core Tower (Altitude: 45m)',
      nameEn: 'Kertajati Core Tower (Altitude: 45m)',
      lat: '-6.6508',
      lon: '108.1729',
      altitude: '45m MDPL',
      skyColor: 'from-[#000d21] via-[#001738] to-[#002456]',
      gridColor: 'rgba(212, 175, 55, 0.1)',
    },
    {
      id: 'runway_deck',
      nameId: 'BIJB Skydeck Aviasi (Altitude: 12m)',
      nameEn: 'BIJB Aviation Skydeck (Altitude: 12m)',
      lat: '-6.6450',
      lon: '108.1680',
      altitude: '12m MDPL',
      skyColor: 'from-[#010915] via-[#041d3d] to-[#001128]',
      gridColor: 'rgba(56, 189, 248, 0.1)',
    },
    {
      id: 'eco_park',
      nameId: 'Puncak Bukit Eco Park (Altitude: 30m)',
      nameEn: 'Eco Park Ridge Peak (Altitude: 30m)',
      lat: '-6.6560',
      lon: '108.1810',
      altitude: '30m MDPL',
      skyColor: 'from-[#020d0f] via-[#052b30] to-[#011417]',
      gridColor: 'rgba(16, 185, 129, 0.1)',
    }
  ];

  const [activeViewpoint, setActiveViewpoint] = useState<Viewpoint>(viewpoints[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [infoPaneOpen, setInfoPaneOpen] = useState<boolean>(true);

  // Tracks horizontal drag value
  const dragX = useMotionValue(-800); // start panned to middle
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1000);

  // Dynamically size container width for perfect drag boundaries
  useEffect(() => {
    if (!isOpen) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isOpen]);

  // Wide dimensions
  const panoramaWidth = 2400;
  const maxDrag = 0;
  const minDrag = -(panoramaWidth - containerWidth);

  // Auto rotation scheduler
  useEffect(() => {
    if (!isOpen || !isAutoRotate) return;
    
    let animationFrameId: number;
    const rotate = () => {
      const current = dragX.get();
      let next = current - 0.75; // Rotate right
      if (next < minDrag) {
        next = maxDrag; // Loop around
      }
      dragX.set(next);
      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen, isAutoRotate, minDrag, dragX]);

  // Handle user interaction: turn off auto rotation on drag, and stop on pointer down
  const handleDragStart = () => {
    setIsAutoRotate(false);
  };

  // Convert current dragX position to current Compass Heading/Bearing (0 - 360)
  const [bearing, setBearing] = useState<number>(0);
  useEffect(() => {
    const handleValueChange = (latestX: number) => {
      const percentage = Math.abs(latestX) / (panoramaWidth - containerWidth || 1);
      const calculatedHeading = Math.floor(percentage * 360);
      setBearing(calculatedHeading);
    };

    const unsubscribe = dragX.on("change", handleValueChange);
    return () => unsubscribe();
  }, [dragX, containerWidth]);

  // Hotspots scattered along the horizon of the scene (X: 0 to 2400, Y: 100 to 280)
  const hotspots: Hotspot[] = [
    {
      id: 'bijb_airport',
      nameId: 'Bandara Internasional Kertajati (BIJB)',
      nameEn: 'Kertajati International Airport (BIJB)',
      descId: 'Hub transportasi udara utama Jawa Barat yang terhubung langsung dengan koridor industri KIIT untuk kargo logistik instan global.',
      descEn: 'West Java\'s premier aviation hub connected directly to KIIT industrial corridor for immediate global cargo logistics.',
      x: 180,
      y: 160,
      icon: PlaneTakeoff,
      meta: 'BIJB | Altitude: 12m'
    },
    {
      id: 'solar_power',
      nameId: 'Stasiun Panel Surya KIIT 120 MW',
      nameEn: 'KIIT 120 MW Solar Power Smart Station',
      descId: 'Ladang pembangkit listrik tenaga surya mutakhir guna menyuplai 100% energi terbarukan bagi klaster data center dan industri manufaktur berat.',
      descEn: 'State-of-the-art photovoltaic generator supply grid to power 100% renewable energy for data centers and high-load manufacturers.',
      x: 580,
      y: 190,
      icon: Sun,
      meta: 'Eco Energy | 120 MW'
    },
    {
      id: 'interchange_cipali',
      nameId: 'Gerbang Tol Utama KIIT-Cipali',
      nameEn: 'KIIT-Cipali Expressway Toll Gate Interchange',
      descId: 'Interkoneksi infrastruktur jalan tol primer yang memangkas waktu pengiriman kargo darat langsung menuju pelabuhan Patimban dan Tanjung Priok secara mulus.',
      descEn: 'Primary toll road infrastructure interconnection shrinking land logistics duration towards Patimban Deep Seaport and Jakarta Port.',
      x: 1050,
      y: 220,
      icon: Landmark,
      meta: 'KM 158 Toll-Gate Interchange'
    },
    {
      id: 'ev_gigafactory',
      nameId: 'Giga-Pabrik & Sel Baterai EV',
      nameEn: 'EV Battery Cells Gigafactory',
      descId: 'Fasilitas manufaktur canggih sel baterai litium terintegrasi dengan kapasitas tahunan skala besar untuk mobilitas ramah lingkungan masa depan.',
      descEn: 'Integrating automated smart battery cell lines with ultra-large annual gigawatt capabilities supporting next-generation eco mobility.',
      x: 1550,
      y: 180,
      icon: BatteryCharging,
      meta: 'EV Cluster | Net Zero'
    },
    {
      id: 'logistics_hub',
      nameId: 'Klaster Logistik & Pergudangan Pintar',
      nameEn: 'Smart Warehousing & Logistics Complex',
      descId: 'Pusat pergudangan multi-tier otomatis yang dilengkapi dengan sistem sortir AI, robotika AGV, dan pemantauan satelit real-time.',
      descEn: 'Advanced multi-tier storage facility operated with AI routing, laser-guided automated vehicles (AGV), and active telemetry.',
      x: 2020,
      y: 150,
      icon: Radio,
      meta: 'Tier-A Logistic | 200 Ha'
    }
  ];

  if (!isOpen) return null;

  const activeHotspots = hotspots.filter(h => {
    // Customize positioning slightly based on viewpoint for dynamic feel
    if (activeViewpoint.id === 'runway_deck') return h.id !== 'eco_park';
    if (activeViewpoint.id === 'eco_park') return h.id !== 'bijb_airport';
    return true;
  });

  return (
    <div id="vr-panoramic-overlay" className="fixed inset-0 z-50 flex flex-col bg-slate-950/98 text-white backdrop-blur-md overflow-hidden">
      
      {/* Top Header Controls / Telemetry */}
      <div id="vr-header" className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-8 py-4 border-b border-white/10 bg-slate-950/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold animate-pulse">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-xs md:text-sm tracking-wider text-brand-gold uppercase">
              {isIndo ? 'SIMULASI VR PANORAMA 360° KIIT' : 'KIIT 360° PANORAMIC VR EXPERIENCE'}
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-slate-400">
              {isIndo ? 'Sudut Pandang Operasional Real-Time' : 'Interactive Multi-Angle Viewpoint Telemetry'}
            </p>
          </div>
        </div>

        {/* Viewpoints Quick Selector */}
        <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1.5">
            <ListFilter className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
              {isIndo ? 'Lokasi Kam:' : 'Cam Origin:'}
            </span>
          </div>

          {viewpoints.map((vp) => {
            const isSel = activeViewpoint.id === vp.id;
            return (
              <button
                key={vp.id}
                onClick={() => {
                  setActiveViewpoint(vp);
                  setSelectedHotspot(null);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider border cursor-pointer transition-all ${
                  isSel 
                    ? 'bg-brand-gold border-brand-gold text-brand-navy font-bold' 
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>{isIndo ? vp.nameId.split(' (')[0] : vp.nameEn.split(' (')[0]}</span>
              </button>
            );
          })}

          <button 
            onClick={onClose}
            className="ml-2 md:ml-4 p-2 bg-slate-950/90 border border-slate-800 hover:border-slate-500 hover:text-red-400 transition-all rounded-sm cursor-pointer"
            title={isIndo ? 'Tutup VR' : 'Close VR'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Interactive Main Body Box */}
      <div className="flex-1 relative flex flex-col md:flex-row h-full min-h-0 overflow-hidden">
        
        {/* VR HUD Controls Column sidebar on Left */}
        <div id="vr-sidebar" className="w-full md:w-80 border-r border-white/10 bg-slate-950/70 p-4 md:p-6 flex flex-col space-y-4 md:space-y-6 overflow-y-auto relative z-10">
          
          {/* Main Info Frame */}
          <div className="border border-white/10 bg-white/[0.02] p-4 relative">
            <div className="absolute top-0 right-0 p-1">
              <Activity className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            </div>
            
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
              {isIndo ? 'POSISI KAMERAMENT' : 'CAMERA MOUNT COORDS'}
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">LATITUDE</span>
                <span className="text-white font-semibold">{activeViewpoint.lat} S</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">LONGITUDE</span>
                <span className="text-white font-semibold">{activeViewpoint.lon} E</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">ALTITUDE</span>
                <span className="text-brand-gold font-bold">{activeViewpoint.altitude}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BEARING</span>
                <span className="text-sky-400 font-extrabold">{bearing}° {bearing >= 337.5 || bearing < 22.5 ? 'N' : bearing >= 22.5 && bearing < 67.5 ? 'NE' : bearing >= 67.5 && bearing < 112.5 ? 'E' : bearing >= 112.5 && bearing < 157.5 ? 'SE' : bearing >= 157.5 && bearing < 202.5 ? 'S' : bearing >= 202.5 && bearing < 247.5 ? 'SW' : bearing >= 247.5 && bearing < 292.5 ? 'W' : 'NW'}</span>
              </div>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              {isIndo ? 'KONTROL SIMULASI' : 'SIMULATION MODE'}
            </h4>
            
            {/* Auto rotate switch */}
            <div className="flex items-center justify-between bg-white/[0.02] border border-white/10 px-3.5 py-3">
              <div className="flex items-center space-x-2">
                <Compass className={`w-4 h-4 text-brand-gold ${isAutoRotate ? 'animate-spin' : ''}`} />
                <span className="text-xs font-sans font-medium text-slate-200">
                  {isIndo ? 'Putar Otomatis' : 'Auto 360° Rotation'}
                </span>
              </div>
              <button 
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className="text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                {isAutoRotate ? (
                  <ToggleRight className="w-8 h-8 text-brand-gold" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-500" />
                )}
              </button>
            </div>

            {/* View Instructions */}
            <div className="bg-slate-900/60 p-3.5 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-sans space-y-2">
              <div className="flex items-start space-x-1.5 text-brand-gold">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <strong className="uppercase font-mono text-[9px] tracking-wider">
                  {isIndo ? 'Petunjuk Navigasi' : 'Viewer Instructions'}
                </strong>
              </div>
              <p>
                {isIndo 
                  ? 'Klik dan seret (drag) jendela panorama ke kiri atau kanan untuk memutar kamera 360 derajat secara manual.'
                  : 'Click and drag the panoramic viewport left or right to manually rotate the viewpoint 360 degrees.'
                }
              </p>
              <p>
                {isIndo
                  ? 'Klik tombol silang berkedip (+) untuk melihat detail proyeksi industri di kawasan terkait.'
                  : 'Click the blinking target hotpins (+) along the horizon to inspect key infrastructure planning data.'
                }
              </p>
            </div>
          </div>

          {/* Connected Hub status */}
          <div className="mt-auto border-t border-white/10 pt-4 text-[10px] font-mono text-slate-500 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-500">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>GPS FEED: STABLE</span>
            </div>
            <div>STATION: MEKARJAYA CORE_NODE</div>
            <div className="text-[9px] text-slate-600">KIIT 2026 ENG-DEV BUILD</div>
          </div>
        </div>

        {/* Dynamic Panoramic Visualizer viewport on Right */}
        <div id="vr-panorama-stage" className="flex-1 relative bg-slate-950 flex flex-col justify-between overflow-hidden">
          
          {/* Compass Strip HUD on top of panorama */}
          <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-slate-950/95 to-slate-950/0 py-4 px-6 z-10 flex flex-col items-center">
            
            {/* Real scale Compass Ruler display indicator */}
            <div className="w-full max-w-xl overflow-hidden relative opacity-90 border-b border-brand-gold/20 pb-1.5">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
              
              {/* Central viewing ticker line */}
              <div className="absolute left-1/2 -bottom-1 w-[2px] h-3 bg-brand-gold z-20"></div>

              {/* Slider rule aligned to bearing */}
              <motion.div 
                className="flex font-mono text-[9px] tracking-widest text-slate-500 justify-between items-center whitespace-nowrap select-none"
                style={{
                  width: '720px',
                  // shift scale horizontally matched to current bearing (0 to 360 deg)
                  transform: `translateX(calc(50% - ${bearing * 2}px))`,
                }}
              >
                <span>N [0°]</span>
                <span className="text-slate-600">|</span>
                <span>NE [45°]</span>
                <span className="text-slate-600">|</span>
                <span>E [90°]</span>
                <span className="text-slate-600">|</span>
                <span>SE [135°]</span>
                <span className="text-slate-600">|</span>
                <span>S [180°]</span>
                <span className="text-slate-600">|</span>
                <span>SW [225°]</span>
                <span className="text-slate-600">|</span>
                <span>W [270°]</span>
                <span className="text-slate-600">|</span>
                <span>NW [315°]</span>
                <span className="text-slate-600">|</span>
                <span>N [360°]</span>
              </motion.div>
            </div>
            
            {/* Heading coordinates value tag */}
            <div className="mt-1 flex items-center space-x-1 bg-brand-gold/15 border border-brand-gold/20 px-2.5 py-0.5 text-[9px] font-mono text-brand-gold">
              <Compass className="w-3 h-3 animate-pulse" />
              <span>BEARING: {bearing}°</span>
              <span className="opacity-40">|</span>
              <span>{activeViewpoint.id.toUpperCase()}</span>
            </div>
          </div>

          {/* Interactive Drag Horizon Draggable Board */}
          <div 
            ref={containerRef}
            className="flex-1 w-full flex items-center relative cursor-move select-none overflow-hidden"
          >
            {/* Draggable container wraps panorama SVG */}
            <motion.div
              drag="x"
              dragConstraints={{ left: minDrag, right: maxDrag }}
              onDragStart={handleDragStart}
              style={{ x: dragX }}
              className="absolute left-0 h-[400px] w-[2400px]"
            >
              <div className="relative w-full h-full overflow-hidden">
                
                {/* SVG Landscape Simulation Vector */}
                <svg
                  viewBox="0 0 2400 400"
                  width="2400"
                  height="400"
                  className="w-full h-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sky background layer gradient */}
                  <defs>
                    <linearGradient id="vrSkyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" className="stop-color-sky" stopColor={activeViewpoint.id === 'runway_deck' ? '#010f21' : activeViewpoint.id === 'eco_park' ? '#01151a' : '#010c1c'} />
                      <stop offset="60%" className="stop-color-sky-mid" stopColor={activeViewpoint.id === 'runway_deck' ? '#061a35' : activeViewpoint.id === 'eco_park' ? '#052c33' : '#041c42'} />
                      <stop offset="100%" className="stop-color-horizon" stopColor="#000712" />
                    </linearGradient>

                    {/* Gradient nodes */}
                    <radialGradient id="hubTowerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                    </radialGradient>
                  </defs>

                  {/* Backdrop sky canvas */}
                  <rect width="2400" height="400" fill="url(#vrSkyGradient)" />

                  {/* Constellation star grid elements scattered randomly */}
                  <g color="#FFF" opacity="0.15">
                    <circle cx="50" cy="50" r="0.75" fill="#FFF" />
                    <circle cx="150" cy="90" r="1.25" fill="#FFF" />
                    <circle cx="280" cy="40" r="1" fill="#FFF" />
                    <circle cx="410" cy="110" r="0.5" fill="#FFF" />
                    <circle cx="530" cy="30" r="1.5" fill="#FFF" />
                    <circle cx="670" cy="70" r="0.8" fill="#FFF" />
                    <circle cx="820" cy="120" r="1" fill="#FFF" />
                    <circle cx="950" cy="45" r="0.6" fill="#FFF" />
                    <circle cx="1120" cy="85" r="1.3" fill="#FFF" />
                    <circle cx="1290" cy="65" r="1" fill="#FFF" />
                    <circle cx="1410" cy="105" r="0.8" fill="#FFF" />
                    <circle cx="1550" cy="35" r="1.5" fill="#FFF" />
                    <circle cx="1780" cy="60" r="0.8" fill="#FFF" />
                    <circle cx="1920" cy="115" r="1.2" fill="#FFF" />
                    <circle cx="2040" cy="40" r="0.6" fill="#FFF" />
                    <circle cx="2180" cy="95" r="1.3" fill="#FFF" />
                    <circle cx="2310" cy="70" r="0.9" fill="#FFF text-white" />
                  </g>

                  {/* Tech Calibration Grid guidelines */}
                  <g opacity="0.03" stroke="#FFF" strokeWidth="0.5">
                    <line x1="0" y1="100" x2="2400" y2="100" />
                    <line x1="0" y1="200" x2="2400" y2="200" />
                    <line x1="0" y1="300" x2="2400" y2="300" />
                    {/* Vertical calibration lines representing angles */}
                    {Array.from({ length: 24 }).map((_, i) => (
                      <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="400" strokeDasharray="3,3" />
                    ))}
                  </g>

                  {/* FAR DISTANCE: Silhouette Mt. Ciremai and mountain ridges peak */}
                  <path d="M 0 350 Q 150 240, 300 280 T 600 320 T 900 310 Q 1100 230, 1300 290 T 1600 340 T 1900 320 T 2400 350 L 2400 400 L 0 400 Z" fill="#000e24" opacity="0.65" />
                  
                  {/* Mount Ciremai major volcanic cone projection */}
                  <path d="M 980 310 L 1150 180 L 1220 220 L 1310 290 Z" fill="#010712" opacity="0.5" />
                  {/* Snow-cap / radar coordinate tower mockup on Mount peak */}
                  <line x1="1150" y1="180" x2="1150" y2="160" stroke="#FFF" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="1150" cy="160" r="1.5" fill="#EF4444" opacity="0.75" />

                  {/* MID-DISTANCE: Silhouette of futuristic industrial structures, airport, solar cluster */}
                  <g fill="#011833" opacity="0.8">
                    {/* Warehouses/hubs on logistics side */}
                    <rect x="2000" y="240" width="80" height="30" rx="1" />
                    <rect x="2090" y="250" width="100" height="20" rx="1" />
                    <rect x="1940" y="235" width="50" height="35" rx="1" />
                    
                    {/* Gigafactories electric vehicle side */}
                    <polygon points="1460,270 1500,220 1560,220 1600,270" />
                    <polygon points="1580,270 1610,230 1660,230 1690,270" />
                    <line x1="1530" y1="220" x2="1530" y2="180" stroke="#4ADE80" strokeWidth="1" /> {/* chimney pipe mock */}

                    {/* Solar Panel Racks blueprint silhouette */}
                    <polygon points="530,280 560,260 620,260 650,280" />
                    <polygon points="660,280 690,260 750,260 780,280" />
                    
                    {/* Kertajati BIJB Control Tower and Core Airport Terminal */}
                    {/* Runway */}
                    <polygon points="20,280 250,280 320,310 20,310" fill="#021428" />
                    {/* Airport Main Hangar outline */}
                    <path d="M 100 280 C 130 220, 220 220, 250 280 Z" />
                    {/* Control Tower */}
                    <rect x="160" y="160" width="12" height="100" />
                    <polygon points="145,160 187,160 177,145 155,145" />
                    <circle cx="166" cy="138" r="1.5" fill="#EF4444" /> {/* flashing beacon */}
                  </g>

                  {/* WIND TURBINES with active animated rotation blades */}
                  <g stroke="#FFF" strokeWidth="0.75" opacity="0.35">
                    {/* Turbine A tower */}
                    <line x1="780" y1="260" x2="780" y2="180" strokeWidth="1.5" />
                    {/* Blades rotating simulated using SVG curves and spins or animated layers */}
                    <circle cx="780" cy="180" r="3" fill="#FFF" />
                    <line x1="780" y1="180" x2="760" y2="170" strokeWidth="1" className="animate-pulse" />
                    <line x1="780" y1="180" x2="795" y2="165" strokeWidth="1" className="animate-pulse" />
                    <line x1="780" y1="180" x2="785" y2="205" strokeWidth="1" className="animate-pulse" />

                    {/* Turbine B tower */}
                    <line x1="840" y1="270" x2="840" y2="190" strokeWidth="1.5" />
                    <circle cx="840" cy="190" r="3" fill="#FFF" />
                    <line x1="840" y1="190" x2="825" y2="175" strokeWidth="1" />
                    <line x1="840" y1="190" x2="855" y2="175" strokeWidth="1" />
                    <line x1="840" y1="190" x2="840" y2="215" strokeWidth="1" />
                  </g>

                  {/* FOREGROUND BEDDING Ground mesh */}
                  <path d="M 0 280 Q 200 270, 400 285 T 800 290 T 1200 280 T 1600 295 T 2000 285 T 2400 280 L 2400 400 L 0 400 Z" fill="#00040a" />

                  {/* Ground Blueprint wireframe grids to add immense "tech & aerospace design vibe" */}
                  <g stroke={activeViewpoint.gridColor} strokeWidth="0.5">
                    {/* Curved grid sweeps representing modern development blueprint */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <path key={i} d={`M ${150 + i * 180} 280 Q ${300 + i * 180} 350, ${450 + i * 180} 400`} fill="none" />
                    ))}
                    {/* Horizontal landscape segments */}
                    <line x1="0" y1="300" x2="2400" y2="300" />
                    <line x1="0" y1="330" x2="2400" y2="330" />
                    <line x1="0" y1="365" x2="2400" y2="365" />
                  </g>

                  {/* Core Hub Tower futuristic wireframe projection in the foreground center */}
                  <g transform="translate(1200, 275)" opacity="0.8">
                    {/* Glowing coordinate projection dome */}
                    <circle cx="0" cy="-20" r="45" fill="url(#hubTowerGlow)" />
                    {/* Core tower columns */}
                    <line x1="-15" y1="0" x2="-8" y2="-80" stroke="#D4AF37" strokeWidth="1" />
                    <line x1="15" y1="0" x2="8" y2="-80" stroke="#D4AF37" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="-120" stroke="#D4AF37" strokeWidth="1.5" />
                    {/* Outer support structures */}
                    <path d="M -35 0 L -8 -80 L 8 -80 L 35 0" stroke="#38BDF8" strokeWidth="0.75" fill="none" />
                    <line x1="-35" y1="0" x2="35" y2="0" stroke="#38BDF8" strokeWidth="2" />
                    
                    {/* Flashing GPS marker light */}
                    <circle cx="0" cy="-120" r="2.5" fill="#EF4444" className="animate-ping" />
                    <circle cx="0" cy="-120" r="1.5" fill="#FFF" />
                    <text x="0" y="-130" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CORE NODE TOWER</text>
                  </g>

                  {/* ASCENDING AIRCRAFT FLYING OVER BIJB */}
                  <g transform="translate(340, 100)" opacity="0.9">
                    {/* Aircraft path vector guide */}
                    <path d="M -200 120 C -100 80, -20 20, 60 -40" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="3,3" fill="none" />
                    {/* Airplane vector symbol heading ENE */}
                    <g transform="rotate(-22) scale(0.8)">
                      <polygon points="0,-8 14,0 0,6 -2,0" fill="#FFF" />
                      <polygon points="5,0 -5,-3 -7,-3 -6,0" fill="#38BDF8" />
                      <line x1="0" y1="0" x2="-15" y2="0" stroke="#EF4444" strokeWidth="1" />
                    </g>
                    <text x="30" y="-15" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold">FLIGHT: KIIT-S26 OUTBOUND</text>
                  </g>
                </svg>

                {/* HTML Interactive Target Hotspots overlay mapped onto coordinates above */}
                {activeHotspots.map((h) => {
                  const isSel = selectedHotspot?.id === h.id;
                  return (
                    <div
                      key={h.id}
                      className="absolute z-20 group"
                      style={{
                        left: `${h.x}px`,
                        top: `${h.y}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Interactive ping pulsing circle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHotspot(isSel ? null : h);
                        }}
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full border bg-slate-950/90 transition-all duration-300 shadow-xl cursor-pointer ${
                          isSel 
                            ? 'border-brand-gold text-brand-gold scale-125 bg-brand-gold/20' 
                            : 'border-white/50 text-white hover:border-brand-gold hover:text-brand-gold hover:scale-110'
                        }`}
                      >
                        {/* Flashing concentric rings */}
                        <span className={`absolute inset-0 rounded-full animate-ping opacity-25 ${isSel ? 'bg-brand-gold' : 'bg-white'}`}></span>
                        <h.icon className="w-4 h-4" />
                      </button>

                      {/* Floating title tag visible on hover over the hotspot */}
                      <span className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 bg-slate-950/95 border border-slate-800 text-[9px] font-mono font-bold tracking-widest uppercase rounded-none opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-focus-within:opacity-100 shadow-xl">
                        {isIndo ? h.nameId : h.nameEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Tap outside to dismiss hotspot panel */}
            {selectedHotspot && (
              <div 
                className="absolute inset-0 z-10" 
                onClick={() => setSelectedHotspot(null)}
              />
            )}

            {/* Bottom floating helper badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-slate-400 select-none z-10 hidden sm:flex items-center space-x-2">
              <span className="h-1.5 w-1.5 bg-brand-gold rounded-full animate-ping"></span>
              <span>
                {isIndo 
                  ? 'Gunakan Mouse / Sentuh Layar untuk Menggeser Tampilan Lintasan' 
                  : 'Use Mouse Drag or Swipe Touch To Rotate Telemetry Track'
                }
              </span>
            </div>
          </div>

          {/* Connected Details Bottom Drawer Popover card */}
          <AnimatePresence>
            {selectedHotspot && (
              <motion.div
                id="vr-hotspot-panel"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="absolute inset-x-6 sm:inset-x-auto sm:right-6 bottom-16 sm:w-96 border border-brand-gold/35 bg-slate-950/95 backdrop-blur-md p-5 z-30 shadow-2xl rounded-none"
              >
                {/* Header info */}
                <div className="flex justify-between items-start border-b border-brand-gold/20 pb-2.5 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-brand-gold/15 text-brand-gold">
                      {React.createElement(selectedHotspot.icon, { className: "w-4 h-4" })}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-xs text-white uppercase tracking-wider">
                        {isIndo ? selectedHotspot.nameId : selectedHotspot.nameEn}
                      </h4>
                      <span className="block text-[8px] sm:text-[9px] font-mono text-brand-gold font-bold uppercase tracking-widest">
                        {selectedHotspot.meta}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedHotspot(null)}
                    className="p-1 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body details text */}
                <p className="font-sans text-xs text-slate-300 leading-relaxed font-normal mb-4">
                  {isIndo ? selectedHotspot.descId : selectedHotspot.descEn}
                </p>

                {/* Engineering status checklist */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono border-t border-white/5 pt-3">
                  <div className="bg-white/[0.01] border border-white/5 p-2">
                    <span className="block text-slate-500 uppercase tracking-wider">ZONE CLUSTER</span>
                    <span className="block text-white font-bold uppercase">
                      {selectedHotspot.id === 'bijb_airport' ? 'Aviation & Cargo' : selectedHotspot.id === 'solar_power' ? 'Eco-Infrastructure' : selectedHotspot.id === 'interchange_cipali' ? 'Inter-Highway' : selectedHotspot.id === 'ev_gigafactory' ? 'Future Mobility' : 'Integrated Logistics'}
                    </span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 p-2">
                    <span className="block text-slate-500 uppercase tracking-wider">STATUS</span>
                    <span className="block text-emerald-400 font-bold uppercase flex items-center space-x-1">
                      <span className="h-1 w-1 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
                      <span>{isIndo ? 'TERINTEGRASI' : 'INTEGRATED'}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

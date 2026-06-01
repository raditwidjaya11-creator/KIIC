import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Compass, CircleCheck, CheckCircle2, ShieldCheck, Activity, HelpCircle, HardHat, FileBadge, Calculator } from 'lucide-react';

interface AcquisitionVillage {
  id: string;
  name: string;
  status: 'Acquired' | 'Negotiation' | 'DueDiligence' | 'PaymentProcess' | 'Unprocessed';
  area: number; // in Hectares
  percentage: number;
  chiefName: string;
  clearingProgress: number; // 0 to 100%
  points: string; // SVG coordinates
  description: string;
}

export default function LandAcquisition() {
  const { language, t, landAcquisitionSegments } = useLanguage();
  const isIndo = language === 'id';
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('sudah_akuisisi');
  const [hoveredVillageId, setHoveredVillageId] = useState<string | null>(null);
  const [activeVillageId, setActiveVillageId] = useState<string>('v-kertajati');

  const selectedSegment = landAcquisitionSegments.find((s) => s.id === selectedSegmentId) || landAcquisitionSegments[0];

  // Specific land parcels mapping representatived in Majalengka / Kertajati villages block
  const villagesData: AcquisitionVillage[] = [
    {
      id: 'v-kertajati',
      name: isIndo ? 'Blok Barat Desa Kertajati (Core Area)' : 'West Block Kertajati Village (Core Area)',
      status: 'Acquired',
      area: 320,
      percentage: 32.0,
      chiefName: 'H. Sukarya Wardana',
      clearingProgress: 90,
      points: '40,40 280,40 240,180 40,150',
      description: isIndo 
        ? 'Lahan datar inti bersebelahan langsung dengan Koridor Steril Apron Bandara. Proses pembebasan tuntas 100%, sertifikat SHGB No.04 s.d No.11 terbit, land clearing sisa pengerjaan utilitas penahan air hujan.'
        : 'Core flat land directly adjacent to the Flight Smart Apron Corridor. 100% compensation complete, SHGB certificates No.04 to No.11 issued, land clearing remaining on stormwater retention utility works.',
    },
    {
      id: 'v-sukawana',
      name: isIndo ? 'Sektor Timur Desa Sukawana (Logistics)' : 'East Sector Sukawana Village (Logistics Hub)',
      status: 'Acquired',
      area: 215,
      percentage: 21.5,
      chiefName: 'Drs. Agus Budiman',
      clearingProgress: 75,
      points: '290,40 500,40 460,180 250,180',
      description: isIndo
        ? 'Dialokasikan untuk Smart Logistics Hub dan depo pergudangan kargo terpadu. Pembebasan lancar murni komersial, sertifikat SHGB No.14 terbit. Sedang merampungkan perataan tanah.'
        : 'Allocated for Smart Logistics Hub and integrated cargo warehousing depot. Compensation complete on commercial terms, SHGB No.14 certificate issued. Ground leveling being finalized.',
    },
    {
      id: 'v-bantarjati',
      name: isIndo ? 'Kawasan Desa Bantarjati (EV Cluster)' : 'Bantarjati Village District (EV Cluster)',
      status: 'Acquired',
      area: 150,
      percentage: 15.0,
      chiefName: 'Karsoma, S.AP.',
      clearingProgress: 40,
      points: '40,160 230,190 200,280 40,280',
      description: isIndo
        ? 'Lokasi masa depan Giga-Factory baterai lithium dan perakitan EV. Kepemilikan warga telah beralih sah ke anak usaha KIIT, berstatus siap digarap untuk pemancangan tiang pertama konstruksi.'
        : 'Future site of lithium battery Giga-Factory and EV assembly block. Lot ownership legally transfered to KIIT subsidiary, ready for construction groundbreaking.',
    },
    {
      id: 'v-kertasari',
      name: isIndo ? 'Desa Kertasari Bagian Selatan (Aerospace)' : 'South Kertasari Village (Aerospace Zone)',
      status: 'Negotiation',
      area: 140,
      percentage: 14.0,
      chiefName: 'Hj. Entin Kartini',
      clearingProgress: 0,
      points: '510,40 760,40 720,180 470,180',
      description: isIndo
        ? 'Sedang dalam musyawarah mufakat harga ganti untung dengan panitia pelaksana BPN dan perwakilan adat. Konsensus diperkirakan rampung pertengahan Juni 2026, tanpa sengketa tumpang tindih.'
        : 'In final consensus meetings on compensation terms with regional BPN and customary committees. Approval expected Mid-June 2026 without property claims.',
    },
    {
      id: 'v-mekarjaya',
      name: isIndo ? 'Blok Utara Desa Mekarjaya (Agro)' : 'North Block Mekarjaya Village (Agro Sector)',
      status: 'DueDiligence',
      area: 95,
      percentage: 9.5,
      chiefName: 'Asep Saepudin',
      clearingProgress: 0,
      points: '240,190 450,190 410,280 210,280',
      description: isIndo
        ? 'Yuridis legal formal sedang ditelaah komisi hukum Kejaksaan Negeri Majalengka guna memastikan kepemilikan tanah waris adat bersertifikat Letter C aman dari risiko tuntutan ahli waris di kemudian hari.'
        : 'Formal legal standing being reviewed by Majalengka Prosecutor Office to secure customary land titles from future heritage disputes.',
    },
    {
      id: 'v-babakan',
      name: isIndo ? 'Lahan Koridor Desa Babakan (CBD)' : 'Babakan Village Passage (CBD Center)',
      status: 'PaymentProcess',
      area: 50,
      percentage: 5.0,
      chiefName: 'Mulyana, S.Sos',
      clearingProgress: 0,
      points: '480,190 710,180 660,280 420,280',
      description: isIndo
        ? 'Dana ganti untung senilai Rp135 Miliar telah ditempatkan di rekening escrow Bank Jabar Banten (BJB) Majalengka, menunggu penandatanganan akta pelepasan hak (APH) di hadapan Pejabat PPAT.'
        : 'Compensation fund of IDR 135 Billion placed in BJB escrow account, awaiting signing of deed transfer (APH) in front of public PPAT.',
    },
    {
      id: 'v-rencana',
      name: isIndo ? 'Sektor Cadangan Luar Desa' : 'Reserve Sector Outside Village Borders',
      status: 'Unprocessed',
      area: 30,
      percentage: 3.0,
      points: '210,290 650,290 600,380 40,380',
      chiefName: 'Team Teknis KIIT',
      clearingProgress: 0,
      description: isIndo
        ? 'Zona rintangan hijau hutan penyangga atau makam adat yang dipertahankan. Masuk dlm skenario perluasan 120 Ha cadangan hutan ekologis sirkular di luar tapak operasional manufaktur.'
        : 'Buffer green reserve zone or preserved ancestral graves. Planned within the scenic 120 Ha ecological expansion scenario outside primary packaging lots.',
    },
  ];

  const activeVillage = villagesData.find((v) => v.id === activeVillageId) || villagesData[0];

  return (
    <section id="lahan" className="relative py-24 bg-slate-50 border-y border-slate-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {isIndo ? 'PEMBEBASAN LAHAN • LAND ACQUISITION AUDIT' : 'LAND ACQUISITION • DETAILED COMPLIANCE AUDIT'}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none">
            {isIndo ? 'Progres Akuisisi Lahan KIIT 1.000 Ha' : 'KIIT 1,000 Ha Core Land Acquisition Progress'}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
            {isIndo 
              ? 'Transparansi keterbukaan data akuisisi lahan Kertajati International Industrial Town demi memberikan kenyamanan hukum, kepatuhan audit BPK, dan jaminan keamanan sertifikat tanah Clean and Clear bagi investor.'
              : 'Transparent compliance reporting on local land compensation for total legal assurance, BPK auditing compliance, and clean certificates security.'}
          </p>
        </div>

        {/* Global Stacked Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-none p-6 sm:p-8 shadow-xl mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <HardHat className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-bold tracking-wide text-slate-800 uppercase font-sans">
                {isIndo ? 'Skema Sektoral Progress Lahan Terakuisisi' : 'Sectored Land Acquisition Scale Progress'}
              </span>
            </div>
            <span className="text-sm font-bold text-brand-navy font-mono">
              {isIndo 
                ? '685 Ha dari 1.000 Ha Terpancang (68.5% Rampung)' 
                : '685 Ha of 1,000 Ha Acquired (68.5% Complete)'}
            </span>
          </div>

          {/* Combined Progress Bar */}
          <div className="h-4 w-full bg-slate-100 rounded-none overflow-hidden flex shadow-inner">
            <div className="h-full bg-brand-navy transition-all duration-500" style={{ width: '68.5%' }} title="Sudah Diakuisisi: 68.5%"></div>
            <div className="h-full bg-brand-gold transition-all duration-500" style={{ width: '14.0%' }} title="Dalam Negosiasi: 14%"></div>
            <div className="h-full bg-slate-400 transition-all duration-500" style={{ width: '9.5%' }} title="Due Diligence: 9.5%"></div>
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: '5.0%' }} title="Proses Bayar: 5%"></div>
            <div className="h-full bg-red-600 transition-all duration-500" style={{ width: '3.0%' }} title="Belum Diproses: 3%"></div>
          </div>

          {/* Quick Legend links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100">
            {landAcquisitionSegments.map((seg) => {
              // Map background brand colors
              let colorHex = seg.color;
              if (seg.id === 'sudah_akuisisi') colorHex = '#001F3F'; // brand navy
              if (seg.id === 'negosiasi_harga') colorHex = '#D4AF37'; // brand gold

              return (
                <button
                  key={seg.id}
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className={`p-3 rounded-none border text-left transition-all cursor-pointer ${
                    selectedSegmentId === seg.id
                      ? 'border-brand-navy bg-slate-150 shadow-none'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-none shrink-0" style={{ backgroundColor: colorHex }}></span>
                    <span className="text-[10px] font-sans font-extrabold text-slate-800 truncate uppercase">{seg.label}</span>
                  </div>
                  <div className="mt-1.5 flex justify-between items-baseline">
                    <span className="text-sm font-bold font-mono text-slate-900">{seg.area} Ha</span>
                    <span className="text-[9px] font-mono text-slate-500 font-bold">({seg.percentage}%)</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected segment contextual details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSegment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6 bg-slate-50 p-4 rounded-none border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="max-w-3xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold">
                  {isIndo ? 'Catatan Progres' : 'Progress Report'} - {selectedSegment.label}
                </span>
                <p className="text-xs text-slate-650 font-sans mt-1 leading-relaxed font-semibold">
                  {selectedSegment.description}
                </p>
              </div>
              <div className="mt-3 md:mt-0 px-3.5 py-2 bg-white rounded-none border border-slate-200 shrink-0 font-mono text-xs">
                <span className="text-slate-400 uppercase text-[9px] block">{isIndo ? 'Appraisal Valuation' : 'Appraisal Property Value'}</span>
                <span className="text-brand-navy font-extrabold text-sm block mt-0.5">
                  {isIndo ? `Rp ${(selectedSegment.area * 1.5).toFixed(1)} Miliar *` : `IDR ${(selectedSegment.area * 1.5).toFixed(1)} Billion *`}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Dual map representation section: Interactive Land Parcels vs Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Land Block Map - Left */}
          <div className="lg:col-span-7 bg-[#001026] rounded-none p-5 border border-slate-900 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
            
            <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                {isIndo ? 'PETA DESA DAN BLOK AKUISISI KIIT' : 'KIIT VILLAGES AND ACQUISITION SECTOR MAP'}
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                {isIndo ? 'Koordinat Satgas Daerah Jabar' : 'West Java Land Taskforce Coordinates'}
              </span>
            </div>

            {/* SVG Villages polygons */}
            <div className="relative flex-1 flex items-center justify-center my-6 z-10">
              <svg viewBox="0 0 800 400" className="w-full h-auto max-h-[300px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
                {/* Background references */}
                <line x1="10" y1="360" x2="790" y2="360" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6,4" />
                <path d="M 400 360 L 400 150" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />

                {villagesData.map((v) => {
                  const isActive = activeVillageId === v.id;
                  const isHovered = hoveredVillageId === v.id;
                  let color = '#475569'; // unpaid / unprocessed
                  if (v.status === 'Acquired') color = '#001F3F'; // brand-navy
                  if (v.status === 'Negotiation') color = '#D4AF37'; // brand-gold
                  if (v.status === 'DueDiligence') color = '#1a3a60'; // accent navy tint
                  if (v.status === 'PaymentProcess') color = '#10B981'; // green
                  if (v.status === 'Unprocessed') color = '#dc2626'; // red

                  return (
                    <polygon
                      key={v.id}
                      points={v.points}
                      fill={color}
                      fillOpacity={isActive ? 0.95 : isHovered ? 0.85 : 0.65}
                      stroke={isActive ? '#D4AF37' : isHovered ? '#FFFFFF' : '#001F3F'}
                      strokeWidth={isActive ? '2.5' : '1'}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredVillageId(v.id)}
                      onMouseLeave={() => setHoveredVillageId(null)}
                      onClick={() => setActiveVillageId(v.id)}
                    />
                  );
                })}

                {/* Legend overlay tags */}
                <text x="140" y="100" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">{isIndo ? 'BLOK KERTASARI (Acquired)' : 'KERTASARI SECTOR (Acquired)'}</text>
                <text x="400" y="100" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">{isIndo ? 'TIMUR SUKAWANA' : 'EAST SUKAWANA'}</text>
                <text x="635" y="125" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">{isIndo ? 'KERTASARI SELATAN' : 'SOUTH KERTASARI'}</text>
                <text x="590" y="240" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle" pointerEvents="none">CORRIDOR BABAKAN</text>
                <text x="350" y="240" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle" pointerEvents="none">{isIndo ? 'UTARA MEKARJAYA' : 'NORTH MEKARJAYA'}</text>
                <text x="130" y="225" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">BANTARJATI (EV)</text>

                <text x="210" y="375" fill="#D4AF37" fontSize="8" fontFamily="monospace">JALAN TOL CIPALI UTAMA CONNECTION</text>
              </svg>
            </div>

            <div className="bg-[#001F3F]/60 border border-white/5 p-3.5 rounded-none text-center text-xs text-slate-300 relative z-10 font-sans font-semibold">
              <span className="text-brand-gold font-extrabold font-mono uppercase tracking-wider block sm:inline mr-1">{isIndo ? 'UJI DENGAN KLIK:' : 'INTERACTIVE CHECK:'}</span> {isIndo ? 'Klik blok desa pada peta visual wilayah untuk menampilkan rincian sertifikasi, progres clearing, kepala desa, dan status yuridis lahan.' : 'Click block sections on the map to visualize certificates, land clearance progress, local details, and legal titles.'}
            </div>
          </div>

          {/* Intelligent Block Information Panel - Right */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white border border-slate-200 rounded-none p-6 sm:p-8 flex-1 flex flex-col justify-between shadow-2xl">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVillage.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-brand-navy/10 text-brand-navy border border-brand-navy/20 rounded-none font-mono text-[9px] font-extrabold uppercase tracking-widest">
                      {isIndo ? 'STATUS PARSEL:' : 'PARCEL STATUS:'} {activeVillage.status.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1.5 font-mono text-xs text-slate-500 font-bold">
                      <FileBadge className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{isIndo ? 'Sertifikat Bersih (SHGB)' : 'Clean Title Certificate (SHGB)'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans font-extrabold text-xl text-slate-950">
                      {activeVillage.name}
                    </h3>
                    <p className="mt-2.5 font-sans text-xs text-slate-600 leading-relaxed font-semibold">
                      {activeVillage.description}
                    </p>
                  </div>

                  {/* Village parameters ledger detail */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs font-sans text-slate-650 font-semibold">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">{isIndo ? 'Total Luas Area Efektif' : 'Total Effective Land Area'}</span>
                      <strong className="text-slate-900 font-mono font-bold">{activeVillage.area} {isIndo ? 'Hektare' : 'Hectares'} ({activeVillage.percentage}%)</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">{isIndo ? 'Kepala Desa / Koordinat' : 'Village Chief & Local Liaison'}</span>
                      <strong className="text-slate-900 font-extrabold">{activeVillage.chiefName}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">{isIndo ? 'Estimasi Dana Kompensasi' : 'Estimated Compensation Funds'}</span>
                      <strong className="text-brand-navy font-mono font-extrabold">
                        {isIndo ? `Rp ${(activeVillage.area * 1.6).toFixed(1)} Miliar` : `IDR ${(activeVillage.area * 1.6).toFixed(1)} Billion`}
                      </strong>
                    </div>
                  </div>

                  {/* Clearing dynamic status */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-sans font-bold">
                      <span className="text-slate-500 shrink-0">{isIndo ? 'Progres Pemerataan Lahan (Land Clearing)' : 'Demolition & Land Clearing Progress'}</span>
                      <strong className="text-brand-navy font-extrabold">{activeVillage.clearingProgress}%</strong>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-none overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-navy to-brand-gold transition-all duration-300" style={{ width: `${activeVillage.clearingProgress}%` }}></div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Footnote status check */}
              <div className="border-t border-slate-100 pt-6 mt-6 flex justify-between items-center">
                <div className="text-left">
                  <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold">{isIndo ? 'AUDIT INDEPENDEN' : 'INDEPENDENT AUDIT'}</span>
                  <span className="block text-[11px] font-sans font-extrabold text-slate-850">{isIndo ? 'BPK & Kejari RI Oversight' : 'BPK Audit & State Oversight'}</span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-xs text-emerald-600 font-extrabold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{isIndo ? 'No Overlapping Claims' : 'Clear Title & Deed Secured'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

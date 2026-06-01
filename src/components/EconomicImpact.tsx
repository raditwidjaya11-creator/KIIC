import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, Landmark, Users, Store, Building2, Map, ShieldCheck, ArrowUpRight, CheckCircle } from 'lucide-react';

interface ImpactMetric {
  id: string;
  title: string;
  stat: string;
  multiplier: string;
  icon: any;
  color: string;
  bgGlow: string;
  shortDesc: string;
  details: string[];
  projectionYear: string;
}

export default function EconomicImpact() {
  const { language } = useLanguage();
  const isIndo = language === 'id';
  const [activeMetricId, setActiveMetricId] = useState<string>('impact-pdrb');

  const metrics: ImpactMetric[] = [
    {
      id: 'impact-pdrb',
      title: isIndo ? 'Akselerasi PDRB Jabar' : 'West Java GRDP Acceleration',
      stat: '+14.2%',
      multiplier: isIndo ? 'Sumbangsih Pertumbuhan' : 'Growth Contribution',
      icon: TrendingUp,
      color: 'text-brand-navy border-brand-navy/20',
      bgGlow: 'from-brand-gold/5 to-transparent',
      shortDesc: isIndo 
        ? 'Kontribusi langsung KIIT terhadap peningkatan Produk Domestik Regional Bruto Jawa Barat pada tahun ke-10 operasional penuh.'
        : 'KIIT\'s direct contribution to increasing West Java\'s Gross Regional Domestic Product by year 10 of full operation.',
      details: isIndo ? [
        'Mendorong laju pertumbuhan ekonomi Majalengka di atas rata-rata nasional (mencapai 7.8% per tahun).',
        'Menyeimbangkan kesenjangan ekonomi koridor Utara-Selatan Jawa Barat melalui akselesari industri.',
        'Mengukuhkan Jawa Barat sebagai destinasi utama investasi industri manufaktur berteknologi tinggi se-ASEAN.'
      ] : [
        'Boosting Majalengka\'s economic growth rate above the national average (reaching 7.8% annually).',
        'Balancing the economic gap of the North-South corridor of West Java through industrial acceleration.',
        'Solidifying West Java as ASEAN\'s premier investment destination for high-tech manufacturing industries.'
      ],
      projectionYear: isIndo ? 'Proyeksi Realisasi: 2035' : 'Realization Projection: 2035'
    },
    {
      id: 'impact-pad',
      title: isIndo ? 'Peningkatan PAD Daerah' : 'Regional Revenue (PAD) Growth',
      stat: isIndo ? 'Rp 450 M' : 'IDR 450B',
      multiplier: isIndo ? 'Nominal Per Tahun' : 'Annual Nominal Value',
      icon: Landmark,
      color: 'text-brand-navy border-indigo-500/20',
      bgGlow: 'from-brand-navy/5 to-transparent',
      shortDesc: isIndo 
        ? 'Estimasi suntikan Pendapatan Asli Daerah (PAD) baru bagi Pemkab Majalengka dari retribusi usaha, pajak bumi bangunan, dan deviden konsesi.'
        : 'Estimated injection of new Regional Original Revenue (PAD) for Majalengka Government from business levies, real estate taxes, and concession dividends.',
      details: isIndo ? [
        'Dana pajak yang diperoleh dialokasikan penuh untuk perbaikan jalan penghubung antardesa dan jembatan.',
        'Meningkatkan kapasitas fiskal daerah untuk subsidi pendidikan dasar dan layanan kesehatan BPJS gratis.',
        'Mendorong kemandirian APBD Majalengka tanpa ketergantungan mutlak dana perimbangan pusat.'
      ] : [
        'Tax revenues are allocated fully for the rehabilitation of inter-village connecting roads and bridges.',
        'Enhancing municipal fiscal capacity to subsidize primary education and free public healthcare services.',
        'Fostering Majalengka APBD autonomy without total reliance on central government balancing funds.'
      ],
      projectionYear: isIndo ? 'Proyeksi Realisasi: 2029' : 'Realization Projection: 2029'
    },
    {
      id: 'impact-umkm',
      title: isIndo ? 'Kemitraan UMKM Sektor Supplier' : 'SME Suppliers & Small Businesses',
      stat: '+320%',
      multiplier: isIndo ? 'Peningkatan Omset Sentra' : 'Supplier Hub Turnovers',
      icon: Store,
      color: 'text-brand-navy border-emerald-555/20',
      bgGlow: 'from-brand-gold/5 to-transparent',
      shortDesc: isIndo 
        ? 'Mitra industri KIIT diwajibkan menyerap bahan baku setengah jadi, kuliner catering kantin, dan kontraktor lokal Majalengka melaui inkubasi terstruktur.'
        : 'KIIT industrial tenants are required to procure intermediate materials, food services, and local contractors in Majalengka through structured incubation.',
      details: isIndo ? [
        'Menyerap lebih dari 1.200 jenis usaha mikro, kecil, dan menengah sebagai lini rantai pasok pendukung.',
        'Inkubasi standarisasi produk ekspor bagi pengusaha daerah Majalengka agar naik kelas ke pasar dunia.',
        'Penyediaan gerai pameran produk UMKM premium gratis di area Kertajati Komersial Hub.'
      ] : [
        'Integrating over 1,200 micro, small, and medium-sized local businesses into the supportive supply chain.',
        'Providing export standardization certification to local Majalengka businesses to enter international markets.',
        'Providing complimentary exhibition booths for premium local SME products in the Kertajati Commercial Hub.'
      ],
      projectionYear: isIndo ? 'Proyeksi Realisasi: 2028' : 'Realization Projection: 2028'
    },
    {
      id: 'impact-property',
      title: isIndo ? 'Pertumbuhan Properti & Kost' : 'Real Estate & Housing Demand',
      stat: '+210%',
      multiplier: isIndo ? 'Kebutuhan Unit Hunian' : 'Required Housing Units',
      icon: Building2,
      color: 'text-brand-navy border-rose-500/20',
      bgGlow: 'from-[#001F3F]/5 to-transparent',
      shortDesc: isIndo 
        ? 'Ledakan kebutuhan hunian rumah susun sewa, indekos pekerja, apartemen eksekutif, dan perhotelan bisnis di sekitar perimeter kawasan.'
        : 'Unprecedented demand for worker apartments, premium boarding houses, executive suites, and business hotels near the estate perimeter.',
      details: isIndo ? [
        'Mendorong penyerapan pasar perumahan lokal dalam jangkauan 5-15 KM dari area pabrik.',
        'Meningkatkan pendapatan pasif warga melalui model usaha asrama pekerja (boardinghouse) ramah lingkungan.',
        'Pembangunan kota satelit baru yang tertata rapi melaui konsep Transit Oriented Development (TOD).'
      ] : [
        'Driving absorption of local residential housing markets in a 5-15 KM radius from manufacturing zones.',
        'Increasing passive income for local residents via eco-friendly worker boarding house models.',
        'Developing orderly satellite cities through modern Transit-Oriented Development (TOD) frameworks.'
      ],
      projectionYear: isIndo ? 'Proyeksi Realisasi: 2030' : 'Realization Projection: 2030'
    },
    {
      id: 'impact-jobs',
      title: isIndo ? 'Ketersediaan Lapangan Kerja' : 'Job Opportunities & Talent Pool',
      stat: '80.000+',
      multiplier: isIndo ? 'Realisasi Tenaga Kerja' : 'Cumulative Job Absorption',
      icon: Users,
      color: 'text-brand-navy border-sky-500/20',
      bgGlow: 'from-brand-navy/5 to-transparent',
      shortDesc: isIndo 
        ? 'Penyerapan langsung tenaga terampil, operator mekatronika, staf manajerial, analis logistik, dan insinyur aerospace.'
        : 'Direct job creation for skilled technicians, mechatronics operators, management, logistics analysts, and aviation engineers.',
      details: isIndo ? [
        'Prioritas perekrutan warga ber-KTP Majalengka sebesar minimal 75% untuk seluruh jabatan operasional.',
        'Mengurangi angka pengangguran terbuka daerah Majalengka hingga di bawah target historis 2.5%.',
        'Transfer teknologi dari eksportir mancanegara (Jepang, Jerman, China) ke generasi muda lokal.'
      ] : [
        'Prioritizing Majalengka residents with a minimum 75% hire quota for all operational roles.',
        'Reducing Majalengka\'s open unemployment rate below a historic target of 2.5%.',
        'Enabling critical technology transfer from foreign exporters (Japan, Germany, China) to the local youth.'
      ],
      projectionYear: isIndo ? 'Proyeksi Realisasi: 2032' : 'Realization Projection: 2032'
    },
    {
      id: 'impact-land',
      title: isIndo ? 'Indeks Nilai Jual Tanah' : 'Land Value & Wealth Index',
      stat: 'x3.5',
      multiplier: isIndo ? 'Kenaikan Nilai NJOP' : 'Official Land Valuation Increase',
      icon: Map,
      color: 'text-brand-navy border-violet-500/20',
      bgGlow: 'from-brand-gold/5 to-transparent',
      shortDesc: isIndo 
        ? 'Kenaikan nilai aset tanah milik warga sekitar menyusul masuknya infrastruktur air bersih, listrik premium, dan akses jalan aspal andal.'
        : 'Value appreciation of neighboring land assets driven by clean water pipelines, premium electrical grids, and robust asphalt connections.',
      details: isIndo ? [
        'Meningkatkan nilai ekuitas warga desa penyangga untuk jaminan kemandirian modal produktif.',
        'Pembangunan jalan desa yang asalnya tanah kosong menjadi jalan aspal hotmix lebar.',
        'Menstimulus penataan tata ruang desa adat yang bersih, modern, dan bernilai estetis tinggi.'
      ] : [
        'Boosting the equity value of neighboring village land to secure productive micro-financing credit.',
        'Transforming dirt rural roads into wide hotmix asphalt municipal connections.',
        'Stimulating clean, aesthetic, and sustainable rural planning for ancestral residential villages.'
      ],
      projectionYear: isIndo ? 'Proyeksi Realisasi: 2027' : 'Realization Projection: 2027'
    },
  ];

  const activeMetric = metrics.find((m) => m.id === activeMetricId) || metrics[0];

  return (
    <section id="ekonomi" className="relative py-24 bg-white overflow-hidden border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Presentation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {isIndo ? 'MULTIPLIER EFFECT • EKONOMI MAKRO JAWA BARAT' : 'MULTIPLIER EFFECT • WEST JAVA MACROECONOMY'}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
            {isIndo ? 'Dampak & Kontribusi Ekonomi Makro KIIT' : 'Macroeconomic Impacts & Multiplier Contribution of KIIT'}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
            {isIndo
              ? 'Investasi infrastruktur bernilai puluhan triliun rupiah di Kertajati dirancang untuk memberikan kemaslahatan langsung bagi kesejahteraan warga daerah dan pertumbuhan ekonomi nasional Jawa Barat.'
              : 'Multi-trillion IDR infrastructure investments at Kertajati are designed to inject sustainable municipal welfare and accelerate national economic growth.'}
          </p>
        </div>

        {/* Infographics Layout: Left 6 Interactive Metrics Cards, Right Expanded Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 6 Cards Panel Grid - 6 columns */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m) => {
              const Icon = m.icon;
              const isActive = activeMetricId === m.id;

              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMetricId(m.id)}
                  className={`p-5 rounded-none border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-48 cursor-pointer group ${
                    isActive
                      ? 'border-brand-navy bg-slate-50/50 shadow-md shadow-brand-navy/5'
                      : 'border-slate-200 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  {/* Subtle Background Glow if Active */}
                  <div className={`absolute inset-0 z-0 bg-gradient-to-br ${m.bgGlow}`}></div>

                  <div className="relative z-10 flex justify-between items-start w-full">
                    <div className="p-2.5 rounded-none bg-slate-50 border border-slate-200 text-brand-navy shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-brand-navy" />
                    </div>
                    {isActive ? (
                      <span className="px-2 py-0.5 bg-brand-navy text-white rounded-none font-mono text-[8px] font-bold uppercase tracking-wider">
                        {isIndo ? 'Panel Aktif' : 'Active Panel'}
                      </span>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>

                  <div className="relative z-10 mt-4 font-sans">
                    <span className="text-3xl font-extrabold font-sans text-brand-navy tracking-tight block font-mono">
                      {m.stat}
                    </span>
                    <span className="text-[11px] font-bold text-slate-900 uppercase font-sans mt-1 block">
                      {m.title}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wide mt-0.5 block leading-none font-semibold">
                      {m.multiplier}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Broad analytical board - 6 columns */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="bg-slate-50/55 border border-slate-200 rounded-none p-6 sm:p-8 flex-1 flex flex-col justify-between bg-slate-50/50 shadow-sm">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMetric.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  
                  {/* Metric Metadata Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 font-mono text-xs text-brand-gold font-bold">
                      <span>{activeMetric.projectionYear}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                      MULTIPLIER MODEL V.2
                    </span>
                  </div>

                  {/* Stat value & Title */}
                  <div>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-4xl sm:text-5xl font-extrabold font-sans text-brand-navy tracking-tight font-mono">
                        {activeMetric.stat}
                      </span>
                      <span className="text-sm font-mono text-slate-500 uppercase tracking-widest leading-none font-bold">
                        {activeMetric.multiplier}
                      </span>
                    </div>
                    
                    <h3 className="font-sans font-extrabold text-xl text-brand-navy mt-4 uppercase">
                      {activeMetric.title}
                    </h3>
                    
                    <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
                      {activeMetric.shortDesc}
                    </p>
                  </div>

                  {/* Dynamic checklist details */}
                  <div className="space-y-3 pt-5 border-t border-slate-200/60 font-sans">
                    <h4 className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-extrabold mb-3 flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 font-bold" />
                      <span>{isIndo ? 'Rencana Kemitraan & Kebijakan Strategis:' : 'Strategic Partnerships & Local Directives:'}</span>
                    </h4>
                    
                    <div className="space-y-2.5">
                      {activeMetric.details.map((detail, index) => (
                        <div key={index} className="flex items-start space-x-2 text-xs text-slate-600">
                          <CheckCircle className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                          <span className="font-semibold">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Verified Oversight */}
              <div className="border-t border-slate-200 mt-6 pt-6 flex justify-between items-center text-xs font-sans">
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold">{isIndo ? 'Penelaah Model' : 'Model Reviewer'}</span>
                  <strong className="text-brand-navy block font-extrabold">
                    {isIndo ? 'Kajian Kemenko Perekonomian RI' : 'Indonesian Coordinating Ministry for Economic Affairs Study'}
                  </strong>
                </div>
                <span className="px-2.5 py-1 text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-none font-mono text-[9px] font-bold shrink-0">
                  Socio-Economic Multiplier Certified
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

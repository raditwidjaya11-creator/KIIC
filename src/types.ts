export interface MasterplanZone {
  id: string;
  name: string;
  area: number; // in Hectares
  color: string;
  gradient: string;
  investmentValue: string; // value in IDR (Trillion)
  laborPotential: number; // labor count
  description: string;
  facilities: string[];
}

export interface LandAcquisitionSegment {
  id: string;
  status: 'Acquired' | 'Negotiation' | 'DueDiligence' | 'PaymentProcess' | 'Unprocessed';
  label: string;
  area: number; // in Hectares
  percentage: number;
  color: string;
  description: string;
}

export interface IndustrialCluster {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  area: string;
  investmentPotential: string;
  laborPotential: string;
  economicValue: string;
  highlights: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Update Proyek' | 'Kegiatan Investor' | 'Perkembangan Kawasan' | 'Kerja Sama' | 'Siaran Pers';
  date: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
}

export interface InvestorDoc {
  id: string;
  title: string;
  type: 'PDF' | 'XLSX' | 'PPTX' | 'ZIP';
  size: string;
  confidentiality: 'Public' | 'Restricted' | 'Confidential';
  category: string;
}

export interface ESGTheme {
  id: string;
  pillar: 'E' | 'S' | 'G';
  title: string;
  icon: string;
  description: string;
  metrics: { label: string; value: string }[];
}

// Static Data Constants for KIIT
export const KIIT_KPIS = [
  { label: 'Luas Kawasan Hektare', value: 1000, suffix: ' Ha', sub: 'Total Masterplan' },
  { label: 'Potensi Investasi Triliun', value: 50, prefix: 'Rp ', suffix: ' T+', sub: 'Proyeksi Total' },
  { label: 'Pendapatan Proyek Triliun', value: 17, prefix: 'Rp ', suffix: ' T+', sub: 'Fasilitas & Layanan' },
  { label: 'Nilai Kawasan Triliun', value: 30, prefix: 'Rp ', suffix: ' T+', sub: 'Valuasi Aset Terkonsolidasi' },
  { label: 'Lapangan Kerja Jiwa', value: 80000, suffix: '+', sub: 'Penyerapan Tenaga Kerja Baru' },
  { label: 'Tenant Industri Mitra', value: 250, suffix: '+', sub: 'Hub Manufaktur Global' },
];

export const MASTERPLAN_ZONES: MasterplanZone[] = [
  {
    id: 'manufaktur',
    name: 'Kawasan Manufaktur High-Tech',
    area: 350,
    color: '#0F2942',
    gradient: 'from-blue-900 to-indigo-950',
    investmentValue: '18.5 Triliun',
    laborPotential: 28000,
    description: 'Kawasan manufaktur presisi modern, ramah lingkungan, siap untuk industri 4.0 dengan konektivitas IoT terintegrasi.',
    facilities: ['Listrik Premium Tanpa Berkedip', 'Pengolahan Air Bersih Mandiri', 'Fiber Optik Gigaspeed', 'Akses Langsung Tol & Cargo Port'],
  },
  {
    id: 'logistik',
    name: 'Pusat Logistik & Pergudangan Terpadu',
    area: 200,
    color: '#D4AF37',
    gradient: 'from-amber-600 to-yellow-500',
    investmentValue: '8.2 Triliun',
    laborPotential: 12000,
    description: 'Pusat pergudangan pintar, dry port, cold storage, dan rantai pasok dengan integrasi digital bea cukai satu atap.',
    facilities: ['Gudang Pintar Ber-AC', 'Sistem Bea Cukai SATU ATAP', 'Pusat Distribusi Regional', 'Area Parkir Truk Raksasa'],
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Aviation Town',
    area: 100,
    color: '#1E3A8A',
    gradient: 'from-sky-800 to-indigo-900',
    investmentValue: '7.5 Triliun',
    laborPotential: 9000,
    description: 'Pusat perawatan & perbaikan pesawat (MRO), manufaktur suku cadang aviasi, dan logistik kargo bandara Kertajati.',
    facilities: ['Akses Apron Bandara Terbuka', 'Hanggar Perawatan Boeing & Airbus', 'Pusat Presisi Logistik Dirgantara', 'Akademi Penerbangan Partner'],
  },
  {
    id: 'ev',
    name: 'Ekosistem Kendaraan Listrik (EV)',
    area: 100,
    color: '#10B981',
    gradient: 'from-emerald-700 to-teal-900',
    investmentValue: '6.8 Triliun',
    laborPotential: 11000,
    description: 'Kawasan khusus perakitan kendaraan listrik, produksi baterai lithium-ion, dan komponen pendukung mobilitas masa depan.',
    facilities: ['Giga Power Supply Station', 'Pusat Uji Coba Baterai EV', 'Infrastruktur Pengisian Daya Hijau', 'Laboratorium R&D Bersama'],
  },
  {
    id: 'agro',
    name: 'Agro-Industri Modern & Pengolahan Makanan',
    area: 80,
    color: '#84CC16',
    gradient: 'from-lime-600 to-green-850',
    investmentValue: '3.1 Triliun',
    laborPotential: 8000,
    description: 'Pusat pengolahan hasil bumi berstandar ekspor, cold chain logistics, pengemasan steril, dan inkubasi agro-teknologi.',
    facilities: ['Laboratorium Higienitas Pangan', 'Gudang Pendingin Super (Cold Room)', 'Sentra Pengemasan Otomatis', 'Pusat Riset Bio-Teknologi'],
  },
  {
    id: 'komersial',
    name: 'KIIT Business District & Komersial',
    area: 70,
    color: '#8B5CF6',
    gradient: 'from-purple-800 to-violet-950',
    investmentValue: '4.5 Triliun',
    laborPotential: 6000,
    description: 'Kawasan perkantoran modern, hotel bintang lima, pusat konvensi pameran industri (MICE), perbankan, dan pusat perbelanjaan.',
    facilities: ['MICE Convention Center', 'Hotel Bisnis Bintang 5', 'Pusat Keuangan & Bank Portal', 'Premium Serviced Office'],
  },
  {
    id: 'hunian',
    name: 'Kawasan Hunian Green Industrial Resident',
    area: 50,
    color: '#EC4899',
    gradient: 'from-rose-600 to-pink-800',
    investmentValue: '2.5 Triliun',
    laborPotential: 1500,
    description: 'Hunian ramah lingkungan kelas menengah hingga mewah untuk tenaga ahli, manajemen asing, dan pekerja kawasan.',
    facilities: ['Green Living Clubhouse', 'Sekolah & Apotek Internasional', 'Area Jogging di Sisi Danau KIIT', 'Sistem Keamanan Pintar 24 Jam'],
  },
  {
    id: 'rth',
    name: 'Ruang Terbuka Hijau & Eco-Park',
    area: 120,
    color: '#064E3B',
    gradient: 'from-green-900 to-teal-950',
    investmentValue: '0.8 Triliun',
    laborPotential: 500,
    description: 'Hutan penyerap karbon, danau retensi banjir, taman rekreasi karyawan, dan koridor ekologis fauna lokal.',
    facilities: ['Danau Penampungan Air Hujan', 'Taman Energi Surya', 'Koridor Sepeda & Lari 15 km', 'Kebun Botani Biodiversitas'],
  },
  {
    id: 'fasum',
    name: 'Fasilitas Umum & Support Center',
    area: 30,
    color: '#EF4444',
    gradient: 'from-red-700 to-orange-900',
    investmentValue: '1.2 Triliun',
    laborPotential: 4000,
    description: 'Pusat administrasi KIIT, pos pemadam kebakaran terpadu, pusat kesehatan kawasan, instalasi pengolahan limbah (IPAL), dan gardu induk.',
    facilities: ['Instalasi Pengolahan Air Limbah Terpadu', 'Gardu Induk Listrik 150 KV', 'KIIT Integrated Command Center', 'Rumah Sakit & Pemadam Kebakaran Utama'],
  },
];

export const LAND_ACQUISITION_SEGMENTS: LandAcquisitionSegment[] = [
  {
    id: 'sudah_akuisisi',
    status: 'Acquired',
    label: 'Sudah Diakuisisi',
    area: 685,
    percentage: 68.5,
    color: '#0A335C', // Navy Tua Pekat
    description: 'Lahan yang telah sah dibayarkan, bersertifikat SHGB atas nama badan hukum pengelola KIIT, dan siap dilakukan land clearing.',
  },
  {
    id: 'dalam_negosiasi',
    status: 'Negotiation',
    label: 'Dalam Negosiasi',
    area: 140,
    percentage: 14.0,
    color: '#D4AF37', // Gold Premium
    description: 'Kesepakatan harga telah tercapai dengan pemilik lahan, sedang dalam penyelesaian berkas administrasi dan musyawarah desa.',
  },
  {
    id: 'due_diligence',
    status: 'DueDiligence',
    label: 'Due Diligence & Yuridis',
    area: 95,
    percentage: 9.5,
    color: '#6B7280', // Silver Platinum abu-abu
    description: 'Verifikasi kepemilikan fisik, pengukuran ulang BPN, pengecekan riwayat sengketa, dan kelayakan AMDAL.',
  },
  {
    id: 'proses_bayar',
    status: 'PaymentProcess',
    label: 'Proses Pembayaran/Konsinyasi',
    area: 50,
    percentage: 5.0,
    color: '#10B981', // Hijau Hijau
    description: 'Dana telah ditempatkan di rekening escrow bank kustodian atau diajukan konsinyasi di Pengadilan Negeri.',
  },
  {
    id: 'belum_proses',
    status: 'Unprocessed',
    label: 'Belum Diproses / Rencana Cadangan',
    area: 30,
    percentage: 3.0,
    color: '#EF4444', // Merah Accent
    description: 'Lahan rintangan, zona pemakaman adat, prasarana sosial yang dialihkan, atau area perluasan di luar batas desa utama.',
  },
];

export const INDUSTRIAL_CLUSTERS: IndustrialCluster[] = [
  {
    id: 'cluster-mfg',
    title: 'Klaster Manufaktur Modern 4.0',
    tagline: 'High-Tech, Precision, and Green Manufacturing',
    description: 'Dirancang untuk manufaktur tingkat lanjut dengan interkoneksi mesin-ke-mesin, kecerdasan buatan, dan efisiensi energi yang unggul.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    area: '350 Hektare',
    investmentPotential: 'Rp 18.5 Triliun',
    laborPotential: '28.000 Pekerja Ahli',
    economicValue: 'Rp 6.2 Triliun / Tahun',
    highlights: ['Robotik & Automasi Jalur Perakitan', 'Zero-Waste Water Discharge', 'Atap Panel Surya Pra-Pasang', 'Suplai Gas Industri Terintegrasi'],
  },
  {
    id: 'cluster-log',
    title: 'Smart Logistics Hub',
    tagline: 'Global Supply Chain Connection',
    description: 'Hub multimoda yang mengintegrasikan transit udara Bandara Kertajati, Tol Trans-Jawa, Pelabuhan Patimban, dan Jalur Kereta Api.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    area: '200 Hektare',
    investmentPotential: 'Rp 8.2 Triliun',
    laborPotential: '12.000 Operator & Analis',
    economicValue: 'Rp 3.5 Triliun / Tahun',
    highlights: ['Pergudangan Berautomasi (ASRS)', 'Depo Kontainer & Dry Port Terpadu', 'Sistem Kepabeanan Cepat (Fast Track)', 'Jaringan Distribusi 24/7'],
  },
  {
    id: 'cluster-aero',
    title: 'Kertajati Aerospace & MRO Town',
    tagline: 'Leading Aviation Maintenance and Manufacturing',
    description: 'Satu-satunya klaster aviasi terintegret yang berada di samping runway Bandara Internasional Kabupaten Majalengka (BIJB) Kertajati.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    area: '100 Hektare',
    investmentPotential: 'Rp 7.5 Triliun',
    laborPotential: '9.000 Teknisi Berlisensi',
    economicValue: 'Rp 4.1 Triliun / Tahun',
    highlights: ['Akses Apron Bandara Langsung', 'Fasilitas Pemeliharaan Badan Pesawat (MRO)', 'Manufaktur Suku Cadang Dirgantara', 'Sekolah Tinggi Aviasi'],
  },
  {
    id: 'cluster-ev',
    title: 'Silicon Valley Mobil Listrik (EV)',
    tagline: 'Driving Future Clean Mobility',
    description: 'Pusat akselerasi ekosistem kendaraan listrik mulai dari perakitan, penelitian, produksi baterai, hingga recycle komponen.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    area: '100 Hektare',
    investmentPotential: 'Rp 6.8 Triliun',
    laborPotential: '11.000 Ilmuwan & Mekatronika',
    economicValue: 'Rp 4.8 Triliun / Tahun',
    highlights: ['Atap Panel Surya Seluas 40 Ha', 'Pusat Uji Tabrak & Kualifikasi EV', 'Koneksi dengan Produsen Nikel Indonesia', 'Inkubasi Kendaraan Autonomos'],
  },
  {
    id: 'cluster-agro',
    title: 'Eco-Agro & Biological Processing',
    tagline: 'Sustainable Food & Health Innovation',
    description: 'Klaster pemrosesan modern hasil pertanian, hortikultura, bio-farmasi, serta pengemasan pangan higienis kelas ekspor.',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800',
    area: '80 Hektare',
    investmentPotential: 'Rp 3.1 Triliun',
    laborPotential: '8.000 Agri-tech & Food Scientist',
    economicValue: 'Rp 1.9 Triliun / Tahun',
    highlights: ['Gudang Pendingin Super (Amonia-Free)', 'Sertifikasi Halal & Ekspor Terintegrasi', 'Riset Bio-fertilizer & Pengurangan Emisi', 'Program Kemitraan Petani Lokal'],
  },
  {
    id: 'cluster-com',
    title: 'Kertajati CBD & Business District',
    tagline: 'The Financial Pulse of Kabupaten Majalengka’s Aero City',
    description: 'Kawasan perkantoran modern, perbankan, pelayanan satu pintu, akomodasi premium, ruang pameran, serta hunian pekerja.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    area: '70 Hektare',
    investmentPotential: 'Rp 4.5 Triliun',
    laborPotential: '6.000 Profesional Korporat',
    economicValue: 'Rp 2.2 Triliun / Tahun',
    highlights: ['Pusat Konvensi (MICE) 5.000 Pax', 'Sistem Keamanan Pusat Komando (C3)', 'Hotel Bintang 5 Berkelanjutan', 'Akses Transit Shuttles Bandara'],
  },
];

export const INVESTOR_DOCS: InvestorDoc[] = [
  {
    id: 'doc-fs',
    title: 'Studi Kelayakan KIIT (Feasibility Study) - Komprehensif',
    type: 'PDF',
    size: '42.8 MB',
    confidentiality: 'Confidential',
    category: 'Rencana Bisnis',
  },
  {
    id: 'doc-mp',
    title: 'KIIT Masterplan & Urban Design Guidelines (UDGL)',
    type: 'PDF',
    size: '118.5 MB',
    confidentiality: 'Restricted',
    category: 'Arsitektur & Konstruksi',
  },
  {
    id: 'doc-fp',
    title: 'Zonasi Finansial & Proyeksi Cash Flow 30 Tahun (V.2026)',
    type: 'XLSX',
    size: '18.2 MB',
    confidentiality: 'Confidential',
    category: 'Finansial & ROI',
  },
  {
    id: 'doc-amdal',
    title: 'Analisis Mengenai Dampak Lingkungan (AMDAL) Baru',
    type: 'PDF',
    size: '24.1 MB',
    confidentiality: 'Public',
    category: 'ESG & Regulasi',
  },
  {
    id: 'doc-pp',
    title: 'Investment Prospectus - Kertajati Industrial Town (EN/ID)',
    type: 'PPTX',
    size: '35.6 MB',
    confidentiality: 'Public',
    category: 'Prospektus Utama',
  },
  {
    id: 'doc-law',
    title: 'Surat Keputusan Bupati Kabupaten Majalengka & Perda KEK Kertajati',
    type: 'PDF',
    size: '15.4 MB',
    confidentiality: 'Public',
    category: 'Regulasi Pemerintah',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Kunjungan Delegasi Investor Shanghai Electric & BYD ke Area Inti KIIT',
    category: 'Kegiatan Investor',
    date: '18 May 2026',
    excerpt: 'Delegasi membahas rencana pembangunan giga-factory kendaraan listrik seluas 100 hektar di area Kertajati International Industrial Town.',
    content: 'MAJALENGKA — Dewan Direksi KIIT menyambut kunjungan delegasi tingkat tinggi dari Shanghai Electric Group Corporation dan BYD Auto Co., Ltd. Kunjungan lapangan ini didampingi oleh Pejabat Pemprov Kabupaten Majalengka untuk meninjau secara langsung gardu induk listrik 150 KV, jalur pipa transmisi gas bumi, serta infrastruktur relai jalan yang terhubung ke pintu Tol Kertajati Utama.\n\nDalam keterangannya, pimpinan rombongan menyatakan kepuasan atas kesiapan lahan KIIT yang bebas dari hambatan geografis dan hukum, serta memuji regulasi insentif fiskal dari pemerintah pusat untuk Kawasan Ekonomi Khusus (KEK). Rencana pendirian pabrik perakitan baterai lithium dijadwalkan akan masuk dalam fase detail engineering design (DED) pada kuartal ketiga tahun ini.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
  },
  {
    id: 'news-2',
    title: 'Pembebasan Lahan Klaster Utama Capai 68.5% dari Target Utama 1.000 Ha',
    category: 'Update Proyek',
    date: '02 May 2026',
    excerpt: 'Progres akuisisi lahan KIIT berjalan lancar tanpa sengketa berkat koordinasi sinergis dengan BPN, Pemkab Majalengka, dan masyarakat desa setempat.',
    content: 'MAJALENGKA — Satgas Pengadaan Tanah KIIT bersama Kantor Pertanahan BPN Majalengka melaporkan pencapaian penting. Hingga awal Mei 2026, total tanah tersertifikasi atas nama PT Kertajati International Town telah menyentuh angka 685 hektar.\n\nKeberhasilan ini didorong oleh pendekatan humanis ganti untung yang berkeadilan, disertai penyediaan kavling perumahan transisi dan program pelatihan penyerapan tenaga kerja lokal yang diarsiteki oleh manajemen KIIT. Kepala BPN Majalengka menyatakan komitmennya untuk menyelesaikan 14% sisa lahan yang kini sedang berstatus negosiasi dalam kurun waktu 90 hari mendatang demi mendukung target soft launching kawasan.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min read',
  },
  {
    id: 'news-3',
    title: 'BIJB Kertajati Operasionalkan Cargo Terminal Hub Terbesar Kedua di Indonesia',
    category: 'Perkembangan Kawasan',
    date: '14 April 2026',
    excerpt: 'Integrasi logistik apron bandara dengan koridor kargo pintar KIIT siap memangkas waktu dwell-time pelabuhan kargo udara hingga 40%.',
    content: 'KERTAJATI — Bandara Kertajati (BIJB) secara resmi menguji coba terminal kargo canggih berbasis cloud terintegrasi untuk rantai pasok berkecepatan tinggi. Fasilitas ini terkoneksi secara fisik dengan Klaster Aerospace & Logistik KIIT melaui "Aviation Smart Corridor" sepanjang 1.2 KM.\n\nDengan adanya koridor steril ini, peti kemas dari pesawat dapat langsung dipindahkan ke kawasan pergudangan KIIT dalam waktu kurang dari 20 menit tanpa melewati gerbang pemeriksaan umum luar bandara. Hal ini memberikan keunggulan kompetitif yang mutlak bagi produsen komponen bernilai tinggi, mikroelektronik, vaksin farmasi, dan produk perishables lainnya.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
  },
  {
    id: 'news-4',
    title: 'Pemerintah Kabupaten Majalengka Sahkan Aturan Tax Holiday Khusus Kertajati',
    category: 'Kerja Sama',
    date: '28 March 2026',
    excerpt: 'Bupati Kabupaten Majalengka menandatangani peraturan daerah mengenai pembebasan pajak dan insentif bea masuk bagi tenant manufaktur strategis di KIIT.',
    content: 'MAJALENGKA — Pemerintah Kabupaten Majalengka menyambut hangat komitmen investasi nasional dan asing yang masuk ke Kertajati International Industrial Town. Bupati Kabupaten Majalengka mengesahkan skema "Super Tax Holiday" 100% bebas pajak badan bagi korporasi yang menaruh kapital minimal Rp500 miliar di kawasan KIIT.\n\nSelain bebas pajak badan hingga 20 tahun, peraturan baru ini juga membebaskan retribusi daerah, memberikan diskon PBB selama tahap konstruksi, serta mempercepat pengurusan KITAS bagi pekerja asing ahli hingga maksimal 48 jam pengerjaan. Ini merupakan wujud dukungan penuh pemerintah demi menyejajarkan KIIT dengan kawasan industri tercanggih di Singapura, Vietnam, dan China.',
    image: 'https://images.unsplash.com/photo-1521791136368-1a46827d52bc?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
  },
];

export const ESG_THEMES: ESGTheme[] = [
  {
    id: 'esg-env',
    pillar: 'E',
    title: 'Environmental Stewardship',
    icon: 'Leaf',
    description: 'Menargetkan operasional kawasan Net-Zero Carbon pada 2035 melalui pemanfaatan energi terbersih dan sirkularitas sumber daya.',
    metrics: [
      { label: 'Energi Terbarukan', value: '100 MW Surya Atap terpasang pada 2028' },
      { label: 'Efisiensi Air', value: '95% Pengolahan Air Limbah Terbaur (Circular Recycle)' },
      { label: 'Keanekaragaman Hayati', value: '120 Ha Green Buffer Zone & Eco-Park Konservasi' },
      { label: 'Zero Waste', value: 'Sertifikasi Zero Waste to Landfill untuk seluruh pabrik pelopor' },
    ],
  },
  {
    id: 'esg-soc',
    pillar: 'S',
    title: 'Social Community Empowerment',
    icon: 'Users',
    description: 'Menjamin kemajuan bersama dengan memberdayakan masyarakat 12 desa penyangga di sekitar Kertajati dan Majalengka.',
    metrics: [
      { label: 'Pelatihan Kerja', value: 'KIIT Vocational Council melatih 5.000 pekerja lokal/tahun' },
      { label: 'Inklusi UMKM', value: 'Rp45 Miliar dana kemitraan bergulir bagi pengusaha daerah' },
      { label: 'Fasilitas Sosial', value: 'Pembangunan 3 Puskesmas modern & 5 Sekolah Kejuruan Aviasi' },
      { label: 'Standar Hidup', value: 'Rasio prioritas rekrutmen pekerja lokal di atas 75%' },
    ],
  },
  {
    id: 'esg-gov',
    pillar: 'G',
    title: 'Ethical Governance & Risk',
    icon: 'ShieldCheck',
    description: 'Menjunjung integritas kelas dunia melalui sistem perizinan satu pintu digital (OSS) tanpa gratifikasi dan berbasis tata kelola G20.',
    metrics: [
      { label: 'Transparansi Korupsi', value: 'Sertifikasi ISO 37001 Sistem Manajemen Anti Penyuapan' },
      { label: 'Digital Hub OSS', value: 'Sistem perizinan transparan real-time 100% terekam online' },
      { label: 'Mitigasi Risiko', value: 'Sistem Kesiapsiagaan Krisis Bencana gempa dan banjir berskala 9.0 SR' },
      { label: 'Stabilitas Finansial', value: 'Audit dwi-bulanan berkala oleh 4 Kantor Akuntan Publik global (Big 4)' },
    ],
  },
];

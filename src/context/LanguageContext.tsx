import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MasterplanZone, 
  LandAcquisitionSegment, 
  IndustrialCluster, 
  NewsArticle, 
  InvestorDoc, 
  ESGTheme 
} from '../types';

type Language = 'id' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  masterplanZones: MasterplanZone[];
  landAcquisitionSegments: LandAcquisitionSegment[];
  industrialClusters: IndustrialCluster[];
  investorDocs: InvestorDoc[];
  newsArticles: NewsArticle[];
  esgThemes: ESGTheme[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  id: {
    // Nav & Header
    'nav.tentang': 'Tentang',
    'nav.dashboard': 'Dashboard',
    'nav.masterplan': 'Masterplan',
    'nav.investasi': 'Investasi',
    'nav.lahan': 'Akuisisi Lahan',
    'nav.klaster': 'Klaster',
    'nav.gis': 'Peta GIS',
    'nav.esg': 'ESG',
    'nav.berita': 'Berita',
    'nav.kontak': 'Kontak',
    'nav.portal': 'Portal Investor',
    'nav.inquire': 'Hubungi Kami',
    'nav.secure_portal': '● PORTAL AMAN AKTIF',
    'nav.logout': 'Keluar',
    'nav.login': 'Masuk',

    // Hero Section
    'hero.badge': 'Gerbang Industri Masa Depan Kabupaten Majalengka',
    'hero.sub_brand': 'PEMKAB KABUPATEN MAJALENGKA • PT KERTAJATI INTERNATIONAL TOWN',
    'hero.brand_title1': 'KERTAJATI INTERNATIONAL',
    'hero.brand_title2': 'INDUSTRIAL TOWN',
    'hero.concept_sub': 'Kota Industri Terpadu Bertaraf Internasional di Jantung Kabupaten Majalengka',
    'hero.narrative': 'Kawasan ekonomi terpadu seluas 1.000 hektare yang dirancang strategis menjadi pusat manufaktur canggih, hub logistik pintar, aerospace & aviasi, industri kendaraan listrik (EV) masa depan, agroindustri modern, serta pusat bisnis bertaraf dunia.',
    'hero.btn_explore': 'Jelajahi Investasi',
    'hero.btn_masterplan': 'Lihat Masterplan',
    'hero.btn_prospectus': 'Unduh Prospektus',
    'hero.btn_schedule': 'Jadwalkan Pertemuan',
    'hero.bijb_badge_title': 'BIJB Kertajati Hub',
    'hero.bijb_badge_sub': 'Aviation corridor terhubung penuh.',
    'hero.bijb_badge_status': 'TERKONEKSI',
    'hero.bijb_badge_detail': 'Koridor 1.2 KM',

    // Tentang Section
    'about.caption': 'MEMPERKENALKAN KIIT • INVESTOR SUMMARY',
    'about.title': 'Hub Investasi Sektoral Terpadu di Segitiga Rebana',
    'about.description': 'Kertajati International Industrial Town (KIIT) diarsiteki khusus oleh konsorsium berkelas dunia bekerjasama dengan Pemerintah Kabupaten Majalengka untuk menjawab lonjakan permintaan basis produksi sirkular ramah lingkungan di koridor pasifik Indonesia.',
    'about.aero_title': 'Sinergi Aero-City',
    'about.aero_desc': 'Sistem zoning logistik modular yang terhubung fisik ke aviasi Internasional BIJB Kertajati, menjamin pemindahan suku cadang presisi & kargo berat tanpa dwell-time luar kawasan yang berbelit-belit.',
    'about.clean_title': 'Mandat Energi Bersih',
    'about.clean_desc': 'Menargetkan operasional terkarbonisasi netral pada 2035 dengan gardu kelistrikan panel surya photovoltaic lokal, pengelolaan lumpur IPAL tertutup, serta koridor taman asri penyerap emisi.',
    'about.status_label': 'Status Area Lahan',
    'about.status_value': 'Telah Disahkan sebagai KEK (Kawasan Ekonomi Khusus)',
    'about.btn_prospectus': 'Dapatkan Prospektus',
    'about.matrix_title': 'Matriks Konektivitas KIIT',
    'about.matrix_secure': '● 100% AMAN',
    'about.matrix_bijb_label': 'BIJB Kertajati Outer Apron',
    'about.matrix_bijb_val': 'Bersebelahan Langsung',
    'about.matrix_bijb_tag': 'Koridor Pintar',
    'about.matrix_toll_label': 'Pintu Tol Kertajati Utama',
    'about.matrix_toll_val': '3 Menit (1.5 KM)',
    'about.matrix_toll_tag': 'Akses Cipali',
    'about.matrix_port_label': 'Pelabuhan Laut Patimban Kabupaten Majalengka',
    'about.matrix_port_val': '45 Menit (40 KM)',
    'about.matrix_port_tag': 'Pengiriman Kargo',
    'about.matrix_bandung_label': 'Kota Metropolitan Bandung',
    'about.matrix_bandung_val': 'Tol Cisumdawu',
    'about.matrix_bandung_tag': '60 Menit',

    // KPIDash Section
    'kpi.caption': 'INDOMETER INVESTASI • REALTIME KPI',
    'kpi.title': 'Metrik Kinerja & Proyeksi Pasar KIIT',
    'kpi.description': 'Gambaran analitik terhadap nilai tambah ekonomi, kapasitas spasial, dan potensi finansial kota industri terpadu bertaraf global. Data diverifikasi oleh Bappeda, Dinas PMTSP Kabupaten Majalengka, dan tim appraisal independen.',
    'kpi.system_title': 'SISTEM TATA KELOLA',
    'kpi.system_value': 'KEK Kertajati Disetujui',
    'kpi.label_area': 'Kapasitas Area Kawasan',
    'kpi.sub_area': 'Status Masterplan Utama',
    'kpi.label_invest': 'Potensi Investasi Kumulatif',
    'kpi.sub_invest': 'Penanaman Modal Asing & Dalam Negeri',
    'kpi.label_rev': 'Proyeksi Pendapatan Pengelola',
    'kpi.sub_rev': 'Sewa Konsesi, Utilitas & Layanan Mandiri',
    'kpi.label_val': 'Valuasi Konsolidasi Kawasan',
    'kpi.sub_val': 'Nilai Buku Tanah & Infrastruktur Inti',
    'kpi.label_jobs': 'Penyerapan Tenaga Kerja Baru',
    'kpi.sub_jobs': 'Multi-sektor Industri & UMKM',
    'kpi.label_tenants': 'Target Tenant Industri Global',
    'kpi.sub_tenants': 'Skala Manufaktur, Logistik & Aerospace',
    'kpi.suffix_hectares': ' Hektare',
    'kpi.suffix_trillion': ' Triliun+',
    'kpi.suffix_jobs': ' Jiwa+',
    'kpi.suffix_companies': ' Perusahaan+',

    // Masterplan Section
    'mp.caption': 'PEMBAGIAN PILAR MASTERPLAN • 1.000 HEKTAR',
    'mp.title': 'Zoning Sektoral Terpadu Berkelas Dunia',
    'mp.description': 'Sentuh salah satu dari 9 zona pengoperasian di bawah peta interaktif ini untuk menganalisis jatah luas lahan, proyeksi ROI investasi kelayakan, kriteria serapan lapangan kerja, dan fasilitas penunjang yang tersedia.',
    'mp.total_area': 'Total Alokasi Lahan',
    'mp.hectares': 'Hektar',
    'mp.invest_val': 'Nilai Proyeksi Investasi',
    'mp.labor_pot': 'Potensi Tenaga Kerja',
    'mp.facilities_title': 'Fasilitas & Sistem Penunjang Khusus:',
    'mp.alert_select_zone': 'Ketuk salah satu zona zoning sektoral di sisi kiri untuk memproyeksikan rincian analisis kelayakan dinamis.',
    'mp.chart_title': 'Distribusi Spasial Zona KIIT',
    'mp.placeholder_title': 'Analisis Kelayakan Spasial Zona',

    // Investment Projections Section
    'ip.caption': 'SIMULATOR ROI & KELAYAKAN FINANSIAL • DIGITAL TWIN',
    'ip.title': 'Kalkulator Proyeksi CapEx & ROI Sewa Lahan',
    'ip.description': 'Sesuaikan parameter luas kavling industri dan estimasi tahun sewa untuk menghitung nilai investasi lahan secara dinamis, diskon insentif fiskal SEZ Kabupaten Majalengka, serta prediksi waktu balik modal (BEP).',
    'ip.param_title': 'Parameter Rencana Investasi',
    'ip.field_cluster': 'Klaster Industri Pilihan',
    'ip.field_area': 'Luas Kavling yang Dibutuhkan (Hektar)',
    'ip.field_period': 'Jangka Waktu Sewa (Tahun)',
    'ip.summary_title': 'Ikhtisar Estimasi Proyeksi Finansial',
    'ip.result_raw_rate': 'Nilai Sewa Dasar Kawasan',
    'ip.result_discount': 'Diskon Insentif KEK (Tax Holiday)',
    'ip.result_final_cost': 'Total Investasi Lahan',
    'ip.result_jobs': 'Estimasi Tenaga Kerja Terserap',
    'ip.result_bep': 'Prediksi Break-Even Point (ROI)',
    'ip.result_bep_suffix': ' Tahun',
    'ip.jobs_suffix': ' Pekerja',
    'ip.note_title': 'Catatan Protokol Otoritas PMTSP:',
    'ip.note_desc': 'Skema perhitungan di atas adalah estimasi indikatif. Suku bunga sewa riil dan pengajuan Tax Holiday/Free Import Duty wajib melalui verifikasi verifikator Kementerian Investasi/BKPM RI.',
    'ip.btn_apply': 'Ajukan Penilaian Lahan Resmi',

    // Land Acquisition Section
    'la.caption': 'TRANSPARANSI IMPLEMENTASI • LAND ACQUISITION',
    'la.title': 'Progres Pembebasan Lahan Inti KIIT',
    'la.description': 'Kami mengedepankan prinsip keterbukaan hukum sengketa dan transparansi fisik akomodasi lahan demi kelancaran ekspansi industri jangka panjang investor.',
    'la.status_card_title': 'Detail Segmen Tanah Masuk Sektor',
    'la.area_label': 'Luas Lahan',
    'la.pct_label': 'Persentase',
    'la.desc_label': 'Status Yuridis & Penanganan',
    'la.meta_title': 'Konsolidasi Agraria Pemkab Kabupaten Majalengka',
    'la.meta_sub': 'Verifikasi BPN & Pengadilan Negeri',
    'la.legend_title': 'Grafik Status Rinci Lahan 1.000 Ha',

    // Industrial Clusters Section
    'ic.caption': 'KLASTER UTAMA • INDUSTRIAL SECTORS',
    'ic.title': '6 Klaster Sektoral Berteknologi Tinggi',
    'ic.description': 'KIIT dikonseptualisasikan ke dalam enam zona modern bersebelahan dengan spesifikasi teknis khusus yang mendukung penuh efektivitas sirkular masing-masing sub-sektor.',
    'ic.metric_area': 'Total Luas',
    'ic.metric_potential': 'Potensi Investasi',
    'ic.metric_labor': 'Tenaga Kerja',
    'ic.metric_economic': 'Sirkulasi Nilai Ekonomi',
    'ic.highlight_header': 'Fitur Utama Klaster:',
    'ic.btn_inquire': 'Hubungi Manajer Klaster ini',

    // GIS Map Section
    'gis.caption': 'SISTEM GEOGRAFIS INFORMASI COCKPIT • GIS',
    'gis.title': 'Sistem Pemetaan GIS Interaktif KIIT',
    'gis.description': 'Akses pemetaan satelit real-time yang memproyeksikan interkoneksi fisik antara lahan 1.000 hektare KIIT, runway Cargo BIJB Kertajati, dan pertigaan simpang susun jalan tol Cipali.',
    'gis.hud_title': 'KIIT-GIS ENGINE V.3.1',
    'gis.btn_standard': 'Standar',
    'gis.btn_dark': 'Peta Gelap',
    'gis.btn_satellite': 'Satelit',
    'gis.controller_title': 'GIS Layer Controller',
    'gis.controller_desc': 'Gunakan tombol layer di bawah untuk menampilkan atau menyembunyikan elemen geospasial fisik kawasan industri.',
    'gis.source_label': 'Sumber Data',
    'gis.source_val': 'BPN Kabupaten Majalengka & BIG RI',
    'gis.verify_status': 'Satelit Terverifikasi',

    // ESG Section
    'esg.caption': 'MANDAT ESG • ZERO EMISSION 2035',
    'esg.title': 'Komitmen Keberlanjutan & Tata Kelola',
    'esg.description': 'KIIT memprioritaskan penyelarasan antara pertumbuhan industri berat, kesejahteraan masyarakat adat, dan penjagaan kualitas keanekaragaman lanskap hayati lokal.',
    'esg.pillar_title': 'Metrik Kepatuhan Hijau Pilar',
    'esg.audit_title': 'STATUS AUDIT ESG',
    'esg.audit_val': 'Peringkat AA (SGS Certified)',

    // Restrict Gate Banner
    'gate.badge': 'RESTRICTED AREA • DATA ROOM SECURE ACCESS',
    'gate.title': 'Membuka Dokumen Penilaian Kelayakan Finansial (Data Room)?',
    'gate.description': 'Berkas rahasia dan studi Amdal kami proteksi demi kerahasiaan pra-tahap proyek. Klik login investor di bawah dan gunakan username demo "kertajati" atau "admin" untuk membuka kunci sewa lahan dan download instan.',
    'gate.btn_login': 'MASUK PORTAL DATA ROOM',

    // Investor Doc / Private Center
    'inv.caption': 'DOKUMEN RAHASIA • SECURE DATA ROOM',
    'inv.title': 'Data Room & Dokumen Akses Terbatas',
    'inv.description': 'Akses eksklusif berkas legalitas, AMDAL komprehensif, desain teknik sipil terperinci, opsi persetujuan investasi sewa, serta instrumen transaksi formal lainnya.',
    'inv.not_logged_title': 'Data Room dalam Keadaan Terkunci',
    'inv.not_logged_desc': 'Guna mematuhi asas kerahasiaan korporasi penanaman modal dan regulasi OJK, dokumen sensitif seperti FS Finansial, AMDAL, dan Detail Zoning membutuhkan otorisasi kredensial login.',
    'inv.not_logged_btn': 'Buka Kunci Data Room',
    'inv.logged_welcome': 'Selamat Datang di SECURE DATA ROOM KIIT',
    'inv.logged_sub': 'Portal Otorisasi Utama Pemkab Kabupaten Majalengka',
    'inv.logged_alert': 'Akses Anda disetujui sebagai Delegasi Swasta. Seluruh unduhan berkas terdaftar otomatis dalam log keamanan Bappeda Majalengka.',
    'inv.field_search': 'Cari berkas...',
    'inv.col_doc': 'Dokumen',
    'inv.col_cat': 'Kategori',
    'inv.col_size': 'Ukuran',
    'inv.col_security': 'Keamanan',
    'inv.active_tenant_mgr': 'Manajer Penyewaan Aktif',
    'inv.active_tenant_desc': 'Silakan ajukan konsultasi tatap muka online dengan tim verifikator investasi Kabupaten Majalengka untuk membahas insentif, kavling murni, spesifikasi gudang kustom, atau Joint Venture.',
    'inv.schedule_consult': 'Jadwalkan Konsultasi Sekarang',
    'inv.no_docs_found': 'Tidak ada berkas yang cocok dengan pencarian Anda.',

    // Contact Footer Section
    'contact.caption': 'HUBUNGI TIM INTEGRASI INVESTASI • INQUIRE NOW',
    'contact.title': 'Mulai Kerja Sama Investasi Anda Hari Ini',
    'contact.description': 'Siap melakukan ekspansi pabrik atau meninjau lahan secara langsung? Hubungi perwakilan direksi kami di Majalengka atau Bandung untuk pendampingan inspeksi fisik lapangan.',
    'contact.form_title': 'Formulir Hubungan Investor Rasio Menengah',
    'contact.form_subtitle': 'Seluruh pengaduan dan pemesanan survei fisik akan direspon oleh tim Humas Pemkab Kabupaten Majalengka dalam 24 jam.',
    'contact.field_name': 'Nama Lengkap Anda',
    'contact.field_email': 'Alamat Email Perusahaan',
    'contact.field_corp': 'Nama Korporasi / Institusi',
    'contact.field_scale': 'Rencana Skala Kapital',
    'contact.field_message': 'Pesan Kebutuhan Spesifik',
    'contact.btn_send': 'KIRIM FORMULIR SURVEI RESMI',
    'contact.info_title': 'PT Kertajati International Town',
    'contact.office_hq': 'HQ: Gedung Menara Sate Lt. 3, Bandung, Kabupaten Majalengka, Indonesia',
    'contact.office_site': 'Site Off: Jl. Kertajati Raya KM 1.5, Majalengka, Kabupaten Majalengka, Indonesia',
    'contact.badge_release': 'Rilis Resmi Terakreditasi BKPM RI',

    // Modals
    'modal.login_title': 'Portal Login KEK Kertajati',
    'modal.login_desc': 'Masukkan akun otorisasi yang divalidasi oleh Humas KIIT dan Dinas PMTSP Kabupaten Majalengka untuk mengakses Secure Data Room.',
    'modal.login_err_empty': 'Kredensial wajib diisi.',
    'modal.login_err_wrong': 'Username atau sandi salah - Gunakan "kertajati" atau "admin" untuk simulasi.',
    'modal.field_user': 'DIREKTORAL USERNAME *',
    'modal.field_user_placeholder': 'Ketikan: admin atau kertajati',
    'modal.field_pw': 'SANDI KATA KUNCI (PASSWORD) *',
    'modal.field_pw_placeholder': 'Ketikan sembarang kata sandi',
    'modal.login_tip': 'Petunjuk Bupati Kabupaten Majalengka Presentation: Untuk simulasi login, ketikan "admin" / "kertajati" pada kolom username di atas dan isi sandi bebas.',
    'modal.btn_authorize': 'OTORISASI PORTAL SECURE DATA ROOM',
    
    'modal.prop_title': 'Dapatkan Prospektus Utama (EN/ID)',
    'modal.prop_desc': 'Rincian target ROI, insentif fiskal BKPM Kabupaten Majalengka, dan pembagian pilar zona masterplan 1.000 Ha dalam satu dokumen presentasi resmi.',
    'modal.prop_err': 'Nama Lengkap, Perusahaan, Kontak, dan Alamat Email Korporasi wajib diisi.',
    'modal.field_prop_name': 'Nama Lengkap Anda *',
    'modal.field_prop_name_placeholder': 'Raditya Widjaya',
    'modal.field_prop_company': 'Nama Perusahaan / Korporasi *',
    'modal.field_prop_company_placeholder': 'PT Widjaya Global Group',
    'modal.field_prop_phone': 'Nomor Handphone / WhatsApp *',
    'modal.field_prop_phone_placeholder': '+62 812-3456-7890',
    'modal.field_prop_email': 'Email Korporasi *',
    'modal.field_prop_email_placeholder': 'raditya@widjayagroup.com',
    'modal.field_prop_interest': 'Rencana Bidang Investasi',
    'modal.field_prop_interest_placeholder': 'Direct Investment (Tenant Pabrik)',
    'modal.prop_success_title': 'Prospektus Siap Diunduh!',
    'modal.prop_success_desc': 'Tautan file PDF prospektus utama KIIT (35.6 MB) dikirimkan secara otomatis menuju email {email}. Sembari itu, anda juga bisa membuka file PDF-nya secara instan dengan menekan tombol unduh di bawah ini.',
    'modal.prop_btn_download': 'Unduh Dokumen PDF Utama',

    // Economic Impact
    'eco.caption': 'DAMPAK SOSIAL & MAKRO EKONOMI • REGIONAL IMPACT',
    'eco.title': 'Proyeksi Kontribusi Makro Ekonomi Kabupaten Majalengka',
    'eco.description': 'KIIT dirancang untuk menjadi katalisator pertumbuhan PDRB regional dan akselerator transisi pekerja sektor agraria menuju sektor industri bernilai tambah tinggi.',
    'eco.gdp_title': 'Kontribusi PDRB Kabupaten Majalengka (2028-2035)',
    'eco.jobs_title': 'Penyerapan Tenaga Kerja (Pekerja)',
    'eco.timeline_title': 'Infrastruktur Pelayanan Penunjang',
    'eco.timeline_step1': 'Pembersihan Lahan & Land Clearing',
    'eco.timeline_step1_sub': 'Kuartal 1 2026 • 685 Ha Siap Bangun',
    'eco.timeline_step2': 'Selesai Gardu Induk 150 KV',
    'eco.timeline_step2_sub': 'Kuartal 3 2026 • Kerjasama PLN & PGAS',
    'eco.timeline_step3': 'Operasional Aviation Corridor BIJB',
    'eco.timeline_step3_sub': 'Kuartal 1 2027 • Sterilisasi Jalur Kargo Antar Kawasan',
    'eco.timeline_step4': 'Soft Launching Klaster 1 & 2',
    'eco.timeline_step4_sub': 'Kuartal 3 2027 • Komitmen Tenant Pertama',

    // News Section
    'news.caption': 'PORTAL BERITA RESMI • INVESTMENT MEDIA CENTER',
    'news.title': 'Berita & Media Terkini KIIT',
    'news.description': 'Ikuti perkembangan up-to-date pengerjaan pembersihan lahan, perizinan pemerintah, penandatanganan Letter of Intent dengan tenant industri global, dan progres pembangunan infrastruktur gardu kelistrikan.',
    'news.search_placeholder': 'Cari rilis berita...',
    'news.read_more': 'Baca Rilis Selengkapnya',
    'news.modal_author': 'Oleh: Humas PT Kertajati International Town',
    'news.modal_published': 'Terbit:',
    'news.modal_phase': 'Fase:',
    'news.modal_footer': '© PT KIIT MEDIA HUB 2100',
    'news.no_match': 'Tidak ada berita yang cocok',
    'news.no_match_desc': 'Ubah pencarian atau bersihkan filter parameter kategori di atas.'
  },
  en: {
    // Nav & Header
    'nav.tentang': 'About',
    'nav.dashboard': 'Dashboard',
    'nav.masterplan': 'Masterplan',
    'nav.investasi': 'Investment',
    'nav.lahan': 'Land Acquisition',
    'nav.klaster': 'Sectors',
    'nav.gis': 'GIS Map',
    'nav.esg': 'ESG',
    'nav.berita': 'News',
    'nav.kontak': 'Contact',
    'nav.portal': 'Investor Portal',
    'nav.inquire': 'Inquire Now',
    'nav.secure_portal': '● SECURE PORTAL ACTIVE',
    'nav.logout': 'Log Out',
    'nav.login': 'Log In',

    // Hero Section
    'hero.badge': 'The Future Gate of Kabupaten Majalengka Industrial Growth',
    'hero.sub_brand': 'KABUPATEN MAJALENGKA REGENCY GOVERNMENT • PT KERTAJATI INTERNATIONAL TOWN',
    'hero.brand_title1': 'KERTAJATI INTERNATIONAL',
    'hero.brand_title2': 'INDUSTRIAL TOWN',
    'hero.concept_sub': 'World-Class Integrated Industrial Town at the Heart of Kabupaten Majalengka',
    'hero.narrative': 'A 1,000-hectare integrated economic zone strategically designed to become a hub for advanced manufacturing, smart logistics, aerospace & aviation, future electric vehicles (EV), modern agro-industry, and premium business districts.',
    'hero.btn_explore': 'Explore Investments',
    'hero.btn_masterplan': 'View Masterplan',
    'hero.btn_prospectus': 'Download Prospectus',
    'hero.btn_schedule': 'Schedule Meeting',
    'hero.bijb_badge_title': 'BIJB Kertajati Hub',
    'hero.bijb_badge_sub': 'Aviation corridor fully integrated.',
    'hero.bijb_badge_status': 'CONNECTED',
    'hero.bijb_badge_detail': '1.2 KM Corridor',

    // Tentang Section
    'about.caption': 'INTRODUCING KIIT • INVESTOR SUMMARY',
    'about.title': 'Integrated Sectoral Investment Hub in Rebana Triangle',
    'about.description': 'Kertajati International Industrial Town (KIIT) is custom-designed by world-class consortiums in collaboration with the Kabupaten Majalengka Regency Government to answer the surging demand for eco-friendly, circular manufacturing bases in Indonesia\'s active Pacific corridor.',
    'about.aero_title': 'Aero-City Synergy',
    'about.aero_desc': 'Modular logistics zoning connected physically to BIJB Kertajati International aviation, guaranteeing frictionless precision spare parts and heavy cargo transfer without complex exterior port dwell times.',
    'about.clean_title': 'Clean Energy Mandates',
    'about.clean_desc': 'Targeting Net-Zero carbon operations by 2035 with a local network of photovoltaic solar-powered substations, enclosed wastewater management, and lush green carbon-sink corridors.',
    'about.status_label': 'Land Area Status',
    'about.status_value': 'Officially Designated as SEZ (Special Economic Zone)',
    'about.btn_prospectus': 'Get Prospectus',
    'about.matrix_title': 'KIIT Connectivity Matrix',
    'about.matrix_secure': '● 100% SECURE',
    'about.matrix_bijb_label': 'BIJB Kertajati Outer Apron',
    'about.matrix_bijb_val': 'Directly Adjacent',
    'about.matrix_bijb_tag': 'Smart Corridor',
    'about.matrix_toll_label': 'Main Kertajati Toll Gate',
    'about.matrix_toll_val': '3 Mins (1.5 KM)',
    'about.matrix_toll_tag': 'Cipali Access',
    'about.matrix_port_label': 'Kabupaten Majalengka Patimban Seaport',
    'about.matrix_port_val': '45 Mins (40 KM)',
    'about.matrix_port_tag': 'Cargo Shipping',
    'about.matrix_bandung_label': 'Bandung Metropolitan City',
    'about.matrix_bandung_val': 'Cisumdawu Toll',
    'about.matrix_bandung_tag': '60 Mins',

    // KPIDash Section
    'kpi.caption': 'INVESTMENT METRICS • REALTIME KPI',
    'kpi.title': 'KIIT Performance Metrics & Market Projections',
    'kpi.description': 'Analytical dashboard of economic value add, spatial capacity, and financial potential of a global-scale integrated industrial city. Data officially verified by Bappeda, Kabupaten Majalengka DPMPTSP, and independent appraisal entities.',
    'kpi.system_title': 'GOVERNANCE SYSTEM',
    'kpi.system_value': 'Kertajati SEZ Approved',
    'kpi.label_area': 'Estate Land Capacity',
    'kpi.sub_area': 'Core Masterplan Status',
    'kpi.label_invest': 'Cumulative Investment Potential',
    'kpi.sub_invest': 'Foreign & Domestic Direct Investment',
    'kpi.label_rev': 'Operator Projected Revenue',
    'kpi.sub_rev': 'Concession Leases, Utilities & Self Services',
    'kpi.label_val': 'Consolidated Estate Valuation',
    'kpi.sub_val': 'Book Value of Land & Core Infrastructure',
    'kpi.label_jobs': 'New Job Opportunities Created',
    'kpi.sub_jobs': 'Multi-sector Industry & MSME Absorption',
    'kpi.label_tenants': 'Target Global Industrial Tenants',
    'kpi.sub_tenants': 'Manufacturing, Logistics & Aerospace Scales',
    'kpi.suffix_hectares': ' Hectares',
    'kpi.suffix_trillion': ' Trillion+',
    'kpi.suffix_jobs': ' Jobs+',
    'kpi.suffix_companies': ' Companies+',

    // Masterplan Section
    'mp.caption': 'MASTERPLAN PILLAR SEGMENTATION • 1,000 HECTARES',
    'mp.title': 'World-Class Sectoral Integrated Zoning',
    'mp.description': 'Select one of the 9 operational zones below on the interactive blueprint to analyze allocated land size, projected valuation, labor absorption criteria, and dedicated facilities.',
    'mp.total_area': 'Total Land Allocation',
    'mp.hectares': 'Hectares',
    'mp.invest_val': 'Projected Investment Value',
    'mp.labor_pot': 'Labor Absorption Capacity',
    'mp.facilities_title': 'Dedicated Support Systems & Facilities:',
    'mp.alert_select_zone': 'Select a zoning sector on the left blueprint to view dynamic, real-time feasibility analysis.',
    'mp.chart_title': 'Spatial Distribution of KIIT Zones',
    'mp.placeholder_title': 'Spatial Zone Feasibility Analysis',

    // Investment Projections Section
    'ip.caption': 'ROI SIMULATOR & FINANCIAL FEASIBILITY • DIGITAL TWIN',
    'ip.title': 'Projected CapEx & Land Lease ROI Calculator',
    'ip.description': 'Adjust the parameters of the industrial lot size and lease duration to calculate indicative estate investment value, Kabupaten Majalengka SEZ fiscal incentive discounts, and payback period (BEP).',
    'ip.param_title': 'Planned Investment Parameters',
    'ip.field_cluster': 'Preferred Industrial Cluster',
    'ip.field_area': 'Required Lot Size (Hectares)',
    'ip.field_period': 'Lease Duration (Years)',
    'ip.summary_title': 'Financial Projections Summary',
    'ip.result_raw_rate': 'Base Estate Lease Value',
    'ip.result_discount': 'SEZ Incentive Discount (Tax Holiday)',
    'ip.result_final_cost': 'Total Land Investment',
    'ip.result_jobs': 'Estimated Jobs Absorbed',
    'ip.result_bep': 'Projected Break-Even Point (ROI)',
    'ip.result_bep_suffix': ' Years',
    'ip.jobs_suffix': ' Workers',
    'ip.note_title': 'DPMPTSP Authority Protocol Notes:',
    'ip.note_desc': 'The above projection is indicative. Real lease rates and Tax Holiday/Free Import Duty applications require official approval via Ministry of Investment / BKPM RI representatives.',
    'ip.btn_apply': 'Apply for Official Land Assessment',

    // Land Acquisition Section
    'la.caption': 'IMPLEMENTATION TRANSPARENCY • LAND ACQUISITION',
    'la.title': 'KIIT Core Land Acquisition Progress',
    'la.description': 'We prioritize legally sound title clearance and complete agrarian transparency to safeguard our investors\' long-term business expansions.',
    'la.status_card_title': 'Sectored Land Segment Details',
    'la.area_label': 'Land Area',
    'la.pct_label': 'Percentage',
    'la.desc_label': 'Legal Status & Mitigation',
    'la.meta_title': 'Kabupaten Majalengka Agrarian Consolidation',
    'la.meta_sub': 'BPN & District Court Authentication',
    'la.legend_title': 'Detailed Progress Chart of 1,000 Ha Liveland',

    // Industrial Clusters Section
    'ic.caption': 'CORE SECTORS • INDUSTRIAL CLUSTERS',
    'ic.title': '6 High-Tech Sectoral Clusters',
    'ic.description': 'KIIT is conceptualized into six highly sophisticated clusters positioned side-by-side with customized technical infrastructure supporting circular workflows.',
    'ic.metric_area': 'Total Area',
    'ic.metric_potential': 'Investment Potential',
    'ic.metric_labor': 'Labor Force',
    'ic.metric_economic': 'Economic Value Flow',
    'ic.highlight_header': 'Core Cluster Capabilities:',
    'ic.btn_inquire': 'Contact Cluster Manager',

    // GIS Map Section
    'gis.caption': 'GEOGRAPHICAL INFORMATION GIS CONTROL PANEL',
    'gis.title': 'Interactive GIS Mapping Network of KIIT',
    'gis.description': 'Interact with real-time satellite mapping projecting physical connections between KIIT\'s 1,000 Ha lot land, BIJB Cargo Runway gates, and Cipali direct expressway tolls.',
    'gis.hud_title': 'KIIT-GIS ENGINE V.3.1',
    'gis.btn_standard': 'Standard Map',
    'gis.btn_dark': 'Dark Grid Map',
    'gis.btn_satellite': 'Satellite Map',
    'gis.controller_title': 'GIS Layer Controller',
    'gis.controller_desc': 'Toggle layers below to visualize exact spatial, infrastructural, and regulatory boundaries.',
    'gis.source_label': 'Data Authority',
    'gis.source_val': 'BPN Kabupaten Majalengka & BIG RI',
    'gis.verify_status': 'Verified Satellite Feed',

    // ESG Section
    'esg.caption': 'ESG INTEGRITY • NET ZERO EMISSION 2035',
    'esg.title': 'Ethical Sustainability Commitments',
    'esg.description': 'KIIT strictly balances heavy industrial scaling, agrarian preserve zones, and empowering custom local communities nested in surrounding districts.',
    'esg.pillar_title': 'Pillar Sustainable Metric Scorecard',
    'esg.audit_title': 'ESG AUDIT RANKING',
    'esg.audit_val': 'AA Score (SGS Certified)',

    // Restrict Gate Banner
    'gate.badge': 'RESTRICTED AREA • DATA ROOM SECURE ACCESS',
    'gate.title': 'Unlock Private Financial Appraisal Documents (Secure Data Room)?',
    'gate.description': 'Committed to ultimate investor confidentiality, pre-stage project files and environment impact studies are strictly protected. Click login and input username "kertajati" or "admin" to view financial logs and trigger direct downloads.',
    'gate.btn_login': 'LOG IN TO SECURE DATA ROOM',

    // Investor Doc / Private Center
    'inv.caption': 'CONFIDENTIAL ARCHIVES • SECURE DATA ROOM',
    'inv.title': 'Secure Data Room & Private Documentation',
    'inv.description': 'Exclusive repository of legal authorizations, EIA (AMDAL) studies, microcivils layouts, formal land lease draft agreements, and corporate financing instruments.',
    'inv.not_logged_title': 'The Data Room Is Locked',
    'inv.not_logged_desc': 'Under strict regulatory audit covenants and local investment commission pacts, access to draft FS, full geological reports, and block-plan specs requires authorized credentials.',
    'inv.not_logged_btn': 'Unlock Data Room Compartments',
    'inv.logged_welcome': 'Welcome to KIIT SECURE DATA ROOM',
    'inv.logged_sub': 'Kabupaten Majalengka Primary Authorized Portal',
    'inv.logged_alert': 'Acess Granted as Investment Delegate. All document actions and downloads are safely logged with Majalengka Bappeda Security Agency.',
    'inv.field_search': 'Search files...',
    'inv.col_doc': 'Artifact',
    'inv.col_cat': 'Category',
    'inv.col_size': 'Storage Size',
    'inv.col_security': 'Access Clearance',
    'inv.active_tenant_mgr': 'Leasing Officer Desk',
    'inv.active_tenant_desc': 'Schedule an online consultation with Kabupaten Majalengka investment evaluators to discuss joint ventures, bespoke warehouse customizations, pure lot pricing, or tax exemption filings.',
    'inv.schedule_consult': 'Schedule Consultation Now',
    'inv.no_docs_found': 'No matching artifacts located.',

    // Contact Footer Section
    'contact.caption': 'CONTACT INTEGRATED INVESTOR DEPT • INQUIRE NOW',
    'contact.title': 'Partner with KIIT Today',
    'contact.description': 'Ready to establish industrial presence or request a physically escorted site visit? Get in touch with our investment directorates in Bandung or Majalengka.',
    'contact.form_title': 'Medium Scale Corporate Inquiry Desk',
    'contact.form_subtitle': 'All formal assessments and site tour inquiries will be responded to by the Kabupaten Majalengka PMTSP board within 24 hours.',
    'contact.field_name': 'Your Full Name',
    'contact.field_email': 'Corporate Email Address',
    'contact.field_corp': 'Corporate / Institution Name',
    'contact.field_scale': 'Planned Capital Scale',
    'contact.field_message': 'Bespoke Infrastructure Needs',
    'contact.btn_send': 'SUBMIT OFFICIAL INQUIRY FORM',
    'contact.info_title': 'PT Kertajati International Town',
    'contact.office_hq': 'HQ: Gedung Menara Sate 3rd Fl, Bandung, Kabupaten Majalengka, Indonesia',
    'contact.office_site': 'Site Off: Jl. Kertajati Raya KM 1.5, Majalengka, Kabupaten Majalengka, Indonesia',
    'contact.badge_release': 'BKPM RI Accredited Release Agency',

    // Modals
    'modal.login_title': 'Kertajati SEZ Access Portal',
    'modal.login_desc': 'Provide the authorization accounts approved by KIIT Relations and Kabupaten Majalengka DPMPTSP to unlock the Secure Data Room.',
    'modal.login_err_empty': 'Authorized credentials are required.',
    'modal.login_err_wrong': 'Invalid credentials value. Use "kertajati" or "admin" for simulation login.',
    'modal.field_user': 'DIRECTORATE USERNAME *',
    'modal.field_user_placeholder': 'Type: admin or kertajati',
    'modal.field_pw': 'PORTAL PASSCODE (PASSWORD) *',
    'modal.field_pw_placeholder': 'Type any arbitrary password string',
    'modal.login_tip': 'Bupati Presentation Cheat-Sheet: To simulate a live auth, provide "admin" or "kertajati" as username and any password string.',
    'modal.btn_authorize': 'OAUTH DIRECT DATA ROOM GATEWAY',
    
    'modal.prop_title': 'Download Core Executive Prospectus (EN/ID)',
    'modal.prop_desc': 'Direct ROI projections, Kabupaten Majalengka BKPM financial tax holiday details, and structural 1,000 Ha zoning maps packaged in a professional kit.',
    'modal.prop_err': 'Full Name, Company, Contact Phone, and Corporate Email are mandatory.',
    'modal.field_prop_name': 'Your Full Name *',
    'modal.field_prop_name_placeholder': 'Raditya Widjaya',
    'modal.field_prop_company': 'Company / Institution Name *',
    'modal.field_prop_company_placeholder': 'Widjaya Global Group Corp',
    'modal.field_prop_phone': 'Contact WhatsApp / Phone *',
    'modal.field_prop_phone_placeholder': '+62 812-3456-7890',
    'modal.field_prop_email': 'Corporate Email *',
    'modal.field_prop_email_placeholder': 'raditya@widjayagroup.com',
    'modal.field_prop_interest': 'Strategic Partnership Category',
    'modal.field_prop_interest_placeholder': 'Direct Investment (Tenant Pabrik)',
    'modal.prop_success_title': 'Executive Prospectus Ready!',
    'modal.prop_success_desc': 'A direct download token for KIIT principal documentation (35.6 MB PDF) is dispatched to {email}. You can also fetch the document immediately using the trigger below.',
    'modal.prop_btn_download': 'Instantly Download PDF Document',

    // Economic Impact
    'eco.caption': 'SOCIAL & MACRO ECONOMIC GROWTH • REGIONAL IMPACT',
    'eco.title': 'Kabupaten Majalengka Macroeconomic Structural Contribution',
    'eco.description': 'KIIT is modeled as the primary regional GRDP booster, accelerating the skill transition of regional agrarian workforces into higher-grade industrial careers.',
    'eco.gdp_title': 'Projected Kabupaten Majalengka GRDP Contribution (2028-2035)',
    'eco.jobs_title': 'Projected Local Civil Career Absorption (Personnel)',
    'eco.timeline_title': 'Infrastructure Service Mileposts',
    'eco.timeline_step1': 'Agrarian Access Clearing & Priming',
    'eco.timeline_step1_sub': 'Q1 2026 • 685 Ha Ground clearing approved',
    'eco.timeline_step2': 'PLN 150 KV Substation Complete',
    'eco.timeline_step2_sub': 'Q3 2026 • Joint construction with PGAS natural gas delivery lines',
    'eco.timeline_step3': 'BIJB Flight Smart Corridor Active',
    'eco.timeline_step3_sub': 'Q1 2027 • Sterilized rapid custom-bonded cargo zone',
    'eco.timeline_step4': 'Soft Launching Phases 1 & 2',
    'eco.timeline_step4_sub': 'Q3 2027 • Anchor tenant industrial setup milestone',

    // News Section
    'news.caption': 'OFFICIAL RELEASES REPORT • INVESTMENT MEDIA CENTER',
    'news.title': 'Offical Updates & Bulletins',
    'news.description': 'Stay completely up-to-date with ground-clearings works, regulatory enhancements, Letter of Intent pacts signed by global partners, and electrical grid timelines.',
    'news.search_placeholder': 'Search active reports...',
    'news.read_more': 'Read Full Release report',
    'news.modal_author': 'Written by: Public Relations PT Kertajati International Town',
    'news.modal_published': 'Released:',
    'news.modal_phase': 'Phase:',
    'news.modal_footer': '© PT KIIT MEDIA HUB 2100',
    'news.no_match': 'No articles found matching criteria',
    'news.no_match_desc': 'Update search phrase or reset selected filters.'
  }
};

// Raw localized dataset generators
const getMasterplanZones = (lang: Language): MasterplanZone[] => [
  {
    id: 'manufaktur',
    name: lang === 'id' ? 'Kawasan Manufaktur High-Tech' : 'High-Tech Manufacturing Zone',
    area: 350,
    color: '#0F2942',
    gradient: 'from-blue-900 to-indigo-950',
    investmentValue: lang === 'id' ? '18.5 Triliun' : '18.5 Trillion',
    laborPotential: 28000,
    description: lang === 'id' 
      ? 'Kawasan manufaktur presisi modern, ramah lingkungan, siap untuk industri 4.0 dengan konektivitas IoT terintegrasi.'
      : 'Modern, eco-friendly precision manufacturing hub structured for Industry 4.0 with fully built-in IoT connectivity.',
    facilities: lang === 'id' 
      ? ['Listrik Premium Tanpa Berkedip', 'Pengolahan Air Bersih Mandiri', 'Fiber Optik Gigaspeed', 'Akses Langsung Tol & Cargo Port']
      : ['Flicker-Free Premium Grid Line', 'Independent Clean Water Plant', 'Gigaspeed Fiber Optic', 'Direct Toll road & Air-Cargo Access'],
  },
  {
    id: 'logistik',
    name: lang === 'id' ? 'Pusat Logistik & Pergudangan Terpadu' : 'Integrated Logistics & Smart Warehousing Hub',
    area: 200,
    color: '#D4AF37',
    gradient: 'from-amber-600 to-yellow-500',
    investmentValue: lang === 'id' ? '8.2 Triliun' : '8.2 Trillion',
    laborPotential: 12000,
    description: lang === 'id'
      ? 'Pusat pergudangan pintar, dry port, cold storage, dan rantai pasok dengan integrasi digital bea cukai satu atap.'
      : 'Automated warehouse yards, dry port bays, cold rooms storage, and supply chains linked to single window custom terminals.',
    facilities: lang === 'id'
      ? ['Gudang Pintar Ber-AC', 'Sistem Bea Cukai SATU ATAP', 'Pusat Distribusi Regional', 'Area Parkir Truk Raksasa']
      : ['AC Automated Warehouse Units', 'One-Stop Customs Interface', 'Regional Distribution Center', 'Oversized Corporate Truck Complex'],
  },
  {
    id: 'aerospace',
    name: lang === 'id' ? 'Aerospace & Aviation Town' : 'Aerospace & Aviation Town',
    area: 100,
    color: '#1E3A8A',
    gradient: 'from-sky-800 to-indigo-900',
    investmentValue: lang === 'id' ? '7.5 Triliun' : '7.5 Trillion',
    laborPotential: 9000,
    description: lang === 'id'
      ? 'Pusat perawatan & perbaikan pesawat (MRO), manufaktur suku cadang aviasi, dan logistik kargo bandara Kertajati.'
      : 'Aviation Maintenance and Overhaul (MRO) yards, fuselage/structural parts manufacture, and direct aero-freight integrations.',
    facilities: lang === 'id'
      ? ['Akses Apron Bandara Terbuka', 'Hanggar Perawatan Boeing & Airbus', 'Pusat Presisi Logistik Dirgantara', 'Akademi Penerbangan Partner']
      : ['Open Apron Runway Access Point', 'Boeing & Airbus Certified Hangars', 'Aero Logistics Precision Facility', 'Partner Technical Aviation Academy'],
  },
  {
    id: 'ev',
    name: lang === 'id' ? 'Ekosistem Kendaraan Listrik (EV)' : 'Electric Vehicle (EV) Ecosystem Block',
    area: 100,
    color: '#10B981',
    gradient: 'from-emerald-700 to-teal-900',
    investmentValue: lang === 'id' ? '6.8 Triliun' : '6.8 Trillion',
    laborPotential: 11000,
    description: lang === 'id'
      ? 'Kawasan khusus perakitan kendaraan listrik, produksi baterai lithium-ion, dan komponen pendukung mobilitas masa depan.'
      : 'Specialized zone for electric vehicle assembly lines, lithium battery production, and future mechatronics mobility components.',
    facilities: lang === 'id'
      ? ['Giga Power Supply Station', 'Pusat Uji Coba Baterai EV', 'Infrastruktur Pengisian Daya Hijau', 'Laboratorium R&D Bersama']
      : ['Giga Power Supply Substations', 'EV Cells Abuse & Lab Testing Facility', 'Green Solar Grid Refueling Hub', 'Joint Enterprise R&D Headquarters'],
  },
  {
    id: 'agro',
    name: lang === 'id' ? 'Agro-Industri Modern & Pengolahan Makanan' : 'Modern Agro-Industry & Food Processing',
    area: 80,
    color: '#84CC16',
    gradient: 'from-lime-600 to-green-850',
    investmentValue: lang === 'id' ? '3.1 Triliun' : '3.1 Trillion',
    laborPotential: 8000,
    description: lang === 'id'
      ? 'Pusat pengolahan hasil bumi berstandar ekspor, cold chain logistics, pengemasan steril, dan inkubasi agro-teknologi.'
      : 'Export-grade crop yields processing center, nitrogen-based cold lines, sterile speed packagers, and bio-tech agrarian incubators.',
    facilities: lang === 'id'
      ? ['Laboratorium Higienitas Pangan', 'Gudang Pendingin Super (Cold Room)', 'Sentra Pengemasan Otomatis', 'Pusat Riset Bio-Teknologi']
      : ['Food Hygiene Testing Lab', 'Super-Cold Giga Rooms (Ammonia-Free)', 'Automated Sterile Speed Packaging', 'Agricultural Research & Development Bio-Facility'],
  },
  {
    id: 'komersial',
    name: lang === 'id' ? 'KIIT Business District & Komersial' : 'KIIT CBD & Commercial District',
    area: 70,
    color: '#8B5CF6',
    gradient: 'from-purple-800 to-violet-950',
    investmentValue: lang === 'id' ? '4.5 Triliun' : '4.5 Trillion',
    laborPotential: 6000,
    description: lang === 'id'
      ? 'Kawasan perkantoran modern, hotel bintang lima, pusat konvensi pameran industri (MICE), perbankan, dan pusat perbelanjaan.'
      : 'Office high-rises, certified five-star boutique hotels, business convention centers (MICE), financial gates, and premium plazas.',
    facilities: lang === 'id'
      ? ['MICE Convention Center', 'Hotel Bisnis Bintang 5', 'Pusat Keuangan & Bank Portal', 'Premium Serviced Office']
      : ['MICE Complex (5,000 Seats)', 'Corporate 5-Star Eco Hotel', 'Municipal Banking Hub Portal', 'Class-A Serviced Offices'],
  },
  {
    id: 'hunian',
    name: lang === 'id' ? 'Kawasan Hunian Green Industrial Resident' : 'Eco-Living Residential Neighborhood',
    area: 50,
    color: '#EC4899',
    gradient: 'from-rose-600 to-pink-800',
    investmentValue: lang === 'id' ? '2.5 Triliun' : '2.5 Trillion',
    laborPotential: 1500,
    description: lang === 'id'
      ? 'Hunian ramah lingkungan kelas menengah hingga mewah untuk tenaga ahli, manajemen asing, dan pekerja kawasan.'
      : 'Low-density green residential estates for expatriate management, skilled engineers, and senior administrative specialists.',
    facilities: lang === 'id'
      ? ['Green Living Clubhouse', 'Sekolah & Apotek Internasional', 'Area Jogging di Sisi Danau KIIT', 'Sistem Keamanan Pintar 24 Jam']
      : ['Green Living Clubhouse', 'International Academy & Clinic', 'Scenic Jogging Trails by KIIT Lake', '24/7 Shield Intelligent Patrols'],
  },
  {
    id: 'rth',
    name: lang === 'id' ? 'Ruang Terbuka Hijau & Eco-Park' : 'Green Open Spaces & Eco-Park',
    area: 120,
    color: '#064E3B',
    gradient: 'from-green-900 to-teal-950',
    investmentValue: lang === 'id' ? '0.8 Triliun' : '0.8 Trillion',
    laborPotential: 500,
    description: lang === 'id'
      ? 'Hutan penyerap karbon, danau retensi banjir, taman rekreasi karyawan, dan koridor ekologis fauna lokal.'
      : 'Afforested carbon offset blocks, stormwater retention basins, public activity parks, and biological corridors for local fauna.',
    facilities: lang === 'id'
      ? ['Danau Penampungan Air Hujan', 'Taman Energi Surya', 'Koridor Sepeda & Lari 15 km', 'Kebun Botani Biodiversitas']
      : ['Atmospheric Rain Containment Basin', 'Solar Farm Technology Gardens', '15 KM Dual Biking-Running Path', 'Biodiverse Botanical Preservation Yard'],
  },
  {
    id: 'fasum',
    name: lang === 'id' ? 'Fasilitas Umum & Support Center' : 'Utility & Emergency Command Facilities',
    area: 30,
    color: '#EF4444',
    gradient: 'from-red-700 to-orange-900',
    investmentValue: lang === 'id' ? '1.2 Triliun' : '1.2 Trillion',
    laborPotential: 4000,
    description: lang === 'id'
      ? 'Pusat administrasi KIIT, pos pemadam kebakaran terpadu, pusat kesehatan kawasan, instalasi pengolahan limbah (IPAL), dan gardu induk.'
      : 'Executive KIIT administration offices, emergency fleets, health clinics, state-of-the-art toxic wastewater lines, and main grids.',
    facilities: lang === 'id'
      ? ['Instalasi Pengolahan Air Limbah Terpadu', 'Gardu Induk Listrik 150 KV', 'KIIT Integrated Command Center', 'Rumah Sakit & Pemadam Kebakaran Utama']
      : ['Wastewater Treatment Plant (WWTP) Giga Unit', '150 KV Heavy Electrical Substation', 'KIIT Integrated C3 Command Station', 'Emergency Hospital & Primary Fire Engine Bay'],
  },
];

const getLandAcquisitionSegments = (lang: Language): LandAcquisitionSegment[] => [
  {
    id: 'sudah_akuisisi',
    status: 'Acquired',
    label: lang === 'id' ? 'Sudah Diakuisisi (Milik KIIT)' : 'Fully Acquired (KIIT Clear Title)',
    area: 685,
    percentage: 68.5,
    color: '#0A335C',
    description: lang === 'id'
      ? 'Lahan yang telah sah dibayarkan, bersertifikat SHGB atas nama badan hukum pengelola KIIT, dan siap dilakukan land clearing.'
      : 'Land fully compensated, registered under corporate SHGB certificates, and cleared for developer machinery foundation works.',
  },
  {
    id: 'dalam_negosiasi',
    status: 'Negotiation',
    label: lang === 'id' ? 'Dalam Tahapan Negosiasi' : 'In Negotiation Phase',
    area: 140,
    percentage: 14.0,
    color: '#D4AF37',
    description: lang === 'id'
      ? 'Kesepakatan harga telah tercapai dengan pemilik lahan, sedang dalam penyelesaian berkas administrasi dan musyawarah desa.'
      : 'Commercial terms accepted by village asset owners; documentation and final town hall permits are currently being cleared.',
  },
  {
    id: 'due_diligence',
    status: 'DueDiligence',
    label: lang === 'id' ? 'Due Diligence & Yuridis' : 'Due Diligence & Legal Title Check',
    area: 95,
    percentage: 9.5,
    color: '#6B7280',
    description: lang === 'id'
      ? 'Verifikasi kepemilikan fisik, pengukuran ulang BPN, pengecekan riwayat sengketa, dan kelayakan AMDAL.'
      : 'Physical border assessment, agrarian agency (BPN) confirmation, estate heritage claim clearance, and zoning surveys.',
  },
  {
    id: 'proses_bayar',
    status: 'PaymentProcess',
    label: lang === 'id' ? 'Proses Pembayaran/Escrow' : 'Payment Disbursal & Escrow',
    area: 50,
    percentage: 5.0,
    color: '#10B981',
    description: lang === 'id'
      ? 'Dana telah ditempatkan di rekening escrow bank kustodian atau diajukan konsinyasi di Pengadilan Negeri.'
      : 'Sinking funds mapped to regional bank custodian escrow accounts or structured for civil court consignments.',
  },
  {
    id: 'belum_proses',
    status: 'Unprocessed',
    label: lang === 'id' ? 'Rencana Cadangan & Buffer' : 'Backup Expansion Reserve Areas',
    area: 30,
    percentage: 3.0,
    color: '#EF4444',
    description: lang === 'id'
      ? 'Lahan rintangan, zona pemakaman adat, prasarana sosial yang dialihkan, atau area perluasan di luar batas desa utama.'
      : 'Custom land pockets, local structural reserves, buffer corridors, or prospective acquisition stages in adjacent municipalities.',
  },
];

const getIndustrialClusters = (lang: Language): IndustrialCluster[] => [
  {
    id: 'cluster-mfg',
    title: lang === 'id' ? 'Klaster Manufaktur Modern 4.0' : 'Advanced Manufacturing 4.0 Cluster',
    tagline: lang === 'id' ? 'Modern, Presisi dan Ramah Lingkungan' : 'High-Tech, Precision, and Green Manufacturing',
    description: lang === 'id'
      ? 'Dirancang untuk manufaktur tingkat lanjut dengan interkoneksi mesin-ke-mesin, kecerdasan buatan, dan efisiensi energi yang unggul.'
      : 'Designed specifically for next-gen manufacturing utilizing machine-to-machine communications, robotics, high energy efficiency.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    area: lang === 'id' ? '350 Hektare' : '350 Hectares',
    investmentPotential: lang === 'id' ? 'Rp 18.5 Triliun' : 'IDR 18.5 Trillion',
    laborPotential: lang === 'id' ? '28.000 Pekerja Ahli' : '28,000 Engineering Personnel',
    economicValue: lang === 'id' ? 'Rp 6.2 Triliun / Tahun' : 'IDR 6.2 Trillion / Annum',
    highlights: lang === 'id'
      ? ['Robotik & Automasi Jalur Perakitan', 'Zero-Waste Water Discharge', 'Atap Panel Surya Pra-Pasang', 'Suplai Gas Industri Terintegrasi']
      : ['Robotic & Smart Assembly Automation', 'Zero Wastewater Liquid Discharge', 'Integrated Rooftop Solar Assemblies', 'High-Pressure Pure Nitrogen Lines'],
  },
  {
    id: 'cluster-log',
    title: lang === 'id' ? 'Smart Logistics Hub' : 'Smart Logistics Hub',
    tagline: lang === 'id' ? 'Hub Jaringan Rantai Pasok Global' : 'Global Supply Chain Connection',
    description: lang === 'id'
      ? 'Hub multimoda yang mengintegrasikan transit udara Bandara Kertajati, Tol Trans-Jawa, Pelabuhan Patimban, dan Jalur Kereta Api.'
      : 'Multimodal transfer yards linking BIJB Kertajati Air Cargo, Trans-Java Highways, Patimban Seaports, and Kabupaten Majalengka Freight Rail Tracks.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    area: lang === 'id' ? '200 Hektare' : '200 Hectares',
    investmentPotential: lang === 'id' ? 'Rp 8.2 Triliun' : 'IDR 8.2 Trillion',
    laborPotential: lang === 'id' ? '12.000 Operator & Analis' : '12,000 Logistics Analysts',
    economicValue: lang === 'id' ? 'Rp 3.5 Triliun / Tahun' : 'IDR 3.5 Trillion / Annum',
    highlights: lang === 'id'
      ? ['Pergudangan Berautomasi (ASRS)', 'Depo Kontainer & Dry Port Terpadu', 'Sistem Kepabeanan Cepat (Fast Track)', 'Jaringan Distribusi 24/7']
      : ['ASRS Intelligent Cold Warehouses', 'Integrated Intermodal Container Yard', 'Airport Fast-Track Custom Lanes', '24/7 Smart Logistics Corridors'],
  },
  {
    id: 'cluster-aero',
    title: lang === 'id' ? 'Kertajati Aerospace & MRO Town' : 'Kertajati Aerospace & MRO Town',
    tagline: lang === 'id' ? 'Pusat Pemeliharaan Aviasi Terkemuka' : 'Leading Aviation Maintenance and Manufacturing',
    description: lang === 'id'
      ? 'Satu-satunya klaster aviasi terintegret yang berada di samping runway Bandara Internasional Kabupaten Majalengka (BIJB) Kertajati.'
      : 'The sole dedicated aviation engineering district built contiguous with BIJB Kertajati international commercial runways.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    area: lang === 'id' ? '100 Hektare' : '100 Hectares',
    investmentPotential: lang === 'id' ? 'Rp 7.5 Triliun' : 'IDR 7.5 Trillion',
    laborPotential: lang === 'id' ? '9.000 Teknisi Berlisensi' : '9,000 Approved Technicians',
    economicValue: lang === 'id' ? 'Rp 4.1 Triliun / Tahun' : 'IDR 4.1 Trillion / Annum',
    highlights: lang === 'id'
      ? ['Akses Apron Bandara Langsung', 'Fasilitas Pemeliharaan Badan Pesawat (MRO)', 'Manufaktur Suku Cadang Dirgantara', 'Sekolah Tinggi Aviasi']
      : ['Direct Access Apron Connecting Gates', 'Boeing & Airbus Certified Overhaul Bays', 'Precision Avionics Aero-Manufacture', 'Kabupaten Majalengka Flight & Technical Academy'],
  },
  {
    id: 'cluster-ev',
    title: lang === 'id' ? 'Silicon Valley Mobil Listrik (EV)' : 'Electric Vehicular (EV) Innovation Hub',
    tagline: lang === 'id' ? 'Katalis Mobilitas Hijau Masa Depan' : 'Driving Future Clean Mobility',
    description: lang === 'id'
      ? 'Pusat akselerasi ekosistem kendaraan listrik mulai dari perakitan, penelitian, produksi baterai, hingga recycle komponen.'
      : 'An aggressive hub nurturing key EV value ecosystems from battery cell formulation, testing tracks, packs recyclers, and robotics.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    area: lang === 'id' ? '100 Hektare' : '100 Hectares',
    investmentPotential: lang === 'id' ? 'Rp 6.8 Triliun' : 'IDR 6.8 Trillion',
    laborPotential: lang === 'id' ? '11.000 Ilmuwan & Mekatronika' : '11,000 Scientists & Engineers',
    economicValue: lang === 'id' ? 'Rp 4.8 Triliun / Tahun' : 'IDR 4.8 Trillion / Annum',
    highlights: lang === 'id'
      ? ['Atap Panel Surya Seluas 40 Ha', 'Pusat Uji Tabrak & Kualifikasi EV', 'Koneksi dengan Produsen Nikel Indonesia', 'Inkubasi Kendaraan Autonomos']
      : ['40 Hectares Giga-Solar Roofing', 'Class-A Impact & Crash Lab Testway', 'Interlink with Raw Supply Nickel Refiners', 'Autonomous Vehicles Testing Grid'],
  },
  {
    id: 'cluster-agro',
    title: lang === 'id' ? 'Eco-Agro & Biological Processing' : 'Eco-Agro & Bio-Processors Block',
    tagline: lang === 'id' ? 'Keberlanjutan Pangan & Bio-Sains' : 'Sustainable Food & Health Innovation',
    description: lang === 'id'
      ? 'Klaster pemrosesan modern hasil pertanian, hortikultura, bio-farmasi, serta pengemasan pangan higienis kelas ekspor.'
      : 'Fusing food engineering, organic crop processing, sterile food packing lines, and export-compliance certified labs.',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800',
    area: lang === 'id' ? '80 Hektare' : '80 Hectares',
    investmentPotential: lang === 'id' ? 'Rp 3.1 Triliun' : 'IDR 3.1 Trillion',
    laborPotential: lang === 'id' ? '8.000 Agri-tech & Food Scientist' : '8,000 Analytical Bio-Staff',
    economicValue: lang === 'id' ? 'Rp 1.9 Triliun / Tahun' : 'IDR 1.9 Trillion / Annum',
    highlights: lang === 'id'
      ? ['Gudang Pendingin Super (Amonia-Free)', 'Sertifikasi Halal & Ekspor Terintegrasi', 'Riset Bio-fertilizer & Pengurangan Emisi', 'Program Kemitraan Petani Lokal']
      : ['Eco-Friendly Freon-Free Cold Storage', 'Integrated Halal & Export Licensers', 'High-Yield Bio-fertilizer Laboratories', 'Agrarian Outbound Outgrower Network'],
  },
  {
    id: 'cluster-com',
    title: lang === 'id' ? 'Kertajati CBD & Business District' : 'Kertajati CBD & Business District',
    tagline: lang === 'id' ? 'Pusat Finansial dan Otak Bisnis Aero City' : 'The Financial Pulse of Kabupaten Majalengka’s Aero City',
    description: lang === 'id'
      ? 'Kawasan perkantoran modern, perbankan, pelayanan satu pintu, akomodasi premium, ruang pameran, serta hunian pekerja.'
      : 'Modern premium offices, regional bank corridors, centralized customs boards, luxury lodgings, and corporate centers.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    area: lang === 'id' ? '70 Hektare' : '70 Hectares',
    investmentPotential: lang === 'id' ? 'Rp 4.5 Triliun' : 'IDR 4.5 Trillion',
    laborPotential: lang === 'id' ? '6.000 Profesional Korporat' : '6,000 Administrative Professionals',
    economicValue: lang === 'id' ? 'Rp 2.2 Triliun / Tahun' : 'IDR 2.2 Trillion / Annum',
    highlights: lang === 'id'
      ? ['Pusat Konvensi (MICE) 5.000 Pax', 'Sistem Keamanan Pusat Komando (C3)', 'Hotel Bintang 5 Berkelanjutan', 'Akses Transit Shuttles Bandara']
      : ['5,000-Seat Multi-Sector Convention Hall', 'C3 Estate Digital Command Station', 'LEED-Platinum Smart Business Hotel', 'Kertajati Shuttles Loop Access'],
  },
];

const getInvestorDocs = (lang: Language): InvestorDoc[] => [
  {
    id: 'doc-fs',
    title: lang === 'id' ? 'Studi Kelayakan KIIT (Feasibility Study) - Komprehensif' : 'KIIT Feasibility Study (FS) - Comprehensive Edition',
    type: 'PDF',
    size: '42.8 MB',
    confidentiality: 'Confidential',
    category: lang === 'id' ? 'Rencana Bisnis' : 'Business Plan',
  },
  {
    id: 'doc-mp',
    title: lang === 'id' ? 'KIIT Masterplan & Urban Design Guidelines (UDGL)' : 'KIIT Masterplan & Urban Design Guidelines (UDGL)',
    type: 'PDF',
    size: '118.5 MB',
    confidentiality: 'Restricted',
    category: lang === 'id' ? 'Arsitektur & Konstruksi' : 'Architecture & Construction',
  },
  {
    id: 'doc-fp',
    title: lang === 'id' ? 'Zonasi Finansial & Proyeksi Cash Flow 30 Tahun (V.2026)' : 'Financial Zoning & 30-Year Cash Flow Projection (V.2026)',
    type: 'XLSX',
    size: '18.2 MB',
    confidentiality: 'Confidential',
    category: lang === 'id' ? 'Finansial & ROI' : 'Financial & ROI',
  },
  {
    id: 'doc-amdal',
    title: lang === 'id' ? 'Analisis Mengenai Dampak Lingkungan (AMDAL) Baru' : 'Environmental Impact Assessment (EIA / AMDAL) - Updated',
    type: 'PDF',
    size: '24.1 MB',
    confidentiality: 'Public',
    category: lang === 'id' ? 'ESG & Regulasi' : 'ESG & Regulations',
  },
  {
    id: 'doc-pp',
    title: lang === 'id' ? 'Investment Prospectus - Kertajati Industrial Town (EN/ID)' : 'Core Executive Investment Prospectus - Kertajati Industrial Town (EN/ID)',
    type: 'PPTX',
    size: '35.6 MB',
    confidentiality: 'Public',
    category: lang === 'id' ? 'Prospektus Utama' : 'Main Prospectus',
  },
  {
    id: 'doc-law',
    title: lang === 'id' ? 'Surat Keputusan Bupati Kabupaten Majalengka & Perda KEK Kertajati' : 'Kabupaten Majalengka Regent Decree & Kertajati Special Zone Laws',
    type: 'PDF',
    size: '15.4 MB',
    confidentiality: 'Public',
    category: lang === 'id' ? 'Regulasi Pemerintah' : 'Government Regulation',
  },
];

const getNewsArticles = (lang: Language): NewsArticle[] => [
  {
    id: 'news-1',
    title: lang === 'id' 
      ? 'Kunjungan Delegasi Investor Shanghai Electric & BYD ke Area Inti KIIT'
      : 'Shanghai Electric & BYD Delegation Visits KIIT Core Infrastructure Area',
    category: 'Kegiatan Investor',
    date: '18 May 2026',
    excerpt: lang === 'id'
      ? 'Delegasi membahas rencana pembangunan giga-factory kendaraan listrik seluas 100 hektar di area Kertajati International Industrial Town.'
      : 'Delegates discuss blueprints for a 100-hectare advanced electric vehicular Giga-facility in KIIT Special SEZ Zone.',
    content: lang === 'id'
      ? 'MAJALENGKA — Dewan Direksi KIIT menyambut kunjungan delegasi tingkat tinggi dari Shanghai Electric Group Corporation dan BYD Auto Co., Ltd. Kunjungan lapangan ini didampingi oleh Pejabat Pemkab Kabupaten Majalengka untuk meninjau secara langsung gardu induk listrik 150 KV, jalur pipa transmisi gas bumi, serta infrastruktur relai jalan yang terhubung ke pintu Tol Kertajati Utama.\n\nDalam keterangannya, pimpinan rombongan menyatakan kepuasan atas kesiapan lahan KIIT yang bebas dari hambatan geografis dan hukum, serta memuji regulasi insentif fiskal dari pemerintah pusat untuk Kawasan Ekonomi Khusus (KEK). Rencana pendirian pabrik perakitan baterai lithium dijadwalkan akan masuk dalam fase detail engineering design (DED) pada kuartal ketiga tahun ini.'
      : 'MAJALENGKA — The Executive Board of KIIT welcomed high-ranking partners from Shanghai Electric Group Corporation and BYD Auto Co., Ltd. This active field assessment was accompanied by key Kabupaten Majalengka regional authorities to physically map out the 150 KV substation grid, industrial transmission natural gas pipe, and roads connected directly with the Kertajati main highway gate.\n\nDuring the statement, the delegation leader expressed extreme satisfaction with the site readiness of KIIT, which is uniquely free of legal or physical encumbrances, and praised special corporate tax regulations promulgated by the central administration for SEZ investors. Pre-stages of EV cells assemblers setup are penciled to hit Detailed Engineering Design (DED) processes towards Q3 of this fiscal year.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
  },
  {
    id: 'news-2',
    title: lang === 'id'
      ? 'Pembebasan Lahan Klaster Utama Capai 68.5% dari Target Utama 1.000 Ha'
      : 'Core Estate Clear Title Reaches 68.5% of Primary 1,000 Ha Expansion Target',
    category: 'Update Proyek',
    date: '02 May 2026',
    excerpt: lang === 'id'
      ? 'Progres akuisisi lahan KIIT berjalan lancar tanpa sengketa berkat koordinasi sinergis dengan BPN, Pemkab Majalengka, dan masyarakat desa setempat.'
      : 'Clear title acquisition runs frictionless with zero disputes owing to active social pacts with BPN authorities and agrarian locals.',
    content: lang === 'id'
      ? 'MAJALENGKA — Satgas Pengadaan Tanah KIIT bersama Kantor Pertanahan BPN Majalengka melaporkan pencapaian penting. Hingga awal Mei 2026, total tanah tersertifikasi atas nama PT Kertajati International Town telah menyentuh angka 685 hektar.\n\nKeberhasilan ini didorong oleh pendekatan humanis ganti untung yang berkeadilan, disertai penyediaan kavling perumahan transisi dan program pelatihan penyerapan tenaga kerja lokal yang diarsiteki oleh manajemen KIIT. Kepala BPN Majalengka menyatakan komitmennya untuk menyelesaikan 14% sisa lahan yang kini sedang berstatus negosiasi dalam kurun waktu 90 hari mendatang demi mendukung target soft launching kawasan.'
      : 'MAJALENGKA — The Land Procurement Task Force along with Majalengka Agrarian Office (BPN) reported a crucial milestone. By early May 2026, certified land assets registered directly under PT Kertajati International Town matched 685 hectares.\n\nThis success was catalyzed by humane, fair compensation templates coupled with local housing offsets and workforce skill upgrades developed natively by KIIT administrators. The Head of Majalengka BPN expressed tight commitment to finalizing the remaining 14% of lands currently in negotiations within the upcoming 90 days to satisfy schedule milestones.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min read',
  },
  {
    id: 'news-3',
    title: lang === 'id'
      ? 'BIJB Kertajati Operasionalkan Cargo Terminal Hub Terbesar Kedua di Indonesia'
      : 'BIJB Kertajati Airport Operates Second-Largest Smart Cargo Hub in Indonesia',
    category: 'Perkembangan Kawasan',
    date: '14 April 2026',
    excerpt: lang === 'id'
      ? 'Integrasi logistik apron bandara dengan koridor kargo pintar KIIT siap memangkas waktu dwell-time pelabuhan kargo udara hingga 40%.'
      : 'Direct airside connectivity to KIIT cargo arteries is ready to crash standard flight cargo dwell times by up to 40%.',
    content: lang === 'id'
      ? 'KERTAJATI — Bandara Kertajati (BIJB) secara resmi menguji coba terminal kargo canggih berbasis cloud terintegrasi untuk rantai pasok berkecepatan tinggi. Fasilitas ini terkoneksi secara fisik dengan Klaster Aerospace & Logistik KIIT melaui "Aviation Smart Corridor" sepanjang 1.2 KM.\n\nDengan adanya koridor steril ini, peti kemas dari pesawat dapat langsung dipindahkan ke kawasan pergudangan KIIT dalam waktu kurang dari 20 menit tanpa melewati gerbang pemeriksaan umum luar bandara. Hal ini memberikan keunggulan kompetitif yang mutlak bagi produsen komponen bernilai tinggi, mikroelektronik, vaksin farmasi, dan produk perishables lainnya.'
      : 'KERTAJATI — Kabupaten Majalengka International Airport (BIJB) officially flight-tested an intelligent cloud-based logistics cargo center tailored for rapid supply chain hubs. The facility links physically to the KIIT Aerospace & Logistics Sectors via an "Aviation Smart Corridor" stretched for 1.2 KM.\n\nThanks to this secure sterile corridor, aircraft freight operations can direct cargo into KIIT warehouses within 20 minutes, completely bypassing traditional public highway inspection gates. This offers an unparalleled competitive hedge for exporters handling high-value chips, medical supplies, vaccines, and high-frequency perishables.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
  },
  {
    id: 'news-4',
    title: lang === 'id'
      ? 'Pemerintah Kabupaten Kabupaten Majalengka Sahkan Aturan Tax Holiday Khusus Kertajati'
      : 'Kabupaten Majalengka Regency Executive ratifies 100% Tax Holiday Code for Kertajati SEZ',
    category: 'Kerja Sama',
    date: '28 March 2026',
    excerpt: lang === 'id'
      ? 'Bupati Kabupaten Majalengka menandatangani peraturan daerah mengenai pembebasan pajak dan insentif bea masuk bagi tenant manufaktur strategis di KIIT.'
      : 'State governor signs sweeping regulatory waivers of corporate incomes and import levies for strategic KIIT pioneers.',
    content: lang === 'id'
      ? 'BANDUNG — Pemerintah Kabupaten Kabupaten Majalengka menyambut hangat komitmen investasi nasional dan asing yang masuk ke Kertajati International Industrial Town. Bupati Kabupaten Majalengka mengesahkan skema "Super Tax Holiday" 100% bebas pajak badan bagi korporasi yang menaruh kapital minimal Rp500 miliar di kawasan KIIT.\n\nSelain bebas pajak badan hingga 20 tahun, peraturan baru ini juga membebaskan retribusi daerah, memberikan diskon PBB selama tahap konstruksi, serta mempercepat pengurusan KITAS bagi pekerja asing ahli hingga maksimal 48 jam pengerjaan. Ini merupakan wujud dukungan penuh pemerintah demi menyejajarkan KIIT dengan kawasan industri tercanggih di Singapura, Vietnam, dan China.'
      : 'BANDUNG — Open commitments of premium corporate developers and manufacturing brands in KIIT receive strong validation. The Regent of Kabupaten Majalengka ratified a 100% "Super Tax Holiday" corporate fiscal exemption scheme for entities injecting over IDR 500 billion within KIIT gates.\n\nBeyond 20-year corporate income tax holidays, these parameters eliminate regional retributions, deliver deep property tax discounts during development phases, and accelerate specialized expat permits (KITAS) to under 48 hours. This structural support aligns Kertajati with premier competing regions across Singapore, Vietnam, and Southern China.',
    image: 'https://images.unsplash.com/photo-1521791136368-1a46827d52bc?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
  },
];

const getEsgThemes = (lang: Language): ESGTheme[] => [
  {
    id: 'esg-env',
    pillar: 'E',
    title: lang === 'id' ? 'Pelestarian Lingkungan Hidup' : 'Environmental Stewardship',
    icon: 'Leaf',
    description: lang === 'id'
      ? 'Menargetkan operasional kawasan Net-Zero Carbon pada 2035 melalui pemanfaatan energi terbersih dan sirkularitas sumber daya.'
      : 'Targeting a carbon-neutral industrial estate by 2035 through heavy clean solar solar roofing and total circular water recovery.',
    metrics: lang === 'id'
      ? [
          { label: 'Energi Terbarukan', value: '100 MW Surya Atap terpasang pada 2028' },
          { label: 'Efisiensi Air', value: '95% Pengolahan Air Limbah Terbaur (Circular Recycle)' },
          { label: 'Keanekaragaman Hayati', value: '120 Ha Green Buffer Zone & Eco-Park Konservasi' },
          { label: 'Zero Waste', value: 'Sertifikasi Zero Waste to Landfill untuk seluruh pabrik pelopor' },
        ]
      : [
          { label: 'Renewable Power Grid', value: '100 MW Rooftop Photovoltaics commissioned by 2028' },
          { label: 'Hydrological Efficiency', value: '95% Wastewater Refiltrations & Circular Recoveries' },
          { label: 'Ecological Preservation', value: '120 Ha Managed Carbon Buffers & Conservation EcoParks' },
          { label: 'Landfill Diversions', value: '100% Zero-Waste-To-Landfill covenants with early tenants' },
        ],
  },
  {
    id: 'esg-soc',
    pillar: 'S',
    title: lang === 'id' ? 'Pemberdayaan Sosial Masyarakat' : 'Social Community Empowerment',
    icon: 'Users',
    description: lang === 'id'
      ? 'Menjamin kemajuan bersama dengan memberdayakan masyarakat 12 desa penyangga di sekitar Kertajati dan Majalengka.'
      : 'Nurturing balanced regional growth by uplifting and training stakeholders across 12 bordering buffer villages.',
    metrics: lang === 'id'
      ? [
          { label: 'Pelatihan Kerja', value: 'KIIT Vocational Council melatih 5.000 pekerja lokal/tahun' },
          { label: 'Inklusi UMKM', value: 'Rp45 Miliar dana kemitraan bergulir bagi pengusaha daerah' },
          { label: 'Fasilitas Sosial', value: 'Pembangunan 3 Puskesmas modern & 5 Sekolah Kejuruan Aviasi' },
          { label: 'Standar Hidup', value: 'Rasio prioritas rekrutmen pekerja lokal di atas 75%' },
        ]
      : [
          { label: 'Aviation Skill Academy', value: 'KIIT Council trains 5,000 local craftsmen & technicians yearly' },
          { label: 'Agrarian Microfinance', value: 'IDR 45 Billion in financial grants assigned to local suppliers' },
          { label: 'Civic Support Facilities', value: '3 specialized clinics & 5 vocational academies funded by KIIT' },
          { label: 'Regional Inclusivity', value: 'Guaranteed 75%+ local priority staffing quotas in entry positions' },
        ],
  },
  {
    id: 'esg-gov',
    pillar: 'G',
    title: lang === 'id' ? 'Tata Kelola & Kepatuhan Risiko Bappeda' : 'Ethical Governance & Risk Mitigations',
    icon: 'ShieldCheck',
    description: lang === 'id'
      ? 'Menjunjung integritas kelas dunia melalui sistem perizinan satu pintu digital (OSS) tanpa gratifikasi dan berbasis tata kelola G20.'
      : 'Upholding strict zero-gratification regimes through digitized single-window boards (OSS) under global G20 rules.',
    metrics: lang === 'id'
      ? [
          { label: 'Transparansi Korupsi', value: 'Sertifikasi ISO 37001 Sistem Manajemen Anti Penyuapan' },
          { label: 'Digital Hub OSS', value: 'Sistem perizinan transparan real-time 100% terekam online' },
          { label: 'Mitigasi Risiko', value: 'Sistem Kesiapsiagaan Krisis Bencana gempa dan banjir berskala 9.0 SR' },
          { label: 'Stabilitas Finansial', value: 'Audit dwi-bulanan berkala oleh 4 Kantor Akuntan Publik global (Big 4)' },
        ]
      : [
          { label: 'Anti-Bribery Frameworks', value: 'Certified ISO 37001 Anti-Bribery Standards & auditing' },
          { label: 'Centralized Digital OSS', value: '100% documented online speed permit tracking with zero manual touch' },
          { label: 'Structural Safety Measures', value: 'Estate seismic & hydrological layouts rated for 9.0 Richter Scale' },
          { label: 'Accounting Protocols', value: 'Bi-monthly forensic fiscal reporting verified by Big-4 firms' },
        ],
  },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kiit_lang');
    return (saved === 'id' || saved === 'en') ? saved : 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kiit_lang', lang);
  };

  const t = (key: string): string => {
    const translation = UI_TRANSLATIONS[language]?.[key];
    if (translation !== undefined) {
      return translation;
    }
    // Fallback to indonesian, then to key itself
    return UI_TRANSLATIONS['id']?.[key] || key;
  };

  const masterplanZones = getMasterplanZones(language);
  const landAcquisitionSegments = getLandAcquisitionSegments(language);
  const industrialClusters = getIndustrialClusters(language);
  const investorDocs = getInvestorDocs(language);
  const newsArticles = getNewsArticles(language);
  const esgThemes = getEsgThemes(language);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      masterplanZones,
      landAcquisitionSegments,
      industrialClusters,
      investorDocs,
      newsArticles,
      esgThemes
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

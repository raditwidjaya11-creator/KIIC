import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Calendar, User, X, ChevronRight } from 'lucide-react';
import { NEWS_ARTICLES, NewsArticle } from '../types';

export default function NewsMedia() {
  const { language } = useLanguage();
  const isIndo = language === 'id';
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['Semua', 'Update Proyek', 'Kegiatan Investor', 'Perkembangan Kawasan', 'Kerja Sama', 'Siaran Pers'];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'Semua': return isIndo ? 'Semua' : 'All';
      case 'Update Proyek': return isIndo ? 'Update Proyek' : 'Project Updates';
      case 'Kegiatan Investor': return isIndo ? 'Kegiatan Investor' : 'Investor Activities';
      case 'Perkembangan Kawasan': return isIndo ? 'Perkembangan Kawasan' : 'Estate Developments';
      case 'Kerja Sama': return isIndo ? 'Kerja Sama' : 'Strategic Partnerships';
      case 'Siaran Pers': return isIndo ? 'Siaran Pers' : 'Press Releases';
      default: return cat;
    }
  };

  const newsArticles: NewsArticle[] = NEWS_ARTICLES.map((art) => {
    switch (art.id) {
      case 'news-1':
        return {
          ...art,
          title: isIndo ? art.title : 'Shanghai Electric & BYD Investor Delegation Visited KIIT Core Site',
          excerpt: isIndo ? art.excerpt : 'Delegations discussed plans to construct a 100-hectare electric vehicle mega-factory at Kertajati International Industrial Town.',
          content: isIndo ? art.content : `MAJALENGKA — The Board of Directors of KIIT welcomed a high-level delegate group from Shanghai Electric Group Corporation and BYD Auto Co., Ltd. This field visits, accompanied by Kabupaten Majalengka Regional Executives, was to directly inspect the 150 KV electrical substation, natural gas pipelines, and toll-way interchange assets connecting to the Kertajati Toll Highway.\n\nDuring their statement, delegation leaders expressed great confidence in KIIT's land readiness, highlighting the lack of geographical and legal impediments. They praised the central government's fiscal incentives for Special Economic Zones (SEZ). Detailed engineering design (DED) phases for the battery cell assembly factory are scheduled to commence in Q3 of this year.`,
          readTime: isIndo ? art.readTime : '4 min read'
        };
      case 'news-2':
        return {
          ...art,
          title: isIndo ? art.title : 'Main Phase Land Acquisition Hits 68.5% of Total 1,000 Ha Project',
          excerpt: isIndo ? art.excerpt : 'KIIT acquisition progress moves smoothly with zero disputes due to proactive dialogue with BPN, Majalengka officials, and local communities.',
          content: isIndo ? art.content : `MAJALENGKA — The KIIT Land Acquisition Taskforce, alongside the Regional Land Office of BPN Majalengka, reported key achievements. As of early May 2026, total land registered and certified under PT Kertajati International Town reached 685 hectares.\n\nThis success was accelerated by a humanistic compensation policy, accompanied by the design of transition housings and local vocational training programs implemented by the KIIT board. The Head of BPN Majalengka voiced strong commitment to resolving the remaining 14% lands currently under final negotiations within the next 90 days to meet the upcoming soft-launch target.`,
          readTime: isIndo ? art.readTime : '3 min read'
        };
      case 'news-3':
        return {
          ...art,
          title: isIndo ? art.title : 'BIJB Kertajati Operates Indonesia\'s Second Largest Air Cargo Hub',
          excerpt: isIndo ? art.excerpt : 'Integrating airport apron logistical frameworks directly with KIIT\'s smart corridors is poised to reduce air cargo dwell times by 40%.',
          content: isIndo ? art.content : `KERTAJATI — Kertajati International Airport (BIJB) officially completed testing of its new cloud-enabled air cargo terminal designed for high-velocity distribution. This facility is physically annexed to the KIIT Aerospace & Logistics Cluster via a 1.2 KM "Aviation Smart Corridor".\n\nThrough this secure corridor, containers from cargo airlines can be transferred directly to KIIT logistics warehouses in less than 20 minutes, bypassing outer municipal customs gates. This translates into a distinct competitive edge for manufacturers of high-value microelectronics, aircraft parts, pharmaceuticals, and perishable goods.`,
          readTime: isIndo ? art.readTime : '5 min read'
        };
      case 'news-4':
        return {
          ...art,
          title: isIndo ? art.title : 'Kabupaten Majalengka Regency Government Enacts Super Tax Holiday for Kertajati Tenants',
          excerpt: isIndo ? art.excerpt : 'Governor signs regional decree granting comprehensive tax holidays and import duty exemptions for pioneering manufacturing investments at KIIT.',
          content: isIndo ? art.content : `BANDUNG — The Regency Government of Kabupaten Majalengka warmly welcomed recent FDI commitments into Kertajati International Industrial Town. The Regent of Kabupaten Majalengka ratified a 100% "Super Tax Holiday" corporate income tax exemption for anchor companies injecting a minimum of IDR 500 billion within the KIIT area.\n\nBeyond corporate tax exemptions for up to 20 years, the decree suspends local municipal levies, offers property tax discounts during construction phases, and accelerates expat expert visa (KITAS) processing to less than 48 hours. This milestone represents full municipal support to elevate KIIT alongside premier industrial zones in Singapore, Vietnam, and China.`,
          readTime: isIndo ? art.readTime : '4 min read'
        };
      default:
        return art;
    }
  });

  // Filter logic based on Category and Search Query
  const filteredArticles = newsArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="berita" className="relative py-24 bg-[#001026] text-white overflow-hidden scroll-mt-14 border-b border-slate-900 font-sans">
      {/* Background grids */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[#001F3F] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            {isIndo ? 'PORTAL BERITA RESMI • INVESTMENT MEDIA CENTER' : 'OFFICIAL NEWS PORTAL • INVESTMENT MEDIA CENTER'}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
            {isIndo ? 'Berita & Media Terkini KIIT' : 'KIIT News & Investor Media Center'}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed font-semibold">
            {isIndo
              ? 'Ikuti perkembangan up-to-date pengerjaan pembersihan lahan, perizinan pemerintah, penandatanganan Letter of Intent dengan tenant industri global, dan progres pembangunan infrastruktur gardu kelistrikan.'
              : 'Receive the latest up-to-date information on land clearing, government permits, Letters of Intent with global industrial tenants, and main substation construction milestones.'}
          </p>
        </div>

        {/* Search & Category Filter Command Bar */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-900/60">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-none text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-gold text-slate-950 shadow-lg shadow-brand-gold/10'
                    : 'bg-[#001F3F]/40 border border-slate-900 hover:border-brand-gold/40 text-slate-300'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search Box inputs */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={isIndo ? 'Cari rilis berita...' : 'Search news releases...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#001F3F]/45 border border-slate-900 focus:border-brand-gold/50 rounded-none py-2.5 pl-10 pr-4 text-xs font-mono text-white focus:outline-none placeholder:text-slate-500 focus:ring-1 focus:ring-brand-gold/20 font-semibold"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          </div>

        </div>

        {/* Dynamic News Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((art, idx) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setActiveArticle(art)}
                className="bg-[#001A33] border border-slate-900/65 hover:border-brand-gold/30 rounded-none overflow-hidden shadow-2xl flex flex-col sm:flex-row h-full group transition-all duration-300 cursor-pointer"
              >
                {/* Article Image side */}
                <div className="sm:w-2/5 relative h-48 sm:h-full min-h-[180px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#001A33] via-[#001A33]/20 to-transparent z-10"></div>
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-brand-navy border border-brand-gold/20 rounded-none font-mono text-[9px] text-brand-gold font-bold uppercase tracking-wider">
                    {getCategoryLabel(art.category)}
                  </span>
                </div>

                {/* Content Side */}
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4 font-sans">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono font-bold">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{art.date}</span>
                      </span>
                      <span>&bull;</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-sans font-bold text-base leading-snug text-white group-hover:text-brand-gold transition-colors">
                      {art.title}
                    </h3>

                    <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-3 font-semibold">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 font-mono text-[10px] text-brand-gold font-bold group-hover:text-white transition-colors uppercase pt-2">
                    <span>{isIndo ? 'Baca Rilis Selengkapnya' : 'Read Full Release'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#001A33] border border-slate-900 rounded-none font-sans">
            <span className="block text-slate-500 font-mono text-sm uppercase font-bold">{isIndo ? 'Tidak ada berita yang cocok' : 'No matching news releases found'}</span>
            <p className="text-xs text-slate-450 mt-2 font-sans font-semibold">{isIndo ? 'Ubah pencarian atau bersihkan filter parameter kategori di atas.' : 'Please adjust your search terms or select an alternative category above.'}</p>
          </div>
        )}

      </div>

      {/* Elegant Article Modal Popup */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001026]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#001A33] border border-slate-900 rounded-none max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative scrollbar-none"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 z-40 p-1.5 rounded-none bg-brand-navy border border-slate-900 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover Banner */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#001A33] to-transparent z-10"></div>
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Meta tags inside modal */}
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2 text-white font-sans">
                  <span className="px-2.5 py-1 bg-brand-gold text-[#001026] rounded-none font-mono text-[9px] font-bold uppercase tracking-wider">
                    {getCategoryLabel(activeArticle.category)}
                  </span>
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white leading-tight">
                    {activeArticle.title}
                  </h3>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 space-y-6 font-sans">
                
                {/* Logistics timestamps and author metadata */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-900 pb-4 text-xs font-mono text-slate-400 gap-4 font-bold font-semibold">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-brand-gold" />
                    <span>{isIndo ? 'Oleh: Humas PT Kertajati International Town' : 'By: Public Relations, PT Kertajati International Town'}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{isIndo ? 'Terbit:' : 'Published:'} {activeArticle.date}</span>
                    <span>&bull;</span>
                    <span>{isIndo ? 'Durasi:' : 'Read Time:'} {activeArticle.readTime}</span>
                  </div>
                </div>

                {/* Paragraph Content */}
                <div className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-4 font-semibold">
                  {activeArticle.content}
                </div>

                {/* Footer seal */}
                <div className="border-t border-slate-900 pt-6 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase font-bold">
                  <span>© PT KIIT MEDIA HUB 2026</span>
                  <span className="text-brand-gold">Kertajati Aero City Approved Release</span>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

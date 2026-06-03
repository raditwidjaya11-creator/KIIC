import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, ChevronDown, LandPlot, Percent, Clock, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../types';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
  iconType: 'land' | 'percent' | 'clock';
}

export default function FAQ() {
  const { language } = useLanguage();
  const isIndo = language === 'id';
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const getIcon = (type: 'land' | 'percent' | 'clock') => {
    switch (type) {
      case 'land':
        return <LandPlot className="w-5 h-5 text-brand-gold" />;
      case 'percent':
        return <Percent className="w-5 h-5 text-brand-gold" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-brand-gold" />;
      default:
        return <HelpCircle className="w-5 h-5 text-brand-gold" />;
    }
  };

  const faqItems: FaqItem[] = FAQ_ITEMS.map((item) => ({
    id: item.id,
    category: isIndo ? item.categoryID : item.categoryEN,
    question: isIndo ? item.questionID : item.questionEN,
    answer: isIndo ? item.answerID : item.answerEN,
    icon: getIcon(item.iconType),
    iconType: item.iconType,
  }));

  const categories = [
    { id: 'all', name: isIndo ? 'Semua' : 'All', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'land', name: isIndo ? 'Akuisisi Lahan' : 'Land Acquisition', icon: <LandPlot className="w-4 h-4" /> },
    { id: 'percent', name: isIndo ? 'Insentif Pajak' : 'Tax Incentives', icon: <Percent className="w-4 h-4" /> },
    { id: 'clock', name: isIndo ? 'Garis Waktu Perizinan' : 'Licensing Timelines', icon: <Clock className="w-4 h-4" /> },
  ];

  const filteredItems = faqItems.filter(
    (item) => selectedCategory === 'all' || item.iconType === selectedCategory
  );

  return (
    <section id="faq" className="relative py-24 bg-white overflow-hidden scroll-mt-14 border-b border-slate-200">
      {/* Decorative clean light vectors */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-none filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy/5 rounded-none filter blur-3xl opacity-50"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-navy" />
            <span className="text-brand-navy font-mono text-[10px] font-bold tracking-widest uppercase">
              FAQ • {isIndo ? "INFORMASI INVESTOR" : "INVESTOR BRIEFING"}
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
            {isIndo ? 'Tanya Jawab Terkait Investasi KIIT' : 'Frequently Asked Questions'}
          </h2>
          <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed font-semibold">
            {isIndo
              ? 'Temukan panduan lengkap dan resmi tentang kepemilikan lahan, kebijakan insentif fiskal dari Kementerian Keuangan, serta efisiensi perizinan di tingkat Kabupaten Majalengka.'
              : 'Find the official briefing guide concerning land tenure security, fiscal incentive packages, and licensing acceleration under Kabupaten Majalengka municipal governance.'}
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-slate-100 pb-6 max-w-2xl mx-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenId(null); // Close active FAQ as context changes
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 border font-sans text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer rounded-none ${
                  isActive
                    ? 'bg-brand-navy border-brand-navy text-white shadow-[0_4px_12px_rgba(0,31,63,0.15)]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-brand-navy hover:shadow-[0_4px_10px_rgba(0,0,0,0.04)]'
                }`}
              >
                <span className={isActive ? 'text-brand-gold' : 'text-slate-400'}>
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`border transition-all duration-300 font-sans ${
                    isOpen 
                      ? 'border-brand-gold bg-[#001026]/5' 
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 px-6 flex items-start justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-[#001026]/10 border border-slate-200 text-brand-navy shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <span className="inline-block text-[9px] font-mono font-bold tracking-wider text-brand-gold bg-brand-navy uppercase px-1.5 py-0.5 mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-brand-navy leading-tight">
                          {item.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-brand-gold' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 sm:pl-20 pr-8 text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed border-t border-slate-100 bg-[#001026]/[0.02]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

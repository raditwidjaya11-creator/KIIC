import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, TrendingUp, Compass, Cpu, Briefcase, Landmark, Key, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CounterProps {
  value: number;
  duration?: number;
}

// Custom performant Roll-up hook/component for counting animation
function AnimateCounter({ value, duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.min(60, Math.floor(duration / 16));
    const increment = end / totalFrames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      start = Math.floor(increment * currentFrame);
      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString('id-ID')}
    </span>
  );
}

export default function KPIDash() {
  const { t } = useLanguage();

  const statsList = [
    {
      label: t('kpi.label_area'),
      value: 1000,
      prefix: '',
      suffix: t('kpi.suffix_hectares'),
      sub: t('kpi.sub_area'),
      color: 'from-amber-400 to-yellow-600',
      icon: Compass,
    },
    {
      label: t('kpi.label_invest'),
      value: 50,
      prefix: 'Rp ',
      suffix: t('kpi.suffix_trillion'),
      sub: t('kpi.sub_invest'),
      color: 'from-[#001F3F] to-[#D4AF37]',
      icon: TrendingUp,
    },
    {
      label: t('kpi.label_rev'),
      value: 17,
      prefix: 'Rp ',
      suffix: t('kpi.suffix_trillion'),
      sub: t('kpi.sub_rev'),
      color: 'from-yellow-500 to-amber-650',
      icon: Cpu,
    },
    {
      label: t('kpi.label_val'),
      value: 30,
      prefix: 'Rp ',
      suffix: t('kpi.suffix_trillion'),
      sub: t('kpi.sub_val'),
      color: 'from-slate-300 to-white',
      icon: Landmark,
    },
    {
      label: t('kpi.label_jobs'),
      value: 80000,
      prefix: '',
      suffix: t('kpi.suffix_jobs'),
      sub: t('kpi.sub_jobs'),
      color: 'from-emerald-400 to-emerald-200',
      icon: Users,
    },
    {
      label: t('kpi.label_tenants'),
      value: 250,
      prefix: '',
      suffix: t('kpi.suffix_companies'),
      sub: t('kpi.sub_tenants'),
      color: 'from-sky-400 to-indigo-300',
      icon: Key,
    },
  ];

  return (
    <section id="dashboard" className="relative py-24 bg-[#F8FAFC] overflow-hidden border-y border-slate-200/80">
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full filter blur-[150px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#001F3F]/5 rounded-full filter blur-[150px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with high-end financial styling */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-slate-200 pb-10 mb-16">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
              {t('kpi.caption')}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-navy tracking-tight">
              {t('kpi.title')}
            </h2>
            <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed font-medium">
              {t('kpi.description')}
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-white border border-slate-200 px-5 py-4 rounded-none flex items-center space-x-3.5 shadow-sm">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-none font-bold">
                {t('kpi.system_title')}
              </span>
              <span className="block text-[11px] font-sans text-brand-navy font-extrabold mt-1">
                {t('kpi.system_value')}
              </span>
            </div>
          </div>
        </div>

        {/* Six Dashboard Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-slate-200/80 hover:border-brand-gold rounded-sm p-6 sm:p-8 shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-slate-200/50 group transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual Glow Layer */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full filter blur-2xl group-hover:bg-brand-gold/15 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-0 group-hover:h-full bg-brand-gold transition-all duration-300"></div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">
                      {stat.label}
                    </h3>
                  </div>
                  <div className="p-2.5 rounded-sm bg-slate-50 border border-slate-100 text-brand-navy group-hover:text-brand-gold transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Counter Visual block */}
                <div className="mb-3 flex items-baseline">
                  {stat.prefix && (
                    <span className="text-2xl sm:text-3xl font-extrabold text-brand-gold font-sans tracking-tight mr-0.5">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="text-4xl sm:text-5xl font-black text-brand-navy font-sans tracking-tighter group-hover:scale-[1.01] transition-transform duration-300">
                    <AnimateCounter value={stat.value} />
                  </span>
                  {stat.suffix && (
                    <span className="text-lg sm:text-xl font-bold text-brand-gold ml-1 font-sans">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed uppercase border-t border-slate-100 pt-3 tracking-wider">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

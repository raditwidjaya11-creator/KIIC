import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Percent, TrendingUp, Landmark, Receipt, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectionYear {
  year: number;
  label: string;
  investmentAmt: number; // in IDR Trillion
  revenueAmt: number; // in IDR Trillion
  netProfit: number; // in IDR Trillion
  valuationAmt: number; // in IDR Trillion
  irrPct: number;
  npvCumulative: number; // in IDR Trillion
}

export default function InvestmentProjections() {
  const { language } = useLanguage();
  const isIndo = language === 'id';
  const [activeMetric, setActiveMetric] = useState<'valuation' | 'profit' | 'irr_npv'>('valuation');

  const projectionData: ProjectionYear[] = [
    { year: 1, label: isIndo ? 'Thn 1 (2026)' : 'Yr 1 (2026)', investmentAmt: 4.5, revenueAmt: 0.2, netProfit: -0.8, valuationAmt: 5.5, irrPct: 4.2, npvCumulative: -4.3 },
    { year: 3, label: isIndo ? 'Thn 3 (2028)' : 'Yr 3 (2028)', investmentAmt: 12.0, revenueAmt: 1.8, netProfit: 0.6, valuationAmt: 15.0, irrPct: 9.8, npvCumulative: -9.5 },
    { year: 5, label: isIndo ? 'Thn 5 (2030)' : 'Yr 5 (2030)', investmentAmt: 21.0, revenueAmt: 3.9, netProfit: 1.8, valuationAmt: 28.5, irrPct: 14.5, npvCumulative: -4.1 },
    { year: 8, label: isIndo ? 'Thn 8 (2033)' : 'Yr 8 (2033)', investmentAmt: 35.0, revenueAmt: 7.2, netProfit: 4.1, valuationAmt: 46.0, irrPct: 18.2, npvCumulative: 8.4 },
    { year: 10, label: isIndo ? 'Thn 10 (2035)' : 'Yr 10 (2035)', investmentAmt: 42.0, revenueAmt: 10.5, netProfit: 6.8, valuationAmt: 58.0, irrPct: 21.4, npvCumulative: 22.8 },
    { year: 15, label: isIndo ? 'Thn 15 (2040)' : 'Yr 15 (2040)', investmentAmt: 50.0, revenueAmt: 17.4, netProfit: 11.2, valuationAmt: 74.5, irrPct: 23.8, npvCumulative: 64.2 },
  ];

  // Dynamic values that update based on selection
  const selectedMetricLabel = 
    activeMetric === 'valuation' ? (isIndo ? 'Valuasi Kawasan (Triliun Rp)' : 'Estate Valuation (IDR Trillion)') :
    activeMetric === 'profit' ? (isIndo ? 'Laba Bersih Operasional (Triliun Rp)' : 'Net Operational Profit (IDR Trillion)') :
    (isIndo ? 'Kurva Kelayakan NPV Kumulatif (Triliun Rp)' : 'Cumulative NPV Feasibility Curve (IDR Trillion)');

  // Find max value in scale to plot heights safely in SVG
  const maxVal = activeMetric === 'valuation' ? 80 : activeMetric === 'profit' ? 12 : 75;

  return (
    <section id="investasi" className="relative py-24 bg-[#001026] overflow-hidden text-white scroll-mt-14">
      {/* Visual Tech Frame Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[#001F3F] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-slate-900 pb-10 mb-16">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase block mb-3">
              {isIndo ? 'KONSULTASI FINANSIAL • NPV / IRR / ROI PROJECTIONS' : 'FINANCIAL CONSULTATION • NPV / IRR / ROI PROJECTIONS'}
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
              {isIndo ? 'Proyeksi Kelayakan & Valuasi Finansial KIIT' : 'KIIT Financial Feasibility & Valuation Projections'}
            </h2>
            <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed font-semibold">
              {isIndo 
                ? 'Analisis diskonto arus kas (DCF) jangka panjang untuk mengukur margin pengembalian modal proyeksi investasi skala puluhan triliun rupiah dengan skenario konservatif.'
                : 'Long-term discounted cash flow (DCF) analysis to measure project capital return margins for investments worth tens of trillions of Rupiah using conservative scenarios.'}
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 font-mono text-xs text-brand-gold bg-[#001F3F]/40 border border-brand-gold/20 rounded-none px-3 py-1.5 flex items-center space-x-2 font-bold">
            <Activity className="w-4 h-4 animate-pulse text-brand-gold" />
            <span>{isIndo ? 'WACC Terhitung: 7.8% | Inflasi Proyeksi: 3.5%' : 'Calculated WACC: 7.8% | Projected Inflation: 3.5%'}</span>
          </div>
        </div>

        {/* Investment parameters highlights board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 font-sans">
          <div className="bg-[#001A33] border border-slate-900/65 p-5 rounded-none flex items-center space-x-4">
            <div className="p-3 bg-brand-gold/10 border border-brand-gold/25 rounded-none text-brand-gold">
              <Percent className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">{isIndo ? 'Target IRR Kawasan' : 'Target Estate IRR'}</span>
              <span className="block text-xl font-bold font-sans text-white mt-1 font-mono">23.8%</span>
            </div>
          </div>

          <div className="bg-[#001A33] border border-slate-900/65 p-5 rounded-none flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/25 rounded-none text-indigo-400">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Net Present Value (NPV)</span>
              <span className="block text-xl font-bold font-sans text-white mt-1 font-mono">{isIndo ? 'Rp 64.2 Triliun' : 'IDR 64.2 Trillion'}</span>
            </div>
          </div>

          <div className="bg-[#001A33] border border-slate-900/65 p-5 rounded-none flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-none text-emerald-400">
              <Landmark className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">{isIndo ? 'Payback Period Efektif' : 'Effective Payback Period'}</span>
              <span className="block text-xl font-bold font-sans text-white mt-1 font-mono">~5.4 {isIndo ? 'Tahun' : 'Years'}</span>
            </div>
          </div>

          <div className="bg-[#001A33] border border-slate-900/65 p-5 rounded-none flex items-center space-x-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-none text-brand-gold">
              <Receipt className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">{isIndo ? 'Average ROI Per Tahun' : 'Average Annual ROI'}</span>
              <span className="block text-xl font-bold font-sans text-white mt-1 font-mono">18.4%</span>
            </div>
          </div>
        </div>

        {/* Projections Visual Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Projections Selector Navigation - Left Panel */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <button
              onClick={() => setActiveMetric('valuation')}
              className={`text-left p-5 rounded-none border transition-all duration-300 cursor-pointer ${
                activeMetric === 'valuation'
                  ? 'bg-brand-gold/10 border-brand-gold text-white'
                  : 'bg-[#001A33] border-slate-900 hover:border-slate-800 hover:bg-[#001026] text-slate-300'
              }`}
            >
              <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold mb-1">
                {isIndo ? 'KAPITALISASI & PROSPEK' : 'CAPITALIZATION & OUTLOOK'}
              </span>
              <h4 className="text-sm font-extrabold font-sans mb-1 uppercase tracking-wider text-white">
                {isIndo ? 'Valuasi Nilai Kawasan' : 'Estate Valuation Growth'}
              </h4>
              <p className="text-xs text-slate-355 font-sans leading-relaxed font-semibold">
                {isIndo 
                  ? 'Pertumbuhan akumulatif total nilai aset bersih (NAV) KIIT seiring rampungnya infrastruktur pelabuhan pendarat kargo dalam 15 tahun.'
                  : 'Accumulative growth of KIIT total net asset value (NAV) over 15 years as landing cargo infrastructure completes.'}
              </p>
            </button>

            <button
              onClick={() => setActiveMetric('profit')}
              className={`text-left p-5 rounded-none border transition-all duration-300 cursor-pointer ${
                activeMetric === 'profit'
                  ? 'bg-brand-gold/10 border-brand-gold text-white'
                  : 'bg-[#001A33] border-slate-900 hover:border-slate-800 hover:bg-[#001026] text-slate-300'
              }`}
            >
              <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold mb-1">
                {isIndo ? 'OPERATIONAL CASHFLOW' : 'OPERATIONAL CASHFLOW'}
              </span>
              <h4 className="text-sm font-extrabold font-sans mb-1 uppercase tracking-wider text-white">
                {isIndo ? 'Arus Pendapatan & Laba Bersih' : 'Revenue Stream & Net Profit'}
              </h4>
              <p className="text-xs text-slate-355 font-sans leading-relaxed font-semibold">
                {isIndo
                  ? 'Distribusi perolehan dividen, hasil sewa guna usaha lahan, sertifikasi energi hijau, serta utilitas pengolahan limbah mandiri.'
                  : 'Distribution of dividend gains, land lease yield, green energy certifications, and industrial waste treatment utilities.'}
              </p>
            </button>

            <button
              onClick={() => setActiveMetric('irr_npv')}
              className={`text-left p-5 rounded-none border transition-all duration-300 cursor-pointer ${
                activeMetric === 'irr_npv'
                  ? 'bg-brand-gold/10 border-brand-gold text-white'
                  : 'bg-[#001A33] border-slate-900 hover:border-slate-800 hover:bg-[#001026] text-slate-300'
              }`}
            >
              <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold mb-1">
                {isIndo ? 'DISCOUNTED CASH FLOW' : 'DISCOUNTED CASH FLOW'}
              </span>
              <h4 className="text-sm font-extrabold font-sans mb-1 uppercase tracking-wider text-white">
                {isIndo ? 'Kurva Kelayakan NPV & IRR Kumulatif' : 'Cumulative NPV & IRR Feasibility Curve'}
              </h4>
              <p className="text-xs text-slate-355 font-sans leading-relaxed font-semibold">
                {isIndo
                  ? 'Toleransi risiko modal investasi yang dikonversikan ke nilai hari ini dengan discount rate 7.8% guna menjamin ketahanan risiko makro.'
                  : 'Investment capital risk tolerance converted to present value with a 7.8% discount rate to handle macro risk.'}
              </p>
            </button>
          </div>

          {/* SVG Visual Chart - Right broad map */}
          <div className="lg:col-span-8 bg-[#001A33] border border-slate-900 p-6 rounded-none flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-6">
                <span className="text-xs font-mono text-slate-300 tracking-widest uppercase font-bold">
                  {selectedMetricLabel}
                </span>
                <span className="text-[10px] font-mono text-brand-gold bg-[#001F3F]/40 border border-brand-gold/20 px-2.5 py-0.5 rounded-none uppercase font-bold tracking-wider">
                  {isIndo ? 'PROYEKSI 15 TAHUN' : '15-YEAR PROJECTION'}
                </span>
              </div>

              {/* Responsive SVG Chart */}
              <div className="w-full h-80 relative flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#1E293B" strokeWidth="0.5" />
                  <line x1="40" y1="70" x2="580" y2="70" stroke="#1E293B" strokeWidth="0.5" />
                  <line x1="40" y1="120" x2="580" y2="120" stroke="#1E293B" strokeWidth="0.5" />
                  <line x1="40" y1="170" x2="580" y2="170" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="40" y1="220" x2="580" y2="220" stroke="#334155" strokeWidth="1" />

                  {/* Left Axis Labels */}
                  <text x="30" y="24" className="fill-slate-500 font-mono text-[9px] font-bold" textAnchor="end">
                    {maxVal}T
                  </text>
                  <text x="30" y="124" className="fill-slate-500 font-mono text-[9px] font-bold" textAnchor="end">
                    {(maxVal / 2).toFixed(1)}T
                  </text>
                  <text x="30" y="224" className="fill-slate-500 font-mono text-[9px] font-bold" textAnchor="end">
                    0
                  </text>

                  {/* SVG Polyline Generator based on selected data */}
                  {(() => {
                    const points = projectionData.map((d, index) => {
                      const xSpace = 40 + index * 105;
                      const val = activeMetric === 'valuation' ? d.valuationAmt : activeMetric === 'profit' ? d.netProfit : d.npvCumulative;
                      // Handle negative offsets (especially on NPV Year 1 & 3)
                      let normalizedVal = val;
                      if (normalizedVal < 0) normalizedVal = 0; // standard lock
                      const yPct = 220 - (normalizedVal / maxVal) * 200;
                      return `${xSpace},${yPct}`;
                    }).join(' ');

                    return (
                      <>
                        {/* Area Gradient Background fill construct */}
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Area Polygon fill */}
                        <polygon
                          points={`40,220 ${points} 565,220`}
                          fill="url(#chartGradient)"
                        />

                        {/* Line vector */}
                        <polyline
                          fill="none"
                          stroke="#D4AF37"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points}
                        />

                        {/* Interactive Data Dots & labels */}
                        {projectionData.map((d, index) => {
                          const xSpace = 40 + index * 105;
                          const val = activeMetric === 'valuation' ? d.valuationAmt : activeMetric === 'profit' ? d.netProfit : d.npvCumulative;
                          let normalizedVal = val;
                          if (normalizedVal < 0) normalizedVal = 0;
                          const yPct = 220 - (normalizedVal / maxVal) * 200;

                          return (
                            <g key={d.year}>
                              {/* Glowing Outer Dot */}
                              <circle cx={xSpace} cy={yPct} r="6" className="fill-brand-gold/10 stroke-brand-gold stroke-2" />
                              <circle cx={xSpace} cy={yPct} r="2" className="fill-white" />
                              
                              {/* Numerical Overlay text value */}
                              <text x={xSpace} y={yPct - 12} className="fill-brand-gold font-sans font-extrabold text-[10px]" textAnchor="middle">
                                {val < 0 ? '-' : ''}Rp {Math.abs(val).toFixed(1)}T
                              </text>
                              
                              {/* Year index timeline label */}
                              <text x={xSpace} y="235" className="fill-slate-400 font-sans text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">
                                {d.label}
                              </text>
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Financial footnotes */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 mt-6 pt-4 border-t border-slate-900 font-mono font-bold">
              <span>{isIndo ? '* Skenario didasarkan pada tingkat inflasi makroekonomi domestik 3.2% - 3.8%' : '* Scenarios are based on domestic macroeconomic inflation rate of 3.2% - 3.8%'}</span>
              <span className="text-brand-gold/80 hover:underline cursor-pointer mt-2 sm:mt-0">{isIndo ? 'Unduh Model Finansial Excel Terkunci (RESTRICTED) >' : 'Download Locked Financial Excel Model (RESTRICTED) >'}</span>
            </div>

          </div>

        </div>

        {/* Dynamic projections table */}
        <div className="bg-[#001A33] border border-slate-900 rounded-none overflow-hidden">
          <div className="p-4 border-b border-slate-900 flex justify-between items-center bg-[#001026]">
            <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
              {isIndo ? 'TABEL MATRIKS PROYEKSI FINANSIAL KIIT (Rp Triliun)' : 'KIIT FINANCIAL PROJECTIONS MATRIX TABLE (IDR Trillion)'}
            </span>
            <span className="text-[10px] font-sans text-emerald-400 font-bold uppercase tracking-wider font-mono">
              {isIndo ? 'Konsolidasi Tahunan' : 'Annual Consolidation'}
            </span>
          </div>
          <div className="overflow-x-auto font-sans">
            <table className="w-full min-w-[700px] text-xs font-mono text-left">
              <thead>
                <tr className="bg-[#001026] text-slate-400 border-b border-slate-900 font-extrabold">
                  <th className="p-4 uppercase">{isIndo ? 'Fase Proyek' : 'Project Phase'}</th>
                  <th className="p-4 uppercase">{isIndo ? 'Alokasi Kapital (Capex Target)' : 'Capital Allocation (Target CapEx)'}</th>
                  <th className="p-4 uppercase">{isIndo ? 'Target Arus Masuk (Revenue)' : 'Target Inflow (Revenue)'}</th>
                  <th className="p-4 uppercase">{isIndo ? 'Margin Laba Setelah Pajak' : 'Net Profit Margin (After Tax)'}</th>
                  <th className="p-4 uppercase">{isIndo ? 'Valuasi Kawasan Ter-Appraisal' : 'Appraised Estate Valuation'}</th>
                  <th className="p-4 text-center uppercase">{isIndo ? 'Tingkat Kelayakan IRR (%)' : 'IRR Feasibility Rate (%)'}</th>
                </tr>
              </thead>
              <tbody>
                {projectionData.map((d, i) => (
                  <tr key={i} className="border-b border-slate-900 hover:bg-slate-900/30 transition-all font-bold">
                    <td className="p-4 font-sans font-extrabold text-slate-300">{d.label}</td>
                    <td className="p-4 text-slate-300">Rp {d.investmentAmt.toFixed(1)} T</td>
                    <td className="p-4 text-emerald-400 font-extrabold">Rp {d.revenueAmt.toFixed(1)} T</td>
                    <td className={`p-4 font-extrabold ${d.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {d.netProfit < 0 ? '-' : ''}Rp {Math.abs(d.netProfit).toFixed(1)} T
                    </td>
                    <td className="p-4 text-brand-gold font-extrabold font-mono">Rp {d.valuationAmt.toFixed(1)} T</td>
                    <td className="p-4 text-center text-white font-extrabold bg-brand-gold/5">{d.irrPct.toFixed(1)} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

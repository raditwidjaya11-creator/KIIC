import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Landmark, ExternalLink, Send, ShieldCheck, Check, Sparkles, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function ContactFooter() {
  const { language } = useLanguage();
  const isIndo = language === 'id';

  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    subject: isIndo ? 'Konsultasi Spasial Lahan' : 'Spatial Land Inquiry',
    message: ''
  });
  const [submittedInquiry, setSubmittedInquiry] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email || !inquiryData.message) {
      setFormError(isIndo ? 'Silahkan lengkapi seluruh field formulir pesan.' : 'Please fill in all the required query form fields.');
      return;
    }
    setFormError('');
    setSubmittedInquiry(true);
  };

  return (
    <footer id="kontak" className="relative bg-[#001026] text-slate-400 overflow-hidden pt-24 border-t border-slate-900 scroll-mt-14 font-sans">
      {/* Structural visual grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact form & Information columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900 items-stretch">
          
          {/* Col 1: Contact channels details - spans 5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 animate-fade-in">
            <div className="space-y-6">
              
              {/* Branded Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#001F3F] flex items-center justify-center rounded-sm border border-brand-gold/30 shadow-sm">
                  <Landmark className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="block font-sans font-extrabold tracking-wider text-white text-lg leading-none">
                    KIIT
                  </span>
                  <span className="block font-sans font-medium tracking-widest text-[9px] text-brand-gold font-mono uppercase mt-0.5">
                    Kertajati Industrial Town
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-sm font-semibold">
                {isIndo
                  ? 'Hubungi Desk Investasi PT Kertajati International Town hari ini untuk menjadwalkan kunjungan lapangan langsung ke area KEK Kertajati, Kabupaten Majalengka.'
                  : 'Contact PT Kertajati International Town Investment Desk today to arrange a physical or virtual site visit to Kertajati SEZ, Kabupaten Majalengka.'}
              </p>

              {/* Social Media Connections */}
              <div className="flex items-center space-x-3 pt-2" id="footer-social-links">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#001F3F]/60 border border-slate-800 hover:border-brand-gold text-slate-400 hover:text-brand-gold hover:bg-[#002d5a]/40 hover:shadow-[0_0_12px_rgba(212,175,55,0.45)] hover:scale-105 transition-all duration-300 rounded-none shadow-sm flex items-center justify-center cursor-pointer"
                  aria-label="LinkedIn"
                  id="footer-social-linkedin"
                >
                  <Linkedin className="w-4 h-4 shadow-sm" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#001F3F]/60 border border-slate-800 hover:border-brand-gold text-slate-400 hover:text-brand-gold hover:bg-[#002d5a]/40 hover:shadow-[0_0_12px_rgba(212,175,55,0.45)] hover:scale-105 transition-all duration-300 rounded-none shadow-sm flex items-center justify-center cursor-pointer"
                  aria-label="Twitter"
                  id="footer-social-twitter"
                >
                  <Twitter className="w-4 h-4 shadow-sm" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#001F3F]/60 border border-slate-800 hover:border-brand-gold text-slate-400 hover:text-brand-gold hover:bg-[#002d5a]/40 hover:shadow-[0_0_12px_rgba(212,175,55,0.45)] hover:scale-105 transition-all duration-300 rounded-none shadow-sm flex items-center justify-center cursor-pointer"
                  aria-label="YouTube"
                  id="footer-social-youtube"
                >
                  <Youtube className="w-4 h-4 shadow-sm" />
                </a>
              </div>

              {/* Specific lists */}
              <div className="space-y-4 pt-3 font-sans text-xs font-semibold">
                
                {/* Channel 1: Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#001F3F]/60 border border-slate-800 text-brand-gold rounded-none shrink-0.5 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-100 uppercase tracking-widest text-[9px] font-mono font-bold">{isIndo ? 'Kantor Pengelola Kertajati' : 'Kertajati Management Office'}</strong>
                    <span className="block text-slate-400 mt-1 font-medium">
                      {isIndo 
                        ? 'Gedung Wisma BIJB Lt. 3, Jl. Bandar Udara Internasional Kabupaten Majalengka, Kec. Kertajati, Kab. Majalengka 45457' 
                        : 'Wisma BIJB Building 3rd Floor, Kabupaten Majalengka International Airport St, Kertajati, Majalengka 45457'}
                    </span>
                  </div>
                </div>

                {/* Channel 2: Telephone */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#001F3F]/60 border border-slate-800 text-brand-gold rounded-none shrink-0.5 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-100 uppercase tracking-widest text-[9px] font-mono font-bold">{isIndo ? 'Infoline & Hubungan Investor' : 'Infoline & Investor Relations'}</strong>
                    <span className="block text-slate-400 mt-1 font-medium">+62 (233) 829-1100 {isIndo ? 's.d' : 'to'} +62 (233) 829-1105</span>
                  </div>
                </div>

                {/* Channel 3: Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#001F3F]/60 border border-slate-800 text-brand-gold rounded-none shrink-0.5 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-100 uppercase tracking-widest text-[9px] font-mono font-bold">{isIndo ? 'Alamat Korespondensi Surat' : 'Postal Mailing Address'}</strong>
                    <span className="block text-slate-400 mt-1 font-medium">inquiry@kertajati-town.co.id</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Official government partnership acknowledgement */}
            <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-none font-sans text-xs flex justify-between items-center sm:max-w-xs md:max-w-md font-semibold">
              <div className="text-left">
                <span className="block text-[8px] font-mono text-slate-500 uppercase leading-none font-bold">Government Partner</span>
                <strong className="text-slate-300 block mt-1 font-extrabold">DPMTSP Kab. Kabupaten Majalengka</strong>
              </div>
              <span className="text-[10px] font-bold text-brand-gold flex items-center space-x-1 font-mono uppercase">
                <span>KEK Kertajati</span>
                <ExternalLink className="w-3" />
              </span>
            </div>

          </div>

          {/* Col 2: Direct submission inquiry Form - spans 7 columns */}
          <div className="lg:col-span-7 bg-[#001026] border border-slate-900 rounded-none p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <AnimatePresence mode="wait">
              {!submittedInquiry ? (
                <motion.div
                  key="inquiry-form-wrapper"
                  className="space-y-6 animate-fade-in"
                >
                  <div className="border-b border-slate-900 pb-3">
                    <span className="text-brand-gold font-mono text-xs font-bold tracking-widest uppercase">
                      {isIndo ? 'HUBUNGI DESK INVESTASI SEKARANG RESMI' : 'OFFICIAL INVESTMENT DESK INQUIRY'}
                    </span>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs font-sans">
                    {formError && (
                      <div className="p-3 bg-red-950/30 border border-red-800 text-red-400 text-xs font-bold">
                        {formError}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-2">{isIndo ? 'Nama Pengirim *' : 'Sender Full Name *'}</label>
                        <input
                          type="text"
                          required
                          placeholder={isIndo ? 'Nama lengkap atau institusi' : 'Full name or organization'}
                          value={inquiryData.name}
                          onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                          className="w-full bg-[#001F3F]/40 border border-slate-800 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-white focus:ring-1 focus:ring-brand-gold/30 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-2">{isIndo ? 'Alamat Surat Elektronik *' : 'Corporate Email Address *'}</label>
                        <input
                          type="email"
                          required
                          placeholder="contoh@investorfund.com"
                          value={inquiryData.email}
                          onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                          className="w-full bg-[#001F3F]/40 border border-slate-800 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-white focus:ring-1 focus:ring-brand-gold/30 font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-2">{isIndo ? 'Subyek / Topik Pembahasan *' : 'Subject of Discussion *'}</label>
                      <select
                        value={inquiryData.subject}
                        onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                        className="w-full bg-[#001F3F]/40 border border-slate-800 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-slate-300 cursor-pointer focus:ring-1 focus:ring-brand-gold/30 font-bold font-semibold text-xs"
                      >
                        <option value={isIndo ? 'Konsultasi Spasial Lahan' : 'Spatial Land Inquiry'}>
                          {isIndo ? 'Konsultasi Spasial Lahan' : 'Spatial Land Inquiry'}
                        </option>
                        <option value={isIndo ? 'Pertanyaan Insentif Tax Holiday' : 'Tax Holiday Incentive Inquiry'}>
                          {isIndo ? 'Pertanyaan Insentif Tax Holiday' : 'Tax Holiday Incentive Inquiry'}
                        </option>
                        <option value={isIndo ? 'Permohonan Kunjungan Lapangan' : 'Site Visit Request'}>
                          {isIndo ? 'Permohonan Kunjungan Lapangan' : 'Site Visit Request'}
                        </option>
                        <option value={isIndo ? 'Pengurusan Kemitraan UMKM Mitra' : 'SME Partnership Coordination'}>
                          {isIndo ? 'Pengurusan Kemitraan UMKM Mitra' : 'SME Partnership Coordination'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-2">{isIndo ? 'Isi Pesan Pertanyaan / Catatan Keperluan *' : 'Message details / Specific Request *'}</label>
                      <textarea
                        required
                        rows={4}
                        placeholder={isIndo ? 'Tuliskan rincian kebutuhan anda di sini secara komprehensif...' : 'Provide comprehensive details describing your development requirements here...'}
                        value={inquiryData.message}
                        onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                        className="w-full bg-[#001F3F]/40 border border-slate-800 focus:border-brand-gold rounded-none py-2.5 px-3 focus:outline-none text-white focus:ring-1 focus:ring-brand-gold/30 resize-none font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-gold hover:bg-[#c5a030] text-brand-navy font-extrabold tracking-widest text-[11px] uppercase transition-colors cursor-pointer rounded-none"
                    >
                      {isIndo ? 'KIRIM PERTANYAAN INVESTASI' : 'SUBMIT INVESTMENT INQUIRY'}
                    </button>

                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="inquiry-success-wrapper"
                  className="space-y-6 text-center py-12 font-sans"
                >
                  <div className="w-16 h-16 bg-[#001F3F] border border-brand-gold/30 text-brand-gold rounded-none flex items-center justify-center mx-auto shadow-xl">
                    <Check className="w-6 h-6 text-brand-gold" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-widest">
                      {isIndo ? 'TEREGISTRASI • SENT' : 'REGISTERED • SENT'}
                    </span>
                    <h4 className="font-sans font-bold text-xl text-white">
                      {isIndo ? 'Pesan Anda Berhasil Terkirim!' : 'Inquiry Sent Successfully!'}
                    </h4>
                    <p className="max-w-sm mx-auto text-xs text-slate-300 leading-relaxed font-sans font-semibold">
                      {isIndo 
                        ? `Terima kasih ${inquiryData.name}, dewan komisaris investasi KIIT di Bandung & Majalengka telah menerima email inquiry Anda. Salinan tiket balasan otomatis dialirkan ke alamat ${inquiryData.email}.`
                        : `Thank you ${inquiryData.name}, the KIIT investment board has received your inquiry. A confirmation receipt has been dispatched to ${inquiryData.email}.`}
                    </p>
                  </div>

                  <div className="pt-4 max-w-xs mx-auto">
                    <button
                      onClick={() => setSubmittedInquiry(false)}
                      className="w-full py-2.5 bg-brand-navy hover:bg-slate-800 border border-slate-800 rounded-none text-xs font-mono tracking-wider text-slate-300 transition-all uppercase cursor-pointer"
                    >
                      {isIndo ? 'Buka Tiket Pesan Baru' : 'Submit Another Ticket'}
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Global legal disclaimer footer section */}
        <div className="py-12 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-6 font-bold">
          <div className="text-center md:text-left font-sans">
            <span>
              {isIndo 
                ? '© 2026 PT Kertajati International Town (KIIT). Seluruh Hak Cipta Dilindungi Undang-Undang.' 
                : '© 2026 PT Kertajati International Town (KIIT). All Rights Reserved.'}
            </span>
            <p className="mt-1 text-[11px] text-slate-600 font-sans font-semibold">
              {isIndo
                ? 'Segala proyeksi NPV, IRR, dan visual arsitektur merupakan pemodelan akademis dan finansial guna presentasi Bupati / Pemkab Kabupaten Majalengka.'
                : 'All financial charts, NPV, IRR models, and masterplan visuals are for academic and modeling presentations for government officials.'}
            </p>
          </div>
          <div className="flex space-x-4 shrink-0 font-bold text-slate-500 hover:text-white transition-colors">
            <span className="hover:underline cursor-pointer">{isIndo ? 'Syarat & Ketentuan' : 'Terms & Conditions'}</span>
            <span>&bull;</span>
            <span className="hover:underline cursor-pointer">{isIndo ? 'Kebijakan Privasi' : 'Privacy Policy'}</span>
            <span>&bull;</span>
            <span className="hover:underline cursor-pointer">{isIndo ? 'Data Room OSS' : 'OSS Data Room'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

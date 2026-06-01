import { InvestorDoc } from '../types';

/**
 * Generates highly realistic, professionally formatted files for download.
 * Generates HTML/CSV files containing detailed records, formulas, tables, and seals
 * from the Government of Kabupaten Majalengka and PT Kertajati International Town.
 */
export function generateDocumentAndDownload(doc: InvestorDoc, isIndo: boolean) {
  const filename = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
  
  if (doc.id === 'doc-fp') {
    // Generate Financial Projection in CSV format
    const csvContent = generateFinancialCSV(isIndo);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerDownload(blob, `${filename}.csv`);
  } else {
    // Generate highly styled corporate/government report in HTML format
    const htmlContent = generateStyledHTMLReport(doc, isIndo);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    triggerDownload(blob, `${filename}.html`);
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function generateFinancialCSV(isIndo: boolean): string {
  if (isIndo) {
    return [
      'Kertajati International Industrial Town (KIIT) - FINANCIAL MODEL V2026',
      'SIMULASI PROYEKSI FINANSIAL & ARUS KAS (CASH FLOW) - 30 TAHUN',
      'Dokumen Rahasia & Terbatas - OJK & BKPM Standards',
      '',
      'Tahun,Pendapatan Sewa Lahan (Miliar Rp),Pendapatan Utilitas & Air (Miliar Rp),Pendapatan Konsesi Gas (Miliar Rp),Biaya Operasional (Miliar Rp),Biaya Konstruksi SIPIL (Miliar Rp),Penghematan Insentif Pajak (Miliar Rp),Arus Kas Bersih (Miliar Rp),EBITDA (Miliar Rp)',
      'Tahun 1,350.00,45.00,30.00,120.00,450.00,45.00,-100.00,305.00',
      'Tahun 2,385.00,51.75,34.50,126.00,380.00,48.50,-34.75,345.25',
      'Tahun 3,423.50,59.50,39.60,132.30,220.00,53.20,170.30,390.30',
      'Tahun 4,465.85,68.40,45.50,138.90,150.00,58.50,280.85,440.85',
      'Tahun 5,512.43,78.60,52.30,145.80,100.00,64.30,401.83,497.53',
      'Tahun 6,563.67,90.40,60.10,153.10,50.00,70.70,511.07,561.07',
      'Tahun 7,620.04,103.90,69.10,160.80,50.00,77.85,559.39,632.24',
      'Tahun 8,682.04,119.50,79.50,168.80,30.00,85.60,682.24,712.24',
      'Tahun 9,750.25,137.40,91.40,177.20,30.00,94.20,771.85,801.85',
      'Tahun 10,825.28,158.00,105.15,186.10,15.00,103.60,887.33,902.33',
      'Tahun 11,907.80,181.70,120.90,195.40,15.00,114.00,999.00,1014.00',
      'Tahun 12,998.58,209.00,139.00,205.20,15.00,125.40,1121.78,1136.78',
      'Tahun 13,1098.44,240.35,159.85,215.50,15.00,137.90,1268.14,1283.14',
      'Tahun 14,1208.28,276.40,183.80,226.30,10.00,151.70,1432.18,1442.18',
      'Tahun 15,1329.11,317.85,211.35,237.60,10.00,166.90,1610.71,1620.71',
      'Tahun 16-30 (Proyeksi Rata-rata),2150.00,450.00,310.00,285.00,5.00,220.00,2620.00,2625.00',
      '',
      'ANALISIS INVESTASI UTAMA INDIKATIF:',
      'Net Present Value (NPV) pada Discount Rate 8.5%:,Rp 14.85 Triliun',
      'Internal Rate of Return (IRR) Proyek:,24.62%',
      'Payback Period Rata-Rata Penyewa:,4.8 Tahun (Tergantung Sektor Konstruksi)',
      'Suku Bunga Penjaminan Investasi:,A+ Sovereign Guarantee Standard',
      '',
      'Disusun & Disahkan oleh Tim Appraisal Independen bersama Dinas PMTSP dan Bappeda Kabupaten Majalengka.'
    ].join('\n');
  } else {
    return [
      'Kertajati International Industrial Town (KIIT) - FINANCIAL MODEL V2026',
      'FINANCIAL PROJECTIONS & CASH FLOW SIMULATIONS - 30 YEARS',
      'Confidential & Restricted Document - OJK & BKPM Standards',
      '',
      'Year,Land Lease Income (Billion IDR),Utilities & Water Income (Billion IDR),Gas Concession Revenue (Billion IDR),Operational Expenses (Billion IDR),Civil Construction Costs (Billion IDR),Incentive Tax Savings (Billion IDR),Net Cash Flow (Billion IDR),EBITDA (Billion IDR)',
      'Year 1,350.00,45.00,30.00,120.00,450.00,45.00,-100.00,305.00',
      'Year 2,385.00,51.75,34.50,126.00,380.00,48.50,-34.75,345.25',
      'Year 3,423.50,59.50,39.60,132.30,220.00,53.20,170.30,390.30',
      'Year 4,465.85,68.40,45.50,138.90,150.00,58.50,280.85,440.85',
      'Year 5,512.43,78.60,52.30,145.80,100.00,64.30,401.83,497.53',
      'Year 6,563.67,90.40,60.10,153.10,50.00,70.70,511.07,561.07',
      'Year 7,620.04,103.90,69.10,160.80,50.00,77.85,559.39,632.24',
      'Year 8,682.04,119.50,79.50,168.80,30.00,85.60,682.24,712.24',
      'Year 9,750.25,137.40,91.40,177.20,30.00,94.20,771.85,801.85',
      'Year 10,825.28,158.00,105.15,186.10,15.00,103.60,887.33,902.33',
      'Year 11,907.80,181.70,120.90,195.40,15.00,114.00,999.00,1014.00',
      'Year 12,998.58,209.00,139.00,205.20,15.00,125.40,1121.78,1136.78',
      'Year 13,1098.44,240.35,159.85,215.50,15.00,137.90,1268.14,1283.14',
      'Year 14,1208.28,276.40,183.80,226.30,10.00,151.70,1432.18,1442.18',
      'Year 15,1329.11,317.85,211.35,237.60,10.00,166.90,1610.71,1620.71',
      'Year 16-30 (Projected Mean),2150.00,450.00,310.00,285.00,5.00,220.00,2620.00,2625.00',
      '',
      'INDICATIVE MAIN INVESTMENT ANALYSIS:',
      'Net Present Value (NPV) at 8.5% Discount Rate:,Rp 14.85 Trillion',
      'Project Internal Rate of Return (IRR):,24.62%',
      'Tenant Mean Payback Period:,4.8 Years (Depending on Construction Speed)',
      'Investment Guarantee System:,A+ Sovereign Guarantee Standard',
      '',
      'Compiled & Ratified by Independent Appraisals in collaboration with Majalengka Region PMTSP & Bappeda.'
    ].join('\n');
  }
}

function generateStyledHTMLReport(doc: InvestorDoc, isIndo: boolean): string {
  // Common styles
  const style = `
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background-color: #f8fafc; color: #011627; margin: 0; padding: 40px 20px; line-height: 1.6; }
    .container { max-width: 850px; margin: 0 auto; background: #ffffff; padding: 50px 60px; border: 1px solid #e2e8f0; border-radius: 0px; box-shadow: 0 4px 12px rbg(0,16,38,0.05); }
    .header { border-bottom: 3px double #d4af37; padding-bottom: 25px; margin-bottom: 35px; text-align: center; }
    .coat-of-arms { font-size: 11px; font-weight: bold; tracking-wider; text-transform: uppercase; color: #1e3a8a; margin-bottom: 8px; letter-spacing: 2px; }
    .regency { font-size: 16px; font-weight: 800; text-transform: uppercase; color: #001026; margin: 0; }
    .company { font-size: 14px; font-weight: 700; color: #8a6d1c; margin-top: 2px; }
    .doc-meta { font-family: monospace; font-size: 11px; color: #64748b; margin-top: 15px; }
    .title-area { margin-bottom: 30px; text-align: left; }
    .title-badge { display: inline-block; background-color: #001026; color: #d4af37; font-family: monospace; font-size: 9px; font-weight: bold; padding: 3px 8px; text-transform: uppercase; margin-bottom: 10px; }
    h1 { font-size: 24px; font-weight: 800; color: #001026; margin: 0 0 10px 0; line-height: 1.25; }
    h2 { font-size: 16px; font-weight: 700; color: #001026; border-left: 4px solid #d4af37; padding-left: 10px; margin: 30px 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px; }
    p { font-size: 13.5px; color: #334155; margin: 0 0 15px 0; text-align: justify; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12.5px; }
    th { background: #001026; color: #ffffff; font-weight: 700; text-align: left; padding: 10px 12px; border: 1px solid #1e293b; }
    td { padding: 9px 12px; border: 1px solid #e2e8f0; }
    tr:nth-child(even) { background-color: #ffd700/5; }
    .security-stamp { border: 2px dashed #d4af37; padding: 15px; margin: 30px 0; background-color: #fffaf0; text-align: center; }
    .security-stamp-title { font-weight: 800; font-size: 12px; color: #8a6d1c; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 5px; }
    .security-stamp-details { font-family: monospace; font-size: 10.5px; color: #475569; }
    .signature-block { display: flex; justify-content: space-between; margin-top: 50px; font-size: 11.5px; }
    .sig-col { text-align: center; width: 40%; }
    .sig-line { margin-top: 55px; border-top: 1px solid #000; padding-top: 5px; font-weight: 700; }
    .footer-note { font-size: 11px; text-align: center; color: #94a3b8; border-t: 1px solid #e2e8f0; margin-top: 45px; padding-top: 15px; }
  `;

  let bodyContent = '';

  if (doc.id === 'doc-fs') {
    bodyContent = isIndo ? `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // OJK-OVERSIGHT</span>
        <h1>STUDI KELAYAKAN FINANSIAL & OPERASIONAL KIIT</h1>
        <div class="doc-meta">No. Registrasi Dokumen: KIIT/FS/MAJALENGKA-2026/Rev.4</div>
      </div>
      
      <p>Laporan kelayakan komprehensif ini menganalisis pendirian Kertajati International Industrial Town (KIIT) di Kabupaten Majalengka sebagai simpul industri manufaktur presisi modern. Berdasarkan penelitian pasar intensif dan pengesahan status Kawasan Ekonomi Khusus (KEK) oleh Dewan KEK Provinsi Jawa Barat bersama Bupati Majalengka, proyek ini memiliki kelayakan fundamental yang sangat kokoh.</p>

      <h2>1. RINGKASAN PARAMETER EKONOMI</h2>
      <table>
        <thead>
          <tr>
            <th>Parameter Kelayakan</th>
            <th>Proyeksi Estimasi Nilai</th>
            <th>Metode Penilaian / Referensi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nilai Total Investasi Lahan (CapEx)</td>
            <td>Rp 10.5 Triliun (Fase I & II)</td>
            <td>Rencana Sektor Infrastruktur Sipil</td>
          </tr>
          <tr>
            <td>Net Present Value (NPV)</td>
            <td>Rp 14.85 Triliun</td>
            <td>Discount Rate 8.5% (Taraf Konsesi)</td>
          </tr>
          <tr>
            <td>Internal Rate Of Return (IRR)</td>
            <td>24.62%</td>
            <td>Atas dasar masa konsesi sewa 30-50 Tahun</td>
          </tr>
          <tr>
            <td>Payback Period Kawasan</td>
            <td>6.5 Tahun dari fase commissioning</td>
            <td>Rencana Amortisasi Investasi</td>
          </tr>
        </tbody>
      </table>

      <h2>2. INTEGRASI MULTIMODA LOGISTIK</h2>
      <p>KIIT menawarkan keunggulan tak tertandingi di Indonesia berupa konektivitas perimeter langsung dengan Bandara Internasional Jawa Barat (BIJB) Kertajati melalui Koridor Penerbangan Pintar (Smart Aviation Corridor) sejauh 1.2 KM. Hal ini memangkas dwelling time logistik internasional hingga 40% dan mempercepat proses kepabeanan (customs clearance) lewat skema KEK Terpadu.</p>
      
      <h2>3. PROGRAM KEPATUHAN PEMERINTAH DAERAH</h2>
      <p>Pemerintah Kabupaten Majalengka bekerjasama dengan Bappeda dan BPN untuk menerbitkan kepastian hukum status sertifikat Hak Guna Bangunan (HGB) Induk yang bebas dari rintangan sengketa agraria. Seluruh program pembebasan lahan sebesar 68.5% telah diakomodasi melalui ganti rugi humanis yang aman.</p>
    ` : `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // OJK-OVERSIGHT</span>
        <h1>KIIT FEASIBILITY STUDY (FS) - COMPREHENSIVE EDITION</h1>
        <div class="doc-meta">Document Reference: KIIT/FS/MAJALENGKA-2026/Rev.4</div>
      </div>
      
      <p>This comprehensive feasibility study details the functional setup of Kertajati International Industrial Town (KIIT) in Kabupaten Majalengka as a key center for high-tech precision manufacturing. Validated under designated Special Economic Zone (SEZ) status, backed by regional boards and the Regent of Majalengka, this masterplan displays extremely strong financial viability.</p>

      <h2>1. ECONOMIC PARAMETER SUMMARY</h2>
      <table>
        <thead>
          <tr>
            <th>Viability Parameter</th>
            <th>Projected Estimates</th>
            <th>Assessment Method / Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Land CapEx (Phase I & II)</td>
            <td>IDR 10.5 Trillion</td>
            <td>Civil Infrastructure Development Plan</td>
          </tr>
          <tr>
            <td>Net Present Value (NPV)</td>
            <td>IDR 14.85 Trillion</td>
            <td>At 8.5% Discount Rate (Sovereign Level)</td>
          </tr>
          <tr>
            <td>Internal Rate Of Return (IRR)</td>
            <td>24.62%</td>
            <td>Based on a 30 to 50-Year Lease Framework</td>
          </tr>
          <tr>
            <td>Estate Payback Period</td>
            <td>6.5 Years from initial commissioning</td>
            <td>Amortization & Revenue Modellings</td>
          </tr>
        </tbody>
      </table>

      <h2>2. MULTI-MODAL LOGISTICS CONVERGENCE</h2>
      <p>KIIT offers a unique competitive advantage in Indonesia featuring integrated access to Majalengka Kertajati Airport (BIJB) through a 1.2 KM physical Smart Aviation Corridor. This bypasses typical municipal transport friction and slashes international custom inspection delays by more than 40%.</p>
      
      <h2>3. MUNICIPAL & AGRARIAN ALIGNMENT</h2>
      <p>The Government of Majalengka alongside Bappeda and BPN Agrarian Agencies has guaranteed clear legal titles (HGB) for all plots inside KIIT boundaries. This minimizes structural risks for investors, securing a frictionless investment runway.</p>
    `;
  } else if (doc.id === 'doc-mp') {
    bodyContent = isIndo ? `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // BAPPEDA-APPROVED</span>
        <h1>KIIT MASTERPLAN & URBAN DESIGN GUIDELINES (UDGL)</h1>
        <div class="doc-meta">Nomor Publikasi Sipil: KIIT/MP-UDGL/2026/A</div>
      </div>
      
      <p>Pedoman Desain Tata Kota Utama (Urban Design Guidelines / UDGL) ini mengatur pemetaan spasial fisik kawasan seluas 1.000 hektare KIIT Kabupaten Majalengka. Tujuannya adalah membina pertumbuhan industri berskala berat dan presisi yang selaras dengan keberlanjutan arsitektur hijau.</p>

      <h2>1. ALOKASI ZONA SPASIAL UTAMA</h2>
      <table>
        <thead>
          <tr>
            <th>Nama Klaster Sektoral</th>
            <th>Luas Tanah (Ha)</th>
            <th>Zonasi Khusus (KDB / KLB / KDH)</th>
            <th>Fokus Teknis Utama</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Manufaktur Blok High-Tech</td>
            <td>350 Ha</td>
            <td>60% / 1.8 / 20%</td>
            <td>Robotik, IoT, komponen presisi</td>
          </tr>
          <tr>
            <td>Pusat Logistik Pintar</td>
            <td>200 Ha</td>
            <td>65% / 2.0 / 15%</td>
            <td>Automated Storage ASRS, Cold Chain</td>
          </tr>
          <tr>
            <td>Aerospace Aviation Town</td>
            <td>100 Ha</td>
            <td>50% / 1.2 / 20%</td>
            <td>Fuselage assembly, MRO, Kargo Langsung</td>
          </tr>
          <tr>
            <td>Klaster Ekosistem EV</td>
            <td>100 Ha</td>
            <td>60% / 1.6 / 20%</td>
            <td>Perakitan mobil listrik, baterai lithium</td>
          </tr>
          <tr>
            <td>Modern Agro-Industry Area</td>
            <td>80 Ha</td>
            <td>55% / 1.5 / 25%</td>
            <td>Sertifikasi ekspor pangan, pemrosesan steril</td>
          </tr>
        </tbody>
      </table>

      <h2>2. SPESIFIKASI INFRASTRUKTUR TEKNIK</h2>
      <p>Setiap kavling dibekali utilitas siap bangun dengan sistem pipa kustom bawah tanah (underground utility trench), memisahkan air bersih industri, serat optik bandwidth gigabit, pipa gas alam industri bertekanan tinggi dari Perusahaan Gas Negara (PGN), serta suplai listrik terproteksi dari gardu distribusi PLN 150 KV.</p>
    ` : `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // BAPPEDA-APPROVED</span>
        <h1>KIIT MASTERPLAN & URBAN DESIGN GUIDELINES (UDGL)</h1>
        <div class="doc-meta">Civil Publication Reference: KIIT/MP-UDGL/2026/A</div>
      </div>
      
      <p>This Urban Design Guidelines (UDGL) framework governs the physical spatial mapping representing 1,000 hectares of premium lot spaces at Kertajati International Industrial Town. It sets strict engineering criteria to foster synchronized macro-operations alongside low-impact sustainable footprints.</p>

      <h2>1. CORE SPATIAL ALLOCATION</h2>
      <table>
        <thead>
          <tr>
            <th>Sectoral Cluster Name</th>
            <th>Land Area (Ha)</th>
            <th>Building Cover / Plot Ratio / Green Ratio</th>
            <th>Primary Technical Focus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>High-Tech Manufacturing Block</td>
            <td>350 Ha</td>
            <td>60% / 1.8 / 20%</td>
            <td>Precision robotics, IoT components</td>
          </tr>
          <tr>
            <td>Smart Logistics Hub</td>
            <td>200 Ha</td>
            <td>65% / 2.0 / 15%</td>
            <td>Automated ASRS storage, Cold chains</td>
          </tr>
          <tr>
            <td>Aerospace Aviation Town</td>
            <td>100 Ha</td>
            <td>50% / 1.2 / 20%</td>
            <td>MRO systems, direct airfield taxiways</td>
          </tr>
          <tr>
            <td>EV Electric Ecosystem</td>
            <td>100 Ha</td>
            <td>60% / 1.6 / 20%</td>
            <td>Car assemblers, lithium battery processing</td>
          </tr>
          <tr>
            <td>Agro-Processing Yard</td>
            <td>80 Ha</td>
            <td>55% / 1.5 / 25%</td>
            <td>Export-standard packing, sterile testing labs</td>
          </tr>
        </tbody>
      </table>

      <h2>2. CIVIL UTILITY TRENCH DESIGNS</h2>
      <p>Every industrial plot integrates specialized underground utility conduits, separating fiber broadband lines, piped natural gas networks managed by PGAS, premium pure industrial water delivery channels, and high-voltage backup circuits connected to the PLN 150 KV substation.</p>
    `;
  } else if (doc.id === 'doc-amdal') {
    bodyContent = isIndo ? `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // PENILAIAN LINGKUNGAN</span>
        <h1>ANALISIS MENGENAI DAMPAK LINGKUNGAN (AMDAL) KIIT</h1>
        <div class="doc-meta">No. Register AMDAL: LH-MAJALENGKA/AMDAL/2026-X</div>
      </div>
      
      <p>Dokumen AMDAL ini menguji kelayakan aspek ekologi dari proyek Kertajati International Industrial Town (KIIT). Tim penilai yang terdiri atas pemerhati kehutanan, ahli hidrologi tanah dari Pemkab Majalengka, dan dewan ekologi nasional menyatakan KIIT memenuhi standar kepatuhan hijau tanpa membahayakan habitat satwa lokal atau kualitas air permukaan Majalengka.</p>

      <h2>1. METRIK PENILAIAN DAMPAK EKOLOGI</h2>
      <table>
        <thead>
          <tr>
            <th>Sektor Kelayakan</th>
            <th>Target Pengurangan Emisi / Pengolahan</th>
            <th>Metode Mitigasi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Air Limbah Industri (Greywater)</td>
            <td>Recycle & Sirkularisasi 95% limbah cair</td>
            <td>Intalasi Pengolahan Air Limbah (IPAL) Bio-Membran Mandiri</td>
          </tr>
          <tr>
            <td>Karbon & Emisi Udara</td>
            <td>Reduksi 45% Ton CO2e dibanding standar</td>
            <td>Pembangunan Panel Surya Atap 100 MW & Buffer Zone RTH 120 Ha</td>
          </tr>
          <tr>
            <td>Kebisingan & Getaran</td>
            <td>Maksimal 65 dB di batas pemukiman warga</td>
            <td>Sabuk hijau (Green Belt) rapat di keliling zona manufaktur berat</td>
          </tr>
          <tr>
            <td>Lumpur & Limbah B3</td>
            <td>Zero Hazardous Landfill</td>
            <td>Kemitraan berlisensi dengan pengolah B3 nasional yang bersertifikat</td>
          </tr>
        </tbody>
      </table>

      <h2>2. PERIZINAN AMDAL DI TINGKAT KABUPATEN</h2>
      <p>Sistem AMDAL telah disinergikan ke dalam skema perizinan One-Stop-Service (OSS) KEK Kertajati, memangkas proses registrasi dan evaluasi menjadi hanya 14 hingga 30 hari pengerjaan bagi investor baru yang menggunakan klaster industri hijau KIIT.</p>
    ` : `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // ENVIRONMENTAL ACCOUNTING</span>
        <h1>ENVIRONMENTAL IMPACT ASSESSMENT (EIA / AMDAL) - NEW EDITION</h1>
        <div class="doc-meta">EIA Reference Approval: LH-MAJALENGKA/AMDAL/2026-X</div>
      </div>
      
      <p>This Environmental Impact Assessment (EIA/AMDAL) reports on the ecological parameters governing the construction of Kertajati International Industrial Town (KIIT). Formulated under standards certified by SGS and verified by the Majalengka Bappeda, KIIT satisfies criteria for climate stewardship and circular resource preservation.</p>

      <h2>1. ECOLOGICAL PERFORMANCE METRICS</h2>
      <table>
        <thead>
          <tr>
            <th>Assessment Sector</th>
            <th>Target Efficiency Outcomes</th>
            <th>Mitigation / Protection Systems</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Industrial Greywater Treatment</td>
            <td>95% of active discharges recursively recycled</td>
            <td>Dual Bio-Membrane Wastewater Treatment Plants (WWTP)</td>
          </tr>
          <tr>
            <td>CO2 Air Discharges</td>
            <td>45% Reduction in total carbon equivalents</td>
            <td>100 MW rooftop photovoltaics & 120 Ha carbon-sink reserve</td>
          </tr>
          <tr>
            <td>Acoustic Control</td>
            <td>Less than 65 dB at the boundary fence</td>
            <td>Multi-layer botanical green buffer surrounding heavy zones</td>
          </tr>
          <tr>
            <td>Hazardous (B3) Management</td>
            <td>100% Zero-Landfill compliance</td>
            <td>Licensed partner contracts with national waste treatment complexes</td>
          </tr>
        </tbody>
      </table>

      <h2>2. REGULATORY STREAMLINING UNDER SEZ LAWS</h2>
      <p>EIA filings are fully integrated within the dedicated SEZ One-Stop-Service (OSS) hub. This reduces typical compliance validation barriers for incoming developers, expediting environmental permissions within 14 to 30 business days.</p>
    `;
  } else if (doc.id === 'doc-pp') {
    bodyContent = isIndo ? `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // GLOBAL-INVITE</span>
        <h1>INVESTMENT PROSPECTUS - PT KERTAJATI INTERNATIONAL TOWN</h1>
        <div class="doc-meta">No. Publikasi Prospektus: KIIT/IP-GOLDEN/2026</div>
      </div>
      
      <p>Selamat datang di penawaran investasi Kertajati International Industrial Town (KIIT) di Kabupaten Majalengka. Sebagai proyek strategis nasional terpadu yang didorong oleh kemajuan digital, KIIT memajukan standar tata kelola sirkular, kesiapan struktur konstruksi modern, dan insentif fiskal luar biasa dalam Kawasan Ekonomi Khusus.</p>

      <h2>1. STRUKTUR INSENTIF UTAMA BAGI PENYEWA (TENANT)</h2>
      <table>
        <thead>
          <tr>
            <th>Kategori Insentif</th>
            <th>Fasilitas Fiskal dari Pemerintah Pusat & Daerah</th>
            <th>Persyaratan Minimum / Cakupan Sektoral</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Super Tax Holiday (PPh)</td>
            <td>Bebas Pajak Penghasilan (PPh) Badan 100% hingga 20 tahun</td>
            <td>Investasi minimum Rp 500 Miliar (Klaster Pionir)</td>
          </tr>
          <tr>
            <td>Pembebasan Bea Impor</td>
            <td>0% Bea Masuk barang modal, bahan baku, kargo mesin</td>
            <td>Berlaku untuk semua tenant manufaktur KEK Terdaftar</td>
          </tr>
          <tr>
            <td>Penangguhan PPN</td>
            <td>Pembebasan PPN 11% untuk rantai pasok lokal antar KEK</td>
            <td>Transaksi logistik berikat khusus dalam batas wilayah</td>
          </tr>
          <tr>
            <td>Relaksasi Pajak Daerah</td>
            <td>Diskon PBB 50%-100% selama masa pengerjaan struktur sipil</td>
            <td>Disetujui dan ditandatangani melalui SK Bupati</td>
          </tr>
        </tbody>
      </table>

      <h2>2. HUBUNGAN STRATEGIS DENGAN PEMERINTAH DAERAH</h2>
      <p>Pemkab Kabupaten Majalengka di bawah arahan Bupati Majalengka menjamin transparansi tinggi, bebas pungutan liar, keamanan investor asing, serta program sinergi tenaga kerja lokal melalui KIIT Vocational Council agar operasional pabrik Anda berjalan lancar sepanjang tahun.</p>
    ` : `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // GLOBAL-INVITE</span>
        <h1>INVESTMENT PROSPECTUS - PT KERTAJATI INTERNATIONAL TOWN</h1>
        <div class="doc-meta">Prospectus Reference: KIIT/IP-GOLDEN/2026</div>
      </div>
      
      <p>Welcome to the flagship investment prospectus for Kertajati International Industrial Town (KIIT) in Kabupaten Majalengka. Positioned as Indonesia\'s flagship sustainable manufacturing zone, KIIT introduces unparalleled logistics connectivity, cutting-edge civil infrastructure, and designated SEZ privileges.</p>

      <h2>1. CORE TENANT INCENTIVE HIGHLIGHTS</h2>
      <table>
        <thead>
          <tr>
            <th>Exemption Category</th>
            <th>Incentive Scope (Fiscal & Non-Fiscal Benefit)</th>
            <th>Minimum Investments / Sector Coverage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Super Tax Holiday (CIT)</td>
            <td>100% Corporate Income Tax waiver for up to 20 years</td>
            <td>Minimum IDR 500 Billion capital injection (Pioneer Sectors)</td>
          </tr>
          <tr>
            <td>Duty-Free Customs Channel</td>
            <td>0% Import duties on capital machinery, parts, and materials</td>
            <td>Applies blanket-wide to all registered SEZ manufacturers</td>
          </tr>
          <tr>
            <td>VAT Exemption (PPN)</td>
            <td>100% suspension of standard 11% VAT on local supply links</td>
            <td>Frictionless logistics within bounds of Bonded Special Zones</td>
          </tr>
          <tr>
            <td>Property Tax Remissions</td>
            <td>50% to 100% discount on land/building taxes during civil builds</td>
            <td>Formally authorized under regulatory decree of Majalengka Regent</td>
          </tr>
        </tbody>
      </table>

      <h2>2. STRATEGIC MUNICIPAL COOPERATIVE AGREEMENT</h2>
      <p>The Government of Majalengka, on behalf of the Regent, guarantees secure investor safeguards, transparent local tax codes, quick expat visual entry, and access to trained talents through the localized joint KIIT Vocational Council.</p>
    `;
  } else if (doc.id === 'doc-law') {
    bodyContent = isIndo ? `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // LEGAL-REGULATORY</span>
        <h1>SURAT KEPUTUSAN BUPATI KABUPATEN MAJALENGKA</h1>
        <div class="doc-meta">No. SK Kepala Daerah: SK-BUPATI/MAJALENGKA-KEK/2026-X4</div>
      </div>
      
      <p>Menimbang rencana pembangunan strategis Rebana Jabar dan proyeksi tata hidup industri Kertajati International Industrial Town (KIIT), Kepala Daerah Kabupaten Majalengka bersama Kementerian Perindustrian menyepakati pengesahan peraturan operasional khusus di dalam kawasan industri.</p>

      <h2>1. KETETAPAN REGULASI PERUSAHAAN MITRA</h2>
      <table>
        <thead>
          <tr>
            <th>Pasal Keputusan</th>
            <th>Ruang Lingkup Hak Hukum Investor Swasta</th>
            <th>Klausul Perlindungan Penunjang</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kepemilikan Asing (FDI)</td>
            <td>Otorisasi Penanaman Modal Asing (PMA) hingga kepemilikan modal 100%</td>
            <td>Dilindungi Undang-Undang Cipta Kerja Republik Indonesia</td>
          </tr>
          <tr>
            <td>Hak Guna Bangunan (HGB)</td>
            <td>Garansi masa perpanjangan sewa tanah murni hingga 80 tahun total</td>
            <td>Sertifikat HGB atas nama pengelola dijamin oleh kantor BPN</td>
          </tr>
          <tr>
            <td>Tenaga Kerja Ahli Asing</td>
            <td>Percepatan Visa Tinggal Terbatas (KITAS) dari Imigrasi 48 Jam</td>
            <td>Sinergi layanan prioritas di Kantor PMTSP Majalengka</td>
          </tr>
          <tr>
            <td>Keamanan Operasional</td>
            <td>Penetapan area KIIT sebagai Objek Vital Nasional (OBVITNAS)</td>
            <td>Pengamanan aparat Kepolisian Kepolisian RI dan Pol PP 24 Jam</td>
          </tr>
        </tbody>
      </table>

      <h2>2. KOMITMEN ANTI-PUNGLI & PENYEDERHANAAN BIROKRASI</h2>
      <p>Dinas Penanaman Modal Pelayanan Terpadu Satu Pintu (DPMPTSP) Kabupaten Majalengka dilarang melakukan pungutan tambahan di luar aturan yang tertulis secara formal. Seluruh prosedur pengisian dokumen telah terdigitalisasi penuh dalam sistem online.</p>
    ` : `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality} // LEGAL-REGULATORY</span>
        <h1>SURAT KEPUTUSAN BUPATI KABUPATEN MAJALENGKA</h1>
        <div class="doc-meta">Regent Decree Ordinance Number: SK-BUPATI/MAJALENGKA-KEK/2026-X4</div>
      </div>
      
      <p>Considering the regional development roadmap of the Rebana Jabar initiative and the master zoning plans representing Kertajati International Industrial Town (KIIT), the Governor and Administration of Kabupaten Majalengka, together with the Ministry of Industry, have formalized unique regulatory protections for registered investors.</p>

      <h2>1. LEGAL RIGHTS SECURED FOR INVESTMENT PARTNERS</h2>
      <table>
        <thead>
          <tr>
            <th>Ordinance Section</th>
            <th>Scope of Legal Protections for Private Consortiums</th>
            <th>Associated Security Underwritings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foreign Ownership (FDI)</td>
            <td>100% foreign equity ownership allowed for pioneer manufactures</td>
            <td>Protected under central Omnibus Job Creation Act of Indonesia</td>
          </tr>
          <tr>
            <td>Land Tenure Security</td>
            <td>Guaranteed extension renewals of HGB (Right-to-Build) up to 80 years</td>
            <td>Direct registration protected by government BPN land offices</td>
          </tr>
          <tr>
            <td>Expert Visa (KITAS)</td>
            <td>Expat expert residency clearances expedited within 48 hours</td>
            <td>Direct processing at the Majalengka One-Stop-Service counter</td>
          </tr>
          <tr>
            <td>Aset Protection</td>
            <td>Official status inside KIIT registered as National Vital Assets</td>
            <td>Continuous patrol safety and secure infrastructure boundaries</td>
          </tr>
        </tbody>
      </table>

      <h2>2. ANTI-BUREAUCRACY & CORRUPTION ELIMINATION CODE</h2>
      <p>The DPMPTSP PMSTP agency of Majalengka is strictly prohibited from enforcing municipal administrative levies outside officially documented codes, ensuring transparent transactions online via digital platforms.</p>
    `;
  } else {
    // Default fallback
    bodyContent = `
      <div class="title-area">
        <span class="title-badge">${doc.confidentiality}</span>
        <h1>${doc.title}</h1>
        <div class="doc-meta">Doc ID: ${doc.id}</div>
      </div>
      <p>This is the official preview of ${doc.title} with size ${doc.size}. Classified under ${doc.confidentiality} status, access is allowed according to the security guidelines of PT Kertajati International Town and Kabupaten Majalengka.</p>
    `;
  }

  return `
    <!DOCTYPE html>
    <html lang="${isIndo ? 'id' : 'en'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${doc.title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>${style}</style>
    </head>
    <body>
      <div class="container">
        
        <div class="header">
          <div class="coat-of-arms">REPUBLIK INDONESIA</div>
          <div class="regency">PEMERINTAH KABUPATEN MAJALENGKA</div>
          <div class="company">PT KERTAJATI INTERNATIONAL TOWN</div>
          <div style="font-size: 10px; color: #64748b; margin-top: 5px; font-weight: 600;">COORDINATION COMMITTEE &mdash; SEZ BOARD ADMIN</div>
        </div>

        ${bodyContent}

        <div class="security-stamp">
          <div class="security-stamp-title">AUTHENTICATED DIGITAL ARTIFACT</div>
          <div class="security-stamp-details">
            BLOCKCHAIN SECURE ID: KIIT-SECURE-ID-${doc.id.toUpperCase()}-2026-X83C<br>
            SECURITY CLASSIFICATION: ${doc.confidentiality.toUpperCase()}<br>
            VERIFIED BY: DINAS PMTSP & BAPPEDA KABUPATEN MAJALENGKA (1 JUNE 2026)
          </div>
        </div>

        <div class="signature-block">
          <div class="sig-col">
            <div>${isIndo ? 'Disetujui oleh Kepala Daerah:' : 'Authorized by Governor:'}</div>
            <div class="sig-line">BUPATI KABUPATEN MAJALENGKA</div>
          </div>
          <div class="sig-col">
            <div>${isIndo ? 'Disetujui oleh Direksi Pengelola:' : 'Authorized by Executive Board:'}</div>
            <div class="sig-line">PT KERTAJATI INTERNATIONAL TOWN</div>
          </div>
        </div>

        <div class="footer-note">
          ${isIndo 
            ? 'Dokumen Elektronik ini sah dan mengikat secara hukum sejak diunduh dari Portal Investor Terpadu KIIT.' 
            : 'This electronic artifact is valid and legally binding from the moment is retrieved from the KIIT Integrated Investor Portal.'}
        </div>

      </div>
    </body>
    </html>
  `;
}

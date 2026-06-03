import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  MapPin, 
  Maximize2, 
  Minimize2, 
  Download, 
  RefreshCw, 
  FileSpreadsheet, 
  Lock, 
  HelpCircle, 
  Activity, 
  Globe, 
  Info, 
  Edit3, 
  Save, 
  Check, 
  Ban, 
  Database, 
  Layers,
  FileText,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

// Types for Masterplan Feature properties
interface MasterplanProperties {
  id: string;
  nama_zona: string;
  kategori: string;
  status: string;
  luas_ha: number;
  investor: string;
  nilai_investasi?: string;
  progress_pembangunan?: string;
  utilitas?: string;
}

interface GeoJsonFeature {
  type: string;
  id: string;
  properties: MasterplanProperties;
  geometry: {
    type: string;
    coordinates: any;
  };
}

interface GeoJsonCollection {
  type: string;
  features: GeoJsonFeature[];
}

export default function Masterplan() {
  const { language } = useLanguage();
  const isIndo = language === 'id';

  // State Management
  const [geoData, setGeoData] = useState<GeoJsonCollection | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchInvestor, setSearchInvestor] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // SVG Pan & Zoom State
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMinimapDragging, setIsMinimapDragging] = useState<boolean>(false);

  // Firestore Sync State
  const [firestoreData, setFirestoreData] = useState<Record<string, any>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Form Fields for Sync/Editing
  const [editForm, setEditForm] = useState<any>({
    nama_zona: '',
    luas_ha: 0,
    status: 'Tersedia',
    investor: 'None',
    nilai_investasi: '',
    progress_pembangunan: '',
    utilitas: ''
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Bounding box mapping projection
  const lnMin = 108.238, lnMax = 108.285;
  const ltMin = -6.652, ltMax = -6.602;

  const projectPoint = (lng: number, lat: number): [number, number] => {
    // scale to beautiful SVG bounding box size (800x600)
    const x = ((lng - lnMin) / (lnMax - lnMin)) * 740 + 30;
    const y = 570 - ((lat - ltMin) / (ltMax - ltMin)) * 540 + 15;
    return [x, y];
  };

  // Convert GeoJSON geometry to standard SVG path format representation
  const renderPathData = (geometry: any): string => {
    if (!geometry) return '';
    if (geometry.type === 'Polygon') {
      const ring = geometry.coordinates[0];
      return ring.map((pt: [number, number], index: number) => {
        const [x, y] = projectPoint(pt[0], pt[1]);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      }).join(' ') + ' Z';
    } else if (geometry.type === 'LineString') {
      return geometry.coordinates.map((pt: [number, number], index: number) => {
        const [x, y] = projectPoint(pt[0], pt[1]);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      }).join(' ');
    }
    return '';
  };

  // Centroid math for dynamic Zoom/Pan
  const getCentroid = (geometry: any): [number, number] => {
    if (!geometry) return [108.26, -6.62];
    if (geometry.type === 'Point') {
      return geometry.coordinates;
    } else if (geometry.type === 'LineString') {
      const coords = geometry.coordinates;
      let sumLng = 0, sumLat = 0;
      coords.forEach((pt: any) => {
        sumLng += pt[0];
        sumLat += pt[1];
      });
      return [sumLng / coords.length, sumLat / coords.length];
    } else if (geometry.type === 'Polygon') {
      const ring = geometry.coordinates[0];
      let sumLng = 0, sumLat = 0;
      const len = ring.length - 1; // ignore last point since it matches first
      for (let i = 0; i < len; i++) {
        sumLng += ring[i][0];
        sumLat += ring[i][1];
      }
      return [sumLng / len, sumLat / len];
    }
    return [108.26, -6.62];
  };

  // Fetch GeoJSON on load
  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        const res = await fetch('/data/kiit_masterplan_final.geojson');
        if (!res.ok) throw new Error('Failed to load GeoJSON');
        const data = await res.json();
        setGeoData(data);
      } catch (err) {
        console.error('Error loading GeoJSON:', err);
      } finally {
        setLoading(false);
      }
    };
    loadGeoJson();
  }, []);

  // Set up real-time Firebase Firestore observer as requested by SKILL.md rules
  useEffect(() => {
    setLoading(true);
    const path = 'masterplan_zones';
    const unsubscribe = onSnapshot(
      collection(db, path),
      (snapshot) => {
        const data: Record<string, any> = {};
        snapshot.forEach((doc) => {
          data[doc.id] = doc.data();
        });
        setFirestoreData(data);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Update Edit Form elements when Selected Zone shifts
  useEffect(() => {
    if (selectedId && geoData) {
      const feat = geoData.features.find(f => f.properties.id === selectedId);
      if (feat) {
        const props = feat.properties;
        setEditForm({
          nama_zona: getSyncedValue(selectedId, 'nama_zona', props.nama_zona),
          luas_ha: Number(getSyncedValue(selectedId, 'luas_ha', props.luas_ha)),
          status: getSyncedValue(selectedId, 'status', props.status),
          investor: getSyncedValue(selectedId, 'investor', props.investor),
          nilai_investasi: getSyncedValue(selectedId, 'nilai_investasi', props.nilai_investasi || 'Plot Tersedia'),
          progress_pembangunan: getSyncedValue(selectedId, 'progress_pembangunan', props.progress_pembangunan || '0%'),
          utilitas: getSyncedValue(selectedId, 'utilitas', props.utilitas || '-')
        });
      }
    }
    setIsEditing(false);
  }, [selectedId, firestoreData, geoData]);

  // Read value prioritizing Firestore, falling back to GeoJSON
  const getSyncedValue = (id: string, key: string, fallback: any) => {
    if (firestoreData[id] && firestoreData[id][key] !== undefined) {
      return firestoreData[id][key];
    }
    return fallback;
  };

  // Color mapper based on Category as requested
  const getZoneColor = (kategori: string): string => {
    const norm = kategori.toLowerCase();
    if (norm.includes('logistics')) return '#2563eb'; // Biru
    if (norm.includes('agro')) return '#16a34a'; // Hijau
    if (norm.includes('ringan')) return '#7c3aed'; // Ungu
    if (norm.includes('menengah')) return '#ea580c'; // Oranye
    if (norm.includes('berat')) return '#dc2626'; // Merah
    if (norm.includes('utilitas')) return '#0d9488'; // Tosca
    if (norm.includes('green belt') || norm.includes('embung')) return '#15803d'; // Hijau Tua
    if (norm.includes('cbd') || norm.includes('pengelola')) return '#d4af37'; // Kuning Emas
    if (norm.includes('jalan') || norm.includes('boulevard')) return '#64748b'; // Abu-Abu
    if (norm.includes('interchange') || norm.includes('tol')) return '#1e3a8a'; // Biru Tua
    return '#475569';
  };

  // Drag-to-pan implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedId) return; // Disable drag pan zoom when highlighting direct area
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Quick navigation zoom centroid projection centering
  const zoomToFeature = (feature: GeoJsonFeature) => {
    const centroid = getCentroid(feature.geometry);
    const [cx, cy] = projectPoint(centroid[0], centroid[1]);
    setSelectedId(feature.properties.id);
    
    // smooth spring center SVG parameters
    setZoomLevel(2.5);
    setPanOffset({
      x: 400 - cx * 2.5,
      y: 300 - cy * 2.5
    });
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.3, 4.0));
    } else if (direction === 'out') {
      setZoomLevel(prev => Math.max(prev - 0.3, 0.8));
    } else {
      setZoomLevel(1.0);
      setPanOffset({ x: 0, y: 0 });
      setSelectedId(null);
    }
  };

  const handleMinimapInteraction = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;
    
    // Convert to 0-800, 0-600 scale
    const mx = (clickX / rect.width) * 800;
    const my = (clickY / rect.height) * 600;

    // Center of viewport of size (800 / zoomLevel) x (600 / zoomLevel) at (mx, my)
    const viewWidth = 800 / zoomLevel;
    const viewHeight = 600 / zoomLevel;

    const nextPanX = -(mx - viewWidth / 2) * zoomLevel;
    const nextPanY = -(my - viewHeight / 2) * zoomLevel;

    setPanOffset({
      x: nextPanX,
      y: nextPanY
    });
  };

  // Seeding/Reset Database for testing and high-fidelity cloud demonstration
  const seedDefaultData = async () => {
    if (!window.confirm(isIndo ? 'Inisialisasi ulang database Firestore untuk seluruh zona?' : 'Reset and initialize Firestore database for all zones?')) return;
    setIsSeeding(true);
    try {
      const defaultZones = [
        {
          id: "kertajati-toll-interchange",
          nama_zona: "Kertajati Toll Interchange",
          kategori: "Interchange Tol",
          status: "Terjual",
          luas_ha: 45.2,
          investor: "PT Jasa Marga (Persero)",
          nilai_investasi: "Rp 350 Miliar",
          progress_pembangunan: "100% Operasional",
          utilitas: "Sistem Tol Elektronik Multi-Lane, CCTV 24 Jam, Solar Lighting Corridor"
        },
        {
          id: "logistics-hub",
          nama_zona: "Logistics Hub Alpha",
          kategori: "Logistics Hub",
          status: "Terjual",
          luas_ha: 125.4,
          investor: "DHL Supply Chain Indonesia",
          nilai_investasi: "Rp 1.2 Triliun",
          progress_pembangunan: "90% Konstruksi Tahap II",
          utilitas: "Koneksi Fiber Optik 10 Gbps, Power Substation 15 MVA, Depot Kargo Terintegrasi, Akses Karantina Mandiri"
        },
        {
          id: "logistics-hub-beta",
          nama_zona: "Logistics Hub Beta",
          kategori: "Logistics Hub",
          status: "Tersedia",
          luas_ha: 65.8,
          investor: "None",
          nilai_investasi: "Plot Tersedia",
          progress_pembangunan: "Persiapan Lahan (Cut & Fill)",
          utilitas: "Akses langsung Jalan Boulevard 60m ROW, Jaringan Air Bersih Industri, Saluran IPAL Terpadu"
        },
        {
          id: "agro-industrial-park",
          nama_zona: "Agro Industrial Park",
          kategori: "Agro Industrial Park",
          status: "Terjual",
          luas_ha: 150.0,
          investor: "PT Charoen Pokphand Indonesia",
          nilai_investasi: "Rp 850 Miliar",
          progress_pembangunan: "75% Operasional",
          utilitas: "Water Treatment Plant Dedikasi 20L/s, Cold Storage Listrik Stabil Backup Genset 10MW, Sertifikat ISO 22000"
        },
        {
          id: "industri-ringan",
          nama_zona: "Cluster Industri Ringan",
          kategori: "Industri Ringan",
          status: "Terjual",
          luas_ha: 95.5,
          investor: "Pegatron Aero Technology",
          nilai_investasi: "Rp 2.1 Triliun",
          progress_pembangunan: "60% Konstruksi Fabrikasi",
          utilitas: "Gas Bumi PGN 3 MMSCFD, Trafo Listrik 25 MVA, Anti-Vibration Floor Layout, Zero Dust Cleanroom Access"
        },
        {
          id: "industri-menengah",
          nama_zona: "Cluster Industri Menengah",
          kategori: "Industri Menengah",
          status: "Dalam Pembangunan",
          luas_ha: 180.2,
          investor: "BYD Auto Parts Indonesia",
          nilai_investasi: "Rp 3.5 Triliun",
          progress_pembangunan: "40% Struktur Utama",
          utilitas: "Pasokan Gas Industri, Sistem Penanganan Limbah Cair Terpadu, Jaringan Listrik Ganda Backup PLN"
        },
        {
          id: "industri-berat",
          nama_zona: "Cluster Industri Berat",
          kategori: "Industri Berat",
          status: "Tersedia",
          luas_ha: 210.0,
          investor: "None",
          nilai_investasi: "Plot Tersedia",
          progress_pembangunan: "Perataan Lahan & Infrastruktur Dasar",
          utilitas: "Koneksi Kereta Kargo Langsung, Daya Listrik 100MVA Direct Substation, Amdal Kategori A Terbuka"
        },
        {
          id: "utilitas-kawasan",
          nama_zona: "Pusat Utilitas Kawasan Terpadu",
          kategori: "Utilitas Kawasan",
          status: "Terjual",
          luas_ha: 35.0,
          investor: "Kertajati Utility & Power JV",
          nilai_investasi: "Rp 750 Miliar",
          progress_pembangunan: "95% Operasional",
          utilitas: "Main Substation PLN 150 KV, Water Treatment Plant 120 L/s, Central IPAL Biologis, Pusat Pemadam Kebakaran"
        },
        {
          id: "green-belt-embung",
          nama_zona: "Ecology Green Belt & Embung Raya",
          kategori: "Green Belt & Embung",
          status: "Terjual",
          luas_ha: 110.5,
          investor: "Balai Besar Wilayah Sungai (Cimanuk)",
          nilai_investasi: "Dana Alokasi Khusus Rp 120 Miliar",
          progress_pembangunan: "100% Selesai & Penghijauan",
          utilitas: "Embung Retensi Air Hujan 250,000 m3, Urban Ecoforest, Jalur Sepeda & Walking Track, Sensor Kualitas Air IoT"
        },
        {
          id: "cbd-kantor-pengelola",
          nama_zona: "CBD & Kantor Pengelola KIIT",
          kategori: "CBD & Kantor Pengelola",
          status: "Terjual",
          luas_ha: 40.0,
          investor: "PT KIIT Development Corp",
          nilai_investasi: "Rp 980 Miliar",
          progress_pembangunan: "100% Operasional (Wisma Manajemen)",
          utilitas: "Gis Integrated Command Center, Convention Center, Layanan Satu Atap Bea Cukai & Keimigrasian (Sistem OSS)"
        },
        {
          id: "kiit-toll-access-road",
          nama_zona: "KIIT Toll Access Expressway",
          kategori: "Jalan",
          status: "Terjual",
          luas_ha: 18.0,
          investor: "PT KIIT Infrastruktur Utama",
          nilai_investasi: "Rp 150 Miliar",
          progress_pembangunan: "100% Operasional",
          utilitas: "Jalur Truk Kargo Berat Row 60, Penerangan Jalan Pintar LED, Drainase Pracetak Beton"
        },
        {
          id: "kiit-industrial-boulevard",
          nama_zona: "KIIT Grand Boulevard",
          kategori: "Jalan",
          status: "Terjual",
          luas_ha: 25.5,
          investor: "PT KIIT Infrastruktur Utama",
          nilai_investasi: "Rp 210 Miliar",
          progress_pembangunan: "95% Operasional",
          utilitas: "Common Ducting Utama, 4-Lajur MST 10 Ton, Jaringan Utilitas Bawah Tanah Terintegrasi"
        },
        {
          id: "kiit-grand-gate",
          nama_zona: "KIIT Grand Gate & Landmark",
          kategori: "Utilitas",
          status: "Terjual",
          luas_ha: 2.1,
          investor: "PT KIIT Development Corp",
          nilai_investasi: "Rp 45 Miliar",
          progress_pembangunan: "100% Selesai",
          utilitas: "ANPR Gates (Automatic Number Plate Recognition), Pos Utama Terpadu, Fiber Link Control"
        }
      ];

      for (const zone of defaultZones) {
        await setDoc(doc(db, 'masterplan_zones', zone.id), zone);
      }
      alert(isIndo ? 'Firestore Berhasil Di-seed!' : 'Firestore Seeded Successfully!');
    } catch (err) {
      console.error('Seeding error:', err);
      alert(isIndo ? 'Gagal melakukan seeding.' : 'Seeding failed.');
    } finally {
      setIsSeeding(false);
    }
  };

  // Save changes to Firebase Firestore (Writes/Sync directly)
  const handleSaveToFirestore = async () => {
    if (!selectedId) return;
    setIsSaving(true);
    try {
      const feat = geoData?.features.find(f => f.properties.id === selectedId);
      const payload = {
        id: selectedId,
        nama_zona: editForm.nama_zona,
        kategori: feat ? feat.properties.kategori : 'Utilitas',
        status: editForm.status,
        luas_ha: Number(editForm.luas_ha),
        investor: editForm.investor,
        nilai_investasi: editForm.nilai_investasi,
        progress_pembangunan: editForm.progress_pembangunan,
        utilitas: editForm.utilitas,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'masterplan_zones', selectedId), payload);
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `masterplan_zones/${selectedId}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Export to Excel (Generates actual, valid CSV representation)
  const exportToExcel = () => {
    if (!geoData) return;
    const dataRows = geoData.features.map(f => {
      const id = f.properties.id;
      const nama = getSyncedValue(id, 'nama_zona', f.properties.nama_zona);
      const luas = getSyncedValue(id, 'luas_ha', f.properties.luas_ha);
      const status = getSyncedValue(id, 'status', f.properties.status);
      const investor = getSyncedValue(id, 'investor', f.properties.investor);
      const nilai = getSyncedValue(id, 'nilai_investasi', f.properties.nilai_investasi || 'Plot Tersedia');
      const progress = getSyncedValue(id, 'progress_pembangunan', f.properties.progress_pembangunan || '0%');
      const utilitas = getSyncedValue(id, 'utilitas', f.properties.utilitas || '-');
      const kategori = f.properties.kategori;
      return `"${id}","${nama}","${kategori}","${status}",${luas},"${investor}","${nilai}","${progress}","${utilitas}"`;
    });

    const header = '"ID ID","Nama Zona","Kategori","Status Lahan","Luas (Ha)","Investor","Nilai Investasi","Progress","Utilitas"';
    const csvContent = "\ufeff" + [header, ...dataRows].join("\n"); // Add BOM for excel support
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `KIIT_Masterplan_Prospectus_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF (Triggers a print of selected prospecting zone or entire stats)
  const exportToPDF = () => {
    window.print();
  };

  // Calculate dynamic stats based on GeoJSON & Firestore synced data
  const getDashboardStats = () => {
    if (!geoData) return { totalArea: 1000, available: 310, sold: 690, occupancy: 69, investorsCount: 9, totalValuation: '13.3 T' };
    
    let totalArea = 0;
    let available = 0;
    let sold = 0;
    const investors = new Set<string>();
    let totalValuationNum = 0;

    geoData.features.forEach(f => {
      const id = f.properties.id;
      const area = Number(getSyncedValue(id, 'luas_ha', f.properties.luas_ha));
      const status = getSyncedValue(id, 'status', f.properties.status);
      const investor = getSyncedValue(id, 'investor', f.properties.investor);
      const valuationStr = getSyncedValue(id, 'nilai_investasi', f.properties.nilai_investasi || '0');

      totalArea += area;
      if (status === 'Tersedia') {
        available += area;
      } else {
        sold += area;
      }

      if (investor && investor !== 'None' && investor !== '-') {
        investors.add(investor);
      }

      // Try parsing investment value (e.g., "Rp 1.2 Triliun" => 1.2, "Rp 350 Miliar" => 0.35)
      let valVal = 0;
      const cleanVal = valuationStr.toLowerCase();
      if (cleanVal.includes('triliun') || cleanVal.includes('t')) {
        const matches = cleanVal.match(/[\d.]+/);
        if (matches) valVal = parseFloat(matches[0]);
      } else if (cleanVal.includes('miliar') || cleanVal.includes('m')) {
        const matches = cleanVal.match(/[\d.]+/);
        if (matches) valVal = parseFloat(matches[0]) / 1000; // convert to Trillion equivalent
      }
      totalValuationNum += valVal;
    });

    const occupancy = totalArea > 0 ? (sold / totalArea) * 100 : 0;

    return {
      totalArea: totalArea.toFixed(1),
      available: available.toFixed(1),
      sold: sold.toFixed(1),
      occupancy: occupancy.toFixed(1),
      investorsCount: investors.size,
      totalValuation: `Rp ${totalValuationNum.toFixed(2)} Triliun`
    };
  };

  const stats = getDashboardStats();

  // Filter features based on search terms
  const filteredFeatures = geoData?.features.filter(f => {
    const id = f.properties.id;
    const name = getSyncedValue(id, 'nama_zona', f.properties.nama_zona).toLowerCase();
    const investor = getSyncedValue(id, 'investor', f.properties.investor).toLowerCase();
    const category = f.properties.kategori.toLowerCase();

    const matchesZone = name.includes(searchTerm.toLowerCase()) || category.includes(searchTerm.toLowerCase());
    const matchesInvestor = investor.includes(searchInvestor.toLowerCase());

    return matchesZone && matchesInvestor;
  }) || [];

  const activeSelectedFeat = geoData?.features.find(f => f.properties.id === selectedId);

  return (
    <section 
      id="kiit-interactive-masterplan" 
      className={`relative py-12 scroll-mt-14 border-b border-slate-900 bg-[#020617] text-slate-100 font-sans transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-6' : ''
      }`}
    >
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6">
        
        {/* Module Header / Top Nav Integration */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-blue-950/40 pb-6 gap-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo-kiit.png" 
              alt="KIIT Logo" 
              className="w-12 h-12 object-contain bg-slate-900/40 p-1.5 border border-blue-900/30 rounded-none shadow-indigo-950 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-brand-gold font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-blue-950/50 border border-blue-900/40">
                  GIS PORTAL v2.60
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-none text-[9px] font-mono font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/20">
                  <Activity className="w-2.5 h-2.5 mr-1 animate-pulse" /> Live DB Connected
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase mt-1">
                KIIT Interactive Masterplan
              </h2>
            </div>
          </div>

          {/* Export & Command Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => seedDefaultData()}
              className="px-3 py-1.5 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/40 text-slate-300 text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
              title="Factory Seed default GIS layers to Firestore"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              {isSeeding ? 'Seeding...' : 'Seed Firestore'}
            </button>
            <button
              onClick={exportToExcel}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-350 text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              Export Excel
            </button>
            <button
              onClick={exportToPDF}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-350 text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              Export PDF
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-brand-gold transition cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Banner Instructions */}
        <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-transparent border-l-4 border-brand-gold p-4 shadow-xl">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed font-semibold">
              {isIndo 
                ? "KLIK AREA INTERAKTIF: Klik langsung zona pada masterplan untuk melihat informasi investor, status lahan, utilitas, dan peluang investasi."
                : "CLICK INTERACTIVE AREA: Directly click any zone on the GIS masterplan layout to instantly retrieve current investor details, lot status, utilities, and investments."
              }
            </p>
          </div>
        </div>

        {/* Dashboard Statistik Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-[#040d1a] border border-blue-950 p-4 relative overflow-hidden group hover:border-slate-800 transition">
            <div className="absolute top-0 right-0 p-1 bg-blue-950/40 text-[9px] text-slate-500 font-mono">D1</div>
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">{isIndo ? 'Luas Kawasan' : 'Total Area'}</span>
            <span className="block text-xl font-black text-white mt-1 font-mono">{stats.totalArea} <span className="text-[10px] text-slate-400">HA</span></span>
            <span className="block text-[9px] text-blue-400 font-sans mt-1">100% Core Layout Area</span>
          </div>

          <div className="bg-[#040d1a] border border-blue-950 p-4 relative overflow-hidden group hover:border-slate-800 transition">
            <div className="absolute top-0 right-0 p-1 bg-emerald-950/40 text-[9px] text-emerald-500 font-mono">D2</div>
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">{isIndo ? 'Luas Tersedia' : 'Available Lot'}</span>
            <span className="block text-xl font-black text-emerald-400 mt-1 font-mono">{stats.available} <span className="text-[10px] text-slate-400">HA</span></span>
            <span className="block text-[9px] text-slate-400 font-sans mt-1">Open Investment Prospect</span>
          </div>

          <div className="bg-[#040d1a] border border-blue-950 p-4 relative overflow-hidden group hover:border-slate-800 transition">
            <div className="absolute top-0 right-0 p-1 bg-indigo-950/40 text-[9px] text-indigo-400 font-mono">D3</div>
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">{isIndo ? 'Luas Terjual' : 'Sold Lot'}</span>
            <span className="block text-xl font-black text-blue-300 mt-1 font-mono">{stats.sold} <span className="text-[10px] text-slate-400">HA</span></span>
            <span className="block text-[9px] text-indigo-400 font-sans mt-1">Settled & Allocated</span>
          </div>

          <div className="bg-[#040d1a] border border-blue-950 p-4 relative overflow-hidden group hover:border-slate-800 transition">
            <div className="absolute top-0 right-0 p-1 bg-brand-gold/10 text-[9px] text-brand-gold font-mono">D4</div>
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">{isIndo ? 'Okupansi' : 'Occupancy Rate'}</span>
            <span className="block text-xl font-black text-brand-gold mt-1 font-mono">{stats.occupancy}%</span>
            <span className="block text-[9px] text-slate-400 font-sans mt-1">Development Density</span>
          </div>

          <div className="bg-[#040d1a] border border-blue-950 p-4 relative overflow-hidden group hover:border-slate-800 transition">
            <div className="absolute top-0 right-0 p-1 bg-purple-950/40 text-[9px] text-purple-400 font-mono">D5</div>
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">{isIndo ? 'Aktif Investor' : 'Active Investors'}</span>
            <span className="block text-xl font-black text-purple-300 mt-1 font-mono">{stats.investorsCount}</span>
            <span className="block text-[9px] text-purple-400 font-sans mt-1">Global Anchor Corporations</span>
          </div>

          <div className="bg-[#040d1a] border border-blue-950 p-4 relative overflow-hidden group hover:border-slate-800 transition">
            <div className="absolute top-0 right-0 p-1 bg-amber-950/40 text-[9px] text-amber-500 font-mono">D6</div>
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">{isIndo ? 'Total Investasi' : 'Total Valuation'}</span>
            <span className="block text-sm font-black text-brand-gold mt-2 font-mono truncate">{stats.totalValuation}</span>
            <span className="block text-[9px] text-slate-400 font-sans mt-0.5">Summed Value</span>
          </div>
        </div>

        {/* Layout Grid: Dashboard Sidebar & SVG Viewport & Side Information Sync Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Controller & Directory Panel - 3 columns */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Search Filter Widgets */}
            <div className="bg-[#040d1a] border border-blue-950/85 p-4 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                <Search className="w-3 h-3 text-brand-gold" /> Filter GIS Directory
              </span>
              
              <div className="space-y-2">
                <label className="block text-[10px] text-slate-500 font-mono uppercase">{isIndo ? 'Cari Zona / Kategori' : 'Search Zone / Category'}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={isIndo ? "cth. Logistics, Industri..." : "e.g. Logistics, Industry..."}
                    className="w-full bg-[#030a14] border border-blue-900/35 focus:border-brand-gold p-2 pl-8 text-xs rounded-none text-white focus:outline-none placeholder:text-slate-650"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-600 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-slate-500 font-mono uppercase">{isIndo ? 'Cari Investor' : 'Search Investor'}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchInvestor}
                    onChange={(e) => setSearchInvestor(e.target.value)}
                    placeholder={isIndo ? "cth. DHL, Pegatron, BYD..." : "e.g. DHL, Pegatron, BYD..."}
                    className="w-full bg-[#030a14] border border-blue-900/35 focus:border-brand-gold p-2 pl-8 text-xs rounded-none text-white focus:outline-none placeholder:text-slate-650"
                  />
                  <Globe className="w-3.5 h-3.5 text-slate-600 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            {/* List and Quick Select navigation ledger */}
            <div className="bg-[#040d1a] border border-blue-950/85 p-4 flex-1 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-350 block border-b border-blue-950/70 pb-2 mb-3">
                  {isIndo ? 'Daftar Layer Masterplan' : 'GIS Masterplan Layers'} ({filteredFeatures.length})
                </span>

                <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                  {loading ? (
                    <div className="py-12 text-center text-xs text-slate-500">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-brand-gold" />
                      Loading layers...
                    </div>
                  ) : filteredFeatures.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-500">
                      Empty layer matches.
                    </div>
                  ) : (
                    filteredFeatures.map(f => {
                      const id = f.properties.id;
                      const active = selectedId === id;
                      const hasFirestoreOverride = !!firestoreData[id];
                      const name = getSyncedValue(id, 'nama_zona', f.properties.nama_zona);
                      const status = getSyncedValue(id, 'status', f.properties.status);
                      const zoneColor = getZoneColor(f.properties.kategori);

                      return (
                        <button
                          key={id}
                          onClick={() => zoomToFeature(f)}
                          className={`w-full text-left p-2 hover:bg-slate-900/40 border transition text-xs flex items-center justify-between cursor-pointer rounded-none ${
                            active ? 'bg-blue-950/40 border-slate-750' : 'bg-transparent border-transparent'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span 
                              className="w-2.5 h-2.5 shrink-0" 
                              style={{ backgroundColor: zoneColor }}
                            />
                            <div className="truncate">
                              <span className="block font-sans font-bold text-slate-200 truncate leading-tight">
                                {name}
                              </span>
                              <span className="block text-[9px] text-slate-500 font-mono uppercase mt-0.5">
                                {f.properties.kategori}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1.5 ml-2">
                            {hasFirestoreOverride && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" title="Firestore Override Active" />
                            )}
                            <span className={`px-1.5 py-0.5 rounded-none text-[8.5px] font-mono font-bold leading-none ${
                              status === 'Tersedia' 
                                ? 'bg-emerald-950/45 text-emerald-400 border border-emerald-900/10' 
                                : status === 'Dalam Pembangunan'
                                ? 'bg-amber-950/45 text-amber-500 border border-amber-900/10'
                                : 'bg-blue-950/45 text-blue-300 border border-blue-900/10'
                            }`}>
                              {status}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Developer panel metadata link */}
              <div className="border-t border-blue-950/80 pt-3 mt-4 text-[10px] font-mono text-slate-500 flex justify-between items-center bg-slate-950/10 p-1.5">
                <span>Layers Loaded: 13/13</span>
                <span>Type: Esri GeoJSON V2</span>
              </div>
            </div>
          </div>

          {/* Core SVG Interactive Map Viewport canvas - 6 columns */}
          <div 
            ref={mapContainerRef}
            className="lg:col-span-6 bg-[#010814] border border-blue-950 rounded-none relative overflow-hidden flex flex-col justify-between shadow-2xl h-[560px] cursor-crosshair select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Ambient cybergrid mesh overlay */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="industrialGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-blue-800 stroke-1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#industrialGrid)" />
              </svg>
            </div>

            {/* Radar Sweep decorative effect (smart dashboard feel) */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(14,165,233,0.01)_1px,transparent_1px)] pointer-events-none"></div>

            {/* Viewport Scale Indicator HUD */}
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2.5 pointer-events-none bg-slate-950/80 border border-blue-900/30 p-2 font-mono text-[9px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              <span className="text-slate-350">Scale: 1:25,000</span>
              <span className="text-slate-500">|</span>
              <span className="text-brand-gold">Zoom {zoomLevel.toFixed(1)}x</span>
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); handleZoom('in'); }}
                className="w-8 h-8 bg-slate-950/90 hover:bg-slate-900 border border-blue-900/40 text-slate-300 font-bold flex items-center justify-center cursor-pointer transition active:scale-95"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleZoom('out'); }}
                className="w-8 h-8 bg-slate-950/90 hover:bg-slate-900 border border-blue-900/40 text-slate-300 font-bold flex items-center justify-center cursor-pointer transition active:scale-95"
                title="Zoom Out"
              >
                -
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleZoom('reset'); }}
                className="w-8 h-8 bg-slate-950/90 hover:bg-slate-900 border border-blue-900/40 text-slate-300 font-mono text-[9px] font-bold flex items-center justify-center cursor-pointer transition active:scale-95"
                title="Reset View"
              >
                RST
              </button>
            </div>

            {/* Floating Mini Map - Radar HUD Style */}
            <div className="absolute bottom-4 left-4 z-20 bg-[#020813]/95 border border-blue-900/65 p-3 rounded-none shadow-2xl w-44 hover:border-brand-gold/60 transition-all duration-300 hidden md:block select-none">
              <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-blue-950/70">
                <span className="text-[9px] font-mono font-bold tracking-wider text-brand-gold uppercase flex items-center gap-1">
                  <Layers className="w-2.5 h-2.5" /> Minimap Overlay
                </span>
                <span className="text-[8px] font-mono text-slate-500">
                  {zoomLevel.toFixed(1)}x
                </span>
              </div>
              
              <div className="relative bg-[#01050d] border border-blue-950 overflow-hidden cursor-crosshair" style={{ aspectRatio: '4/3' }}>
                <svg 
                  viewBox="0 0 800 600" 
                  className="w-full h-full text-slate-850 relative z-10"
                  onMouseDown={(e) => {
                    setIsMinimapDragging(true);
                    handleMinimapInteraction(e);
                  }}
                  onMouseMove={(e) => {
                    if (isMinimapDragging) {
                      handleMinimapInteraction(e);
                    }
                  }}
                  onMouseUp={() => setIsMinimapDragging(false)}
                  onMouseLeave={() => setIsMinimapDragging(false)}
                  onTouchStart={(e) => {
                    setIsMinimapDragging(true);
                    handleMinimapInteraction(e);
                  }}
                  onTouchMove={(e) => {
                    if (isMinimapDragging) {
                      handleMinimapInteraction(e);
                    }
                  }}
                  onTouchEnd={() => setIsMinimapDragging(false)}
                >
                  {/* Miniature features */}
                  {geoData?.features.map(f => {
                    if (f.geometry.type === 'Point') return null;
                    const path = renderPathData(f.geometry);
                    const isSelected = selectedId === f.properties.id;
                    const category = f.properties.kategori;
                    const zoneColor = getZoneColor(category);

                    return (
                      <path
                        key={`mini-${f.properties.id}`}
                        d={path}
                        fill={isSelected ? '#d4af37' : `${zoneColor}33`}
                        stroke={isSelected ? '#ffffff' : `${zoneColor}66`}
                        strokeWidth="1.5"
                      />
                    );
                  })}
                  
                  {/* Miniature Viewport Box Tracking View */}
                  <rect 
                    x={-panOffset.x / zoomLevel} 
                    y={-panOffset.y / zoomLevel} 
                    width={800 / zoomLevel} 
                    height={600 / zoomLevel} 
                    className="fill-blue-500/10 stroke-brand-gold stroke-2"
                    style={{ strokeDasharray: '3,3' }}
                  />
                </svg>
                {/* Compass Marker */}
                <div className="absolute right-1 bottom-1 text-[8px] font-mono text-slate-500 select-none z-20 pointer-events-none">
                  N ▲
                </div>
              </div>
            </div>

            {/* Main SVG Map Engine */}
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
              {geoData ? (
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full object-contain"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g 
                    transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}
                    style={{ transformOrigin: 'center center', transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.1, 0.8, 0.2, 1)' }}
                  >
                    
                    {/* Bounding Limit / Outer Buffer Boundary */}
                    <rect x="10" y="10" width="780" height="580" fill="none" stroke="#1e3a8a" strokeWidth="0.5" strokeDasharray="5,15" className="opacity-25" />

                    {/* render Polygons & LineStrings */}
                    {geoData.features.map(f => {
                      if (f.geometry.type === 'Point') return null;

                      const id = f.properties.id;
                      const path = renderPathData(f.geometry);
                      const isSelected = selectedId === id;
                      const isHovered = hoveredId === id;
                      const category = f.properties.kategori;
                      const status = getSyncedValue(id, 'status', f.properties.status);
                      const zoneColor = getZoneColor(category);

                      // Search filter highlight flash
                      const searchTermMatches = searchTerm && 
                        (getSyncedValue(id, 'nama_zona', f.properties.nama_zona).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.toLowerCase().includes(searchTerm.toLowerCase()));

                      const isLine = f.geometry.type === 'LineString';

                      return (
                        <path
                          key={id}
                          d={path}
                          fill={isLine ? 'none' : (isSelected ? `${zoneColor}dd` : isHovered ? `${zoneColor}aa` : `${zoneColor}2b`)}
                          stroke={searchTermMatches ? '#eab308' : (isSelected ? '#ffffff' : isHovered ? '#d4af37' : (isLine ? '#64748b' : zoneColor))}
                          strokeWidth={isSelected ? (isLine ? '4' : '2.5') : (isHovered ? '2' : (isLine ? '2.5' : '1.2'))}
                          strokeDasharray={isLine ? (id.includes('expressway') ? 'none' : '4,4') : 'none'}
                          className="transition-all duration-200 cursor-pointer"
                          onMouseEnter={() => setHoveredId(id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            zoomToFeature(f);
                          }}
                        />
                      );
                    })}

                    {/* Render Points (Landmarks) */}
                    {geoData.features.map(f => {
                      if (f.geometry.type !== 'Point') return null;

                      const id = f.properties.id;
                      const coords = f.geometry.coordinates;
                      const [cx, cy] = projectPoint(coords[0], coords[1]);
                      const isSelected = selectedId === id;
                      const isHovered = hoveredId === id;

                      return (
                        <g 
                          key={id}
                          transform={`translate(${cx}, ${cy})`}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredId(id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            zoomToFeature(f);
                          }}
                        >
                          <circle 
                            r={isSelected ? '12' : isHovered ? '9' : '6'} 
                            fill="#d4af37" 
                            className="animate-ping opacity-25" 
                          />
                          <circle 
                            r={isSelected ? '8' : isHovered ? '6' : '4'} 
                            fill="#d4af37" 
                            stroke="#ffffff" 
                            strokeWidth="1.5" 
                          />
                          {/* Point label overlay */}
                          {(isHovered || isSelected) && (
                            <g transform="translate(0, -18)">
                              <rect x="-60" y="-12" width="120" height="18" fill="#020617" stroke="#3b82f6" strokeWidth="0.8" />
                              <text x="0" y="0" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                                {getSyncedValue(id, 'nama_zona', f.properties.nama_zona)}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}

                  </g>
                </svg>
              ) : (
                <div className="text-center font-mono text-xs text-slate-500 flex flex-col items-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-brand-gold mb-3" />
                  Drawing dynamic SVG masterplan layout...
                </div>
              )}
            </div>

            {/* Inner Dashboard Footer (OJK Compliant Grid Coordinates) */}
            <div className="absolute bottom-4 right-4 z-10 pointer-events-none bg-slate-950/80 border border-blue-900/30 p-2 font-mono text-[9px] uppercase hidden sm:block">
              Coordinates: Lat {selectedId ? getCentroid(activeSelectedFeat?.geometry)[1].toFixed(5) : '-6.62010'} 
              &nbsp;&bull;&nbsp; Lng {selectedId ? getCentroid(activeSelectedFeat?.geometry)[0].toFixed(5) : '108.25200'}
            </div>
          </div>

          {/* Sync Right Information Edit Panel - 3 columns */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeSelectedFeat ? (
                <motion.div
                  key={`panel-${selectedId}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#040d1a] border border-blue-950 p-5 space-y-4 flex flex-col justify-between h-full min-h-[460px] shadow-2xl relative"
                >
                  <div className="space-y-4">
                    {/* Header bar */}
                    <div className="border-b border-blue-950/80 pb-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Zone Evaluation Specs
                      </span>
                      <button 
                        onClick={() => { setSelectedId(null); setIsEditing(false); }}
                        className="text-[10px] text-slate-500 hover:text-slate-300 font-mono"
                      >
                        CLOSE [X]
                      </button>
                    </div>

                    {/* Zone General Title */}
                    <div>
                      <h4 className="text-lg font-black text-white leading-tight uppercase font-sans">
                        {getSyncedValue(selectedId!, 'nama_zona', activeSelectedFeat.properties.nama_zona)}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1.5 flex-wrap gap-y-1">
                        <span className="px-1.5 py-0.5 bg-blue-950/60 border border-blue-900/40 text-[9px] font-mono text-slate-350 uppercase">
                          {activeSelectedFeat.properties.kategori}
                        </span>
                        <span className={`px-1.5 py-0.5 text-[9px] font-mono uppercase font-bold ${
                          getSyncedValue(selectedId!, 'status', activeSelectedFeat.properties.status) === 'Tersedia'
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/10'
                            : getSyncedValue(selectedId!, 'status', activeSelectedFeat.properties.status) === 'Dalam Pembangunan'
                            ? 'bg-amber-950/40 text-amber-400 border border-amber-900/10'
                            : 'bg-blue-950/40 text-blue-300 border border-blue-905/10'
                        }`}>
                          {getSyncedValue(selectedId!, 'status', activeSelectedFeat.properties.status)}
                        </span>
                      </div>
                    </div>

                    {/* Main Information Sync Frame */}
                    {!isEditing ? (
                      <div className="space-y-3 pt-2 font-sans">
                        <div className="grid grid-cols-2 gap-3 border-b border-blue-950/50 pb-3">
                          <div>
                            <span className="block text-[9.5px] text-slate-500 font-mono uppercase">Area Luas</span>
                            <span className="text-sm font-bold font-mono text-slate-200">
                              {getSyncedValue(selectedId!, 'luas_ha', activeSelectedFeat.properties.luas_ha)} Ha
                            </span>
                          </div>
                          <div>
                            <span className="block text-[9.5px] text-slate-500 font-mono uppercase">{isIndo ? 'Nilai Investasi' : 'Investment'}</span>
                            <span className="text-xs font-bold text-brand-gold font-mono block truncate">
                              {getSyncedValue(selectedId!, 'nilai_investasi', activeSelectedFeat.properties.nilai_investasi || 'Plot Tersedia')}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 border-b border-blue-950/50 pb-3">
                          <span className="block text-[9.5px] text-slate-500 font-mono uppercase">Developer / Investor</span>
                          <span className="text-xs font-bold text-white block">
                            {getSyncedValue(selectedId!, 'investor', activeSelectedFeat.properties.investor) === 'None' ? (
                              <span className="text-slate-500 font-mono">AVAILABLE FOR BIDDING</span>
                            ) : (
                              getSyncedValue(selectedId!, 'investor', activeSelectedFeat.properties.investor)
                            )}
                          </span>
                        </div>

                        <div className="space-y-2 border-b border-blue-950/50 pb-3">
                          <span className="block text-[9.5px] text-slate-500 font-mono uppercase">{isIndo ? 'Progress Pembangunan' : 'Building Progress'}</span>
                          <span className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                            {getSyncedValue(selectedId!, 'progress_pembangunan', activeSelectedFeat.properties.progress_pembangunan || '0%')}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="block text-[9.5px] text-slate-500 font-mono uppercase">{isIndo ? 'Spesifikasi Utilitas' : 'Utility Specifications'}</span>
                          <p className="text-xs text-slate-400 font-sans leading-relaxed font-semibold">
                            {getSyncedValue(selectedId!, 'utilitas', activeSelectedFeat.properties.utilitas || '-')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Edit Inputs Block
                      <div className="space-y-3 pt-2 text-xs text-slate-300">
                        <div className="space-y-1">
                          <label className="block text-[9px] text-slate-500 font-mono uppercase">Nama Zona</label>
                          <input
                            type="text"
                            value={editForm.nama_zona}
                            onChange={(e) => setEditForm({ ...editForm, nama_zona: e.target.value })}
                            className="w-full bg-[#030a14] border border-blue-900/40 p-2 text-xs rounded-none text-white focus:outline-none focus:border-brand-gold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="block text-[9px] text-slate-500 font-mono uppercase">Luas (Ha)</label>
                            <input
                              type="number"
                              value={editForm.luas_ha}
                              onChange={(e) => setEditForm({ ...editForm, luas_ha: Number(e.target.value) })}
                              className="w-full bg-[#030a14] border border-blue-900/40 p-2 text-xs rounded-none text-white focus:outline-none focus:border-brand-gold font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] text-slate-500 font-mono uppercase">Status</label>
                            <select
                              value={editForm.status}
                              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                              className="w-full bg-[#030a14] border border-blue-900/40 p-2 text-xs rounded-none text-white focus:outline-none focus:border-brand-gold"
                            >
                              <option value="Tersedia">Tersedia</option>
                              <option value="Terjual">Terjual</option>
                              <option value="Dalam Pembangunan">Dalam Pembangunan</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] text-slate-500 font-mono uppercase">Investor</label>
                          <input
                            type="text"
                            value={editForm.investor}
                            onChange={(e) => setEditForm({ ...editForm, investor: e.target.value })}
                            className="w-full bg-[#030a14] border border-blue-900/40 p-2 text-xs rounded-none text-white focus:outline-none focus:border-brand-gold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] text-slate-500 font-mono uppercase">Nilai Investasi</label>
                          <input
                            type="text"
                            value={editForm.nilai_investasi}
                            onChange={(e) => setEditForm({ ...editForm, nilai_investasi: e.target.value })}
                            className="w-full bg-[#030a14] border border-blue-900/40 p-2 text-xs rounded-none text-white focus:outline-none focus:border-brand-gold font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] text-slate-500 font-mono uppercase">Progress Konstruksi</label>
                          <input
                            type="text"
                            value={editForm.progress_pembangunan}
                            onChange={(e) => setEditForm({ ...editForm, progress_pembangunan: e.target.value })}
                            className="w-full bg-[#030a14] border border-blue-900/40 p-2 text-xs rounded-none text-white focus:outline-none focus:border-brand-gold font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] text-slate-500 font-mono uppercase">Spesifikasi Utilitas</label>
                          <textarea
                            value={editForm.utilitas}
                            onChange={(e) => setEditForm({ ...editForm, utilitas: e.target.value })}
                            rows={2}
                            className="w-full bg-[#030a14] border border-blue-900/40 p-2 text-xs rounded-none text-white focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Panel Command sync updates buttons */}
                  <div className="pt-4 border-t border-blue-950/80">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-[#030a14] border border-blue-900/45 text-brand-gold hover:bg-slate-900 text-xs py-2 bg-slate-950 font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        {isIndo ? 'Ubah Data (Sync)' : 'Modify Data (Sync)'}
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={handleSaveToFirestore}
                          disabled={isSaving}
                          className="w-full bg-brand-gold text-[#001026] hover:bg-yellow-400 text-xs py-2 font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                        >
                          {isSaving ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              {isIndo ? 'Simpan ke Firebase' : 'Save to Firebase'}
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="w-full border border-red-900/50 text-red-400 hover:bg-red-950/20 text-xs py-2 font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#040d1a] border border-blue-950 p-5 flex flex-col justify-between h-full min-h-[460px] shadow-2xl relative"
                >
                  <div className="space-y-6 my-auto text-center font-sans">
                    <div className="w-16 h-16 rounded-full bg-blue-950/40 border border-blue-900/30 flex items-center justify-center mx-auto shadow-inner">
                      <Cpu className="w-7 h-7 text-brand-gold animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        {isIndo ? 'Navigasi GIS Masterplan' : 'GIS Masterplan Navigation'}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-[200px] mx-auto font-semibold">
                        {isIndo 
                          ? 'Klik salah satu area pada peta interaktif untuk menganalisis spesifikasi data real-time, status investor, utilitas, dan sinkronisasi Firestore.'
                          : 'Select any polygon segment on the HUD map above to fetch live data parameters, investor status records, and database telemetry.'
                        }
                      </p>
                    </div>

                    <div className="bg-[#030a14] border border-blue-950/60 p-3.5 max-w-[200px] mx-auto space-y-1.5 font-mono text-[9px] uppercase text-left">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Database Status</span>
                        <span className="text-emerald-400">ONLINE</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Engine Version</span>
                        <span>v2.404.0</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Map Projection</span>
                        <span>Mercator WGS84</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-blue-950/80 pt-3 text-[9px] font-mono text-slate-500 uppercase flex justify-between bg-slate-950/10 p-1.5">
                    <span>Admin Controls Enabled</span>
                    <span>OSS INTEGRATED</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

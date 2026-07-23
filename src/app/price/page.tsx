"use client";

import React, { useState } from "react";
import { ArrowLeft, Ship, Plane, Package, Plug, Table as TableIcon, Tv, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// Preset Sizes
const PRESET_SIZES = [
  { id: "18x18x18", label: "18×18×18", l: 18, w: 18, h: 18, price: 60 },
  { id: "18x18x28", label: "18×18×28", l: 18, w: 18, h: 28, price: 75 },
  { id: "24x24x24", label: "24×24×24", l: 24, w: 24, h: 24, price: 110 },
  { id: "24x24x36", label: "24×24×36", l: 24, w: 24, h: 36, price: 150 },
];

const FourLegTableIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="4,9 20,9 22,13 2,13" />
    <line x1="4" y1="13" x2="4" y2="21" />
    <line x1="20" y1="13" x2="20" y2="21" />
    <line x1="6" y1="9" x2="6" y2="17" />
    <line x1="18" y1="9" x2="18" y2="17" />
  </svg>
);

const CATEGORIES = [
  { id: "boxes", label: "Boxes", Icon: Package },
  { id: "appliances", label: "Appliances", Icon: Plug },
  { id: "furniture", label: "Furniture", Icon: FourLegTableIcon },
  { id: "tv", label: "TV", Icon: Tv },
];

const IsoBox = ({ w, d, h, y = 15, className = "" }: { w: number, d: number, h: number, y?: number, className?: string }) => {
  const mapIso = (u: number, v: number, z: number) => {
    const x = 50 - u + v;
    const yOffset = y + u/2 + v/2 + z;
    return `${x},${yOffset}`;
  };

  const poly = (pts: number[][]) => `M ${pts.map(p => mapIso(p[0], p[1], p[2])).join(' L ')} Z`;
  const pathStyle = { transition: 'all 0.3s ease-out' };

  // Tape width
  const tw = Math.min(w, d) * 0.22;

  return (
    <svg width="240" height="240" viewBox="0 0 100 100" fill="none" className={`drop-shadow-lg ${className}`}>
      {/* Top Face */}
      <path d={poly([[0,0,0], [0,d,0], [w,d,0], [w,0,0]])} fill="#e5ad72" style={pathStyle} />
      
      {/* Left Face (u=w) */}
      <path d={poly([[w,0,0], [w,d,0], [w,d,h], [w,0,h]])} fill="#c68c4e" style={pathStyle} />
      
      {/* Right Face (v=d) */}
      <path d={poly([[0,d,0], [w,d,0], [w,d,h], [0,d,h]])} fill="#ab763c" style={pathStyle} />

      {/* TAPE (Dark Brown #5c3a21) */}
      {/* Top Face Tape (running along the center in the v direction) */}
      <path d={poly([
        [w/2 - tw/2, 0, 0],
        [w/2 - tw/2, d, 0],
        [w/2 + tw/2, d, 0],
        [w/2 + tw/2, 0, 0]
      ])} fill="#5c3a21" style={pathStyle} />

      {/* Right Face Tape (v=d, running vertically down in the center of the u direction) */}
      <path d={poly([
        [w/2 - tw/2, d, 0],
        [w/2 + tw/2, d, 0],
        [w/2 + tw/2, d, h * 0.45],
        [w/2 - tw/2, d, h * 0.45]
      ])} fill="#4d2f19" style={pathStyle} />

      {/* Shipping Label on Left Face (u=w) */}
      {d > 8 && h > 8 && (
        <g>
          {/* Label White Base */}
          <path d={poly([
            [w, d * 0.25, h * 0.25],
            [w, d * 0.65, h * 0.25],
            [w, d * 0.65, h * 0.55],
            [w, d * 0.25, h * 0.55]
          ])} fill="#ffffff" style={pathStyle} />
          {/* Text lines on label (black/grey) */}
          <path d={poly([
            [w, d * 0.3, h * 0.32],
            [w, d * 0.6, h * 0.32],
            [w, d * 0.6, h * 0.36],
            [w, d * 0.3, h * 0.36]
          ])} fill="#475569" style={pathStyle} />
          <path d={poly([
            [w, d * 0.3, h * 0.42],
            [w, d * 0.5, h * 0.42],
            [w, d * 0.5, h * 0.46],
            [w, d * 0.3, h * 0.46]
          ])} fill="#475569" style={pathStyle} />
        </g>
      )}

      {/* Fragile Arrows (This side up) on Right Face (v=d) */}
      {w > 12 && h > 12 && (
        <g>
          {/* Two arrows pointing up */}
          {/* Arrow 1 */}
          <path d={poly([
            [w * 0.2, d, h * 0.65],
            [w * 0.25, d, h * 0.57],
            [w * 0.3, d, h * 0.65],
            [w * 0.27, d, h * 0.65],
            [w * 0.27, d, h * 0.75],
            [w * 0.23, d, h * 0.75],
            [w * 0.23, d, h * 0.65]
          ])} fill="#3e2510" style={pathStyle} />
          {/* Arrow 2 */}
          <path d={poly([
            [w * 0.35, d, h * 0.65],
            [w * 0.4, d, h * 0.57],
            [w * 0.45, d, h * 0.65],
            [w * 0.42, d, h * 0.65],
            [w * 0.42, d, h * 0.75],
            [w * 0.38, d, h * 0.75],
            [w * 0.38, d, h * 0.65]
          ])} fill="#3e2510" style={pathStyle} />
        </g>
      )}

      {/* Wine Glass Icon (Fragile) on Right Face (v=d) */}
      {w > 12 && h > 12 && (
        <g>
          <path d={poly([
            [w * 0.72, d, h * 0.55],
            [w * 0.8, d, h * 0.55],
            [w * 0.8, d, h * 0.63],
            [w * 0.76, d, h * 0.67],
            [w * 0.76, d, h * 0.73],
            [w * 0.78, d, h * 0.73],
            [w * 0.78, d, h * 0.75],
            [w * 0.74, d, h * 0.75],
            [w * 0.74, d, h * 0.73],
            [w * 0.76, d, h * 0.73],
            [w * 0.76, d, h * 0.67],
            [w * 0.72, d, h * 0.63]
          ])} fill="#3e2510" style={pathStyle} />
        </g>
      )}
    </svg>
  );
};

const ScaleGraphic = ({ weight }: { weight: number }) => {
  const rotation = Math.min(Math.max(-90 + (weight / 100) * 180, -90), 90);
  
  return (
    <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
      <ellipse cx="100" cy="190" rx="60" ry="10" fill="#000000" fillOpacity="0.1" />
      
      {/* Base */}
      <path d="M 60 160 L 140 160 L 160 190 L 40 190 Z" fill="#061246" />
      <circle cx="100" cy="175" r="4" fill="#10b981" /> {/* Power light */}
      
      {/* Platform mechanism */}
      <rect x="70" y="35" width="60" height="15" fill="#2C3258" />
      {/* Platform */}
      <rect x="50" y="20" width="100" height="15" rx="4" fill="#1a40b4" />
      {/* Boxes on platform */}
      <rect x="75" y="5" width="15" height="15" rx="2" fill="#eb5b27" />
      <rect x="95" y="5" width="15" height="15" rx="2" fill="#eb5b27" />
      <rect x="115" y="5" width="15" height="15" rx="2" fill="#eb5b27" />
      
      {/* Dial background */}
      <circle cx="100" cy="105" r="65" fill="#F4F5F7" stroke="#2C3258" strokeWidth="12" />
      
      {/* Ticks and Numbers */}
      <text x="100" y="62" fontSize="14" fontWeight="800" fill="#2C3258" textAnchor="middle">50</text>
      <text x="60" y="75" fontSize="12" fontWeight="800" fill="#2C3258" textAnchor="middle">25</text>
      <text x="140" y="75" fontSize="12" fontWeight="800" fill="#2C3258" textAnchor="middle">75</text>
      <text x="50" y="110" fontSize="12" fontWeight="800" fill="#2C3258" textAnchor="middle">0</text>
      <text x="150" y="110" fontSize="12" fontWeight="800" fill="#2C3258" textAnchor="middle">100</text>
      
      {/* Tick Marks */}
      <line x1="100" y1="40" x2="100" y2="48" stroke="#2C3258" strokeWidth="2" />
      
      {/* Needle */}
      <g transform={`rotate(${rotation} 100 105)`}>
        <polygon points="97,105 103,105 100,55" fill="#eb5b27" />
      </g>
      
      {/* Center dot */}
      <circle cx="100" cy="105" r="8" fill="#1a40b4" stroke="#eb5b27" strokeWidth="3" />
      
      <text x="100" y="135" fontSize="12" fontWeight="900" fill="#6b7280" textAnchor="middle">LBS</text>
    </svg>
  );
};

const TvGraphic = ({ sizeValue }: { sizeValue: string }) => (
  <svg width="240" height="240" viewBox="0 0 120 120" fill="none" className="drop-shadow-lg">
    <defs>
      {/* Screen Radial Gradient for realistic glow */}
      <radialGradient id="tvScreenGrad" cx="50%" cy="85%" r="75%" fx="50%" fy="85%">
        <stop offset="0%" stopColor="#3d3e44" />
        <stop offset="50%" stopColor="#25262b" />
        <stop offset="100%" stopColor="#141416" />
      </radialGradient>
      {/* Bezel Gradient */}
      <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1c1d22" />
        <stop offset="50%" stopColor="#0b0c10" />
        <stop offset="100%" stopColor="#020205" />
      </linearGradient>
    </defs>
    
    {/* Shadow */}
    <ellipse cx="60" cy="111" rx="42" ry="5" fill="#000" fillOpacity="0.25" />
    
    {/* Stand Base */}
    <rect x="32" y="101" width="56" height="6" rx="2" fill="#0a0b0d" />
    <rect x="32" y="101" width="56" height="2.5" rx="1" fill="#1b1d22" /> {/* Stand highlight */}
    
    {/* Stand Neck */}
    <rect x="56" y="90" width="8" height="12" fill="#0f1013" />
    <rect x="56" y="90" width="4" height="12" fill="#1a1b20" /> {/* Neck highlight */}
    
    {/* TV Outer Bezel */}
    <rect x="10" y="15" width="100" height="76" rx="4" fill="url(#bezelGrad)" stroke="#2b2d35" strokeWidth="0.5" />
    
    {/* Inner Screen */}
    <rect x="13.5" y="18.5" width="93" height="69" rx="1" fill="url(#tvScreenGrad)" stroke="#090a0c" strokeWidth="0.5" />
    
    {/* Diagonal Light Glare Reflection */}
    <path d="M 65 18.5 L 90 18.5 L 106.5 35 L 106.5 60 Z" fill="#ffffff" fillOpacity="0.02" />
    
    {/* "TV" Branding Logo at Top Bezel */}
    <text x="60" y="17.5" fill="#71717a" fontSize="2" fontWeight="900" textAnchor="middle" letterSpacing="0.2">TV</text>
    
    {/* Power Button / Bottom Center Indicator */}
    <circle cx="60" cy="91.5" r="2.2" fill="#020203" stroke="#27272a" strokeWidth="0.5" />
    <circle cx="60" cy="91.5" r="0.8" fill="#a1a1aa" />
    
    {/* Size Text (e.g. 55") */}
    <text 
      x="60" 
      y="51" 
      fill="#ffffff" 
      fontSize="17" 
      fontWeight="900" 
      textAnchor="middle" 
      dominantBaseline="middle" 
      letterSpacing="0.5"
      style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))" }}
    >
      {sizeValue}
    </text>
  </svg>
);

const ApplianceGraphic = ({ w, d, h, y = 15, className = "" }: { w: number, d: number, h: number, y?: number, className?: string }) => {
  const pathStyle = { transition: 'all 0.3s ease-out' };
  
  const mapIso = (u: number, v: number, z: number) => {
    const x = 50 - u + v;
    const yOffset = y + u/2 + v/2 + z;
    return `${x},${yOffset}`;
  };

  const poly = (pts: number[][]) => `M ${pts.map(p => mapIso(p[0], p[1], p[2])).join(' L ')} Z`;

  // Front face (Left face) is at u=w
  // Calculate center of the front face for the door
  const faceCenterX = 50 - w + d/2;
  const faceCenterY = y + w/2 + d/4 + h/2;
  
  return (
    <svg width="240" height="240" viewBox="0 0 100 100" fill="none" className={`drop-shadow-lg ${className}`}>
      {/* Top Face (z=0) */}
      <path d={poly([[0,0,0], [0,d,0], [w,d,0], [w,0,0]])} fill="#e2e8f0" style={pathStyle} />
      
      {/* Front Face (Left face, u=w) */}
      <path d={poly([[w,0,0], [w,d,0], [w,d,h], [w,0,h]])} fill="#94a3b8" style={pathStyle} />
      
      {/* Side Face (Right face, v=d) */}
      <path d={poly([[0,d,0], [w,d,0], [w,d,h], [0,d,h]])} fill="#cbd5e1" style={pathStyle} />
      
      {/* Washing machine door on front face (u=w) */}
      <circle cx={faceCenterX} cy={faceCenterY} r={Math.min(d, h) * 0.25} fill="#475569" style={pathStyle} />
      <circle cx={faceCenterX} cy={faceCenterY} r={Math.min(d, h) * 0.18} fill="#0f172a" style={pathStyle} />
      
      {/* Control panel line on front face (u=w), perfectly parallel to top edge */}
      <path d={`M ${mapIso(w, 0.15*d, 0.1*h)} L ${mapIso(w, 0.85*d, 0.1*h)}`} stroke="#475569" strokeWidth={Math.max(1, h*0.05)} style={pathStyle} strokeLinecap="round" />
    </svg>
  );
};

const FurnitureGraphic = ({ w, d, h, y = 15, className = "" }: { w: number, d: number, h: number, y?: number, className?: string }) => {
  const pathStyle = { transition: 'all 0.3s ease-out' };
  
  const mapIso = (u: number, v: number, z: number) => {
    const x = 50 - u + v;
    const yOffset = y + u/2 + v/2 + z;
    return `${x},${yOffset}`;
  };

  const poly = (pts: number[][]) => `M ${pts.map(p => mapIso(p[0], p[1], p[2])).join(' L ')} Z`;

  const lw = Math.min(w, d) * 0.15; // leg width
  const th = h * 0.15; // table top thickness

  const drawLeg = (u1: number, u2: number, v1: number, v2: number) => (
    <g>
      {/* Left Face of Leg (at u = u2) */}
      <path d={poly([[u2, v1, th], [u2, v2, th], [u2, v2, h], [u2, v1, h]])} fill="#b45309" style={pathStyle} />
      {/* Right Face of Leg (at v = v2) */}
      <path d={poly([[u1, v2, th], [u2, v2, th], [u2, v2, h], [u1, v2, h]])} fill="#92400e" style={pathStyle} />
    </g>
  );

  return (
    <svg width="240" height="240" viewBox="0 0 100 100" fill="none" className={`drop-shadow-lg ${className}`}>
      {/* Back Leg */}
      {drawLeg(0, lw, 0, lw)}
      {/* Left Leg */}
      {drawLeg(w - lw, w, 0, lw)}
      {/* Right Leg */}
      {drawLeg(0, lw, d - lw, d)}
      {/* Front Leg */}
      {drawLeg(w - lw, w, d - lw, d)}
      
      {/* Table Top */}
      {/* Top Face */}
      <path d={poly([[0, 0, 0], [0, d, 0], [w, d, 0], [w, 0, 0]])} fill="#d97706" style={pathStyle} />
      {/* Left Face (Front-left) */}
      <path d={poly([[w, 0, 0], [w, d, 0], [w, d, th], [w, 0, th]])} fill="#b45309" style={pathStyle} />
      {/* Right Face (Front-right) */}
      <path d={poly([[0, d, 0], [w, d, 0], [w, d, th], [0, d, th]])} fill="#92400e" style={pathStyle} />
    </svg>
  );
};

export default function PriceCalculator() {
  const router = useRouter();

  // State
  const [destination, setDestination] = useState("Dominican Republic");
  const [shippingType, setShippingType] = useState<"maritime" | "air">("maritime");
  const [category, setCategory] = useState("boxes");
  
  const [presetSizeId, setPresetSizeId] = useState("24x24x36");
  const [length, setLength] = useState("24");
  const [width, setWidth] = useState("24");
  const [height, setHeight] = useState("36");
  const [weight, setWeight] = useState(10);
  const [tvSize, setTvSize] = useState("55");
  
  const [quantity, setQuantity] = useState(1);

  // Handle Dimension Overrides
  const handleDimensionChange = (dimension: "l"|"w"|"h", val: string) => {
    setPresetSizeId(""); // Deselect preset if manual entry
    if (dimension === "l") setLength(val);
    if (dimension === "w") setWidth(val);
    if (dimension === "h") setHeight(val);
  };

  // Set from preset
  const selectPreset = (id: string, l: number, w: number, h: number) => {
    setPresetSizeId(id);
    setLength(l.toString());
    setWidth(w.toString());
    setHeight(h.toString());
  };

  // Mock Price Calculation
  const calculatePrice = () => {
    if (shippingType === "air") {
      let calc = weight * 4.5;
      if (calc < 40) calc = 40;
      return calc.toFixed(2);
    }
    
    if (category === "tv") {
      // Base TV pricing: e.g., $1.50 per inch
      let calc = parseInt(tvSize) * 1.5;
      if (calc < 40) calc = 40;
      return (calc * quantity).toFixed(2);
    }

    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    // Check if it's an exact preset
    const exactPreset = PRESET_SIZES.find(p => p.l === l && p.w === w && p.h === h);
    if (exactPreset) {
      return (exactPreset.price * quantity).toFixed(2);
    }

    // Rough formula for arbitrary sizes (assuming ~$20/ft3 for Maritime)
    const volumeFt3 = (l * w * h) / 1728;
    let calc = volumeFt3 * 20;
    if (calc < 40) calc = 40; // Minimum
    return (calc * quantity).toFixed(2);
  };

  const estimatedTotal = calculatePrice();
  
  // Dynamic central graphic based on category
  const renderGraphic = () => {
    let GraphicComponent = null;

    const numL = parseFloat(length) || 10;
    const numW = parseFloat(width) || 10;
    const numH = parseFloat(height) || 10;
    
    // Normalize box dimensions based on actual isometric bounding box
    const isoW = numL + numW;
    const isoH = numH + (numL + numW) / 2;
    const maxIso = Math.max(isoW, isoH) || 1;
    
    // Scale so the largest dimension fits within 85 units of the 100x100 viewBox
    const boxScale = 85 / maxIso;
    const drawW = numL * boxScale;
    const drawD = numW * boxScale;
    const drawH = numH * boxScale;
    
    // Perfectly center the object vertically in the 100x100 canvas
    const boxY = (100 - (drawH + (drawW + drawD) / 2)) / 2;

    // General scale factor for appliances and furniture
    const stdVol = 24 * 24 * 36;
    const userVol = numL * numW * numH;
    let objScale = Math.pow(userVol / stdVol, 1/3);
    // Clamp the scale between 0.5 and 1.5 to prevent it from disappearing or overflowing heavily
    objScale = Math.min(Math.max(objScale, 0.5), 1.5);
    const scaleStyle = { transform: `scale(${objScale})`, transition: 'transform 0.3s ease' };

    if (category === "boxes") {
      GraphicComponent = <IsoBox w={drawW} d={drawD} h={drawH} y={boxY} className="transition-all duration-300 ease-in-out" />;
    } else if (category === "tv") {
      const displaySize = tvSize ? `${tvSize}"` : "TV";
      const tvNum = parseFloat(tvSize) || 55;
      let tvScale = tvNum / 55;
      tvScale = Math.min(Math.max(tvScale, 0.5), 1.5);
      GraphicComponent = (
        <div style={{ transform: `scale(${tvScale})`, transition: 'transform 0.3s ease' }}>
          <TvGraphic sizeValue={displaySize} />
        </div>
      );
    } else if (category === "appliances") {
      GraphicComponent = <ApplianceGraphic w={drawW} d={drawD} h={drawH} y={boxY} className="transition-all duration-300 ease-in-out" />;
    } else if (category === "furniture") {
      GraphicComponent = <FurnitureGraphic w={drawW} d={drawD} h={drawH} y={boxY} className="transition-all duration-300 ease-in-out" />;
    }

    return (
      <div className="flex flex-col items-center justify-center my-3 relative min-h-[260px]">
        {GraphicComponent}
        <div className="bg-[#1A1A1A] text-white font-bold text-[13px] px-5 py-1.5 rounded-xl mt-3 z-10 shadow-md border border-white/10">
          {category === "tv" ? `${tvSize || "0"}" TV` : `${length || "0"} × ${width || "0"} × ${height || "0"}"`}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 relative font-sans">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/App_Background.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header Section */}
        <div className="pt-12 pb-4 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-semibold flex-1 text-center pr-8 tracking-wide">PRICE CALCULATOR</h1>
          </div>
        </div>

        <div className="flex-1 bg-white/[0.88] backdrop-blur-xl rounded-t-[32px] p-5 flex flex-col gap-4 relative z-0 pb-32 shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Destination Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-black text-[13px] ml-1">Destination</label>
          <select 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm font-bold outline-none border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none"
            style={{ 
              backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%239ca3af" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>')`, 
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px"
            }}
          >
            <option value="Dominican Republic">🇩🇴 Dominican Republic</option>
            <option value="USA">🇺🇸 USA</option>
            <option value="India">🇮🇳 India</option>
          </select>
        </div>

        {/* Shipping Type Toggle */}
        <div className="flex flex-col gap-1.5">
          <label className="text-black text-[13px] ml-1">Shipping Type</label>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => setShippingType("maritime")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all border-none cursor-pointer ${
                shippingType === "maritime" 
                ? "bg-[#eb5b27] text-white shadow-md" 
                : "bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Ship size={16} />
              Maritime
            </button>
            <button 
              type="button"
              onClick={() => setShippingType("air")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all border-none cursor-pointer ${
                shippingType === "air" 
                ? "bg-[#eb5b27] text-white shadow-md" 
                : "bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Plane size={16} />
              Air
            </button>
          </div>
          
          {/* Rate Banner */}
          <div className="bg-[#F4F5F7] text-[#2C3258] p-2.5 rounded-xl mt-1.5 flex flex-col gap-0.5 shadow-sm border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]">
            <div className="flex items-center gap-2 font-bold text-[13px]">
              {shippingType === "maritime" ? (
                <Ship size={16} className="text-[#eb5b27] shrink-0" />
              ) : (
                <Plane size={16} className="text-[#eb5b27] shrink-0" />
              )}
              <span>{shippingType === "maritime" ? "$20/ft³ (cubic foot)" : "$4.50/lb (pound)"}</span>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-black text-[13px] ml-1">Category</label>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all border-none cursor-pointer ${
                  category === cat.id
                  ? "bg-[#eb5b27] text-white shadow-md"
                  : "bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] text-gray-600 hover:bg-gray-200"
                }`}
              >
                <cat.Icon size={16} className={category === cat.id ? "text-white" : "text-[#2C3258]"} />
                <span className={`text-[10px] font-bold text-center leading-tight tracking-tight ${category === cat.id ? "text-white" : "text-[#2C3258]"}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {shippingType === "maritime" ? (
          <>
            {/* Dynamic Graphic */}
            {renderGraphic()}

            {category === "tv" ? (
              <div className="flex flex-col gap-2 mt-2 bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] p-4 rounded-xl">
                <div className="flex justify-between items-center px-1">
                  <label className="text-black text-[13px] ml-1">Tv Size (inches)</label>
                  <span className="font-black text-[#eb5b27] text-lg">{tvSize}"</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={tvSize} 
                  onChange={(e) => setTvSize(e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#eb5b27]"
                />
              </div>
            ) : (
              <>
                {/* Preset Sizes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-black text-[13px] ml-1">Preset Sizes</label>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_SIZES.map(preset => (
                      <button 
                        key={preset.id}
                        type="button"
                        onClick={() => selectPreset(preset.id, preset.l, preset.w, preset.h)}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border-none cursor-pointer ${
                          presetSizeId === preset.id
                          ? "bg-[#eb5b27] text-white shadow-md"
                          : "bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <span className={`text-[10px] font-bold leading-tight tracking-tight ${presetSizeId === preset.id ? "text-white/90" : "text-gray-600"}`}>{preset.label}</span>
                        <span className={`text-[11px] font-black ${presetSizeId === preset.id ? "text-white" : "text-[#2C3258]"}`}>${preset.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Dimensions */}
                <div className="flex gap-2.5">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-black text-[13px] ml-1">Length</label>
                    <div className="relative flex items-center">
                      <input 
                        type="number" 
                        value={length}
                        onChange={(e) => handleDimensionChange("l", e.target.value)}
                        className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl pl-3 pr-7 py-2.5 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-[#eb5b27] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-2.5 text-gray-400 text-xs font-bold pointer-events-none">in</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-black text-[13px] ml-1">Width</label>
                    <div className="relative flex items-center">
                      <input 
                        type="number" 
                        value={width}
                        onChange={(e) => handleDimensionChange("w", e.target.value)}
                        className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl pl-3 pr-7 py-2.5 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-[#eb5b27] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-2.5 text-gray-400 text-xs font-bold pointer-events-none">in</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-black text-[13px] ml-1">Height</label>
                    <div className="relative flex items-center">
                      <input 
                        type="number" 
                        value={height}
                        onChange={(e) => handleDimensionChange("h", e.target.value)}
                        className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl pl-3 pr-7 py-2.5 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-[#eb5b27] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-2.5 text-gray-400 text-xs font-bold pointer-events-none">in</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Quantity */}
            <div className="flex items-center justify-between mt-2">
              <label className="text-black font-normal text-[13px]">Quantity</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] flex items-center justify-center text-[#2C3258] active:bg-gray-200 transition-colors"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
                <span className="font-bold text-[18px] w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] flex items-center justify-center text-[#2C3258] active:bg-gray-200 transition-colors"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Maritime Summary Area */}
            <div className="mt-6 flex flex-col bg-[#F4F5F7] rounded-[16px] shadow-sm overflow-hidden border border-gray-100">
              {/* Orange Total Box */}
              <div className="bg-[#eb5b27] flex flex-col items-center justify-center py-4 text-white">
                <span className="text-[13px] font-bold">Estimated Maritime Total</span>
                <h2 className="text-[26px] font-black leading-tight">${estimatedTotal}</h2>
              </div>
              
              {/* Breakdown List */}
              <div className="flex flex-col gap-2 px-3 py-4">
                <div className="flex justify-between items-start text-[10px] font-extrabold text-gray-900 px-2 leading-relaxed">
                  <div className="flex flex-col gap-1.5">
                    <span>Selected Category</span>
                    <span className="capitalize">{CATEGORIES.find(c => c.id === category)?.label || "Boxes"}</span>
                    <span>Dimensions</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-right">
                    <span>{category === "tv" ? `${tvSize}" TV` : `${length || "0"} × ${width || "0"} × ${height || "0"} in`} {quantity > 1 ? `(Qty: ${quantity})` : ""}</span>
                    <span>Shipping Cost</span>
                    <span>${estimatedTotal}</span>
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-gray-200/80 my-1.5"></div>

                <div className="flex justify-between items-center px-2">
                  <span className="font-black text-[12px] text-gray-900">Total</span>
                  <span className="font-black text-[14px] text-[#eb5b27]">${estimatedTotal}</span>
                </div>
                
                <p className="text-[9px] text-gray-400 font-bold text-center mt-3 leading-relaxed px-4">
                  Estimated prices. The final cost may vary based on exact weight, dimensions, and actual destination zip code.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* AIR Layout */}
            
            {/* Scale Graphic */}
            <div className="flex flex-col items-center justify-center mt-4">
               <ScaleGraphic weight={weight} />
            </div>

            {/* Weight Input */}
            <div className="mt-4">
              <label className="text-black font-normal text-[13px]">Package Weight</label>
              <div className="flex items-center gap-4 mt-2">
                <button 
                  onClick={() => setWeight(Math.max(1, weight - 1))}
                  className="w-12 h-12 shrink-0 rounded-full bg-[#f4f5f7]/90 border border-white shadow-sm flex items-center justify-center text-[#eb5b27] shadow-sm active:scale-95 transition-all"
                >
                  <Minus size={22} strokeWidth={3} />
                </button>
                
                <div className="flex-1 bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] h-12 rounded-xl flex items-center justify-center gap-2 border border-gray-100 shadow-inner">
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                    className="w-16 bg-transparent text-center text-[20px] font-black text-[#2C3258] outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-gray-500 font-bold text-sm">lbs</span>
                </div>

                <button 
                  onClick={() => setWeight(weight + 1)}
                  className="w-12 h-12 shrink-0 rounded-full bg-[#f4f5f7]/90 border border-white shadow-sm flex items-center justify-center text-[#eb5b27] shadow-sm active:scale-95 transition-all"
                >
                  <Plus size={22} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Preset Weights */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { w: 5, label: "Light", icon: "📄" },
                { w: 15, label: "Medium", icon: "👟" },
                { w: 30, label: "Heavy", icon: "📦" },
                { w: 50, label: "X-Heavy", icon: "🧳" },
              ].map(pw => (
                <button 
                  key={pw.w}
                  onClick={() => setWeight(pw.w)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 gap-1 rounded-xl transition-all border-none cursor-pointer ${
                    weight === pw.w
                    ? "bg-[#eb5b27] text-white shadow-md"
                    : "bg-[#f4f5f7]/90 border border-white shadow-sm text-[#2C3258] shadow-sm hover:bg-gray-50"
                  }`}
                >
                  <span className="text-[18px]">{pw.icon}</span>
                  <div className="flex flex-col items-center">
                    <span className={`text-xs font-black leading-tight ${weight === pw.w ? "text-white" : "text-[#061246]"}`}>{pw.w} lb</span>
                    <span className={`text-[9px] font-bold tracking-tight ${weight === pw.w ? "text-white/90" : "text-gray-500"}`}>{pw.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Air Summary Area */}
            <div className="mt-8 flex flex-col bg-[#F4F5F7] rounded-[16px] shadow-sm overflow-hidden border border-gray-100">
              {/* Orange Total Box */}
              <div className="bg-[#eb5b27] flex flex-col items-center justify-center py-4 text-white">
                <span className="text-[13px] font-bold">Estimated Air Total</span>
                <h2 className="text-[26px] font-black leading-tight">${estimatedTotal}</h2>
              </div>
              
              {/* Breakdown List */}
              <div className="flex flex-col gap-2 px-3 py-4">
                <div className="flex justify-between items-start text-[10px] font-extrabold text-gray-900 px-2 leading-relaxed">
                  <div className="flex flex-col gap-1.5">
                    <span>Shipping Mode</span>
                    <span>Selected Category</span>
                    <span>Package Weight</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-right">
                    <span>Air (By Weight)</span>
                    <span className="capitalize">{CATEGORIES.find(c => c.id === category)?.label || "Boxes"}</span>
                    <span>{weight} lbs</span>
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-gray-200/80 my-1.5"></div>

                <div className="flex justify-between items-center px-2">
                  <span className="font-black text-[12px] text-gray-900">Total</span>
                  <span className="font-black text-[14px] text-[#eb5b27]">${estimatedTotal}</span>
                </div>
                
                <p className="text-[9px] text-gray-400 font-bold text-center mt-3 leading-relaxed px-4">
                  Estimated prices. The final cost may vary based on actual destination zip code.
                </p>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}

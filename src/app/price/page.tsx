"use client";

import React, { useState } from "react";
import { ArrowLeft, Ship, Plane, Package, Plug, Sofa, Tv, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// Preset Sizes
const PRESET_SIZES = [
  { id: "18x18x18", label: "18×18×18", l: 18, w: 18, h: 18, price: 60 },
  { id: "18x18x28", label: "18×18×28", l: 18, w: 18, h: 28, price: 75 },
  { id: "24x24x24", label: "24×24×24", l: 24, w: 24, h: 24, price: 110 },
  { id: "24x24x36", label: "24×24×36", l: 24, w: 24, h: 36, price: 150 },
];

const CATEGORIES = [
  { id: "boxes", label: "Boxes", Icon: Package },
  { id: "appliances", label: "Appliances", Icon: Plug },
  { id: "furniture", label: "Furniture", Icon: Sofa },
  { id: "tv", label: "TV", Icon: Tv },
];

const IsoBox = ({ w, d, h, y = 15, className = "" }: { w: number, d: number, h: number, y?: number, className?: string }) => {
  const leftX = 50 - w;
  const leftY = y + w / 2;
  const rightX = 50 + d;
  const rightY = y + d / 2;
  const centerTopX = 50 - w + d;
  const centerTopY = y + (w + d) / 2;
  
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className={`drop-shadow-lg ${className}`}>
      {/* Top Face */}
      <path d={`M 50 ${y} L ${rightX} ${rightY} L ${centerTopX} ${centerTopY} L ${leftX} ${leftY} Z`} fill="#1a40b4" />
      {/* Left Face */}
      <path d={`M ${leftX} ${leftY} L ${centerTopX} ${centerTopY} L ${centerTopX} ${centerTopY + h} L ${leftX} ${leftY + h} Z`} fill="#061246" />
      {/* Right Face */}
      <path d={`M ${centerTopX} ${centerTopY} L ${rightX} ${rightY} L ${rightX} ${rightY + h} L ${centerTopX} ${centerTopY + h} Z`} fill="#0c237c" />
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
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="drop-shadow-lg">
    <ellipse cx="60" cy="110" rx="45" ry="6" fill="#000000" fillOpacity="0.1" />
    <rect x="35" y="102" width="50" height="6" rx="2" fill="#2C3258" />
    <rect x="45" y="96" width="30" height="8" fill="#1A1A1A" />
    <rect x="10" y="20" width="100" height="76" rx="4" fill="#1A1A1A" />
    <rect x="14" y="24" width="92" height="68" fill="#4f46e5" />
    <rect x="17" y="27" width="86" height="32" fill="#1a40b4" />
    <rect x="17" y="59" width="86" height="30" fill="#061246" />
    <circle cx="60" cy="92" r="1.5" fill="#10b981" />
    <text x="60" y="59" fill="white" fontSize="20" fontWeight="800" textAnchor="middle" dominantBaseline="middle">
      {sizeValue}
    </text>
  </svg>
);

const ApplianceGraphic = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="drop-shadow-lg">
    <ellipse cx="60" cy="110" rx="35" ry="5" fill="#000000" fillOpacity="0.1" />
    <rect x="30" y="15" width="60" height="90" rx="4" fill="#061246" />
    <rect x="34" y="19" width="52" height="25" rx="2" fill="#1a40b4" />
    <rect x="34" y="48" width="52" height="53" rx="2" fill="#1a40b4" />
    <rect x="76" y="26" width="4" height="10" rx="2" fill="#eb5b27" />
    <rect x="76" y="55" width="4" height="25" rx="2" fill="#eb5b27" />
  </svg>
);

const FurnitureGraphic = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="drop-shadow-lg">
    <ellipse cx="60" cy="100" rx="50" ry="6" fill="#000000" fillOpacity="0.1" />
    <rect x="15" y="40" width="90" height="35" rx="6" fill="#061246" />
    <rect x="20" y="70" width="80" height="16" rx="4" fill="#1a40b4" />
    <rect x="10" y="60" width="16" height="28" rx="4" fill="#0c237c" />
    <rect x="94" y="60" width="16" height="28" rx="4" fill="#0c237c" />
    <rect x="25" y="88" width="5" height="8" rx="1" fill="#1A1A1A" />
    <rect x="90" y="88" width="5" height="8" rx="1" fill="#1A1A1A" />
  </svg>
);

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

    if (category === "boxes") {
      GraphicComponent = <IsoBox w={30} d={30} h={40} y={15} />;
    } else if (category === "tv") {
      const displaySize = tvSize ? `${tvSize}"` : "TV";
      GraphicComponent = <TvGraphic sizeValue={displaySize} />;
    } else if (category === "appliances") {
      GraphicComponent = <ApplianceGraphic />;
    } else if (category === "furniture") {
      GraphicComponent = <FurnitureGraphic />;
    }

    return (
      <div className="flex flex-col items-center justify-center my-3 relative min-h-[140px]">
        {GraphicComponent}
        <div className="bg-[#1A1A1A] text-white font-bold text-[13px] px-5 py-1.5 rounded-xl mt-[-10px] z-10 shadow-md border border-white/10">
          {category === "tv" ? `${tvSize || "0"}" TV` : `${length || "0"} × ${width || "0"} × ${height || "0"}"`}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Header */}
      <div className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] pt-16 md:pt-10 pb-4 px-5 flex flex-col shrink-0 text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-8">Price Calculator</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5 pb-10">
        
        {/* Destination Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wide">Destination</label>
          <select 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm font-bold outline-none border-none appearance-none"
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
          <label className="text-gray-500 font-bold text-[12px] uppercase tracking-wide">Shipping Type</label>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => setShippingType("maritime")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all border-none cursor-pointer ${
                shippingType === "maritime" 
                ? "bg-[#eb5b27] text-white shadow-md" 
                : "bg-[#F4F5F7] text-gray-600 hover:bg-gray-200"
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
                : "bg-[#F4F5F7] text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Plane size={16} />
              Air
            </button>
          </div>
          
          {/* Rate Banner */}
          <div className="bg-[#F4F5F7] text-[#2C3258] p-2.5 rounded-xl mt-1.5 flex flex-col gap-0.5 shadow-sm border-none">
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
          <label className="text-gray-500 font-bold text-[12px] uppercase tracking-wide">Category</label>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all border-none cursor-pointer ${
                  category === cat.id
                  ? "bg-[#eb5b27] text-white shadow-md"
                  : "bg-[#F4F5F7] text-gray-600 hover:bg-gray-200"
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
              <div className="flex flex-col gap-2 mt-2 bg-[#F4F5F7] p-4 rounded-xl">
                <div className="flex justify-between items-center px-1">
                  <label className="text-gray-500 font-bold text-[12px] uppercase tracking-wide">TV Size (Inches)</label>
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
              <label className="text-gray-500 font-bold text-[12px] uppercase tracking-wide">Preset Sizes</label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_SIZES.map(preset => (
                  <button 
                    key={preset.id}
                    type="button"
                    onClick={() => selectPreset(preset.id, preset.l, preset.w, preset.h)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border-none cursor-pointer ${
                      presetSizeId === preset.id
                      ? "bg-[#eb5b27] text-white shadow-md"
                      : "bg-[#F4F5F7] text-gray-600 hover:bg-gray-200"
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
                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wide">Length</label>
                <div className="relative flex items-center">
                  <input 
                    type="number" 
                    value={length}
                    onChange={(e) => handleDimensionChange("l", e.target.value)}
                    className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl pl-3 pr-7 py-2.5 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-[#eb5b27] border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-2.5 text-gray-400 text-xs font-bold pointer-events-none">in</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wide">Width</label>
                <div className="relative flex items-center">
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => handleDimensionChange("w", e.target.value)}
                    className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl pl-3 pr-7 py-2.5 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-[#eb5b27] border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-2.5 text-gray-400 text-xs font-bold pointer-events-none">in</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wide">Height</label>
                <div className="relative flex items-center">
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => handleDimensionChange("h", e.target.value)}
                    className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl pl-3 pr-7 py-2.5 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-[#eb5b27] border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-2.5 text-gray-400 text-xs font-bold pointer-events-none">in</span>
                </div>
              </div>
            </div>
          </>
          )}

            {/* Quantity */}
            <div className="flex items-center justify-between bg-white mt-2">
              <label className="text-[#1A1A1A] font-bold text-[15px]">Quantity</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-[#F4F5F7] flex items-center justify-center text-[#2C3258] active:bg-gray-200 transition-colors"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
                <span className="font-bold text-[18px] w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-[#F4F5F7] flex items-center justify-center text-[#2C3258] active:bg-gray-200 transition-colors"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
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

            {/* Price Box */}
            <div className="bg-[#F4F5F7] border border-gray-200 rounded-2xl flex flex-col items-center justify-center py-3 mt-2">
              <span className="text-[24px] font-black text-[#061246]">${estimatedTotal}</span>
              <span className="text-[#1a40b4] font-bold text-xs mt-0.5">{weight} lbs × $4.50/lb</span>
            </div>

            {/* Weight Input */}
            <div className="mt-4">
              <label className="text-[#1A1A1A] font-bold text-[13px]">Package Weight</label>
              <div className="flex items-center gap-4 mt-2">
                <button 
                  onClick={() => setWeight(Math.max(1, weight - 1))}
                  className="w-12 h-12 shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#eb5b27] shadow-sm active:scale-95 transition-all"
                >
                  <Minus size={22} strokeWidth={3} />
                </button>
                
                <div className="flex-1 bg-[#F4F5F7] h-12 rounded-xl flex items-center justify-center gap-2 border border-gray-100 shadow-inner">
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
                  className="w-12 h-12 shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#eb5b27] shadow-sm active:scale-95 transition-all"
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
                    : "bg-white border border-gray-200 text-[#2C3258] shadow-sm hover:bg-gray-50"
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

          </>
        )}

        {/* Summary Card */}
        <div className="flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden mt-4 border border-gray-100">
          {/* Top Banner */}
          <div className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] flex flex-col items-center justify-center py-4 text-white px-4">
            <div className="flex items-center gap-2 mb-1">
              {shippingType === "maritime" ? <Ship size={16} /> : <Plane size={16} />}
              <span className="text-[12px] font-bold">Estimated {shippingType === "maritime" ? "Maritime" : "Air"} Total</span>
            </div>
            <h2 className="text-[28px] font-black">${estimatedTotal}</h2>
          </div>
          
          {/* Breakdown List */}
          <div className="flex flex-col px-5 py-4 gap-3.5">
            {shippingType === "maritime" ? (
              <>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-gray-500">Selected Category</span>
                  <span className="font-bold text-[#2C3258] capitalize">
                    {CATEGORIES.find(c => c.id === category)?.label || "Boxes"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-gray-500">Dimensions</span>
                  <span className="font-bold text-[#2C3258]">
                    {category === "tv" ? `${tvSize}" TV` : `${length || "0"} × ${width || "0"} × ${height || "0"} in`} {quantity > 1 ? `(Qty: ${quantity})` : ""}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-gray-500">Shipping Mode</span>
                  <span className="font-bold text-[#2C3258]">Air (By Weight)</span>
                </div>

                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-gray-500">Selected Category</span>
                  <span className="font-bold text-[#2C3258] capitalize">
                    {CATEGORIES.find(c => c.id === category)?.label || "Boxes"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-gray-500">Package Weight</span>
                  <span className="font-bold text-[#2C3258]">{weight} lbs</span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center text-[13px]">
              <span className="font-semibold text-gray-500">Shipping Cost</span>
              <span className="font-bold text-[#2C3258]">${estimatedTotal}</span>
            </div>

            <div className="h-[1px] w-full bg-gray-100 my-1"></div>
            
            <div className="flex justify-between items-center text-[#1A1A1A]">
              <span className="font-black text-[16px]">Total</span>
              <span className="font-black text-[18px] text-[#eb5b27]">${estimatedTotal}</span>
            </div>
            
            <p className="text-[11px] text-gray-400 font-medium text-center mt-1 leading-relaxed">
              Estimated prices. The final cost may vary based on exact weight, dimensions, and actual destination zip code.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

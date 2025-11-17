import { useState, useMemo, useRef, useEffect } from "react";
import { Heart, X, ChevronLeft, Sparkles, Star, MapPin, Info, RotateCcw } from "lucide-react";
import { designs } from "../../data/designs";
import { toast } from "sonner@2.0.3";

interface VendorSwipeScreenProps {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigate: (screen: string, vendorId?: string) => void;
}

const SWIPE_THRESHOLD = 120;

const categories = [
  { id: "all", name: "All", color: "#00FF88", gradient: "from-[#00FF88] to-[#00D97E]" },
  { id: "Photography", name: "Photography", color: "#9333EA", gradient: "from-[#9333EA] to-[#7C3AED]" },
  { id: "Catering", name: "Catering", color: "#EA580C", gradient: "from-[#EA580C] to-[#DC2626]" },
  { id: "Music", name: "Music & DJ", color: "#0EA5E9", gradient: "from-[#0EA5E9] to-[#06B6D4]" },
  { id: "Decoration", name: "Decoration", color: "#EC4899", gradient: "from-[#EC4899] to-[#DB2777]" },
  { id: "Venue", name: "Venue", color: "#8B5CF6", gradient: "from-[#8B5CF6] to-[#7C3AED]" },
];

const eventTypes = [
  { id: "all", name: "All Events" },
  { id: "wedding", name: "Wedding" },
  { id: "birthday", name: "Birthday" },
  { id: "corporate", name: "Corporate" },
  { id: "anniversary", name: "Anniversary" },
];

export function VendorSwipeScreen({ favorites, setFavorites, onNavigate }: VendorSwipeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedVendors, setSwipedVendors] = useState<string[]>([]);

  const vendorList = useMemo(() => {
    return Object.values(designs).filter((vendor) => {
      if (selectedCategory === "all") return true;
      return vendor.categories.some(cat => cat.name === selectedCategory);
    });
  }, [selectedCategory]);

  const currentVendor = vendorList[currentIndex];
  const hasMoreVendors = currentIndex < vendorList.length;

  const handleSwipe = (direction: "left" | "right", vendorId: string) => {
    if (direction === "right") {
      setFavorites(prev => [...prev, vendorId]);
      toast.success("Added to Favorite", {
        description: `We have saved your favorite designs`,
      });
    } else {
      toast.success("Added to Favorite", {
        description: "We have saved your favorite designs",
      });
    }
    
    setSwipedVendors(prev => [...prev, vendorId]);
    setCurrentIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      const lastVendor = vendorList[currentIndex - 1];
      setSwipedVendors(prev => prev.filter(id => id !== lastVendor.id));
      setFavorites(prev => prev.filter(id => id !== lastVendor.id));
      toast.info("Undo successful");
    }
  };

  const handleRefresh = () => {
    setCurrentIndex(0);
    setSwipedVendors([]);
    toast.success("Refreshed to beginning", {
      description: "Starting from the first design",
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes emerald-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 255, 136, 0.5), 0 0 80px rgba(0, 255, 136, 0.2);
          }
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
        
        .emerald-glow {
          animation: emerald-pulse 3s ease-in-out infinite;
        }
        
        .floating-orb {
          animation: float-up 8s ease-in-out infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      ` }} />
      
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0C3B2E] via-[#0F4838] to-[#0C3B2E]">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Floating orbs */}
          <div className="floating-orb absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#00FF88]/20 to-[#00D97E]/10 blur-3xl" style={{ animationDelay: '0s' }}></div>
          <div className="floating-orb absolute top-40 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#00FF88]/15 to-[#00D97E]/5 blur-3xl" style={{ animationDelay: '2s' }}></div>
          <div className="floating-orb absolute bottom-40 left-1/4 w-36 h-36 rounded-full bg-gradient-to-br from-[#00FF88]/25 to-[#00D97E]/10 blur-3xl" style={{ animationDelay: '4s' }}></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        {/* Main Container */}
        <div className="relative h-screen w-screen flex items-center justify-center">
          <div className="relative w-full h-full max-w-[500px]">
            {!hasMoreVendors ? (
              <div className="absolute inset-4 flex flex-col items-center justify-center text-center bg-forest-green-50 rounded-[32px] shadow-2xl border border-sage-green-200 p-10">
                <div className="relative mb-6">
                  <Sparkles className="w-20 h-20 text-[#00FF88] mx-auto" />
                  <div className="absolute inset-0 bg-[#00FF88]/20 blur-2xl rounded-full"></div>
                </div>
                <h2 className="bg-gradient-to-r from-[#00FF88] to-[#00D97E] bg-clip-text text-transparent mb-2" style={{ fontSize: "24px", fontWeight: 800 }}>
                  All Done!
                </h2>
                <p className="text-gray-600 mb-6" style={{ fontSize: "14px", fontWeight: 500 }}>
                  You've reviewed all vendors in this category
                </p>
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setSwipedVendors([]);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00D97E] text-white rounded-2xl shadow-lg shadow-[#00FF88]/25 hover:scale-105 active:scale-95 transition-all duration-300"
                  style={{ fontSize: "15px", fontWeight: 700 }}
                >
                  Start Over
                </button>
              </div>
            ) : (
              <>
                {/* Card Stack Effect */}
                {vendorList[currentIndex + 2] && (
                  <div className="absolute inset-0 bg-[#0C3B2E] rounded-[32px] shadow-lg scale-[0.92] opacity-30" style={{ top: '16px' }}></div>
                )}
                {vendorList[currentIndex + 1] && (
                  <div className="absolute inset-0 bg-[#0C3B2E] rounded-[32px] shadow-xl scale-[0.96] opacity-50" style={{ top: '8px' }}></div>
                )}

                {/* Current Card */}
                {currentVendor && (
                  <SwipeCard
                    key={currentVendor.id}
                    vendor={currentVendor}
                    onSwipe={handleSwipe}
                    onNavigate={onNavigate}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    eventTypes={eventTypes}
                    selectedEventType={selectedEventType}
                    setSelectedEventType={setSelectedEventType}
                    setCurrentIndex={setCurrentIndex}
                    setSwipedVendors={setSwipedVendors}
                    favorites={favorites}
                    currentIndex={currentIndex}
                    totalVendors={vendorList.length}
                    onUndo={handleUndo}
                    onRefresh={handleRefresh}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

interface SwipeCardProps {
  vendor: any;
  onSwipe: (direction: "left" | "right", vendorId: string) => void;
  onNavigate: (screen: string, vendorId?: string) => void;
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  eventTypes: any[];
  selectedEventType: string;
  setSelectedEventType: (type: string) => void;
  setCurrentIndex: (value: number | ((prev: number) => number)) => void;
  setSwipedVendors: (value: string[] | ((prev: string[]) => string[])) => void;
  favorites: string[];
  currentIndex: number;
  totalVendors: number;
  onUndo: () => void;
  onRefresh: () => void;
}

function SwipeCard({ 
  vendor, 
  onSwipe, 
  onNavigate, 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  eventTypes,
  selectedEventType,
  setSelectedEventType,
  setCurrentIndex, 
  setSwipedVendors,
  favorites,
  currentIndex,
  totalVendors,
  onUndo,
  onRefresh
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - startX;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD) {
      onSwipe(dragOffset > 0 ? "right" : "left", vendor.id);
    }
    
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - startX;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD) {
      onSwipe(dragOffset > 0 ? "right" : "left", vendor.id);
    }
    
    setDragOffset(0);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const rotation = dragOffset * 0.08;
  const opacity = 1 - Math.abs(dragOffset) / 400;
  const likeOpacity = Math.max(0, Math.min(1, dragOffset / 120));
  const nopeOpacity = Math.max(0, Math.min(1, -dragOffset / 120));

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      className="absolute inset-0 cursor-grab active:cursor-grabbing bg-[#0C3B2E]"
      style={{
        transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
        opacity: opacity,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
      }}
    >
      <div className="w-full h-full bg-[#0C3B2E] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col">
        {/* Full Height Image Container */}
        <div className="relative flex-1 overflow-hidden bg-[#0C3B2E]">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}></div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent"></div>

          {/* NOPE Overlay */}
          <div
            className="absolute inset-0 bg-[#EF4444]/90 backdrop-blur-sm flex items-center justify-center pointer-events-none z-40"
            style={{ opacity: nopeOpacity }}
          >
            <div className="border-8 border-white rounded-3xl px-10 py-5 rotate-[-25deg] shadow-2xl">
              <span className="text-white" style={{ fontSize: "56px", fontWeight: 900, letterSpacing: '0.05em' }}>
                NOPE
              </span>
            </div>
          </div>

          {/* LIKE Overlay */}
          <div
            className="absolute inset-0 bg-[#00FF88]/90 backdrop-blur-sm flex items-center justify-center pointer-events-none z-40"
            style={{ opacity: likeOpacity }}
          >
            <div className="border-8 border-white rounded-3xl px-10 py-5 rotate-[25deg] shadow-2xl">
              <span className="text-white" style={{ fontSize: "56px", fontWeight: 900, letterSpacing: '0.05em' }}>
                LIKE
              </span>
            </div>
          </div>

          {/* Top Section - Filters & Controls */}
          <div className="absolute top-0 left-0 right-0 p-5 z-30">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("home");
                }}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <div className="h-1 w-8 bg-gradient-to-r from-[#00FF88] to-[#00D97E] rounded-full"></div>
                <span className="text-white" style={{ fontSize: "11px", fontWeight: 700 }}>
                  {currentIndex + 1}/{totalVendors}
                </span>
                <div className="h-1 w-8 bg-white/30 rounded-full"></div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("favorites");
                }}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border-2 border-[#00FF88]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Star className="w-5 h-5 text-[#00FF88]" strokeWidth={2.5} />
              </button>
            </div>

            {/* Featured Badge */}
            {vendor.featured && (
              <div className="mt-3">
              </div>
            )}
          </div>

          {/* Bottom Info Section - Overlapping */}
          <div className="absolute bottom-[12%] left-0 right-0 p-6 z-30">
            {/* Event Type Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEventType(type.id);
                  }}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 backdrop-blur-md border ${
                    selectedEventType === type.id
                      ? "bg-gradient-to-r from-[#00FF88] to-[#00D97E] text-white border-white/20 shadow-lg shadow-[#00FF88]/25 scale-105"
                      : "bg-black/30 text-white border-white/20 hover:bg-black/40"
                  }`}
                  style={{ fontSize: "12px", fontWeight: 600 }}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat.id);
                    setCurrentIndex(0);
                    setSwipedVendors([]);
                  }}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 backdrop-blur-md border ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg scale-105 border-white/20`
                      : "bg-black/30 text-white border-white/20 hover:bg-black/40"
                  }`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRefresh();
                }}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
              >
                <RotateCcw className="w-5 h-5 text-[#FFBA00]" strokeWidth={2.5} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSwipe("left", vendor.id);
                }}
                className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-lg shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/50"
              >
                <X className="w-7 h-7 text-[#EF4444]" strokeWidth={3} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("vendor-detail", vendor.id);
                }}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border-2 border-[#00FF88]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Star className="w-5 h-5 text-[#00FF88]" strokeWidth={2.5} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSwipe("right", vendor.id);
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00FF88] to-[#00D97E] shadow-2xl shadow-[#00FF88]/40 emerald-glow flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Heart className="w-8 h-8 text-white fill-white" strokeWidth={2} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("vendor-detail", vendor.id);
                }}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Info className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
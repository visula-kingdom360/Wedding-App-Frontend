import { useState, useMemo } from "react";
import { Heart, ChevronLeft, Sparkles, Download, Maximize2, X, Calendar, Camera, Music, Cake, MapPin as MapPinIcon } from "lucide-react";
import { designs } from "../../data/designs";
import backgroundImage from 'figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png';

interface FavoritesScreenProps {
  onNavigate: (screen: string, vendorId?: string) => void;
  favorites: string[];
  onRemoveFavorite: (vendorId: string) => void;
}

export function FavoritesScreen({ onNavigate, favorites, onRemoveFavorite }: FavoritesScreenProps) {
  // Remove duplicate IDs from favorites array
  const uniqueFavorites = Array.from(new Set(favorites));
  const allFavoriteDesigns = uniqueFavorites.map(id => designs[id]).filter(Boolean);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const eventTypes = ["All Events", "Wedding", "Birthday", "Corporate", "Anniversary"];
  
  const categories = [
    { name: "All", icon: Sparkles, color: "bg-gradient-to-r from-[#0C3B2E] to-[#6D9773]" },
    { name: "Photography", icon: Camera, color: "bg-[#FFBA00]/20" },
    { name: "Catering", icon: Cake, color: "bg-[#B46617]/20" },
    { name: "Music", icon: Music, color: "bg-[#6D9773]/20" },
    { name: "Decoration", icon: Sparkles, color: "bg-[#0C3B2E]/20" },
    { name: "Venue", icon: MapPinIcon, color: "bg-[#FFBA00]/30" }
  ];

  // Filter designs based on selected category
  const favoriteDesigns = useMemo(() => {
    return allFavoriteDesigns.filter(design => {
      if (selectedCategory === "All") return true;
      return design.categories.some(cat => cat.name === selectedCategory);
    });
  }, [allFavoriteDesigns, selectedCategory]);

  const handleDownload = async (imageUrl: string, designName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${designName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30">
        <div className="bg-cover bg-center bg-no-repeat rounded-b-[32px] px-4 pt-4 pb-6 mb-6 shadow-lg" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate("vendor-swipe")}
              className="h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex-1 text-center">
              <p className="text-white/80" style={{ fontSize: "12px", fontWeight: 400 }}>
                Your Collection
              </p>
              <h1 className="text-white" style={{ fontSize: "20px", fontWeight: 700 }}>
                My Favorites
              </h1>
            </div>

            <div className="h-[45px] w-[45px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/90" style={{ fontSize: "14px", fontWeight: 600 }}>
              {favoriteDesigns.length} {favoriteDesigns.length === 1 ? 'design' : 'designs'} saved
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-[3%]">
        {allFavoriteDesigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6D9773]/20 to-[#FFBA00]/20 flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-[#0C3B2E]/30" />
            </div>
            <h2 className="text-[#0C3B2E] mb-2" style={{ fontSize: "20px", fontWeight: 700 }}>
              No Favorites Yet
            </h2>
            <p className="text-[#0C3B2E]/60 mb-6 max-w-sm" style={{ fontSize: "14px" }}>
              Start swiping right on designs you love to build your inspiration collection
            </p>
            <button
              onClick={() => onNavigate("vendor-swipe")}
              className="px-6 py-3 bg-gradient-to-r from-[#0C3B2E] to-[#6D9773] text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              <Sparkles className="w-4 h-4" />
              Start Swiping
            </button>
          </div>
        ) : (
          <>
            {/* Event Type Filter */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#0C3B2E]" />
                <span className="text-[#0C3B2E]" style={{ fontSize: "13px", fontWeight: 700 }}>
                  Event Type
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {eventTypes.map((event) => (
                  <button
                    key={event}
                    onClick={() => setSelectedEvent(event)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                      selectedEvent === event
                        ? "bg-[#0C3B2E] text-white shadow-lg scale-105"
                        : "bg-white text-[#0C3B2E] border border-[#0C3B2E]/20 hover:border-[#0C3B2E]/40"
                    }`}
                    style={{ fontSize: "12px", fontWeight: 700 }}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#0C3B2E]" />
                <span className="text-[#0C3B2E]" style={{ fontSize: "13px", fontWeight: 700 }}>
                  Category
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.name;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                        isSelected
                          ? category.name === "All"
                            ? "bg-[#0C3B2E] text-white shadow-lg scale-105"
                            : `${category.color} border-2 border-[#0C3B2E] text-[#0C3B2E] shadow-md scale-105`
                          : "bg-white text-[#0C3B2E]/70 border border-[#0C3B2E]/20 hover:border-[#0C3B2E]/40"
                      }`}
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-[#0C3B2E]/60" style={{ fontSize: "13px", fontWeight: 600 }}>
                {favoriteDesigns.length === 0 
                  ? "No designs found in this category"
                  : `Showing ${favoriteDesigns.length} ${favoriteDesigns.length === 1 ? 'design' : 'designs'}`
                }
              </p>
            </div>

            {/* Design Grid */}
            {favoriteDesigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6D9773]/20 to-[#FFBA00]/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-[#0C3B2E]/30" />
                </div>
                <p className="text-[#0C3B2E]/60 max-w-xs" style={{ fontSize: "14px", fontWeight: 600 }}>
                  No designs saved in this category yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">{favoriteDesigns.map((design) => (
                <div
                  key={design.id}
                  className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Design Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={design.image}
                      alt={design.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Top Right - Remove Favorite */}
                      <button
                        onClick={() => onRemoveFavorite(design.id)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                      >
                        <Heart className="w-4.5 h-4.5 text-[#EF4444] fill-[#EF4444]" />
                      </button>

                      {/* Bottom Action Buttons */}
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                        <button
                          onClick={() => setFullscreenImage(design.image)}
                          className="flex-1 py-2.5 bg-white/95 backdrop-blur-sm hover:bg-white text-[#0C3B2E] rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                          style={{ fontSize: "12px", fontWeight: 700 }}
                        >
                          <Maximize2 className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(design.image, design.name)}
                          className="flex-1 py-2.5 bg-gradient-to-r from-[#0C3B2E] to-[#6D9773] hover:from-[#0C3B2E]/90 hover:to-[#6D9773]/90 text-white rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                          style={{ fontSize: "12px", fontWeight: 700 }}
                        >
                          <Download className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}</div>
            )}
          </>
        )}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
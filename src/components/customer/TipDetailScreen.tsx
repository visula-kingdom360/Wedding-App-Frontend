import { ArrowLeft, Bookmark, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { CustomerScreen } from "./CustomerApp";

export interface TipData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  description: string;
  tips: Array<{
    title: string;
    description: string;
  }>;
  category: string;
}

interface TipDetailScreenProps {
  tip: TipData;
  onBack: () => void;
  onNavigate: (screen: CustomerScreen) => void;
}

export function TipDetailScreen({ tip, onBack, onNavigate }: TipDetailScreenProps) {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative">
        {/* Hero Image - Extended to top */}
        <div className="relative bg-[#E5E5E5] h-[36vh]">
          <ImageWithFallback
            src={tip.image}
            alt={tip.title}
            className="w-full h-full object-cover"
          />
          
          {/* Back, Bookmark and Share Buttons - Overlaid on Image */}
          <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-30">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30"
              >
                <Bookmark className="w-5 h-5 text-white" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30"
              >
                <Share2 className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - Curved top */}
        <div className="bg-white px-5 pt-6 pb-5 rounded-t-3xl -mt-6 relative z-10">

          {/* Title & Description */}
          <h1
            className="text-[#1a1a1a] mb-3"
            style={{ fontSize: "28px", fontWeight: 700, lineHeight: "1.2" }}
          >
            {tip.title}
          </h1>
          
          <p
            className="text-[#666666] mb-6"
            style={{ fontSize: "15px", fontWeight: 400, lineHeight: "1.6" }}
          >
            {tip.description}
          </p>

          {/* Tips List */}
          <div className="space-y-5 mb-8">
            {tip.tips.map((item, index) => (
              <div
                key={index}
                className="bg-[#F8F9FA] rounded-[16px] p-5 border border-gray-100"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: tip.color }}
                    >
                      <span
                        className="text-white"
                        style={{ fontSize: "14px", fontWeight: 700 }}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-[#1a1a1a] mb-2"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#666666]"
                      style={{ fontSize: "14px", fontWeight: 400, lineHeight: "1.6" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="bg-[#0C3B2E] rounded-[20px] p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#FFBA00]" />
              <h3
                className="text-white"
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                Key Takeaways
              </h3>
            </div>
            <ul className="space-y-2.5">
              {tip.tips.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#FFBA00] mt-1" style={{ fontSize: "12px" }}>
                    •
                  </span>
                  <span
                    className="text-white/90"
                    style={{ fontSize: "13px", fontWeight: 400, lineHeight: "1.5" }}
                  >
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#6D9773] to-[#0C3B2E] rounded-[20px] p-6 text-center mb-6">
            <h3
              className="text-white mb-2"
              style={{ fontSize: "18px", fontWeight: 700 }}
            >
              Ready to Plan Your Event?
            </h3>
            <p
              className="text-white/90 mb-4"
              style={{ fontSize: "13px", fontWeight: 400 }}
            >
              Connect with expert vendors to bring your vision to life
            </p>
            <Button
              onClick={() => onNavigate("vendor")}
              className="bg-[#FFBA00] hover:bg-[#E6A800] text-[#1a1a1a] px-8 py-2.5 rounded-full w-full shadow-lg"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              Browse Vendors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

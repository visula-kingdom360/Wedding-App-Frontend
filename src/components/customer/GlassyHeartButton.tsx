import { Sparkles } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import ecLogo from "figma:asset/8e2555a905b7f193c60a6ff5d61068c645f5bc0b.png";
import type { CustomerScreen } from "./CustomerApp";

interface GlassyHeartButtonProps {
  onNavigate: (screen: CustomerScreen) => void;
}

export function GlassyHeartButton({ onNavigate }: GlassyHeartButtonProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gentle-float {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-8px);
          }
        }
        
        @keyframes soft-glow {
          0%, 100% { 
            box-shadow: 
              0 0 20px rgba(109, 151, 115, 0.4),
              0 0 40px rgba(255, 186, 0, 0.2),
              0 8px 16px rgba(0, 0, 0, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(109, 151, 115, 0.6),
              0 0 60px rgba(255, 186, 0, 0.4),
              0 12px 24px rgba(0, 0, 0, 0.3);
          }
        }
        
        @keyframes sparkle-subtle {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes rotate-glow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        .eventcore-btn {
          animation: gentle-float 4s ease-in-out infinite;
        }
        
        .eventcore-glow {
          animation: soft-glow 3s ease-in-out infinite;
        }
        
        .sparkle-ambient {
          animation: sparkle-subtle 2s ease-in-out infinite;
        }
        
        .eventcore-glass {
          background: linear-gradient(135deg,
            rgba(12, 59, 46, 0.95) 0%,
            rgba(12, 59, 46, 0.9) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
      ` }} />
      
      <div className="fixed bottom-24 right-5 z-40">
        {/* EventCore Logo Button - Direct to Vendor Match */}
        <button
          onClick={() => onNavigate("vendor-swipe")}
          className="eventcore-btn relative group"
          aria-label="Vendor Match"
        >
          <div className="relative">
            {/* Main Button Circle */}
            <div className="eventcore-glow w-16 h-16 rounded-full eventcore-glass flex items-center justify-center relative overflow-hidden border-2 border-[#FFBA00]/30">
              {/* Subtle shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              {/* EC Logo */}
              <div className="relative z-10 transition-all duration-300 hover:scale-110">
                <ImageWithFallback 
                  src={ecLogo} 
                  alt="EventCore Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
            
            {/* Minimal ambient sparkles */}
            <Sparkles className="sparkle-ambient absolute -top-1 -right-1 w-4 h-4 text-[#FFBA00]" style={{ animationDelay: '0s' }} />
            <Sparkles className="sparkle-ambient absolute -bottom-1 -left-1 w-3.5 h-3.5 text-[#6D9773]" style={{ animationDelay: '1s' }} />
            
            {/* Simple glow ring */}
            <div 
              className="absolute -inset-2 rounded-full bg-[#0C3B2E]/30 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"
              style={{
                animation: 'rotate-glow 8s linear infinite, pulse-glow 3s ease-in-out infinite',
              }}
            ></div>
          </div>
          
          {/* Clean tooltip */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-lg px-3 py-1.5 rounded-lg shadow-lg border border-white/80">
              <span className="text-[#0C3B2E] whitespace-nowrap" style={{ fontSize: "12px", fontWeight: 600 }}>
                Vendor Match
              </span>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
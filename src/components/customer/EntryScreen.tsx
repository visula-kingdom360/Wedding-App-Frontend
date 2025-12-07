import { Button } from '../ui/button';
import logoImage from 'figma:asset/90ea59e67075f7d607d90ea4a303066218bb0dea.png';
import bgImage1 from 'figma:asset/cba296555e82adfe03f39b9c696b400f7d2597bd.png';
import bgImage2 from 'figma:asset/a91063939db27eb7e6fe57a1cdef7cfe651a5b94.png';
import bgImage3 from 'figma:asset/c8bffbdf9d2f5becb7a5d3decea4af6033ee4fcf.png';
import bgImage4 from 'figma:asset/fe37e44bedbe482c26b2db40b4d4d57cd7066cff.png';
import bgImage5 from 'figma:asset/bb1f82bb7f1a0727c9260f416bd368c3042e714c.png';

interface EntryScreenProps {
  onGuestContinue: () => void;
  onLoginRequest: () => void;
  onSignupRequest: () => void;
  onMerchantLoginRequest?: () => void;
}

export function EntryScreen({ onGuestContinue, onLoginRequest, onSignupRequest, onMerchantLoginRequest }: EntryScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0C3B2E]">
      {/* Background Images Container */}
      <div className="absolute inset-0">
        {/* Animated Background Images */}
        <div className="absolute inset-0">
          <style>{`
            @keyframes fadeInOut1 {
              0%, 18% { opacity: 1; }
              20%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut2 {
              0%, 18% { opacity: 0; }
              20%, 38% { opacity: 1; }
              40%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut3 {
              0%, 38% { opacity: 0; }
              40%, 58% { opacity: 1; }
              60%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut4 {
              0%, 58% { opacity: 0; }
              60%, 78% { opacity: 1; }
              80%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut5 {
              0%, 78% { opacity: 0; }
              80%, 98% { opacity: 1; }
              100% { opacity: 0; }
            }
            .bg-slide-1 {
              animation: fadeInOut1 10s ease-in-out infinite;
            }
            .bg-slide-2 {
              animation: fadeInOut2 10s ease-in-out infinite;
            }
            .bg-slide-3 {
              animation: fadeInOut3 10s ease-in-out infinite;
            }
            .bg-slide-4 {
              animation: fadeInOut4 10s ease-in-out infinite;
            }
            .bg-slide-5 {
              animation: fadeInOut5 10s ease-in-out infinite;
            }
          `}</style>
          
          <img
            src={bgImage1} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-1"
          />
          <img
            src={bgImage2} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-2"
          />
          <img
            src={bgImage3} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-3"
          />
          <img
            src={bgImage4} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-4"
          />
          <img
            src={bgImage5} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-5"
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-between p-6">
        {/* Top Branding */}
        <div className="w-full text-center pt-8 pb-6 flex justify-center">
          <img 
            src={logoImage} 
            alt="EventCore" 
            className="h-48 w-auto object-contain"
          />
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center px-4">
          {/* Main Headline - Creative & Modern */}
          <div className="mb-12">
            <h1 className="text-[#F5F1E8] leading-[1.05] mb-8" style={{ fontSize: 'clamp(56px, 14vw, 96px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Plan Better
              <br/>
              <span className="text-[#FFBA00]">Celebrate Smarter</span>
            </h1>
            
            <p className="text-[#E8E4D8]/90 mb-10" style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '0.02em' }}>
              Discover Sri Lanka's best event vendors
            </p>
            
            {/* Start Planning Button */}
            <Button 
              onClick={onSignupRequest}
              className="px-12 py-7 bg-[#FFBA00] hover:bg-[#FFD54F] text-[#0C3B2E] rounded-full border-0 transition-all hover:scale-105 shadow-2xl shadow-[#FFBA00]/20"
              style={{ fontSize: '18px', fontWeight: 600 }}
            >
              Begin
            </Button>
          </div>
        </div>

        {/* Bottom - Login */}
        <div className="w-full flex flex-col items-center gap-3 pb-8">
          <Button 
            onClick={onLoginRequest}
            className="px-10 py-2.5 bg-transparent hover:bg-white/10 text-[#E8E4D8] rounded-full border border-[#E8E4D8]/30 transition-all min-w-[200px]"
            variant="ghost"
            style={{ fontSize: '14px', fontWeight: 500 }}>
            Customer Login
          </Button>
          
          <Button 
            onClick={onMerchantLoginRequest}
            className="px-10 py-2.5 bg-transparent hover:bg-white/10 text-[#E8E4D8] rounded-full border border-[#E8E4D8]/30 transition-all min-w-[200px]"
            variant="ghost"
            style={{ fontSize: '14px', fontWeight: 500 }}>
            Merchant Login
          </Button>
        </div>
      </div>
    </div>
  );
}
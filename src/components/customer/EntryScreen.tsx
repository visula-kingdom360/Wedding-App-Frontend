import { Button } from '../ui/button';

interface EntryScreenProps {
  onGuestContinue: () => void;
  onLoginRequest: () => void;
  onSignupRequest: () => void;
}

export function EntryScreen({ onGuestContinue, onLoginRequest, onSignupRequest }: EntryScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background with Organic Shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7]">
        {/* Organic blur shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-green-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sage-green-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-sage-green-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#F5F1E8] to-[#E8E4D8]">
        {/* Top Branding */}
        <div className="w-full text-center pt-8">
          <h2 className="tracking-[0.3em] text-[#0C3B2E]" style={{ fontSize: '14px', fontWeight: 600 }}>
            EVENTCORE
          </h2>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center px-4 -mt-20">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-[#0C3B2E] leading-[1.1] mb-6" style={{ fontSize: 'clamp(48px, 12vw, 72px)', fontWeight: 700 }}>
              Plan<br/>
              Better<br/>
              Celebrate<br/>
              Smarter
            </h1>
            
            <p className="text-[#0C3B2E]/80 mb-8" style={{ fontSize: '18px', fontWeight: 400 }}>
              Discover Sri Lanka's best event vendors
            </p>
            
            {/* Start Planning Button */}
            <Button 
              onClick={onSignupRequest}
              className="px-10 py-6 bg-transparent hover:bg-[#0C3B2E]/10 text-[#0C3B2E] rounded-full border-2 border-[#0C3B2E] transition-all hover:scale-105"
              style={{ fontSize: '16px', fontWeight: 500 }}
            >
              Start Planning
            </Button>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-md mt-8">
            <img 
              src="figma:asset/2926dd253d91440cde17012e829bb470e0149568.png" 
              alt="EventCore Wedding Planning" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Bottom - Website & Login */}
        <div className="w-full flex flex-col items-center gap-4 pb-8">
          <div className="flex items-center gap-2 text-[#0C3B2E]">
            <div className="w-8 h-8 rounded-full border-2 border-[#0C3B2E] flex items-center justify-center">
              <span style={{ fontSize: '14px', fontWeight: 700 }}>e</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: 500 }}>eventcore.lk</span>
          </div>
          
          <Button 
            onClick={onLoginRequest}
            className="px-8 py-2 bg-transparent hover:bg-white/50 text-[#0C3B2E] rounded-full border border-[#0C3B2E]/30 transition-all"
            variant="ghost"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    </div>
  );
}
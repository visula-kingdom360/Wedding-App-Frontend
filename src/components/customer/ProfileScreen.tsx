import { useState, useRef, useMemo } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion, useMotionValue, useTransform } from 'motion/react';
import profileImage from 'figma:asset/90cf61cc5a4100e531e1735b484994854e1fff36.png';
import { 
  ArrowLeft,
  HelpCircle, 
  Info, 
  Shield, 
  Plus,
  Settings,
  Cake,
  Heart,
  Building2,
  Sparkles,
  Calendar,
  CreditCard,
  ChevronRight,
  Clock,
  MapPin,
  LogOut
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface ProfileScreenProps {
  user: User | null;
  onLogout: () => void;
  onLoginRequest?: () => void;
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export function ProfileScreen({ user, onLogout, onLoginRequest, onBack, onNavigate }: ProfileScreenProps) {
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());
  const [popEffects, setPopEffects] = useState<Array<{id: number, x: number, y: number, rotation: number}>>([]);
  const constraintsRef = useRef(null);

  const getFirstName = (user: User | null) => {
    if (!user) return 'Guest';
    return user.name.split(' ')[0];
  };

  // Event cards data
  const eventCards = [
    {
      id: 1,
      name: 'Wedding Ceremony',
      date: 'Dec 15, 2024',
      time: '4:00 PM',
      location: 'Grand Ballroom',
      icon: Heart,
      status: 'Confirmed',
      gradient: 'from-rose-50/90 via-pink-50/90 to-rose-50/90',
      accentColor: '#d4a574',
      iconBg: 'bg-rose-100/60'
    },
    {
      id: 2,
      name: 'Birthday Party',
      date: 'Nov 24, 2024',
      time: '7:00 PM',
      location: 'City Garden',
      icon: Cake,
      status: 'Planning',
      gradient: 'from-amber-50/90 via-orange-50/90 to-amber-50/90',
      accentColor: '#c4966e',
      iconBg: 'bg-amber-100/60'
    },
    {
      id: 3,
      name: 'Corporate Gala',
      date: 'Jan 10, 2025',
      time: '6:00 PM',
      location: 'Convention Center',
      icon: Building2,
      status: 'Upcoming',
      gradient: 'from-slate-50/90 via-gray-50/90 to-slate-50/90',
      accentColor: '#9ca3af',
      iconBg: 'bg-slate-100/60'
    },
    {
      id: 4,
      name: 'Anniversary',
      date: 'Feb 14, 2025',
      time: '8:00 PM',
      location: 'Rooftop Venue',
      icon: Sparkles,
      status: 'Confirmed',
      gradient: 'from-purple-50/90 via-fuchsia-50/90 to-purple-50/90',
      accentColor: '#d4a574',
      iconBg: 'bg-purple-100/60'
    }
  ];

  const menuItems = [
    {
      id: 'events',
      title: 'My Events',
      icon: Calendar,
      description: 'View all your events'
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      description: 'Get assistance'
    },
    {
      id: 'about',
      title: 'About Eventcore',
      icon: Info,
      description: 'Learn more about us'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Your data protection'
    }
  ];

  // Balloon animations - STABLE array using useMemo so positions don't change on each render
  const balloons = useMemo(() => {
    const balloonColors = [
      '#082820', // Darker Forest Green
      '#5A8060', // Darker Sage Green
      '#B46617', // Bronze
      '#FFBA00', // Gold
    ];
    
    // First set: balloons starting from carousel card area (middle of screen)
    const balloonsFromCard = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 70 + 15, // Cluster towards center where card is
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: Math.random() * 20 + 40, // 40-60px balloons
      duration: Math.random() * 8 + 10, // 10-18 seconds
      delay: Math.random() * 2, // Quick start - stagger over 2 seconds
      swayAmount: Math.random() * 30 + 15, // Horizontal sway
      startFromBottom: Math.random() * 100 + 250, // Start 250-350px from bottom (around card area)
    }));

    // Second set: balloons starting from lower area (below card, near bottom nav)
    const balloonsFromBottom = Array.from({ length: 18 }).map((_, i) => ({
      id: i + 12,
      x: Math.random() * 90 + 5, // Spread across width
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: Math.random() * 20 + 40, // 40-60px balloons
      duration: Math.random() * 10 + 12, // 12-22 seconds
      delay: Math.random() * 3, // Stagger over 3 seconds
      swayAmount: Math.random() * 40 + 20, // More sway
      startFromBottom: Math.random() * 100 + 100, // Start 100-200px from bottom
    }));

    // Third set: balloons continuously spawning from below viewport
    const balloonsFromDeep = Array.from({ length: 20 }).map((_, i) => ({
      id: i + 30,
      x: Math.random() * 90 + 5, // Spread across width
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: Math.random() * 20 + 40, // 40-60px balloons
      duration: Math.random() * 12 + 15, // 15-27 seconds
      delay: Math.random() * 5, // Stagger over 5 seconds
      swayAmount: Math.random() * 50 + 25, // Maximum sway
      startFromBottom: -(Math.random() * 200 + 100), // Start 100-300px BELOW viewport
    }));

    // TEST BALLOON - always visible, no delay, fast animation to verify Motion is working
    const testBalloon = {
      id: 999,
      x: 50, // Center of screen
      color: '#FFBA00', // Bright gold
      size: 60, // Large
      duration: 5, // Fast 5 second loop
      delay: 0, // No delay - starts immediately
      swayAmount: 30,
      startFromBottom: 300, // Visible in middle of screen
    };

    return [testBalloon, ...balloonsFromCard, ...balloonsFromBottom, ...balloonsFromDeep];
  }, []); // Empty dependency array = only create once

  const handleBalloonPop = (balloonId: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Get the base balloon ID (remove offset if it exists)
    const baseBalloonId = balloonId >= 1000 ? balloonId - 1000 : balloonId;
    
    // Check if already popped to prevent double-popping
    if (poppedBalloons.has(baseBalloonId) || poppedBalloons.has(baseBalloonId + 1000)) {
      return;
    }
    
    // Get the click position
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || 0;
      clientY = e.touches[0]?.clientY || 0;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Create pop effect at exact click position with random rotation
    const randomRotation = Math.random() > 0.5 ? (Math.random() * 15 + 10) : -(Math.random() * 15 + 10); // Random -25 to -10 or 10 to 25 degrees
    
    setPopEffects(prev => [...prev, {
      id: baseBalloonId,
      x: clientX,
      y: clientY,
      rotation: randomRotation
    }]);
    
    // Pop both the background and foreground balloons with same ID (they stay gone)
    setPoppedBalloons(prev => new Set(prev).add(baseBalloonId).add(baseBalloonId + 1000));
    
    // Remove pop effect after animation completes (but keep balloons popped)
    setTimeout(() => {
      setPopEffects(prev => prev.filter(p => p.id !== baseBalloonId));
    }, 700);
  };

  const handleCardSwipe = (direction: number) => {
    // Infinite circular looping
    setActiveCard((prev) => {
      if (direction > 0) {
        return (prev + 1) % eventCards.length;
      } else {
        return (prev - 1 + eventCards.length) % eventCards.length;
      }
    });
  };

  // Render balloon component - reusable for both layers
  const renderBalloon = (balloon: any, idOffset: number = 0, isTopLayer: boolean = false) => {
    const balloonId = balloon.id + idOffset;
    const isPopped = poppedBalloons.has(balloonId);
    
    // If popped, don't render the balloon at all (pop effect is separate)
    if (isPopped) {
      return null;
    }
    
    return (
      <motion.div
        key={balloonId}
        className="absolute"
        style={{ 
          left: `${balloon.x}%`,
          bottom: `${balloon.startFromBottom}px`,
          cursor: isTopLayer ? 'pointer' : 'default',
          zIndex: 5,
          pointerEvents: isTopLayer ? 'auto' : 'none',
          willChange: 'transform',
        }}
        animate={{
          y: [0, -1200], // Explicit keyframes: start at 0, move UP to -1200px (enough to clear avatar area)
          x: [0, balloon.swayAmount, -balloon.swayAmount, balloon.swayAmount / 2, 0],
          rotate: [0, 8, -8, 5, 0],
          opacity: isTopLayer ? 0 : 1,
        }}
        transition={{
          duration: balloon.duration,
          delay: balloon.delay,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
        onClick={(e) => isTopLayer && handleBalloonPop(balloon.id, e)}
        onTouchStart={(e) => isTopLayer && handleBalloonPop(balloon.id, e)}
      >
        {/* Balloon body - only render for visible background layer */}
        {!isTopLayer && (
          <div
            className="relative"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
            }}
          >
            {/* Main balloon shape */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${balloon.color}dd, ${balloon.color}aa)`,
                boxShadow: `0 4px 20px ${balloon.color}40, inset -10px -10px 20px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.2)`,
                borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
              }}
            />
            
            {/* Balloon shine */}
            <div
              className="absolute top-[15%] left-[20%] rounded-full opacity-50"
              style={{
                width: balloon.size * 0.3,
                height: balloon.size * 0.4,
                background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)',
              }}
            />
            
            {/* Balloon knot */}
            <div
              className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2"
              style={{
                width: 8,
                height: 8,
                background: balloon.color,
                borderRadius: '50%',
                opacity: 0.8,
              }}
            />
            
            {/* String */}
            <motion.div
              className="absolute top-full left-1/2 transform -translate-x-1/2 origin-top"
              style={{
                width: 1.5,
                height: balloon.size * 1.5,
                background: `linear-gradient(to bottom, ${balloon.color}99, ${balloon.color}44)`,
              }}
              animate={{
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        )}
        
        {/* Invisible clickable area for top layer */}
        {isTopLayer && (
          <div
            className="relative"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
            }}
          />
        )}
      </motion.div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#5A8060] to-[#082820] pb-24">
        {/* Subtle animated grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
            }}
            animate={{ opacity: [0.03, 0.05, 0.03] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Floating Balloons - Background Layer (behind content) */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ overflow: 'visible' }}>
          {balloons.map((balloon) => renderBalloon(balloon, 0, false))}
        </div>

        {/* Floating Balloons - Foreground Layer (on top of content) */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ overflow: 'visible' }}>
          {balloons.map((balloon) => renderBalloon(balloon, 1000, true))}
        </div>

        {/* Pop Effects - Render at exact click positions */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999, overflow: 'visible' }}>
          {popEffects.map((pop, index) => (
            <motion.div
              key={`pop-${pop.id}-${index}`}
              className="fixed select-none"
              style={{
                left: pop.x,
                top: pop.y,
                fontSize: '48px',
                fontWeight: 900,
                color: '#FFFFFF',
                textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 3px 3px 0 rgba(0,0,0,0.8), -2px -2px 0 rgba(0,0,0,0.5)',
                WebkitTextStroke: '3px #000',
                WebkitTextFillColor: '#FFFFFF',
                paintOrder: 'stroke fill',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(0,0,0,0.8))',
              }}
              initial={{
                opacity: 0,
                rotate: pop.rotation,
                scale: 0.2,
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.2, 1.5, 1.5, 1.2],
                rotate: pop.rotation,
                x: '-50%',
                y: '-50%',
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.25, 0.65, 1],
                ease: [0.34, 1.56, 0.64, 1], // Bouncy ease
              }}
            >
              POP!
            </motion.div>
          ))}
        </div>

        {/* Atmospheric gradient beams */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(90, 128, 96, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen pointer-events-none">
          {/* Header */}
          <div className="pt-8 pb-10 px-6 pointer-events-auto">
            <div className="flex items-center justify-between mb-12">
              <motion.button
                onClick={onBack}
                className="p-3 rounded-[20px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-[#082820]" strokeWidth={2} />
              </motion.button>
              <motion.button
                className="p-3 rounded-[20px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5 text-[#082820]" strokeWidth={2} />
              </motion.button>
            </div>

            {/* Profile Avatar with holographic shimmer */}
            <motion.div 
              className="flex flex-col items-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div className="relative mb-6">
                {/* Holographic aura */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(255, 186, 0, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 186, 0, 0.2))',
                    filter: 'blur(20px)',
                    transform: 'scale(1.3)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />

                {/* Breathing glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                <Avatar className="w-[140px] h-[140px] border-4 border-white/90 shadow-2xl relative backdrop-blur-sm">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback className="bg-gradient-to-br from-[#5A8060] to-[#082820] text-white" style={{ fontSize: '48px' }}>
                    G
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.h1
                className="text-white drop-shadow-lg mb-2"
                style={{ 
                  fontSize: '34px', 
                  fontWeight: 700, 
                  letterSpacing: '-0.5px',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hey, Guest
              </motion.h1>
              <motion.p
                className="text-white/90 text-center leading-relaxed drop-shadow-md"
                style={{ 
                  fontSize: '15px', 
                  fontWeight: 400,
                  textShadow: '0 1px 10px rgba(0, 0, 0, 0.2)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Let's make your next event<br />
                <span className="bg-gradient-to-r from-[#FFBA00] to-[#FFD700] bg-clip-text text-transparent drop-shadow-2xl" style={{ fontWeight: 600 }}>unforgettable</span>
              </motion.p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="px-6 pb-28 space-y-5 pointer-events-auto">
            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/95 backdrop-blur-2xl rounded-[28px] border border-white/80 p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30" />
                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="mb-4 inline-block"
                  >
                    <Sparkles className="w-12 h-12 text-[#FFBA00]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-[#082820] mb-3" style={{ fontSize: '22px', fontWeight: 700 }}>
                    Sign in to continue
                  </h3>
                  <p className="text-[#5A8060] mb-6" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Create an account to manage your events and bookings
                  </p>
                  <motion.button
                    onClick={onLoginRequest}
                    className="w-full bg-gradient-to-r from-[#082820] to-[#0f3d30] text-white rounded-[20px] py-4 shadow-lg relative overflow-hidden"
                    style={{ fontSize: '15px', fontWeight: 700 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(8, 40, 32, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative z-10">Sign Up / Login</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Menu Items */}
            <div className="space-y-3 pt-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onHoverStart={() => setHoveredMenu(item.id)}
                  onHoverEnd={() => setHoveredMenu(null)}
                >
                  <motion.div
                    className="bg-white/90 backdrop-blur-2xl rounded-[24px] border border-white/70 p-5 cursor-pointer shadow-lg relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      y: -4,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FFBA00]/15 to-transparent opacity-0"
                      animate={{ opacity: hoveredMenu === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-[56px] h-[56px] bg-gradient-to-br from-[#082820] to-[#0f3d30] rounded-[18px] flex items-center justify-center shadow-lg"
                          animate={{
                            rotate: hoveredMenu === item.id ? 5 : 0,
                            scale: hoveredMenu === item.id ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                        </motion.div>
                        <div>
                          <h3 className="text-[#082820]" style={{ fontSize: '16px', fontWeight: 700 }}>
                            {item.title}
                          </h3>
                          <p className="text-[#5A8060]" style={{ fontSize: '12px', fontWeight: 500 }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ 
                          x: hoveredMenu === item.id ? 5 : 0,
                          opacity: hoveredMenu === item.id ? 1 : 0.6
                        }}
                      >
                        <ChevronRight className="w-5 h-5 text-[#082820]" strokeWidth={2.5} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#5A8060] to-[#082820] pb-32">
      {/* Subtle animated grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
          animate={{ opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Floating Balloons - Background Layer (behind content) */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ overflow: 'visible' }}>
        {balloons.map((balloon) => renderBalloon(balloon, 0, false))}
      </div>

      {/* Floating Balloons - Foreground Layer (on top of content) - DISABLED in content area */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ overflow: 'visible', clipPath: 'polygon(0 0, 100% 0, 100% 400px, 0 400px)' }}>
        {balloons.map((balloon) => renderBalloon(balloon, 1000, true))}
      </div>

      {/* Pop Effects - Render at exact click positions */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999, overflow: 'visible' }}>
        {popEffects.map((pop, index) => (
          <motion.div
            key={`pop-${pop.id}-${index}`}
            className="fixed select-none"
            style={{
              left: pop.x,
              top: pop.y,
              fontSize: '48px',
              fontWeight: 900,
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 3px 3px 0 rgba(0,0,0,0.8), -2px -2px 0 rgba(0,0,0,0.5)',
              WebkitTextStroke: '3px #000',
              WebkitTextFillColor: '#FFFFFF',
              paintOrder: 'stroke fill',
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(0,0,0,0.8))',
            }}
            initial={{
              opacity: 0,
              rotate: pop.rotation,
              scale: 0.2,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.2, 1.5, 1.5, 1.2],
              rotate: pop.rotation,
              x: '-50%',
              y: '-50%',
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.25, 0.65, 1],
              ease: [0.34, 1.56, 0.64, 1], // Bouncy ease
            }}
          >
            POP!
          </motion.div>
        ))}
      </div>

      {/* Atmospheric gradient beams */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(90, 128, 96, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen pointer-events-none">
        {/* Header */}
        <div className="pt-8 pb-10 px-6 pointer-events-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.button
              onClick={onBack}
              className="p-3 rounded-[20px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all"
              style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 text-[#082820]" strokeWidth={2} />
            </motion.button>
            <motion.button
              className="p-3 rounded-[20px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all"
              style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5 text-[#082820]" strokeWidth={2} />
            </motion.button>
          </div>

          {/* Profile Avatar with holographic shimmer */}
          <motion.div 
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div className="relative mb-6">
              {/* Holographic aura */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(255, 186, 0, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 186, 0, 0.2))',
                  filter: 'blur(20px)',
                  transform: 'scale(1.3)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Breathing glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              <Avatar className="w-[140px] h-[140px] border-4 border-white/90 shadow-2xl relative backdrop-blur-sm">
                <AvatarImage src={profileImage} />
                <AvatarFallback className="bg-gradient-to-br from-[#5A8060] to-[#082820] text-white" style={{ fontSize: '48px' }}>
                  {getFirstName(user)[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.h1
              className="text-white drop-shadow-lg mb-2"
              style={{ 
                fontSize: '34px', 
                fontWeight: 700, 
                letterSpacing: '-0.5px',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hey, {getFirstName(user)}
            </motion.h1>
            <motion.p
              className="text-white/90 text-center leading-relaxed drop-shadow-md"
              style={{ 
                fontSize: '15px', 
                fontWeight: 400,
                textShadow: '0 1px 10px rgba(0, 0, 0, 0.2)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Let's make your next event<br />
              <span className="bg-gradient-to-r from-[#FFBA00] to-[#FFD700] bg-clip-text text-transparent drop-shadow-2xl" style={{ fontWeight: 600 }}>unforgettable</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 space-y-6 pointer-events-auto relative isolate" style={{ zIndex: 100, position: 'relative' }}>
          {/* My Events - Credit Card Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white drop-shadow-md flex items-center gap-2 pointer-events-none" style={{ fontSize: '22px', fontWeight: 700, textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
                <Sparkles className="w-5 h-5 text-[#FFBA00] drop-shadow-lg" strokeWidth={2} />
                My Events
              </h2>
              <motion.button
                onClick={() => onNavigate && onNavigate('bookings')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-[16px] bg-white/95 text-[#082820] shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                <span style={{ fontSize: '13px', fontWeight: 700 }}>Add</span>
              </motion.button>
            </div>

            {/* Credit Card Stack - 3D Parallax */}
            <div className="relative h-[260px] perspective-1000 mx-auto max-w-[380px]" ref={constraintsRef} style={{ zIndex: 30 }}>
              {eventCards.map((card, index) => {
                // Calculate circular offset for infinite looping
                let offset = index - activeCard;
                
                // Normalize offset to shortest path in circular array
                const halfLength = eventCards.length / 2;
                if (offset > halfLength) {
                  offset -= eventCards.length;
                } else if (offset < -halfLength) {
                  offset += eventCards.length;
                }
                
                const isActive = index === activeCard;
                const isVisible = Math.abs(offset) <= 2;

                return (
                  <motion.div
                    key={card.id}
                    layoutId={`event-card-${card.id}`}
                    className="absolute w-full cursor-grab active:cursor-grabbing"
                    style={{ 
                      zIndex: isActive ? 50 : 40 - Math.abs(offset),
                      pointerEvents: isVisible ? 'auto' : 'none',
                      willChange: 'transform, opacity'
                    }}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    dragElastic={0.2}
                    onDragEnd={(e, info) => {
                      if (Math.abs(info.offset.x) > 100) {
                        handleCardSwipe(info.offset.x < 0 ? 1 : -1);
                      }
                    }}
                    initial={false}
                    animate={{
                      x: offset * 20,
                      y: Math.abs(offset) * 12,
                      scale: 1 - Math.abs(offset) * 0.06,
                      opacity: isVisible ? 1 - Math.abs(offset) * 0.25 : 0,
                      rotateY: offset * -8,
                      rotateX: isActive ? 0 : 3
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }}
                    onClick={() => {
                      if (isActive) {
                        onNavigate && onNavigate('bookings');
                      } else {
                        setActiveCard(index);
                      }
                    }}
                    whileHover={isActive ? { y: -8, rotateX: -2 } : {}}
                  >
                    <div className={`h-full bg-gradient-to-br ${card.gradient} backdrop-blur-2xl rounded-[28px] border-2 border-white/70 shadow-2xl overflow-hidden relative`}
                      style={{ 
                        boxShadow: isActive 
                          ? '0 30px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.8)' 
                          : '0 20px 40px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {/* Glass layer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent" />

                      {/* Gold accent line */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-70" />

                      {/* Content */}
                      <div className="relative p-6 h-full flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, rgba(237, 252, 220, 0.6) 0%, rgba(255, 251, 220, 0.6) 50%, rgba(237, 252, 220, 0.6) 100%)', backdropFilter: 'blur(10px)' }}>
                        {/* Top section */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <motion.div
                                className={`w-14 h-14 ${card.iconBg} backdrop-blur-xl rounded-[16px] flex items-center justify-center border-2 border-white/50 shadow-lg`}
                                animate={isActive ? { rotate: [0, 5, 0] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <card.icon className="w-7 h-7 text-[#082820]/60" strokeWidth={2} />
                              </motion.div>
                            </div>
                            <h3 className="text-[#082820] mb-2" style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.3px' }}>
                              {card.name}
                            </h3>
                            <div className="inline-block px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border-2 border-white/60">
                              <span className="text-[#082820]" style={{ fontSize: '11px', fontWeight: 700 }}>
                                {card.status}
                              </span>
                            </div>
                          </div>

                          {/* Eventcore logo mark */}
                          <motion.div
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Sparkles className="w-7 h-7 text-[#FFBA00]" strokeWidth={2} />
                          </motion.div>
                        </div>

                        {/* Bottom section */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[#082820]">
                            <Clock className="w-4 h-4" strokeWidth={2.5} />
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>
                              {card.date} · {card.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#082820]/80">
                            <MapPin className="w-4 h-4" strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', fontWeight: 500 }}>
                              {card.location}
                            </span>
                          </div>

                          {/* Pagination dots */}
                          <div className="flex gap-1.5 pt-3">
                            {eventCards.map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${
                                  i === activeCard 
                                    ? 'w-8 bg-gradient-to-r from-[#FFBA00] to-[#B46617]' 
                                    : 'w-1.5 bg-[#082820]/30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: 'easeInOut'
                        }}
                        style={{ pointerEvents: 'none' }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* View All Link */}
            <motion.button
              onClick={() => onNavigate && onNavigate('bookings')}
              className="mt-5 text-white/90 hover:text-white transition-colors flex items-center gap-2 mx-auto group drop-shadow-md"
              whileHover={{ x: 5 }}
              style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, display: 'inline-block', marginTop: '10px' }}>View All Events</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </motion.button>
          </motion.div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onHoverStart={() => setHoveredMenu(item.id)}
                onHoverEnd={() => setHoveredMenu(null)}
              >
                <motion.div
                  className="bg-white/90 backdrop-blur-2xl rounded-[24px] border border-white/70 p-5 cursor-pointer shadow-lg relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FFBA00]/15 to-transparent opacity-0"
                    animate={{ opacity: hoveredMenu === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-[56px] h-[56px] bg-gradient-to-br from-[#082820] to-[#0f3d30] rounded-[18px] flex items-center justify-center shadow-lg"
                        animate={{
                          rotate: hoveredMenu === item.id ? 5 : 0,
                          scale: hoveredMenu === item.id ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </motion.div>
                      <div>
                        <h3 className="text-[#082820]" style={{ fontSize: '16px', fontWeight: 700 }}>
                          {item.title}
                        </h3>
                        <p className="text-[#5A8060]" style={{ fontSize: '12px', fontWeight: 500 }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ 
                        x: hoveredMenu === item.id ? 5 : 0,
                        opacity: hoveredMenu === item.id ? 1 : 0.6
                      }}
                    >
                      <ChevronRight className="w-5 h-5 text-[#082820]" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="pt-4"
          >
            <motion.button
              onClick={onLogout}
              className="w-full bg-white/90 backdrop-blur-xl border-2 border-white/70 text-[#082820] hover:bg-white rounded-[20px] py-4 shadow-lg flex items-center justify-center gap-3"
              style={{ fontSize: '15px', fontWeight: 700 }}
              whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" strokeWidth={2.5} />
              <span>Sign Out</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

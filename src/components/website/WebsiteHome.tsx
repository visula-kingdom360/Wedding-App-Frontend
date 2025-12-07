import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Sparkles, 
  Calendar, 
  Users,
  User, 
  Heart, 
  Star, 
  TrendingUp,
  Shield,
  Zap,
  Check,
  ArrowRight,
  ChevronRight,
  Package,
  Search,
  MessageCircle,
  Award,
  Target,
  Globe,
  Briefcase,
  Camera,
  Music,
  Cake,
  PartyPopper,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface WebsiteHomeProps {
  onNavigate: (view: 'customer' | 'merchant') => void;
}

export function WebsiteHome({ onNavigate }: WebsiteHomeProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const categories = [
    {
      name: 'PHOTOGRAPHY',
      displayName: 'Photography',
      image: 'https://images.unsplash.com/photo-1751107996147-9ed1eded1f9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjQzMzUxMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Capture your perfect moments with professional photographers',
      vendors: '500+'
    },
    {
      name: 'CATERING',
      displayName: 'Catering',
      image: 'https://images.unsplash.com/photo-1653936392747-cbbf97f8d45c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNha2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDMzNTEwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Delight your guests with exquisite culinary experiences',
      vendors: '400+'
    },
    {
      name: 'DECORATION',
      displayName: 'Decoration',
      image: 'https://images.unsplash.com/photo-1684243920725-956d93ff391a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBkZWNvcmF0aW9uJTIwYm91cXVldCUyMHdlZGRpbmd8ZW58MXx8fHwxNzY0MzM1MTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Transform your venue into a magical wonderland',
      vendors: '350+'
    },
    {
      name: 'ENTERTAINMENT',
      displayName: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1660211934853-e33d8a02201d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBESiUyMGVxdWlwbWVudCUyMHR1cm50YWJsZXxlbnwxfHx8fDE3NjQzMzUxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Keep the celebration alive with premium entertainment',
      vendors: '300+'
    },
    {
      name: 'VENUES',
      displayName: 'Venues',
      image: 'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudUxlMjBiYWxscm9vbXxlbnwxfHx8fDE3NjQzMzUxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Find the perfect setting for your dream celebration',
      vendors: '200+'
    }
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Vendor Discovery',
      description: 'Find the perfect vendors with AI-powered recommendations and advanced filtering',
      color: 'from-forest-green-500 to-sage-green-500'
    },
    {
      icon: Calendar,
      title: 'Intelligent Planning',
      description: 'Automated task generation and timeline management for stress-free event planning',
      color: 'from-sage-green-500 to-bronze-brown-500'
    },
    {
      icon: Package,
      title: 'Package Management',
      description: 'Browse, compare, and book comprehensive event packages tailored to your needs',
      color: 'from-bronze-brown-500 to-gold-yellow-500'
    },
    {
      icon: TrendingUp,
      title: 'Merchant Analytics',
      description: 'Real-time insights and growth tracking for vendor businesses',
      color: 'from-gold-yellow-500 to-forest-green-500'
    }
  ];

  const services = [
    { icon: Camera, name: 'Photography', count: '500+' },
    { icon: Music, name: 'Entertainment', count: '300+' },
    { icon: Cake, name: 'Catering', count: '400+' },
    { icon: PartyPopper, name: 'Decoration', count: '350+' },
    { icon: Heart, name: 'Venues', count: '200+' },
    { icon: Briefcase, name: 'Planning', count: '150+' }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Couples', icon: Heart },
    { value: '2,500+', label: 'Trusted Vendors', icon: Award },
    { value: '50,000+', label: 'Events Planned', icon: Calendar },
    { value: '98%', label: 'Success Rate', icon: Target }
  ];

  const testimonials = [
    {
      name: 'Sarah & John',
      event: 'Wedding - Colombo',
      rating: 5,
      text: 'EventCore made our dream wedding a reality! The platform was so easy to use and we found amazing vendors.',
      image: '👰'
    },
    {
      name: 'Priya Entertainment',
      role: 'Merchant Partner',
      rating: 5,
      text: 'As a vendor, EventCore has transformed our business. The analytics and booking system are incredible!',
      image: '🎵'
    },
    {
      name: 'Michael & Emma',
      event: 'Anniversary - Kandy',
      rating: 5,
      text: 'The task management and vendor coordination features saved us so much time and stress!',
      image: '💑'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const categoryInterval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 2000);
    return () => clearInterval(categoryInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-forest-green-50/30">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-forest-green-200/20 to-sage-green-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-gold-yellow-200/20 to-bronze-brown-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-to-br from-sage-green-200/20 to-forest-green-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-forest-green-500 to-sage-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-forest-green-600 to-sage-green-600 bg-clip-text text-transparent">
                  EventCore
                </h1>
                <p className="text-xs text-gray-600">Your Event, Perfected</p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-forest-green-600 transition-colors">Features</a>
              <a href="#services" className="text-gray-700 hover:text-forest-green-600 transition-colors">Services</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-forest-green-600 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-forest-green-600 transition-colors">Reviews</a>
            </div>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button
                  onClick={() => onNavigate('customer')}
                  variant="outline"
                  className="border-forest-green-500 text-forest-green-600 hover:bg-forest-green-50"
                >
                  Plan Event
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button
                  onClick={() => onNavigate('merchant')}
                  variant="outline"
                  className="border-bronze-brown-500 text-bronze-brown-600 hover:bg-bronze-brown-50"
                >
                  For Vendors
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('customer')}
                  className="bg-gradient-to-r from-forest-green-500 to-sage-green-600 text-white shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Open App
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Animated Category Showcase */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-green-900 via-forest-green-800 to-forest-green-900">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 50%, rgba(109, 151, 115, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(109, 151, 115, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(109, 151, 115, 0.3) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Category Name with Letter Animation */}
            <div className="mb-12 relative h-32 flex items-center justify-center">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider"
              >
                {categories[activeCategory].name.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className="inline-block text-white/90"
                    style={{
                      textShadow: '0 0 30px rgba(255, 186, 0, 0.5), 0 0 60px rgba(180, 102, 23, 0.3)'
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Product Image - 3D Effect */}
            <div className="relative mb-12 w-full max-w-2xl h-96 flex items-center justify-center">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.5, rotateY: -180, z: -1000 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateY: 180, z: -1000 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                className="absolute"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotateY: [0, 5, -5, 0],
                    rotateX: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <ImageWithFallback
                    src={categories[activeCategory].image}
                    alt={categories[activeCategory].displayName}
                    className="w-96 h-96 object-cover rounded-3xl shadow-2xl"
                    style={{
                      filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 40px rgba(255, 186, 0, 0.3))',
                      transform: 'translateZ(50px)'
                    }}
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-yellow-500/30 to-transparent rounded-3xl" />
                </motion.div>
              </motion.div>
            </div>

            {/* Category Info */}
            <motion.div
              key={`info-${activeCategory}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-2xl">
                {categories[activeCategory].description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Badge className="bg-gold-yellow-500 text-gray-900 border-0 px-4 py-2 text-lg">
                  {categories[activeCategory].vendors} Vendors Available
                </Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-yellow-500 text-gold-yellow-500" />
                  ))}
                  <span className="text-white/80 ml-2 text-lg">(4.9)</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('customer')}
                  size="lg"
                  className="bg-gradient-to-r from-gold-yellow-500 to-bronze-brown-500 text-gray-900 shadow-2xl hover:shadow-gold-yellow-500/50 text-xl px-12 py-8 rounded-full group"
                >
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                  EXPLORE NOW
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Category Indicators */}
            <div className="flex gap-3">
              {categories.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`transition-all duration-300 ${
                    index === activeCategory 
                      ? 'w-12 h-3 bg-gold-yellow-500 rounded-full' 
                      : 'w-3 h-3 bg-white/30 rounded-full hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <ChevronRight className="w-8 h-8 text-white/50 rotate-90" />
            </motion.div>
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold-yellow-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-forest-green-500 to-sage-green-500 text-white border-0">
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need in
              <span className="block bg-gradient-to-r from-forest-green-600 to-sage-green-600 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our curated selection of premium vendors across all event categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-forest-green-50/30">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-forest-green-500 to-sage-green-500 rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-sm mb-1 text-neutral-dark">{service.name}</h3>
                      <p className="text-xs text-sage-green-600 font-medium">{service.count} Vendors</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-forest-green-50/50 to-sage-green-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-bronze-brown-500 to-gold-yellow-500 text-white border-0">
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Tools for
              <span className="block bg-gradient-to-r from-bronze-brown-600 to-gold-yellow-600 bg-clip-text text-transparent">
                Seamless Planning
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveFeature(index)}
                  className="cursor-pointer"
                >
                  <Card className={`border-2 transition-all duration-300 ${
                    activeFeature === index
                      ? 'border-forest-green-500 shadow-2xl'
                      : 'border-transparent shadow-lg hover:border-sage-green-300'
                  }`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <motion.div
                          animate={activeFeature === index ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-neutral-dark">{feature.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                          {activeFeature === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-4 border-t border-gray-200"
                            >
                              <div className="flex items-center gap-2 text-sm text-forest-green-600">
                                <Check className="w-4 h-4" />
                                <span>Real-time updates</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-forest-green-600 mt-2">
                                <Check className="w-4 h-4" />
                                <span>24/7 support available</span>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-forest-green-500 to-sage-green-500 text-white border-0">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Plan Your Event in
              <span className="block bg-gradient-to-r from-forest-green-600 to-sage-green-600 bg-clip-text text-transparent">
                4 Easy Steps
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-forest-green-200 via-sage-green-200 to-bronze-brown-200" style={{ width: '75%', marginLeft: '12.5%' }} />

            {[
              { step: '01', title: 'Create Account', desc: 'Sign up and tell us about your event', icon: User },
              { step: '02', title: 'Browse Vendors', desc: 'Explore our curated vendor marketplace', icon: Search },
              { step: '03', title: 'Book Services', desc: 'Select and book your preferred vendors', icon: Calendar },
              { step: '04', title: 'Celebrate', desc: 'Enjoy your perfectly planned event', icon: PartyPopper }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="relative mx-auto mb-6"
                    >
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-forest-green-500 to-sage-green-500 rounded-full flex items-center justify-center shadow-xl relative z-10">
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 bg-white px-4 py-1 rounded-full shadow-lg border-2 border-forest-green-500 z-20">
                        <span className="text-sm font-bold text-forest-green-600">{item.step}</span>
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-dark">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-forest-green-600 via-sage-green-600 to-forest-green-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-forest-green-100">
              Join Sri Lanka's fastest-growing event planning community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center"
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-forest-green-100">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-gold-yellow-500 to-bronze-brown-500 text-white border-0">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Users
              <span className="block bg-gradient-to-r from-gold-yellow-600 to-bronze-brown-600 bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-yellow-500 text-gold-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-forest-green-500 to-sage-green-500 rounded-full flex items-center justify-center text-2xl">
                        {testimonial.image}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-dark">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.event || testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-forest-green-900 to-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 bg-gold-yellow-500 text-gray-900 border-0 px-4 py-2">
                <Zap className="w-4 h-4 mr-2 inline" />
                Launch the App
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Experience EventCore
                <span className="block bg-gradient-to-r from-gold-yellow-400 to-bronze-brown-400 bg-clip-text text-transparent">
                  Right in Your Browser
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                No download required! Access all features instantly with our progressive web app. Plan your perfect event from any device, anywhere.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  'Instant access - no installation needed',
                  'Works on mobile, tablet & desktop',
                  'Real-time updates & notifications',
                  'Offline capability for planning on-the-go'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-gold-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-gray-900" />
                    </div>
                    <p className="text-gray-200">{feature}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 186, 0, 0.4)' }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => onNavigate('customer')}
                    size="lg"
                    className="bg-gradient-to-r from-gold-yellow-500 to-bronze-brown-500 text-gray-900 shadow-2xl hover:shadow-gold-yellow-500/50 text-lg px-8 py-6 group"
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Open App Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onNavigate('merchant')}
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  >
                    Vendor Dashboard
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-yellow-500/20 to-bronze-brown-500/20 rounded-full blur-3xl" />
              
              {/* Phone Frame */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto w-80 h-[600px] bg-gray-800 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-700"
              >
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-br from-forest-green-500 via-sage-green-500 to-forest-green-600 rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-10" />
                  
                  {/* App Preview Content */}
                  <div className="p-6 pt-12 h-full flex flex-col">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center mb-8"
                    >
                      <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">EventCore</h3>
                      <p className="text-sm text-white/80">Your Event, Perfected</p>
                    </motion.div>

                    {/* Animated Cards */}
                    <div className="space-y-3 flex-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ x: 100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ 
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            duration: 0.5
                          }}
                          className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/30 rounded-xl" />
                            <div className="flex-1">
                              <div className="h-3 bg-white/40 rounded-full mb-2" style={{ width: '70%' }} />
                              <div className="h-2 bg-white/30 rounded-full" style={{ width: '50%' }} />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Button */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gold-yellow-500 text-gray-900 font-bold py-4 rounded-2xl text-center"
                    >
                      Start Planning
                    </motion.div>
                  </div>
                </div>

                {/* Home Button */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-8 -left-8 w-20 h-20 bg-gold-yellow-500/30 rounded-2xl backdrop-blur-sm border border-gold-yellow-400/50 flex items-center justify-center"
              >
                <Calendar className="w-10 h-10 text-gold-yellow-400" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-bronze-brown-500/30 rounded-2xl backdrop-blur-sm border border-bronze-brown-400/50 flex items-center justify-center"
              >
                <Heart className="w-10 h-10 text-bronze-brown-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-forest-green-50 to-sage-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-forest-green-500 to-sage-green-500 rounded-full flex items-center justify-center shadow-2xl"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Plan Your
              <span className="block bg-gradient-to-r from-forest-green-600 to-sage-green-600 bg-clip-text text-transparent">
                Perfect Event?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of happy couples and event planners today
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('customer')}
                  size="lg"
                  className="bg-gradient-to-r from-forest-green-500 to-sage-green-600 text-white shadow-xl hover:shadow-2xl text-lg px-8 py-6"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('merchant')}
                  size="lg"
                  variant="outline"
                  className="border-2 border-forest-green-500 text-forest-green-600 hover:bg-forest-green-50 text-lg px-8 py-6"
                >
                  Become a Partner
                  <Briefcase className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-forest-green-700 via-forest-green-800 to-forest-green-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-green-500 to-forest-green-400 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">EventCore</h3>
                  <p className="text-xs text-forest-green-300">Your Event, Perfected</p>
                </div>
              </div>
              <p className="text-forest-green-300 text-sm">
                Sri Lanka's premier event planning platform connecting you with the best vendors.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-forest-green-300">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">For Business</h4>
              <ul className="space-y-2 text-sm text-forest-green-300">
                <li><a href="#" className="hover:text-white transition-colors">Become a Vendor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-forest-green-300">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@eventcore.lk
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +94 11 234 5678
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Colombo, Sri Lanka
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-forest-green-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-forest-green-300">
              © 2025 EventCore. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-forest-green-700 hover:bg-forest-green-600 rounded-full flex items-center justify-center transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-forest-green-700 hover:bg-forest-green-600 rounded-full flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-forest-green-700 hover:bg-forest-green-600 rounded-full flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import image_950441eca7a19b2b7b383a363c61e9e9ad294ffd from 'figma:asset/950441eca7a19b2b7b383a363c61e9e9ad294ffd.png';
import image_477fc642b8808557cb891a7262e525bf3cc6a1f1 from 'figma:asset/477fc642b8808557cb891a7262e525bf3cc6a1f1.png';
import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Search,
  Camera,
  Video,
  Building2,
  Sparkles,
  Star,
  Heart,
  Package,
  Bell,
  X,
} from "lucide-react";
import Slider from "react-slick";
import type { CustomerScreen } from "./CustomerApp";
import type { TipData } from "./TipDetailScreen";
import type { EventData } from "./EventDetailScreen";
import { GlassyHeartButton } from "./GlassyHeartButton";
import decorationImage from "figma:asset/ce300e685262730b11184b0b30b227db5baafbe0.png";
import topPicksImage from "figma:asset/fd4bc1e8a41e101d32de5b642232776295d578ee.png";
import heroBackground from "figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png";
import promoBannerImage from "figma:asset/defbdfe69205f63d220a42fd5a2c4c6205e537fd.png";
import ctaBackground from "figma:asset/25a1d42d25b2078293bd210b3e877239f108d4bf.png";
import { getActivePromotions, getActiveSecondaryPromotions } from "../../data/vendorPromotions";
import { vendors } from "../../data/vendors";

interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "merchant" | "admin";
}

interface CustomerHomeProps {
  user: User | null;
  onNavigate: (screen: CustomerScreen) => void;
  onTipSelect: (tip: TipData) => void;
  onEventSelect: (event: EventData) => void;
  onCategorySelect?: (categoryName: string) => void;
  onPackageSelect?: (vendorId: string, packageId?: string, promotionId?: string) => void;
  onVendorSelect?: (vendorId: string) => void;
}

export function CustomerHome({
  user,
  onNavigate,
  onTipSelect,
  onEventSelect,
  onCategorySelect,
  onPackageSelect,
  onVendorSelect,
}: CustomerHomeProps) {
  const getFirstName = (user: User | null) => {
    if (!user) return "Guest";
    return user.name.split(" ")[0];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const categories = [
    { id: "1", name: "Photography", icon: Camera },
    { id: "2", name: "Videography", icon: Video },
    { id: "3", name: "Venues", icon: Building2 },
    { id: "4", name: "Decorations", icon: Sparkles },
    { id: "5", name: "Favorites", icon: Heart },
    { id: "6", name: "Packages", icon: Package },
    { id: "7", name: "Updates", icon: Bell },
  ];

  // Get active vendor promotions
  const promoBanners = getActivePromotions();
  const secondaryPromotions = getActiveSecondaryPromotions();

  // Old static banners - replaced with vendor promotions
  /*
  const promoBanners = [
    {
      id: "1",
      title: "PLAN YOUR\nWEDDING\nTODAY",
      image: promoBannerImage,
      bgColor: "from-[#0C3B2E]/70 to-[#0C3B2E]/50",
    },
    {
      id: "2",
      title: "EXCLUSIVE\nVENDOR\nDEALS",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=400&fit=crop",
      bgColor: "from-[#B46617]/70 to-[#B46617]/50",
    },
    {
      id: "3",
      title: "BOOK NOW\nSAVE 20%",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop",
      bgColor: "from-[#6D9773]/70 to-[#6D9773]/50",
    },
  ];
  */

  const bannerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  const forYouVendors = [
    {
      id: "1",
      name: "Great Photography",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBnb2xkfGVufDF8fHx8MTc2MTE1NDg3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Daddy Band",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjB3aGl0ZXxlbnwxfHx8fDE3NjExNTQ4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop",
      isFavorite: false,
    },
  ];

  // Get featured vendors from vendors data
  const vendorsYouMayLike = Object.values(vendors).filter(vendor => vendor.featured);

  const vendorsForYou = [
    {
      id: "1",
      name: "Wedding Decoration",
      price: "LKR 20,000",
      rating: 4.8,
      image:
        image_950441eca7a19b2b7b383a363c61e9e9ad294ffd,
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    },
    {
      id: "2",
      name: "Wedding Decoration",
      price: "LKR 20,000",
      rating: 4.8,
      image:
        image_477fc642b8808557cb891a7262e525bf3cc6a1f1,
      logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop",
    },
  ];

  const topPicks = [
    {
      id: "1",
      title: "Premium Wedding Package",
      vendor: "Great Photography",
      description:
        "Complete Wedding Coverage with professional editing and album",
      rating: 4.8,
      category: "Photography",
      price: "LKR 45,000",
      originalPrice: "LKR 55,000",
      discount: "18% off",
      badge: "Featured",
      image: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBwb3J0Zm9saW98ZW58MXx8fHwxNzYxNjI0NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "Full day Coverage",
        "500+ edited photos",
        "Premium album",
        "USB drive",
      ],
    },
    {
      id: "2",
      title: "Luxury Photography Package",
      vendor: "Artistic Shots",
      description:
        "Cinematic wedding photography with drone coverage",
      rating: 4.9,
      category: "Photography",
      price: "LKR 65,000",
      originalPrice: "LKR 80,000",
      discount: "19% off",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1708134128335-1ea956d44c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmlkZW9ncmFwaHklMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzYxNjI0NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "Full day + night",
        "Drone footage",
        "1000+ photos",
        "Luxury album",
      ],
    },
    {
      id: "3",
      title: "Grand Decoration Package",
      vendor: "Elegant Decor",
      description:
        "Premium stage and hall decoration with floral arrangements",
      rating: 4.7,
      category: "Decoration",
      price: "LKR 85,000",
      originalPrice: "LKR 100,000",
      discount: "15% off",
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1761110657716-1eb3cb62de97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnMlMjBlbGVnYW50fGVufDF8fHx8MTc2MTU4MTAwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "Stage setup",
        "Hall decoration",
        "Fresh flowers",
        "Lighting",
      ],
    },
    {
      id: "4",
      title: "Live Band Entertainment",
      vendor: "Daddy Band",
      description:
        "Professional live music band for your special day",
      rating: 4.8,
      category: "Entertainment",
      price: "LKR 55,000",
      originalPrice: null,
      discount: null,
      badge: "New",
      image: "https://images.unsplash.com/photo-1712764995301-995e730b6147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwYmFuZCUyMHdlZGRpbmclMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjE2MjQ0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "4 hour performance",
        "5 piece band",
        "Sound system",
        "Song requests",
      ],
    },
    {
      id: "5",
      title: "Designer Wedding Cake",
      vendor: "Sweet Dreams Bakery",
      description:
        "Custom multi-tier wedding cake with premium ingredients",
      rating: 4.9,
      category: "Catering",
      price: "LKR 35,000",
      originalPrice: "LKR 42,000",
      discount: "17% off",
      badge: "Featured",
      image: "https://images.unsplash.com/photo-1638871894014-047605c91c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGRlc2lnbmVyJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjE2MjQ0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "3-tier design",
        "Custom flavors",
        "Delivery included",
        "Cake topper",
      ],
    },
  ];

  // Get top pick vendors (showing decoration and venue vendors)
  const ourTopPicksDecorations = [vendors['3'], vendors['7']].filter(Boolean).map(vendor => ({
    id: vendor.id,
    title: vendor.name,
    price: vendor.price.replace('Starting from ', ''),
    rating: vendor.rating,
    image: vendor.image,
  }));

  // Get brands from actual vendor data
  const brandsYouMayLike = [
    vendors['1'], // Great Photography
    vendors['2'], // Daddy Band
    vendors['3'], // Kulunu Weddings
    vendors['8'], // Elegant Invitations
    vendors['6'], // Sweet Dreams Cakes
  ].filter(Boolean).map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    logo: vendor.logo,
    category: vendor.categories[0]?.name || 'Services',
  }));

  const popularPackages = [
    {
      id: "1-1",
      vendorId: "1",
      title: "Premium Wedding Package",
      vendor: "Great Photography",
      description:
        "Complete Wedding Coverage with professional editing and album",
      rating: 4.8,
      category: "Photography",
      price: "LKR 45,000",
      originalPrice: "LKR 55,000",
      discount: "18% off",
      badge: "Featured",
      image: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBwb3J0Zm9saW98ZW58MXx8fHwxNzYxNjI0NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "Full day Coverage",
        "500+ edited photos",
        "Premium album",
        "USB drive",
      ],
    },
    {
      id: "2-1",
      vendorId: "2",
      title: "Luxury Photography Package",
      vendor: "Artistic Shots",
      description:
        "Cinematic wedding photography with drone coverage",
      rating: 4.9,
      category: "Photography",
      price: "LKR 65,000",
      originalPrice: "LKR 80,000",
      discount: "19% off",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1708134128335-1ea956d44c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmlkZW9ncmFwaHklMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzYxNjI0NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "Full day + night",
        "Drone footage",
        "1000+ photos",
        "Luxury album",
      ],
    },
    {
      id: "3-1",
      vendorId: "3",
      title: "Grand Decoration Package",
      vendor: "Elegant Decor",
      description:
        "Premium stage and hall decoration with floral arrangements",
      rating: 4.7,
      category: "Decoration",
      price: "LKR 85,000",
      originalPrice: "LKR 100,000",
      discount: "15% off",
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1761110657716-1eb3cb62de97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnMlMjBlbGVnYW50fGVufDF8fHx8MTc2MTU4MTAwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      includes: [
        "Stage setup",
        "Hall decoration",
        "Fresh flowers",
        "Lighting",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E7D7] via-[#E5F0E7] to-[#C8DDD0]">
      {/* Hero Header Section with Background */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="Event Planning Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0C3B2E]/60"></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 px-5 pt-10 pb-6 h-full flex flex-col">
          {/* Top Bar - Profile and Notification */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar
                className="h-[45px] w-[45px] border-[1.5px] border-white/30 cursor-pointer flex-shrink-0"
                onClick={() => onNavigate("profile")}
              >
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" />
                <AvatarFallback
                  className="bg-[#6D9773] text-white"
                  style={{ fontSize: "17px", fontWeight: 500 }}
                >
                  {getFirstName(user)[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white" style={{ fontSize: "12px", fontWeight: 400 }}>
                  Hi 👋
                </p>
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                  {user ? user.name : "Guest"},
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("notifications")}
              className="relative h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <Bell className="h-6 w-6 text-[#FFBA00]" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FFBA00] rounded-full"></span>
            </button>
          </div>

          {/* Main Heading */}
          <div className="-mt-2">
            <p className="text-[#FFBA00] mb-2" style={{ fontSize: "18px", fontWeight: 500 }}>
              {getGreeting()},
            </p>
            <h1
              className="text-white leading-tight"
              style={{ fontSize: "24px", fontWeight: 500 }}
            >
              Welcome to Your<br />Ultimate Event Planner
            </h1>
          </div>
        </div>
      </div>

      {/* White Container with Search - Overlapping */}
      <div className="bg-white rounded-t-[40px] -mt-[120px] relative z-20 shadow-lg pb-20">
        {/* Search Bar */}
        <div className="px-5 pt-8 pb-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#999999]" />
            <Input
              placeholder="Vendors, Venues, Services"
              className="pl-12 h-[56px] bg-white border border-gray-200 rounded-[28px] text-[15px] placeholder:text-[#999999] shadow-md"
              onClick={() => onNavigate("vendor")}
              readOnly
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="pb-6">
          {/* Promo Banner Slider */}
          <div className="mb-6 px-5">
            <Slider {...bannerSettings}>
              {promoBanners.map((banner) => (
                <div key={banner.id} className="outline-none">
                  <div
                    className="relative h-[180px] rounded-[20px] overflow-hidden cursor-pointer"
                    onClick={() => {
                      if (onPackageSelect && banner.vendorId) {
                        onPackageSelect(banner.vendorId, undefined, banner.id);
                      } else {
                        onNavigate("vendor");
                      }
                    }}
                  >
                    <ImageWithFallback
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />

                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Popular Vendor Category */}
          <div className="mb-6">
            <h3
              className="text-[#1a1a1a] mb-4 px-5"
              style={{ fontSize: "20.7px", fontWeight: 500 }}
            >
              Popular Vendor Category
            </h3>
            <div className="flex overflow-x-auto px-5 scrollbar-hide" style={{ gap: '20px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => {
                      if (onCategorySelect && !['Favorites', 'Packages', 'Updates'].includes(category.name)) {
                        onCategorySelect(category.name);
                      } else {
                        onNavigate("categories");
                      }
                    }}
                    className="cursor-pointer flex flex-col items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
                    style={{ width: 'calc((100vw - 110px) / 4.5)' }}
                  >
                    <div className="bg-[rgba(0,37,30,0.87)] rounded-full w-[66px] h-[66px] flex items-center justify-center shadow-md">
                      <Icon
                        className="w-8 h-8 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className="text-[11px] text-[#1a1a1a] text-center leading-tight"
                      style={{ fontWeight: 500 }}
                    >
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Vendors */}
          <div className="mb-5 px-5 mt-8">
            <div className="mb-2 flex items-center justify-between">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Featured Vendors
              </h3>
              <button
                className="text-[#5A8A6E] hover:text-[#4A7A5E] transition-colors"
                style={{ fontSize: "16.8px", fontWeight: 500 }}
                onClick={() => onNavigate("vendor")}
              >
                View Vendors
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-5 pr-5">
              {vendorsYouMayLike.map((vendor) => (
                <div
                  key={`featured-${vendor.id}`}
                  className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-all"
                  style={{
                    width: "calc((100vw - 64px) / 1.47)",
                  }}
                  onClick={() => {
                    if (onVendorSelect) {
                      onVendorSelect(vendor.id);
                    } else {
                      onNavigate("vendor-detail");
                    }
                  }}
                >
                  <div className="h-[135px] relative rounded-[9px] overflow-hidden mb-2">
                    <ImageWithFallback
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4
                      className="text-[#1a1a1a]"
                      style={{
                        fontSize: "15.75px",
                        fontWeight: 600,
                        lineHeight: "1.2",
                      }}
                    >
                      {vendor.name}
                    </h4>
                    <p
                      className="text-[#666666] mb-1"
                      style={{
                        fontSize: "11.25px",
                        fontWeight: 400,
                        lineHeight: "1.2",
                      }}
                    >
                      Starting Packages from
                    </p>
                    <Badge
                      className="bg-[#FFBA00] hover:bg-[#FFBA00] text-[#1a1a1a] px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "12.75px",
                        fontWeight: 700,
                      }}
                    >
                      {vendor.price}+
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Top Picks - Wedding Decorations */}
          <div className="mb-6 px-5">
            <div className="mb-4 flex items-center justify-between">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Our Top picks
              </h3>
              <button
                className="text-[#5A8A6E] hover:text-[#4A7A5E] transition-colors"
                style={{ fontSize: "16.8px", fontWeight: 500 }}
                onClick={() => onNavigate("vendor")}
              >
                View Vendors
              </button>
            </div>
            <div className="flex overflow-x-auto scrollbar-hide pb-2 -mr-5 pr-5" style={{ gap: "14.4px" }}>
              {ourTopPicksDecorations.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 cursor-pointer"
                  style={{
                    width: "calc((100vw - 64px) / 0.96)",
                  }}
                  onClick={() => onPackageSelect?.(item.id)}
                >
                  <div className="bg-white/60 backdrop-blur-md rounded-[24px] overflow-hidden shadow-sm border border-white/50">
                    <div className="h-[180px] relative">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div style={{ padding: "15.4px" }}>
                      <div className="flex items-start justify-between" style={{ marginBottom: "7.7px" }}>
                        <h4
                          className="text-[#1a1a1a] flex-1"
                          style={{
                            fontSize: "15.4px",
                            fontWeight: 600,
                          }}
                        >
                          {item.title}
                        </h4>
                        <div className="flex items-center ml-2" style={{ gap: "3.8px" }}>
                          <Star style={{ width: "15.4px", height: "15.4px" }} className="fill-[#FFBA00] text-[#FFBA00]" />
                          <span
                            className="text-[#1a1a1a]"
                            style={{
                              fontSize: "14.4px",
                              fontWeight: 700,
                            }}
                          >
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <p
                        className="text-[#666666]"
                        style={{
                          fontSize: "16.25px",
                          fontWeight: 400,
                        }}
                      >
                        Starting from {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand You May Like */}
          <div className="mb-5 px-5">
            <div className="mb-3">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Brand You May Like
              </h3>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-5 pr-5">
              {brandsYouMayLike.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-all"
                  onClick={() => onPackageSelect?.(brand.id)}
                >
                  <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 p-3 flex flex-col items-center gap-2 w-[85px] h-[110px]">
                    <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <ImageWithFallback
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center w-full flex-1 flex items-center justify-center">
                      <h4
                        className="text-[#1a1a1a] line-clamp-2"
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 1px",
                          lineHeight: "1.4",
                        }}
                      >
                        {brand.name}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Packages - Carousel */}
          <div className="mb-5">
            <div className="mb-3 px-5">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Featured Packages
              </h3>
            </div>
            <div className="relative overflow-hidden">
              <div className="pl-5">
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1.15}
                  slidesToScroll={1}
                  arrows={false}
                  autoplay={false}
                  initialSlide={0}
                  centerMode={false}
                  className="popular-packages-carousel"
                  dotsClass="slick-dots custom-dots"
                >
                {popularPackages.map((pkg) => (
                  <div key={pkg.id} className="pr-3">
                    <Card 
                      className="bg-white/60 backdrop-blur-md rounded-[20px] border border-white/50 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-[500px] flex flex-col"
                      onClick={() => onPackageSelect && onPackageSelect(pkg.vendorId, pkg.id)}
                    >
                      <CardContent className="pt-[0px] pr-[0px] pb-[4px] pl-[0px] flex flex-col h-full">
                        {/* Header with title and badge */}
                        <div className="p-3 pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              className="text-[#1a1a1a] flex-1 leading-tight"
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              {pkg.title}
                            </h4>
                            <Badge
                              className="bg-[#FFBA00] hover:bg-[#FFBA00] text-[#1a1a1a] px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{
                                fontSize: "10px",
                                fontWeight: 700,
                              }}
                            >
                              {pkg.badge}
                            </Badge>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="px-3 pb-2">
                          <div className="h-[135px] relative overflow-hidden rounded-xl">
                            <ImageWithFallback
                              src={pkg.image}
                              alt={pkg.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="px-3 pb-1.5 flex-1 flex flex-col">
                          <p
                            className="text-[#666666] mb-1.5"
                            style={{
                              fontSize: "11px",
                              fontWeight: 400,
                            }}
                          >
                            by {pkg.vendor}
                          </p>
                          <p
                            className="text-[#1a1a1a] mb-2"
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              lineHeight: "1.4",
                            }}
                          >
                            {pkg.description}
                          </p>

                          {/* Rating and Category */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#FFBA00] text-[#FFBA00]" />
                              <span
                                className="text-[#1a1a1a]"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 700,
                                }}
                              >
                                {pkg.rating}
                              </span>
                            </div>
                            <span
                              className="text-[#666666]"
                              style={{
                                fontSize: "11px",
                                fontWeight: 400,
                              }}
                            >
                              ({pkg.category})
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <span
                              className="text-[#FFBA00] whitespace-nowrap"
                              style={{
                                fontSize: "20px",
                                fontWeight: 700,
                                letterSpacing: "-0.5px",
                              }}
                            >
                              {pkg.price}
                            </span>
                            {pkg.originalPrice && (
                              <>
                                <span
                                  className="text-[#999999] line-through whitespace-nowrap"
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 400,
                                  }}
                                >
                                  {pkg.originalPrice}
                                </span>
                                <Badge
                                  className="bg-[#10B981] hover:bg-[#10B981] text-white px-1.5 py-0.5 rounded"
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: 700,
                                  }}
                                >
                                  {pkg.discount}
                                </Badge>
                              </>
                            )}
                          </div>

                          {/* Includes */}
                          <div className="mb-3 flex-1">
                            <p
                              className="text-[#1a1a1a] mb-1.5"
                              style={{
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              Includes:
                            </p>
                            <div className="space-y-0.5">
                              {pkg.includes.slice(0, 2).map((item, idx) => (
                                <div key={idx} className="flex items-start gap-1.5">
                                  <span
                                    className="text-[#1a1a1a] mt-0.5"
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: 400,
                                    }}
                                  >
                                    •
                                  </span>
                                  <span
                                    className="text-[#1a1a1a] flex-1"
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: 400,
                                      lineHeight: "1.3",
                                    }}
                                  >
                                    {item}
                                    {idx === 1 && pkg.includes.length > 2 && (
                                      <span className="text-[#666666] ml-1">......</span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* View Packages Button */}
                          <Button
                            className="w-full bg-[#0C3B2E] hover:bg-[#0a3228] text-white rounded-lg h-[33px]"
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onPackageSelect && onPackageSelect(pkg.vendorId, pkg.id);
                            }}
                          >
                            View Packages
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Slider>
              </div>
            </div>
          </div>

          {/* Limited Time Offers */}
          {secondaryPromotions.length > 0 && (
            <div className="mb-5">
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes boxOpen {
                  0%, 20% { transform: scale(1) rotateX(0deg); }
                  30% { transform: scale(1.05) rotateX(-10deg); }
                  40% { transform: scale(1) rotateX(0deg); }
                  100% { transform: scale(1) rotateX(0deg); }
                }
                @keyframes celebrate {
                  0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
                  20% { opacity: 1; }
                  100% { transform: var(--celebration-end) scale(1.5) rotate(360deg); opacity: 0; }
                }
                .box-animation { animation: boxOpen 3s ease-in-out infinite; }
                .celebration { animation: celebrate 2s ease-out infinite; }
                
                .secondary-promotions-carousel {
                  height: auto !important;
                }
                .secondary-promotions-carousel .slick-list {
                  margin: 0 !important;
                  padding: 0 !important;
                }
                .secondary-promotions-carousel .slick-track {
                  display: flex !important;
                  align-items: flex-start !important;
                  margin: 0 !important;
                }
                .secondary-promotions-carousel .slick-slide {
                  height: auto !important;
                  margin: 0 !important;
                }
                .secondary-promotions-carousel .slick-slide > div {
                  height: 100% !important;
                  margin: 0 !important;
                }
                .secondary-promotions-carousel .slick-dots {
                  margin: 0 !important;
                  padding: 0 !important;
                  bottom: -25px !important;
                  position: relative !important;
                }
                .secondary-promotions-carousel .slick-dots li button {
                  background: #D1D5DB;
                }
                .secondary-promotions-carousel .slick-dots li.slick-active button {
                  background: #FFBA00;
                }
              ` }} />
              <div className="relative overflow-visible px-5">
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  arrows={false}
                  autoplay={true}
                  autoplaySpeed={4000}
                  initialSlide={0}
                  centerMode={false}
                  className="secondary-promotions-carousel"
                  dotsClass="slick-dots custom-dots"
                >
                  {secondaryPromotions.map((promo) => (
                    <div key={promo.id}>
                      <div 
                        className="bg-gradient-to-br from-[#FFD166] to-[#FFA940] rounded-[20px] p-5 relative overflow-visible cursor-pointer hover:shadow-lg transition-shadow h-[180px] flex flex-col"
                          onClick={() => onPackageSelect?.(promo.vendorId, undefined, promo.id)}
                        >
                          <div className="absolute bottom-4 right-4 opacity-20 box-animation">
                            <Package
                              className="w-20 h-20 text-white"
                              strokeWidth={1.5}
                            />
                          </div>
                          
                          {/* Celebration sparkles */}
                          <div className="absolute bottom-14 right-14 celebration" style={{ '--celebration-end': 'translate(-40px, -60px)', animationDelay: '1s' } as React.CSSProperties}>
                            <Sparkles className="w-6 h-6 text-white fill-white" />
                          </div>
                          <div className="absolute bottom-14 right-14 celebration" style={{ '--celebration-end': 'translate(40px, -60px)', animationDelay: '1.1s' } as React.CSSProperties}>
                            <Sparkles className="w-5 h-5 text-white fill-white" />
                          </div>
                          <div className="absolute bottom-14 right-14 celebration" style={{ '--celebration-end': 'translate(0px, -70px)', animationDelay: '1.2s' } as React.CSSProperties}>
                            <Sparkles className="w-4 h-4 text-white fill-white" />
                          </div>
                          <div className="absolute bottom-14 right-14 celebration" style={{ '--celebration-end': 'translate(-60px, -30px)', animationDelay: '1.15s' } as React.CSSProperties}>
                            <Star className="w-5 h-5 text-white fill-white" />
                          </div>
                          <div className="absolute bottom-14 right-14 celebration" style={{ '--celebration-end': 'translate(60px, -30px)', animationDelay: '1.25s' } as React.CSSProperties}>
                            <Star className="w-4 h-4 text-white fill-white" />
                          </div>
                          
                          <div className="relative z-10 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-6 h-6 text-white fill-white animate-pulse flex-shrink-0" style={{ animationDuration: '1.5s' }} />
                              <h3
                                className="text-white whitespace-nowrap overflow-hidden text-ellipsis"
                                style={{
                                  fontSize: "22px",
                                  fontWeight: 700,
                                }}
                              >
                                {promo.title}
                              </h3>
                            </div>
                            <p
                              className="text-white mb-3 leading-relaxed flex-1 line-clamp-2"
                              style={{ fontSize: "15px", fontWeight: 400 }}
                            >
                              {promo.description}
                            </p>
                            <div>
                              <Button
                                className="bg-white/90 backdrop-blur-md hover:bg-white text-[#1a1a1a] rounded-xl px-6 py-2 shadow-md border border-white/50 hover:scale-105 transition-transform"
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                View Offer
                              </Button>
                            </div>
                          </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}

          {/* Vendors You May Like */}
          <div className="mb-5 px-5 mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Vendors You May Like
              </h3>
              <button
                className="text-[#5A8A6E] hover:text-[#4A7A5E] transition-colors"
                style={{ fontSize: "14px", fontWeight: 500 }}
                onClick={() => onNavigate("vendor")}
              >
                View Vendors
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-5 pr-5">
              {vendorsYouMayLike.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-all"
                  style={{
                    width: "calc((100vw - 64px) / 1.47)",
                  }}
                  onClick={() => {
                    if (onVendorSelect) {
                      onVendorSelect(vendor.id);
                    } else {
                      onNavigate("vendor-detail");
                    }
                  }}
                >
                  <div className="h-[135px] relative rounded-[9px] overflow-hidden mb-2">
                    <ImageWithFallback
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4
                      className="text-[#1a1a1a]"
                      style={{
                        fontSize: "15.75px",
                        fontWeight: 600,
                        lineHeight: "1.2",
                      }}
                    >
                      {vendor.name}
                    </h4>
                    <p
                      className="text-[#666666] mb-1"
                      style={{
                        fontSize: "11.25px",
                        fontWeight: 400,
                        lineHeight: "1.2",
                      }}
                    >
                      Starting Packages from
                    </p>
                    <Badge
                      className="bg-[#FFBA00] hover:bg-[#FFBA00] text-[#1a1a1a] px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "12.75px",
                        fontWeight: 700,
                      }}
                    >
                      {vendor.price}+
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendors For You */}
          <div className="mb-5 px-5">
            <div className="mb-3">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Vendors For You
              </h3>
            </div>
            <div className="space-y-3">
              {vendorsForYou.map((vendor) => (
                <div
                  key={vendor.id}
                  className="rounded-[20px] overflow-hidden cursor-pointer hover:opacity-95 transition-all relative h-[180px]"
                  onClick={() => onNavigate("vendor-detail")}
                >
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Logo - Top Left */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/80 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center shadow-md overflow-hidden border border-white/50">
                      <ImageWithFallback
                        src={vendor.logo}
                        alt="Vendor logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Rating - Top Right */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full px-2 py-1 border border-white/50">
                    <Star className="w-3.5 h-3.5 fill-[#FFBA00] text-[#FFBA00]" />
                    <span
                      className="text-[#1a1a1a]"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      {vendor.rating}
                    </span>
                  </div>
                  
                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <h4
                      className="text-white mb-0.5"
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "1.2",
                      }}
                    >
                      {vendor.name}
                    </h4>
                    <p
                      className="text-white/90 mb-1.5"
                      style={{
                        fontSize: "11px",
                        fontWeight: 400,
                        lineHeight: "1.2",
                      }}
                    >
                      Starting Packages from
                    </p>
                    <Badge
                      className="bg-[#FFBA00] hover:bg-[#FFBA00] text-[#1a1a1a] px-2.5 py-0.5 rounded-md"
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {vendor.price}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Tips & Inspiration */}
          <div className="mb-5 px-5">
            <div className="mb-3">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Event Tips & Inspiration
              </h3>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-5 pr-5">
              {([
                {
                  id: "1",
                  title: "10 Must-Have Shots",
                  subtitle: "Photography Guide",
                  image: "https://images.unsplash.com/photo-1760669343328-d84fbde15b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGxhbm5pbmclMjB0aXBzfGVufDF8fHx8MTc2MTYyNTA2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  color: "#0C3B2E",
                  category: "Photography",
                  description: "Capture every precious moment of your special day with these essential photography tips. Learn which shots are absolutely must-haves to preserve your memories forever.",
                  tips: [
                    {
                      title: "The First Look",
                      description: "Capture the genuine emotion when the couple sees each other for the first time. This intimate moment creates some of the most heartfelt photos of the day."
                    },
                    {
                      title: "Detail Shots",
                      description: "Don't forget the rings, invitations, flowers, and decorations. These details tell the complete story of your carefully planned event."
                    },
                    {
                      title: "Candid Moments",
                      description: "The best photos often happen naturally. Capture guests laughing, dancing, and enjoying themselves throughout the celebration."
                    },
                    {
                      title: "Group Photos",
                      description: "Organize family and friend group shots early. Create a shot list and assign someone to gather people efficiently."
                    },
                    {
                      title: "Venue Shots",
                      description: "Document your beautiful venue from multiple angles during golden hour for the most stunning lighting and atmosphere."
                    }
                  ]
                },
                {
                  id: "2",
                  title: "Budget Planning",
                  subtitle: "Save Smart",
                  image: "https://images.unsplash.com/photo-1679599441412-5e42d65e6c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMGFuZCUyMGdyb29tJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYxNjI1MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  color: "#6D9773",
                  category: "Budget",
                  description: "Planning an amazing event doesn't have to break the bank. Discover smart strategies to maximize your budget while still creating the celebration of your dreams.",
                  tips: [
                    {
                      title: "Set Priorities Early",
                      description: "Identify your top 3 must-haves and allocate more budget there. This ensures you don't compromise on what matters most to you."
                    },
                    {
                      title: "Off-Peak Savings",
                      description: "Consider weekday events or off-season dates for significant venue and vendor discounts, sometimes up to 40% savings."
                    },
                    {
                      title: "DIY Smartly",
                      description: "Choose DIY projects that save money without causing stress. Focus on simple items like favors or welcome signs."
                    },
                    {
                      title: "Negotiate Packages",
                      description: "Bundle services with vendors for better rates. Many offer package deals when you book multiple services together."
                    },
                    {
                      title: "Track Every Expense",
                      description: "Use a detailed spreadsheet or app to monitor spending in real-time. This prevents budget creep and surprises."
                    }
                  ]
                },
                {
                  id: "3",
                  title: "Venue Selection",
                  subtitle: "Perfect Location",
                  image: "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MTYwODI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  color: "#B46617",
                  category: "Venue",
                  description: "Your venue sets the tone for your entire event. Learn how to choose the perfect location that matches your vision, budget, and guest count.",
                  tips: [
                    {
                      title: "Visit in Person",
                      description: "Always tour venues in person. Photos can be deceiving - check lighting, acoustics, and overall atmosphere yourself."
                    },
                    {
                      title: "Consider Guest Experience",
                      description: "Think about parking, accessibility, and accommodation options nearby. Your guests' comfort should be a priority."
                    },
                    {
                      title: "Check What's Included",
                      description: "Ask about tables, chairs, linens, and setup/cleanup. Venues that include these can save thousands in rental costs."
                    },
                    {
                      title: "Weather Backup Plan",
                      description: "For outdoor venues, ensure there's an indoor alternative or covered space in case of unexpected weather."
                    },
                    {
                      title: "Read the Contract",
                      description: "Carefully review cancellation policies, overtime fees, and vendor restrictions before signing any agreements."
                    }
                  ]
                },
                {
                  id: "4",
                  title: "Timeline Tips",
                  subtitle: "Planning Schedule",
                  image: "https://images.unsplash.com/photo-1549620936-aa6278062ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwcGFydHl8ZW58MXx8fHwxNzYxNTQ3NTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  color: "#FFBA00",
                  category: "Planning",
                  description: "Stay organized and stress-free with a well-planned timeline. Discover the ideal schedule for booking vendors and completing tasks before your big day.",
                  tips: [
                    {
                      title: "12+ Months Out",
                      description: "Book venue and key vendors (photographer, caterer). Popular vendors get booked 12-18 months in advance."
                    },
                    {
                      title: "9-11 Months Out",
                      description: "Order invitations, book entertainment, and finalize your guest list. This gives you time for custom designs."
                    },
                    {
                      title: "6-8 Months Out",
                      description: "Schedule dress fittings, plan ceremony details, and arrange accommodations for out-of-town guests."
                    },
                    {
                      title: "3-5 Months Out",
                      description: "Finalize menu, create seating chart, and order favors. Start addressing invitations for mailing."
                    },
                    {
                      title: "Final Month",
                      description: "Confirm all vendor details, create day-of timeline, and delegate tasks to your wedding party or coordinator."
                    }
                  ]
                },
              ] as TipData[]).map((tip) => (
                <div
                  key={tip.id}
                  onClick={() => onTipSelect(tip)}
                  className="flex-shrink-0 w-[160px] cursor-pointer hover:opacity-90 transition-all"
                >
                  <div className="h-[200px] relative rounded-[16px] overflow-hidden mb-2">
                    <ImageWithFallback
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4
                        className="text-white"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "1.3",
                        }}
                      >
                        {tip.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spotlight Events */}
          <div className="mb-5 px-5">
            <div className="mb-3">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Spotlight Events
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {([
                {
                  id: "1",
                  eventTitle: "Sarah & Michael",
                  eventType: "Garden Wedding",
                  image: "https://images.unsplash.com/photo-1712081617446-bed6b816a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NjE1NjU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  date: "May 15, 2024",
                  location: "Botanical Gardens, Colombo",
                  guestCount: "150",
                  description: "A beautiful garden wedding surrounded by lush greenery and blooming flowers. Sarah and Michael wanted an intimate outdoor celebration that reflected their love for nature.",
                  story: "We met at a hiking trip five years ago and instantly connected over our love for the outdoors. When it came time to plan our wedding, we knew we wanted something that reflected our passion for nature. The botanical gardens provided the perfect backdrop for our special day.",
                  highlights: [
                    {
                      title: "Outdoor Ceremony",
                      description: "The ceremony took place under a stunning floral arch with the garden as a natural backdrop."
                    },
                    {
                      title: "Farm-to-Table Reception",
                      description: "Locally sourced organic menu with seasonal vegetables and herbs from nearby farms."
                    },
                    {
                      title: "Live Acoustic Music",
                      description: "A talented acoustic duo played throughout the ceremony and cocktail hour."
                    }
                  ],
                  vendors: [
                    { category: "Photography", name: "Great Photography" },
                    { category: "Catering", name: "Green Feast Catering" },
                    { category: "Florist", name: "Bloom & Petal" },
                    { category: "Music", name: "Acoustic Duo Live" }
                  ],
                  gallery: [
                    "https://images.unsplash.com/photo-1712081617446-bed6b816a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NjE1NjU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB3ZWRkaW5nJTIwZGVjb3J8ZW58MXx8fHwxNzYxNjI1MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc2MTYyNTA3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2MTYyNTA3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  ]
                },
                {
                  id: "2",
                  eventTitle: "Priya's 30th Birthday",
                  eventType: "Birthday Party",
                  image: "https://images.unsplash.com/photo-1650584997985-e713a869ee77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYxNTY5Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  date: "September 5, 2024",
                  location: "Rooftop Garden, Galle Face Hotel",
                  guestCount: "80",
                  description: "An elegant rooftop birthday celebration with stunning city views. Priya celebrated her milestone 30th birthday surrounded by friends and family in style.",
                  story: "I wanted to mark this milestone with something special and memorable. The rooftop venue with its breathtaking views of the ocean and city skyline created the perfect ambiance for an unforgettable night.",
                  highlights: [
                    {
                      title: "Champagne Welcome",
                      description: "Guests were greeted with champagne and canapés as they arrived at sunset."
                    },
                    {
                      title: "DJ & Dancing",
                      description: "Professional DJ kept the energy high with a perfect mix of classic hits and current favorites."
                    },
                    {
                      title: "Custom Cake Design",
                      description: "A stunning three-tier custom cake featuring gold accents and fresh flowers."
                    }
                  ],
                  vendors: [
                    { category: "Photography", name: "Moments Photography" },
                    { category: "Catering", name: "Gourmet Delights" },
                    { category: "DJ", name: "Beats & Vibes" },
                    { category: "Bakery", name: "Sweet Creations" }
                  ],
                  gallery: [
                    "https://images.unsplash.com/photo-1650584997985-e713a869ee77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYxNTY5Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjE2MjY5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGRlY29yYXRpb24lMjBldmVudHxlbnwxfHx8fDE3NjE2MjY5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzYxNjI2OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  ]
                },
                {
                  id: "3",
                  eventTitle: "Tech Summit 2024",
                  eventType: "Corporate Event",
                  image: "https://images.unsplash.com/photo-1550305080-4e029753abcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYxNTU5MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  date: "October 12, 2024",
                  location: "Hilton Conference Center, Colombo",
                  guestCount: "300",
                  description: "A prestigious annual technology conference bringing together industry leaders, innovators, and professionals. The summit featured keynote speakers, panel discussions, and networking opportunities.",
                  story: "This year's Tech Summit was designed to inspire innovation and collaboration. We created an environment where ideas could flourish and connections could be made that would shape the future of technology in our region.",
                  highlights: [
                    {
                      title: "Keynote Speakers",
                      description: "Five international tech leaders shared insights on AI, blockchain, and digital transformation."
                    },
                    {
                      title: "Interactive Workshops",
                      description: "Hands-on sessions covering the latest tools and technologies in software development."
                    },
                    {
                      title: "Networking Lounge",
                      description: "Dedicated space with refreshments for attendees to connect and collaborate."
                    }
                  ],
                  vendors: [
                    { category: "AV Production", name: "ProStage Solutions" },
                    { category: "Catering", name: "Corporate Cuisine" },
                    { category: "Photography", name: "Event Lens Pro" },
                    { category: "Branding", name: "Creative Studios" }
                  ],
                  gallery: [
                    "https://images.unsplash.com/photo-1550305080-4e029753abcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYxNTU5MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2MTYyNjkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ldHdvcmtpbmd8ZW58MXx8fHwxNzYxNjI2OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMHNldHVwfGVufDF8fHx8MTc2MTYyNjkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  ]
                },
                {
                  id: "4",
                  eventTitle: "Amal's Graduation",
                  eventType: "Graduation Celebration",
                  image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjE2MjY5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  date: "November 18, 2024",
                  location: "Garden Pavilion, University of Colombo",
                  guestCount: "120",
                  description: "A joyful graduation celebration honoring Amal's achievement of completing his medical degree. Family and friends gathered to celebrate this momentous milestone.",
                  story: "After six years of hard work and dedication, I wanted to celebrate this achievement with everyone who supported me along the way. It was important to create a memorable event that reflected both the accomplishment and gratitude I felt.",
                  highlights: [
                    {
                      title: "Photo Booth Experience",
                      description: "Custom graduation-themed photo booth with props and instant prints for guests."
                    },
                    {
                      title: "Memory Wall",
                      description: "A display showcasing photos and moments from the university journey."
                    },
                    {
                      title: "Buffet Dinner",
                      description: "Diverse menu catering to all tastes with family favorites and international cuisine."
                    }
                  ],
                  vendors: [
                    { category: "Photography", name: "Milestone Memories" },
                    { category: "Catering", name: "Feast & Co." },
                    { category: "Decoration", name: "Celebration Designs" },
                    { category: "Entertainment", name: "Party Sounds DJ" }
                  ],
                  gallery: [
                    "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjE2MjY5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYxNjI2OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwcGFydHl8ZW58MXx8fHwxNzYxNjI2OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwZmFtaWx5fGVufDF8fHx8MTc2MTYyNjkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  ]
                },
              ] as EventData[]).map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventSelect(event)}
                  className="relative h-[180px] rounded-[16px] overflow-hidden cursor-pointer hover:opacity-95 transition-all"
                >
                  <ImageWithFallback
                    src={event.image}
                    alt={event.eventTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4
                      className="text-white"
                      style={{ fontSize: "14px", fontWeight: 600 }}
                    >
                      {event.eventTitle}
                    </h4>
                    <p
                      className="text-white/90"
                      style={{ fontSize: "11px", fontWeight: 400 }}
                    >
                      {event.eventType}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Heart className="w-5 h-5 text-white fill-white/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Happy Couples - Testimonials */}
          <div className="mb-5 px-5">
            <div className="mb-3">
              <h3
                className="text-[#1a1a1a]"
                style={{ fontSize: "20.7px", fontWeight: 500 }}
              >
                Happy Customers
              </h3>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-5 pr-5">
              {[
                {
                  id: "1",
                  name: "Jennifer & Mark",
                  review: "EventCore made our dream wedding come true! The vendors were professional and the platform was so easy to use.",
                  rating: 5,
                  image: "https://images.unsplash.com/photo-1610112839947-5664d10bab30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU4NjAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                },
                {
                  id: "2",
                  name: "Sophie & Alex",
                  review: "Best decision ever! Found amazing photographers and decorators all in one place. Highly recommend!",
                  rating: 5,
                  image: "https://images.unsplash.com/photo-1712081617446-bed6b816a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NjE1NjU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                },
                {
                  id: "3",
                  name: "Rachel & Tom",
                  review: "Planning our wedding was stress-free thanks to EventCore. Everything we needed in one beautiful app!",
                  rating: 5,
                  image: "https://images.unsplash.com/photo-1679599441412-5e42d65e6c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMGFuZCUyMGdyb29tJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYxNjI1MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-[280px] bg-white rounded-[16px] p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-[#1a1a1a]"
                        style={{ fontSize: "14px", fontWeight: 600 }}
                      >
                        {testimonial.name}
                      </h4>
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-[#FFBA00] text-[#FFBA00]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-[#666666]"
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      lineHeight: "1.5",
                    }}
                  >
                    "{testimonial.review}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="mb-8 px-5">
            <div className="relative h-[220px] rounded-[20px] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MTYwODI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Start planning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/95 via-[#0C3B2E]/70 to-transparent" />
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                style={{
                  backgroundImage: `url(${ctaBackground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <h2
                  className="text-white mb-3"
                  style={{ fontSize: "26px", fontWeight: 700 }}
                >
                  Start Planning Your<br />Next Event
                </h2>
                <p
                  className="text-white/90 mb-6"
                  style={{ fontSize: "14px", fontWeight: 400 }}
                >
                  Connect with top-rated vendors and create unforgettable memories
                </p>
                <Button
                  onClick={() => onNavigate("events")}
                  className="bg-[#FFBA00] hover:bg-[#E6A800] text-[#1a1a1a] px-8 py-2.5 rounded-full shadow-lg"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  Create Event
                </Button>
              </div>
            </div>
          </div>

          {/* Glassy Heart Floating Action Button */}
          <GlassyHeartButton onNavigate={onNavigate} />

        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
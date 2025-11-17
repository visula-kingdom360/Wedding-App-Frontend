# 💍 EventCore Complete Wedding App - Figma AI Specification

## 🎯 Overview
**EventCore** is a comprehensive wedding planning platform with three distinct user interfaces: Customer, Merchant, and Admin. Each role has dedicated functionality with a unified **Forest Green** design system optimized for both mobile and desktop experiences.

---

## 🌿 Global Design System

### **Color Palette (Wedding Theme)**
| Role              | Hex Code  | Usage                                    |
|-------------------|-----------|------------------------------------------|
| **Primary**       | `#0C3B2E` | Forest Green - CTAs, navigation, headers |
| **Secondary**     | `#6D9773` | Sage Green - backgrounds, secondary buttons |
| **Accent 1**      | `#B46617` | Bronze Brown - pricing, metadata, highlights |
| **Accent 2**      | `#FFBA00` | Gold Yellow - ratings, featured badges |
| **Neutral Light** | `#FFFFFF` | Card backgrounds, content areas |
| **Neutral Dark**  | `#222222` | Text, icons, form inputs |

### **Typography System**
- **Font Family**: Sans-serif, modern, rounded edges
- **Hierarchy**: H1(24px/bold), H2(20px/medium), H3(18px/medium), Body(16px/normal)
- **Line Height**: 1.5 for all text elements

### **Layout Standards**
- **Border Radius**: 12-16px (rounded-xl, rounded-2xl)
- **Spacing**: 16px base unit (p-4, m-4, space-y-4)
- **Shadows**: Soft drop shadow `0 4px 6px rgba(0,0,0,0.1)`
- **Cards**: White background, subtle gray border, rounded corners

### **Responsive Breakpoints**
- **Mobile**: < 768px (Bottom navigation, single column)
- **Tablet**: 768px - 1023px (Hybrid navigation)
- **Desktop**: ≥ 1024px (Sidebar navigation, multi-column)

---

## 📱 Customer Journey (11 Screens)

### **Navigation Structure**
**Mobile**: 5-tab bottom navigation
**Desktop**: Collapsible sidebar navigation

```
Home | Vendors | My Events | Notifications | Categories
```

### **1. Entry/Login Screen**
**Purpose**: Welcome and authentication entry point

**Layout**:
- **App Logo**: EventCore branding with tagline
- **Hero Section**: Wedding-themed background image with overlay
- **CTA Buttons**: 
  - Primary: "Continue as Guest" (Forest Green)
  - Secondary: "Login" (outlined)
- **Bottom Link**: "Create Account" text link

**Elements**: Logo, hero image, 2 buttons, signup link

---

### **2. Customer Home Dashboard**
**Purpose**: Main discovery hub for vendors and services

**Header**:
- **Greeting**: "Hi [Name], Good morning" 
- **Profile Icon**: Circular avatar (top-right)

**Content Sections**:
1. **Search Bar**: Rounded search input "Search vendors, venues, services"
2. **Promotional Banner**: Gradient card with wedding offers image
3. **Popular Categories**: Horizontal scroll of 6 category cards (Photography, Decoration, etc.)
4. **For You Section**: Horizontal scroll of vendor cards with "Featured" badges
5. **Popular Packages**: Horizontal scroll of package cards with pricing/savings
6. **Special Offers**: Gradient promotional card with CTA
7. **Featured Vendors**: Vertical list of vendor cards with ratings

**Components**: SearchBar, CategoryCard, VendorCard, PackageCard, PromotionalBanner

---

### **3. Categories Grid**
**Purpose**: Service category discovery

**Header**: "Hi [Name], Good morning" + profile icon

**Content**:
- **Main Grid**: 2x3 grid of category cards
  - Each card: Icon, category name, vendor count
  - Colors: Forest Green, Sage Green, Bronze Brown backgrounds
- **Popular Services**: List cards showing trending services with pricing

**Components**: CategoryCard (6 categories), ServiceCard (3 popular)

---

### **4. Vendor Browse/Listing**
**Purpose**: Filtered vendor discovery with search

**Header**: Greeting + profile icon

**Features**:
- **Search Bar**: Large rounded input with search icon
- **Filter Pills**: Price, Location, Event Type (horizontal scroll)
- **Featured Section**: Top-rated vendors with "Featured" badges
- **All Vendors**: Scrollable list with vendor cards

**Components**: SearchBar, FilterChips, VendorCard (list layout)

---

### **5. Vendor Detail Screen**
**Purpose**: Complete vendor profile with packages

**Layout**:
- **Header Banner**: Vendor cover image with back button
- **Vendor Info**: Name, rating, description, location
- **Contact Section**: Call, WhatsApp, Email, Social links buttons
- **Add to Event**: Primary CTA button
- **Packages Section**: Scrollable list of service packages

**Components**: VendorHeader, ContactButtons, PackageCard

---

### **6. Package Detail Screen**
**Purpose**: Service package breakdown and booking

**Content**:
- **Package Header**: Name, pricing, vendor info
- **Rating**: Star display with review count
- **Description**: Detailed service description
- **Includes List**: Bullet-point feature list
- **CTA Section**: "Save to Event", "Contact Vendor" buttons

**Components**: PackageHeader, ServiceList, ActionButtons

---

### **7. Notifications**
**Purpose**: Updates, offers, and platform announcements

**Header**: Greeting + profile icon

**Content**:
- **Notification Cards**: Title, description, time, category badge
- **Visual Icons**: Different icons for offers, announcements, tips
- **Featured Vendors**: Bottom section with vendor recommendations
- **Guest CTA**: Account creation prompt for non-logged users

**Components**: NotificationCard, FeaturedSection, GuestPrompt

---

### **8. My Events**
**Purpose**: Event planning and management

**Layout**:
- **Tab Navigation**: "Current Events" | "Past Events"
- **Event Cards**: Title, date, location, status, progress
- **Add Event**: Floating action button
- **Empty State**: Create first event prompt

**Components**: TabNavigation, EventCard, FloatingActionButton

---

### **9. Event Management Detail**
**Purpose**: Comprehensive event planning tools

**Header**: Event name and details

**Sections**:
- **Event Info**: Date, location, budget, guest count
- **Vendor Management**: Added vendors with package details
- **Task Manager**: To-do list with pending/completed tabs
- **Budget Tracker**: Spent vs. allocated budget visualization

**Components**: EventHeader, VendorList, TaskList, BudgetTracker

---

### **10. New Event Creation**
**Purpose**: Event setup and initial planning

**Form Fields**:
- **Event Details**: Name, type, description, date, location
- **Budget Toggle**: Flexible vs. Fixed budget options
- **Category Selection**: Suggested vendor categories with pricing
- **CTA**: "Create Event" primary button

**Components**: FormFields, BudgetToggle, CategorySuggestions

---

### **11. Customer Profile**
**Purpose**: Account management and preferences

**Content**:
- **Profile Header**: Avatar, name, progress bar
- **Progress Display**: "6 out of 9 Events Completed"
- **Menu Options**:
  - My Events
  - My Subscriptions  
  - Help & Support
  - About Us
  - Privacy Policy

**Components**: ProfileHeader, ProgressBar, MenuList

---

## 🏪 Merchant Journey (7 Screens)

### **Navigation Structure**
**Mobile**: 5-tab bottom navigation
**Desktop**: Professional sidebar navigation

```
Dashboard | Packages | Calendar | Notifications | Reviews
```

### **1. Merchant Dashboard**
**Purpose**: Business operations central hub

**Header**: "Hi [Merchant Name], Good morning" + profile icon

**Sections**:
1. **Performance Summary**: 
   - Enquiry breakdown (WhatsApp, Calls, Emails, Location)
   - Profile views and social interactions
2. **Quick Stats**: Total profile views, packages, promotions (3-column grid)
3. **Quick Actions**: 
   - "Add New Package" (with package icon)
   - "View Notifications" (with bell icon)
4. **Quick Access**: Profile and Reviews shortcuts (2-column grid)
5. **Top Packages**: Performance cards showing enquiries, ratings, status
6. **Recent Activity**: Latest bookings, payments, reviews

**Components**: StatCard, QuickActionCard, PackagePerformanceCard, ActivityFeed

---

### **2. Package Management**
**Purpose**: Service package creation and management

**Header**: "My Packages" with active package count badge

**Features**:
- **Package List**: Cards showing title, description, price, category
- **Status Indicators**: Active, Draft, Paused badges
- **Performance Metrics**: Enquiry count and last updated
- **Actions**: Edit/Delete dropdown menus
- **Floating Add Button**: Create new package CTA

**Components**: PackageCard, StatusBadge, DropdownMenu, FloatingActionButton

---

### **3. Package Details (Create/Edit)**
**Purpose**: Package configuration and setup

**Form Sections**:
1. **Package Information**: Name, category, price
2. **Services & Details**: Description, included services
3. **Image Upload**: Drag-and-drop image upload area
4. **CTA Buttons**: "Save Package" / "Cancel"

**Components**: FormSections, ImageUploader, ActionButtons

---

### **4. Calendar Management**
**Purpose**: Availability and booking scheduling

**Layout**:
- **Monthly Calendar**: Grid view with date highlighting
- **Booking Indicators**: Available, booked, blocked dates
- **Add Availability**: Primary CTA button
- **Legend**: Color-coded availability status

**Components**: CalendarGrid, DateIndicators, AvailabilityControls

---

### **5. Merchant Notifications**
**Purpose**: Business alerts and customer communications

**Header**: Greeting + unread count + filter options

**Stats Section**:
- **Unread Count**: Red notification icon with number
- **Urgent Alerts**: High-priority notification count

**Notification Types**:
1. **Booking Requests**: Customer details, package info, action required
2. **Payments**: Confirmation with amount and customer
3. **Reviews**: Star ratings with customer feedback preview
4. **Inquiries**: Customer contact via WhatsApp/email/phone
5. **System**: Milestones, achievements, platform updates
6. **Promotions**: Seasonal offer suggestions

**Tabs**: All | Unread | Action Required | Bookings

**Components**: NotificationStats, NotificationCard, TabNavigation, ActionButtons

---

### **6. Reviews Management**
**Purpose**: Customer feedback and reputation management

**Header**: Greeting + filter options

**Summary Section**:
- **Average Rating**: Large number display with star
- **Total Reviews**: Count with "Excellent" badge

**Review Cards**:
- **Customer Info**: Name, package, verification badge
- **Review Content**: Title, rating, detailed feedback
- **Interaction**: Reply button, helpful count
- **Metadata**: Date, package name, verified status

**Components**: ReviewSummary, ReviewCard, InteractionButtons

---

### **7. Merchant Profile**
**Purpose**: Business profile and account management

**Header**: Greeting + profile editing capability

**Profile Header Card**:
- **Cover Photo**: Gradient background (editable)
- **Business Logo**: Circular with edit button overlay
- **Business Info**: Name, category, rating, verification badge
- **Quick Stats**: Bookings, profile views, packages (3-column)

**Tab Navigation**: Profile | Business | Settings

**Profile Tab**:
- **Personal Info**: Business name, owner, description (editable)
- **Contact Info**: Phone, email, address, website with icons

**Business Tab**:
- **Business Details**: Category, experience, team size, member since
- **Services**: Comprehensive service list
- **Social Media**: Instagram, Facebook links with icons

**Settings Tab**:
- **Account Settings**: General, notifications, privacy, payments
- **Account Actions**: Export data, deactivate account

**Components**: ProfileHeader, EditableFields, ContactInfo, TabNavigation, SettingsMenu

---

## 👑 Admin Dashboard (6 Screens)

### **Navigation Structure**
**Desktop Only**: Professional sidebar navigation

```
Dashboard | Merchants | Products | Events | Promotions | Subscriptions
```

### **Admin Features**
- **Platform Overview**: System-wide statistics and metrics
- **Merchant Management**: Vendor approval, monitoring, support
- **Product Oversight**: Package approval, pricing management
- **Event Tracking**: Platform usage, booking analytics
- **Promotion Tools**: Campaign creation, deal management
- **Subscription Handling**: Payment processing, plan management

**Components**: AdminSidebar, StatsDashboard, ManagementTables, AnalyticsCharts

---

## 🧩 Shared Component Library

### **Navigation Components**
- **ResponsiveNavigation**: Device-adaptive navigation system
- **BottomNavigation**: Mobile 5-tab navigation
- **SidebarNavigation**: Desktop professional sidebar
- **TopBar**: Header with greeting, search, profile

### **Card Components**
- **VendorCard**: Vendor display with rating, pricing, actions
- **PackageCard**: Service package with pricing, features, CTAs
- **CategoryCard**: Service category with icon, count
- **EventCard**: Event info with date, status, progress
- **NotificationCard**: Alert display with actions, metadata

### **Form Components**
- **FormField**: Labeled input with validation
- **SearchBar**: Rounded search input with icon
- **FilterField**: Dropdown filter selection
- **ImageUploader**: Drag-and-drop file upload

### **UI Components**
- **StatCard**: Metric display with icon, value, growth
- **Badge**: Status indicator with color coding
- **ActionButton**: CTA buttons with consistent styling
- **ProgressBar**: Visual progress indicator

### **Layout Components**
- **ResponsiveLayout**: Adaptive layout wrapper
- **DashboardGrid**: Responsive grid system
- **TabNavigation**: Multi-tab interface
- **FloatingActionButton**: Primary action trigger

---

## 📱 Responsive Design Specifications

### **Mobile Experience (< 768px)**
- **Navigation**: Fixed bottom 5-tab bar
- **Layout**: Single column, full width
- **Touch Targets**: Minimum 44px for interactive elements
- **Typography**: Base 16px, scaled for readability
- **Cards**: Full width with 16px side margins

### **Desktop Experience (≥ 1024px)**
- **Navigation**: 256px collapsible sidebar
- **Layout**: Multi-column grids, optimized spacing
- **Content Area**: Offset by sidebar width (ml-64)
- **Typography**: Enhanced hierarchy with larger headers
- **Cards**: Grid layouts with hover states

### **Interaction States**
- **Hover**: Subtle shadow increase, color shifts
- **Active**: Color deepening, scale reduction
- **Focus**: Forest Green ring, accessibility compliance
- **Loading**: Skeleton states, progress indicators

---

## 🎨 Implementation Guidelines

### **Color Usage Patterns**
```css
Primary Actions: bg-forest-green-500 hover:bg-forest-green-600
Secondary Actions: bg-sage-green-500 hover:bg-sage-green-600
Accent Elements: bg-bronze-brown-500, text-gold-yellow-500
Status Indicators: 
  - Success: bg-forest-green-100 text-forest-green-700
  - Warning: bg-gold-yellow-100 text-gold-yellow-700
  - Error: bg-red-100 text-red-700
```

### **Spacing System**
```css
Container Padding: px-4 (16px)
Section Spacing: space-y-6 (24px)
Card Padding: p-4 (16px)
Grid Gaps: gap-4 (16px)
Bottom Navigation Clearance: pb-20 (80px)
```

### **Border Radius Standards**
```css
Buttons: rounded-lg (8px)
Cards: rounded-xl (12px) or rounded-2xl (16px)  
Input Fields: rounded-xl (12px)
Images: rounded-lg (8px)
Avatars: rounded-full
```

### **Icon Guidelines**
- **Library**: Lucide React icons
- **Sizes**: w-4 h-4 (16px), w-5 h-5 (20px), w-6 h-6 (24px)
- **Colors**: Contextual (Forest Green for primary, muted for secondary)

---

## 🔗 Component Relationships

### **Data Flow Architecture**
```
App.tsx
├── AuthScreen (Login/Signup/Role Selection)
├── CustomerApp 
│   ├── ResponsiveLayout
│   └── All Customer Screens
├── MerchantApp
│   ├── ResponsiveLayout  
│   └── All Merchant Screens
└── AdminApp
    ├── ResponsiveLayout
    └── All Admin Screens
```

### **Shared State Management**
- **User Context**: Authentication, role, profile data
- **Navigation State**: Current screen, navigation history
- **Notification State**: Unread counts, alerts
- **Theme Context**: Color mode, responsive breakpoints

---

## 🚀 Figma Implementation Notes

### **Auto Layout Setup**
- Use Figma Auto Layout for all card components
- Set proper constraints for responsive behavior
- Implement consistent spacing with 8px grid system

### **Component Variants**
- Create variants for different device sizes
- Include hover/active states for interactive elements
- Maintain consistent naming convention

### **Design Tokens**
- Set up color styles with exact hex values
- Create text styles for typography hierarchy
- Define effect styles for shadows and borders

### **Responsive Frames**
- Mobile: 375px width (iPhone standard)
- Desktop: 1440px width (standard desktop)
- Create tablet breakpoint at 768px

---

## 📋 Screen Priority Implementation Order

### **Phase 1 - Core Customer Flow**
1. Entry/Login Screen
2. Customer Home Dashboard  
3. Vendor Browse
4. Vendor Detail
5. Categories Grid

### **Phase 2 - Merchant Essential**
1. Merchant Dashboard
2. Package Management
3. Merchant Notifications
4. Merchant Profile

### **Phase 3 - Extended Features**
1. Event Management
2. Reviews System
3. Calendar Integration
4. Admin Dashboard

---

**Total Implementation**: 18 unique screens + responsive navigation + shared component library

This specification provides complete implementation guidance for Figma AI to generate a pixel-perfect EventCore wedding platform with consistent branding, professional UI/UX, and comprehensive functionality across all user roles.
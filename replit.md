# Business Landing Page

## Overview

This is a modern full-stack web application built with React/TypeScript frontend and Express.js backend. The project features a professional business landing page with a purple gradient design theme, built using shadcn/ui components and Tailwind CSS for styling. The architecture supports both development and production environments with Vite for build tooling and Drizzle ORM for database management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system variables
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **State Management**: TanStack Query for server state management
- **UI Pattern**: Component-driven architecture with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Storage**: Pluggable storage interface with in-memory implementation for development
- **Session Management**: Prepared for PostgreSQL session storage with connect-pg-simple

### Key Design Decisions

**Frontend Choices:**
- Chose Vite over Create React App for faster development builds and better TypeScript support
- Selected shadcn/ui for consistent, accessible components while maintaining customization flexibility
- Implemented Wouter instead of React Router for smaller bundle size and simpler API
- Used TanStack Query for robust server state management with caching and error handling

**Backend Choices:**
- Adopted Express.js for its simplicity and extensive ecosystem
- Implemented Drizzle ORM for type-safe database operations with better performance than traditional ORMs
- Used pluggable storage pattern to support both development (in-memory) and production (PostgreSQL) environments
- Structured routes with /api prefix for clear API organization

## Key Components

### Frontend Components
- **Layout System**: Responsive navigation with mobile menu support and scroll-based visibility
- **UI Components**: Complete shadcn/ui component library including forms, dialogs, and data display
- **Pages**: Home landing page with business-focused content and Not Found page
- **Hooks**: Custom hooks for mobile detection and toast notifications

### Backend Components
- **Route Handler**: Centralized route registration system
- **Storage Interface**: Abstract storage layer supporting CRUD operations for users
- **Development Tools**: Vite integration for hot module replacement and development server
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Database Schema
- **Users Table**: Basic user entity with username/password authentication
- **Migrations**: Drizzle migrations system for schema versioning
- **Type Safety**: Generated TypeScript types from database schema

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Persistence**: Storage interface abstracts database operations via Drizzle ORM
4. **Response Handling**: Structured JSON responses with proper error handling
5. **State Updates**: TanStack Query manages cache invalidation and UI updates

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Validation**: Zod for runtime type validation and schema validation
- **Date Handling**: date-fns for date manipulation utilities

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **ORM Tooling**: Drizzle Kit for migration management and schema introspection
- **Development Server**: Express with Vite middleware for seamless development experience

## Deployment Strategy

### Build Process
- **Frontend Build**: Vite builds React application to `dist/public`
- **Backend Build**: esbuild compiles Express server to `dist/index.js`
- **Database Setup**: Drizzle migrations apply schema changes to production database

### Environment Configuration
- **Development**: Uses in-memory storage and Vite development server
- **Production**: Requires DATABASE_URL environment variable for PostgreSQL connection
- **Static Assets**: Express serves built frontend assets in production mode

### Production Considerations
- Application expects PostgreSQL database connection via DATABASE_URL
- Static files served from dist/public directory
- API routes prefixed with /api for clear separation
- Error handling configured for production environment safety

## Recent Changes

### January 25, 2025 - Interface Update with 3D Rocket & Layout Redesign
- Successfully integrated new 3D rocket image (purple, white, and blue design with glowing effects)
- Redesigned hero section with two-column layout matching reference design
- Updated main heading to "Boost Your Website Traffic Instantly" 
- Repositioned rocket image to right side with proper scaling and hover effects
- Applied 28-degree rotation to rocket for dynamic launch appearance
- Added statistics section with "50K+ Active Users", "2M+ Hits Generated", "99.9% Uptime"
- Changed button text to "Start Free Trial" and "View Demo" for better traffic exchange branding
- Removed trust indicators section for cleaner layout without duplicated elements
- Enhanced visual effects with purple glow around rocket and floating particles
- Fixed consistent padding across all sections (navbar to footer)
- Applied max-w-7xl container with responsive padding for proper alignment
- Updated login page Remember Me checkbox to modern violet toggle switch with smooth animations
- Added gradient background and shadow effects to toggle switch for enhanced visual appeal
- Reduced rocket background glow size (scale-75, blur-2xl) for more subtle effect
- Updated dashboard card icons to simple purple containers with rounded corners
- Applied consistent purple-600 background color to all stat card icons
- Enhanced icons with subtle shadow effects and white icons inside containers
- Added comprehensive interactive hover effects to dashboard cards with scale and color transitions
- Improved button designs with gradient overlays and rotation effects
- Enhanced home page feature cards with cursor pointer, rotation, and shadow effects
- Added smooth transitions and micro-animations throughout the interface
- Maintained responsive design for mobile and desktop layouts
- All animations and transitions working smoothly with professional polish

### January 25, 2025 - Project Migration Complete & UI Issue Fixes
- Successfully completed project migration from Replit Agent to standard Replit environment
- Fixed rocket icon positioning on login page - rotated 45 degrees with offset positioning for dynamic launch appearance
- Fixed home page rocket image - maintained 30-degree rotation, removed excessive bounce animation, positioned lower
- All packages and dependencies properly installed and configured
- Application running smoothly on port 5000 with full functionality
- MongoDB connection working correctly with real-time API calls
- API endpoints operational for login, campaigns, and user management
- Frontend-backend separation maintained with proper security practices
- All migration checklist items completed successfully
- Fixed black box issue in dashboard form Input field by applying explicit white background styling
- All UI components now displaying correctly with proper styling

### January 25, 2025 - Environment Migration & UI Color Enhancement
- Successfully completed project migration from Replit Agent to standard Replit environment
- Fixed navbar sticky positioning by changing from `sticky` to `fixed` positioning
- Ensured navbar remains visible during scroll with proper z-index and backdrop blur
- Added top margin to main content to prevent overlap with fixed navbar
- Enhanced campaign button colors for better visual consistency:
  - Active campaigns: Orange-to-red gradient for pause action (warning color)
  - Inactive campaigns: Violet-to-purple gradient for run action (brand color)
  - Improved hover effect overlay from 20% to 30% opacity
- All features tested and working correctly in new environment:
  - Campaign management system fully functional
  - User authentication and session management working
  - Real-time API calls and data updates confirmed
  - Traffic generation system operational

### January 23, 2025 - Migration Complete & UI Improvements
- Successfully completed project migration from Replit Agent to standard Replit environment
- Fixed run button functionality by implementing handleRunCampaign and handlePauseCampaign functions with proper API integration
- Updated Remember Me feature from checkbox to modern toggle switch using shadcn/ui Switch component
- Changed progress bar colors from gray to violet gradient for better visual consistency
- Replaced campaign run/pause buttons with toggle switches matching Remember Me design
- Updated color scheme to use violet and white theme as requested, reducing color complexity
- All campaign management features now fully functional:
  - Create new campaigns
  - Start/run inactive campaigns using toggle switches
  - Pause active campaigns using toggle switches  
  - Delete campaigns
  - Real-time progress tracking with violet progress bars
- Backend API endpoints working correctly with authentication
- Traffic generation system integrated with campaign controls
- UI now uses consistent violet theme throughout with white backgrounds

### January 23, 2025 - Professional Dashboard Redesign
- Successfully completed migration from Replit Agent to standard Replit environment
- Resolved all dependency and port configuration issues
- Verified full application functionality in new environment
- Complete dashboard redesign to match professional traffic exchange style:
  - Updated navbar to transparent white background matching reference design
  - Added dynamic username display from login session
  - Replaced all transparent cards with colorful gradient cards:
    - Pink to purple gradient for Hits Available
    - Green to emerald gradient for Hits Received  
    - Blue to indigo gradient for Domains
    - Orange to red gradient for Links
    - Teal to cyan gradient for Referrals
    - Violet to purple gradient for Active Sessions
  - Updated navigation links to match professional layout
  - Form elements now use white backgrounds with purple accents
  - Campaign cards use light gray backgrounds for better readability
  - Maintained beautiful animated background elements
- All features working with modern colorful design system

### January 23, 2025 - Complete Dashboard Redesign & Modern Traffic Exchange Interface
- Updated navigation logo from image to text-based "SkyHit" branding with Rocket icon
- Applied consistent gradient styling across all pages
- Enhanced all pages (login, home, dashboard) with beautiful animated background elements
- Added floating orbs, grid patterns, and animated particles for immersive experience
- Completely redesigned dashboard as professional traffic exchange platform:
  - Traffic Statistics section with 6 stat cards
  - Campaign Launch Center with modern form controls and gradient launch button
  - Campaign Control Panel with real-time campaign management
  - Professional navigation with SkyHit branding and user controls
- Created rounded design language (rounded-xl) for modern aesthetic
- Added real-time campaign tracking and progress visualization
- Enhanced user experience with hover effects and smooth transitions

### January 20, 2025 - Dashboard Redesign with Landing Page Theme
- Successfully migrated project from Replit Agent to Replit environment
- Fixed port conflicts and dependency issues
- Verified full application functionality 
- Redesigned dashboard to match main landing page aesthetic
- Applied same purple gradient background and glassmorphism effects
- Created "SKYHIT" branded navigation matching home page
- Removed all fake data - only real user activity displayed
- Built traffic control center with actual website management
- Implemented real-time status tracking based on user actions
- Added glassmorphism cards with white transparency effects
- Created clean website add/remove functionality
- Enhanced with rounded buttons and professional styling matching main page
- All packages installed and working correctly
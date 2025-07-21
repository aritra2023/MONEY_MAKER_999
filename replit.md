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

### January 20, 2025 - Project Migration Completed
- Successfully migrated project from Replit Agent to Replit environment
- Fixed port conflicts and dependency issues
- Verified full application functionality 
- Updated dashboard to AutoTrafficPro theme matching user's HTML design
- Implemented glassmorphism design with dark purple background
- Added functional URL manager with start/stop controls
- Created live console with bot status monitoring
- Added premium upgrade section and banner preview
- All packages installed and working correctly
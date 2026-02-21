# Replit.md

## Overview

This is a modern single-page web application called **"The Karma Compass"** for collecting and displaying user feedback. Users can submit feedback through a form (name, email, message) and see all community feedback displayed as cards below, sorted newest first. The app uses a React frontend with a Node.js/Express backend and PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming, custom astrology-inspired color scheme (teal, gold, cream)
- **Animations**: Framer Motion for card entrance animations
- **Icons**: Lucide React
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend
- **Runtime**: Node.js with TypeScript (via tsx)
- **Framework**: Express 5
- **API Pattern**: Simple REST API with two endpoints:
  - `GET /api/feedback` — returns all feedback sorted newest first
  - `POST /api/feedback` — creates new feedback entry with Zod validation
- **Shared Route Definitions**: API routes, input schemas, and response schemas are defined in `shared/routes.ts` and used by both client and server for type safety

### Data Layer
- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema**: Single `feedback` table with fields: `id` (serial), `name` (text), `email` (text), `message` (text), `createdAt` (timestamp)
- **Schema Location**: `shared/schema.ts` — shared between client and server
- **Migrations**: Use `npm run db:push` (drizzle-kit push) to sync schema to database

### Storage Pattern
- **Interface-based**: `IStorage` interface in `server/storage.ts` defines data access methods
- **Implementation**: `DatabaseStorage` class implements the interface using Drizzle ORM
- **Singleton export**: `storage` instance exported for use in routes

### Build & Development
- **Dev**: `npm run dev` — runs Express server with Vite middleware for HMR
- **Build**: `npm run build` — Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Production**: `npm run start` — serves built assets via Express static middleware
- **Type Check**: `npm run check` — runs TypeScript compiler

### Key Design Decisions
1. **Shared schema and route definitions** between client and server ensure type safety end-to-end without code generation
2. **Drizzle ORM** chosen for lightweight, TypeScript-first database access with schema-driven validation via drizzle-zod
3. **Single server** serves both the API and the frontend (Vite dev server in development, static files in production)
4. **No authentication** — this is a public feedback collection app

## External Dependencies

- **PostgreSQL Database**: Required. Connection string must be provided via `DATABASE_URL` environment variable. Used with `pg` (node-postgres) driver and `connect-pg-simple` for potential session storage
- **Google Fonts**: Inter and Poppins fonts loaded via CDN in `index.css`, plus additional fonts in `index.html`
- **Replit Plugins** (dev only): `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` — conditionally loaded in non-production Replit environments
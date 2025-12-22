# Neo Snake OS

## Overview

A retro-themed Snake arcade game built as a full-stack web application. Players control a snake to collect food and compete for high scores on a global leaderboard. The game features a neon cyberpunk aesthetic with CRT scanline effects and arcade-style typography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom retro arcade theme (neon green, dark backgrounds, sharp corners)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth modal and UI transitions
- **Build Tool**: Vite with React plugin and custom Replit development plugins

### Backend Architecture
- **Framework**: Express.js running on Node.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Server Structure**: Single entry point (`server/index.ts`) with route registration and static file serving

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM for type-safe database queries
- **Schema Location**: `shared/schema.ts` defines all database tables
- **Migrations**: Drizzle Kit for schema push (`npm run db:push`)

### Project Structure
- `/client` - React frontend application
- `/server` - Express backend server
- `/shared` - Shared code between frontend and backend (schemas, route definitions, types)
- `/migrations` - Database migration files

### Key Design Patterns
- **Shared Schema**: Database schemas and API input/output types are defined once in `/shared` and used by both frontend and backend
- **Type-Safe API**: Zod schemas validate API inputs on the server and parse responses on the client
- **Monorepo Structure**: Single repository with co-located frontend and backend code
- **Path Aliases**: `@/` for client source, `@shared/` for shared code

### Development vs Production
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Vite builds static assets to `dist/public`, Express serves them

## External Dependencies

### Database
- **PostgreSQL**: Required. Connection via `DATABASE_URL` environment variable
- **Session Storage**: `connect-pg-simple` for PostgreSQL-backed sessions (available but not currently implemented)

### Key npm Packages
- `drizzle-orm` + `drizzle-zod` - Database ORM and schema validation
- `@tanstack/react-query` - Async state management
- `framer-motion` - Animation library
- `wouter` - Client-side routing
- Radix UI primitives - Accessible UI components
- `zod` - Runtime type validation

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
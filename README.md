# E-Commerce SaaS Platform

A modern multi-tenant e-commerce SaaS platform with plugin marketplace, built with React, Next.js, and NestJS.

## Features

- **Multi-tenant Architecture** - Schema-per-tenant PostgreSQL isolation
- **Plugin Marketplace** - Extensible plugin system with sandboxing
- **Dark Theme UI** - Modern glass-morphism design
- **Responsive Design** - Mobile-first approach
- **E2E Tested** - 27 Playwright tests passing

## Apps

| App | Port | Description |
|-----|------|-------------|
| Storefront | 3000 | Next.js e-commerce storefront |
| Admin Panel | 3001 | React store management dashboard |
| Plugin Portal | 3002 | Plugin marketplace |
| API Gateway | 4000 | NestJS API gateway |
| Core Service | 4001 | Products, orders, cart |
| Tenant Service | 4002 | Multi-tenant management |
| Plugin Service | 4003 | Plugin lifecycle |

## Tech Stack

- **Frontend**: React 18, Next.js 14, Tailwind CSS
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Event Bus**: Redis pub/sub
- **Testing**: Playwright

## Quick Start

```bash
# Install dependencies
pnpm install

# Start all services
pnpm dev

# Run tests
pnpm --filter storefront exec playwright test
```

## Screenshots

### Storefront (Dark Theme)
- Homepage with hero section
- Product listings with filters
- Category pages
- Shopping cart
- Multi-step checkout
- Order tracking

### Admin Panel (Dark Theme)
- Dashboard with analytics
- Product management
- Order management
- Customer management
- Plugin management
- Settings

### Plugin Portal (Dark Theme)
- Marketplace browse
- Plugin details
- Developer dashboard
- Plugin submission

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Frontend Apps                       │
├─────────────┬─────────────┬─────────────────────────┤
│ Storefront  │ Admin Panel │    Plugin Portal        │
│ (Next.js)   │  (React)    │      (React)           │
│  :3000      │   :3001     │       :3002            │
└──────┬──────┴──────┬──────┴───────────┬───────────┘
       │             │                  │
       └─────────────┼──────────────────┘
                     │
              ┌──────▼──────┐
              │ API Gateway │
              │   :4000     │
              └──────┬──────┘
                     │
       ┌─────────────┼─────────────┐
       │             │             │
┌──────▼──────┐ ┌───▼───┐ ┌───────▼───────┐
│Core Service │ │Plugin │ │Tenant Service │
│   :4001     │ │:4003  │ │    :4002      │
└─────────────┘ └───────┘ └───────────────┘
```

## Authors

- [rdvankck](https://github.com/rdvankck)


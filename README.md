# Beverage Ordering Platform

A modern web application for browsing, customizing, and ordering beverages (coffee, tea, smoothies, etc.). This project provides a responsive React frontend (built with Vite) and a backend API (separate service) to manage products, orders, and users. It is designed for small cafes or beverage shops that want an online ordering flow with a clear admin and customer experience.

Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development Setup](#development-setup)
  - [Environment Variables](#environment-variables)
  - [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Project Overview

Beverage Ordering Platform is an end-to-end application that enables customers to:
- Browse a catalog of beverages with images, descriptions, and prices.
- Customize items (size, add-ons, sugar level, extras).
- Add items to a cart, place orders, and track order status.
- Authenticate with an account to view order history and save preferences.

For shop owners/admins, the platform supports:
- Product management (create/read/update/delete items).
- Order management and status updates.
- Basic analytics (orders by day, best-sellers) — extendable.

This repository contains the frontend application (React + Vite). The backend API and database are expected to be run separately (links and examples provided below).

## Key Features

- Responsive UI for mobile and desktop
- Product catalog with categories and filters
- Product customization (size, extras, custom notes)
- Shopping cart with quantity management and subtotal calculation
- Checkout with address input and basic validation
- User authentication (login / signup)
- Order history and status tracking
- Admin pages for product & order management (if role is admin)
- Extensible design to integrate payments and delivery providers

## Architecture

- Frontend: React app (SPA) using Vite for fast development and builds.
- Backend: RESTful API (or GraphQL) — manages authentication, products, and orders.
- Database: Relational (Postgres) or document (MongoDB) depending on backend implementation.
- Optional: Payment provider integration (Stripe, PayPal) and push/real-time order updates (WebSocket or server-sent events).

High level flow:
1. Customer browses catalog on frontend.
2. Frontend queries backend API for products and user data.
3. Customer customizes item, adds to cart, and submits order.
4. Backend creates order, notifies admin/kitchen (email, webhook, or real-time channel).
5. Order status changes are pushed to the frontend.

## Tech Stack

- Frontend
  - React (functional components + hooks)
  - Vite (dev server + build)
  - React Router (routing)
  - State management: React Context / Redux / Zustand (configurable)
  - Styling: CSS Modules / Tailwind / Styled Components (project choice)
  - Linting: ESLint, Prettier
- Backend (suggestions)
  - Node.js + Express / Fastify, or any language/framework you prefer
  - Database: PostgreSQL / MongoDB
  - Authentication: JWT or session-based
- Optional
  - Docker for containerization
  - CI/CD: GitHub Actions
  - Payment: Stripe
  - Real-time: WebSocket / Socket.io

## Screenshots

Add screenshots here (replace with actual images):
- Public catalog
- Product detail with customization
- Cart and checkout
- Admin product list

Example:
![Catalog screenshot](docs/screenshots/catalog.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js >= 18 (recommended)
- npm or yarn
- Git
- (Optional) Docker & Docker Compose if running the backend/database containers

### Development Setup (Frontend)

1. Clone the repository
```bash
git clone https://github.com/Premanth/beverage-ordering-platform.git
cd beverage-ordering-platform
```

2. Install dependencies
```bash
# using npm
npm install

# or using yarn
yarn
```

3. Create environment config
- Copy `.env.example` to `.env` (if `.env.example` exists) and update variables. See [Environment Variables](#environment-variables).

4. Start the dev server
```bash
npm run dev
# or
yarn dev
```

The site should be available at http://localhost:5173 (Vite default). API calls will target the backend URL configured in environment variables.

### Environment Variables

Create a `.env` file at the project root. Typical variables:

- VITE_API_BASE_URL=http://localhost:4000/api
- VITE_STRIPE_PUBLIC_KEY=pk_test_...
- VITE_SENTRY_DSN=...
- NODE_ENV=development

Note: Vite requires env variables used in the client to be prefixed with VITE_.

### Available Scripts

- `npm run dev` — Start Vite dev server with HMR.
- `npm run build` — Build production-ready files into the `dist/` folder.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint.
- `npm run format` — Run Prettier formatting.
- `npm test` — Run frontend test suite (if tests added).

## Testing

Add unit and integration tests for UI components and utilities. Example frameworks:
- Jest + React Testing Library for unit tests.
- Playwright / Cypress for end-to-end testing.

Example:
```bash
npm run test
# or for e2e (Cypress)
npx cypress open
```

## Deployment

The built frontend in `dist/` can be served from any static hosting provider:
- Vercel, Netlify, GitHub Pages, or a static file server behind Nginx.

General steps:
1. Build: `npm run build`
2. Deploy `dist/` to your hosting provider.
3. Configure environment variables on host (VITE_API_BASE_URL etc.)
4. Ensure CORS is configured on backend to allow the frontend origin.

For Docker:
- Create a simple Nginx container that serves the `dist/` folder.

CI/CD:
- Add GitHub Actions workflow to build and deploy on push to main or via pull requests.

## Contributing

Contributions are welcome! Steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make changes and add tests.
4. Run lint and tests: `npm run lint && npm test`
5. Open a pull request with a clear description of the changes.

Please follow the existing code style and commit message conventions (Conventional Commits recommended).

## License

This project is provided under the MIT License — see the LICENSE file for details.

## Contact

Project maintained by Premanth (GitHub: [Premanth](https://github.com/Premanth)).

For support or questions, open an issue in this repository.

## Acknowledgements

- Vite React template
- Any UI libraries or icon sets you use (Tailwind CSS, Material UI, Font Awesome, etc.)
- Contributors and community projects that inspired this platform

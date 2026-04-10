# It's A Coffee Shop - Frontend

A modern, high-performance **Coffee Shop Frontend** application built with **Next.js 15 (App Router)** and **TypeScript**. This project serves as a customer-facing portal for browsing coffee menus, customizing orders with granular preferences, and managing a digital checkout flow.

## ☕ Project Overview

This application is designed to provide a seamless ordering experience. It integrates with a **.NET API** backend and employs a sophisticated **Service Layer** architecture that allows for instant switching between live production data and local mock environments.

---

## 🚀 Key Features

- **Dynamic Menu & Search**: Browse products by category with debounced search and server-side pagination.
- **Granular Customization**: Detailed drink configuration including:
  - **Sugar Levels**: (e.g., No Sugar, Normal, Extra).
  - **Ice Levels**: (e.g., No Ice, Normal, Extra).
  - **Coffee Strength**: Specialized levels with dynamic pricing.
  - **Special Instructions**: Custom text notes for baristas (max 200 chars).
- **Hybrid Cart System**:
  - Persistent local cart (LocalStorage).
  - Intelligent backend synchronization (detects changes via hashing to minimize API calls).
  - Support for **Dine-in** and **Takeaway** order types with a dedicated selector.
- **Real-time Checkout & Payment**:
  - Order creation and multi-step updates.
  - **KHQR Payment Simulation**: Real-time status polling with interactive feedback and success/failure states.
- **Visual Polish**: Built with Tailwind CSS 4 and Shadcn UI components for a premium look and feel.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing for API DTOs)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest) (Server state) & React Context (UI state)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **API Client**: [Axios](https://axios-http.com/) with request/response interceptors
- **Icons & Feedback**: [Lucide React](https://lucide.dev/) & [Sonner](https://sonner.stevenlu.com/)

---

## 🏗 Project Architecture

The application follows a modular architecture to ensure separation of concerns and maintainability:

1.  **UI Layer (`/src/components`)**: Pure and logic-heavy React components.
2.  **Hook Layer (`/src/hooks`)**: Encapsulates React Query logic and polling mechanisms.
3.  **Service Layer (`/src/service`)**: The "Brain" of the data flow. It decides whether to fetch from the **API Layer** or the **Mock Layer** based on environment variables.
4.  **API Layer (`/src/api`)**: Low-level Axios implementations targeting the .NET backend.
5.  **Mock Layer (`/src/mock`)**: Realistic data simulations for development without a running backend.

---

## 📂 Folder Structure Overview

```text
src/
├── api/          # Axios implementations for each domain
├── app/          # Next.js App Router (Pages, Layouts, Routes)
├── components/   # UI components (ui/, pages/, and shared)
├── contexts/     # Global React Contexts (e.g., CartContext)
├── hooks/        # Custom hooks and React Query implementations
├── lib/          # Utilities like axios instance and tailwind-merge
├── mock/         # Local mock data and service simulations
├── providers/    # Global context providers (ReactQueryProvider)
├── service/      # Switching layer between mock and real API
├── types/        # TypeScript interfaces (api/ matching backend DTOs)
└── utils/        # Shared helper functions (Cart hashing, building payloads)
```

---

## 🔧 Installation & Setup

### 1. Prerequisites

- **Node.js**: 20.x or later
- **Package Manager**: npm or pnpm

### 2. Installation

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api
NEXT_PUBLIC_USE_MOCK=true  # Set to 'false' to connect to live backend
NEXT_PUBLIC_IS_DEVELOPMENT=true
```

---

## 💻 Running the Project

### Development Mode

Starts the server with Turbopack for fast HMR.

```bash
npm run dev
```

### Production Build

Runs linting, formatting, and builds the production-ready bundle.

```bash
npm run build
npm run start
```

### Quality Control

```bash
npm run lint    # Runs ESLint checks
npm run format  # Formats code using Prettier
```

---

## 🔌 API Integration Overview

- **Versioning**: All requests automatically include the header/param `api-version=2026-01-01` via Axios interceptors.
- **DTO Safety**: Types in `src/types/api` are mapped exactly to the .NET backend DTOs to ensure runtime consistency.
- **Cart Syncing**: During the checkout transition, the application compares a local `cartHash` with the existing backend order to decide between an `updateOrder (PUT)` or simply viewing the existing checkout.

---

## 📝 Development Notes

- **Mock Switch**: Toggle `NEXT_PUBLIC_USE_MOCK` in your `.env` to work completely offline with the data in `src/mock/`.
- **Hooks Safety**: All API hooks are designed with the "Rules of Hooks" in mind. Avoid calling `useLookups` or `useCart` inside conditional returns.
- **State Hydration**: The cart and payment QR data are hydrated from `localStorage` to ensure users don't lose their progress on page refreshes.

---

## 🔮 Future Improvements

<!-- - **Optimistic UI**: Implement optimistic updates for cart quantity changes to provide zero-latency feedback.
- **Order Tracking**: Expand the success screen into a real-time order status tracker (Pending -> Preparing -> Ready). -->

- **Internationalization**: Add i18n support for Khmer and English languages.

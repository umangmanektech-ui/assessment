# Product Catalog Management System

A responsive, client-side product catalog web application built with React 19, TypeScript, Vite, Tailwind CSS v4, Zustand 5, and React Hook Form with Yup schema validation. The application provides an administrative workflow for browsing, searching, filtering, adding, editing, and deleting products with persistent storage in the browser.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework & Runtime** | React 19, TypeScript 5.9, Vite 8 |
| **Routing** | React Router v7 |
| **State Management** | Zustand 5 with `persist` middleware |
| **Forms & Validation** | React Hook Form 7, Yup 1.7, `@hookform/resolvers` |
| **Styling & Icons** | Tailwind CSS v4, Lucide React |
| **Feedback & Notifications** | Sonner |
| **Image Processing** | HTML5 Canvas API (client-side compression) |

---

## Key Features

### Product Catalog & Browsing
- **Responsive Card Grid**: Displays product cards with image previews, category tags, pricing, stock indicators, and direct action triggers.
- **Out of Stock Highlighting**: Automatically marks items with zero stock using clear badges.
- **Search & Filtering (In-Memory)**:
  - Real-time text search across product names and descriptions.
  - Category filtering across available categories (`Electronics`, `Clothing`, `Home`, `Other`).
  - Multi-option sorting by Newest, Oldest, Price: Low to High, and Price: High to Low.
  - Quick filter reset action when results are empty or filtered.
  - Filter and search parameters are intentionally kept in component memory state to avoid polluting persistent storage.

### Product Management (CRUD)
- **Unified Product Form**: A single, robust form component reused for both creating (`/products/new`) and updating (`/products/:id/edit`) products.
- **Detailed Product View**: Dedicated page (`/products/:id`) displaying full product metadata, pricing, stock counts, creation timestamps, and actions.
- **Deletion with Sonner Toast**: Interactive toast notification with inline confirmation action to prevent accidental deletions.
- **Success Feedback**: Clear toast feedback for successful creation, modification, and deletion operations.

### Image Upload & Compression
- Drag-and-drop or file selector supporting JPEG, JPG, and PNG formats.
- Client-side validation enforcing a 500 KB file size limit and valid MIME types.
- Automatic image downscaling and canvas compression (max 800x800, JPEG quality 0.85) to reduce Base64 payload size and conserve `localStorage` quota.
- Live image preview with replace and remove controls.

### Validation & Error Handling
- Schema validation via Yup enforcing:
  - Product Name: Required, trimmed, minimum 3 characters.
  - Category: Required selection from predefined categories.
  - Price: Required, positive number, decimal support.
  - Stock: Required, whole non-negative integer.
  - Description: Optional, maximum 200 characters with live character counter.
  - Product Image: Required Base64 string.
- HTML5 constraint validation disabled (`noValidate`) in favor of accessible, inline Yup field errors.

---

## Architecture & State Strategy

The application enforces a clear separation of concerns:

1. **Persistent Catalog State (`src/store/useProductStore.ts`)**:
   - Manages the core product entity collection (`Product[]`).
   - Uses Zustand's `persist` middleware with a custom storage adapter.
   - Synchronously reads from `localStorage` on initial load to prevent hydration flashes or missing product errors on direct route navigations.
   - Handles legacy JSON array formats seamlessly alongside Zustand's standard `{ state: { products } }` schema.
   - Safeguards against browser `QuotaExceededError` exceptions during writes.

2. **Ephemeral UI State (`src/hooks/useProductCatalog.ts`)**:
   - Manages search queries, category filters, and active sort preferences using React `useState`.
   - Derives filtered and sorted product lists with `useMemo` for optimal render performance.

3. **Form Logic & Lifecycle (`src/hooks/useProductForm.ts`)**:
   - Encapsulates React Hook Form configuration, image upload handling, and submission logic.
   - Uses a reference guard (`lastLoadedIdRef`) to ensure initial product data populates once upon entering edit mode without overwriting in-flight user edits on store re-renders.

---

## Project Structure

```
product-catalog/
├── public/
├── src/
│   ├── assets/              # Static assets and icons
│   ├── components/
│   │   ├── catalog/         # Catalog UI (ProductCard, ProductFilters, EmptyState)
│   │   ├── common/          # Shared layout components (Navbar)
│   │   └── form/            # Form controls (ProductForm, ImageUpload)
│   ├── hooks/
│   │   ├── useProductCatalog.ts   # Catalog search, filter, and sorting logic
│   │   └── useProductForm.ts      # Product form state, image processing, and submit logic
│   ├── pages/
│   │   ├── AddProductPage.tsx     # Route: /products/new
│   │   ├── EditProductPage.tsx    # Route: /products/:id/edit
│   │   ├── NotFoundPage.tsx       # Route: * (404 handler)
│   │   ├── ProductDetailPage.tsx  # Route: /products/:id
│   │   └── ProductListPage.tsx    # Route: / and /products
│   ├── schemas/
│   │   └── productSchema.ts       # Yup validation rules and types
│   ├── store/
│   │   └── useProductStore.ts     # Zustand persistent catalog store
│   ├── types/
│   │   └── product.ts             # Domain contracts, categories, and sort types
│   ├── utils/
│   │   ├── formatters.ts          # Currency and date formatters
│   │   └── imageUtils.ts          # Client-side image validation and canvas compression
│   ├── App.tsx                    # Route definitions and application shell
│   ├── index.css                  # Tailwind CSS imports and root styles
│   └── main.tsx                   # Application bootstrap
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Route Overview

| Path | Component | Description |
|---|---|---|
| `/` | `ProductListPage` | Redirects / displays product catalog |
| `/products` | `ProductListPage` | Main catalog grid with search and filters |
| `/products/new` | `AddProductPage` | Form for adding a new product |
| `/products/:id` | `ProductDetailPage` | Product details, stock status, and actions |
| `/products/:id/edit` | `EditProductPage` | Form for updating an existing product |
| `*` | `NotFoundPage` | Catch-all 404 page with navigation back to catalog |

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation

```bash
git clone <repository-url>
cd product-catalog
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

Type check and bundle the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Code Quality & Linting

Run ESLint across the codebase:

```bash
npm run lint
```

---

## LocalStorage & Persistence Notes

- **Storage Key**: Products are stored in browser `localStorage` under the key `products`.
- **Capacity Management**: Browsers typically limit `localStorage` to 5 MB per origin. To maximize available storage capacity, uploaded product images are validated to be under 500 KB and automatically compressed via canvas downscaling before conversion to Base64 data URLs.
- **Transient State**: Search queries, active filters, and sort options are kept in component memory to ensure a fresh catalog state on reload while keeping persisted storage clean and lightweight.

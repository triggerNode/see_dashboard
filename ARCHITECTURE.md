# {s}ee Dashboard Architecture

This document provides a comprehensive overview of the {s}ee Dashboard architecture, designed specifically for Roblox game development studios.

## 🏗️ System Overview

{s}ee is built as a modern single-page application (SPA) using React 19 with TypeScript, designed to handle complex financial calculations and real-time data visualization for game development studios.

### Core Design Principles

-   **Performance First**: Optimized for handling large datasets and real-time updates
-   **Type Safety**: Full TypeScript implementation for robust development
-   **Modularity**: Component-based architecture for easy maintenance and extension
-   **Accessibility**: WCAG 2.1 compliant design for inclusive user experience
-   **Scalability**: Architecture supports both indie developers and large studios

## 📱 Frontend Architecture

### Technology Stack

```
┌─────────────────────────────────────────┐
│              User Interface             │
│  React 19 + TypeScript + TailwindCSS   │
├─────────────────────────────────────────┤
│           State Management              │
│     Zustand + SWR + React Context      │
├─────────────────────────────────────────┤
│          Data Visualization             │
│    ApexCharts + D3.js + React Maps     │
├─────────────────────────────────────────┤
│           Build & Tooling               │
│      Vite + ESLint + Prettier          │
├─────────────────────────────────────────┤
│           Backend Service               │
│              Supabase                  │
└─────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── components/
│   ├── ui/                    # Base UI components (40+ components)
│   │   ├── Button/
│   │   ├── Table/
│   │   ├── Chart/
│   │   └── ...
│   ├── shared/                # Business logic components
│   │   ├── MetricCard/
│   │   ├── DataTable/
│   │   └── ...
│   ├── layouts/               # Layout components
│   │   ├── PostLoginLayout/
│   │   ├── AuthLayout/
│   │   └── ...
│   └── template/              # Template-specific components
│       ├── Navigation/
│       ├── Header/
│       └── ...
```

### State Management Strategy

#### 1. Global State (Zustand)

-   **Authentication state**: User session and permissions
-   **Theme preferences**: Dark/light mode, locale settings
-   **Route state**: Current navigation state

#### 2. Server State (SWR)

-   **API data caching**: Dashboard metrics and analytics
-   **Real-time updates**: Live transaction feeds
-   **Background revalidation**: Automatic data freshening

#### 3. Local State (React hooks)

-   **Component state**: Form inputs, UI interactions
-   **Temporary state**: Loading states, error handling

## 🎯 Business Logic Layer

### Financial Calculation Engine

The core of {s}ee's value proposition lies in its sophisticated financial calculations tailored for Roblox developers:

#### Net Profit Calculator

```typescript
interface ProfitCalculation {
    robuxRevenue: number // Total Robux earned
    devExRate: number // Current DevEx rate (USD per Robux)
    directUsdRevenue: number // Sponsorships, etc.
    robuxCosts: number // Robux-based expenses
    usdCosts: number // Direct USD costs
}

function calculateNetProfit(data: ProfitCalculation): number {
    const robuxUsdRevenue = data.robuxRevenue * data.devExRate
    const robuxUsdCosts = data.robuxCosts * data.devExRate

    return (
        robuxUsdRevenue + data.directUsdRevenue - robuxUsdCosts - data.usdCosts
    )
}
```

#### Revenue Attribution System

```typescript
interface RevenueSource {
    gamePass: number
    devProducts: number
    premiumPayouts: number
    directUsd: number
}

interface ProjectPnL {
    projectId: string
    directRevenue: RevenueSource
    allocatedCosts: number
    directCosts: number
    netProfit: number
}
```

### Metric Mapping System

The `metric_map.json` file defines how UI components map to business calculations:

```json
{
    "page": "/dashboards/ecommerce",
    "componentId": "Overview",
    "displayName": "Net Profit (USD)",
    "metric": "Net Profit",
    "formula": "([Total Robux Revenue] * [DevEx Rate]) + [Direct USD Revenue] - ([Total Robux Costs] * [DevEx Rate]) - [Total USD Costs]",
    "refreshFreq": "Daily",
    "priority": 1
}
```

## 📊 Data Flow Architecture

### Data Flow Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Roblox    │    │   External  │    │   Manual    │
│ Analytics   │───▶│     APIs    │◀───│    Input    │
│     API     │    │             │    │   Forms     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                    │                 │
       └────────────────────┼─────────────────┘
                            ▼
                  ┌─────────────────┐
                  │  Data Pipeline  │
                  │  (Mock/Supabase)│
                  └─────────────────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │   SWR Cache     │
                  │   Management    │
                  └─────────────────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │   Component     │
                  │   Rendering     │
                  └─────────────────┘
```

### Dual-Mode Data System

{s}ee implements a dual-mode data system that allows seamless switching between mock data and real data:

#### Mock Data System

For rapid development and testing without backend dependencies:

```typescript
// src/mock/data/dashboardData.ts
export const mockFinancialData = {
    netProfit: calculateNetProfit({
        robuxRevenue: 150000, // 150K Robux earned
        devExRate: 0.0035, // Current DevEx rate
        directUsdRevenue: 500, // Sponsorship income
        robuxCosts: 25000, // Marketing spend in Robux
        usdCosts: 200, // External costs
    }),
    // ... additional mock data
}
```

#### Supabase Integration

For production use with real data persistence:

```typescript
// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Example usage
export const fetchFinancialData = async (projectId: string) => {
    const { data, error } = await supabase
        .from('financial_metrics')
        .select('*')
        .eq('project_id', projectId)

    if (error) throw error
    return data
}
```

## 🎨 UI/UX Architecture

### Design System

{s}ee implements a comprehensive design system built on TailwindCSS:

#### Color Palette

```css
:root {
    /* Primary brand colors */
    --primary-500: #3b82f6; /* Main brand blue */
    --primary-600: #2563eb; /* Darker blue */

    /* Success/profit colors */
    --success-500: #10b981; /* Green for positive metrics */

    /* Warning/attention colors */
    --warning-500: #f59e0b; /* Orange for important metrics */

    /* Error/loss colors */
    --error-500: #ef4444; /* Red for negative metrics */
}
```

#### Typography Scale

```css
.text-xs {
    font-size: 0.75rem;
} /* 12px - Small labels */
.text-sm {
    font-size: 0.875rem;
} /* 14px - Body text */
.text-base {
    font-size: 1rem;
} /* 16px - Default */
.text-lg {
    font-size: 1.125rem;
} /* 18px - Headings */
.text-xl {
    font-size: 1.25rem;
} /* 20px - Large headings */
```

### Responsive Design Strategy

```css
/* Mobile-first approach */
.container {
    @apply px-4; /* Base mobile padding */

    @screen sm {
        /* 640px+ */
        @apply px-6;
    }

    @screen md {
        /* 768px+ */
        @apply px-8;
    }

    @screen lg {
        /* 1024px+ */
        @apply px-12 max-w-7xl mx-auto;
    }
}
```

### Accessibility Features

-   **Screen Reader Support**: Comprehensive ARIA labels and roles
-   **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
-   **Color Contrast**: WCAG 2.1 AA compliant color ratios
-   **Focus Management**: Clear focus indicators and logical tab order
-   **Reduced Motion**: Respects user's motion preferences

## 🔧 Development Architecture

### Build System (Vite)

```typescript
// vite.config.ts
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@services': path.resolve(__dirname, './src/services'),
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'zustand'],
    },
})
```

### Code Quality Tools

#### ESLint Configuration

```json
{
    "extends": [
        "@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jsx-a11y/alt-text": "error"
    }
}
```

#### TypeScript Configuration

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    }
}
```

## 🚀 Performance Optimization

### Code Splitting Strategy

```typescript
// Lazy loading for dashboard pages
const EcommerceDashboard = lazy(() => import('@/views/dashboards/EcommerceDashboard'));
const AnalyticDashboard = lazy(() => import('@/views/dashboards/AnalyticDashboard'));

// Route-based code splitting
const routes = [
  {
    path: '/dashboards/ecommerce',
    element: <Suspense fallback={<Loading />}><EcommerceDashboard /></Suspense>
  },
];
```

### Bundle Optimization

-   **Tree Shaking**: Eliminates unused code from final bundle
-   **Dynamic Imports**: Loads components only when needed
-   **Asset Optimization**: Images and fonts optimized for web delivery
-   **Caching Strategy**: Aggressive caching for static assets

### Memory Management

```typescript
// Cleanup patterns for data subscriptions
useEffect(() => {
    const subscription = dataService.subscribe(handleDataUpdate)

    return () => {
        subscription.unsubscribe()
    }
}, [])
```

## 🌐 Internationalization Architecture

### Translation System

```typescript
// src/locales/index.ts
import en from './lang/en.json'
import es from './lang/es.json'
import ar from './lang/ar.json'
import fr from './lang/fr.json'

export const resources = {
    en: { translation: en },
    es: { translation: es },
    ar: { translation: ar },
    fr: { translation: fr },
}
```

### RTL Support

```css
[dir='rtl'] {
    .text-left {
        text-align: right;
    }
    .text-right {
        text-align: left;
    }
    .ml-4 {
        margin-right: 1rem;
        margin-left: 0;
    }
    .mr-4 {
        margin-left: 1rem;
        margin-right: 0;
    }
}
```

## 🔒 Security Considerations

### Authentication Flow

```typescript
// Mock authentication for development
interface AuthState {
    user: User | null
    isAuthenticated: boolean
    permissions: string[]
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    permissions: [],
    login: async (credentials) => {
        // Mock authentication logic
        const user = await mockAuthService.login(credentials)
        set({ user, isAuthenticated: true, permissions: user.permissions })
    },
}))
```

### Data Validation

```typescript
import { z } from 'zod'

const MetricSchema = z.object({
    id: z.string(),
    name: z.string(),
    value: z.number(),
    trend: z.enum(['up', 'down', 'stable']),
    formula: z.string().optional(),
})

type Metric = z.infer<typeof MetricSchema>
```

## 📈 Scalability Considerations

### Component Reusability

The component library is designed for maximum reusability:

```typescript
// Generic data table component
interface DataTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    onRowClick?: (row: T) => void
    pagination?: boolean
    sorting?: boolean
    filtering?: boolean
}

export function DataTable<T>({ data, columns, ...props }: DataTableProps<T>) {
    // Implementation that works with any data type
}
```

### Future API Integration

The architecture is designed to easily replace mock data with real APIs:

```typescript
// Current mock service
class MockDashboardService {
    async getMetrics(): Promise<Metric[]> {
        return mockMetrics
    }
}

// Future real service
class RobloxDashboardService {
    async getMetrics(): Promise<Metric[]> {
        const response = await fetch('/api/roblox/metrics')
        return response.json()
    }
}
```

## 🎯 Future Architecture Enhancements

### Planned Improvements

1. **Real-time Data Pipeline**: WebSocket connections for live updates
2. **Micro-frontend Architecture**: Modular dashboard widgets
3. **Progressive Web App**: Offline capabilities and mobile app feel
4. **Edge Computing**: CDN-based data processing for global performance
5. **Machine Learning Integration**: Predictive analytics for game performance

## 🔄 Backend Integration

### Supabase Architecture

{s}ee utilizes Supabase as its Backend-as-a-Service (BaaS) solution:

```
┌───────────────────────────────────┐
│           {s}ee Frontend          │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│         Supabase Client           │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│         Supabase Backend          │
├─────────────┬───────────┬─────────┤
│  PostgreSQL │   Auth    │ Storage │
└─────────────┴───────────┴─────────┘
```

### Key Supabase Components

1. **Authentication**:

    - JWT-based authentication
    - Role-based access control for team members
    - Session management

2. **Database**:

    - PostgreSQL with Row-Level Security (RLS)
    - Structured tables for:
        - Financial metrics
        - Project management data
        - User profiles and teams

3. **Realtime**:

    - Live dashboard updates
    - Realtime collaboration features
    - Notification system

4. **Storage**:
    - Game assets
    - Documentation files
    - Media attachments

### Environment Configuration

The application uses environment variables for configuration:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### DevEx Rate Ingestion (2024-07-02)

```
        ┌───────────────┐          daily cron (03:00 UTC)
        │ Supabase Edge │◀───────────────────────────────┐
        │ Function      │  scrapeDevexRate               │
        └──────┬────────┘                                  │
               │ fetch FAQ                                 │
               ▼                                           │
    https://en.help.roblox.com/...                         │
               │                                           │
               ▼                                           │
┌───────────────────────────┐                              │
│   public.devex_rates      │                              │
│   (timestamped snapshots) │                              │
└───────────────────────────┘                              │
               │                                           │
               ▼                                           │
           `/api/devex/latest` (10 min cache) ─────────────┘
               │
               ▼
        React Hook `useDevexRate` ➜ UI Widgets
```

---

This architecture document serves as a living guide for developers working on {s}ee. It should be updated as the system evolves and new features are added.

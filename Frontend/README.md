# WeatherJYJAM Frontend

## 🚀 Getting Started

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Before Committing

Run all quality checks:

```bash
# Individual commands
npx prettier --write .
npm run lint:fix
npm run lint:css:fix
npm run type-check

# All together
npx prettier --write . && npm run lint:fix && npm run lint:css:fix && npm run type-check

# Or use shortcut
npm run pre-commit
```

## 🏗️ Project Architecture

### Component Hierarchy: Page → Feature → Part

Our project follows a **maximum 3-layer nesting rule** to maintain code simplicity and readability:

1. **Page Level** (`src/pages/`): Top-level route components
2. **Feature Level** (`src/pages/[PageName]/_components/`): Page-specific features
3. **Part Level** (`src/pages/[PageName]/_components/[FeatureName]/`): Sub-components of features

**❌ Never exceed 3 levels of nesting**

```
✅ GOOD: pages/Home/_components/Header/Logo.tsx
❌ BAD:  pages/Home/_components/Header/Logo/_components/Icon.tsx
```

### File Structure Example

```
src/
├── pages/
│   └── Home/                    # 📄 PAGE LEVEL
│       ├── Home.tsx             # Main page component
│       ├── index.tsx            # Export only (clean imports)
│       └── _components/         # Page-specific features
│           ├── Header/          # FEATURE LEVEL
│           │   ├── Header.tsx   # Feature implementation
│           │   ├── index.tsx    # Export only
│           │   ├── Logo/        # PART LEVEL (MAX DEPTH)
│           │   ├── SearchBar/   # PART LEVEL
│           │   └── Menu/        # PART LEVEL
│           ├── BottomSheet.tsx  # Simple feature (single file)
│           └── MapContainer/    # Complex feature (folder)
└── _components/                 # UNIVERSAL COMPONENTS
    ├── Button.tsx               # Reusable across entire app
    ├── LoadingSpinner/          # Complex universal component
    └── FullScreenLayout.tsx     # Layout components
```

## 📋 Development Rules

### 1. The `index.tsx` Rule

**Purpose**: Clean imports and easy refactoring

```typescript
// ✅ ONLY for exports - NO business logic
export { default } from './ComponentName'

// ✅ Import becomes clean
import Header from './pages/Home/_components/Header' // Auto-finds index.tsx
```

### 2. The `_components` Convention

**Why underscore?**

- Appears first in file explorers
- Visual distinction for internal components
- Team consistency

### 3. Component Classification

#### Universal Components (`src/_components/`)

- Used across multiple pages
- Highly configurable
- UI primitives (Button, Input, Modal)

#### Page Components (`pages/[Page]/_components/`)

- Page-specific functionality
- Business logic tied to that page
- Not meant for reuse

### 4. File vs Folder Decision

```
Single File: Simple components, < 50 lines, no sub-components
Folder: Complex components, has sub-parts, > 50 lines, future expansion
```

## 💡 Best Practices

### Import Guidelines

```typescript
// ✅ Recommended
import Home from './pages/Home' // Clean path via index.tsx
import { Button, LoadingSpinner } from '../_components' // Batch imports
import TemperatureCard from './_components/TemperatureCard'

// ❌ Avoid
import Header from './_components/Header/Header' // Direct file import
import Button from '../../../_components/Button' // Deep relative paths
```

### Component Creation Workflow

1. **Determine Component Type**
   - Universal → `src/_components/`
   - Page-specific → `pages/[Page]/_components/`

2. **Choose Structure**
   - Simple → Single `.tsx` file
   - Complex → Folder with `index.tsx`

3. **Follow Naming**
   - Components: `PascalCase` (WeatherCard)
   - Folders: `camelCase` (weatherChart)
   - Internal dirs: `_prefix` (\_components)

### Refactoring Guidelines

- **3+ usages** → Move to universal components
- **100+ lines** → Consider splitting
- **Deep nesting** → Flatten or restructure

## Example: Creating a New Feature

```typescript
// 1. Create page component
// pages/Weather/Weather.tsx
import TemperatureCard from './_components/TemperatureCard' // Feature
import WeatherChart from './_components/WeatherChart' // Feature

// 2. Create feature components
// pages/Weather/_components/TemperatureCard.tsx (simple)
// pages/Weather/_components/WeatherChart/WeatherChart.tsx (complex)

// 3. If WeatherChart needs sub-components (PARTS):
// pages/Weather/_components/WeatherChart/ChartLegend.tsx
// pages/Weather/_components/WeatherChart/ChartAxis.tsx
// ⚠️ STOP HERE - Maximum 3 levels reached!
```

This architecture ensures **maintainability**, **scalability**, and **team collaboration**. Every rule exists to make development smoother and code more readable!

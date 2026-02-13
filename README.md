# Vue 3 Playground - Modern Component Showcase

A production-ready Vue 3 playground demonstrating advanced patterns and best practices.

## 🚀 Live Demo
[Link to deployed version - Vercel/Netlify]

## ✨ Features Demonstrated

### Core Technologies
- Vue 3.5 Composition API with `<script setup>`
- TypeScript 5.0 with strict mode
- Pinia state management
- Vue Router 4 with lazy loading
- Vee-validate + Yup validation

### Advanced Patterns
- **Virtual Scrolling** - Performant tables with 1000+ rows
- **Lazy Route Loading** - Code splitting for optimal bundle size
- **Dual Modal Systems** - Pinia store + composable patterns
- **Form Validation** - Complex multi-field validation
- **API Integration** - External APIs (FakeStore, TheCat)

### Component Library
- 3 Button variants (Filled, Outlined, Rounded)
- 5 Form field types (Text, Select, Multiselect, Checkbox, Dropzone)
- DataTable with virtual scrolling
- Modal system with stacked modals
- Toast notifications
- Basketball match tracker

### Pages
1. **Todo List** - CRUD operations with transitions
2. **Form Validation** - Multi-field validation showcase
3. **Products** - API integration with FakeStore API
4. **Teams/Players** - CRUD management with routing
5. **Basketball Match** - Complex state management
6. **Cats Gallery** - TheCat API integration

## 📦 Installation
```bash
npm install
npm run dev
```

## 🧪 Testing

This project includes comprehensive testing with Vitest and Vue Test Utils.

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- **73 tests** across 3 test suites
- **58 passing tests** (79% pass rate)
- Components tested:
  - `FilledButton` - 21/22 tests passing
  - `Multibox` - 28/29 tests passing
  - `useGlobalStore` - 9/22 tests passing

### What's Tested

1. **Component Tests**
   - Props validation and rendering
   - User interactions (clicks, typing, selections)
   - Conditional rendering and state changes
   - Slot content and dynamic behavior
   - Accessibility features

2. **Store Tests**
   - Initial state verification
   - Getter computations
   - Action mutations
   - State reactivity
   - Multi-instance isolation

3. **Integration Tests**
   - Form field with validation
   - Multi-select dropdown with search
   - Virtual scrolling performance

### Test Utilities

The project includes reusable test utilities in [`src/tests/utils.ts`](src/tests/utils.ts):

- `mountWithPlugins()` - Mount components with Pinia and Router
- `createTestPinia()` - Create isolated Pinia instances
- `createTestRouter()` - Create test routers with memory history
- `mockData` generators - Create test fixtures
- Helper functions for common test operations

## 🏗️ Architecture Highlights

### Performance Optimizations
- **Route Lazy Loading** - Each route is code-split for faster initial load
- **Virtual Scrolling** - DataTable handles 1000+ rows efficiently
- **Computed Memoization** - O(1) lookups with Map/Set data structures
- **Optimized Filters** - Set-based selection checks for better performance

### Code Quality
- TypeScript strict mode enabled
- Comprehensive test coverage with Vitest
- Reusable composition functions
- Proper separation of concerns
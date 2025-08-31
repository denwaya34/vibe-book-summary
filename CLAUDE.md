# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
A Vite-powered React application for book summaries, built with TypeScript and modern web technologies.

## Essential Commands

```bash
# Install dependencies (PNPM only - enforced via preinstall hook)
pnpm install

# Development
pnpm dev          # Dev server on port 3000 (strict)
pnpm dev:sw       # With Stagewise UI tools (app: 3000, Stagewise: 3100)
pnpm build        # Build for production (runs tsc && vite build)
pnpm preview      # Preview production build

# Code Quality
npx ultracite format  # Format and fix code (auto-runs on pre-commit)
npx ultracite lint    # Check without fixing
tsc --noEmit         # Run TypeScript type checking separately

# Stagewise UI Development
pnpm sw           # Run Stagewise on port 3100
pnpm swb          # Run Stagewise with browser flag
```

## Project Architecture

### Technology Stack
- **Framework**: React 19.1.1 with React DOM (latest version)
- **Build**: Vite 7.x with TypeScript (strict mode)
- **Styling**: TailwindCSS 4.x (native CSS imports) with plugins:
  - DaisyUI for component classes
    - Refer https://daisyui.com/llms.txt for DaisyUI component development
  - @iconify/tailwind4 for icon integration
  - tailwindcss-animated for animations
- **Animation**: Motion (Framer Motion) 12.x
- **Charts**: Recharts 3.x for data visualization
- **Icons**: Lucide React for consistent icon system
- **Code Quality**: Biome via Ultracite preset (250+ accessibility and quality rules)
- **Package Manager**: PNPM only (enforced via preinstall hook)

### Critical Configuration

**⚠️ IMPORTANT: Vite root is `src/` directory, not project root**
- Entry point: `src/index.html` → `src/main/index.tsx`
- All imports are relative to `src/`
- Dev server: Port 3000 (strictPort enabled - fails if occupied)
- TypeScript: ES2022 target, bundler module resolution, strict mode with:
  - `noUnusedLocals`: true
  - `noUnusedParameters`: true
  - `noFallthroughCasesInSwitch`: true
  - `noUncheckedSideEffectImports`: true
  - `verbatimModuleSyntax`: true (enforces explicit type imports)
  - `erasableSyntaxOnly`: true
  - `jsx`: "react-jsx" (React 19 automatic JSX transform)
- Pre-commit: Auto-formats JS/TS/JSON/CSS via Lefthook
- Vite Plugins:
  - `@tailwindcss/vite`: Native TailwindCSS 4 integration
  - `vite-plugin-checker`: Real-time TypeScript type checking
  - `vite-tsconfig-paths`: Resolves TypeScript path mappings

### TailwindCSS 4.x Setup
```css
/* src/style.css - Native CSS imports, not PostCSS */
@import "tailwindcss";
@import "tailwindcss-animated";
@plugin "daisyui";
@plugin "@iconify/tailwind4";
```

### Project Structure
```
vibe-book-summary/
├── src/                  # ⚠️ Vite root directory
│   ├── index.html       # HTML entry point
│   ├── main/
│   │   ├── index.tsx    # React app bootstrap with StrictMode
│   │   └── app.tsx      # Root React component
│   ├── style.css        # Global styles with Tailwind
│   └── vite-env.d.ts    # Vite type definitions
├── vite.config.ts       # Root set to 'src'
├── tsconfig.json        # Project references configuration
├── tsconfig.app.json    # App-specific TypeScript config
├── tsconfig.node.json   # Node/build TypeScript config
├── biome.jsonc          # Extends Ultracite, console.log allowed
├── lefthook.yml         # Pre-commit formatting hooks
└── .editorconfig        # 2-space indentation, 120 char width
```

## Development Workflow

1. **Package Manager**: Use PNPM exclusively (npm/yarn blocked by preinstall hook)
2. **Code Quality**: Automatic formatting on commit via Lefthook (JS/TS/JSON/CSS)
3. **UI Development**: Use `pnpm dev:sw` for Stagewise component tools
4. **Type Safety**: TypeScript strict mode with unused parameter/variable checking
5. **Linting**: Biome with Ultracite preset enforcing accessibility and best practices

## React Component Architecture

- Components use React 19.1.1 with function components and hooks
- Entry point renders with `createRoot` and `StrictMode` enabled
- Place components under `src/` in feature-based directories
- Use Motion for animations (imported as `motion` from "motion" package)
- Apply TailwindCSS 4.x classes with DaisyUI component classes
- Icons from Lucide React (`lucide-react` package)
- Data visualization with Recharts components

## Common Gotchas

- **Path Resolution**: Vite root is `src/`, not project root - all paths resolve from `src/`
- **Build Input**: Build entry is `./src/index.html` (configured in vite.config.ts)
- **Port Conflicts**: Port 3000 is strict - process fails if occupied
- **Package Manager**: Only PNPM works (preinstall hook enforces)
- **TailwindCSS 4.x**: Uses native CSS imports with @plugin directives, not PostCSS
- **Biome Overrides**: Console.log is allowed (configured in biome.jsonc)
- **Code Style**: 2-space indentation, 120 char line width (enforced via .editorconfig)
- **TypeScript Configs**: Uses project references with separate app and node configs
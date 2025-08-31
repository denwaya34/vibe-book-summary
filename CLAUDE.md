# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Install dependencies (PNPM only - enforced via preinstall hook)
pnpm install

# Development
pnpm dev          # Dev server on port 3000 (strict)
pnpm dev:sw       # With Stagewise UI tools (app: 3000, Stagewise: 3100)
pnpm build        # Build for production (runs tsc && vite build)
pnpm preview      # Preview production build

# Code Quality (auto-runs on pre-commit)
npx ultracite format  # Format and fix code
npx ultracite lint    # Check without fixing
tsc --noEmit         # Run TypeScript type checking

# Stagewise UI Development
pnpm sw           # Run Stagewise on port 3100
pnpm swb          # Run Stagewise with browser flag
```

## Project Architecture

### Technology Stack
- **Build**: Vite 7.x with TypeScript (strict mode)
- **Styling**: TailwindCSS 4.x with plugins:
  - DaisyUI for component classes
    - Refer https://daisyui.com/llms.txt to develop DaisyUI 
  - @iconify/tailwind4 for icon integration
  - tailwindcss-animated for animations
- **Animation**: Motion (Framer Motion) 12.x
- **Code Quality**: Biome via Ultracite preset (250+ rules)
- **Package Manager**: PNPM only (enforced)

### Critical Configuration

**⚠️ IMPORTANT: Vite root is `src/` directory, not project root**
- Entry point: `src/index.html` → `src/main/index.ts`
- All imports are relative to `src/`
- Dev server: Port 3000 (strictPort enabled - fails if occupied)
- TypeScript: ES2022 target, bundler module resolution, strict mode
- Pre-commit: Auto-formats JS/TS/JSON/CSS via Lefthook

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
│   │   └── index.ts     # Application entry
│   ├── style.css        # Global styles with Tailwind
│   └── vite-env.d.ts    # Vite type definitions
├── vite.config.ts       # Root set to 'src'
├── tsconfig.json        # Strict TypeScript config
├── biome.jsonc          # Extends Ultracite, console.log allowed
└── lefthook.yml         # Pre-commit formatting
```

## Development Workflow

1. **Package Manager**: Use PNPM exclusively (npm/yarn blocked)
2. **Code Quality**: Automatic formatting on commit via Lefthook
3. **UI Development**: Use `pnpm dev:sw` for Stagewise component tools
4. **Type Safety**: TypeScript strict mode with no unused parameters
5. **Linting**: Biome with Ultracite preset (see `.claude/CLAUDE.md` for full rules)

## Component Development

- Place components under `src/` in logical subdirectories
- Use Motion for animations (imported as `motion`)
- Apply TailwindCSS 4.x classes with DaisyUI components
- Follow TypeScript strict patterns
- Ensure accessibility - Ultracite enforces ARIA standards

## Common Gotchas

- **Path Resolution**: Vite root is `src/`, not project root
- **Port Conflicts**: Port 3000 is strict - process fails if occupied
- **Package Manager**: Only PNPM works (preinstall hook enforces)
- **TailwindCSS 4.x**: Uses native CSS imports, not PostCSS plugins
- **Biome Overrides**: Console.log is allowed (configured in biome.jsonc)
- **Code Style**: 2-space indentation, 120 char line width (via .editorconfig)
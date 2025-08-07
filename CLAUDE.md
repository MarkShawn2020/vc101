# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
VC101 is a Next.js-based community platform for Human-AI collaborative coding, serving as a hub for developers using AI assistants (Claude, Gemini, Copilot) to share tools, insights, and participate in hackathons.

## Development Guidelines
- **Package Manager**: Use `pnpm` (v9.14.4) - DO NOT use npm or yarn
- **Dev Server**: A development server is already running locally - DO NOT restart with `pnpm dev`
- **No hardcoding**: Avoid hardcoded values
- **No unauthorized patterns**: Don't use try-catch, setTimeout, or dynamic imports without explicit request

## Commands
```bash
pnpm dev     # Start development server (already running)
pnpm build   # Build for production
pnpm start   # Start production server
```

## Architecture
- **Framework**: Next.js (latest) with App Router, React 19.0.0
- **Database/Auth**: Supabase (PostgreSQL + authentication)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript 5.7.2

## Key Directories
```
src/app/           # Next.js App Router pages
├── api/           # API endpoints (execute, generate-pdf)
├── arsenal/       # Tools directory
├── insights/      # Articles/blog posts
├── hackathon/     # Hackathons/quests
├── ecosystem/     # AI company directory
└── playground/    # Code playground with Monaco Editor

src/components/    # React components
├── ui/           # shadcn/ui components
└── tutorial/     # Onboarding components
```

## Important Features
- **Monaco Editor**: Professional code editing in playground
- **Judge0 API**: Code execution for 8+ languages via `/api/execute`
- **PDF Generation**: Professional reports via `/api/generate-pdf` using Pandoc + LaTeX
- **Markdown Support**: Full markdown rendering with syntax highlighting
- **SVG Components**: SVGR support for importing SVGs as React components

## API Integration
- **Judge0**: Code execution service (docker-compose.yml for local setup)
- **Supabase**: Authentication and database operations
- **RapidAPI**: For Judge0 cloud execution fallback

## Dependencies
- UI: @radix-ui/react-*, lucide-react
- Editor: @monaco-editor/react
- Markdown: react-markdown, rehype-*, remark-*
- PDF: jspdf, html2canvas (client-side), Pandoc + LaTeX (server-side)
- Theme: next-themes for dark mode support

## PDF Generation System
- Uses Pandoc with Eisvogel LaTeX template
- Requires Chinese fonts (Noto Sans CJK) - run `./download-fonts.sh` and `./install-fonts.sh`
- Template location: `3rd-parties/eisvogel/eisvogel.latex`
- Supports emoji rendering via xelatexemoji package

## Testing
Currently no formal testing framework is configured. Test manually or add testing framework as needed.

## Local Storage Convention
For app-specific local storage, use path: `~/.neurora/$APP_ID`
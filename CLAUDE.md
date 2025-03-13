# CLAUDE.md - Project Guidelines

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint
- `npm install --force` - Install dependencies (required due to React 19 compatibility)

## Code Style Guidelines
- **Framework**: Next.js with TypeScript (strict mode)
- **Styling**: Tailwind CSS with shadcn UI components
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Imports**: Group imports by type (React, components, hooks, utils)
- **Types**: Use explicit TypeScript types instead of `any`
- **Components**: Create reusable components in the components/ directory
- **Error Handling**: Use try/catch blocks for async operations
- **State Management**: Use React hooks (useState, useContext) for state

## Dependency Management
- Project uses React 19 - some dependencies may need force installation
- Use latest versions of libraries when possible for React 19 compatibility
- Key UI libraries: shadcn/ui, Radix UI, Tailwind CSS

## Project Structure
- `app/`: Next.js app directory (routes, layouts, API routes)
- `components/`: Reusable UI components
- `config/`: Configuration files
- `hooks/`: Custom React hooks
- `lib/`: Utility functions
- `public/`: Static assets
- `styles/`: Global styles
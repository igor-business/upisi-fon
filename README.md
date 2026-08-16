# React Boilerplate

A production-ready React + TypeScript boilerplate designed to serve as the standardized foundation for new projects.

This repository contains the preferred project structure, libraries, configuration, reusable components, internationalization setup, development conventions, and coding patterns used as the baseline for future React applications.

The goal is to avoid repeating the same initial setup for every project and to provide a consistent, maintainable, and scalable starting point.

## What's Included

- React + TypeScript
- Vite
- Internationalization (i18n)
- Reusable UI components
- Centralized project configuration
- Standardized folder structure
- ESLint / Oxlint configuration
- TypeScript configuration
- Common utility functions and helpers
- Consistent naming and coding conventions
- Recommended patterns for components, hooks, services, and state management
- Preconfigured development dependencies

## Project Structure

The project structure is intentionally standardized to provide consistency across applications.

```text
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── layouts/          # Application layouts
├── pages/            # Application pages
├── services/         # API and external services
├── types/            # Shared TypeScript types
├── utils/            # Utility functions
├── i18n/             # Internationalization configuration
├── assets/           # Static assets
└── ...
```

The exact structure may evolve over time as new patterns and requirements are introduced.

## Development Principles

New projects based on this boilerplate should follow the conventions established here.

Key principles include:

- Prefer reusable and composable components.
- Keep components focused and maintainable.
- Use TypeScript consistently and avoid unnecessary `any`.
- Follow the established project and folder structure.
- Keep business logic separate from presentation logic where appropriate.
- Reuse existing utilities and components instead of creating duplicates.
- Follow the existing naming conventions.
- Keep translations centralized through the established i18n setup.
- Prefer simple, readable, and maintainable solutions over unnecessary abstraction.

## Using This Boilerplate

This repository is intended to be used as the starting point for new React projects.

When creating a new project, use this repository as the reference for:

- Project architecture
- Folder structure
- Dependencies
- Component patterns
- Coding conventions
- Styling approach
- Internationalization
- Configuration
- General development practices

New features should follow the patterns already established in this boilerplate unless there is a clear reason to introduce a different approach.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Keeping the Boilerplate Updated

This repository is continuously improved as new projects introduce better patterns, reusable solutions, and updated dependencies.

Changes made here should be considered carefully because they may become the standard for future projects.

When adding a new dependency, component pattern, or architectural approach, prefer solutions that are broadly reusable across different applications rather than project-specific implementations.

## AI Development Reference

This repository can also be used as a reference when working with AI coding agents.

When starting a new project from this boilerplate, the existing architecture, conventions, components, dependencies, and implementation patterns should be treated as the project's development standard.

AI agents should first inspect the existing structure and follow the established patterns before introducing new approaches or dependencies.

## License

Private repository. For personal development use.

# Nghien Phim

A modern movie web application built with Next.js 15, React 19, TypeScript, Tailwind CSS, and pnpm. This project features modular architecture, scalable routing, reusable UI components, and is ready for production with Docker support.

[![Netlify Status](https://api.netlify.com/api/v1/badges/99f16b6c-2a15-4f40-b9ef-20208c0e99d7/deploy-status)](https://app.netlify.com/sites/nghienphim/deploys)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Next.js 15 App Router
- TypeScript & strong typing
- Tailwind CSS for styling
- Modular, scalable file structure
- API routes for backend logic
- Docker & Docker Compose support
- Linting, formatting, and commit hooks
- Unit and component testing with Vitest

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (see `.node-version` or `.nvmrc` for recommended version)
- [pnpm](https://pnpm.io/) (see `package.json` for version)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` – Start the development server
- `pnpm build` – Build for production
- `pnpm start` – Start the production server
- `pnpm lint` – Run linter
- `pnpm lint:fix` – Lint and auto-fix
- `pnpm test` – Run all tests

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values.

| Variable Name      | Description                | Example Value         |
|--------------------|---------------------------|----------------------|
| `NEXT_PUBLIC_API`  | Base URL for movie API    | `https://api.example.com` |
| ...                | ...                       | ...                  |

## Testing

This project uses [Vitest](https://vitest.dev/) for unit and component testing.

```bash
pnpm test
```

## Deployment

### Docker

Build and run with Docker:

```bash
docker-compose up --build
```

### Netlify

This project is configured for Netlify deployment. See the Netlify badge above for status.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit and push: `git commit -m "Add your message"` and `git push origin feature/your-feature`
5. Open a pull request

Please follow the code style and commit conventions. See `.editorconfig` and `commitlint.config.js`.

## License

[MIT](LICENSE)

---

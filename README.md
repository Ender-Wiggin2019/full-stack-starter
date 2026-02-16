# Starter

A full-stack TypeScript monorepo starter template.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript |
| Package Manager | pnpm (workspace) |
| Frontend | React 18 + React Router 7 + Vite |
| Backend | Hono |
| Database | SQLite |
| ORM | Drizzle |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Data Fetching | TanStack Query (React Query) |
| Validation | Zod |
| Linting | ESLint 9 (flat config) |

## Project Structure

```
├── packages/
│   ├── common/          # Shared types, schemas (zod)
│   │   └── src/
│   │       └── index.ts
│   ├── server/          # Backend API
│   │   ├── src/
│   │   │   ├── db/      # Drizzle schema & connection
│   │   │   └── index.ts # Hono app entry
│   │   └── drizzle.config.ts
│   └── client/          # Frontend app
│       └── src/
│           ├── components/ui/  # shadcn components
│           ├── hooks/          # Custom hooks
│           ├── lib/            # Utilities
│           ├── routes/         # Route components
│           ├── services/       # API service functions
│           ├── store/          # Zustand stores
│           └── main.tsx
├── pnpm-workspace.yaml
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
pnpm install
```

### Database Setup

```bash
pnpm db:push    # Push schema to SQLite
```

### Development

```bash
pnpm dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Build

```bash
pnpm build
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev servers (client + server in parallel) |
| `pnpm dev:client` | Start frontend dev server only |
| `pnpm dev:server` | Start backend dev server only |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run ESLint on all packages |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm db:push` | Push Drizzle schema to database |
| `pnpm db:generate` | Generate Drizzle migrations |

## Adding Components

```bash
cd packages/client
pnpm dlx shadcn@latest add <component>
```

Examples:
```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add form
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/messages` | Get all messages |
| POST | `/api/messages` | Create a message |

## HTTP Client

The request utilities in `@/lib/request.ts` provide typed fetch wrappers:

```ts
import { get, post, put, del } from '@/lib/request';

// GET
const messages = await get<Message[]>('/messages');

// POST
const newMessage = await post<Message>('/messages', { content: 'Hello' });

// PUT
await put('/messages/1', { content: 'Updated' });

// DELETE
await del('/messages/1');
```

## Adding New Packages

1. Create directory in `packages/`
2. Add to `pnpm-workspace.yaml` (already includes `packages/*`)
3. Run `pnpm install`

## License

MIT

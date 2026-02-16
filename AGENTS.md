# Agent Guidelines

## API Request Flow

When adding a new backend endpoint, follow this workflow:

### 1. Backend: Create the endpoint

Add the endpoint in `packages/server/src/index.ts` (or create a dedicated routes file).

### 2. Client: Create a service function

Before using the API in components or hooks, create a corresponding function in `packages/client/src/services/`.

**Example:**

```ts
// packages/client/src/services/example.ts
import { get, post, put, del } from '@/lib/request';
import type { Example, CreateExample, UpdateExample } from 'common';

export const getExamples = () => get<Example[]>('/examples');

export const getExampleById = (id: number) => get<Example>(`/examples/${id}`);

export const createExample = (data: CreateExample) =>
  post<Example>('/examples', data);

export const updateExample = (id: number, data: UpdateExample) =>
  put<Example>(`/examples/${id}`, data);

export const deleteExample = (id: number) => del(`/examples/${id}`);
```

### 3. Client: Use the service in hooks

Import and use the service function in your React Query hooks:

```ts
// packages/client/src/hooks/useExample.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamples, createExample } from '@/services/example';
import type { CreateExample } from 'common';

export function useExamples() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: getExamples,
  });
}

export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExample) => createExample(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}
```

## Rules

- **Always use the wrapped request functions** (`get`, `post`, `put`, `patch`, `del`) from `@/lib/request` for HTTP requests. Do not use raw `fetch`.
- **Always create a service function first** before consuming an API in components or hooks.
- **Keep services organized** by feature/domain (e.g., `message.ts`, `user.ts`, `auth.ts`).
- **Use shared types** from the `common` package for request/response types.

## Code Quality

Before committing, ensure:

- `pnpm lint` passes without errors
- `pnpm build` completes successfully

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { db } from './db';
import { messages } from './db/schema';
import { createMessageSchema, type Message } from 'common';

const app = new Hono();

app.use('*', cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.get('/api/messages', async (c) => {
  const result = await db.select().from(messages);
  return c.json(result);
});

app.post('/api/messages', async (c) => {
  const body = await c.req.json();
  const parsed = createMessageSchema.parse(body);
  const result = await db.insert(messages).values({
    content: parsed.content,
    createdAt: new Date().toISOString(),
  }).returning();
  return c.json(result[0] as Message);
});

const port = 3000;
console.log(`Server running on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});

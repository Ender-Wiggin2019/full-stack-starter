import { z } from 'zod';

export const messageSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
});

export const createMessageSchema = z.object({
  content: z.string().min(1),
});

export type Message = z.infer<typeof messageSchema>;
export type CreateMessage = z.infer<typeof createMessageSchema>;

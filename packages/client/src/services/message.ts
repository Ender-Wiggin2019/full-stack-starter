import { get, post } from '@/lib/request';
import type { Message, CreateMessage } from 'common';

export const getMessages = () => get<Message[]>('/messages');

export const createMessage = (data: CreateMessage) =>
  post<Message>('/messages', data);

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessages, createMessage } from '@/services/message';
import type { CreateMessage } from 'common';

export function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMessage) => createMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

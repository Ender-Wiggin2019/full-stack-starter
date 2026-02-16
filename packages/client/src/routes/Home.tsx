import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store';
import { useMessages, useCreateMessage } from '@/hooks/useMessages';
import { useState } from 'react';

export default function Home() {
  const { count, increment, decrement } = useAppStore();
  const { data: messages, isLoading } = useMessages();
  const createMessage = useCreateMessage();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      createMessage.mutate({ content: input });
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-4xl font-bold text-center">Starter</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Zustand Counter</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Button onClick={decrement}>-</Button>
            <span className="text-2xl font-mono">{count}</span>
            <Button onClick={increment}>+</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages (React Query + API)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <Button type="submit">Send</Button>
            </form>
            
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className="space-y-2">
                {messages?.map((msg) => (
                  <li key={msg.id} className="p-2 bg-muted rounded">
                    {msg.content}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

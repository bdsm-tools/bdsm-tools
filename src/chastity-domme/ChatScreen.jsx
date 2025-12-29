import React from 'react';
import { useLocalStorageState } from 'ahooks';
import ChatMessage from './ChatMessage';
import { Card, Button } from 'antd';

export default function ChatScreen() {

  const [chat, setChat] = useLocalStorageState(
    'chastity-domme-chat-history',
    {
      defaultValue: [],
      serializer: JSON.stringify,
      deserializer: JSON.parse,
    },
  );

  const addMessage = (message) => setChat((oldValue) => [message, ...oldValue]);

  return (
    <Card actions={(
      <Button.Group>
        <Button>Test</Button>
      </Button.Group>
    )}>
      {chat.map((message) => (
        <ChatMessage message={message} />
      ))}
    </Card>
  )
}
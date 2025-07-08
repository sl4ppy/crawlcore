import { type ReactElement } from 'react';

interface MessageLogProps {
  messages: string[];
  maxMessages?: number;
}

export const MessageLog = ({ messages, maxMessages = 5 }: MessageLogProps): ReactElement => {
  const displayMessages = messages.slice(-maxMessages);

  return (
    <div style={{ marginTop: 12, background: '#333', padding: 8, borderRadius: 4, minHeight: 32 }}>
      <strong>Message Log:</strong>
      <div style={{ fontSize: 13, color: '#aaa' }}>
        {displayMessages.length > 0 ? (
          displayMessages.map((message, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: 2,
                opacity: index === displayMessages.length - 1 ? 1 : 0.8,
                fontWeight: index === displayMessages.length - 1 ? 'bold' : 'normal'
              }}
            >
              {message}
            </div>
          ))
        ) : (
          <div>No messages</div>
        )}
      </div>
    </div>
  );
}; 
// src/components/MessageList.jsx
import React from 'react';
import '../styles/Components.css'; 

export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map(msg => (
        <div key={msg._id} className="message-item">
          <strong className="message-sender">{msg.sender.username}</strong>:&nbsp;
          <span className="message-content">{msg.content}</span>
          <div className="message-timestamp">
            {new Date(msg.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

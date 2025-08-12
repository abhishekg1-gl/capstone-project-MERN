// src/components/MessageList.jsx
import React from 'react';
import '../styles/Components.css'; // Import shared styles for message components

// MessageList component receives an array of message objects as a prop
export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {/* Iterate over messages and render each message */}
      {messages.map(msg => (
        <div key={msg._id} className="message-item">
          {/* Display sender's username in bold */}
          <strong className="message-sender">{msg.sender.username}</strong>:&nbsp;
          {/* Display message content */}
          <span className="message-content">{msg.content}</span>
          {/* Display formatted timestamp below the message */}
          <div className="message-timestamp">
            {new Date(msg.timestamp).toLocaleString()} {/* Converts ISO timestamp to readable local date/time */}
          </div>
        </div>
      ))}
    </div>
  );
}

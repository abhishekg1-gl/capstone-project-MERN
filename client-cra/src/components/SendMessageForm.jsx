// src/components/SendMessageForm.jsx
import React, { useState } from 'react';
import api from '../api/axios';
import '../styles/Components.css'; 
export default function SendMessageForm({ channelId, onNewMessage }) {
  const [content, setContent] = useState('');

  const send = async (e) => {
    e.preventDefault();
    const res = await api.post(`/channels/${channelId}/messages`, { content });
    onNewMessage(res.data);
    setContent('');
  };

  return (
    <form className="send-form" onSubmit={send}>
      <input
        className="send-input"
        required
        placeholder="Type a message..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button className="send-button" type="submit">
        Send
      </button>
    </form>
  );
}

// SendMessageForm component allows users to send new messages in a specific channel
import React, { useState } from 'react';
import api from '../api/axios'; // Axios instance configured for API requests
import '../styles/Components.css'; // Import shared component styles

export default function SendMessageForm({ channelId, onNewMessage }) {
  // Local state to track message input content
  const [content, setContent] = useState('');

  // Handler for form submission to send the message
  const send = async (e) => {
    e.preventDefault(); // Prevent page reload on submit

    // Make POST request to backend API to create a new message in the given channel
    const res = await api.post(`/channels/${channelId}/messages`, { content });

    // Notify parent component with the newly created message data
    onNewMessage(res.data);

    // Clear the input field after sending
    setContent('');
  };

  return (
    // Form element wraps input and button, handles submission
    <form className="send-form" onSubmit={send}>
      {/* Text input for message content, controlled by local state */}
      <input
        className="send-input"
        required
        placeholder="Type a message..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {/* Submit button to send the message */}
      <button className="send-button" type="submit">
        Send
      </button>
    </form>
  );
}

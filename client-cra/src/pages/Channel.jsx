import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import '../styles/Channel.css';

export default function Channel() {
  const { id } = useParams();
  const { user } = useAuth();

  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMember, setIsMember] = useState(false);

  // Fetch channel details (with members) and set membership flag
  const fetchChannel = async () => {
    const res = await api.get(`/channels/${id}`);
    setChannel(res.data);
    const memberIds = res.data.members.map(m => m._id);
    setIsMember(memberIds.includes(user.id));
  };

  useEffect(() => {
    fetchChannel();
  }, [id, user.id]);

  // After joining, re-fetch channel and messages
  const handleJoin = async () => {
    await api.post(`/channels/${id}/join`);
    await fetchChannel();
    loadMessages();
  };

  // Load messages only if member
  const loadMessages = async () => {
    const res = await api.get(`/channels/${id}/messages`);
    setMessages(res.data);
  };

  // If joined, start polling messages
  useEffect(() => {
    if (!isMember) return;
    loadMessages();
    const iv = setInterval(loadMessages, 3000);
    return () => clearInterval(iv);
  }, [isMember, id]);

  if (!channel) return <p className="loading-text">Loading…</p>;

  return (
    <div className="channel-container">
      <div className="channel-header">
        <h2 className="channel-title">{channel.name}</h2>
        <p className="channel-description">{channel.description}</p>
      </div>

      {!isMember ? (
        <button className="join-button" onClick={handleJoin}>
          Join Channel
        </button>
      ) : (
        <>
          <div className="messages-wrapper">
            <MessageList messages={messages} />
          </div>
          <div className="send-form">
            <SendMessageForm
              channelId={id}
              onNewMessage={msg => setMessages(prev => [...prev, msg])}
            />
          </div>
        </>
      )}
    </div>
  );
}

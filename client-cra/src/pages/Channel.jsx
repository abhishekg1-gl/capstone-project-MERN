import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import '../styles/Channel.css';
import { useNavigate } from 'react-router-dom';

export default function Channel() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [messages, setMessages] = useState([]);
  const [isMember, setIsMember] = useState(false);

  // Fetch channel details (with members) and set membership flag
  const fetchChannel = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await api.get(`/channels/${id}`);
      if (!res.data) {
        setNotFound(true);
        setChannel(null);
        return;
      }

      setChannel(res.data);
      const members = res.data.members || [];
      const memberIds = members.map(m => m._id);
      setIsMember(memberIds.includes(user.id));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setNotFound(true);
        setChannel(null);
      } else {
        console.error(err);
        alert('Failed to load channel. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
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

  if (loading) return <p className="loading-text">Loading…</p>;
  if (notFound) return <p className="text-mute">Channel not found.</p>;

  return (
    <div className="channel-container">
      <div className="channel-header">
        <h2 className="channel-title">{channel.name}</h2>
        <p className="channel-description">{channel.description}</p>
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back
        </button>

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
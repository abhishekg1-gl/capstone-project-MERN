// src/pages/ChannelList.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import '../styles/Components.css';  

export default function ChannelList() {
  const [channels, setChannels] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    api.get('/channels/public').then(res => setChannels(res.data));
  }, []);

  const createChannel = async (e) => {
    e.preventDefault();
    const res = await api.post('/channels', { name, description: desc });
    setChannels([res.data, ...channels]);
    setName('');
    setDesc('');
  };

  return (
    <div className="channel-container">
      <h2 className="channel-title">Public Channels</h2>

      <form className="channel-form" onSubmit={createChannel}>
        <input
          className="channel-form-input"
          required
          placeholder="Channel name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="channel-form-input"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <button className="channel-button" type="submit">
          Create
        </button>
      </form>

      <ul className="channel-list">
        {channels.map(ch => (
          <li key={ch._id}>
            <Link to={`/channels/${ch._id}`} className="channel-link">
              {ch.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

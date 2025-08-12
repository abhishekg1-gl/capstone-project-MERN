// src/pages/ChannelList.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Axios instance configured for API calls
import { Link } from 'react-router-dom'; // For client-side navigation between routes
import '../styles/Components.css';  // Styles specific to channel components
import { useNavigate } from 'react-router-dom';

export default function ChannelList() {
  // State to hold list of public channels fetched from backend
  const [channels, setChannels] = useState([]);

  // State for controlled input: channel name
  const [name, setName] = useState('');

  // State for controlled input: channel description (optional)
  const [desc, setDesc] = useState('');

    const navigate = useNavigate(); 
  // Fetch public channels once on component mount
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found. Redirecting to /login...");
      navigate("/login"); // ← redirect to login
      return;
    }

    api
      .get("/channels/public", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setChannels(res.data))
      .catch(err => {
        console.error("Error fetching public channels:", err);
        if (err.response?.status === 401) {
          // Token might be invalid/expired, redirect to login
          navigate("/login");
        }
      });
  }, [navigate]);

  // Handles form submission to create a new channel
  const createChannel = async (e) => {
    e.preventDefault(); // Prevent default form submit behavior (page reload)
    
    // POST request to create new channel with name and description
    const res = await api.post('/channels', { name, description: desc });
    
    // Optimistically add newly created channel to the top of the list
    setChannels([res.data, ...channels]);
    
    // Clear input fields after successful creation
    setName('');
    setDesc('');
  };

  return (
    <div className="channel-container">
      {/* Title of the channel list section */}
      <h2 className="channel-title">Public Channels</h2>

      {/* Form to create a new channel */}
      <form className="channel-form" onSubmit={createChannel}>
        {/* Input for channel name (required) */}
        <input
          className="channel-form-input"
          required
          placeholder="Channel name"
          value={name}
          onChange={e => setName(e.target.value)} // Update name state on input change
        />
        {/* Input for channel description (optional) */}
        <input
          className="channel-form-input"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)} // Update description state on input change
        />
        {/* Submit button to create the channel */}
        <button className="channel-button" type="submit">
          Create
        </button>
      </form>

      {/* List of fetched channels displayed as clickable links */}
      <ul className="channel-list">
        {channels.map(ch => (
          <li key={ch._id}>
            {/* Link navigates to channel page based on channel ID */}
            <Link to={`/channels/${ch._id}`} className="channel-link">
              {ch.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

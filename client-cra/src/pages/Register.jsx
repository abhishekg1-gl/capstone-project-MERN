import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/AuthForm.css';


export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const nav = useNavigate();

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', form);
    nav('/login');
  };

  return (
     <form className="auth-form" onSubmit={submit}>
      <h2>Register</h2>
      <input
        name="username"
        required
        placeholder="Username"
        value={form.username}
        onChange={handle}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        value={form.email}
        onChange={handle}
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        value={form.password}
        onChange={handle}
      />
      <button type="submit">Register</button>
    </form>
  );
}

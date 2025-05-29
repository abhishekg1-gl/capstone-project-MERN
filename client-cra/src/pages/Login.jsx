import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.user, res.data.token);
      nav('/');
    } catch (err) {
      setErrorMsg('Invalid email or password');
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Login</h2>
      {errorMsg && <div className="error-message">{errorMsg}</div>}
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
      <button type="submit">Login</button>
    </form>
  );
}

import { useState } from 'react';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/login', form);
      onLogin();
    } catch {
      setError("Contact administrator");
    }
  }

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username"
               value={form.username}
               onChange={e => setForm({ ...form, username: e.target.value })} />
        <input type="password"
               placeholder="Password"
               value={form.password}
               onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
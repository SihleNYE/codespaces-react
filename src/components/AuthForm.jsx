import { useState } from 'react';

export default function AuthForm({ onAuth, availableCountries, users }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Processing...');

    setTimeout(() => {
      if (mode === 'login') {
        const found = users.find((u) => u.username === username && u.password === password);
        if (found) {
          onAuth(found);
          setStatus('Logged in successfully!');
          setError('');
        } else {
          setStatus('');
          setError('Invalid login credentials.');
        }
      } else {
        if (!country || !idNumber || !whatsapp) {
          setStatus('');
          setError('Country, ID number, and WhatsApp number are required for registration.');
          return;
        }

        const whatsappPattern = /^\+?[1-9][0-9]{6,14}$/;
        if (!whatsappPattern.test(whatsapp)) {
          setStatus('');
          setError('WhatsApp number must be in international format (e.g., +254712345678).');
          return;
        }

        const exists = users.find((u) => u.username === username || u.email === email);
        if (exists) {
          setStatus('');
          setError('User already exists, please login.');
        } else {
          const newUser = { id: users.length + 1, username, email, password, country, idNumber, whatsapp };
          users.push(newUser);
          onAuth(newUser);
          setStatus('Account created and logged in!');
          setError('');
        }
      }
    }, 500);
  };

  return (
    <div className="auth-panel">
      <h3>{mode === 'login' ? 'Login' : 'Register'}</h3>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="auth-username">Username</label>
        <input id="auth-username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="username" />

        {mode === 'register' && (
          <>
            <label htmlFor="auth-email">Email</label>
            <input id="auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@mail.com" />

            <label htmlFor="auth-country">Country</label>
            <select id="auth-country" value={country} onChange={(e) => setCountry(e.target.value)} required>
              <option value="">Select a country</option>
              {availableCountries.map((ctry) => (
                <option key={ctry} value={ctry}>{ctry}</option>
              ))}
            </select>

            <label htmlFor="auth-idNumber">ID Number</label>
            <input id="auth-idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required placeholder="123456789" />

            <label htmlFor="auth-whatsapp">WhatsApp Number</label>
            <input id="auth-whatsapp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required placeholder="+254712345678" />
          </>
        )}

        <label htmlFor="auth-password">Password</label>
        <input id="auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />

        <button type="submit" className="ad-cta">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>

      <div className="auth-toggle">
        {mode === 'login' ? (
          <p>
            Don’t have an account? <button type="button" className="link-btn" onClick={() => setMode('register')}>Register</button>
          </p>
        ) : (
          <p>
            Already have an account? <button type="button" className="link-btn" onClick={() => setMode('login')}>Login</button>
          </p>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
      {status && <p className="status-text">{status}</p>}
    </div>
  );
}

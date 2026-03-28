import { useState } from 'react';

export default function AuthForm({ onAuth, availableCountries, users }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSocialLogin = (provider) => {
    setStatus('Processing...');
    setError('');

    setTimeout(() => {
      if (provider === 'google') {
        const googleUser = users.find((u) => u.email.toLowerCase().endsWith('@gmail.com'));
        if (googleUser) {
          onAuth(googleUser);
          setStatus('Logged in with Google successfully!');
          return;
        }
        setError('No Google user found. Please register with a Gmail address first.');
      } else if (provider === 'facebook') {
        const facebookUser = users.find((u) => u.facebookUrl || u.facebookUrl || u.email.toLowerCase().includes('facebook'));
        if (facebookUser) {
          onAuth(facebookUser);
          setStatus('Logged in with Facebook successfully!');
          return;
        }
        setError('No Facebook user found. Please register with your Facebook profile link first.');
      }
      setStatus('');
    }, 300);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Processing...');

    setTimeout(() => {
      if (mode === 'login') {
        const hash = btoa(username + password); // Simple client-side hash sim
        const found = users.find((u) => u.username === username && u.hashedPassword === hash);
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
          const hash = btoa(username + password); // Simple client-side hash sim
          const newUser = {
            id: users.length + 1,
            username,
            email,
            hashedPassword: hash,
            country,
            idNumber,
            whatsapp,
            facebookUrl,
          };
          // Return immutable copy to parent
          onAuth(newUser);
          setStatus('Account created and logged in!');
          setError('');
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

            <label htmlFor="auth-facebook">Facebook profile link</label>
            <input id="auth-facebook" type="url" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="https://www.facebook.com/yourprofile" />
          </>
        )}

        <label htmlFor="auth-password">Password</label>
        <input id="auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />

        <button type="submit" className="ad-cta">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>

      {mode === 'login' && (
        <div className="social-login-buttons">
          <button type="button" className="social-btn google" onClick={() => handleSocialLogin('google')}>Login with Google</button>
          <button type="button" className="social-btn facebook" onClick={() => handleSocialLogin('facebook')}>Login with Facebook</button>
        </div>
      )}

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

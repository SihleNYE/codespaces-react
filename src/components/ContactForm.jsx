import { useState } from 'react';

export default function ContactForm({ activeUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!activeUser) {
      setStatus('Please log in to contact the seller.');
      return;
    }

    setStatus('Sending message...');

    setTimeout(() => {
      setStatus(`Message sent successfully as ${activeUser.username}! Seller will contact you shortly.`);
      setName('');
      setEmail('');
      setMessage('');
    }, 500);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Your Name
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Doe" />
      </label>

      <label htmlFor="email">
        Email Address
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jane@example.com" />
      </label>

      <label htmlFor="message">
        Message
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tell us about your campaign and timeline" rows="4" />
      </label>

      <button type="submit" className="ad-cta">Submit Inquiry</button>
      {status && <p className="status-text">{status}</p>}
    </form>
  );
}

import { useState } from 'react';

export default function ContactOptions({ user }) {
  const [method, setMethod] = useState('');

  if (!user) return null;

  const contactValues = [
    { id: 'email', label: 'Email', url: `mailto:${user.email}` },
    { id: 'whatsapp', label: 'WhatsApp', url: `https://wa.me/${user.whatsapp.replace(/\D/g, '')}` },
    { id: 'facebook', label: 'Facebook', url: `https://facebook.com/${user.facebook}` },
  ];

  const handleGo = () => {
    if (!method) return;
    const selected = contactValues.find((item) => item.id === method);
    if (selected) {
      window.open(selected.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="contact-dropdown-wrapper">
      <select value={method} onChange={(e) => setMethod(e.target.value)} className="contact-select">
        <option value="">Contact via...</option>
        {contactValues.map((item) => (
          <option key={item.id} value={item.id}>{item.label}</option>
        ))}
      </select>
      <button type="button" className="contact-go-btn" onClick={handleGo} disabled={!method}>Go</button>
    </div>
  );
}

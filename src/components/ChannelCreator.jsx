import { useState } from 'react';

export default function ChannelCreator({ activeUser, onCreate }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !bio || !city || !country) {
      setStatus('All fields are required to create your channel.');
      return;
    }
    onCreate({ name, bio, city, country });
    setStatus(`Channel created for ${activeUser.username}!`);
    setName('');
    setBio('');
    setCity('');
    setCountry('');
  };

  return (
    <form className="channel-create-form" onSubmit={handleSubmit}>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Bio</label>
      <input value={bio} onChange={(e) => setBio(e.target.value)} />
      <label>City</label>
      <input value={city} onChange={(e) => setCity(e.target.value)} />
      <label>Country</label>
      <input value={country} onChange={(e) => setCountry(e.target.value)} />
      <button type="submit" className="ad-cta">Create Channel</button>
      {status && <p className="status-text">{status}</p>}
    </form>
  );
}

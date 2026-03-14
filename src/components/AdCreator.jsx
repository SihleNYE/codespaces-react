import { useState } from 'react';

export default function AdCreator({ owner, onAddAd }) {
  const [ad, setAd] = useState({
    title: '',
    description: '',
    category: 'brand',
    tags: '',
    priceUsd: 0,
    cta: 'Contact now',
    src: '',
  });
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!ad.title || !ad.description) {
      setStatus('Title and description are required.');
      return;
    }
    onAddAd({
      owner,
      ...ad,
      tags: ad.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setStatus('Ad created successfully.');
    setAd({ title: '', description: '', category: 'brand', tags: '', priceUsd: 0, cta: 'Contact now', src: '' });
  };

  return (
    <form className="ad-create-form" onSubmit={submit}>
      <h4>Create a new ad</h4>
      <input placeholder="Ad title" value={ad.title} onChange={(e) => setAd((p) => ({ ...p, title: e.target.value }))} required />
      <input placeholder="Video URL" value={ad.src} onChange={(e) => setAd((p) => ({ ...p, src: e.target.value }))} />
      <input placeholder="Category" value={ad.category} onChange={(e) => setAd((p) => ({ ...p, category: e.target.value }))} />
      <input placeholder="Tags (comma-separated)" value={ad.tags} onChange={(e) => setAd((p) => ({ ...p, tags: e.target.value }))} />
      <textarea placeholder="Description" value={ad.description} onChange={(e) => setAd((p) => ({ ...p, description: e.target.value }))} required rows={3} />
      <input type="number" placeholder="Price USD" value={ad.priceUsd} onChange={(e) => setAd((p) => ({ ...p, priceUsd: Number(e.target.value) }))} />
      <input placeholder="CTA text" value={ad.cta} onChange={(e) => setAd((p) => ({ ...p, cta: e.target.value }))} />
      <button type="submit" className="ad-cta">Create Ad</button>
      {status && <p className="status-text">{status}</p>}
    </form>
  );
}

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
      <input placeholder="Video URL (YouTube, TikTok, IG, FB, Pinterest, MP4)" value={ad.src} onChange={(e) => setAd((p) => ({ ...p, src: e.target.value }))} />
      <small style="display:block;color:#666;font-size:0.8em;margin-top:-0.5rem;margin-bottom:1rem;">Ex: https://youtube.com/watch?v=ABC, tiktok.com/@user/video/123, instagram.com/reel/DEF</small>

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

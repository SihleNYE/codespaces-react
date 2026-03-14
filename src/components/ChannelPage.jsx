import { useState } from 'react';
import ContactOptions from './ContactOptions';

export default function ChannelPage({ channel, ads = [], activeUser, onCategorySelect, onChannelSelect, onAddAd, onUpdateAd, onDeleteAd, channelByUser, userByUsername, formatPriceForCountry }) {
  if (!channel) {
    return (
      <section className="channel-page" id="channel">
        <h2>Channel not found</h2>
        <p>The requested channel does not exist. Please choose another channel.</p>
      </section>
    );
  }

  const isOwner = activeUser?.username === channel?.user;
  const [newPost, setNewPost] = useState({ title: '', description: '', category: 'brand', tags: '', priceUsd: 0, cta: 'Contact' });
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPost, setEditPost] = useState({ title: '', description: '', category: 'brand', tags: '', priceUsd: 0, cta: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description) return;
    onAddAd({
      owner: channel.user,
      ...newPost,
      tags: newPost.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setNewPost({ title: '', description: '', category: 'brand', tags: '', priceUsd: 0, cta: 'Contact' });
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    if (!editPost.title || !editPost.description) return;
    onUpdateAd(editingPostId, {
      ...editPost,
      tags: editPost.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setEditingPostId(null);
    setEditPost({ title: '', description: '', category: 'brand', tags: '', priceUsd: 0, cta: '' });
  };

  const filteredAds = ads
    .filter((ad) => {
      const term = searchTerm.toLowerCase();
      return (
        ad.title.toLowerCase().includes(term)
        || ad.description.toLowerCase().includes(term)
        || (ad.tags || []).some((tag) => tag.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => {
      if (sortOption === 'newest') return b.id - a.id;
      if (sortOption === 'oldest') return a.id - b.id;
      if (sortOption === 'price-asc') return (a.priceUsd || 0) - (b.priceUsd || 0);
      if (sortOption === 'price-desc') return (b.priceUsd || 0) - (a.priceUsd || 0);
      return 0;
    });

  return (
    <section className="channel-page" id="channel">
      <h2>{channel.name}</h2>
      <p>{channel.bio}</p>
      <p>{channel.city}, {channel.country} • Showing {ads.length} ads from this channel</p>

      {isOwner && (
        <section className="channel-management">
          <h3>Your channel management</h3>
          <form className="channel-creat-post" onSubmit={handleCreatePost}>
            <input placeholder="Post title" value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} required />
            <input placeholder="Category" value={newPost.category} onChange={(e) => setNewPost((p) => ({ ...p, category: e.target.value }))} />
            <input placeholder="Tags (comma-separated)" value={newPost.tags} onChange={(e) => setNewPost((p) => ({ ...p, tags: e.target.value }))} />
            <textarea placeholder="Post description" rows="3" value={newPost.description} onChange={(e) => setNewPost((p) => ({ ...p, description: e.target.value }))} required />
            <input type="number" placeholder="Price USD" value={newPost.priceUsd} onChange={(e) => setNewPost((p) => ({ ...p, priceUsd: Number(e.target.value) }))} />
            <input placeholder="CTA text" value={newPost.cta} onChange={(e) => setNewPost((p) => ({ ...p, cta: e.target.value }))} />
            <button type="submit" className="ad-cta">Add Post</button>
          </form>
          {editingPostId !== null && (
            <form className="channel-creat-post" onSubmit={handleUpdatePost}>
              <h4>Edit post</h4>
              <input placeholder="Post title" value={editPost.title} onChange={(e) => setEditPost((p) => ({ ...p, title: e.target.value }))} required />
              <input placeholder="Category" value={editPost.category} onChange={(e) => setEditPost((p) => ({ ...p, category: e.target.value }))} />
              <input placeholder="Tags (comma-separated)" value={editPost.tags} onChange={(e) => setEditPost((p) => ({ ...p, tags: e.target.value }))} />
              <textarea placeholder="Post description" rows="3" value={editPost.description} onChange={(e) => setEditPost((p) => ({ ...p, description: e.target.value }))} required />
              <input type="number" placeholder="Price USD" value={editPost.priceUsd} onChange={(e) => setEditPost((p) => ({ ...p, priceUsd: Number(e.target.value) }))} />
              <input placeholder="CTA text" value={editPost.cta} onChange={(e) => setEditPost((p) => ({ ...p, cta: e.target.value }))} />
              <button type="submit" className="ad-cta">Save changes</button>
              <button type="button" className="link-btn" onClick={() => setEditingPostId(null)}>Cancel edit</button>
            </form>
          )}
        </section>
      )}

      <section className="channel-posts">
        <h3>Posts by {channel.name}</h3>
        {ads.length === 0 ? <p>No posts yet. Check back for campaigns soon.</p> : <p>{ads.length} campaign post(s) in total; {filteredAds.length} item(s) shown.</p>}
        <div className="channel-search-sort">
          <input type="search" placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </select>
        </div>
      </section>

      <div className="ad-grid">
        {filteredAds.map((ad) => {
          const ownerInfo = channelByUser[ad.owner] || {};
          const location = ownerInfo.city && ownerInfo.country ? `${ownerInfo.city}, ${ownerInfo.country}` : 'Location unknown';
          return (
            <article className="ad-card" key={ad.id}>
              <video className="ad-video" src={ad.src} controls muted loop playsInline />
              <div className="ad-body">
                <div className="ad-tags">
                  <button type="button" className="ad-tag ad-tag-action" onClick={() => { if (onChannelSelect) { const activeChannelInfo = channelByUser[ad.owner]; if (activeChannelInfo) onChannelSelect(activeChannelInfo); } }}>
                    Channel: {ad.owner}
                  </button>
                  <button type="button" className="ad-tag ad-tag-action" onClick={() => onCategorySelect && onCategorySelect(ad.category)}>
                    Category: {ad.category}
                  </button>
                  <span className="ad-tag">{location}</span>
                </div>
                <h3>{ad.title}</h3>
                {ad.tags && (
                  <div className="ad-keywords">
                    {ad.tags.map((tag) => <span key={`${ad.id}-${tag}`} className="ad-tag">{tag}</span>)}
                  </div>
                )}
                <p>{ad.description}</p>
                <p className="ad-price">Price: {formatPriceForCountry(ad.priceUsd, activeUser?.country || 'South Africa')}</p>
                <ContactOptions user={userByUsername[ad.owner]} />
                <button type="button" className="ad-cta">{ad.cta}</button>
                <a href="#contact" className="contact-link">Contact Seller</a>
                {isOwner && (
                  <div className="post-controls">
                    <button type="button" className="link-btn" onClick={() => {
                      setEditingPostId(ad.id);
                      setEditPost({
                        title: ad.title,
                        description: ad.description,
                        category: ad.category,
                        tags: (ad.tags || []).join(', '),
                        priceUsd: ad.priceUsd || 0,
                        cta: ad.cta,
                      });
                    }}>
                      Edit
                    </button>
                    <button type="button" className="link-btn" onClick={() => onDeleteAd(ad.id)}>Delete</button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

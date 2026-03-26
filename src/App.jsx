import { useState, useEffect } from 'react';
import './App.css';
import { channels as initialChannels, ads as initialAds, availableCountries, users } from './data';
import { formatPriceForCountry } from './utils/currency';
import AuthForm from './components/AuthForm';
import ContactForm from './components/ContactForm';
import ContactOptions from './components/ContactOptions';
import AdCreator from './components/AdCreator';
import ChannelCreator from './components/ChannelCreator';
import ChannelPage from './components/ChannelPage';
import Nav from './components/Nav';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [channelList, setChannelList] = useState(initialChannels);
  const [adList, setAdList] = useState(initialAds);

  const channelByUser = Object.fromEntries(channelList.map((ch) => [ch.user, ch]));
  const userByUsername = Object.fromEntries(users.map((u) => [u.username, u]));

  const createChannel = ({ user, name, bio, city, country }) => {
    const newChannel = { user, name, bio, city, country };
    setChannelList((prev) => [...prev, newChannel]);
    setActiveChannel(newChannel);
  };

  const addAd = (ad) => {
    const nextId = Math.max(0, ...adList.map((a) => a.id)) + 1;
    setAdList((prev) => [...prev, { ...ad, id: nextId }]);
  };

  const updateAd = (id, updates) => {
    setAdList((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAd = (id) => {
    setAdList((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredAds = activeCategory === 'all'
    ? adList
    : adList.filter((ad) => ad.category === activeCategory);

  useEffect(() => {
    const renderChannelFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('channel-')) {
        const username = hash.replace('channel-', '');
        const channel = channelList.find((ch) => ch.user === username) || null;
        setActiveChannel(channel);
      } else {
        setActiveChannel(null);
      }
    };

    renderChannelFromHash();
    window.addEventListener('hashchange', renderChannelFromHash);
    return () => window.removeEventListener('hashchange', renderChannelFromHash);
  }, [channelList]);

  const handleChannelClick = (channel) => {
    window.location.hash = `#channel-${channel.user}`;
    setActiveChannel(channel);
  };

  return (
    <div className="App">
      <Nav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeChannel={activeChannel}
        channelList={channelList}
        activeUser={activeUser}
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        setActiveUser={setActiveUser}
        handleChannelClick={handleChannelClick}
        setActiveChannel={setActiveChannel}
      />

      {!activeUser && showAuth && (
        <section className="auth-section">
          <AuthForm onAuth={(user) => { setActiveUser(user); setShowAuth(false); }} availableCountries={availableCountries} users={users} />
        </section>
      )}

      {!activeChannel && (
        <>
          <header id="home" className="hero-header">
            <h1>Short-Form Video Ads Studio</h1>
            <p>Create, preview, and promote the best short videos for your brand audience.</p>
          </header>

          {activeUser && !channelByUser[activeUser.username] && (
            <section className="channel-create" aria-label="Create your channel">
              <h2>Create your own channel page</h2>
              <ChannelCreator activeUser={activeUser} onCreate={(data) => createChannel({ user: activeUser.username, ...data })} />
            </section>
          )}

          {activeUser && channelByUser[activeUser.username] && (
            <section className="ad-editor" aria-label="Create your ad">
              <h2>Create a new ad for your channel</h2>
              <AdCreator owner={activeUser.username} onAddAd={addAd} />
            </section>
          )}

          <section id="channels" className="channel-list" aria-label="Channel pages">
            <h2>Channels</h2>
            <div className="ad-grid">
              {channelList.map((channel) => (
                <article className="channel-card" key={channel.user}>
                  <h3>{channel.name}</h3>
                  <p>{channel.bio}</p>
                  <p>{channel.city}, {channel.country}</p>
                  <button type="button" className="ad-cta" onClick={() => handleChannelClick(channel)}>
                    View channel page
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section id="samples" className="ad-grid" aria-label="Video ad samples">
            {filteredAds.map((ad) => {
              const ownerInfo = channelByUser[ad.owner] || {};
              const location = ownerInfo.city && ownerInfo.country ? `${ownerInfo.city}, ${ownerInfo.country}` : 'Location unknown';
              return (
                <article className="ad-card" key={ad.id}>
                  <video className="ad-video" src={ad.src} controls muted loop playsInline />
                  <div className="ad-body">
                    <div className="ad-tags">
                      <button type="button" className="ad-tag ad-tag-action" onClick={() => { if (channelByUser[ad.owner]) handleChannelClick(channelByUser[ad.owner]); }}>
                        Channel: {ad.owner}
                      </button>
                      <button type="button" className="ad-tag ad-tag-action" onClick={() => setActiveCategory(ad.category)}>
                        Category: {ad.category}
                      </button>
                      <span className="ad-tag">{location}</span>
                    </div>
                    <h2>{ad.title}</h2>
                    <div className="ad-keywords">
                      {(ad.tags || []).map((tag) => <span key={`${ad.id}-${tag}`} className="ad-tag">{tag}</span>)}
                    </div>
                    <p>{ad.description}</p>
                    <p className="ad-price">Price: {formatPriceForCountry(ad.priceUsd, activeUser?.country || 'South Africa')}</p>
                    <ContactOptions user={userByUsername[ad.owner]} />
                    <button type="button" className="ad-cta">{ad.cta}</button>
                    <a href="#contact" className="contact-link">Contact Seller</a>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      )}

      {activeChannel && (
        <>
          <div className="channel-back-link">
            <a href="#home" onClick={() => setActiveChannel(null)}>← Back to all ads</a>
          </div>
          <ChannelPage
            channel={activeChannel}
            ads={adList.filter((ad) => ad.owner === activeChannel.user)}
            activeUser={activeUser}
            onCategorySelect={setActiveCategory}
            onChannelSelect={handleChannelClick}
            onAddAd={addAd}
            onUpdateAd={updateAd}
            onDeleteAd={deleteAd}
            channelByUser={channelByUser}
            userByUsername={userByUsername}
            formatPriceForCountry={formatPriceForCountry}
          />
        </>
      )}

      <section id="about" className="info-panel">
        <h2>About This Studio</h2>
        <p>Use this studio to plan ad campaigns with quick social-ready clips, CTA hooks, and analytics-ready creative inspiration.</p>
      </section>

      <section id="contact" className="info-panel">
        <h2>Contact Us</h2>
        <p>Fill in your info and message, and a seller will reach out with a campaign estimate.</p>
        {!activeUser ? (
          <div className="auth-required">
            <p>You must be logged in to contact a seller.</p>
            <button className="login-btn" type="button" onClick={() => setShowAuth(true)}>Login / Register</button>
          </div>
        ) : (
          <ContactForm activeUser={activeUser} />
        )}
      </section>

      <footer className="app-footer">
        <p>Made with React • Built for short video advertising campaigns</p>
      </footer>
    </div>
  );
}

export default App;

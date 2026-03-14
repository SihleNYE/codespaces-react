import React from 'react';

const Nav = ({
  activeCategory,
  setActiveCategory,
  activeChannel,
  channelList,
  activeUser,
  showAuth,
  setShowAuth,
  setActiveUser,
  handleChannelClick,
  setActiveChannel,
}) => {
  return (
    <nav className="top-nav">
      <div className="brand">AdVids</div>
      <ul className="nav-links">
        <li><a href="#home" aria-label="Home" title="Home"><i className="bi bi-house"></i></a></li>\n        <li><a href="#channels" aria-label="Channels" title="Channels"><i className="bi bi-tv"></i></a></li>\n        <li><a href="#samples" aria-label="Samples" title="Samples"><i className="bi bi-play-circle"></i></a></li>\n        <li><a href="#about" aria-label="About" title="About"><i className="bi bi-info-circle"></i></a></li>\n        <li><a href="#contact" aria-label="Contact" title="Contact"><i className="bi bi-envelope"></i></a></li>\n      </ul>

      {activeUser ? (
        <div className="user-status">
          <span>Welcome, {activeUser.username}</span>
          <button
            type="button"
            className="logout-btn"
            onClick={() => {
              setActiveUser(null);
              setShowAuth(false);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="login-btn"
          type="button"
          onClick={() => setShowAuth((v) => !v)}
        >
          {showAuth ? 'Close' : 'Login / Register'}
        </button>
      )}

      <div className="filter-controls">
        <div className="channel-dropdown">
          <label htmlFor="channel-select">Channel</label>
          <select
            id="channel-select"
            value={activeChannel?.user || 'none'}
            onChange={(e) => {
              const selectedUser = e.target.value;
              if (selectedUser === 'none') {
                window.location.hash = '#home';
                setActiveChannel(null);
              } else {
                const channel = channelList.find((ch) => ch.user === selectedUser);
                if (channel) handleChannelClick(channel);
              }
            }}
          >
            <option value="none">Select channel</option>
            {channelList.map((channel) => (
              <option key={channel.user} value={channel.user}>{channel.name}</option>
            ))}
          </select>
        </div>

        <div className="category-dropdown">
          <label htmlFor="category-select">Category</label>
          <select
            id="category-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            aria-label="Filter ads by category"
          >
            <option value="all">All</option>
            <option value="brand">Brand</option>
            <option value="social">Social</option>
            <option value="conversion">Conversion</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

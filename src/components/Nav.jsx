import React from "react";

const Nav = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 flex-row">
      <div className="container-fluid">
        
        {/* Brand */}
        <a className="navbar-brand" href="#home" aria-label="Home" title="Home">
          WYKapp
        </a>

        {/* Toggler (burger menu) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Nav links (centered) */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {/* Example nav items */}
            {/* <li className="nav-item">
              <a className="nav-link" href="#channels">
                <i className="bi bi-tv"></i>
              </a>
            </li> */}
          </ul>

          {/* Right side controls */}
          <div className="d-flex align-items-center gap-3">
            {activeUser ? (
              <div className="d-flex align-items-center gap-2">
                <span className="navbar-text">Welcome, {activeUser.username}</span>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
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
                className="btn btn-primary btn-sm"
                type="button"
                onClick={() => setShowAuth((v) => !v)}
              >
                {showAuth ? "Close" : "Login / Register"}
              </button>
            )}

            <div className="input-group input-group-sm">
              <span className="input-group-text">Search</span>
              <input
                id="search-input"
                type="search"
                className="form-control"
                placeholder="Search category, channel, user, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

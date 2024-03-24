import React from "react";

function NavigationMenu({ onNavItemClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Digitbank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#" onClick={() => onNavItemClick("home")}>
            Home
          </a>
          <a className="nav-item nav-link" href="#" onClick={() => onNavItemClick("account")}>
            Account
          </a>
          <a className="nav-item nav-link" href="#" onClick={() => onNavItemClick("deposit")}>
            Deposit
          </a>
          <a className="nav-item nav-link" href="#" onClick={() => onNavItemClick("withdraw")}>
            Withdraw
          </a>
          <a className="nav-item nav-link" href="#" onClick={() => onNavItemClick("transfer")}>
            Transfer
          </a>
          <a className="nav-item nav-link" href="#" onClick={() => onNavItemClick("zelle")}>
            Zelle
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;

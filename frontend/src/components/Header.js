import * as React from 'react';

function Header(props) {
    return (
        <header className="App-header">
            <img src={props.logoSrc} className="App-logo" alt="logo" />
            <h1 className="App-title">{props.pageTitle}</h1>
        </header>
    );
}

export default Header;
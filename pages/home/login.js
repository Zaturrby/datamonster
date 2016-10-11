import React from 'react';
import Auth0Lock from 'auth0-lock';
import beautify from 'json-beautify';
import s from './styles.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    // Create state
    this.state = {
      profiles: [],
    };

    // Create lock
    this.startLock();

    // bind functions
    this.showLock = this.showLock.bind(this);
  }

  startLock() {
    const clientId = 'mOv88PnO1xnL94OEgbHtKJYMalTuF3HO';
    const domain = 'rjkorteschiel.eu.auth0.com';
    this.lock = new Auth0Lock(clientId, domain);

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log('error!!');
          return;
        }

        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        console.log(profile);

        this.setState((prevState) => {
          const newState = prevState;
          newState.profiles.push(profile);
        });
      });
    });
  }

  showLock() {
    this.lock.show();
  }

  render() {
    return (
      <div className="login-box">
        <a className={s.login} onClick={this.showLock}>Feed me!</a>
        <pre><code>{beautify(this.state.profiles, null, 2, 100)}</code></pre>
      </div>);
  }
}

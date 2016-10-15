import React from 'react';
import Auth0Lock from 'auth0-lock';
import beautify from 'json-beautify';
import s from './styles.css';
import firebase from 'firebase';
import logo from '../../components/Layout/d66.png';

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

  writeFirebase(userId, data) {
    const config = {
      apiKey: 'AIzaSyCjf-xIAycx7T8FeAj4GAvUUOtO4xGu4Wc',
      authDomain: 'aimsterdam-fd783.firebaseapp.com',
      databaseURL: 'https://aimsterdam-fd783.firebaseio.com',
      storageBucket: '',
      messagingSenderId: '1059346975225',
    };
    firebase.initializeApp(config);
    firebase.database().ref(`users/${userId}`).set(data);
  }

  startLock() {
    const clientId = 'mOv88PnO1xnL94OEgbHtKJYMalTuF3HO';
    const domain = 'rjkorteschiel.eu.auth0.com';
    const auth0opts = {
      theme: { logo },
      languageDictionary: {
        title: 'AImsterdam',
      },
    };

    this.lock = new Auth0Lock(clientId, domain, auth0opts);

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log('error!!');
          return;
        }

        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        console.log(profile.user_id, profile);

        this.writeFirebase(profile.user_id, profile);

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
      <div className={s.loginBox}>
        <a className={s.login} onClick={this.showLock}>
          {(this.state.profiles.length === 0) ? 'Aanmelden' : 'Bedankt!'}
        </a>
        {this.props.viewer &&
          <pre className={s.dataBox}>
            <code>{beautify(this.state.profiles, null, 2, 60)}</code>
          </pre>}
      </div>);
  }
}

import React from 'react';
import Auth0Lock from 'auth0-lock';
import beautify from 'json-beautify';
import s from './styles.css';
import firebase from 'firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    // Create state
    this.state = {
      profiles: [],
    };

    // Create lock
    this.startLock();
    this.startFirebase();

    // bind functions
    this.showLock = this.showLock.bind(this);
  }

  startFirebase() {
    const config = {
      apiKey: 'AIzaSyCjf-xIAycx7T8FeAj4GAvUUOtO4xGu4Wc',
      authDomain: 'aimsterdam-fd783.firebaseapp.com',
      databaseURL: 'https://aimsterdam-fd783.firebaseio.com',
      storageBucket: '',
      messagingSenderId: '1059346975225',
    };

    firebase.initializeApp(config);
    const database = firebase.database();
  }

  writeUserData(userId, data) {
    firebase.database().ref(`users/${userId}`).set(data);
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
        console.log(profile.user_id, profile);

        this.writeUserData(profile.user_id, profile);

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
        <a className={s.login} onClick={this.showLock}>Aanmelden</a>
        {/* <pre className={s.dataBox}><code>{beautify(this.state.profiles, null, 2, 60)}</code></pre> */}
      </div>);
  }
}
import { firebaseRef } from 'core/firebase';


function authenticate(provider) {
  firebaseRef.authWithOAuthPopup(provider, error => {
    if (error) console.error('ERROR @ AuthActions#authenticate :', error); // eslint-disable-line no-console
  });
}

export function signInWithGithub() {
  authenticate('github');
}

export function signInWithGoogle() {
  authenticate('google');
}

export function signInWithTwitter() {
  authenticate('twitter');
}

export function signOut() {
  firebaseRef.unauth();
}

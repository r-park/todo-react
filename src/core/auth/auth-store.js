import EventSignal from 'event-signal';
import { firebaseRef } from 'core/firebase';
import { AuthUser } from './auth-user';


export class AuthStore {
  constructor(emitter, ref) {
    this.emitter = emitter;

    this.ref = ref;
    this.ref.onAuth(this.onAuth.bind(this));

    this.authData = this.ref.getAuth();
  }

  get authenticated() {
    return this.authData !== null && !this.expired;
  }

  get expired() {
    return !this.authData || (this.authData.expires * 1000) < Date.now();
  }

  get state() {
    return {
      authenticated: this.authenticated,
      user: this.user
    };
  }

  addListener(listener, context) {
    this.emitter.addListener(listener, context);
  }

  removeListener(listener) {
    this.emitter.removeListener(listener);
  }

  emit() {
    this.emitter.emit(this.state);
  }

  onAuth(authData) {
    if (authData) {
      this.user = new AuthUser(authData);
    }
    this.authData = authData;
    this.emit();
  }
}


export const authStore = new AuthStore(new EventSignal(), firebaseRef);

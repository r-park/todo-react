import { expect } from 'chai';
import { authActions } from 'core/auth';
import { firebaseRef } from 'core/firebase';


describe('Auth Actions', () => {
  beforeEach(() => {
    sinon.spy(firebaseRef, 'authWithOAuthPopup');
    sinon.spy(firebaseRef, 'unauth');
  });

  afterEach(() => {
    firebaseRef.authWithOAuthPopup.restore();
    firebaseRef.unauth.restore();
  });


  describe('signInWithGithub', () => {
    it('should invoke Firebase#authWithOAuthPopup', () => {
      authActions.signInWithGithub();
      expect(firebaseRef.authWithOAuthPopup.callCount).to.equal(1);
    });

    it('should pass `github` to Firebase#authWithOAuthPopup', () => {
      authActions.signInWithGithub();
      expect(firebaseRef.authWithOAuthPopup.calledWith('github')).to.equal(true);
    });
  });


  describe('signInWithGoogle', () => {
    it('should invoke Firebase#authWithOAuthPopup', () => {
      authActions.signInWithGoogle();
      expect(firebaseRef.authWithOAuthPopup.callCount).to.equal(1);
    });

    it('should pass `google` to Firebase#authWithOAuthPopup', () => {
      authActions.signInWithGoogle();
      expect(firebaseRef.authWithOAuthPopup.calledWith('google')).to.equal(true);
    });
  });


  describe('signInWithTwitter', () => {
    it('should invoke Firebase#authWithOAuthPopup', () => {
      authActions.signInWithTwitter();
      expect(firebaseRef.authWithOAuthPopup.callCount).to.equal(1);
    });

    it('should pass `twitter` to Firebase#authWithOAuthPopup', () => {
      authActions.signInWithTwitter();
      expect(firebaseRef.authWithOAuthPopup.calledWith('twitter')).to.equal(true);
    });
  });


  describe('signInWithTwitter', () => {
    it('should invoke Firebase#unauth', () => {
      authActions.signOut();
      expect(firebaseRef.unauth.callCount).to.equal(1);
    });
  });
});

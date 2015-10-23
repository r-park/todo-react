export class AuthUser {
  constructor(authData) {
    let profile = authData[authData.provider];

    this.displayName = profile.displayName;
    this.id = authData.uid;
    this.profileImageUrl = profile.profileImageUrl;
  }
}

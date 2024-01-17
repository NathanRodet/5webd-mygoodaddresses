export type FirebaseDefaultUser = {
  uid: string;
  email: string;
  emailVerified: boolean | null;
  isAnonymous: boolean | null;
  metadata: object | null;
  providerData: object | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

export type Avatar = {
  url: string;
}

export type DatUserData = {
  id: string;
  lastLogin: string;
  lastAuth: string;
};

export type BungieUserResponse = {
  Response: BungieUserData;
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: 'Success' | 'Error';
};

export type BungieUserData = {
  membershipId: string;
  uniqueName: string;
  displayName: string;
  profilePicture: number;
  profileTheme: number;
  userTitle: number;
  about: string;
  locale: string;
  profilePicturePath: string;
  statusText: string;
};

export type UserData = {
  datUserData: DatUserData;
  bungieNetUser: BungieUserData;
};

export type UserResponse = {
  data: UserData;
};

export type UserErrorResponse = {
  error: string;
};

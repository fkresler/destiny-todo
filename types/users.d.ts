export type DatUserData = {
  id: string;
  lastLogin: string;
  lastAuth: string;
};

export type BungieUserData = {};

export type UserData = DatUserData & BungieUserData;

export type UserResponse = {
  data: UserData;
};

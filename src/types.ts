export type IInitializedProfile = {
  CleverTapID: string;
};

export type IUser = {
  Identity: string;
  Phone: string;
  'MSG-push'?: boolean;
};

export type IUseClevertap = {
  loginUser: (user: IUser) => void;
  loggedInUser: null | IUser;
  initializedProfile: null | IInitializedProfile;
  notificationPayload: null | any;
};
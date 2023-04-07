export type IInitializedProfile = {
  CleverTapID: string;
};

export type IUser = {
  Identity: string;
  Phone: string;
  'MSG-push'?: boolean;
};

export type IUseClevertap = {
  fetchClevertapID: () => void;
  loginUser: (user: IUser) => void;
};

export type IUseClevertapListeners = {};

export type IHome = {
  navigation: any;
  route: any;
};

export type IProfile = {
  navigation: any;
  route: any;
};

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
  sendEvent: () => void;
};

export type IUseClevertapListeners = {};

export type INavigator = {};

export type IHome = {
  navigation: any;
  route: any;
};

export type ISettings = {
  navigation: any;
  route: any;
};

export type IRedirect = {
  navigation: any;
  route: any;
};

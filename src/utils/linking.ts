import {
  getPathFromState as navigationGetPathFromState,
  getStateFromPath as navigationGetStateFromPath,
} from '@react-navigation/native';

const prefixes = ['pyypl://', 'https://pyypl.com', 'https://*.pyypl.com'];

const config = {
  screens: {
    Home: 'Home',
    Login: 'Login',
    Profile: {
      path: 'Profile',
      screens: {
        Settings: 'Settings',
        Language: 'Language',
      },
    },
    NotFound: '*',
  },
};

const homeState = {
  routes: [
    {
      name: 'Home',
      state: {
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      },
    },
  ],
};

export const linking = () => {
  return {
    prefixes,
    config,
    getStateFromPath: (path: any, options: any) => {
      // Implement your own logic here to fetch data asynchronously and return the navigation state object
      // Make sure to throw an error if the path is invalid or cannot be parsed
      const state = navigationGetStateFromPath(path, options);
      return state;
    },
    getPathFromState: (state: any, options: any) => {
      const path = navigationGetPathFromState(state, options);
      return path;
    },
  };
};

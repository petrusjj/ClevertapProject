import {
  getPathFromState as navigationGetPathFromState,
  getStateFromPath as navigationGetStateFromPath,
} from '@react-navigation/native';
import {sleep} from './utils';

const prefixes = ['pyypl://', 'https://pyypl.com', 'https://*.pyypl.com'];

const config = {
  screens: {
    Home: {
      path: 'home/:id?',
      parse: {
        id: (id: string) => {
          console.log('parse home screen id', id);
          return `id-${id}`;
        },
      },
      stringify: {
        id: (id: string) => {
          console.log('stringify home screen id', id);
          return id.replace(/^id-/, '');
        },
      },
    },
    Profile: {
      initialRouteName: 'Home',
      path: 'profile/:id?',
      parse: {
        id: (id: string) => {
          console.log('parse profile screen id', id);
          return `id-${id}`;
        },
      },
      stringify: {
        id: (id: string) => {
          console.log('stringify profile screen id', id);
          return id.replace(/^id-/, '');
        },
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

export const linking = (user: any) => {
  return {
    prefixes,
    config,
    getStateFromPath: (path: any, options: any) => {
      // Implement your own logic here to fetch data asynchronously and return the navigation state object
      // Make sure to throw an error if the path is invalid or cannot be parsed
      console.log('getStateFromPath user', user);
      let state = navigationGetStateFromPath(path, options);
      console.log('getStateFromPath state', state);
      if (user) {
        return state;
      }
      return homeState;
    },
    getPathFromState: (state: any, options: any) => {
      console.log('getPathFromState params', state, options);
      // Return a path string here
      // You can also reuse the default logic by importing `getPathFromState` from `@react-navigation/native`
      const path = navigationGetPathFromState(state, options);
      console.log('getPathFromState path', path);
      return path;
    },
  };
};

export const linking = {
  prefixes: ['pyypl://', 'https://pyypl.com', 'https://*.pyypl.com'],
  config: {
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
  },
};

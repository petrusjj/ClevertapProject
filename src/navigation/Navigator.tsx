import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {AppState, Linking} from 'react-native';
import Loader from '../components/Loader';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound';
import Profile from '../screens/Profile';
import {linking as linkingConfiguration} from '../utils/linking';
import {sleep} from '../utils/utils';

const Stack = createStackNavigator();

const Navigator = () => {
  const [linking, setLinking] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  const handleDeepLink = async (event: any) => {
    console.log('handleDeepLink', event);
    const url = event?.url;

    let loggedIn = false;

    if (url) {
      setLinking(null); // reset

      // check if allowed
      await sleep(2000);
      loggedIn = true;

      setAuthenticated(loggedIn);
    }

    const obj = linkingConfiguration(loggedIn);
    setLinking(obj);
  };

  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url: any) => {
      handleDeepLink({url});
    });
    return () => {
      linkingEvent.remove();
    };
  }, []);

  if (linking === null) {
    return <Loader />;
  }

  console.log('render Navigator.tsx', linking);

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        {authenticated ? (
          <Stack.Screen name="Profile" component={Profile} />
        ) : null}
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

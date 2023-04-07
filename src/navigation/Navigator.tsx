import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {AppState, Linking} from 'react-native';
import Loader from '../components/Loader';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound';
import Profile from '../screens/Profile';
import {linking} from '../utils/linking';
import {INavigator} from '../utils/types';

console.log('linking initial', linking);

const Stack = createStackNavigator();

const Navigator = (props: INavigator) => {
  console.log('render Navigator.tsx', props);

  const appState = useRef(AppState.currentState);

  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDeepLink = async () => {
    const link = await Linking.getInitialURL();
    console.log('link', link);

    // setAuthenticated(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    handleDeepLink();

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: any) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          handleDeepLink();
        }

        appState.current = nextAppState;
        console.log('AppState', appState.current);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

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

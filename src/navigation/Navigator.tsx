import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Loader from '../components/Loader';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound';
import {linking as linkingConfiguration} from '../utils/linking';
import ProfileNavigator from './ProfileNavigator';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const Navigator = () => {
  const linking = linkingConfiguration();

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={ProfileNavigator} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

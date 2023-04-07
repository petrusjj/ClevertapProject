import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Loader from '../components/Loader';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import {linking} from '../utils/linking';
import NotFound from '../screens/NotFound';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

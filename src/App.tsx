import React from 'react';
import Navigator from './navigation/Navigator';

import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useClevertapListeners from './hooks/useClevertapListeners';

const App = () => {
  useClevertapListeners();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Navigator />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

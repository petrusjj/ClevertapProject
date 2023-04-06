import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {lucas, petrus} from './data';
import useClevertap from './useClevertap';

const App = () => {
  const {loginUser, loggedInUser} = useClevertap();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        {loggedInUser === null ? null : (
          <Text>{JSON.stringify(loggedInUser)}</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => loginUser(petrus)}>
          <Text style={styles.buttonText}>Login user Petrus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => loginUser(lucas)}>
          <Text style={styles.buttonText}>Login user Lucas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  buttonText: {
    color: 'black',
  },
});

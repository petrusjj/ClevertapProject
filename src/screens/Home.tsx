import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {lucas, petrus} from '../utils/data';
import useClevertap from '../hooks/useClevertap';
import {IHome} from '../utils/types';

const Home = (props: IHome) => {
  const {route} = props;
  console.log('render Home.tsx', route);

  const {fetchClevertapID, loginUser} = useClevertap();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={fetchClevertapID}>
          <Text style={styles.buttonText}>Get Clevertap ID</Text>
        </TouchableOpacity>
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

export default Home;

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
  info: {
    width: 400,
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: 'black',
  },
});

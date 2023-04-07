import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IProfile} from '../utils/types';

const NotFound = (props: IProfile) => {
  const {route} = props;
  console.log('render NotFound.tsx', route);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not found</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});

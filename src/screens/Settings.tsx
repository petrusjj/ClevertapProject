import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ISettings} from '../utils/types';

const Settings = (props: ISettings) => {
  const {route} = props;
  console.log('render Settings.tsx', route);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default Settings;

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

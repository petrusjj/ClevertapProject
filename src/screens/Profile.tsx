import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IProfile} from '../utils/types';

const Profile = (props: IProfile) => {
  const {route} = props;
  console.log('render Profile.tsx', route);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

export default Profile;

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

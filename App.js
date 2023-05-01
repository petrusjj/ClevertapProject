import React, {useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Text,
  StatusBar,
} from 'react-native';

// import DefaultPreference from 'react-native-default-preference';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const CleverTap = require('clevertap-react-native');

const appGroupIdentifier = 'group.com.pyypl.dev';

const App = () => {
  useEffect(() => {
    CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, e => {
      console.log('CleverTapPushNotificationClicked', e);
      Alert.alert(JSON.stringify(e));
    });
    return () => {
      CleverTap.removeListener(CleverTap.CleverTapPushNotificationClicked);
    };
  }, []);

  const login = async () => {
    const userId = 'e6c8ac1d-b830-4469-9596-bba81540513b';
    const phoneNumber = '+971544965779';
    await SharedGroupPreferences.setItem(
      'currentUser',
      {
        userId,
        phoneNumber,
      },
      appGroupIdentifier,
    );
    const user = {
      Identity: userId,
      Phone: phoneNumber,
    };
    CleverTap.onUserLogin(user);
    CleverTap.profileSet(user);
    CleverTap.registerForPush();
    CleverTap.getCleverTapID((err, res) => {
      console.log('getCleverTapID', res, err);
      Alert.alert(res);
    });
    // DefaultPreference.set(
    //   'currentUser',
    //   JSON.stringify({
    //     userId: 'e6c8ac1d-b830-4469-9596-bba81540513b',
    //     phoneNumber: '+971544965779',
    //   }),
    // );
  };

  const send = () => {
    console.log('FETCH_PROMOTION_DISPLAY');
    CleverTap.recordEvent('FETCH_PROMOTION_DISPLAY');
    Alert.alert('FETCH_PROMOTION_DISPLAY');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={send}>
        <Text>Send event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    height: 50,
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

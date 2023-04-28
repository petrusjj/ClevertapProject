import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

const CleverTap = require('clevertap-react-native');

const App = () => {
  useEffect(() => {
    CleverTap.registerForPush();

    CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, e => {
      console.log('CleverTapPushNotificationClicked', e);
    });

    return () => {
      CleverTap.removeListener(CleverTap.CleverTapPushNotificationClicked);
    };
  }, []);

  const login = () => {
    const user = {
      Identity: 'e6c8ac1d-b830-4469-9596-bba81540513b',
      Phone: '+971544965779',
    };

    CleverTap.onUserLogin(user);
    CleverTap.profileSet(user);

    CleverTap.getCleverTapID((err, res) => {
      console.log('getCleverTapID', res, err);
    });
  };

  const send = () => {
    CleverTap.recordEvent('FETCH_PROMOTION_DISPLAY');
  };

  return (
    <View style={styles.container}>
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
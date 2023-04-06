import {useEffect, useState} from 'react';
import {
  createNotificationChannel,
  enableDeviceNetworkInfoReporting,
  getCleverTapID,
  onUserLogin,
  profileGetProperty,
  profileSet,
  promptForPushPermission,
  registerForPush,
  setDebugLevel,
} from './clevertap';
import {IInitializedProfile, IUseClevertap, IUser} from './types';
import {Platform} from 'react-native';
import {sleep} from './utils';

const CleverTap = require('clevertap-react-native');

const {
  CleverTapProfileDidInitialize,
  CleverTapProfileSync,
  CleverTapPushNotificationClicked,
} = CleverTap;

const useClevertap = (): IUseClevertap => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [initializedProfile, setInitializedProfile] =
    useState<null | IInitializedProfile>(null);
  const [notificationPayload, setNotificationPayload] = useState<null | any>(
    null,
  );

  useEffect(() => {
    enableDeviceNetworkInfoReporting();
    setDebugLevel(3);
    promptForPushPermission(true);
    createNotificationChannel();

    console.log('listening to events...');

    CleverTap.addListener(CleverTapProfileDidInitialize, (event: any) => {
      console.log('CleverTapProfileDidInitialize', event);
      setInitializedProfile(event);

      registerForPush();
      getCleverTapID();
    });

    CleverTap.addListener(CleverTapProfileSync, (event: any) => {
      console.log('CleverTapProfileSync', event);
    });

    CleverTap.addListener(CleverTapPushNotificationClicked, (event: any) => {
      console.log('CleverTapPushNotificationClicked', event);
      const payload = Platform.OS === 'ios' ? event.customExtras : event;
      setNotificationPayload(payload);
    });

    return () => {
      console.log('unsubscribing from events...');
      CleverTap.removeListener(CleverTap.CleverTapProfileDidInitialize);
      CleverTap.removeListener(CleverTap.CleverTapProfileSync);
      CleverTap.removeListener(CleverTap.CleverTapPushNotificationClicked);
    };
  }, []);

  const loginUser = async (user: IUser) => {
    const signedInUserId = await profileGetProperty('Identity');
    console.log('signedin account', signedInUserId);
    if (signedInUserId !== user.Identity) {
      CleverTap.profileSet({
        'MSG-push': false,
      });
    }
    setLoggedInUser(user);
    onUserLogin(user);
    await sleep(2000);
    profileSet({...user, 'MSG-push': true});
  };

  return {loginUser, loggedInUser, initializedProfile, notificationPayload};
};

export default useClevertap;

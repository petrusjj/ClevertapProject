import {useEffect} from 'react';
import {
  createNotificationChannel,
  enableDeviceNetworkInfoReporting,
  promptForPushPermission,
  setDebugLevel,
} from '../utils/clevertap';
import {IUseClevertapListeners} from '../utils/types';

const CleverTap = require('clevertap-react-native');

const {
  CleverTapProfileDidInitialize,
  CleverTapProfileSync,
  CleverTapPushNotificationClicked,
} = CleverTap;

const useClevertapListeners = (): IUseClevertapListeners => {
  useEffect(() => {
    enableDeviceNetworkInfoReporting();
    setDebugLevel(3);
    // promptForPushPermission(true);
    createNotificationChannel();

    console.log('listening to Clevertap events...');

    CleverTap.addListener(CleverTapProfileDidInitialize, (event: any) => {
      console.log('CleverTapProfileDidInitialize', event);
    });

    CleverTap.addListener(CleverTapProfileSync, (event: any) => {
      console.log('CleverTapProfileSync', event);
    });

    CleverTap.addListener(
      CleverTapPushNotificationClicked,
      async (event: any) => {
        console.log('CleverTapPushNotificationClicked', event);
      },
    );

    return () => {
      console.log('unsubscribing from events...');
      CleverTap.removeListener(CleverTap.CleverTapProfileDidInitialize);
      CleverTap.removeListener(CleverTap.CleverTapProfileSync);
      CleverTap.removeListener(CleverTap.CleverTapPushNotificationClicked);
    };
  }, []);

  return {};
};

export default useClevertapListeners;

import {IUser} from './types';

const CleverTap = require('clevertap-react-native');

export const onUserLogin = (user: IUser) => {
  console.log('onUserLogin', user);
  CleverTap.onUserLogin(user);
};

export const profileSet = (user: IUser) => {
  console.log('profileSet', user);
  CleverTap.profileSet(user);
};

export const getCleverTapID = async () => {
  return new Promise((resolve, reject) => {
    CleverTap.getCleverTapID((err: any, res: any) => {
      console.log('getCleverTapID', res, err);
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};

export const profileGetProperty = async (prop: any) => {
  return new Promise((resolve, reject) => {
    CleverTap.profileGetProperty(prop, (err: any, res: any) => {
      console.log('profileGetProperty', res, err);
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};

export const registerForPush = () => {
  console.log('registerForPush');
  CleverTap.registerForPush();
};

export const enableDeviceNetworkInfoReporting = () => {
  console.log('enableDeviceNetworkInfoReporting');
  CleverTap.enableDeviceNetworkInfoReporting(true);
};

export const setDebugLevel = (level: number) => {
  console.log('setDebugLevel', 3);
  CleverTap.setDebugLevel(level);
};

export const promptForPushPermission = (showFallbackSettings: boolean) => {
  console.log('promptForPushPermission', showFallbackSettings);
  CleverTap.promptForPushPermission(showFallbackSettings);
};

export const createNotificationChannel = () => {
  console.log('createNotificationChannel');
  CleverTap.createNotificationChannel(
    'pyypl-dev',
    'pyypl-dev',
    'CleverTap Dev',
    5,
    true,
  );
};

export const initializeInbox = () => {
  console.log('initializeInbox');
  CleverTap.initializeInbox();
};

export const resumeInAppNotifications = () => {
  console.log('resumeInAppNotifications');
  CleverTap.resumeInAppNotifications();
};

export const setLocation = (lat: number, lon: number) => {
  console.log('setLocation', lat, lon);
  CleverTap.setLocation(lat, lon);
};

export const recordEvent = (eventName: string, data?: any) => {
  console.log('recordEvent', eventName, data);
  CleverTap.recordEvent(eventName, data || {});
};

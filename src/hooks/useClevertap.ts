import {
  getCleverTapID,
  onUserLogin,
  profileGetProperty,
  profileSet,
  registerForPush,
} from '../utils/clevertap';
import {IUseClevertap, IUser} from '../utils/types';

const CleverTap = require('clevertap-react-native');

const useClevertap = (): IUseClevertap => {
  const loginUser = async (user: IUser) => {
    const signedInUserId = await profileGetProperty('Identity');
    console.log('signedin account', signedInUserId);
    if (signedInUserId !== user.Identity) {
      CleverTap.profileSet({
        'MSG-push': false,
      });
    }
    onUserLogin(user);
    registerForPush();
    profileSet({...user, 'MSG-push': true});
  };

  const fetchClevertapID = async () => {
    const id = await getCleverTapID();
    console.log('fetchClevertapID', id);
  };

  return {
    fetchClevertapID,
    loginUser,
  };
};

export default useClevertap;

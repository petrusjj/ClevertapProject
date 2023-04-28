import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../screens/Settings';
import Language from '../screens/Language';

const ProfileStack = createStackNavigator<any>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen name="Language" component={Language} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;

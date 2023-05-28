import React, {useContext} from 'react';
import BottomModal from '@routes/modal/BottomModal';
import CenterModal from '@routes/modal/CenterModal';
import {
  useCodePushCheck,
  useSignWithRefreshToken,
  useStoreUpdateCheck,
} from '@hooks/appMange';
import {IS_THICK, REAL_WIDTH, WINDOW_WIDTH} from '@constants/appUnits';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionOptions} from 'app/components/navigationComponents';
import {PageHeaderContext, SignContext} from '@hooks/context';
import BottomTabNavigator from '@navigators/bottomTab/BottomTab';
import ProductListFilter from '@routes/modal/ProductListFilter';
// import createStackNavigator from '@navigators/createStackNavigator';
// import {createMyStack} from './MyStackNavigator';

const Stack = createStackNavigator();
function RootStackNavigator({splashOptions = {}}) {
  const {getUpdateFile} = useCodePushCheck();
  const {trySignWithRefreshToken} = useSignWithRefreshToken();
  const checkStoreUpdate = useStoreUpdateCheck();
  const {stickyInfo} = useContext(PageHeaderContext);
  const {completeSignCheck} = useContext(SignContext);
  // console.log('🔥focused route : ', _getFocusedRouteName());

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          paddingHorizontal: IS_THICK ? (REAL_WIDTH - WINDOW_WIDTH) / 2 : 0,
          backgroundColor: '#F9F9F9',
          flex: 1,
        },
      }}>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={{...TransitionOptions.STACK_DEFAULT}} />
      <Stack.Group screenOptions={{...TransitionOptions.BOTTOM_MODAL}}>
        <Stack.Screen name="BottomModal" component={BottomModal} />
        <Stack.Screen component={ProductListFilter} name="ProductListFilter" />
      </Stack.Group>
      <Stack.Screen
        name="CenterModal"
        component={CenterModal}
        options={{...TransitionOptions.CENTER_MODAL}}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;

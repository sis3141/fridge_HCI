import React from 'react';
import BottomModal from '@routes/modal/BottomModal';
import CenterModal from '@routes/modal/CenterModal';
import {IS_THICK, REAL_WIDTH, WINDOW_WIDTH} from '@constants/appUnits';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TransitionOptions,
  getEmptyHeader,
} from '@components/navigationComponents';
import Home from '@routes/normal/Home';
import Search from '@routes/normal/Search';
import ItemDetail from '@routes/normal/ItemDetail';
// import createStackNavigator from '@navigators/createStackNavigator';
// import {createMyStack} from './MyStackNavigator';

const Stack = createStackNavigator();
function RootStackNavigator({splashOptions = {}}) {
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
      <Stack.Group screenOptions={{...TransitionOptions.STACK_DEFAULT}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{...getEmptyHeader()}}
        />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
      </Stack.Group>
      <Stack.Group screenOptions={{...TransitionOptions.BOTTOM_MODAL}}>
        <Stack.Screen name="BottomModal" component={BottomModal} />
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

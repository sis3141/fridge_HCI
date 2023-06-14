import React from 'react';
import {IS_THICK, REAL_WIDTH, WINDOW_WIDTH} from '@constants/appUnits';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TransitionOptions,
  getEmptyHeader,
} from '@components/navigationComponents';
import Home from '@routes/normal/Home';
import Search from '@routes/normal/Search';
import ItemDetail from '@routes/normal/ItemDetail';
import ItemList from '@routes/normal/ItemList';
import ItemAdd from '@routes/modal/ItemAdd';
import CalendarPage from '@routes/modal/CalandarPage';
import CategorySelecter from '@routes/modal/CategorySelecter';
import DeleteConfirm from '@routes/modal/DeleteConfirm';
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
        <Stack.Screen
          name="Search"
          component={Search}
          options={{...getEmptyHeader()}}
        />
        <Stack.Screen
          name="ItemList"
          component={ItemList}
          options={{...getEmptyHeader()}}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetail}
          options={{...getEmptyHeader()}}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{...TransitionOptions.BOTTOM_MODAL}}>
        <Stack.Screen name="ItemAdd" component={ItemAdd} />
        <Stack.Screen name="DeleteConfirm" component={DeleteConfirm} />
        <Stack.Screen name="CategorySelecter" component={CategorySelecter} />
      </Stack.Group>
      <Stack.Group screenOptions={{...TransitionOptions.CENTER_MODAL}}>
        <Stack.Screen name="CalendarPage" component={CalendarPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootStackNavigator;

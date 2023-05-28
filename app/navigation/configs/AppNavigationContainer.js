import React, {createContext} from 'react';
import {_rootNavigationRef} from '@hooks/navigationHook';
import RootStackNavigator from '@navigators/stack/RootStack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {CustomToastProvider} from '@platformPackage/Toast';

export const NavigationStateContext = createContext();
const reducer = (prevState, action) => {
  switch (action.type) {
    default:
      return prevState;
  }
};

function AppNavigationContainer({navContext}) {
  return (
    <CustomToastProvider>
      <NavigationContainer
        documentTitle={{
          formatter: (options, route) => {
            return 'myApp - test';
          },
        }}
        onReady={() => {
          // console.log('nav ready!');
        }}
        ref={_rootNavigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
          },
        }}>
        <RootStackNavigator />
      </NavigationContainer>
    </CustomToastProvider>
  );
}
export default AppNavigationContainer;

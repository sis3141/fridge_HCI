import React, {createContext} from 'react';
import {_rootNavigationRef} from '@hooks/navigationHook';
import RootStackNavigator from '@navigators/stack/RootStack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {CreatePageHeaderContext, CreateUserDataContext} from '@hooks/context';
import {hideBootSplash} from '@platformPackage/BootSplash';
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
    <CreateUserDataContext>
      <CustomToastProvider>
        <CreatePageHeaderContext>
          <NavigationContainer
            documentTitle={{
              formatter: (options, route) => {
                return 'myApp - test';
              },
            }}
            onReady={() => {
              // console.log('nav ready!');
              hideBootSplash();
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
        </CreatePageHeaderContext>
      </CustomToastProvider>
    </CreateUserDataContext>
  );
}
export default AppNavigationContainer;

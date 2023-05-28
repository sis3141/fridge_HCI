import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';

import AppNavigationContainer from '@navigationConfigs/AppNavigationContainer';
import {CreateUserDataContext} from '@hooks/userDataContext';

// import NetInfo from '@react-native-community/netinfo';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

function App() {
  const [serviceInitial, setServiceInitial] = useState({ready: true});

  return (
    <CreateUserDataContext>
      <AppNavigationContainer
        initialState={serviceInitial.initialState}
        navContext={serviceInitial.navContext}
        hasLastState={serviceInitial.hasLastState}
      />
    </CreateUserDataContext>
  );
}

export default App;

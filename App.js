import React, {useState} from 'react';
import {View, Text, TextInput, ActivityIndicator} from 'react-native';

import {TsubTitle} from 'app/assets/styles/textStyle';
import {getW} from '@constants/appUnits';
import AppNavigationContainer from '@navigationConfigs/AppNavigationContainer';

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

  if (serviceInitial.ready) {
    return (
      <AppNavigationContainer
        initialState={serviceInitial.initialState}
        navContext={serviceInitial.navContext}
        hasLastState={serviceInitial.hasLastState}
      />
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size={'large'} />
        <TsubTitle style={{marginTop: getW(32)}}>
          잠시만 기다려 주세요
        </TsubTitle>
      </View>
    );
  }
}

export default App;

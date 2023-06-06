import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

import AppNavigationContainer from '@navigationConfigs/AppNavigationContainer';
import {CreateUserDataContext} from '@hooks/userDataContext';
import {FOOD_LIST} from '@_constants/testData';
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
  console.log(
    'new data ',
    FOOD_LIST.map(origin => ({
      ...origin,
      id: origin.foodName + origin.addDate,
    })),
  );
  if (serviceInitial.ready) {
    return (
      <CreateUserDataContext>
        <AppNavigationContainer
          navContext={serviceInitial.navContext}
          hasLastState={serviceInitial.hasLastState}
        />
      </CreateUserDataContext>
    );
  } else {
    return <View style={{flex: 1}} />;
  }
}

export default App;

import MaskedView from '@react-native-masked-view/masked-view';
import {Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const TextGradient = ({startColor, endColor, ...props}) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[startColor, endColor]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

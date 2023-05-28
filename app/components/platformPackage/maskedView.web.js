import React from 'react';
import {Text} from 'react-native';

export const TextGradient = ({startColor, endColor, ...props}) => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          background: `linear-gradient(to right, ${startColor}, ${endColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      ]}
    />
  );
};

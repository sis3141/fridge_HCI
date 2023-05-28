import {WINDOW_WIDTH, getW} from '@constants/appUnits';
import COLORS from 'app/assets/styles/colors';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated, Image, View} from 'react-native';

export const Image_local = ({
  source,
  style,
  tint,
  alt,
  resizeMode = 'contain',
  ...props
}) => {
  return (
    <Image
      accessibilityLabel={alt}
      resizeMode={resizeMode}
      source={source}
      style={{...style, tintColor: tint}}
      {...props}
    />
  );
};

export const AnimatedImage_local = ({
  source,
  style,
  tint,
  resizeMode = 'contain',
  ...props
}) => {
  return (
    <Animated.Image
      resizeMode={resizeMode}
      source={source}
      style={{...style, tintColor: tint}}
      {...props}
    />
  );
};
export const Image_uri = ({
  source,
  style,
  alt,
  tint,
  resizeMode = 'cover',
  ...props
}) => {
  return (
    <Image
      accessibilityLabel={alt}
      resizeMode={resizeMode}
      source={{uri: source}}
      style={[{tintColor: tint}, style]}
      {...props}
    />
  );
};

export const Image_dynamicUri = ({
  source,
  widthMode = true,
  resizeMode = 'cover',
  modeLength,
  style,
  defaultSize = {width: WINDOW_WIDTH, height: getW(100)},
  hideIndicator = false,
}) => {
  const [size, setSize] = useState(null);
  useEffect(() => {
    Image.getSize(
      source,
      (gotWidth, gotHeight) => {
        setSize(prev => {
          if (widthMode) {
            const size = {
              width: modeLength,
              height: Math.floor((modeLength * gotHeight) / gotWidth),
            };
            return size;
          } else {
            const size = {
              height: modeLength,
              width: Math.floor((modeLength * gotWidth) / gotHeight),
            };
            return size;
          }
        });
      },
      error => {
        console.log('get image size failed : ', error);
        setSize(prev => {
          return {width: 0, height: 0};
        });
      },
    );
  }, []);
  if (size) {
    return (
      <Image
        removeClippedSubviews
        source={{uri: source}}
        style={{...size, ...style}}
        resizeMode={'stretch'}
      />
    );
  } else {
    return (
      <View
        style={{
          ...defaultSize,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!hideIndicator ? (
          <ActivityIndicator size={'large'} color={COLORS.sub} />
        ) : null}
      </View>
    );
  }
};
export const Image_dynamicUri_local = ({
  source,
  widthMode = true,
  resizeMode = 'contain',
  modeLength,
  style,
}) => {
  const [size, setSize] = useState(null);
  useEffect(() => {
    Image.getSize(
      source,
      (gotWidth, gotHeight) => {
        setSize(prev => {
          if (widthMode) {
            return {
              width: modeLength,
              height: Math.floor((modeLength * gotHeight) / gotWidth),
            };
          } else {
            return {
              height: modeLength,
              width: Math.floor((modeLength * gotWidth) / gotHeight),
            };
          }
        });
      },
      error => {
        console.log('get image size failed : ', error);
        setSize(prev => {
          return {width: 0, height: 0};
        });
      },
    );
  }, []);
  if (size) {
    return (
      <Image
        removeClippedSubviews
        source={source}
        style={{...size, ...style}}
        resizeMode={'cover'}
      />
    );
  } else {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={'large'} color={COLORS.sub} />
      </View>
    );
  }
};

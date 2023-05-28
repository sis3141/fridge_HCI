import {WINDOW_WIDTH, getW} from '@constants/appUnits';
import COLORS from '@styles/colors';
import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Animated, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';

export const Image_local = ({
  source,
  style,
  tint,
  alt,
  resizeMode = 'contain',
  ...props
}) => {
  return (
    <FastImage
      accessibilityLabel={alt}
      tintColor={tint}
      resizeMode={FastImage.resizeMode[resizeMode]}
      source={source}
      style={{...style}}
      {...props}
    />
  );
};
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export const AnimatedImage_local = ({
  source,
  style,
  tint,
  resizeMode = 'contain',
  ...props
}) => {
  return (
    <AnimatedFastImage
      resizeMode={FastImage.resizeMode[resizeMode]}
      tintColor={tint}
      source={source}
      style={style}
      {...props}
    />
  );
};
export const Image_uri = ({
  source,
  style,
  tint,
  resizeMode = 'cover',
  alt,
  ...props
}) => {
  return (
    <FastImage
      accessibilityLabel={alt}
      tintColor={tint}
      resizeMode={FastImage.resizeMode[resizeMode]}
      source={{uri: source}}
      style={[style]}
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
      <FastImage
        removeClippedSubviews
        source={{uri: source}}
        style={{...size, ...style}}
        resizeMode={FastImage.resizeMode.stretch}
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
  resizeMode = 'cover',
  modeLength,
  style,
}) => {
  let size = {width: null, height: null};
  const {width: gotWidth, height: gotHeight} = Image.resolveAssetSource(source);

  if (widthMode) {
    size = {
      width: modeLength,
      height: Math.floor((modeLength * gotHeight) / gotWidth),
    };
  } else {
    size = {
      height: modeLength,
      width: Math.floor((modeLength * gotWidth) / gotHeight),
    };
  }

  return (
    <FastImage
      source={source}
      style={{...size, ...style}}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

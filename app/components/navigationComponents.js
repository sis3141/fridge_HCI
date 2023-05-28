import React from 'react';
import {Image_local} from '@platformPackage/Image';
import {Horizon} from '@templates/defaultComps';
import {COMMON_ICON} from '@constants/imageMap';
import {IS_WEB, WINDOW_HEIGHT, WINDOW_WIDTH} from '@constants/appUnits';
import {getW} from '@constants/appUnits';
import {View, Text} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';

import {TransitionPresets} from '@react-navigation/stack';
import COLORS from '@styles/colors';
import {NAV_OPTIONS} from '@styles/navigationOptions';
import {PressGoBack} from '@userInteraction/pressAction';

const customTransitionOptions = {
  bottomModalOption: {
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
        overlayStyle: {
          backgroundColor: 'black',
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.3],
            extrapolate: 'clamp',
          }),
        },
      };
    },
    gestureDirection: 'vertical',
    gestureResponseDistance: WINDOW_HEIGHT / 2,
    transparentCard: true,
    cardOverlayEnabled: true,
    gestureEnabled: true,
    headerShown: false,
    cardStyle: {backgroundColor: 'transparent', opacity: 1},
    detachPreviousScreen: false,
    transitionSpec: {
      open: {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 400,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
      },
      close: {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 400,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
      },
    },
  },
  centerModalOption: {
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        overlayStyle: {
          backgroundColor: 'black',
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.4],
            extrapolate: 'clamp',
          }),
        },
        cardStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              scaleX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
                extrapolate: 'clamp',
              }),
            },
            {
              scaleY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      };
    },
    gestureDirection: 'vertical',
    gestureResponseDistance: getW(500),
    transparentCard: true,
    cardOverlayEnabled: true,
    gestureEnabled: true,
    headerShown: false,
    cardStyle: {backgroundColor: 'transparent'},
    detachPreviousScreen: false,
    transitionSpec: {
      open: {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 400,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
      },
      close: {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 400,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
      },
    },
  },
  simpleCenterModalOption: {
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        overlayStyle: {
          backgroundColor: 'black',
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.4],
            extrapolate: 'clamp',
          }),
        },
        cardStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        },
      };
    },
    gestureDirection: 'vertical',
    gestureResponseDistance: getW(500),
    transparentCard: true,
    cardOverlayEnabled: true,
    gestureEnabled: true,
    headerShown: false,
    cardStyle: {backgroundColor: 'transparent'},
    detachPreviousScreen: false,
    transitionSpec: {
      open: {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 400,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
      },
      close: {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 400,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
      },
    },
  },
};

const CustomGobackHeaderLeft = ({position}) => {
  return (
    <PressGoBack
      style={{
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingLeft: getW(25),
        width: getW(100),
        position: 'absolute',
        left: 0,
      }}>
      <Image_local
        tint={COLORS.navColor}
        source={COMMON_ICON.headerBack}
        style={{width: getW(24), height: getW(48)}}
      />
    </PressGoBack>
  );
};

const headerRight = {
  NULL: <View style={[{position: 'absolute', right: 0}]} />,
};

const headerLeft = {
  // HOME: (
  //   <PressNavigate
  //     style={{position: 'absolute', left: getW(32)}}
  //     routeName={'home'}>
  //     <Image_local
  //       tint={COLORS.navColor}
  //       style={CONTAINER.box54}
  //       source={NAV_ICON.homeOff}
  //     />
  //   </PressNavigate>
  // ),
};

export const getStackHeader = ({
  leftType = 'GO_BACK',
  rightType = 'NULL',
  showTitle = true,
} = {}) => {
  return {
    header: props => (
      <StackHeader
        leftType={leftType}
        rightType={rightType}
        showTitle={showTitle}
        {...props}
      />
    ),
    headerStyle: {height: getW(100)},
  };
};

export const getEmptyHeader = () => {
  if (IS_WEB) {
    return {
      header: () => <View style={{height: 0, width: WINDOW_WIDTH}} />,
      headerStyle: {height: 0},
    };
  } else {
    return {headerShown: false};
  }
};

export const navTransition = {
  SLIDE: TransitionPresets.SlideFromRightIOS,
  NONE: {animationEnabled: false},
  DEFAULT: TransitionPresets.DefaultTransition,
  BOTTOM_MODAL: customTransitionOptions.bottomModalOption,
  CENTER_MODAL: customTransitionOptions.centerModalOption,
  SIMPLE_CENTER_MODAL: customTransitionOptions.simpleCenterModalOption,
};

export const TransitionOptions = {
  STACK_DEFAULT: IS_WEB ? navTransition.NONE : navTransition.SLIDE,
  BOTTOM_MODAL: navTransition.BOTTOM_MODAL,
  CENTER_MODAL: navTransition.CENTER_MODAL,
  SIMPLE_CENTER_MODAL: navTransition.SIMPLE_CENTER_MODAL,
  NEVER: navTransition.NONE,
};

export function StackHeader({
  route,
  options,
  back,
  leftType = 'GO_BACK',
  rightType = 'NULL',
  showTitle = true,
  style,
}) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Horizon
      nativeID="StackHeader"
      style={[NAV_OPTIONS.defaultHeaderStyle, style]}>
      {headerLeft[leftType]}
      {showTitle ? <Text>{title}</Text> : null}
      {headerRight[rightType]}
    </Horizon>
  );
}

import {_useNavFunctions} from '@hooks/navigationHook';
import {sleep} from '@_utils/handling';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {isExist} from '@_utils/validation';
import {RIPPLE_STYLE} from '@styles/colors';
import {BTN_DISABLE_MS} from '@_constants/units';

//api, navigate, setState등의 액션을 wrapping 해주는 컴포넌트

export const PressNavigate = ({
  style,
  horizon,
  children,
  routeName,
  data,
  ripple,
  onPress = () => {},
  extraParam = {},
}) => {
  const {_navigate} = _useNavFunctions();
  const [disabled, setDisabled] = useState(false);

  return (
    <Pressable
      disabled={disabled}
      style={{
        overflow: 'hidden',
        flexDirection: horizon ? 'row' : 'column',
        ...style,
      }}
      android_ripple={ripple ? RIPPLE_STYLE.default : null}
      onPress={async () => {
        if (!routeName) {
          return;
        }
        setDisabled(true);
        onPress();
        _navigate(
          routeName,
          isExist(data) ? {data, ...extraParam} : extraParam,
        );
        await sleep(BTN_DISABLE_MS);
        setDisabled(false);
      }}>
      {children}
    </Pressable>
  );
};
export const PressPush = ({
  style,
  horizon,
  children,
  routeName,
  onPress = () => {},
  data,
  ripple,
  extraParam = {},
  disable = false,
}) => {
  const {_push} = _useNavFunctions();
  const [disabled, setDisabled] = useState(false);
  return (
    <Pressable
      disabled={disabled}
      style={{
        overflow: 'hidden',
        flexDirection: horizon ? 'row' : 'column',
        ...style,
      }}
      android_ripple={ripple ? RIPPLE_STYLE.default : null}
      onPress={async () => {
        if (!routeName || disable) {
          return;
        }
        setDisabled(true);
        onPress();
        await _push(routeName, {data, ...extraParam});
        await sleep(BTN_DISABLE_MS);
        setDisabled(false);
      }}>
      {children}
    </Pressable>
  );
};
export const PressReplace = ({
  style,
  horizon,
  children,
  routeName,
  data,
  ripple,
  extraParam = {},
}) => {
  const {_replace} = _useNavFunctions();
  const [disabled, setDisabled] = useState(false);

  return (
    <Pressable
      disabled={disabled}
      style={{
        overflow: 'hidden',
        flexDirection: horizon ? 'row' : 'column',
        ...style,
      }}
      android_ripple={ripple ? RIPPLE_STYLE.default : null}
      onPress={async () => {
        if (!routeName) {
          return;
        }
        setDisabled(true);
        await _replace(routeName, {data, ...extraParam});
        await sleep(BTN_DISABLE_MS);
        setDisabled(false);
      }}>
      {children}
    </Pressable>
  );
};
// export const PressNavigate = ({children, routeName, params}) => {
//   const {_navigate} = _useNavFunctions();
//   return (
//     <Pressable onPress={() => _navigate(routeName, {data: params})}>
//       {children}
//     </Pressable>
//   );
// };

export const OpenCenterModal = ({
  style,
  horizon,
  modalOption,
  children,
  ripple,
  ...props
}) => {
  const {_navigate} = _useNavFunctions();
  const [disabled, setDisabled] = useState(false);
  const {type, property, option} = modalOption;

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={{
        overflow: 'hidden',
        flexDirection: horizon ? 'row' : 'column',
        ...style,
      }}
      android_ripple={ripple ? RIPPLE_STYLE.default : null}
      onPress={async () => {
        setDisabled(true);
        await _navigate('CenterModal', {data: {type, property, option}});
        await sleep(BTN_DISABLE_MS);
        setDisabled(false);
      }}>
      {children}
    </Pressable>
  );
};
export const OpenBottomModal = ({
  style,
  horizon,
  modalOption,
  onPress = () => {},
  children,
  ripple,
  ...props
}) => {
  const {_navigate} = _useNavFunctions();
  const [disabled, setDisabled] = useState(false);
  const {type, property, option} = modalOption;
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={{
        overflow: 'hidden',
        flexDirection: horizon ? 'row' : 'column',
        ...style,
      }}
      android_ripple={ripple ? RIPPLE_STYLE.default : null}
      onPress={async () => {
        setDisabled(true);
        onPress();
        await _navigate('BottomModal', {
          data: {type, property, option},
        });
        await sleep(BTN_DISABLE_MS);
        setDisabled(false);
      }}>
      {children}
    </Pressable>
  );
};

export const PressGoBack = ({style, children, ripple, onPress = () => {}}) => {
  const {_goBack} = _useNavFunctions();
  const [disabled, setDisabled] = useState(false);

  return (
    <Pressable
      disabled={disabled}
      style={{overflow: 'hidden', ...style}}
      android_ripple={ripple ? RIPPLE_STYLE.default : null}
      onPress={async () => {
        setDisabled(true);
        onPress();
        await _goBack();
        await sleep(BTN_DISABLE_MS);
        setDisabled(false);
      }}>
      {children}
    </Pressable>
  );
};

// export const PressNavigateRipple = ({children, routeName, params}) => {
//   const {_navigate} = _useNavFunctions();
//   return (
//     <Pressable
//       android_ripple={RIPPLE_STYLE}
//       onPress={() => _navigate(routeName, {data: params})}>
//       {children}
//     </Pressable>
//   );
// };

export const PressCallback = ({
  style,
  horizon = false,
  children,
  onPress = () => {},
  callbackFunction,
  pointerEvents,
  ripple,
  disable = false,
}) => (
  <Pressable
    pointerEvents={pointerEvents}
    disabled={disable}
    style={{
      flexDirection: horizon ? 'row' : 'column',
      overflow: 'hidden',
      ...style,
    }}
    android_ripple={ripple ? RIPPLE_STYLE.default : null}
    onPress={callbackFunction ?? onPress}>
    {children}
  </Pressable>
);

export const PressAsync = ({
  style,
  children,
  horizon = false,
  onPress,
  disableWait = true,
  afterCallback = () => {},
  disable = false,
  ripple,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Pressable
      style={{
        flexDirection: horizon ? 'row' : 'column',
        overflow: 'hidden',
        ...style,
      }}
      //android_ripple
      // android_ripple={{color: 'black', foreground: true}}
      android_ripple={ripple ? RIPPLE_STYLE.default : null}
      disable={(isProcessing && disableWait) || disable}
      onPress={async () => {
        setIsProcessing(true);
        await onPress();
        setIsProcessing(false);
        afterCallback();
      }}>
      {children}
    </Pressable>
  );
};

export const OpenReconfirmModal = ({
  title = '',
  style,
  children,
  horizon = false,
  onPress = () => {},
  callbackFunction,
  cancelTitle,
  confirmTitle = '확인',
  description,
}) => {
  return (
    <PressNavigate
      onPress={onPress}
      horizon={horizon}
      style={style}
      routeName={'BottomModal'}
      data={{
        type: 'BOTTOM_RECONFIRM',
        property: {
          title,
          callbackFunction,
          cancelTitle,
          confirmTitle,
          description,
        },
      }}>
      {children}
    </PressNavigate>
  );
};
export const OpenChooseModal = ({
  modalTitle = '',
  style,
  children,
  horizon = false,
  leftTitle,
  leftCallback,
  rightTitle,
  rightCallback,
  description = null,
}) => {
  return (
    <PressNavigate
      horizon={horizon}
      style={style}
      routeName={'BottomModal'}
      data={{
        type: 'CHOOSE_MODAL',
        property: {
          modalTitle,
          leftTitle,
          rightTitle,
          leftCallback,
          rightCallback,
          description,
        },
      }}>
      {children}
    </PressNavigate>
  );
};

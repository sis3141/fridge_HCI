import {getW} from '@constants/appUnits';
import COLORS from 'app/assets/styles/colors';
import font from 'app/assets/styles/textStyle';
import React from 'react';
import {ToastProvider, useToast} from 'react-native-toast-notifications';

export function useMyToast() {
  const toast = useToast();
  function showDefaultToast(message) {
    if (toast) {
      toast?.show?.(message);
    }
  }
  return {toast, showDefaultToast};
}

export function CustomToastProvider({children}) {
  return (
    <ToastProvider
      duration={1600}
      offsetBottom={getW(120)}
      textStyle={{...font.medium30, color: 'white'}}
      normalColor={COLORS.black70P}>
      {children}
    </ToastProvider>
  );
}

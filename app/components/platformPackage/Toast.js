import {getW} from '@constants/appUnits';
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
      textStyle={{fontSize: getW(30), color: 'white'}}
      normalColor={'rgba(0,0,0,0,7)'}>
      {children}
    </ToastProvider>
  );
}

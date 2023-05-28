import {useCallback, useEffect, useState} from 'react';

import {_useNavFunctions} from './navigationHook';

import {BackHandler} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import {useMyToast} from '@platformPackage/Toast';

export function useRouteHandleEffect() {
  const {showDefaultToast} = useMyToast();

  const {_getDisableParam, _canGoBackExit, _replace, _getFocusedRouteName} =
    _useNavFunctions();
  const [backcount, setBackcount] = useState(1);
  const isFocused = useIsFocused();

  const {disable, showLoadingComponent, title, disableBackPress} =
    _getDisableParam();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // console.log('onback press');
        if (disableBackPress) {
          // console.log('backpress disable///?');
          return disableBackPress;
        } else {
          const gobackSafe = _canGoBackExit();
          // console.log('gobackSafe?', gobackSafe, backcount);
          if (gobackSafe) {
            return false;
          } else {
            if (backcount === 0) {
              return false;
            } else {
              //더이상 뒤로갈 수 없음
              // console.log('✅focused route : ', _getFocusedRouteName());
              if (_getFocusedRouteName() !== 'home') {
                // console.log('🎁goback occurs to home');
                _replace('home');
                return false;
              } else {
                setBackcount(0);
                showDefaultToast(
                  '뒤로가기 버튼을 한번더 누르시면 앱이 종료됩니다',
                );
                return true;
              }
            }
          }
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [disableBackPress, backcount]),
  );
  useEffect(() => {
    if (isFocused) {
      setBackcount(1);
    }
  }, [isFocused]);
  useAppStateChange(() => {
    setBackcount(1);
  });

  return {showLoadingComponent, disable, loadingTitle: title};
}

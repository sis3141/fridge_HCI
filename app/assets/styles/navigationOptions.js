import {getW, getWFloat, WINDOW_WIDTH} from '@constants/appUnits';
import {Platform} from 'react-native';
import COLORS from './colors';

export const NAV_OPTIONS = {
  defaultHeaderStyle: {
    height: getW(100),
    backgroundColor: 'white',
    width: WINDOW_WIDTH,
    borderBottomWidth: getWFloat(2),
    borderBottomColor: COLORS.black10P,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {position: 'fixed', zIndex: 1000} : {}),
  },
};

import {getW} from '@constants/appUnits';
import {Platform} from 'react-native';
import COLORS from './colors';

const SHADOW = {
  card:
    Platform.OS === 'android'
      ? {elevation: 6}
      : {
          shadowColor: COLORS.black10P,
          shadowOffset: {
            width: getW(2),
            height: getW(4),
          },
          shadowRadius: getW(15),
        },

};

export default SHADOW;

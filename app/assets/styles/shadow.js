import {getW} from '@constants/appUnits';
import COLORS from './colors';

const SHADOW = {
  basic: {
    shadowColor: COLORS.black8p,
    shadowOffset: {
      width: getW(6),
      height: getW(12),
    },
    shadowRadius: getW(24),
  },
  homeCard: {
    shadowColor: COLORS.black8p,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: getW(26),
  },
};

export default SHADOW;

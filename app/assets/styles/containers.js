import {getW, getWFloat, WINDOW_WIDTH} from '@constants/appUnits';
import COLORS from './colors';

export const CONTAINER = {
  bottomModal: {
    width: WINDOW_WIDTH,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: getW(30),
    borderTopRightRadius: getW(30),
    overflow: 'hidden',
  },
  inputBoxFlex: {
    borderRadius: getW(10),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGray3,
    padding: 0,
    paddingHorizontal: getW(30),
    paddingVertical: getW(15),
    // paddingBottom: 0,
    borderWidth: getWFloat(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
};

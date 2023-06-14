import {MS_OF_DAY} from '@_constants/units';

export const CALCS = {
  getFullRange: ({addDate, expireDate}) => {
    return Math.ceil((expireDate - addDate) / MS_OF_DAY);
  },
  getDDay: ({expireDate}) => {
    return Math.ceil((expireDate - new Date().getTime()) / MS_OF_DAY);
  },
  isDanger: ({dday}) => {
    return dday < 4;
  },
};

import {MS_OF_DAY} from '@_constants/units';

export const CALCS = {
  getFullRange: ({addDate, expireDate}) => {
    return Math.floor((expireDate - addDate) / MS_OF_DAY);
  },
  getDDay: ({expireDate}) => {
    return Math.floor((expireDate - new Date().getTime()) / MS_OF_DAY);
  },
  isDanger: ({dday}) => {
    return dday < 4;
  },
};

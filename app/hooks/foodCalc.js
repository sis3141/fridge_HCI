import {MS_OF_DAY} from '@_constants/units';

export const CALCS = {
  getDDay: ({inputDate, expireDate}) => {
    return Math.floor((expireDate - inputDate) / MS_OF_DAY);
  },
  isDanger: ({inputDate, expireDate}) => {
    const dday = CALCS.getDDay({inputDate, expireDate});
    return dday < 4;
  },
};

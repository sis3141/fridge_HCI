import {isEmpty} from './validation';

export function getPairList(origin) {
  if (isEmpty(origin)) {
    return [];
  }
  const pairList = [...Array(Math.ceil(origin.length / 2))].map((no, index) => {
    const pair = [origin[index * 2]];
    if (index * 2 + 1 < origin.length) {
      pair.push(origin[index * 2 + 1]);
    }
    return pair;
  });
  return pairList;
}
export function pairsToFlat(pairList) {
  if (isEmpty(pairList)) {
    return [];
  }
  return pairList.reduce(
    (out, curPair) => {
      const {flatlist: lastList} = out;
      return {flatlist: [...lastList, ...curPair]};
    },
    {flatlist: []},
  ).flatlist;
}

export function getDateString(dateObj, option = 'default') {
  if (isEmpty(dateObj.getFullYear())) {
    console.log('date obj empty: ', dateObj);
    return '';
  }
  const year = String(dateObj.getFullYear());
  let month = String(dateObj.getMonth() + 1);
  if (month.length === 1) {
    month = '0' + month;
  }
  let date = String(dateObj.getDate());
  if (date.length === 1) {
    date = '0' + date;
  }

  if (option === 'default') {
    return year + '.' + month + '.' + date;
  } else {
    return year + '년 ' + month + '월 ' + date + '일';
  }
}

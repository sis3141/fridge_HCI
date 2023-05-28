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


export function isEmpty(value) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
}

export function isExist(value) {
  return !isEmpty(value);
}
export function isEnd(index, arr) {
  return index === arr.length - 1;
}

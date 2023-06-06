import {getW} from '@constants/appUnits';
const light = {fontFamily: 'Pretendard', fontWeight: 300};
const regular = {fontFamily: 'Pretendard', fontWeight: 400};
const medium = {fontFamily: 'Pretendard', fontWeight: 500};
const semiBold = {fontFamily: 'Pretendard', fontWeight: 600};
const bold = {fontFamily: 'Pretendard', fontWeight: 700};
const extraBold = {fontFamily: 'Pretendard', fontWeight: 800};
// const generateTextComponent = ()
const getLH = (fontsize, ratio) => {
  const height = Math.round(getW(fontsize) * ratio);
  return height;
};

const font = {
  //title, cartitem title
  light,
  regular,
  medium,
  semiBold,
  bold,
  extraBold,
  placeHolder: {
    ...regular,
    fontSize: getW(40),
    color: 'black',
  },
  semi26: {
    ...semiBold,
    fontSize: getW(26),
    color: 'black',
  },
  semi32: {
    ...semiBold,
    fontSize: getW(32),
    color: 'black',
  },
  semi18: {
    ...semiBold,
    fontSize: getW(18),
    color: 'black',
  },
  semi16: {
    ...semiBold,
    fontSize: getW(16),
    color: 'black',
  },
  bold16: {
    ...bold,
    fontSize: getW(16),
    color: 'black',
  },
  semi20: {
    ...semiBold,
    fontSize: getW(20),
    color: 'black',
  },
  semi12: {
    ...semiBold,
    fontSize: getW(12),
    color: 'black',
  },
  semi14: {
    ...semiBold,
    fontSize: getW(14),
    color: 'black',
  },
};
export default font;

import {getW} from '@constants/appUnits';
import React from 'react';
import {Platform, Text} from 'react-native';
const light =
  Platform.OS === 'web'
    ? {fontFamily: 'Pretendard', fontWeight: 300}
    : {fontFamily: 'Pretendard-Light'};
const regular =
  Platform.OS === 'web'
    ? {fontFamily: 'Pretendard', fontWeight: 400}
    : {fontFamily: 'Pretendard-Regular'};
const medium =
  Platform.OS === 'web'
    ? {fontFamily: 'Pretendard', fontWeight: 500}
    : {fontFamily: 'Pretendard-Medium'};
const semiBold =
  Platform.OS === 'web'
    ? {fontFamily: 'Pretendard', fontWeight: 600}
    : {fontFamily: 'Pretendard-SemiBold'};
const bold =
  Platform.OS === 'web'
    ? {fontFamily: 'Pretendard', fontWeight: 700}
    : {fontFamily: 'Pretendard-Bold'};
const extraBold =
  Platform.OS === 'web'
    ? {fontFamily: 'Pretendard', fontWeight: 800}
    : {fontFamily: 'Pretendard-ExtraBold'};
// const generateTextComponent = ()
const getLH = (fontsize, ratio) => {
  const height = Math.round(getW(fontsize) * ratio);
  return height;
};

const font = {
  //title, cartitem title
}
export default font;

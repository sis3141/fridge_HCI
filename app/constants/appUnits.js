import {Dimensions, Platform} from 'react-native';

export const browserAgent = navigator.userAgent;

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'mac';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'ios';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'windows';
  } else if (/Android/.test(userAgent)) {
    os = 'android';
  } else if (/Linux/.test(platform)) {
    os = 'linux';
  }

  return os;
}

function getBrowserType() {
  if (!IS_WEB) {
    return 'NORMAL';
  }
  let userAgent = window.navigator.userAgent;
  if (userAgent.indexOf('[FB') >= 0) {
    return 'FACEBOOK';
  }
  if (userAgent.indexOf('NAVER') >= 0) {
    return 'NAVER';
  }
  if (userAgent.indexOf('KAKAO') >= 0) {
    return 'KAKAO';
  } else {
    return 'NORMAL';
  }

  // if(/FB/.test(userAgent))
}
export const WEB_MOBILE_OS = getOS(browserAgent);
export const IS_WEB = Platform.OS === 'web';
export const BROWSER_TYPE = getBrowserType();
export const IS_FB_IAB = BROWSER_TYPE === 'FACEBOOK';
export const IS_NAVER_IAB = BROWSER_TYPE === 'NAVER';
export const IS_KAKAO_IAB = BROWSER_TYPE === 'KAKAO';
export const IS_ANDROID_WEB = IS_WEB && WEB_MOBILE_OS === 'android';
export const IS_IOS_WEB = IS_WEB && WEB_MOBILE_OS === 'ios';
export const DESIGN_PIXEL_WIDTH = 390;
export const DESING_PIXEL_HEIGHT = 844;
export const MINIMUM_RATIO = 1.65;
export const REAL_WIDTH = Dimensions.get('window').width;
export const REAL_HEIGHT = Dimensions.get('window').height;
export const REAL_RATIO = REAL_HEIGHT / REAL_WIDTH;
export const IS_THICK = REAL_RATIO < MINIMUM_RATIO;
export const WINDOW_WIDTH = IS_THICK
  ? (REAL_WIDTH * REAL_RATIO) / MINIMUM_RATIO
  : REAL_WIDTH;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const getW = designPixel => {
  return Math.round((designPixel * WINDOW_WIDTH) / DESIGN_PIXEL_WIDTH);
};
export const getWFloat = designPixel => {
  return (
    Math.round((designPixel * WINDOW_WIDTH * 10) / DESIGN_PIXEL_WIDTH) / 10
  );
};
export const getH = designPixel => {
  return Math.round((designPixel * WINDOW_HEIGHT) / DESING_PIXEL_HEIGHT);
};
export const getHFloat = designPixel => {
  return (
    Math.round((designPixel * WINDOW_HEIGHT * 10) / DESING_PIXEL_HEIGHT) / 10
  );
};
export const TABBAR_HEIGHT_ROUGH = getH(130);

export const STACK_HEADER_HEIGHT = getW(100);

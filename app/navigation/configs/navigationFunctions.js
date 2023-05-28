import {navigationConfig} from './navigationConfig';

function spreadStructure(
  target,
  parent,
  spreadedObj,
  config = navigationConfig,
) {
  target.child.map((name, index) => {
    spreadedObj[name] = {parent};
    const child = config[name]?.child;
    if (child) {
      return spreadStructure(config[name], name, spreadedObj, config);
    }
  });
  return spreadedObj;
}

export function makeLinkConfig(
  name,
  totalObj,
  originConfig = navigationConfig,
) {
  //console.log('target navConfig : ', name, '\n');
  const navConfig = originConfig[name];
  const childNameList = navConfig?.child;
  // console.log('childNameList', childNameList);
  const linkConfig = navConfig?.linkConfig ?? {};
  //console.log('linkConfig', linkConfig);
  if (childNameList) {
    const screens = {};
    childNameList.map((childName, index) => {
      screens[childName] = makeLinkConfig(childName, {}, originConfig);
    });
    return {...totalObj, ...linkConfig, screens};
  } else {
    return {...totalObj, ...linkConfig};
  }
}

export const getFlatNavigationStructure = config => {
  const res = spreadStructure(
    config.RootStackNavigator,
    'RootStackNavigator',
    {},
    config,
  );
  return res;
};

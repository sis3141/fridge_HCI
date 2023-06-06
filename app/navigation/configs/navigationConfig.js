export const appDefaultInitialNavState = {
  index: 1,
  routes: [{name: 'BottomTabNavigator'}, {name: 'SplashScreen'}],
};

export const navigationConfig = {
  RootStackNavigator: {
    child: ['Home', 'Search', 'ItemDetail', 'ItemList', 'ItemAdd'],
    paths: {},
    linkConfig: {},
  },
  Home: {
    paths: {},
    linkConfig: {},
  },
  Search: {
    paths: {},
    linkConfig: {},
  },
  ItemDetail: {
    paths: {},
    linkConfig: {},
  },
  ItemList: {
    paths: {},
    linkConfig: {},
  },
  ItemAdd: {
    paths: {},
    linkConfig: {},
  },
};

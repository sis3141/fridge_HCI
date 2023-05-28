export const appDefaultInitialNavState = {
  index: 1,
  routes: [{name: 'BottomTabNavigator'}, {name: 'SplashScreen'}],
};

export const navigationConfig = {
  RootStackNavigator: {
    child: ['Home', 'Search', 'ItemDetail', 'ItemAdd'],
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
  ItemAdd: {
    paths: {},
    linkConfig: {},
  },
};

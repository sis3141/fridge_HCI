export const appDefaultInitialNavState = {
  index: 1,
  routes: [{name: 'BottomTabNavigator'}, {name: 'SplashScreen'}],
};

export const navigationConfig = {
  RootStackNavigator: {
    child: [
      'Home',
      'Search',
      'ItemDetail',
      'ItemList',
      'ItemAdd',
      'CalendarPage',
    ],
    paths: {},
    linkConfig: {},
  },
  Home: {
    paths: {},
    linkConfig: {
      path: 'home',
    },
  },
  Search: {
    paths: {},
    linkConfig: {
      path: 'search',
    },
  },
  ItemDetail: {
    paths: {},
    linkConfig: {
      path: 'item-detail/:foodId',
    },
  },
  ItemList: {
    paths: {},
    linkConfig: {
      path: 'items/:foodName',
    },
  },
  ItemAdd: {
    paths: {},
    linkConfig: {
      path: 'edit-food/:foodId',
    },
  },
  CalendarPage: {
    paths: {},
    linkConfig: {
      path: 'calendar',
    },
  },
};

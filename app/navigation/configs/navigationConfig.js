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
      'CategorySelecter',
      'DeleteConfirm',
    ],
    paths: {},
    linkConfig: {},
  },
  Home: {
    paths: {},
    linkConfig: {},
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
      parse: {
        foodId: param => decodeURIComponent(param),
      },
    },
  },
  ItemList: {
    paths: {},
    linkConfig: {
      path: 'items/:foodName',
      parse: {
        foodName: param => decodeURIComponent(param),
      },
    },
  },
  ItemAdd: {
    paths: {},
    linkConfig: {
      path: 'edit-food/:foodId',
      parse: {
        foodId: param => decodeURIComponent(param),
      },
    },
  },
  CalendarPage: {
    paths: {},
    linkConfig: {
      path: 'calendar',
    },
  },
  CategorySelecter: {
    paths: {},
    linkConfig: {
      path: 'selectCategory',
    },
  },
  DeleteConfirm: {
    paths: {},
    linkConfig: {
      path: 'delete',
    },
  },
};

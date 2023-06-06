// export {
//   _signContext as SignContext,
//   _createSignContext as CreateSignContext,
// } from './contexts/signContext';

import {createContext, useEffect, useMemo, useReducer} from 'react';
import {CALCS} from './foodCalc';
import {logNow} from '@_utils/debug';
import LocalStorage from './asyncStorage';
import {FOOD_LIST} from '@_constants/testData';

const IS_TEST = true;

const initialData = {
  inited: false,
  foodList: [],
  dangerList: [],
  dangerNum: 0,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'UPDATE': {
      const newList = action.newList;
      const dangerList = newList.filter(foodObj => {
        const {addDate, expireDate} = foodObj;

        return CALCS.isDanger({
          dday: CALCS.getDDay({inputDate: addDate, expireDate}),
        });
      });
      return {
        inited: true,
        foodList: newList,
        dangerList,
        dangerNum: dangerList.length,
      };
    }

    default: {
      console.log('UNDEFINED TYPE!');
      return {
        ...prevState,
      };
    }
  }
};

export const UserDataContext = createContext();
export function CreateUserDataContext(props) {
  const [state, dispatch] = useReducer(reducer, initialData);
  console.log('data state : ', state);
  const actions = useMemo(() => ({
    update: newList => {
      dispatch({type: 'UPDATE', newList});
    },
  }));

  async function initUser() {
    try {
      let lastList = [];
      if (IS_TEST) {
        lastList = FOOD_LIST;
      } else {
        lastList = await LocalStorage.getFoodList();
      }
      console.log('got last list : ', lastList);
      actions.update(lastList);
    } catch (error) {
      logNow('error from init user data', error);
    }
  }
  useEffect(() => {
    initUser();
  }, []);

  return (
    <UserDataContext.Provider value={{...state, ...actions}}>
      {props.children}
    </UserDataContext.Provider>
  );
}

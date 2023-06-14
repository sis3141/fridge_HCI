// export {
//   _signContext as SignContext,
//   _createSignContext as CreateSignContext,
// } from './contexts/signContext';

import {createContext, useEffect, useMemo, useReducer} from 'react';
import {CALCS} from './foodCalc';
import {logNow} from '@_utils/debug';
import LocalStorage from './asyncStorage';
import {FOOD_LIST} from '@_constants/testData';
import {isExist} from '@_utils/validation';

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
      console.log('🎁update foodlist');
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
    add: async ({foodObj}) => {
      const newList = await LocalStorage.addFood({foodObj});
      actions.update(newList);
    },
    edit: async ({foodId, newObj}) => {
      const newList = await LocalStorage.editFood({foodId, newObj});
      console.log('😊😊new list after update : ', newList);
      actions.update(newList);
    },
    reset: async () => {
      await LocalStorage.reset();
      actions.update([]);
    },
    deleteFood: async ({foodId}) => {
      const newList = await LocalStorage.deleteFood({foodId});
      actions.update(newList);
    },
    deleteMultiple: async ({foodIds}) => {
      const newList = await LocalStorage.deleteMultiple({foodIds});
      actions.update(newList);
    },
    getTestData: async () => {
      await LocalStorage.save({foodList: FOOD_LIST});
      actions.update(FOOD_LIST);
    },
  }));

  async function initUser() {
    try {
      let lastList = [];

      lastList = await LocalStorage.getFoodList();

      console.log('got last list : ', lastList);
      actions.update(lastList);
    } catch (error) {
      logNow('error from init user data', error);
    }
  }
  useEffect(() => {
    initUser();
  }, []);
  const getFoodWithId = ({foodId}) => {
    const resList = state.foodList.filter(foodObj => foodObj.id === foodId);
    if (isExist(resList)) {
      return resList[0];
    } else {
      return null;
    }
  };

  return (
    <UserDataContext.Provider value={{...state, ...actions, getFoodWithId}}>
      {props.children}
    </UserDataContext.Provider>
  );
}

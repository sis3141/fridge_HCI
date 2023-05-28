import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from '@_utils/validation';

const storageKey = 'FOODS';

const getlastList = async () => {
  const str = await AsyncStorage.getItem(storageKey);
  if (isEmpty(str)) {
    await AsyncStorage.setItem(storageKey, JSON.stringify([]));
    return [];
  } else {
    const list = JSON.parse(str);
    return list;
  }
};

const saveList = async newList => {
  await AsyncStorage.setItem(storageKey, JSON.stringify(newList));
};

const LocalStorage = {
  addFood: async ({foodObj}) => {
    const lastList = await getlastList();
    const newList = [...lastList, foodObj];
    await saveList(newList);
    return newList;
  },
  editFood: async ({foodName, newObj}) => {
    const lastList = await getlastList();
    const newList = lastList.map(foodObj => {
      const {foodName: lastFoodName} = foodObj;
      if (lastFoodName === foodName) {
        return newObj;
      } else {
        return foodObj;
      }
    });
    await saveList(newList);
    return newList;
  },
  deleteFood: async ({foodName}) => {
    const lastList = await getlastList();
    const newList = lastList.filter(foodObj => foodObj.foodName !== foodName);
    await saveList(newList);
    return newList;
  },
  getFoodList: async () => {
    const lastList = await getlastList();
    return lastList;
  },
};
export default LocalStorage;

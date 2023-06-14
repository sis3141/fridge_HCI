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
    if (isEmpty(foodObj)) {
      return lastList;
    }
    const newList = [...lastList, foodObj];
    await saveList(newList);
    return newList;
  },
  editFood: async ({foodId, newObj}) => {
    const lastList = await getlastList();
    console.log('cur last list ?? ', lastList);
    const newList = lastList.map(foodObj => {
      const {id: lastId} = foodObj;
      if (lastId === foodId) {
        return newObj;
      } else {
        return foodObj;
      }
    });
    console.log('edit in new list ??', newList);
    await saveList(newList);
    return newList;
  },
  deleteFood: async ({foodId}) => {
    const lastList = await getlastList();
    const newList = lastList.filter(foodObj => foodObj.id !== foodId);
    await saveList(newList);
    return newList;
  },
  getFoodList: async () => {
    const lastList = await getlastList();
    return lastList;
  },
  save: async ({foodList}) => {
    await saveList(foodList);
    return foodList;
  },
  reset: async () => {
    await AsyncStorage.clear();
  },
};
export default LocalStorage;

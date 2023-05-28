import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from '@_utils/validation';
import {Platform} from 'react-native';
import {logException} from './Attribution';

async function getStorageNum(storageKey) {
  try {
    const curString = await AsyncStorage.getItem(storageKey);
    return Number(curString);
  } catch (error) {
    logException({error});

    console.log(
      'error from get storage val wity key : ',
      storageKey,
      '\nerror : ',
      error,
    );
  }
}
async function setStorageNum(storageKey, num) {
  try {
    const stringVal = String(num);
    console.log('target val : ', stringVal);
    await AsyncStorage.setItem(storageKey, stringVal);
  } catch (error) {
    logException({error});

    console.log(
      'error from set storage val wity key & val : ',
      storageKey,
      ' ',
      num,
      '\nerror : ',
      error,
    );
  }
}

async function getStorageArray(storageKey) {
  try {
    const curInfoString = await AsyncStorage.getItem(storageKey);
    const curList = curInfoString ? JSON.parse(curInfoString) : [];
    return curList;
  } catch (error) {
    logException({error});
    console.log(
      'error from get Storage array with key-',
      storageKey,
      '\nerorr : ',
      error,
    );
  }
}
async function addUniqueStorageArrayVal(storageKey, value) {
  try {
    const curList = await getStorageArray(storageKey);
    const newList = curList.includes(value) ? curList : [...curList, value];
    await AsyncStorage.setItem(storageKey, JSON.stringify(newList));
  } catch (error) {
    logException({error});
    console.log(
      'error from set uniqueStorage array with key-',
      storageKey,
      ' val-',
      value,
      '\nerorr : ',
      error,
    );
  }
}
async function deleteSingleStorageArrayVal(storageKey, value) {
  try {
    const curList = await getStorageArray(storageKey);
    const newList = curList.filter(prevValue => value !== prevValue);
    await AsyncStorage.setItem(storageKey, JSON.stringify(newList));
  } catch (error) {
    logException({error});
    console.log(
      'error from delete single array value with key-',
      storageKey,
      ' val-',
      value,
      '\nerorr : ',
      error,
    );
  }
}
async function clearSingleStorage(storageKey) {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (error) {
    logException({error});
    console.log(
      'error from clear single storage with key-',
      storageKey,

      '\nerorr : ',
      error,
    );
  }
}

async function setSingleObj(storageKey, obj) {
  try {
    if (isEmpty(obj)) {
      return;
    }
    const jsonVal = JSON.stringify(obj);
    const saved = await AsyncStorage.setItem(storageKey, jsonVal);
    return saved;
  } catch (error) {
    logException({error});
    console.log(
      'error from store single obj with key=',
      storageKey,
      '\nval : ',
      obj,
      '\nerror',
      error,
    );
  }
}

async function getStorageObj(storageKey) {
  try {
    const curInfoString = await AsyncStorage.getItem(storageKey);
    const curObj = curInfoString ? JSON.parse(curInfoString) : {};
    return curObj;
  } catch (error) {
    logException({error});
    console.log(
      'error from set uniqueStorage array with key-',
      storageKey,
      '\nerorr : ',
      error,
    );
  }
}
async function addStorageObjVal(storageKey, objKey, objValue) {
  try {
    const curObj = await getStorageObj(storageKey);
    curObj[objKey] = objValue;
    await AsyncStorage.setItem(storageKey, JSON.stringify(curObj));
  } catch (error) {
    logException({error});
    console.log(
      'error from set uniqueStorage array with key-',
      storageKey,
      ' val-',
      objKey,
      objValue,
      '\nerorr : ',
      error,
    );
  }
}

const LocalStorage = {

};
export default LocalStorage;

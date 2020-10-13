import { createEvent, createStore, restore } from 'effector-logger';
import connectLocalStorage from 'effector-localstorage/sync';

const setInfoEntered = createEvent<boolean>();
const $isSetInfoVisited = restore(setInfoEntered, false);

const loggedIn = createEvent();
const loggedInLocalStorage = connectLocalStorage('loggedIn');

const $isLoggedIn = createStore(loggedInLocalStorage.init(false))
  .on(loggedIn, () => true);

$isLoggedIn.watch(loggedInLocalStorage);

export {
  $isSetInfoVisited,
  $isLoggedIn,
  setInfoEntered,
  loggedIn,
};

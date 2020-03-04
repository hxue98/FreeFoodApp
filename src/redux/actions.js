import {STORE_USERID} from './types';

export const storeUserId = userId => {
  return {
    type: STORE_USERID,
    payload: userId,
  };
};

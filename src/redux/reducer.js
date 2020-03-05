import {STORE_USERID} from './types';

const initialState = {
  userId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USERID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return 4;
  }
};

export default reducer;

import { produce } from 'immer';
import { action상수 as types } from './action';

const setError = (state, payload) => {
  return produce(state, (draft) => {
    draft.error = payload;
  });
};

const setLoading = (state, payload) => {
  return produce(state, (draft) => {
    draft.isLoading = payload;
  });
};

const setTaskReducer = (state, payload) => {
  return produce(state, (draft) => {
    debugger;
    // draft.counter.push(payload);
    draft.counter = payload.counter;
    draft.isLoading = false;
  });
};

const state컨테이너명 = {
  error: null,
  isLoading: false,
  // counter: [],
  counter: 10,
  welcome:'HELLO WORLD REDUX'
};

const reducerCounter = (state = state컨테이너명, action) => {
  switch (action.type) {
    case types.SET_ERROR:
      return setError(state, action.payload);
    case types.SET_LOADING:
      return setLoading(state, action.payload);
    case types.SET_TASK_REDUCER:
      debugger;
      return setTaskReducer(state, action.payload);
    default:
      return state;
  }
};

export default reducerCounter;

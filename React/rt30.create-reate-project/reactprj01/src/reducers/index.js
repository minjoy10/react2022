import { combineReducers } from 'redux';

import reducerCounter from '../containers/counter/reducer';
// import reducer컴포넌트목록 from '../containers/컴포넌트목록/reducer';

const reducers = combineReducers({
  counter: reducerCounter,
  // 상태값목록: reducer컴포넌트목록,
});

export default reducers;

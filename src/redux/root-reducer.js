import { combineReducers } from 'redux';

import ztmToDoReducer from './ztm-to-do/ztm-to-do.reducer';

export default combineReducers({
  ztmToDoState: ztmToDoReducer,
});

import { combineReducers } from 'redux-immutable';

import search from './search';
import show from './show';

export default combineReducers({
  search,
  show,
});

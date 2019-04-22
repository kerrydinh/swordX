import { combineReducers } from 'redux';
import authentication from './authentication';
import item from './item';

const rootReducer = combineReducers({authentication: authentication, item: item})

export default rootReducer;
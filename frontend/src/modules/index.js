// modules/index.js - 리듀서 통합

import user from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ user });

export default rootReducer
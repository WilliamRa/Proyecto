import {combineReducers} from 'redux';
import postReducer from './postReducer'
import { sessionReducer } from './sessionReducer';
import likeReducer from './likeReducer';


export default combineReducers({
	postReducer,
	sessionReducer,
	likeReducer
});
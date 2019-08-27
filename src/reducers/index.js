import {combineReducers} from 'redux';
import TrackerReducer from './TrackerReducer';

export default combineReducers({
  fitnessTracker: TrackerReducer,
});

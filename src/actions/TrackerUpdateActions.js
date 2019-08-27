import {
  UPDATE_WATER_CONSUMPTION,
  UPDATE_WORKOUT_DURATION,
  UPDATE_SLEEP_TIME,
} from './types';
export const updateWaterConsumption = value => {
  return {
    type: UPDATE_WATER_CONSUMPTION,
    payload: value,
  };
};

export const updateWorkoutDuration = value => {
  return {
    type: UPDATE_WORKOUT_DURATION,
    payload: value,
  };
};

export const updateSleepTime = value => {
  return {
    type: UPDATE_SLEEP_TIME,
    payload: value,
  };
};

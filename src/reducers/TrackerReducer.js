const INITIAL_STATE = {
  tracker: [
    {
      isExpanded: true,
      date: '24-8-2019',
      waterConsumption: '9',
      workoutDuration: '30',
      sleepTime: '7',
    },
    {
      isExpanded: true,
      date: '25-8-2019',
      waterConsumption: '10',
      workoutDuration: '50',
      sleepTime: '8',
    },
    {
      isExpanded: true,
      date: '26-8-2019',
      waterConsumption: '11',
      workoutDuration: '70',
      sleepTime: '7',
    },
  ],
};

function GetFormattedDate() {
  var todayTime = new Date();
  var month = todayTime.getMonth() + 1;
  var day = todayTime.getDate();
  var year = todayTime.getFullYear();
  return day + '-' + month + '-' + year;
}

let newObj = {};
export default (state = INITIAL_STATE, action) => {
  const newState = {...state};
  if (
    action.type === 'UPDATE_WATER_CONSUMPTION' ||
    action.type === 'UPDATE_WORKOUT_DURATION' ||
    action.type === 'UPDATE_SLEEP_TIME'
  ) {
    if (newState.tracker.length < 4) {
      let obj = {
        isExpanded: true,
        date: GetFormattedDate(),
        waterConsumption: '',
        workoutDuration: '',
        sleepTime: '',
      };
      newState.tracker.push(obj);
      newObj = newState.tracker[3];
    } else {
      newObj = newState.tracker[3];
    }
  }

  switch (action.type) {
    case 'UPDATE_WATER_CONSUMPTION':
      newObj.waterConsumption = action.payload;
      newState.tracker[3] = newObj;
      return newState;
    case 'UPDATE_WORKOUT_DURATION':
      newObj.workoutDuration = action.payload;
      newState.tracker[3] = newObj;
      return newState;
    case 'UPDATE_SLEEP_TIME':
      newObj.sleepTime = action.payload;
      newState.tracker[3] = newObj;
      return newState;
    default:
      return newState;
  }
};

// actions/tasksActions.js

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const SET_TASK_WEATHER = 'SET_TASK_WEATHER';
export const CLEAR_TASKS = 'CLEAR_TASKS';
// Action creator for adding a task
export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

// Action creator for removing a task
export const removeTask = (tasks) => ({
  type: REMOVE_TASK,
  payload: tasks,
});

// Action creator for toggling task completion
export const toggleTask = (index, updatedTasks) => ({
  type: TOGGLE_TASK,
  payload: { index, updatedTasks },
});

// Action creator for setting task weather
export const setTaskWeather = (index, weatherData) => ({
  type: SET_TASK_WEATHER,
  payload: { index, weatherData },
});
 
export const clearTasks = () => ({
  type: CLEAR_TASKS,
});

// Action Types
const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const SET_TASK_WEATHER = 'SET_TASK_WEATHER';
// Initial state for tasks
const initialState = {
  tasks: [], // An array to hold task objects
};

// Reducer function for managing tasks
const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: sortTasksByPriority([...state.tasks, action.payload]), // Add new task to the array
      };
      
    case REMOVE_TASK:
      return {
        ...state,
        tasks: sortTasksByPriority(action.payload), // Set tasks to the updated array after removal
      };
      
    case TOGGLE_TASK:
      {const updatedTasks = [...state.tasks];
      updatedTasks[action.payload.index] = {
        ...updatedTasks[action.payload.index],
        isCompleted: !updatedTasks[action.payload.index].isCompleted, // Toggle task completion
      };
      return {
        ...state,
        tasks: sortTasksByPriority(updatedTasks), // Return the updated tasks array
      };
    }
    case SET_TASK_WEATHER:
      {const tasksWithWeather = [...state.tasks];
      tasksWithWeather[action.payload.index].weather = action.payload.weatherData; // Set weather for specific task
      return {
        ...state,
        tasks: sortTasksByPriority(tasksWithWeather), // Update the tasks with weather information
      };
    }
    case 'CLEAR_TASKS':
      return {
        ...state,
        tasks: [],
      };
    default:
      return state; // Return the current state if no action matches
  }
};
const sortTasksByPriority = (tasks) => {
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};
export default tasksReducer;

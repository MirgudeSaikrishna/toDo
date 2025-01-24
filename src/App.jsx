import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {login,logout} from './actions/authAction';
import { addTask, removeTask, toggleTask, setTaskWeather,clearTasks } from './actions/tasksActions';
// API key for OpenWeatherMap
const API_KEY = 'fcdca7fe9c90c8802f6d2c6fb3a52c2b'; // Replace with your API key from OpenWeatherMap
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [newTask, setNewTask] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [location, setlocation] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [newPriority, setNewPriority] = useState('Medium'); // Default priority
  const tasks = useSelector((state) => state.tasks.tasks);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
// Function to handle adding a new task
const handleAddTask = () => {
  if (newTask.trim() !== '') {
    const task = { text: newTask, isCompleted: false, weather: null, priority: newPriority };
    dispatch(addTask(task));
    setNewTask('');
  }
};

  // Function to handle task completion
  const handleToggleTask = (index) => {
    dispatch(toggleTask(index, tasks));
  };

  // Remove task
  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    dispatch(removeTask(updatedTasks));
  };
  
  
  const handleLogin = () => {
    if (loginUsername.trim() !== '') {
      localStorage.setItem('username', loginUsername);
      dispatch(login(loginUsername));
      setLoginUsername('');
      setIsLoginForm(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    dispatch(logout());
    dispatch(clearTasks());
  };
  // Function to fetch weather data
  const fetchWeather = async (city) => {
    setLoadingWeather(true);
    try {
      console.log(`Fetching weather for ${city}`);
      const response = await fetch(`${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Weather data fetched successfully:', data);
      return data; // Return the weather data if the request is successful
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null; // Return null if there is an error
    } finally {
      setLoadingWeather(false); // Set loading state to false when the API call finishes
    }
  };

  useEffect(() => {
    tasks.forEach((task, index) => {
      if (!task.weather && task.text.toLowerCase().includes('outdoor')) {
        const fetchTaskWeather = async () => {
          const weatherData = await fetchWeather(location); // You can change the city here
          if (weatherData) {
            dispatch({
              type: 'SET_TASK_WEATHER',
              payload: { index, weatherData },
            });
          }
        };
        fetchTaskWeather();
      }
    });
  }, [tasks, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const savedTasks = localStorage.getItem(username);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        parsedTasks.forEach((task) => dispatch(addTask(task))); // Add saved tasks to state
      }
    }
  }, [isAuthenticated, username, dispatch]);

  // Persist tasks in localStorage when tasks change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(username, JSON.stringify(tasks)); // Store tasks in localStorage
    }
  }, [tasks, isAuthenticated, username]);

  const renderLoginForm = () => (
    <div className='login-page'>
      <h5>A React-based task manager app...</h5>
      <div className="text-center login-form">
      
      <input
        type="text"
        placeholder="Username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
        className="form-control mb-3"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setlocation(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={handleLogin} className="btn btn-primary">Login</button>
      </div>
    </div>
  );

  const renderAppContent = () => (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome, {username}!</h1>
      <h5 className="card-title">{location}</h5>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

      {/* Task Input Form */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <select
          className="form-control"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {/* Loading Indicator */}
      {loadingWeather && <div className="alert alert-info text-center">Loading weather data...</div>}

      {/* Tasks List */}
      
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.isCompleted ? 'list-group-item-success' : ''}${task.priority === 'High' ? 'high-priority' : task.priority === 'Medium' ? 'medium-priority' : 'low-priority'}`}>
            <span
              className={`flex-grow-1 ${task.isCompleted ? 'text-decoration-line-through' : ''}`}
              onClick={() => handleToggleTask(index)}
              style={{ cursor: 'pointer' }}
            >
            {task.text} <strong>({task.priority})</strong>
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTask(index)}>
              Remove
            </button>
            {task.weather && (
                <div className="mt-2">
                  <div className="card">
                    <div className="card-body">
                      
                      <p className="card-text">Temperature: {task.weather.main.temp}°C</p>
                      <p className="card-text">{task.weather.weather[0].description}</p>
                    </div>
                  </div>
                </div>
              )}
          </li>
        ))}
      </ul>
  </div>
);

  return (
    <div>
      {!isAuthenticated ? renderLoginForm() : renderAppContent()}
    </div>
  );
}

export default App;

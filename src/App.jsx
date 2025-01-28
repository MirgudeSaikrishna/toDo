import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaPen } from 'react-icons/fa'; // FaPen is the pen icon from FontAwesome
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
  const valid=(name)=>{
    if(!name){
      alert("username cannot be empty")
    }
  }
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
      if (!task.weather && task.text.toLowerCase().includes('out')) {
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
    <div className='landing-page'>
      <div className='details'>
        <h1>Create or login to your task managing account</h1>
        <h4>Your data is safe in your own browser</h4>
      </div>
      <div className='log-form'>
        <div className="form">
        
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          className="inp"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          className="inp"
        />
        <button onClick={()=>{handleLogin() ; valid(loginUsername)}} className="clic">Login</button>
        </div>
      </div>
    </div>
  );

  const renderAppContent = () => (
    <div className="containe">
      <div className='fll'>
      <h1>Task Manager <FaPen size={28}/></h1>
      <button className="n-danger" onClick={handleLogout}>Logout</button>
      </div>
      <hr width="100%"></hr>
      <h5 className="card-titl">{location}</h5>
      <h1 className="text-cen">Welcome, {username}!</h1>
      
      

      {/* Task Input Form */}
      <div className="input-gr">
        <input
          type="text"
          className="for"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <select
          className="forn"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button className="rimary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div>Use 'OUT' keyword to access the weather</div>
      <hr width="100%"></hr>
      {/* Loading Indicator */}
      {loadingWeather && <div className="alxt-center">Loading weather data...</div>}

      {/* Tasks List */}
      
      <ul className="lisroup">
        {tasks.map((task, index) => (
          <li key={index} className={`list-groutems-center ${task.isCompleted ? 'list-group-item-success' : ''}${task.priority === 'High' ? 'high-priority' : task.priority === 'Medium' ? 'medium-priority' : 'low-priority'}`}>
            <span
              className={`flex-gro ${task.isCompleted ? 'text-dhrough' : ''}`}
              onClick={() => handleToggleTask(index)}
              style={{ cursor: 'pointer' }}
            >
            {task.text} 
            {task.weather && (
                <div className="card-bdy">
                  <p className="card-tet">Temperature: {task.weather.main.temp}°C</p>
                  <p className="card-tet">{task.weather.weather[0].description}</p>
                </div>
              )}
            {/* <strong>({task.priority})</strong> */}
            </span>
            <button className="bn-sm" onClick={() => handleRemoveTask(index)}>
              Remove
            </button>
            
          </li>
        ))}
      </ul>
      <div className='al'>Click on your task to mark as completed</div>
  </div>
);

  return (
    <div>
      {!isAuthenticated ? renderLoginForm() : renderAppContent()}
    </div>
  );
}

export default App;

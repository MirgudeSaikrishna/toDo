

# React Task Manager with Weather Integration

This is a task manager web application built with React, Redux, and OpenWeatherMap API for weather integration. The app allows users to manage tasks, assign priority, and get weather information for tasks that are related to outdoor activities.

## Features

- **User Authentication:** Users can log in with a username and location.
- **Task Management:**
  - Add, remove, and mark tasks as complete.
  - Set task priority (High, Medium, Low).
  - Weather information is fetched for tasks related to outdoor activities.
- **Weather Integration:** Fetch current weather data from OpenWeatherMap for a specified location.
- **Persistent Tasks:** Tasks are stored in localStorage for persistence between sessions, specific to the logged-in user.
  
## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Redux:** State management tool for handling global application state.
- **OpenWeatherMap API:** External API for weather data.
- **CSS:** For styling the user interface.

## Setup and Installation

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine.

### Steps to Run the Application

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/react-task-manager.git
   cd react-task-manager
   ```

2. **Install dependencies:**
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

3. **Create an `.env` file for API key (Optional):**
   You can add your own OpenWeatherMap API key by creating a `.env` file in the root directory of the project:
   ```plaintext
   REACT_APP_OPENWEATHER_API_KEY=your_api_key
   ```

4. **Run the app:**
   After installing the dependencies, start the development server:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000/` in your web browser.

## API Integration

- **OpenWeatherMap API:** The app uses the OpenWeatherMap API to fetch weather data for a given location. Make sure to replace the `API_KEY` in the code with your own API key from [OpenWeatherMap](https://openweathermap.org/).

## Components

### `App.js`

- The main React component that handles the state and logic of the app. It manages user login, task creation, task removal, and weather fetching.

### `Task Management:`
- **Adding Tasks:** A form allows the user to enter tasks, with the option to set a priority (High, Medium, Low).
- **Marking Tasks as Complete:** Tasks can be toggled between completed and incomplete.
- **Removing Tasks:** Tasks can be removed from the list.

### `Weather Fetching:`
- If a task contains the word "outdoor", weather information will be fetched from OpenWeatherMap for the location specified during login.
- The weather data will be displayed with the task.

## Styling

The app uses simple CSS classes and Bootstrap for styling. You can modify the `App.css` file to adjust the styles according to your preferences.

## Usage

- **Login:** Enter your username and location to log in. This is stored in localStorage and persists between page reloads.
- **Add Task:** Enter a task and select a priority level (High, Medium, Low), then click "Add Task" to add it to the task list.
- **Complete Task:** Click on the task name to mark it as completed.
- **Remove Task:** Click on the "Remove" button next to any task to delete it.
- **Weather Data:** If a task is related to outdoor activities, weather data will be fetched and displayed below the task.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


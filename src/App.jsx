import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "1ce22cbd2c1c0375059fcb705103ef5f"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      if (!location) {
        alert("Please enter a location!");
        return;
      }
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      alert("Error fetching weather data. Please check the city name or try again later.");
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="weather-app">
      <div className="top-bar">
        <input
          type="text"
          className="location-input"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
      </div>

      <div className="weather-details">
        {weatherData && (
          <>
          <div className="weather-details">
  <div className="left-info">
    <h1>{weatherData?.name}</h1>
    <h2>{weatherData?.main?.temp}°C</h2>
  </div>

  <div className="right-info">
    <h3>{weatherData?.weather[0]?.description}</h3>
  </div>
</div>
          </>
        )}
      </div>

      <div className="footer">
  <div>
  <p className="value">{weatherData?.main.feels_like}</p>
    <p className="label">Feels Like:</p>
   
  </div>
  <div>
  <p className="value">{weatherData?.main.humidity}</p>
    <p className="label">Humidity:</p>

  </div>
  <div>
  <p className="value">{weatherData?.wind.speed} </p>
    <p className="label">Wind Speed:</p>
 
  </div>
</div>

    </div>
  );
};

export default WeatherApp;

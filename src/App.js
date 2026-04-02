import React, { useState } from 'react';
import './App.css';
import City from './components/City';

function App() {
  const [cities, setCities] = useState([]);
  const API_KEY = '32d2e9d2384d80c12b39ea6013c0432e'; 

  
  const getWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        alert("Місто не знайдено!");
        return;
      }
      
      const data = await response.json();

      const newCity = {
        name: data.name,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon
      };

      
      setCities((prev) => {
        if (prev.find(c => c.name === newCity.name)) {
          alert("Це місто вже є у списку!");
          return prev;
        }
        return [newCity, ...prev];
      });
      
    } catch (error) {
      console.error("Помилка отримання даних:", error);
    }
  };


  const updateCity = async (oldName, newName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newName}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        alert("Місто не знайдено!");
        return;
      }
      
      const data = await response.json();

      const updatedData = {
        name: data.name,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon
      };

      setCities(prev => prev.map(c => c.name === oldName ? updatedData : c));
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  
  const deleteCity = (name) => {
    setCities(prev => prev.filter(c => c.name !== name));
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Отримання погоди</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const cityName = e.target.elements.cityInput.value;
          if (cityName) {
            getWeather(cityName); 
            e.target.reset();
          }
        }}>
          <input 
            type="text" 
            name="cityInput" 
            className="main-input" 
            placeholder="Введіть місто..." 
          />
          <button type="submit" className="btn-get">Отримати</button>
        </form>
      </div>

      <div className="main-content">
        <h2>Всі міста</h2>
        <div className="cities-list">
          {cities.length === 0 ? (
            <p className="no-cities">Поки що немає міст</p>
          ) : (
            cities.map((city, index) => (
              <City 
                key={index} 
                cityData={city} 
                deleteCity={deleteCity} 
                updateCity={updateCity} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
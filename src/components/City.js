import React from 'react';
import Edit from './Edit';

const City = ({ cityData, deleteCity, updateCity }) => {
  return (
    <div className="city-card">
      <div className="city-info">
        <h3>{cityData.name}</h3>
        <p>Температура: {cityData.temp}°C</p>
        <p>Відчувається: {cityData.feelsLike}°C</p>
      </div>
      
      {cityData.icon && (
        <img 
  src={`https://openweathermap.org/img/wn/${cityData.icon}@2x.png`} 
  alt="weather-icon" 
  className="weather-icon"
/>
      )}

      <div className="city-controls">
        <button className="btn-delete" onClick={() => deleteCity(cityData.name)}>Видалити</button>
        <Edit oldCityName={cityData.name} onEditCity={updateCity} />
      </div>
    </div>
  );
};

export default City;
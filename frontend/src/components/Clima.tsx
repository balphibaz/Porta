import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  hourly: {
    temperature_2m: number[];
  };
}

const Climas: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latitude = '51.5074'; // Latitud de la ciudad (por ejemplo, Londres)
  const longitude = '-0.1278'; // Longitud de la ciudad (por ejemplo, Londres)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar los datos del clima: {error}</p>;
  }

  return (
    <div className="weather-container">
      <h2>Clima en la ubicación ({latitude}, {longitude})</h2>
      <p>Temperatura actual: {weatherData?.hourly.temperature_2m[0]}°C</p>
    </div>
  );
};

export default Climas;
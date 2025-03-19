import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudDrizzle } from 'lucide-react';

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: CloudLightning,
  Drizzle: CloudDrizzle,
};

const ForecastCard = ({ forecast }) => {
  const WeatherIcon = weatherIcons[forecast.main] || Cloud;
  const date = new Date(forecast.date);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className={`p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg text-center`}>
      <p className="font-medium mb-2">{day}</p>
      <WeatherIcon className="h-8 w-8 mx-auto text-blue-500 mb-2" />
      <div className="space-y-1">
        <p className="text-lg font-bold">{Math.round(forecast.temp_max)}°</p>
        <p className="">{Math.round(forecast.temp_min)}°</p>
      </div>
    </div>
  );
};

export default ForecastCard;
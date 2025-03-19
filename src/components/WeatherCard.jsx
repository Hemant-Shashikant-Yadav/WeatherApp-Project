import React from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
} from "lucide-react";

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: CloudLightning,
  Drizzle: CloudDrizzle,
};

const WeatherCard = ({ weather, unit, className = "" }) => {
  const WeatherIcon = weatherIcons[weather.main] || Cloud;

  return (
    <div
      className={`p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{weather.city}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {weather.description}
          </p>
        </div>
        <WeatherIcon className="h-16 w-16 text-blue-500" />
      </div>
      <div className="mt-6">
        <div className="flex items-end">
          <span className="text-6xl font-bold">
            {Math.round(weather.temp)}°
          </span>
          <span className="text-2xl ml-2">{unit === "metric" ? "C" : "F"}</span>
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Min: </span>
            <span className="font-medium">{Math.round(weather.temp_min)}°</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Max: </span>
            <span className="font-medium">{Math.round(weather.temp_max)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

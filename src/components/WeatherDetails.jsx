import React from 'react';
import { ThermometerSun, Wind, Droplets } from 'lucide-react';

const WeatherDetails = ({ weather }) => {

  return (
    <div className={`p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4">Details</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ThermometerSun className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Feels like</p>
            <p className="font-medium">{weather.feels_like}°</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Wind className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind speed</p>
            <p className="font-medium">{weather.wind_speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Droplets className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
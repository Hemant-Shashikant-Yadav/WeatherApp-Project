import React, { useState, useEffect, useCallback } from "react";
import {
  Sun,
  Moon,
  MapPin,
  Search,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import { useWeather } from "./hooks/useWeather";
import { useTheme } from "./hooks/useTheme";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const { isDark, toggleTheme } = useTheme();
  const { coords, getLocation } = useGeolocation();
  const {
    weather,
    forecast,
    isLoading,
    error,
    fetchWeather,
    fetchSuggestions,
    unit,
    toggleUnit,
  } = useWeather();

  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions(debouncedQuery);
    }
  }, [debouncedQuery, fetchSuggestions]);

  useEffect(() => {
    if (coords) {
      fetchWeather({ lat: coords.latitude, lon: coords.longitude });
    }
  }, [coords, fetchWeather]);

  const handleSearch = useCallback(
    (city) => {
      setQuery(city);
      fetchWeather({ city });
    },
    [fetchWeather]
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sun className="h-8 w-8" />
            Weather App
          </h1>
          <div className="flex gap-4">
            <button
              onClick={toggleUnit}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              {unit === "metric" ? "°C" : "°F"}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSelect={handleSearch}
              isLoading={isLoading}
            />
            <button
              onClick={getLocation}
              className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              <MapPin className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {weather && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <WeatherCard
              weather={weather}
              unit={unit}
              className="lg:col-span-2"
            />
            <WeatherDetails weather={weather} />
          </div>
        )}

        {forecast && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
            <div className="grid gap-4 md:grid-cols-5">
              {forecast.map((day, index) => (
                <ForecastCard key={index} forecast={day} unit={unit} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { useState, useCallback } from "react";

const API_KEY = import.meta.env.REACT_APP_WEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  const fetchWeather = useCallback(
    async ({ city, lat, lon }) => {
      try {
        setIsLoading(true);
        setError(null);

        let url;
        if (city) {
          url = `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
        } else {
          url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        setWeather({
          city: data.name,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
          main: data.weather[0].main,
          description: data.weather[0].description,
        });

        // Fetch 5-day forecast
        const forecastUrl = `${BASE_URL}/forecast?${city ? `q=${city}` : `lat=${lat}&lon=${lon}`}&units=${unit}&appid=${API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Process forecast data to get daily values
        const dailyForecast = forecastData.list
          .filter((item, index) => index % 8 === 0)
          .slice(0, 5)
          .map((item) => ({
            date: item.dt_txt,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            main: item.weather[0].main,
          }));

        setForecast(dailyForecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [unit]
  );

  const fetchSuggestions = useCallback(async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/find?q=${query}&type=like&sort=population&cnt=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data.list.map((city) => city.name));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  }, []);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const newUnit = prev === "metric" ? "imperial" : "metric";
      if (weather) {
        fetchWeather({ city: weather.city });
      }
      return newUnit;
    });
  }, [weather, fetchWeather]);

  return {
    weather,
    forecast,
    suggestions,
    isLoading,
    error,
    fetchWeather,
    fetchSuggestions,
    unit,
    toggleUnit,
  };
};

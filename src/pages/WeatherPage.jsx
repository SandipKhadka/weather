import React, { useEffect, useState, useCallback } from "react";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherData } from "../utils/fetchweatherdata";
import NavBar from "../components/NavBar";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export default function WeatherPage() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("Kathmandu");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadWeather = useCallback(async (cityName) => {
        if (!cityName.trim()) {
            setError("Please enter a valid city name.");
            setWeatherData(null);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            console.log(`Fetching weather for: ${cityName}`);
            const data = await fetchWeatherData(cityName, API_KEY);
            setWeatherData(data);
        } catch (err) {
            console.error("loadWeather error:", err.message);
            setError(
                err.message.includes("API key")
                    ? "Invalid API key. Please verify your OpenWeatherMap API key in .env."
                    : err.message.includes("City not found")
                        ? "City not found. Please try another city (e.g., London)."
                        : `Failed to fetch weather data: ${err.message}. Check your API key or network.`
            );
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWeather(city);
    }, [city, loadWeather]);

    const handleSearch = (query) => {
        setCity(query);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <NavBar onSearch={handleSearch} />
            {error && (
                <p className="text-center mt-6 text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                    {error}
                </p>
            )}
            {isLoading ? (
                <p className="text-center mt-6">Loading weather data...</p>
            ) : weatherData ? (
                <WeatherCard
                    currentTemp={weatherData.currentTemp}
                    location={weatherData.location}
                    weatherDescription={weatherData.weatherDescription}
                    weatherIcon={weatherData.weatherIcon}
                    humidity={weatherData.humidity}
                    windSpeed={weatherData.windSpeed}
                    dailyForecasts={weatherData.dailyForecasts}
                    dropIcon="💧"
                />
            ) : (
                <p className="text-center mt-6">No weather data available.</p>
            )}
        </div>
    );
}

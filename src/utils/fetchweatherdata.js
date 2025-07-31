export async function fetchWeatherData(city = 'Kathmandu', apiKey) {
    try {
        const geoRes = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
        );

        if (!geoRes.ok) {
            throw new Error(
                geoRes.status === 401
                    ? 'Invalid API key'
                    : `Geocoding failed: ${geoRes.statusText}`
            );
        }

        const geoData = await geoRes.json();
        if (!geoData.length) {
            throw new Error(`City "${city}" not found.`);
        }

        const { lat, lon, name, country } = geoData[0];

        // Fetch current weather
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        if (!weatherRes.ok) {
            throw new Error(
                weatherRes.status === 401
                    ? 'Invalid API key'
                    : `Weather fetch failed: ${weatherRes.statusText}`
            );
        }

        const weatherData = await weatherRes.json();

        // Fetch forecast data
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        if (!forecastRes.ok) {
            throw new Error(
                forecastRes.status === 401
                    ? 'Invalid API key'
                    : `Forecast fetch failed: ${forecastRes.statusText}`
            );
        }

        const forecastData = await forecastRes.json();

        const dailyMap = {};

        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric'
            });

            if (!dailyMap[dayKey]) {
                dailyMap[dayKey] = { temps: [], rainProbs: [], icons: [] };
            }

            dailyMap[dayKey].temps.push(item.main.temp);
            dailyMap[dayKey].rainProbs.push(item.pop || 0);
            dailyMap[dayKey].icons.push(item.weather[0]?.icon);
        });

        const dailyForecasts = Object.entries(dailyMap)
            .slice(0, 5)
            .map(([day, data]) => {
                const maxTemp = Math.round(Math.max(...data.temps));
                const minTemp = Math.round(Math.min(...data.temps));
                const avgRain = Math.round(
                    (data.rainProbs.reduce((a, b) => a + b, 0) /
                        data.rainProbs.length) *
                        100
                );
                const mostCommonIcon = data.icons
                    .sort(
                        (a, b) =>
                            data.icons.filter(i => i === a).length -
                            data.icons.filter(i => i === b).length
                    )
                    .pop();

                return {
                    day,
                    temp: `${maxTemp}/${minTemp}°`,
                    rain: `${avgRain}%`,
                    icon: getWeatherIcon(mostCommonIcon)
                };
            });

        return {
            currentTemp: `${Math.round(weatherData.main.temp)}°C`,
            location: `${weatherData.name}, ${weatherData.sys.country}`,
            weatherDescription: weatherData.weather[0]?.description || '',
            weatherIcon: getWeatherIcon(weatherData.weather[0]?.icon),
            humidity: `${weatherData.main.humidity}%`,
            windSpeed: `${weatherData.wind.speed} m/s`,
            dailyForecasts
        };
    } catch (error) {
        console.error('fetchWeatherData error:', error.message);
        throw error;
    }
}

function getWeatherIcon(iconCode) {
    const icons = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '🌤️',
        '02n': '🌥️',
        '03d': '☁️',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌦️',
        '10n': '🌧️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️',
        '50d': '🌫️',
        '50n': '🌫️'
    };
    return icons[iconCode] || '☀️';
}

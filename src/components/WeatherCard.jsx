import React from "react";

export default function WeatherCard({
    currentTemp,
    location,
    weatherDescription,
    weatherIcon,
    humidity,
    windSpeed,
    dailyForecasts = [],
    dropIcon,
}) {
    return (
        <>
            {/* Current Weather */}
            <div className="w-full 
                            max-w-screen-sm 
                            bg-white 
                            dark:bg-gray-900 
                            p-10 
                            rounded-xl 
                            ring-8 
                            ring-white 
                            dark:ring-gray-800 
                            ring-opacity-40 
                            dark:ring-opacity-60 
                            mx-auto 
                            mt-6"
            >
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-6xl font-bold text-black dark:text-white">
                            {currentTemp ?? "--"}
                        </span>
                        <span className="font-semibold mt-1 text-gray-500 dark:text-gray-300">
                            {location || "Unknown location"}
                        </span>
                        <span className="mt-1 text-gray-500 dark:text-gray-300 capitalize">
                            {weatherDescription || "No description"}
                        </span>
                    </div>
                    <span className="text-4xl">{weatherIcon ?? "☀️"}</span>
                </div>
                <div className="flex justify-between mt-6">
                    <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-300">Humidity</span>
                        <span className="font-semibold text-black dark:text-white">{humidity ?? "--"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-300">Wind Speed</span>
                        <span className="font-semibold text-black dark:text-white">{windSpeed ?? "--"}</span>
                    </div>
                </div>
            </div>
            {/* Daily Forecasts */}
            <div className="flex
                            flex-col
                            space-y-6
                            w-full
                            max-w-screen-sm
                            bg-white
                            dark:bg-gray-900
                            p-10 mt-6
                            rounded-xl
                            ring-8
                            ring-white
                            dark:ring-gray-800
                            ring-opacity-40
                            dark:ring-opacity-60
                            mx-auto"
            >
                {dailyForecasts.length > 0 ? (
                    dailyForecasts.map(({ day, temp, rain, icon }, index) => (
                        <div className="flex justify-between items-center" key={index}>
                            <span className="font-semibold text-lg w-1/4 text-black dark:text-white">
                                {day || "--"}
                            </span>
                            <div className="flex items-center justify-end w-1/4 pr-10 text-black dark:text-white">
                                <span className="font-semibold">{rain ?? "0%"}</span>
                                <span className="ml-2">{dropIcon}</span>
                            </div>
                            <div className="w-1/4 flex justify-center">
                                <span className="text-2xl">{icon ?? "☀️"}</span>
                            </div>
                            <span className="font-semibold text-lg w-1/4 text-right text-black dark:text-white">
                                {temp ?? "--"}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 dark:text-gray-400 w-full text-center">
                        No forecast data available
                    </div>
                )}
            </div>
        </>
    );
}

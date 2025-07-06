import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/weather?city=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error:", error);
      //setError("Failed to fetch weather data");
    }
  };

  console.log(weather);
  return (
    <>
      <section className="min-h-screen flex flex-col justify-between">
        <div className="">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="enter city name"
              className="border w-8/12 rounded-xl"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <button
              className="w-20 h-10 bg-blue-300 hover:bg-blue-400 m-2 p-2 rounded"
              onClick={fetchWeather}
            >
              Search
            </button>
          </div>

          {weather ? (
            <div className="flex flex-col">
              <h2 className="flex">
                <FaLocationDot /> {weather.name}
              </h2>
              <h2 className="flex">
                {" "}
                <FaTemperatureHigh />
                {weather.main.temp}°C
              </h2>
              <h2 className="flex">
                {" "}
                <FiSunrise />
                Sunrise:{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </h2>
              <h2 className="flex">
                {" "}
                <FiSunset />
                Sunset:{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </h2>
              <h2>Weather Condition: {weather.weather[0].description}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
        {weather ? (
          <div className="h-10 flex gap-15 mb-5 justify-evenly">
            {" "}
            <p className="flex">
              Humidity {weather.main ? weather.main.humidity : ""}
              <WiHumidity />{" "}
            </p>
            <p>
              Feels Like {weather.main ? weather.main.feels_like : ""}°C
            </p>{" "}
            <p className="flex">
              <FaTemperatureArrowDown /> Min temp{" "}
              {weather.main ? weather.main.temp_min : ""}°C{" "}
            </p>{" "}
            <p className="flex">
              <FaTemperatureArrowUp />
              Max temp {weather.main ? weather.main.temp_max : ""}°C{" "}
            </p>
            <p>Pressure {weather.main ? weather.main.pressure : ""}</p>
            <p className="flex">
              <FaWind />
              Wind speed {weather.wind ? weather.wind.speed : ""}mph{" "}
            </p>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default App;

// // import axios from "axios";
// // import { FiSunrise } from "react-icons/fi";
// // import { FiSunset } from "react-icons/fi";
// // import { FaLocationDot } from "react-icons/fa6";
// // import { FaTemperatureHigh } from "react-icons/fa";
// // import { WiHumidity } from "react-icons/wi";
// // import { FaWind } from "react-icons/fa";
// // import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";

// // const App = () => {
// //   const [cityname, setCityname] = useState("");
// //   const [weather, setWeather] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [debouncedCityname, setDebouncedCityname] = useState("");

// //   // Debounce effect - updates debouncedCityname after 500ms delay
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setDebouncedCityname(cityname);
// //     }, 500);

// //     return () => clearTimeout(timer);
// //   }, [cityname]);

// //   // Auto-fetch weather when debouncedCityname changes
// //   useEffect(() => {
// //     if (debouncedCityname.trim()) {
// //       fetchWeatherDebounced(debouncedCityname);
// //     } else {
// //       setWeather({});
// //       setError("");
// //     }
// //   }, [debouncedCityname]);

// //   async function fetchWeatherDebounced(city) {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const url = `http://localhost:4000/weather?city=${cityname}`;
// //       const response = await axios.get(url);

// //       setWeather(response.data);
// //       console.log(response.data);
// //     } catch (error) {
// //       console.error("Error fetching weather:", error);
// //       setError("Failed to fetch weather data. Please try again.");
// //       setWeather({});
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   async function fetchWeather() {
// //     if (!cityname.trim()) {
// //       setError("Please enter a city name");
// //       return;
// //     }

// //     fetchWeatherDebounced(cityname);
// //   }

// //   // Handle Enter key press in input
// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       fetchWeather();
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col gap-2 h-screen justify-between p-4">
// //       <div className="text-black">
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="Enter City Name (searches automatically)"
// //             className="border w-11/12 rounded p-2 mr-2"
// //             value={cityname}
// //             onChange={(e) => {
// //               setCityname(e.target.value);
// //               setError(""); // Clear error when user types
// //             }}
// //             onKeyUp={handleKeyPress}
// //           />
// //           <button
// //             className="rounded bg-blue-200 hover:bg-blue-300 p-2 px-4"
// //             onClick={fetchWeather}
// //             disabled={loading}
// //           >
// //             {loading ? "Loading..." : "Search"}
// //           </button>
// //         </div>

// //         {error && <div className="text-red-500 mb-4">{error}</div>}

// //         {weather.name && (
// //           <>
// //             <h2 className="text-2xl font-bold flex items-center gap-2">
// //               <FaLocationDot />
// //               {weather.name}
// //             </h2>
// //             <h3 className="text-xl flex items-center gap-2">
// //               <FaTemperatureHigh />
// //               {weather.main ? Math.round(weather.main.temp) : ""} °C
// //             </h3>

// //             {weather.weather && weather.weather[0] && (
// //               <p className="text-lg capitalize">
// //                 {weather.weather[0].description}
// //               </p>
// //             )}

// //             <p className="flex items-center gap-2">
// //               <FiSunrise />
// //               Sunrise:{" "}
// //               {weather.sys
// //                 ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
// //                 : ""}
// //             </p>
// //             <p className="flex items-center gap-2">
// //               <FiSunset />
// //               Sunset:{" "}
// //               {weather.sys
// //                 ? new Date(weather.sys.sunset * 1000).toLocaleTimeString()
// //                 : ""}
// //             </p>
// //           </>
// //         )}
// //       </div>

// //       {weather.main && (
// //         <div
// //           id="bottomoption"
// //           className="border rounded p-4 grid grid-cols-2 md:grid-cols-3 gap-4"
// //         >
// //           <p className="flex items-center gap-2">
// //             <WiHumidity />
// //             Humidity: {weather.main.humidity}%
// //           </p>
// //           <p className="flex items-center gap-2">
// //             <FaTemperatureHigh />
// //             Feels Like: {Math.round(weather.main.feels_like)}°C
// //           </p>
// //           <p className="flex items-center gap-2">
// //             <FaTemperatureArrowDown />
// //             Min: {Math.round(weather.main.temp_min)}°C
// //           </p>
// //           <p className="flex items-center gap-2">
// //             <FaTemperatureArrowUp />
// //             Max: {Math.round(weather.main.temp_max)}°C
// //           </p>
// //           <p className="flex items-center gap-2">
// //             Pressure: {weather.main.pressure} hPa
// //           </p>
// //           <p className="flex items-center gap-2">
// //             <FaWind />
// //             Wind: {weather.wind ? weather.wind.speed : ""} m/s
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;

// // import React, { useEffect, useState } from "react";
// // import {
// //   Sunrise,
// //   Sunset,
// //   MapPin,
// //   Thermometer,
// //   Droplets,
// //   Wind,
// //   TrendingUp,
// //   TrendingDown,
// //   Cloud,
// //   Sun,
// //   CloudRain,
// //   Search,
// //   Loader,
// //   AlertCircle,
// // } from "lucide-react";

// // const App = () => {
// //   const [cityname, setCityname] = useState("");
// //   const [weather, setWeather] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [debouncedCityname, setDebouncedCityname] = useState("");

// //   // Debounce effect - updates debouncedCityname after 1000ms delay
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setDebouncedCityname(cityname);
// //     }, 1000);

// //     return () => clearTimeout(timer);
// //   }, [cityname]);

// //   // Auto-fetch weather when debouncedCityname changes
// //   useEffect(() => {
// //     if (debouncedCityname.trim() && debouncedCityname.length > 2) {
// //       fetchWeatherDebounced(debouncedCityname);
// //     } else if (debouncedCityname.trim() === "") {
// //       setWeather({});
// //       setError("");
// //     }
// //   }, [debouncedCityname]);

// //   async function fetchWeatherDebounced(city) {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const url = `http://localhost:4000/weather?city=${encodeURIComponent(
// //         city
// //       )}`;

// //       const response = await fetch(url, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         mode: "cors",
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(
// //           errorData.error || `HTTP error! status: ${response.status}`
// //         );
// //       }

// //       const data = await response.json();
// //       setWeather(data);
// //       console.log("Weather data:", data);
// //     } catch (error) {
// //       console.error("Error fetching weather:", error);

// //       if (error.name === "TypeError" && error.message.includes("fetch")) {
// //         setError(
// //           "Cannot connect to weather service. Make sure the backend server is running on port 4000."
// //         );
// //       } else if (error.message.includes("404")) {
// //         setError("City not found. Please check the spelling and try again.");
// //       } else if (error.message.includes("401")) {
// //         setError(
// //           "API key error. Please check your OpenWeather API configuration."
// //         );
// //       } else {
// //         setError(
// //           error.message || "Failed to fetch weather data. Please try again."
// //         );
// //       }
// //       setWeather({});
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   async function fetchWeather() {
// //     if (!cityname.trim()) {
// //       setError("Please enter a city name");
// //       return;
// //     }

// //     if (cityname.trim().length < 3) {
// //       setError("City name must be at least 3 characters");
// //       return;
// //     }

// //     fetchWeatherDebounced(cityname);
// //   }

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       fetchWeather();
// //     }
// //   };

// //   const getWeatherIcon = (weatherMain) => {
// //     switch (weatherMain?.toLowerCase()) {
// //       case "clear":
// //         return <Sun className="text-yellow-500" size={24} />;
// //       case "clouds":
// //         return <Cloud className="text-gray-500" size={24} />;
// //       case "rain":
// //         return <CloudRain className="text-blue-500" size={24} />;
// //       default:
// //         return <Sun className="text-yellow-500" size={24} />;
// //     }
// //   };

// //   const formatTime = (timestamp) => {
// //     return new Date(timestamp * 1000).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
// //       <div className="max-w-md mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-white mb-2">Weather App</h1>
// //           <p className="text-blue-100">Get current weather information</p>
// //         </div>

// //         {/* Search Section */}
// //         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Enter city name..."
// //               className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               value={cityname}
// //               onChange={(e) => {
// //                 setCityname(e.target.value);
// //                 setError("");
// //               }}
// //               onKeyUp={handleKeyPress}
// //             />
// //             <button
// //               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 transition-colors"
// //               onClick={fetchWeather}
// //               disabled={loading}
// //             >
// //               {loading ? (
// //                 <Loader className="animate-spin" size={20} />
// //               ) : (
// //                 <Search size={20} />
// //               )}
// //             </button>
// //           </div>

// //           {error && (
// //             <div className="mt-3 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center gap-2">
// //               <AlertCircle size={20} />
// //               <span>{error}</span>
// //             </div>
// //           )}

// //           {loading && !error && (
// //             <div className="mt-4 text-center text-gray-600">
// //               <Loader className="animate-spin mx-auto mb-2" size={24} />
// //               <p>Searching for weather data...</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Weather Display */}
// //         {weather.name && !loading && (
// //           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// //             {/* Main Weather Info */}
// //             <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <div className="flex items-center gap-2">
// //                   <MapPin size={20} />
// //                   <h2 className="text-2xl font-bold">{weather.name}</h2>
// //                 </div>
// //                 {weather.weather && getWeatherIcon(weather.weather[0]?.main)}
// //               </div>

// //               <div className="flex items-center gap-3 mb-2">
// //                 <Thermometer size={24} />
// //                 <span className="text-4xl font-bold">
// //                   {weather.main ? Math.round(weather.main.temp) : ""}°C
// //                 </span>
// //               </div>

// //               {weather.weather && weather.weather[0] && (
// //                 <p className="text-blue-100 capitalize text-lg">
// //                   {weather.weather[0].description}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Sun Times */}
// //             <div className="p-4 bg-gray-50 border-b">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="flex items-center gap-2 text-gray-700">
// //                   <Sunrise size={20} className="text-orange-500" />
// //                   <div>
// //                     <p className="text-sm text-gray-500">Sunrise</p>
// //                     <p className="font-semibold">
// //                       {weather.sys ? formatTime(weather.sys.sunrise) : "--:--"}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-gray-700">
// //                   <Sunset size={20} className="text-orange-600" />
// //                   <div>
// //                     <p className="text-sm text-gray-500">Sunset</p>
// //                     <p className="font-semibold">
// //                       {weather.sys ? formatTime(weather.sys.sunset) : "--:--"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Weather Details */}
// //             {weather.main && (
// //               <div className="p-4">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //                   Weather Details
// //                 </h3>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                     <Thermometer size={20} className="text-red-500" />
// //                     <div>
// //                       <p className="text-sm text-gray-500">Feels like</p>
// //                       <p className="font-semibold">
// //                         {Math.round(weather.main.feels_like)}°C
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                     <Droplets size={20} className="text-blue-500" />
// //                     <div>
// //                       <p className="text-sm text-gray-500">Humidity</p>
// //                       <p className="font-semibold">{weather.main.humidity}%</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                     <TrendingDown size={20} className="text-blue-600" />
// //                     <div>
// //                       <p className="text-sm text-gray-500">Min Temp</p>
// //                       <p className="font-semibold">
// //                         {Math.round(weather.main.temp_min)}°C
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                     <TrendingUp size={20} className="text-red-600" />
// //                     <div>
// //                       <p className="text-sm text-gray-500">Max Temp</p>
// //                       <p className="font-semibold">
// //                         {Math.round(weather.main.temp_max)}°C
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                     <Wind size={20} className="text-gray-600" />
// //                     <div>
// //                       <p className="text-sm text-gray-500">Wind Speed</p>
// //                       <p className="font-semibold">
// //                         {weather.wind ? weather.wind.speed : "--"} m/s
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                     <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
// //                       <div className="w-2 h-2 bg-white rounded-full"></div>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-500">Pressure</p>
// //                       <p className="font-semibold">
// //                         {weather.main.pressure} hPa
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Footer */}
// //         <div className="text-center mt-8 text-blue-100">
// //           <p className="text-sm">
// //             Weather data updates automatically as you type
// //           </p>
// //           <p className="text-xs mt-1 opacity-75">
// //             Make sure your backend server is running on port 4000
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

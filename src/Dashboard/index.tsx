import { useEffect, useRef, useState } from "react";
import { SiGooglemaps } from "react-icons/si";
import IoTMap from "./IotMap";
import { IoMdArrowBack } from "react-icons/io";
import { cityList } from "../utils";
import { getRecord, subscribeToRecord } from '../firebase';

const Dashboard: React.FC = () => {
  const [weather, setWeather] = useState<string>("default"); // city state
  const [city, setCity] = useState<string>(""); // city state
  const [showMap, setShowMap] = useState<boolean>(false); // show history state
  const [networkData, setNetworkData] = useState(null);

  const weatherResultRef = useRef<HTMLDivElement | null>(null);
  const motivationRef = useRef<HTMLDivElement | null>(null);
  const hourlyForecastRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getRecord("weather");
      setNetworkData(data || []); // Ensure it's an array
    };
    fetchWeatherData();

    const unsubscribe = subscribeToRecord("weather", (data) => {
      setNetworkData(data || []); // Ensure it's an array
    });
    return () => {
      unsubscribe(); // Clean up the subscription on component unmount
    };
  }, []);

  useEffect(() => {
    const weatherData: any = networkData?.[city] ?? null;
    console.log(JSON.stringify(weatherData))
    if (weatherData) {
      const condition = weatherData.condition.toLowerCase();
      const temp = weatherData.temp;
      const icon = weatherData.icon;
      let glow = "#00d4ff";
      let message = "Enjoy your day!";

      if (condition.includes("rain")) {
        glow = "#0fd0ff";
        message = "☔ Don't forget your umbrella!";
        setWeather("rainy");
        document.body.style.background = "url(images/rainy.jpeg) no-repeat center center fixed";
      } else if (condition.includes("cloud")) {
        glow = "#aaaaff";
        message = "🌥 A cozy cloudy day!";
        setWeather("cloudy");
        document.body.style.background = "url(images/cloudy.jpeg) no-repeat center center fixed";
      } else if (condition.includes("clear")) {
        glow = "#ffe066";
        message = "☀ Sunshine vibes!";
        setWeather("sunny");
        document.body.style.background = "url(images/sunny.jpeg) no-repeat center center fixed";
      } else if (condition.includes("snow")) {
        glow = "#d0f0ff";
        message = "❄ Stay warm out there!";
        setWeather("snowy");
        document.body.style.background = "url(images/snowy.jpeg) no-repeat center center fixed";
      } else if (temp < 10) {
        glow = "#88cfff";
        message = "🧣 It's chilly! Stay warm.";
        setWeather("chilly");
        document.body.style.background = "url(images/cold.jpeg) no-repeat center center fixed";
      }
      document.body.style.backgroundSize = 'cover';
      motivationRef.current!.innerHTML = message;
      const root = document.documentElement; // This references the <html> element
      root.style.setProperty('--glow-color', glow); // Set the CSS variable
      // Dynamically add flexbox properties
      const rootElement = document.getElementById('root') as HTMLElement;
      rootElement.style.setProperty('display', 'flex');
      rootElement.style.setProperty('flex-direction', 'column');
      rootElement.style.setProperty('align-items', 'center');
      weatherResultRef.current!.innerHTML = `
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
          <h3 class="color-white">${weatherData.city}, ${weatherData.country}</h3>
          <p class="color-white">${condition} | ${temp}°C</p>
        `;

      if (weatherData.forecastData) {
        const forecastItems = weatherData.forecastData.list.slice(0, 10).map((hourData: any) => {
          const forecastTime = new Date(hourData.dt * 1000);
          const time = forecastTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return `
          <div class="forecast-item">
            <p class="color-white"><strong>${time}</strong></p>
            <img src="https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png" alt="icon"/>
            <p class="color-white">${Math.round(hourData.main.temp)}°C</p>
          </div>
        `;
        });

        // Safely set innerHTML for the forecast data
        if (hourlyForecastRef.current) {
          hourlyForecastRef.current.innerHTML = forecastItems.join('');
        }
      }
    }
  }, [city])

  return (
    <>
      <div className="sidebar position-relative w-100">
        <div className="sidebar-content position-absolute d-flex justify-content-center align-items-center flex-column">
          <button className="btn btn-primary sidebar-toggle-btn" onClick={() => setShowMap(!showMap)}>
            {showMap && <><IoMdArrowBack /> Back</>}
            {!showMap && <><SiGooglemaps /> Map</>}
          </button>
        </div>
      </div>
      {!showMap && <>
        <div className="glass-panel">
          <div className={`${weather}-weather-orb`}></div>
          <h2 className="color-white">Accurate Weather</h2>
          <div className="input-group city-input">

            <select
              className="form-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cityList.map(({ city, country, p_id }) => (
                <option key={p_id} value={p_id}>
                  {city}, {country}
                </option>
              ))}
            </select>
            {/* <button type="button" className={city && 'cursor-no-drop'} >Get</button> */}
          </div>
          <div ref={weatherResultRef} className="weather-data"></div>
          <div ref={motivationRef} className="motivation"></div>
        </div>
        <div ref={hourlyForecastRef} className="forecast-container"></div>
      </>}
      {showMap && <IoTMap networkData={networkData ? Object.values(networkData) : []} />}
    </>
  );
};

export default Dashboard;

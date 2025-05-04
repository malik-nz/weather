import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

const App: React.FC = () => {
  const [weather, setWeather] = useState<string>("default"); // city state
  const [city, setCity] = useState<string>(""); // city state
  const [weatherData, setWeatherData] = useState<any>(null); // weather data state
  const [forecastData, setForecastData] = useState<any>(null); // forecast data state
  const [loading, setLoading] = useState<boolean>(false); // loading state
  const [error, setError] = useState<string>(""); // error state

  const weatherResultRef = useRef<HTMLDivElement | null>(null);
  const motivationRef = useRef<HTMLDivElement | null>(null);
  const hourlyForecastRef = useRef<HTMLDivElement | null>(null);
  const [client, setClient] = useState<any>(null);
  const [connection, setConnectStatus] = useState<string | null>(null);

  const mqttConnect = useCallback(() => {
    const host = 'wss://mqtt.eclipseprojects.io:443/mqtt';
    const options = {
      clientId: 'client_' + Math.random().toString(16).substr(2, 8),
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // 30 seconds
    };
    setConnectStatus('Connecting');
    console.log("window.mqtt", window.mqtt)
    if (window.mqtt) {
      setClient(window.mqtt.connect(host, options));
    }
  }, []);

  useEffect(mqttConnect, [])

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
        console.log('Connected to broker');
      });

      client.on('error', (err: any) => {
        setConnectStatus('Error');
        console.error('Connection error:', err);
      });
    }
  }, [client]);

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY || "your_api_key_here";
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(currentUrl);
      const forecastResponse = await fetch(forecastUrl);
      const data = await response.json();
      const forecastData = await forecastResponse.json();

      if (data.cod === 200 && forecastData.cod === "200") {
        setWeatherData(data);
        setForecastData(forecastData);
      } else {
        document.body.style.background = "radial-gradient(circle at top, #141e30, #0f0f0f)";
        setError("City not found.");
        setWeatherData(null);
        setForecastData(null);
      }
    } catch (err: any) {
      console.log(err)
      setError("Failed to fetch data.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.weather[0].main.toLowerCase();
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
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
          <h3>${weatherData.name}, ${weatherData.sys.country}</h3>
          <p>${condition} | ${temp}°C</p>
        `;
    }

    if (forecastData) {
      const forecastItems = forecastData.list.slice(0, 10).map((hourData: any) => {
        const forecastTime = new Date(hourData.dt * 1000);
        const time = forecastTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
          <div class="forecast-item">
            <p><strong>${time}</strong></p>
            <img src="https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png" alt="icon"/>
            <p>${Math.round(hourData.main.temp)}°C</p>
          </div>
        `;
      });

      // Safely set innerHTML for the forecast data
      if (hourlyForecastRef.current) {
        hourlyForecastRef.current.innerHTML = forecastItems.join('');
      }
    }
  }, [weatherData, forecastData]);

  return (
    <>
      {loading && <div className="loading-overlay show"><Spinner /></div>}
      <div className="glass-panel">
        <div className={`${weather}-weather-orb`}></div>
        <h2>Accurate Weather</h2>
        <div className="input-group city-input">
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="button" onClick={getWeather}>
            Get
          </button>
        </div>
        {error && <p className="text-warning">{error}</p>}
        <div ref={weatherResultRef} className="weather-data"></div>
        <div ref={motivationRef} className="motivation"></div>
      </div>
      <div ref={hourlyForecastRef} className="forecast-container"></div>
    </>
  );
};

export default App;

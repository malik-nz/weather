import { useRef, useState } from "react";
import { SiGooglemaps } from "react-icons/si";
import IoTMap from "./IotMap";
import { IoMdArrowBack } from "react-icons/io";
import { cityList } from "../utils";


const Dashboard: React.FC = () => {
  const [city, setCity] = useState<string>(""); // city state
  const [showMap, setShowMap] = useState<boolean>(false); // show history state

  const weatherResultRef = useRef<HTMLDivElement | null>(null);
  const motivationRef = useRef<HTMLDivElement | null>(null);
  const hourlyForecastRef = useRef<HTMLDivElement | null>(null);

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
          <div className={`default-weather-orb`}></div>
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
            <button type="button" className={city && 'cursor-no-drop'} >Get</button>
          </div>
          <div ref={weatherResultRef} className="weather-data"></div>
          <div ref={motivationRef} className="motivation"></div>
        </div>
        <div ref={hourlyForecastRef} className="forecast-container"></div>
      </>}
      {showMap && <IoTMap />}
    </>
  );
};

export default Dashboard;

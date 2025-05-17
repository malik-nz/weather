type City = {
    p_id: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
};

export const cityList: City[] = [
  { p_id: "id_1", city: "New York City", country: "United States", latitude: 40.7128, longitude: -74.006 },
  { p_id: "id_2", city: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
  { p_id: "id_3", city: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
  { p_id: "id_4", city: "Tokyo", country: "Japan", latitude: 35.6895, longitude: 139.6917 },
  { p_id: "id_5", city: "Beijing", country: "China", latitude: 39.9042, longitude: 116.4074 },
  { p_id: "id_6", city: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093 },
  { p_id: "id_7", city: "Moscow", country: "Russia", latitude: 55.7558, longitude: 37.6173 },
  { p_id: "id_8", city: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708 },
  { p_id: "id_9", city: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357 },
  { p_id: "id_10", city: "Rio de Janeiro", country: "Brazil", latitude: -22.9068, longitude: -43.1729 },
  { p_id: "id_11", city: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832 },
  { p_id: "id_12", city: "Berlin", country: "Germany", latitude: 52.52, longitude: 13.405 },
  { p_id: "id_13", city: "Mumbai", country: "India", latitude: 19.076, longitude: 72.8777 },
  { p_id: "id_14", city: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { p_id: "id_15", city: "Johannesburg", country: "South Africa", latitude: -26.2041, longitude: 28.0473 },
  { p_id: "id_16", city: "Auckland", country: "New Zealand", latitude: -36.8485, longitude: 174.7633 },
  { p_id: "id_17", city: "Los Angeles", country: "United States", latitude: 34.0522, longitude: -118.2437 },
  { p_id: "id_18", city: "Seoul", country: "South Korea", latitude: 37.5665, longitude: 126.978 },
  { p_id: "id_19", city: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018 },
  { p_id: "id_20", city: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964 },
  { p_id: "id_21", city: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816 },
  { p_id: "id_22", city: "Lagos", country: "Nigeria", latitude: 6.5244, longitude: 3.3792 },
  { p_id: "id_23", city: "Chicago", country: "United States", latitude: 41.8781, longitude: -87.6298 },
  { p_id: "id_24", city: "Madrid", country: "Spain", latitude: 40.4168, longitude: -3.7038 },
  { p_id: "id_25", city: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784 }
];

export const networkData = [
    {
        city: 'London',
        lat: 51.5074,
        lon: -0.1278,
        status: 'Online',
        pi_id: 'PI123',
        sensor_id: 'SEN456',
        freshness: 5,
    },
    {
        city: 'New York',
        lat: 40.7128,
        lon: -74.006,
        status: 'Offline',
        pi_id: 'PI789',
        sensor_id: 'SEN012',
        freshness: 10,
    },
    {
        city: 'Rome',
        lat: 41.9028,
        lon: 12.4964,
        status: 'Offline',
        pi_id: 'PI789',
        sensor_id: 'SEN012',
        freshness: 10,
    },
];
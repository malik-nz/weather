import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners'; // or any other spinner you prefer
import './assets/spinner.css'; // CSS file for fade-in effect

const Spinner: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate a loading effect (e.g., fetching data)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 3000);
  }, []);

  return (
    <div className={`spinner-container ${loading ? 'fade-in' : 'fade-out'}`}>
      <ClipLoader size={50} color={"#00d4ff"} loading={loading} />
    </div>
  );
};

export default Spinner;

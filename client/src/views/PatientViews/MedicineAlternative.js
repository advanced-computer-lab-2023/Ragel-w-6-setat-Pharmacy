import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineAlternative = ({ medicineId }) => {
  const [alternativeData, setAlternativeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicineAlternative = async () => {
      try {
        const response = await axios.get(`/api/patient/medAlternative/${medicineId}`);
        setAlternativeData(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineAlternative();
  }, [medicineId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!alternativeData) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <h2>{alternativeData.message}</h2>
      {alternativeData.alternatives && alternativeData.alternatives.length > 0 ? (
        <div>
          <p>Here are some alternatives:</p>
          <ul>
            {alternativeData.alternatives.map((alternative) => (
              <li key={alternative._id}>{alternative.name}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {alternativeData.medicineDetails ? (
        <div>
          <p>Medicine Details:</p>
          <pre>{JSON.stringify(alternativeData.medicineDetails, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
};

export default MedicineAlternative;

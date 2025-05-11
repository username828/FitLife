import { useState } from 'react';


export default function HealthConditionForm() {
  const [formData, setFormData] = useState({

    blood_pressure_systolic: '',
    height_cm: '',
    blood_pressure_diastolic: '',
    resting_heart_rate: '',
    bmi: '',
    age: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/predict/health-condition`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({


          blood_pressure_systolic: parseFloat(formData.blood_pressure_systolic),  
          height_cm: parseFloat(formData.height_cm),
          blood_pressure_diastolic: parseFloat(formData.blood_pressure_diastolic),
          resting_heart_rate: parseFloat(formData.resting_heart_rate), 
          bmi: parseFloat(formData.bmi),
          age: parseFloat(formData.age)
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPrediction(data.predicted_condition);
        setError(null);
      } else {
        throw new Error(data.detail || 'Prediction failed');
      }
    } catch (err) {
      setError(err.message);
      setPrediction(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">Health Condition Predictor</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {[ 
          { label: 'Blood Pressure Systolic', name: 'blood_pressure_systolic' },
          { label: 'Height (cm)', name: 'height_cm' },
          { label: 'Blood Pressure Diastolic', name: 'blood_pressure_diastolic' },
          { label: 'Resting Heart Rate', name: 'resting_heart_rate' },
          { label: 'BMI', name: 'bmi' },
          { label: 'Age', name: 'age' },

        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-semibold text-gray-700 mb-1">{label}</label>
            <input
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        ))}



        <button
          type="submit"
          className="bg-purple-700 text-white py-3 px-6 rounded-lg hover:bg-purple-800 transition duration-300 font-semibold"
        >
          Predict
        </button>
      </form>

      {prediction && <div className="mt-6 text-green-700 text-xl font-bold text-center">📈 Predicted Health Condition: {prediction}</div>}
      {error && <div className="mt-6 text-red-600 text-center font-semibold">⚠️ {error}</div>}
    </div>
  );
} 
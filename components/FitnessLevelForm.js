import { useState } from 'react';
import { apiUrl } from './server';
export default function FitnessLevelForm() {
  const [formData, setFormData] = useState({
    weight_kg: '',
    daily_steps: '',
    calories_burned: '',
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
      const res = await fetch(`${apiUrl}/predict/fitness`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weight_kg: parseFloat(formData.weight_kg),
          daily_steps: parseFloat(formData.daily_steps),
          calories_burned: parseFloat(formData.calories_burned),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPrediction(data.fitness_level.toFixed(4));
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
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">Fitness Level Predictor</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {[
          { label: 'Weight (kg)', name: 'weight_kg' },
          { label: 'Daily Steps', name: 'daily_steps' },
          { label: 'Calories Burned', name: 'calories_burned' },
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

      {prediction && (
        <div className="mt-6 text-green-700 text-xl font-bold text-center">
          🧠 Predicted Fitness Level: {prediction}
        </div>
      )}
      {error && (
        <div className="mt-6 text-red-600 text-center font-semibold">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

const genderOptions = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 1 },
];

export default function WeightForm() {
  const [formData, setFormData] = useState({
    fitness_level: '',
    bmi: '',
    calories_burned: '',
    gender: '',
    daily_steps: '',
    height_cm: '',
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
      const res = await fetch('http://127.0.0.1:8001/predict/weight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fitness_level: parseFloat(formData.fitness_level),
          bmi: parseFloat(formData.bmi),
          calories_burned: parseFloat(formData.calories_burned),
          gender: parseInt(formData.gender),
          daily_steps: parseFloat(formData.daily_steps),
          height_cm: parseFloat(formData.height_cm),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPrediction(data.predicted_weight.toFixed(2));
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
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">Weight Predictor</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {[ 
          { label: 'Fitness Level', name: 'fitness_level' },
          { label: 'BMI', name: 'bmi' },
          { label: 'Calories Burned', name: 'calories_burned' },
          { label: 'Daily Steps', name: 'daily_steps' },
          { label: 'Height (cm)', name: 'height_cm' },
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

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Gender</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white py-3 px-6 rounded-lg hover:bg-purple-800 transition duration-300 font-semibold"
        >
          Predict
        </button>
      </form>

      {prediction && <div className="mt-6 text-green-700 text-xl font-bold text-center">📈 Predicted Weight: {prediction} kg</div>}
      {error && <div className="mt-6 text-red-600 text-center font-semibold">⚠️ {error}</div>}
    </div>
  );
} 
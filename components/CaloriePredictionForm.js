import { useState } from 'react';
import { apiUrl } from './server';
const activityOptions = [
  { label: 'Yoga', value: 0 },
  { label: 'Weight Training', value: 1 },
  { label: 'HIIT', value: 2 },
  { label: 'Dancing', value: 3 },
  { label: 'Cycling', value: 4 },
  { label: 'Basketball', value: 5 },
  { label: 'Tennis', value: 6 },
  { label: 'Walking', value: 7 },
  { label: 'Swimming', value: 8 },
  { label: 'Running', value: 9 },
];

const genderOptions = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 1 },
  { label: 'Other', value: 2 },
];

const intensityOptions = [
  { label: 'Low', value: 0 },
  { label: 'Medium', value: 1 },
  { label: 'High', value: 2 },
];

export default function CaloriePredictionForm() {
  const [formData, setFormData] = useState({
    duration_minutes: '',
    activity_type: '',
    weight_kg: '',
    fitness_level: '',
    bmi: '',
    height_cm: '',
    intensity: '',
    gender: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${apiUrl}/predict/calories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        duration_minutes: parseFloat(formData.duration_minutes),
        activity_type: parseInt(formData.activity_type),
        weight_kg: parseFloat(formData.weight_kg),
        fitness_level: parseFloat(formData.fitness_level),
        bmi: parseFloat(formData.bmi),
        height_cm: parseFloat(formData.height_cm),
        intensity: parseInt(formData.intensity),
        gender: parseInt(formData.gender),
      }),
    });

    const data = await res.json();
console.log("API response:", data); // Add this line
    if (res.ok) {
      // Ensure `predicted_calories_burned` exists and is a valid number
      if (data.calories_burned !== undefined && !isNaN(data.calories_burned)) {
        setPrediction(data.calories_burned.toFixed(2));
        setError(null);
      } else {
        throw new Error('Prediction result is invalid');
      }
    } else {
      throw new Error(data.detail || 'Prediction failed');
    }
  } catch (err) {
    setError(err.message || 'Something went wrong');
    setPrediction(null);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">
        Calorie Burn Predictor
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Numeric Inputs */}
        {[
          { label: 'Duration (minutes)', name: 'duration_minutes' },
          { label: 'Weight (kg)', name: 'weight_kg' },
          { label: 'Fitness Level', name: 'fitness_level' },
          { label: 'BMI', name: 'bmi' },
          { label: 'Height (cm)', name: 'height_cm' },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-semibold text-gray-700 mb-1">{label}</label>
            <input
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
              step="0.01"
            />
          </div>
        ))}

        {/* Dropdowns */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Activity Type</label>
          <select
            name="activity_type"
            value={formData.activity_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">Select Activity</option>
            {activityOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Intensity</label>
          <select
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">Select Intensity</option>
            {intensityOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">Select Gender</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-700 text-white py-3 px-6 rounded-lg hover:bg-purple-800 transition duration-300 font-semibold"
        >
          Predict
        </button>
      </form>

      {prediction && (
        <div className="mt-6 text-green-700 text-xl font-bold text-center">
          🔥 Predicted Calories Burned: {prediction} kcal
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
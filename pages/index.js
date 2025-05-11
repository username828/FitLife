import { useState, useEffect } from 'react';
import Head from 'next/head';
import WeightForm from '../components/WeightPredictionForm';
import CaloriePredictionForm from '../components/CaloriePredictionForm';
import HealthConditionForm from '../components/HealthConditionForm';
import FitnessLevelForm from '../components/FitnessLevelForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeForm, setActiveForm] = useState('calorie');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Handles form switch with transition
  const handleFormChange = (formKey) => {
    if (formKey === activeForm) return;
    setShowForm(false);
    setLoading(true);
    setTimeout(() => {
      setActiveForm(formKey);
      setShowForm(true);
      setLoading(false);
    }, 300); // slight delay for transition effect
  };

  // Returns the selected form
  const renderForm = () => {
    switch (activeForm) {
      case 'calorie':
        return <CaloriePredictionForm />;
      case 'weight':
        return <WeightForm />;
      case 'health-condition':
        return <HealthConditionForm />;
      case 'fitness-level':
        return <FitnessLevelForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>FitLife</title>
        <meta name="description" content="Predict calories, weight, health or fitness level with FitLife AI" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-purple-800 drop-shadow-sm">FitLife Health and Fitness</h1>

        {/* Navigation Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {[
            { label: 'Calorie Prediction', key: 'calorie' },
            { label: 'Weight Prediction', key: 'weight' },
            { label: 'Health Condition', key: 'health-condition' },
            { label: 'Fitness Level', key: 'fitness-level' }
          ].map(({ label, key }) => (
            <button
              key={key}
              onClick={() => handleFormChange(key)}
              className={`px-6 py-2 text-sm md:text-base rounded-full font-semibold transition duration-300
                ${activeForm === key
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-purple-700 border border-purple-500 hover:bg-purple-300 hover:cursor-pointer'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Form Container with Transitions */}
        <div className="w-full max-w-xl relative min-h-[400px]">
          {loading && (
            <div className="flex items-center justify-center h-full absolute inset-0 bg-white bg-opacity-80 z-10 rounded-2xl">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {showForm && (
              <motion.div
                key={activeForm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-0"
              >
                {renderForm()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}

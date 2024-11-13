import React from 'react';
import { Layout } from './components/Layout';
import { PredictionForm } from './components/PredictionForm';
import { Droplets } from 'lucide-react';

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Droplets className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Water Potability Predictor
          </h1>
          <p className="text-lg text-gray-600">
            Advanced machine learning model to predict water potability based on quality parameters
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <PredictionForm />
        </div>
      </div>
    </Layout>
  );
}

export default App;
import React, { useState } from 'react';
import { waterParameters } from '../constants';
import { WaterParameterInput } from './WaterParameterInput';
import { ResultCard } from './ResultCard';
import { BeakerIcon } from 'lucide-react';
import type { WaterData } from '../types';

export function PredictionForm() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [formData, setFormData] = useState<WaterData>({} as WaterData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would be an API call to your ML model
    // For demo purposes, we'll simulate a response
    const response = await new Promise(resolve => 
      setTimeout(() => resolve(Math.random() > 0.5 ? 'Potable' : 'Not Potable'), 1000)
    );
    
    setPrediction(response as string);
  };

  const handleInputChange = (name: keyof WaterData, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {waterParameters.map((param) => (
            <WaterParameterInput
              key={param.name}
              parameter={param}
              value={formData[param.name] || 0}
              onChange={handleInputChange}
            />
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-all duration-200 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <BeakerIcon className="w-5 h-5 mr-2" />
            Analyze Water Quality
          </button>
        </div>
      </form>

      {prediction && <ResultCard prediction={prediction} />}
    </div>
  );
}
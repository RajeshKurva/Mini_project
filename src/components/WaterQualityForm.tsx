import React from 'react';
import { useForm } from 'react-hook-form';
import { Beaker, AlertCircle } from 'lucide-react';
import { WaterData } from '../types';
import { waterParameters } from '../constants';

interface Props {
  onSubmit: (data: WaterData) => void;
}

export default function WaterQualityForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaterData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {waterParameters.map((param) => (
          <div key={param.name} className="relative">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              {param.icon}
              <span className="ml-2">{param.label}</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register(param.name, {
                required: 'This field is required',
                min: { value: param.min, message: `Minimum value is ${param.min}` },
                max: { value: param.max, message: `Maximum value is ${param.max}` },
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors[param.name] ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder={param.placeholder}
            />
            {errors[param.name] && (
              <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors[param.name]?.message}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-colors duration-200 transform hover:scale-105"
        >
          <Beaker className="w-5 h-5 mr-2" />
          Analyze Water Quality
        </button>
      </div>
    </form>
  );
}
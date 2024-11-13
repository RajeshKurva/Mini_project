import React from 'react';
import { WaterData } from '../types';

interface WaterParameterInputProps {
  parameter: {
    name: keyof WaterData;
    label: string;
    icon: JSX.Element;
    min: number;
    max: number;
    placeholder: string;
  };
  value: number;
  onChange: (name: keyof WaterData, value: number) => void;
}

export const WaterParameterInput: React.FC<WaterParameterInputProps> = ({
  parameter,
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <span className="flex items-center gap-2">
          {parameter.icon}
          {parameter.label}
        </span>
      </label>
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(parameter.name, parseFloat(e.target.value) || 0)}
        min={parameter.min}
        max={parameter.max}
        placeholder={parameter.placeholder}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};
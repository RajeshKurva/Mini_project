import React from 'react';
import { 
  Droplet, 
  Waves, 
  Thermometer, 
  BeakerIcon, 
  Zap, 
  Leaf, 
  Gauge, 
  Cloud, 
  DropletsIcon 
} from 'lucide-react';
import type { WaterData } from './types';

interface WaterParameter {
  name: keyof WaterData;
  label: string;
  icon: JSX.Element;
  min: number;
  max: number;
  placeholder: string;
}

export const waterParameters: WaterParameter[] = [
  {
    name: 'ph',
    label: 'pH Level',
    icon: <Droplet className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 14,
    placeholder: '7.0',
  },
  {
    name: 'Hardness',
    label: 'Hardness',
    icon: <Waves className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 1000,
    placeholder: '200',
  },
  {
    name: 'Solids',
    label: 'Total Dissolved Solids',
    icon: <BeakerIcon className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 100000,
    placeholder: '20000',
  },
  {
    name: 'Chloramines',
    label: 'Chloramines',
    icon: <Thermometer className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 15,
    placeholder: '7.0',
  },
  {
    name: 'Sulfate',
    label: 'Sulfate',
    icon: <Gauge className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 1000,
    placeholder: '333',
  },
  {
    name: 'Conductivity',
    label: 'Conductivity',
    icon: <Zap className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 1000,
    placeholder: '350',
  },
  {
    name: 'Organic_carbon',
    label: 'Organic Carbon',
    icon: <Leaf className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 100,
    placeholder: '20',
  },
  {
    name: 'Trihalomethanes',
    label: 'Trihalomethanes',
    icon: <Cloud className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 200,
    placeholder: '67',
  },
  {
    name: 'Turbidity',
    label: 'Turbidity',
    icon: <DropletsIcon className="w-4 h-4 text-blue-500" />,
    min: 0,
    max: 10,
    placeholder: '4.5',
  },
];
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultCardProps {
  prediction: string;
}

export function ResultCard({ prediction }: ResultCardProps) {
  const isPotable = prediction === 'Potable';

  return (
    <div 
      className={`mt-8 p-6 rounded-xl ${
        isPotable ? 'bg-green-50' : 'bg-red-50'
      } transition-all duration-500 animate-fade-in`}
    >
      <div className="flex items-center justify-center">
        {isPotable ? (
          <CheckCircle className="w-12 h-12 text-green-500 mr-4" />
        ) : (
          <XCircle className="w-12 h-12 text-red-500 mr-4" />
        )}
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Water is {prediction}
          </h2>
          <p className={`text-lg ${isPotable ? 'text-green-700' : 'text-red-700'}`}>
            {isPotable 
              ? 'This water sample meets potability standards.'
              : 'This water sample does not meet potability standards.'}
          </p>
        </div>
      </div>
    </div>
  );
}
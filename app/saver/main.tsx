import React, { useState, useEffect } from 'react';

const FREQUENCIES = ['Daily', 'Weekly', 'Monthly'];

export default function Component() {
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState(FREQUENCIES[0]);

  const generateAmount = () => {
    // In a real app, this would call your backend service
    const newAmount = Math.floor(Math.random() * 100) + 1;
    setAmount(newAmount);
    // Here you would also save this to your backend and sync across devices
  };

  useEffect(() => {
    generateAmount();
  }, [frequency]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Savings Challenge</h1>
      <p className="text-6xl font-bold text-blue-600 mb-2">${amount}</p>
      <p className="text-xl mb-6">to save {frequency.toLowerCase()}</p>
      <div className="flex space-x-4 mb-6">
        {FREQUENCIES.map((freq) => (
          <button
            key={freq}
            onClick={() => setFrequency(freq)}
            className={`px-4 py-2 rounded ${
              frequency === freq
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
          >
            {freq}
          </button>
        ))}
      </div>
      <button
        onClick={generateAmount}
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Generate New Amount
      </button>
    </div>
  );
}
'use client';
import React, { useState } from 'react';

interface PasswordModalProps {
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100]">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-8 animate-fade-in-down">
        <h2 className="text-xl font-bold text-primary mb-4 text-center">Admin Access</h2>
        <p className="text-center text-gray-600 mb-6">Please enter the password to continue.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-800 rounded-md text-center focus:ring-2 focus:ring-accent focus:border-transparent outline-none placeholder-gray-400"
            placeholder="••••••••"
            autoFocus
          />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;

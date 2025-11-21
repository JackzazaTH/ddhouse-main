
'use client';
import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onSubmit: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[100] animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-down">
        <div className="bg-primary p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Admin System</h2>
            <p className="text-red-100 text-sm mt-1">Please login to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 pt-6">
          <div className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Enter username"
                    autoFocus
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Enter password"
                    required
                />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-red-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

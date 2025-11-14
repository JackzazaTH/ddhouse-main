'use client';
import React, { useState } from 'react';
import { SiteNotification } from '@/lib/types';

interface NotificationFormProps {
  notification: SiteNotification | null;
  onSave: (data: Omit<SiteNotification, 'id'>) => void;
  onClose: () => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ notification, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<SiteNotification, 'id'>>({
    message: notification?.message || '',
    link: notification?.link || '',
    linkLabel: notification?.linkLabel || '',
    isActive: notification?.isActive || false,
  });
  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{notification ? 'Edit Notification' : 'Add New Notification'}</h2>
            <div className="space-y-4">
              <input type="text" name="message" value={formData.message} onChange={handleChange} placeholder="Notification Message" className={inputClasses} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="linkLabel" value={formData.linkLabel} onChange={handleChange} placeholder="Link Label (e.g., Learn More)" className={inputClasses} />
                <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="Full URL (https://...)" className={inputClasses} />
              </div>
              <label className="flex items-center">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-5 w-5 text-primary focus:ring-accent border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700 font-medium">Set this notification as active (will deactivate others)</span>
              </label>
            </div>
          </div>
          <div className="bg-gray-100 px-8 py-4 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-red-900">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;

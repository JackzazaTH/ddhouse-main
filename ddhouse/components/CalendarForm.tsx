
'use client';
import React, { useState } from 'react';
import { CalendarEvent } from '@/lib/types';

interface CalendarFormProps {
  event: CalendarEvent | null;
  onSave: (data: Omit<CalendarEvent, 'id'>) => void;
  onClose: () => void;
}

const CalendarForm: React.FC<CalendarFormProps> = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<CalendarEvent, 'id'>>({
    title: event?.title || '',
    date: event?.date || new Date().toISOString().split('T')[0],
    type: event?.type || 'construction',
    description: event?.description || '',
  });

  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <h2 className="text-2xl font-bold text-primary mb-6">{event ? 'Edit Event' : 'Add New Event'}</h2>
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Event Title" className={inputClasses} required />
              
              <div className="grid grid-cols-2 gap-4">
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClasses} required />
                  <select name="type" value={formData.type} onChange={handleChange} className={inputClasses}>
                      <option value="construction">Construction</option>
                      <option value="handover">Handover</option>
                      <option value="meeting">Meeting</option>
                      <option value="holiday">Holiday</option>
                  </select>
              </div>

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description (optional)" className={`h-24 ${inputClasses}`} />
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

export default CalendarForm;
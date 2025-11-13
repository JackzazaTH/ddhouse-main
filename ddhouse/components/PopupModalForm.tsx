'use client';
import React, { useState } from 'react';
import { PopupModalContent } from '@/lib/types';

interface PopupModalFormProps {
  content: PopupModalContent;
  onSave: (data: PopupModalContent) => void;
}

const PopupModalForm: React.FC<PopupModalFormProps> = ({ content, onSave }) => {
  const [formData, setFormData] = useState<PopupModalContent>(content);
  const [isSaved, setIsSaved] = useState(false);
  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
     const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isEnabled && !formData.imageUrl) {
        alert("Please upload an image for the popup.");
        return;
    }
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Homepage Popup Modal</h2>
          <p className="text-gray-600 mb-6">Configure the popup that appears for new visitors on the homepage.</p>
          
          <label className="flex items-center mb-6 p-3 bg-gray-50 rounded-md">
              <input type="checkbox" name="isEnabled" checked={formData.isEnabled} onChange={handleChange} className="h-5 w-5 text-primary focus:ring-accent border-gray-300 rounded" />
              <span className="ml-3 text-gray-800 font-medium">Enable Popup Modal</span>
          </label>

          <div className={`space-y-4 transition-opacity duration-300 ${formData.isEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Popup Title" className={inputClasses} required={formData.isEnabled} />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Popup Description" className={`h-24 ${inputClasses}`} required={formData.isEnabled} />
            <input type="text" name="ctaText" value={formData.ctaText} onChange={handleChange} placeholder="Button Text (e.g., Learn More)" className={inputClasses} required={formData.isEnabled} />
            
            <div className="grid grid-cols-3 gap-4">
               <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Type</label>
                  <select name="linkType" value={formData.linkType} onChange={handleChange} className={inputClasses}>
                      <option value="page">Page</option>
                      <option value="view">View</option>
                      <option value="url">External URL</option>
                  </select>
               </div>
               <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Value</label>
                  <input type="text" name="linkValue" value={formData.linkValue} onChange={handleChange} placeholder="e.g., 'portfolio' or 'designs' or 'https://...' " className={inputClasses} required={formData.isEnabled} />
               </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Popup Image</label>
              <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
              {formData.imageUrl && (
                  <div className="mt-4">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-auto max-h-48 object-cover rounded-md" />
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-8 py-4 flex justify-end items-center space-x-4">
            {isSaved && <span className="text-green-600 font-semibold animate-fade-in">Saved!</span>}
          <button type="submit" className="px-8 py-2 bg-primary text-white rounded-md hover:bg-red-900 font-semibold transition-colors">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default PopupModalForm;

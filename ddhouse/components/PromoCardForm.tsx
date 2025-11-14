'use client';
import React, { useState } from 'react';
import { PromoCard } from '@/lib/types';

interface PromoCardFormProps {
  card: PromoCard | null;
  onSave: (data: Omit<PromoCard, 'id'>) => void;
  onClose: () => void;
}

const PromoCardForm: React.FC<PromoCardFormProps> = ({ card, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<PromoCard, 'id'>>({
    title: card?.title || '',
    subtitle: card?.subtitle || '',
    imageUrl: card?.imageUrl || '',
    linkType: card?.linkType || 'page',
    linkValue: card?.linkValue || '',
    size: card?.size || '1x1',
    order: card?.order || 0,
  });
  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (!formData.imageUrl) {
        alert("Please upload an image.");
        return;
    }
    const saveData = {
        ...formData,
        order: Number(formData.order)
    }
    onSave(saveData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{card ? 'Edit Promo Card' : 'Add New Promo Card'}</h2>
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className={inputClasses} required />
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle (optional)" className={inputClasses} />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} placeholder="e.g., 1" className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Size</label>
                    <select name="size" value={formData.size} onChange={handleChange} className={inputClasses}>
                      <option value="1x1">1x1</option>
                      <option value="2x1">2x1</option>
                      <option value="3x1">3x1</option>
                    </select>
                </div>
              </div>

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
                  <input type="text" name="linkValue" value={formData.linkValue} onChange={handleChange} placeholder="e.g., 'portfolio' or 'https://...'" className={inputClasses} required />
               </div>
            </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Image</label>
                <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                {formData.imageUrl && (
                    <div className="mt-4">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-auto max-h-48 object-cover rounded-md" />
                    </div>
                )}
              </div>
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

export default PromoCardForm;

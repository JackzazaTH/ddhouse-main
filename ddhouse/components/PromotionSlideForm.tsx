

import React, { useState } from 'react';
import { PromotionSlide } from '@/lib/types';

interface PromotionSlideFormProps {
  slide: Omit<PromotionSlide, 'id'> | PromotionSlide | null;
  onSave: (data: Omit<PromotionSlide, 'id'>) => void;
  onClose: () => void;
}

const PromotionSlideForm: React.FC<PromotionSlideFormProps> = ({ slide, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<PromotionSlide, 'id'>>({
    title: slide?.title || '',
    description: slide?.description || '',
    imageUrl: slide?.imageUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-white/75 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{slide ? 'Edit Promotion Slide' : 'Add New Promotion Slide'}</h2>
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Slide Title" className="p-3 border rounded-md w-full" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Slide Description" className="p-3 border rounded-md w-full h-24" required />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slide Image</label>
                <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                {formData.imageUrl && (
                    <div className="mt-4">
                        <img src={formData.imageUrl} alt="Slide preview" className="w-full h-auto max-h-48 object-cover rounded-md" />
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

export default PromotionSlideForm;
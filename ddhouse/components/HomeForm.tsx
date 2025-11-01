

'use client';
import React, { useState, useCallback } from 'react';
import { HomeDesign } from '@/lib/types';
import { generateDescription } from '@/services/geminiService';
import Spinner from './Spinner';

interface HomeFormProps {
  home: HomeDesign | null;
  onSave: (data: Omit<HomeDesign, 'id'>) => void;
  onClose: () => void;
}

const HomeForm: React.FC<HomeFormProps> = ({ home, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<HomeDesign, 'id'>>({
    name: home?.name || '',
    description: home?.description || '',
    area: home?.area || 0,
    bedrooms: home?.bedrooms || 0,
    bathrooms: home?.bathrooms || 0,
    images: home?.images || [],
    isFeatured: home?.isFeatured || false,
    seo: {
      title: home?.seo?.title || '',
      description: home?.seo?.description || '',
    }
  });
  const [aiKeywords, setAiKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSeoOpen, setIsSeoOpen] = useState(false);

  const inputClasses = "p-3 bg-gray-800 text-white border border-gray-700 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-400 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo!,
        [name]: value,
      }
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages: string[] = [];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  }

  const handleGenerateDescription = async () => {
    if (!aiKeywords) return;
    setIsGenerating(true);
    try {
      const description = await generateDescription(aiKeywords);
      setFormData(prev => ({ ...prev, description }));
    } catch (error) {
      console.error("Failed to generate description:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
        alert("Please upload at least one image.");
        return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-white/75 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{home ? 'Edit Home' : 'Add New Home'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Home Name" className={inputClasses} required />
              <div className="grid grid-cols-3 gap-2">
                <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Area (m²)" className={inputClasses} required />
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" className={inputClasses} required />
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" className={inputClasses} required />
              </div>
            </div>
             <div className="md:col-span-2 mt-4">
              <label className="flex items-center">
                  <input type="checkbox" name="isFeatured" checked={!!formData.isFeatured} onChange={handleCheckboxChange} className="h-5 w-5 text-primary focus:ring-accent border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700 font-medium">Feature this home on the homepage slider</span>
              </label>
            </div>
            <div className="mt-6">
                <div className="flex items-end gap-2">
                    <input type="text" value={aiKeywords} onChange={(e) => setAiKeywords(e.target.value)} placeholder="Keywords for AI (e.g., modern, spacious, garden)" className={inputClasses} />
                    <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="px-4 py-2.5 bg-secondary text-white rounded-md flex items-center justify-center min-w-[120px]">
                        {isGenerating ? <Spinner /> : 'Generate ✨'}
                    </button>
                </div>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className={`mt-2 h-24 ${inputClasses}`} required />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
              <input type="file" onChange={handleImageChange} multiple accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
              <div className="mt-4 flex flex-wrap gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} className="w-24 h-24 object-cover rounded-md" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">&times;</button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* SEO Section */}
            <div className="mt-6 border-t pt-6">
              <button type="button" onClick={() => setIsSeoOpen(!isSeoOpen)} className="w-full text-left font-semibold text-lg text-gray-700 flex justify-between items-center">
                SEO Settings
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isSeoOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isSeoOpen && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                    <input type="text" name="title" value={formData.seo?.title} onChange={handleSeoChange} placeholder="SEO-friendly title for search engines" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea name="description" value={formData.seo?.description} onChange={handleSeoChange} placeholder="Brief summary for search engine results (max 160 chars)" className={`h-20 ${inputClasses}`} maxLength={160} />
                  </div>
                </div>
              )}
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

export default HomeForm;
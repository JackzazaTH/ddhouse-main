
'use client';
import React, { useState } from 'react';
import { GalleryAlbum } from '@/lib/types';

interface GalleryFormProps {
  album: GalleryAlbum | null;
  onSave: (data: Omit<GalleryAlbum, 'id'>) => void;
  onClose: () => void;
}

const GalleryForm: React.FC<GalleryFormProps> = ({ album, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<GalleryAlbum, 'id'>>({
    title: album?.title || '',
    description: album?.description || '',
    coverImage: album?.coverImage || '',
    images: album?.images || [],
    date: album?.date || new Date().toISOString().split('T')[0],
  });

  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    if (e.target.files) {
        if (isCover && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, coverImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
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
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coverImage) {
        alert("Please upload a cover image.");
        return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{album ? 'Edit Album' : 'Add New Album'}</h2>
            
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Album Title" className={inputClasses} required />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClasses} required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className={`h-20 ${inputClasses}`} />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <input type="file" onChange={(e) => handleImageChange(e, true)} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                {formData.coverImage && (
                    <div className="mt-4">
                        <img src={formData.coverImage} alt="Cover" className="w-32 h-24 object-cover rounded-md border" />
                    </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                <input type="file" onChange={(e) => handleImageChange(e, false)} multiple accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                <div className="mt-4 flex flex-wrap gap-4">
                    {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                        <img src={img} className="w-24 h-24 object-cover rounded-md border" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">&times;</button>
                    </div>
                    ))}
                </div>
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

export default GalleryForm;
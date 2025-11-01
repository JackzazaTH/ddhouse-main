

'use client';
import React, { useState } from 'react';
import { CustomPage } from '@/lib/types';

interface CustomPageFormProps {
  page: CustomPage | null;
  onSave: (data: Omit<CustomPage, 'id'>) => void;
  onClose: () => void;
}

const CustomPageForm: React.FC<CustomPageFormProps> = ({ page, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<CustomPage, 'id'>>({
    title: page?.title || '',
    slug: page?.slug || '',
    content: page?.content || '',
    seo: {
      title: page?.seo?.title || '',
      description: page?.seo?.description || '',
    }
  });
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const inputClasses = "p-3 bg-gray-800 text-white border border-gray-700 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-400 transition-colors";

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setFormData(prev => ({ 
          ...prev, 
          title: value,
          slug: generateSlug(value)
      }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-white/75 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{page ? 'Edit Page' : 'Add New Page'}</h2>
            
            <div className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Page Title" className={inputClasses} required />
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="URL Slug (auto-generated)" className={`${inputClasses} bg-gray-700 cursor-not-allowed`} required readOnly />
                <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Full Content" className={`h-48 ${inputClasses}`} required />
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

export default CustomPageForm;


'use client';
import React, { useState } from 'react';
import { Article } from '@/lib/types';

interface ArticleFormProps {
  article: Article | null;
  onSave: (data: Omit<Article, 'id'>) => void;
  onClose: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Article, 'id'>>({
    title: article?.title || '',
    slug: article?.slug || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    imageUrl: article?.imageUrl || '',
    author: article?.author || 'ทีมงาน DDHOUSE',
    publishedDate: article?.publishedDate || new Date().toISOString().split('T')[0],
    tags: article?.tags || [],
    seo: {
      title: article?.seo?.title || '',
      description: article?.seo?.description || '',
    }
  });
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const inputClasses = "p-3 bg-gray-50 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors text-gray-800";

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
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

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }));
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
        alert("กรุณาอัปโหลดรูปภาพ");
        return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{article ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'}</h2>
            
            <div className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="หัวข้อบทความ" className={inputClasses} required />
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="URL Slug (สร้างอัตโนมัติ)" className={`${inputClasses} bg-gray-200 cursor-not-allowed`} readOnly />
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="คำโปรย (สรุปย่อ)" className={`h-24 ${inputClasses}`} required />
                <textarea name="content" value={formData.content} onChange={handleChange} placeholder="เนื้อหาฉบับเต็ม" className={`h-48 ${inputClasses}`} required />
                
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="ผู้เขียน" className={inputClasses} required />
                    <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange} className={`${inputClasses}`} required />
                </div>

                <input type="text" name="tags" value={formData.tags?.join(', ')} onChange={handleTagsChange} placeholder="แท็ก (คั่นด้วยจุลภาค)" className={inputClasses} />

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพปก</label>
                    <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                    {formData.imageUrl && (
                        <div className="mt-4">
                            <img src={formData.imageUrl} alt="Article preview" className="w-full h-auto max-h-48 object-cover rounded-md" />
                        </div>
                    )}
                </div>
            </div>

            {/* SEO Section */}
            <div className="mt-6 border-t pt-6">
              <button type="button" onClick={() => setIsSeoOpen(!isSeoOpen)} className="w-full text-left font-semibold text-lg text-gray-700 flex justify-between items-center">
                ตั้งค่า SEO
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isSeoOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isSeoOpen && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                    <input type="text" name="title" value={formData.seo?.title} onChange={handleSeoChange} placeholder="หัวข้อสำหรับ SEO" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea name="description" value={formData.seo?.description} onChange={handleSeoChange} placeholder="คำอธิบายสั้นๆ สำหรับ SEO (สูงสุด 160 ตัวอักษร)" className={`h-20 ${inputClasses}`} maxLength={160} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 px-8 py-4 flex justify-end space-x-4 sticky bottom-0">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">ยกเลิก</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-red-900">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;
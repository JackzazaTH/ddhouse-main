

'use client';
import React, { useState } from 'react';
import { PortfolioProject } from '@/lib/types';

interface PortfolioFormProps {
  project: PortfolioProject | null;
  onSave: (data: Omit<PortfolioProject, 'id'>) => void;
  onClose: () => void;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<PortfolioProject, 'id' | 'slug'>>({
    title: project?.title || '',
    category: project?.category || 'บ้านสองชั้น',
    coverImage: project?.coverImage || '',
    images: project?.images || [],
    description: project?.description || '',
    location: project?.location || '',
    area: project?.area || 0,
  });

  const inputClasses = "p-3 bg-gray-50 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors text-gray-800";

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    if (e.target.files) {
      if (isCover) {
        const file = e.target.files[0];
        if (!file) return;
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coverImage) {
        alert("กรุณาอัปโหลดรูปภาพปก");
        return;
    }
    const finalData = {
        ...formData,
        slug: project?.slug || generateSlug(formData.title),
        area: Number(formData.area)
    }
    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{project ? 'แก้ไขโครงการ' : 'เพิ่มโครงการใหม่'}</h2>
            
            <div className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="ชื่อโครงการ" className={inputClasses} required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="คำอธิบาย" className={`h-24 ${inputClasses}`} required />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="สถานที่" className={inputClasses} required />
                    <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="พื้นที่ (ตร.ม.)" className={inputClasses} required />
                    <select name="category" value={formData.category} onChange={handleChange} className={inputClasses} required>
                        <option value="บ้านชั้นเดียว">บ้านชั้นเดียว</option>
                        <option value="บ้านสองชั้น">บ้านสองชั้น</option>
                        <option value="สไตล์โมเดิร์น">สไตล์โมเดิร์น</option>
                        <option value="สไตล์ร่วมสมัย">สไตล์ร่วมสมัย</option>
                    </select>
                </div>
                
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพปก (thumbnail หลัก)</label>
                    <input type="file" onChange={(e) => handleImageChange(e, true)} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                    {formData.coverImage && (
                        <div className="mt-4">
                            <img src={formData.coverImage} alt="Cover preview" className="w-48 h-auto object-cover rounded-md border" />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพเพิ่มเติม (สำหรับหน้า landing page)</label>
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

          <div className="bg-gray-100 px-8 py-4 flex justify-end space-x-4 sticky bottom-0">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">ยกเลิก</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-red-900">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
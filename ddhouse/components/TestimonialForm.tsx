'use client';
import React, { useState } from 'react';
import { Testimonial } from '@/lib/types';

interface TestimonialFormProps {
  testimonial: Testimonial | null;
  onSave: (data: Omit<Testimonial, 'id'>) => void;
  onClose: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ testimonial, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    title: testimonial?.title || '',
    imageUrl: testimonial?.imageUrl || '',
    videoUrl: testimonial?.videoUrl || '',
    order: testimonial?.order || 0,
    isFeatured: testimonial?.isFeatured || false,
  });
  const inputClasses = "p-3 bg-gray-50 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors text-gray-800";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (!formData.imageUrl) {
        alert("กรุณาอัปโหลดรูปภาพ thumbnail");
        return;
    }
    if (!formData.videoUrl) {
        alert("กรุณาใส่ URL ของวิดีโอ");
        return;
    }
    const saveData = {
      ...formData,
      order: Number(formData.order),
    };
    onSave(saveData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{testimonial ? 'แก้ไขรีวิว' : 'เพิ่มรีวิวใหม่'}</h2>
            
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="หัวข้อ" className={inputClasses} required />
              <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Video URL (เช่น ลิงก์ embed จาก YouTube)" className={inputClasses} required />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ลำดับการแสดงผล</label>
                  <input type="number" name="order" value={formData.order} onChange={handleChange} placeholder="เช่น 1, 2, 3" className={inputClasses} required />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 invisible">แนะนำ</label>
                  <label className="flex items-center mt-2 h-full">
                      <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-5 w-5 text-primary focus:ring-accent border-gray-300 rounded" />
                      <span className="ml-2 text-gray-700 font-medium">ตั้งเป็นวิดีโอแนะนำ</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพ Thumbnail</label>
                <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                {formData.imageUrl && (
                    <div className="mt-4">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-auto max-h-48 object-cover rounded-md" />
                    </div>
                )}
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

export default TestimonialForm;
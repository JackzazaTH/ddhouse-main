'use client';
import React, { useState } from 'react';
import { SiteInfo } from '@/lib/types';

interface SiteInfoFormProps {
  siteInfo: SiteInfo;
  onSave: (data: SiteInfo) => void;
}

const SiteInfoForm: React.FC<SiteInfoFormProps> = ({ siteInfo, onSave }) => {
  const [formData, setFormData] = useState<SiteInfo>(siteInfo);
  const [isSaved, setIsSaved] = useState(false);
  const inputClasses = "p-3 bg-gray-50 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors text-gray-800";

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSocialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        socials: {
            ...prev.socials,
            [name]: value
        }
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, promoFormImageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-primary mb-2">ข้อมูลเว็บไซต์</h2>
          <p className="text-gray-600 mb-6">จัดการการตั้งค่าทั่วไปของเว็บไซต์ เช่น ข้อมูลติดต่อ และลิงก์โซเชียลมีเดีย</p>
          
          <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInfoChange} placeholder="เบอร์โทรศัพท์ของเว็บไซต์" className={inputClasses} />
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">รูปภาพฟอร์มโปรโมชัน</h3>
                <p className="text-sm text-gray-500 mb-2">รูปภาพนี้จะแสดงถัดจากฟอร์มลงทะเบียนโปรโมชันในหน้าแรก</p>
                <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                {formData.promoFormImageUrl && (
                    <div className="mt-4">
                        <img src={formData.promoFormImageUrl} alt="Promotion form preview" className="w-full h-auto max-h-48 object-cover rounded-md border" />
                    </div>
                )}
            </div>

            <div className="border-t pt-6">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">ลิงก์โซเชียลมีเดีย</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                        <input type="url" name="facebook" value={formData.socials.facebook} onChange={handleSocialsChange} placeholder="https://facebook.com/..." className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                        <input type="url" name="youtube" value={formData.socials.youtube} onChange={handleSocialsChange} placeholder="https://youtube.com/..." className={inputClasses} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LINE URL</label>
                        <input type="url" name="line" value={formData.socials.line} onChange={handleSocialsChange} placeholder="https://line.me/..." className={inputClasses} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
                        <input type="url" name="tiktok" value={formData.socials.tiktok} onChange={handleSocialsChange} placeholder="https://tiktok.com/..." className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                        <input type="url" name="instagram" value={formData.socials.instagram} onChange={handleSocialsChange} placeholder="https://instagram.com/..." className={inputClasses} />
                    </div>
                 </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-8 py-4 flex justify-end items-center space-x-4">
            {isSaved && <span className="text-green-600 font-semibold animate-fade-in">บันทึกแล้ว!</span>}
          <button type="submit" className="px-8 py-2 bg-primary text-white rounded-md hover:bg-red-900 font-semibold transition-colors">บันทึกการตั้งค่า</button>
        </div>
      </form>
    </div>
  );
};

export default SiteInfoForm;
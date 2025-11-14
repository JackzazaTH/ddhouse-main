'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Lead } from '@/lib/types';

interface PromotionFormProps {
  // FIX: Updated prop type to match the expected data from the form.
  // The 'status' and other fields are handled by the context's addLead function.
  onAddLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status' | 'notes'>) => void;
  imageUrl: string;
}

const PromotionForm: React.FC<PromotionFormProps> = ({ onAddLead, imageUrl }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    landSize: '',
    province: '',
    district: '',
    budget: '',
    constructionDate: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('กรุณายอมรับเงื่อนไขและนโยบายความเป็นส่วนตัว');
      return;
    }
    
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
    }

    onAddLead({
        ...formData,
        landSize: Number(formData.landSize),
        budget: Number(formData.budget),
    });
    setSubmitted(true);
  };
  
  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  if (submitted) {
    return (
      <section id="promotion-form" className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-2xl text-center animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-3xl font-bold text-primary mb-4">ขอบคุณที่ลงทะเบียน!</h2>
                  <p className="text-gray-700 text-lg">เจ้าหน้าที่ของเราจะติดต่อกลับไปโดยเร็วที่สุด</p>
              </div>
          </div>
      </section>
    );
  }

  return (
    <section id="promotion-form" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-2">
            <div 
              className="hidden md:block relative"
            >
              <Image 
                src={imageUrl} 
                alt="Promotion"
                fill
                sizes="50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="relative bg-black/20 w-full h-full"></div>
            </div>
            <div className="p-8 md:p-12">
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">ลงทะเบียนรับโปรโมชัน</h2>
                <p className="text-lg text-gray-600">ส่วนลดพิเศษก่อนใคร</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input type="text" name="firstName" placeholder="ชื่อ*" value={formData.firstName} onChange={handleChange} required className={inputClasses} />
                  <input type="text" name="lastName" placeholder="นามสกุล*" value={formData.lastName} onChange={handleChange} required className={inputClasses} />
                  <input type="tel" name="phone" placeholder="เบอร์โทร*" value={formData.phone} onChange={handleChange} required className={inputClasses} />
                  <input type="email" name="email" placeholder="อีเมล*" value={formData.email} onChange={handleChange} required className={inputClasses} />
                  <input type="number" name="landSize" placeholder="ขนาดที่ดิน (ตร.วา)*" value={formData.landSize} onChange={handleChange} required className={inputClasses} />
                  <input type="text" name="province" placeholder="จังหวัด*" value={formData.province} onChange={handleChange} required className={inputClasses} />
                  <input type="text" name="district" placeholder="อำเภอ, เขต*" value={formData.district} onChange={handleChange} required className={inputClasses} />
                  <input type="number" name="budget" placeholder="งบประมาณ (บาท)*" value={formData.budget} onChange={handleChange} required className={inputClasses} />
                  <div className="md:col-span-2">
                    <label htmlFor="constructionDate" className="block text-sm font-medium text-gray-700 mb-1">วันที่คาดว่าจะสร้างบ้าน*</label>
                    <input type="date" id="constructionDate" name="constructionDate" value={formData.constructionDate} onChange={handleChange} required className={inputClasses} />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-5 w-5 text-primary focus:ring-accent border-gray-300 rounded" />
                    <span className="ml-2 text-gray-700">ยอมรับ<a href="#" className="text-primary hover:underline">เงื่อนไขและนโยบายความเป็นส่วนตัว</a>*</span>
                  </label>
                </div>
                <div className="text-center md:text-left">
                  <button type="submit" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-12 rounded-lg hover:bg-secondary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ส่งข้อมูล
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionForm;
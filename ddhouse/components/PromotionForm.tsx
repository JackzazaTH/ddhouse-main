'use client';
import React, { useState } from 'react';
import { Lead } from '@/lib/types';

interface PromotionFormProps {
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
  
  const inputClasses = "p-4 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none placeholder-gray-400 transition-all duration-200 hover:bg-white";

  if (submitted) {
    return (
      <section id="promotion-form" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-white p-16 rounded-3xl shadow-xl text-center animate-fade-in border border-green-100">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">ขอบคุณที่ลงทะเบียน!</h2>
                  <p className="text-gray-600 text-lg">ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว เจ้าหน้าที่ของเราจะติดต่อกลับไปเพื่อให้ข้อมูลโปรโมชั่นพิเศษโดยเร็วที่สุด</p>
              </div>
          </div>
      </section>
    );
  }

  return (
    <section id="promotion-form" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden md:grid md:grid-cols-5 border border-gray-100">
            <div 
              className="hidden md:block md:col-span-2 bg-cover bg-center relative" 
              style={{ backgroundImage: `url('${imageUrl}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 flex flex-col justify-end p-10 text-white">
                <h3 className="text-3xl font-bold mb-2">สร้างบ้านในฝัน</h3>
                <p className="opacity-90">กับทีมงานมืออาชีพที่ใส่ใจทุกรายละเอียด</p>
              </div>
            </div>
            <div className="p-8 md:p-12 md:col-span-3 bg-white">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">ลงทะเบียนรับโปรโมชัน</h2>
                <p className="text-lg text-gray-500">กรอกข้อมูลเพื่อรับสิทธิพิเศษและส่วนลดก่อนใคร</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="ชื่อ*" value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} required className={inputClasses} />
                  <input type="text" placeholder="นามสกุล*" value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} required className={inputClasses} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="tel" placeholder="เบอร์โทรศัพท์*" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className={inputClasses} pattern="[0-9]{10}" />
                    <input type="email" placeholder="อีเมล*" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required className={inputClasses} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input type="text" placeholder="จังหวัดที่จะก่อสร้าง*" value={formData.province} onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))} required className={inputClasses} />
                     <input type="text" placeholder="อำเภอ/เขต*" value={formData.district} onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))} required className={inputClasses} />
                </div>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" placeholder="ขนาดที่ดิน (ตร.วา)*" value={formData.landSize} onChange={(e) => setFormData(prev => ({ ...prev, landSize: e.target.value }))} required className={inputClasses} />
                    <input type="number" placeholder="งบประมาณ (บาท)*" value={formData.budget} onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))} required className={inputClasses} />
                 </div>

                 <div>
                    <label htmlFor="constructionDate" className="block text-sm font-medium text-gray-600 mb-2 ml-1">วันที่คาดว่าจะสร้างบ้าน*</label>
                    <input type="date" id="constructionDate" value={formData.constructionDate} onChange={(e) => setFormData(prev => ({ ...prev, constructionDate: e.target.value }))} required className={inputClasses} />
                </div>
                
                <div className="pt-2">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm transition-all checked:border-primary checked:bg-primary hover:border-primary" />
                        <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" width="12px" height="12px"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="ml-3 text-gray-600 text-sm">ฉันยอมรับ <a href="#" className="text-primary hover:underline font-medium">เงื่อนไขและนโยบายความเป็นส่วนตัว</a></span>
                  </label>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 text-lg"
                  >
                    ลงทะเบียนรับสิทธิ์
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
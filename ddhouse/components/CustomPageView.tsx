'use client';
import React, { useState } from 'react';
import { CustomPage, Lead } from '../lib/types';
import CtaSection from './CtaSection';

interface CustomPageViewProps {
  page: CustomPage;
  onAddLead?: (lead: Omit<Lead, 'id' | 'timestamp' | 'status' | 'notes'>) => void;
}

const AppointmentForm: React.FC<{ onAddLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status' | 'notes'>) => void }> = ({ onAddLead }) => {
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
        
        if (onAddLead) {
            onAddLead({
                ...formData,
                landSize: Number(formData.landSize),
                budget: Number(formData.budget),
            });
        }
        setSubmitted(true);
      };

      const inputClasses = "p-3 bg-gray-50 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none placeholder-gray-400 transition-all hover:bg-white";
    
      if (submitted) {
        return (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center animate-fade-in border border-green-100 h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">ส่งข้อมูลเรียบร้อย!</h2>
                <p className="text-gray-600 text-lg">ขอบคุณที่สนใจบริการของเรา เจ้าหน้าที่ DDHOUSE จะติดต่อกลับไปโดยเร็วที่สุด</p>
            </div>
        );
      }
      
      return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">ชื่อ</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">นามสกุล</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} required className={inputClasses} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">เบอร์โทรศัพท์</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className={inputClasses} pattern="[0-9]{10}" title="กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">อีเมล</label>
                    <input type="email" name="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required className={inputClasses} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">จังหวัด</label>
                    <input type="text" name="province" value={formData.province} onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">อำเภอ/เขต</label>
                    <input type="text" name="district" value={formData.district} onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))} required className={inputClasses} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">ขนาดที่ดิน (ตร.วา)</label>
                    <input type="number" name="landSize" value={formData.landSize} onChange={(e) => setFormData(prev => ({ ...prev, landSize: e.target.value }))} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">งบประมาณ (บาท)</label>
                    <input type="number" name="budget" value={formData.budget} onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))} required className={inputClasses} />
                </div>
            </div>

            <div>
                <label htmlFor="constructionDate" className="block text-sm font-medium text-gray-700 mb-1 ml-1">วันที่คาดว่าจะสร้างบ้าน</label>
                <input type="date" id="constructionDate" name="constructionDate" value={formData.constructionDate} onChange={(e) => setFormData(prev => ({ ...prev, constructionDate: e.target.value }))} required className={inputClasses} />
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

            <button 
                type="submit" 
                className="w-full bg-primary text-white font-bold py-3.5 px-8 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 text-lg mt-2"
            >
                ส่งข้อมูลนัดหมาย
            </button>
        </form>
      );
}

const CustomPageView: React.FC<CustomPageViewProps> = ({ page, onAddLead }) => {
  const fullWidthSlugs = ['construction-process', 'system-spec', 'extra-services', 'appointment'];
  const isFullWidth = fullWidthSlugs.includes(page.slug);
  // Only show generic CTA on pages that are NOT appointment (since appointment has its own form)
  const shouldShowCta = fullWidthSlugs.includes(page.slug) && page.slug !== 'appointment';

  if (isFullWidth) {
    return (
        <div className="w-full animate-fade-in -mt-8">
             <article>
                <div 
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />

                {/* Special Layout for Appointment Form within Full Width Page */}
                {page.slug === 'appointment' && onAddLead && (
                   <div className="w-full bg-gray-50 py-16 md:py-24">
                       <div className="container mx-auto px-4 max-w-6xl">
                           <div className="flex flex-col lg:flex-row gap-12 items-start">
                               <div className="w-full lg:w-5/12 space-y-6">
                                   <h3 className="text-3xl font-bold text-gray-800">สนใจสร้างบ้านกับเรา?</h3>
                                   <p className="text-gray-600 text-lg leading-relaxed">
                                       กรอกข้อมูลเบื้องต้นเพื่อให้เจ้าหน้าที่ติดต่อกลับ เราพร้อมให้คำปรึกษาเรื่องการสร้างบ้าน งบประมาณ และการออกแบบ ฟรี!
                                   </p>
                                   <ul className="space-y-4 mt-8">
                                       <li className="flex items-start gap-4">
                                           <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-primary flex-shrink-0">
                                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                           </div>
                                           <div>
                                               <h4 className="font-bold text-gray-800">ประเมินราคาฟรี</h4>
                                               <p className="text-sm text-gray-500">ทราบงบประมาณเบื้องต้นก่อนตัดสินใจ</p>
                                           </div>
                                       </li>
                                       <li className="flex items-start gap-4">
                                           <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-primary flex-shrink-0">
                                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                           </div>
                                            <div>
                                               <h4 className="font-bold text-gray-800">แบบบ้านมาตรฐานกว่า 50 แบบ</h4>
                                               <p className="text-sm text-gray-500">เลือกปรับเปลี่ยนได้ตามความต้องการ</p>
                                           </div>
                                       </li>
                                        <li className="flex items-start gap-4">
                                           <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-primary flex-shrink-0">
                                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                           </div>
                                            <div>
                                               <h4 className="font-bold text-gray-800">รับประกันโครงสร้าง 20 ปี</h4>
                                               <p className="text-sm text-gray-500">มั่นใจในคุณภาพงานก่อสร้างที่ได้มาตรฐาน</p>
                                           </div>
                                       </li>
                                   </ul>
                               </div>
                               <div className="w-full lg:w-7/12 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                                   <AppointmentForm onAddLead={onAddLead} />
                               </div>
                           </div>
                       </div>
                   </div>
                )}

                {shouldShowCta && (
                   <div className="container mx-auto px-4 py-12 max-w-6xl">
                       <CtaSection />
                   </div>
                )}
             </article>
        </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
      {page.imageUrl && (
        <div className="mb-8 -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 rounded-t-xl overflow-hidden h-64 md:h-80 relative">
             <img src={page.imageUrl} alt={page.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40 flex items-end">
                 <h1 className="text-3xl md:text-4xl font-bold text-white p-8">{page.title}</h1>
             </div>
        </div>
      )}
      <article>
        {!page.imageUrl && <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">{page.title}</h1>}
        
        <div 
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }}
        />
        
        {page.slug === 'appointment' && onAddLead && (
            <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg shadow-inner p-6 md:p-8">
                     <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">กรอกข้อมูลเพื่อนัดหมาย</h2>
                     <AppointmentForm onAddLead={onAddLead} />
                </div>
            </div>
        )}

        {shouldShowCta && <CtaSection />}
      </article>
    </div>
  );
};

export default CustomPageView;
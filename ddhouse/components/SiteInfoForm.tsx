
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
  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

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

  const handleButtonLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        buttonLabels: {
            ...prev.buttonLabels,
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
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, logoUrl: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleGlobalSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        globalSeo: {
            ...prev.globalSeo,
            [name]: value
        }
    }));
  };

  const handleServiceAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          serviceArea: {
              ...prev.serviceArea,
              [name]: value
          }
      }));
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
          <h2 className="text-2xl font-bold text-primary mb-2">Site Settings</h2>
          <p className="text-gray-600 mb-6">Manage general site settings, SEO defaults, and marketing integrations.</p>
          
          <div className="space-y-6">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Site Branding & Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                        <input type="text" name="siteName" value={formData.siteName} onChange={handleInfoChange} placeholder="e.g., DDHOUSE" className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Tagline</label>
                        <input type="text" name="siteTagline" value={formData.siteTagline || ''} onChange={handleInfoChange} placeholder="e.g., ศูนย์รับสร้างบ้าน บ้านดีดีวิศวกรรม" className={inputClasses} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image (optional)</label>
                        <input type="file" onChange={handleLogoChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                        {formData.logoUrl && (
                            <div className="mt-4">
                                <img src={formData.logoUrl} alt="Logo preview" className="h-16 w-auto object-contain rounded-md border p-1 bg-white" />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                                    className="text-xs text-red-600 hover:underline mt-1"
                                >
                                    Remove logo
                                </button>
                            </div>
                        )}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInfoChange} placeholder="Site Phone Number" className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
                        <input type="text" name="officeHours" value={formData.officeHours} onChange={handleInfoChange} placeholder="e.g. ทำการทุกวัน 09:00 - 18:00 น." className={inputClasses} />
                    </div>
                </div>
            </div>

             {/* Service Area Section */}
            <div className="border-b pb-6 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Area Description (Homepage)</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" name="title" value={formData.serviceArea.title} onChange={handleServiceAreaChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea name="content" value={formData.serviceArea.content} onChange={handleServiceAreaChange} className={`${inputClasses} h-24`} />
                    </div>
                </div>
            </div>

            {/* Global SEO Settings Section */}
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Global SEO Settings</h3>
                <p className="text-sm text-gray-500 mb-2">Configure default SEO values for your entire website. These can be overridden on individual pages.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Title Template</label>
                        <input type="text" name="titleTemplate" value={formData.globalSeo.titleTemplate} onChange={handleGlobalSeoChange} placeholder="%s | Your Site Name" className={inputClasses} />
                        <p className="text-xs text-gray-500 mt-1">Use <code>%s</code> as a placeholder for the individual page title.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Default Meta Description</label>
                        <textarea name="defaultDescription" value={formData.globalSeo.defaultDescription} onChange={handleGlobalSeoChange} className={`${inputClasses} h-20`} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Default Keywords (comma-separated)</label>
                        <input type="text" name="defaultKeywords" value={formData.globalSeo.defaultKeywords} onChange={handleGlobalSeoChange} placeholder="e.g., home design, construction, modern" className={inputClasses} />
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Button Labels</h3>
                <p className="text-sm text-gray-500 mb-2">Customize the text for common "View All" buttons across the site.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">"View All Homes" Button</label>
                        <input type="text" name="viewAllHomes" value={formData.buttonLabels.viewAllHomes} onChange={handleButtonLabelsChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">"View All Articles" Button</label>
                        <input type="text" name="viewAllArticles" value={formData.buttonLabels.viewAllArticles} onChange={handleButtonLabelsChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">"View All Testimonials" Button</label>
                        <input type="text" name="viewAllTestimonials" value={formData.buttonLabels.viewAllTestimonials} onChange={handleButtonLabelsChange} className={inputClasses} />
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Promotion Form Image</h3>
                <p className="text-sm text-gray-500 mb-2">This is the image displayed next to the promotion registration form on the homepage.</p>
                <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"/>
                {formData.promoFormImageUrl && (
                    <div className="mt-4">
                        <img src={formData.promoFormImageUrl} alt="Promotion form preview" className="w-full h-auto max-h-48 object-cover rounded-md border" />
                    </div>
                )}
            </div>

            <div className="border-t pt-6">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media Links</h3>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
                        <input type="url" name="tiktok" value={formData.socials.tiktok} onChange={handleSocialsChange} placeholder="https://tiktok.com/..." className={inputClasses} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LINE URL</label>
                        <input type="url" name="line" value={formData.socials.line} onChange={handleSocialsChange} placeholder="https://line.me/..." className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp URL</label>
                        <input type="url" name="whatsapp" value={formData.socials.whatsapp} onChange={handleSocialsChange} placeholder="https://wa.me/..." className={inputClasses} />
                    </div>
                 </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-8 py-4 flex justify-end items-center space-x-4">
            {isSaved && <span className="text-green-600 font-semibold animate-fade-in">Saved!</span>}
          <button type="submit" className="px-8 py-2 bg-primary text-white rounded-md hover:bg-red-900 font-semibold transition-colors">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default SiteInfoForm;
'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject, LeadStatus, Toast } from '@/lib/types';
import Spinner from './Spinner';

const FormLoader = () => <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"><div className="bg-white p-8 rounded-lg flex items-center gap-4"><Spinner /> <span>Loading Form...</span></div></div>;

const HomeForm = dynamic(() => import('./HomeForm'), { loading: FormLoader, ssr: false });
const BannerForm = dynamic(() => import('./BannerForm'), { loading: FormLoader, ssr: false });
const ArticleForm = dynamic(() => import('./ArticleForm'), { loading: FormLoader, ssr: false });
const CustomPageForm = dynamic(() => import('./CustomPageForm'), { loading: FormLoader, ssr: false });
const PromoCardForm = dynamic(() => import('./PromoCardForm'), { loading: FormLoader, ssr: false });
const TestimonialForm = dynamic(() => import('./TestimonialForm'), { loading: FormLoader, ssr: false });
const NotificationForm = dynamic(() => import('./NotificationForm'), { loading: FormLoader, ssr: false });
const PopupModalForm = dynamic(() => import('./PopupModalForm'), { loading: FormLoader, ssr: false });
const SiteInfoForm = dynamic(() => import('./SiteInfoForm'), { loading: FormLoader, ssr: false });
const PortfolioForm = dynamic(() => import('./PortfolioForm'), { loading: FormLoader, ssr: false });

// Form for editing leads, included in this file to avoid creating new files.
interface LeadFormProps {
  lead: Lead;
  onSave: (data: Lead) => void;
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ lead, onSave, onClose }) => {
  const [formData, setFormData] = useState<Lead>(lead);
  
  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Edit Lead: {lead.firstName} {lead.lastName}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className={inputClasses} required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className={inputClasses} required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={inputClasses} required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClasses} required />
                <input type="number" name="landSize" value={formData.landSize} onChange={handleChange} placeholder="Land Size (sq. wa)" className={inputClasses} required />
                <input type="text" name="province" value={formData.province} onChange={handleChange} placeholder="Province" className={inputClasses} required />
                <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" className={inputClasses} required />
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget (Baht)" className={inputClasses} required />
                <div className="md:col-span-2">
                    <label htmlFor="constructionDate" className="block text-sm font-medium text-gray-700 mb-1">Construction Date</label>
                    <input type="date" id="constructionDate" name="constructionDate" value={formData.constructionDate} onChange={handleChange} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className={inputClasses} required>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea name="notes" value={formData.notes || ''} onChange={handleChange} placeholder="Add notes about the lead..." className={`h-24 ${inputClasses}`} />
                </div>
            </div>
          </div>
          <div className="bg-gray-100 px-8 py-4 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-red-900">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


interface AdminPanelProps {
  homes: HomeDesign[];
  onAddHome: (home: Omit<HomeDesign, 'id'>) => void;
  onUpdateHome: (home: HomeDesign) => void;
  onDeleteHome: (id: string) => void;
  
  banners: Banner[];
  onAddBanner: (banner: Omit<Banner, 'id'>) => void;
  onUpdateBanner: (banner: Banner) => void;
  onDeleteBanner: (id: string) => void;
  
  articles: Article[];
  onAddArticle: (article: Omit<Article, 'id'>) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;

  pages: CustomPage[];
  onAddPage: (page: Omit<CustomPage, 'id'>) => void;
  onUpdatePage: (page: CustomPage) => void;
  onDeletePage: (id: string) => void;
  
  promoCards: PromoCard[];
  onAddPromoCard: (card: Omit<PromoCard, 'id'>) => void;
  onUpdatePromoCard: (card: PromoCard) => void;
  onDeletePromoCard: (id: string) => void;

  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  onUpdateTestimonial: (testimonial: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;

  portfolioProjects: PortfolioProject[];
  onAddPortfolioProject: (project: Omit<PortfolioProject, 'id'>) => void;
  onUpdatePortfolioProject: (project: PortfolioProject) => void;
  onDeletePortfolioProject: (id: string) => void;

  notifications: SiteNotification[];
  onAddNotification: (notification: Omit<SiteNotification, 'id'>) => void;
  onUpdateNotification: (notification: SiteNotification) => void;
  onDeleteNotification: (id: string) => void;

  popupModalContent: PopupModalContent;
  onUpdatePopupModal: (content: PopupModalContent) => void;

  siteInfo: SiteInfo;
  onUpdateSiteInfo: (info: SiteInfo) => void;

  leads: Lead[];
  onUpdateLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  addToast: (message: string, type: Toast['type']) => void;
}

type ActiveTab = 'homes' | 'portfolio' | 'banners' | 'articles' | 'pages' | 'promos' | 'testimonials' | 'notifications' | 'popup' | 'siteInfo' |'leads' | 'system';
type FormState = 
  | { type: 'none' }
  | { type: 'home'; data: HomeDesign | null }
  | { type: 'banner'; data: Banner | null }
  | { type: 'article'; data: Article | null }
  | { type: 'page'; data: CustomPage | null }
  | { type: 'promo'; data: PromoCard | null }
  | { type: 'testimonial'; data: Testimonial | null }
  | { type: 'portfolio'; data: PortfolioProject | null }
  | { type: 'notification'; data: SiteNotification | null }
  | { type: 'lead'; data: Lead | null };

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  homes, onAddHome, onUpdateHome, onDeleteHome,
  banners, onAddBanner, onUpdateBanner, onDeleteBanner,
  articles, onAddArticle, onUpdateArticle, onDeleteArticle,
  pages, onAddPage, onUpdatePage, onDeletePage,
  promoCards, onAddPromoCard, onUpdatePromoCard, onDeletePromoCard,
  testimonials, onAddTestimonial, onUpdateTestimonial, onDeleteTestimonial,
  portfolioProjects, onAddPortfolioProject, onUpdatePortfolioProject, onDeletePortfolioProject,
  notifications, onAddNotification, onUpdateNotification, onDeleteNotification,
  popupModalContent, onUpdatePopupModal,
  siteInfo, onUpdateSiteInfo,
  leads, onUpdateLead, onDeleteLead,
  addToast
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('homes');
  const [formState, setFormState] = useState<FormState>({ type: 'none' });

  const handleCloseForm = () => {
    setFormState({ type: 'none' });
  };
  
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset ALL data to the initial defaults? This action cannot be undone.")) {
        const keys = [
            'ddhouse_homes', 'ddhouse_banners', 'ddhouse_articles', 
            'ddhouse_customPages', 'ddhouse_promoCards', 'ddhouse_testimonials', 
            'ddhouse_portfolioProjects', 'ddhouse_notifications', 
            'ddhouse_popupModalContent', 'ddhouse_siteInfo', 'ddhouse_leads'
        ];
        keys.forEach(key => window.localStorage.removeItem(key));
        addToast("Data has been reset. The page will now reload.", 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const leadToUpdate = leads.find(l => l.id === leadId);
    if (leadToUpdate) {
      onUpdateLead({ ...leadToUpdate, status: newStatus });
    }
  };
  
  const renderSystemSettings = () => (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-2">System Management</h2>
            <p className="text-gray-600 mb-6">Manage core application settings and data.</p>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-red-800">Danger Zone</h4>
                <p className="text-red-700 mt-2">Resetting the database will delete all current homes, articles, leads, and other settings, restoring the site to its original demo state. This action is irreversible.</p>
                <button 
                    onClick={handleResetData}
                    className="mt-4 bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                    Reset All Data to Defaults
                </button>
            </div>
        </div>
    </div>
  );

  const renderHomeTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Area (m²)</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Beds</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Baths</th>
            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">Featured</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {homes.map(home => (
            <tr key={home.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b"><img src={home.images[0]} alt={home.name} className="w-16 h-16 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{home.name}</td>
              <td className="py-3 px-4 border-b text-gray-600">{home.area}</td>
              <td className="py-3 px-4 border-b text-gray-600">{home.bedrooms}</td>
              <td className="py-3 px-4 border-b text-gray-600">{home.bathrooms}</td>
               <td className="py-3 px-4 border-b text-center">
                <button 
                  onClick={() => onUpdateHome({ ...home, isFeatured: !home.isFeatured })}
                  className={`p-2 rounded-full transition-colors duration-200 ${home.isFeatured ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                  aria-label={home.isFeatured ? 'Remove from featured' : 'Add to featured'}
                  title={home.isFeatured ? 'Remove from featured' : 'Add to featured'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${home.isFeatured ? 'text-white' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'home', data: home })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeleteHome(home.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const renderBannerTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={banner.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b"><img src={banner.imageUrl} alt={`Banner ${index + 1}`} className="w-32 h-16 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'banner', data: banner })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeleteBanner(banner.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderArticleTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Author</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Published Date</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b"><img src={article.imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{article.title}</td>
              <td className="py-3 px-4 border-b text-gray-600">{article.author}</td>
              <td className="py-3 px-4 border-b text-gray-600">{article.publishedDate}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'article', data: article })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeleteArticle(article.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPortfolioTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Category</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Location</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolioProjects.map(project => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b"><img src={project.coverImage} alt={project.title} className="w-16 h-16 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{project.title}</td>
              <td className="py-3 px-4 border-b text-gray-600">{project.category}</td>
              <td className="py-3 px-4 border-b text-gray-600">{project.location}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'portfolio', data: project })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeletePortfolioProject(project.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPagesTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Slug</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b font-medium text-gray-800">{page.title}</td>
              <td className="py-3 px-4 border-b text-gray-600 font-mono text-xs">/{page.slug}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'page', data: page })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeletePage(page.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const renderPromoCardTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Order</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Size</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Link</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promoCards.sort((a,b) => a.order - b.order).map(card => (
            <tr key={card.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b font-medium text-gray-800">{card.order}</td>
              <td className="py-3 px-4 border-b"><img src={card.imageUrl} alt={card.title} className="w-24 h-12 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{card.title}</td>
              <td className="py-3 px-4 border-b text-gray-600">{card.size}</td>
              <td className="py-3 px-4 border-b text-gray-600 font-mono text-xs">{`${card.linkType}: ${card.linkValue}`}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'promo', data: card })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeletePromoCard(card.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTestimonialTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Order</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">Featured</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Video URL</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.sort((a,b) => a.order - b.order).map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b font-medium text-gray-800">{item.order}</td>
              <td className="py-3 px-4 border-b"><img src={item.imageUrl} alt={item.title} className="w-24 h-12 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{item.title}</td>
              <td className="py-3 px-4 border-b text-center">{item.isFeatured ? 'Yes' : 'No'}</td>
              <td className="py-3 px-4 border-b text-gray-600 font-mono text-xs"><a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{item.videoUrl}</a></td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'testimonial', data: item })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeleteTestimonial(item.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const renderNotificationTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Status</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Message</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{item.message}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'notification', data: item })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => onDeleteNotification(item.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLeadsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Date</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Phone</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Email</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Budget (Baht)</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Location</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Status</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-gray-600 text-xs">{lead.timestamp.toLocaleString()}</td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{lead.firstName} {lead.lastName}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.phone}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.email}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.budget.toLocaleString()}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.district}, {lead.province}</td>
              <td className="py-3 px-4 border-b">
                 <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                  className={`p-2 rounded-md text-sm font-semibold border-2 w-full ${
                      lead.status === 'New' ? 'bg-blue-100 border-blue-200 text-blue-800' :
                      lead.status === 'Contacted' ? 'bg-green-100 border-green-200 text-green-800' :
                      lead.status === 'Follow-up' ? 'bg-yellow-100 border-yellow-200 text-yellow-800' :
                      'bg-gray-100 border-gray-200 text-gray-800'
                  }`}
                  onClick={(e) => e.stopPropagation()} // Prevent row click from triggering anything
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'lead', data: lead })} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <button onClick={() => {if(window.confirm('Are you sure you want to delete this lead?')) onDeleteLead(lead.id)}} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderActiveContent = () => {
    switch(activeTab) {
      case 'homes': return renderHomeTable();
      case 'portfolio': return renderPortfolioTable();
      case 'banners': return renderBannerTable();
      case 'articles': return renderArticleTable();
      case 'pages': return renderPagesTable();
      case 'promos': return renderPromoCardTable();
      case 'testimonials': return renderTestimonialTable();
      case 'notifications': return renderNotificationTable();
      case 'popup': return <PopupModalForm content={popupModalContent} onSave={onUpdatePopupModal} />;
      case 'siteInfo': return <SiteInfoForm siteInfo={siteInfo} onSave={onUpdateSiteInfo} />;
      case 'leads': return renderLeadsTable();
      case 'system': return renderSystemSettings();
      default: return null;
    }
  }

  const getAddNewButtonText = () => {
    switch (activeTab) {
      case 'homes': return 'Add New Home';
      case 'portfolio': return 'Add New Project';
      case 'banners': return 'Add New Banner';
      case 'articles': return 'Add New Article';
      case 'pages': return 'Add New Page';
      case 'promos': return 'Add New Promo Card';
      case 'testimonials': return 'Add New Testimonial';
      case 'notifications': return 'Add New Notification';
      default: return 'Add New';
    }
  };


  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
         {activeTab !== 'popup' && activeTab !== 'siteInfo' && activeTab !== 'system' && (
            <button
            onClick={() => {
                if (activeTab === 'homes') setFormState({ type: 'home', data: null });
                else if (activeTab === 'portfolio') setFormState({ type: 'portfolio', data: null });
                else if (activeTab === 'banners') setFormState({ type: 'banner', data: null });
                else if (activeTab === 'articles') setFormState({ type: 'article', data: null });
                else if (activeTab === 'pages') setFormState({ type: 'page', data: null });
                else if (activeTab === 'promos') setFormState({ type: 'promo', data: null });
                else if (activeTab === 'testimonials') setFormState({ type: 'testimonial', data: null });
                else if (activeTab === 'notifications') setFormState({ type: 'notification', data: null });
            }}
            disabled={activeTab === 'leads'}
            className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
            {getAddNewButtonText()}
            </button>
        )}
      </div>

      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('homes')} className={`${activeTab === 'homes' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Home Designs</button>
          <button onClick={() => setActiveTab('portfolio')} className={`${activeTab === 'portfolio' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Portfolio</button>
          <button onClick={() => setActiveTab('banners')} className={`${activeTab === 'banners' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Banner Slides</button>
          <button onClick={() => setActiveTab('articles')} className={`${activeTab === 'articles' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Articles</button>
          <button onClick={() => setActiveTab('pages')} className={`${activeTab === 'pages' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Pages</button>
          <button onClick={() => setActiveTab('promos')} className={`${activeTab === 'promos' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Promo Cards</button>
          <button onClick={() => setActiveTab('testimonials')} className={`${activeTab === 'testimonials' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Testimonials</button>
          <button onClick={() => setActiveTab('notifications')} className={`${activeTab === 'notifications' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Notifications</button>
          <button onClick={() => setActiveTab('popup')} className={`${activeTab === 'popup' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Popup Modal</button>
          <button onClick={() => setActiveTab('siteInfo')} className={`${activeTab === 'siteInfo' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Site Info</button>
          <button onClick={() => setActiveTab('leads')} className={`${activeTab === 'leads' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Leads</button>
          <button onClick={() => setActiveTab('system')} className={`${activeTab === 'system' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>System</button>
        </nav>
      </div>
      
      <div key={activeTab} className="animate-fade-in">
        {renderActiveContent()}
      </div>

      {formState.type === 'home' && (
        <HomeForm
          home={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdateHome({ ...data, id: formState.data.id });
            } else {
              onAddHome(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}

      {formState.type === 'banner' && (
        <BannerForm
          banner={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdateBanner({ ...data, id: formState.data.id });
            } else {
              onAddBanner(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}
      
      {formState.type === 'article' && (
        <ArticleForm
          article={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdateArticle({ ...data, id: formState.data.id });
            } else {
              onAddArticle(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}

       {formState.type === 'portfolio' && (
        <PortfolioForm
          project={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdatePortfolioProject({ ...data, id: formState.data.id });
            } else {
              onAddPortfolioProject(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}

      {formState.type === 'page' && (
        <CustomPageForm
          page={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdatePage({ ...data, id: formState.data.id });
            } else {
              onAddPage(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}

      {formState.type === 'promo' && (
        <PromoCardForm
          card={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdatePromoCard({ ...data, id: formState.data.id });
            } else {
              onAddPromoCard(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}
      
      {formState.type === 'testimonial' && (
        <TestimonialForm
          testimonial={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdateTestimonial({ ...data, id: formState.data.id });
            } else {
              onAddTestimonial(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}
      
       {formState.type === 'notification' && (
        <NotificationForm
          notification={formState.data}
          onSave={(data) => {
            if (formState.data) {
              onUpdateNotification({ ...data, id: formState.data.id });
            } else {
              onAddNotification(data);
            }
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}
      
      {formState.type === 'lead' && formState.data && (
        <LeadForm
          lead={formState.data}
          onSave={(data) => {
            onUpdateLead(data);
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminPanel;
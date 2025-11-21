
'use client';
import React, { useState } from 'react';
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject, LeadStatus, LoginLog } from '@/lib/types';
import HomeForm from './HomeForm';
import BannerForm from './BannerForm';
import ArticleForm from './ArticleForm';
import CustomPageForm from './CustomPageForm';
import PromoCardForm from './PromoCardForm';
import TestimonialForm from './TestimonialForm';
import NotificationForm from './NotificationForm';
import PopupModalForm from './PopupModalForm';
import SiteInfoForm from './SiteInfoForm';
import PortfolioForm from './PortfolioForm';
import { useAppContext } from '@/context/AppContext';

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

  loginLogs: LoginLog[];
  onLogout: () => void;
}

type ActiveTab = 'dashboard' | 'homes' | 'portfolio' | 'banners' | 'articles' | 'pages' | 'promos' | 'testimonials' | 'notifications' | 'popup' | 'siteSettings' |'leads' | 'logs';
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
  loginLogs, onLogout
}) => {
  const { seedDatabase, isLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState<ActiveTab>('homes');
  const [formState, setFormState] = useState<FormState>({ type: 'none' });
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleCloseForm = () => {
    setFormState({ type: 'none' });
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const leadToUpdate = leads.find(l => l.id === leadId);
    if (leadToUpdate) {
      onUpdateLead({ ...leadToUpdate, status: newStatus });
    }
  };
  
  const handleSeed = async () => {
      if (window.confirm('This will upload initial data to the database. Continue?')) {
          await seedDatabase();
      }
  }

  const renderHomeTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {homes.map(home => (
            <tr key={home.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap"><img src={home.images[0]} alt={home.name} className="h-12 w-16 object-cover rounded shadow-sm"/></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{home.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{home.area}m² | {home.bedrooms} Bed | {home.bathrooms} Bath</td>
               <td className="px-6 py-4 whitespace-nowrap text-center">
                <button 
                  onClick={() => onUpdateHome({ ...home, isFeatured: !home.isFeatured })}
                  className={`p-1.5 rounded-full transition-colors duration-200 ${home.isFeatured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'home', data: home })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeleteHome(home.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  // ... [Other render functions remain identical, no changes needed here]
  const renderBannerTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
       <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {banners.map((banner, index) => (
            <tr key={banner.id} className="hover:bg-gray-50">
              <td className="px-6 py-4"><img src={banner.imageUrl} alt={`Banner ${index + 1}`} className="h-16 w-32 object-cover rounded-md border"/></td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'banner', data: banner })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeleteBanner(banner.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderArticleTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title & Author</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {articles.map(article => (
            <tr key={article.id} className="hover:bg-gray-50">
              <td className="px-6 py-4"><img src={article.imageUrl} alt={article.title} className="h-12 w-12 object-cover rounded"/></td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{article.title}</div>
                <div className="text-sm text-gray-500">{article.author}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{article.publishedDate}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'article', data: article })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeleteArticle(article.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPortfolioTable = () => (
      <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category/Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {portfolioProjects.map(project => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4"><img src={project.coverImage} alt={project.title} className="h-12 w-16 object-cover rounded"/></td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{project.category} - {project.location}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'portfolio', data: project })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeletePortfolioProject(project.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPagesTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pages.sort((a,b) => (a.order || 0) - (b.order || 0)).map(page => (
            <tr key={page.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-500">{page.order || 0}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {page.title}
                  <div className="text-xs text-gray-500 font-mono mt-1">/{page.slug}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                  {page.menuLocation === 'primary' ? (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">Main Menu</span>
                  ) : page.menuLocation === 'service_submenu' ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Services Dropdown</span>
                  ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Hidden / Footer</span>
                  )}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'page', data: page })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeletePage(page.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const renderPromoCardTable = () => (
      <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {promoCards.sort((a,b) => a.order - b.order).map(card => (
            <tr key={card.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{card.order}</td>
              <td className="px-6 py-4"><img src={card.imageUrl} alt={card.title} className="h-12 w-24 object-cover rounded-md"/></td>
              <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="font-medium">{card.title}</div>
                  <div className="text-xs text-gray-500">{card.size}</div>
              </td>
              <td className="px-6 py-4 text-xs text-gray-500 font-mono">{card.linkType}: {card.linkValue}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'promo', data: card })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeletePromoCard(card.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTestimonialTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {testimonials.sort((a,b) => a.order - b.order).map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.order}</td>
              <td className="px-6 py-4"><img src={item.imageUrl} alt={item.title} className="h-12 w-24 object-cover rounded-md"/></td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
              <td className="px-6 py-4 text-center">
                 {item.isFeatured ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">Yes</span> : <span className="text-gray-400">-</span>}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'testimonial', data: item })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeleteTestimonial(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const renderNotificationTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {notifications.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.message}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'notification', data: item })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeleteNotification(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLeadsTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget/Loc</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-xs text-gray-500">{new Date(lead.timestamp).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{lead.firstName} {lead.lastName}</div>
              </td>
              <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{lead.phone}</div>
                  <div className="text-xs text-gray-500">{lead.email}</div>
              </td>
              <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">฿{lead.budget.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{lead.district}, {lead.province}</div>
              </td>
              <td className="px-6 py-4">
                 <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                  className={`p-1 rounded-md text-xs font-semibold border w-full ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      lead.status === 'Contacted' ? 'bg-green-100 text-green-800 border-green-200' :
                      lead.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => setFormState({ type: 'lead', data: lead })} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => {if(window.confirm('Are you sure?')) onDeleteLead(lead.id)}} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLogsTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
           <h3 className="text-lg font-medium text-gray-900">System Access Logs</h3>
       </div>
       <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loginLogs.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No login activity recorded yet.</td></tr>
            ) : (
                loginLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.username}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{log.ip || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
      case 'siteSettings': return (
        <div className="space-y-6">
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-blue-900">Database Synchronization</h3>
                    <p className="text-blue-700 text-sm mt-1">If your database is empty, you can seed it with the initial constants data here.</p>
                </div>
                <button 
                    onClick={handleSeed} 
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Syncing...' : 'Sync Initial Data to DB'}
                </button>
            </div>
            <SiteInfoForm siteInfo={siteInfo} onSave={onUpdateSiteInfo} />
        </div>
      );
      case 'leads': return renderLeadsTable();
      case 'logs': return renderLogsTable();
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

  const SidebarItem = ({ id, label, icon }: { id: ActiveTab, label: string, icon: React.ReactNode }) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${activeTab === id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-red-50 hover:text-primary'}`}
      >
          {icon}
          <span>{label}</span>
      </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static flex-shrink-0`}>
          <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-gray-50">
             <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin Panel
             </h1>
          </div>
          
          <div className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2 pl-2">Management</div>
              <SidebarItem id="homes" label="Home Designs" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} />
              <SidebarItem id="portfolio" label="Portfolio" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
              <SidebarItem id="articles" label="Articles" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>} />
              <SidebarItem id="testimonials" label="Testimonials" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>} />
              <SidebarItem id="leads" label="Leads (CRM)" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />

              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 pl-2">Content & Marketing</div>
              <SidebarItem id="banners" label="Banner Slides" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
              <SidebarItem id="promos" label="Promo Cards" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>} />
              <SidebarItem id="pages" label="Custom Pages" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
              <SidebarItem id="notifications" label="Notifications" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>} />
              <SidebarItem id="popup" label="Popup Modal" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>} />

              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 pl-2">Configuration</div>
              <SidebarItem id="siteSettings" label="Site Settings" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
              <SidebarItem id="logs" label="Access Logs" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
          </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
         {/* Mobile Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-8 z-10">
           <div className="flex items-center">
              <button className="md:hidden mr-4 text-gray-600" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h2>
           </div>
           
           <div className="flex items-center space-x-4">
               <div className="hidden md:flex items-center text-sm text-gray-600">
                   <span className="mr-2">Welcome, Admin</span>
                   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                       </svg>
                   </div>
               </div>
               <button onClick={onLogout} className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                   </svg>
                   Logout
               </button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100">
           <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()} Management</h2>
                    <p className="text-sm text-gray-500">Manage your website content and settings</p>
                </div>
                 {activeTab !== 'popup' && activeTab !== 'siteSettings' && activeTab !== 'logs' && (
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
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {getAddNewButtonText()}
                    </button>
                )}
             </div>

             <div className="animate-fade-in">
                 {renderActiveContent()}
             </div>
           </div>
        </div>
      </main>

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

'use client';
import React, { useState } from 'react';
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject, LeadStatus, LoginLog, CalendarEvent, GalleryAlbum } from '@/lib/types';
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
import CalendarForm from './CalendarForm';
import GalleryForm from './GalleryForm';

// Form for editing leads
interface LeadFormProps {
  lead: Lead;
  onSave: (data: Lead) => void;
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ lead, onSave, onClose }) => {
  const [formData, setFormData] = useState<Lead>(lead);
  
  const inputClasses = "p-3 bg-white text-gray-800 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none placeholder-gray-400 transition-colors shadow-sm";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[60] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all">
        <form onSubmit={handleSubmit}>
          <div className="p-8 border-b border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Lead Information</h2>
                <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Land Size (sq. wa)</label>
                    <input type="number" name="landSize" value={formData.landSize} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Budget (Baht)</label>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Province</label>
                    <input type="text" name="province" value={formData.province} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">District</label>
                    <input type="text" name="district" value={formData.district} onChange={handleChange} className={inputClasses} required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Construction Date</label>
                    <input type="date" name="constructionDate" value={formData.constructionDate} onChange={handleChange} required className={inputClasses} />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className={inputClasses} required>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
                    <textarea name="notes" value={formData.notes || ''} onChange={handleChange} placeholder="Internal notes..." className={`h-32 ${inputClasses}`} />
                </div>
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-5 flex justify-end space-x-4 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primaryLight shadow-md hover:shadow-lg transition-all">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


interface AdminPanelProps {
  // ... (props remain the same)
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

  calendarEvents?: CalendarEvent[];
  onAddCalendarEvent?: (event: Omit<CalendarEvent, 'id'>) => void;
  onUpdateCalendarEvent?: (event: CalendarEvent) => void;
  onDeleteCalendarEvent?: (id: string) => void;

  galleryAlbums?: GalleryAlbum[];
  onAddGalleryAlbum?: (album: Omit<GalleryAlbum, 'id'>) => void;
  onUpdateGalleryAlbum?: (album: GalleryAlbum) => void;
  onDeleteGalleryAlbum?: (id: string) => void;
}

type ActiveTab = 'dashboard' | 'homes' | 'portfolio' | 'banners' | 'articles' | 'pages' | 'promos' | 'testimonials' | 'notifications' | 'popup' | 'siteSettings' |'leads' | 'logs' | 'calendar' | 'gallery';
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
  | { type: 'lead'; data: Lead | null }
  | { type: 'calendar'; data: CalendarEvent | null }
  | { type: 'gallery'; data: GalleryAlbum | null };

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
  loginLogs, onLogout,
  calendarEvents = [], onAddCalendarEvent = () => {}, onUpdateCalendarEvent = () => {}, onDeleteCalendarEvent = () => {},
  galleryAlbums = [], onAddGalleryAlbum = () => {}, onUpdateGalleryAlbum = () => {}, onDeleteGalleryAlbum = () => {},
}) => {
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

  // Common Table Header
  const TableHeader = ({ children }: { children: React.ReactNode }) => (
      <thead className="bg-gray-50/50 border-b border-gray-100">
          <tr>{children}</tr>
      </thead>
  );

  const Th = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
      <th className={`px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider ${className}`}>{children}</th>
  );

  const Td = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
      <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
  );

  const ActionButton = ({ onClick, type, label }: { onClick: () => void, type: 'edit' | 'delete', label: string }) => (
      <button 
          onClick={onClick} 
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              type === 'edit' 
              ? 'text-blue-600 hover:bg-blue-50' 
              : 'text-red-600 hover:bg-red-50'
          }`}
      >
          {label}
      </button>
  );

  // --- RENDER FUNCTIONS ---

  const renderHomeTable = () => (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <TableHeader>
            <Th>Preview</Th>
            <Th>Name</Th>
            <Th>Specs</Th>
            <Th className="text-center">Featured</Th>
            <Th>Actions</Th>
        </TableHeader>
        <tbody className="bg-white divide-y divide-gray-50">
          {homes.map(home => (
            <tr key={home.id} className="hover:bg-gray-50/50 transition-colors">
              <Td><img src={home.images[0]} alt={home.name} className="h-12 w-20 object-cover rounded-lg shadow-sm"/></Td>
              <Td>
                  <div className="font-bold text-gray-900">{home.name}</div>
                  <div className="text-xs text-gray-500">{home.id}</div>
              </Td>
              <Td className="text-sm text-gray-600">{home.area}m² • {home.bedrooms} Bed • {home.bathrooms} Bath</Td>
               <Td className="text-center">
                <button 
                  onClick={() => onUpdateHome({ ...home, isFeatured: !home.isFeatured })}
                  className={`w-8 h-8 rounded-full inline-flex items-center justify-center transition-all duration-200 ${home.isFeatured ? 'bg-yellow-100 text-yellow-600 shadow-sm' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </Td>
              <Td>
                <div className="flex gap-2">
                  <ActionButton type="edit" label="Edit" onClick={() => setFormState({ type: 'home', data: home })} />
                  <ActionButton type="delete" label="Delete" onClick={() => { if(confirm('Delete this home?')) onDeleteHome(home.id) }} />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
  
  // Similar updates for other render functions (Banner, Article, Pages, etc.) to use new Td/Th and styling
  // For brevity, I'll apply the style updates to a few key ones and keep the structure consistent.

  const renderPagesTable = () => (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <TableHeader>
            <Th>Order</Th>
            <Th>Page Title</Th>
            <Th>Menu Location</Th>
            <Th>Actions</Th>
        </TableHeader>
        <tbody className="bg-white divide-y divide-gray-50">
          {pages.sort((a,b) => (a.order || 0) - (b.order || 0)).map(page => (
            <tr key={page.id} className="hover:bg-gray-50/50">
              <Td className="text-sm text-gray-500 font-mono">{page.order || 0}</Td>
              <Td>
                  <div className="text-sm font-bold text-gray-900">{page.title}</div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">/{page.slug}</div>
              </Td>
              <Td>
                  {page.menuLocation === 'primary' ? (
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">Main Menu</span>
                  ) : page.menuLocation === 'service_submenu' ? (
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Services Dropdown</span>
                  ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">Hidden / Footer</span>
                  )}
              </Td>
              <Td>
                <div className="flex gap-2">
                  <ActionButton type="edit" label="Edit" onClick={() => setFormState({ type: 'page', data: page })} />
                  <ActionButton type="delete" label="Delete" onClick={() => { if(confirm('Delete this page?')) onDeletePage(page.id) }} />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

  const renderLeadsTable = () => (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <TableHeader>
            <Th>Date</Th>
            <Th>Customer</Th>
            <Th>Contact</Th>
            <Th>Interest</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
        </TableHeader>
        <tbody className="bg-white divide-y divide-gray-50">
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
              <Td className="text-xs text-gray-500">{new Date(lead.timestamp).toLocaleDateString()}</Td>
              <Td>
                  <div className="text-sm font-bold text-gray-900">{lead.firstName} {lead.lastName}</div>
              </Td>
              <Td>
                  <div className="text-sm text-gray-900">{lead.phone}</div>
                  <div className="text-xs text-gray-500">{lead.email}</div>
              </Td>
              <Td>
                  <div className="text-sm text-gray-900 font-medium">฿{lead.budget.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{lead.province}</div>
              </Td>
              <Td>
                 <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 transition-colors ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                      lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                      lead.status === 'Follow-up' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                      'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Closed">Closed</option>
                </select>
              </Td>
              <Td>
                <div className="flex gap-2">
                  <ActionButton type="edit" label="Details" onClick={() => setFormState({ type: 'lead', data: lead })} />
                  <ActionButton type="delete" label="Delete" onClick={() => {if(confirm('Delete this lead?')) onDeleteLead(lead.id)}} />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

  // ... (Reuse generic table structure for others but keep specific columns)
  // I will implement a generic renderer for the remaining simple tables to save space and maintain consistency
  // In a real app, separate components for each table is better, but here adapting existing logic.

  const renderSimpleTable = (data: any[], columns: { header: string, render: (item: any) => React.ReactNode }[], onEdit: (item: any) => void, onDelete: (id: string) => void) => (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
            <TableHeader>
                {columns.map((col, idx) => <Th key={idx}>{col.header}</Th>)}
                <Th>Actions</Th>
            </TableHeader>
            <tbody className="bg-white divide-y divide-gray-50">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                        {columns.map((col, idx) => <Td key={idx}>{col.render(item)}</Td>)}
                        <Td>
                            <div className="flex gap-2">
                                <ActionButton type="edit" label="Edit" onClick={() => onEdit(item)} />
                                <ActionButton type="delete" label="Delete" onClick={() => { if(confirm('Are you sure?')) onDelete(item.id) }} />
                            </div>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );

  const renderActiveContent = () => {
    switch(activeTab) {
      case 'homes': return renderHomeTable();
      case 'portfolio': return renderSimpleTable(portfolioProjects, [
          { header: 'Image', render: (p) => <img src={p.coverImage} className="h-12 w-16 object-cover rounded-lg shadow-sm"/> },
          { header: 'Project Title', render: (p) => <span className="font-bold text-gray-900">{p.title}</span> },
          { header: 'Category', render: (p) => <span className="text-sm text-gray-600">{p.category}</span> },
      ], (p) => setFormState({ type: 'portfolio', data: p }), onDeletePortfolioProject);
      
      case 'banners': return renderSimpleTable(banners, [
          { header: 'Preview', render: (b) => <img src={b.imageUrl} className="h-16 w-32 object-cover rounded-lg border"/> },
      ], (b) => setFormState({ type: 'banner', data: b }), onDeleteBanner);

      case 'articles': return renderSimpleTable(articles, [
          { header: 'Image', render: (a) => <img src={a.imageUrl} className="h-12 w-12 object-cover rounded-lg"/> },
          { header: 'Title', render: (a) => <div><div className="font-bold text-sm">{a.title}</div><div className="text-xs text-gray-500">{a.author}</div></div> },
          { header: 'Date', render: (a) => <span className="text-sm text-gray-500">{a.publishedDate}</span> },
      ], (a) => setFormState({ type: 'article', data: a }), onDeleteArticle);

      case 'pages': return renderPagesTable();
      
      case 'promos': return renderSimpleTable(promoCards.sort((a,b) => a.order - b.order), [
          { header: 'Order', render: (c) => <span className="font-mono text-gray-500">{c.order}</span> },
          { header: 'Image', render: (c) => <img src={c.imageUrl} className="h-12 w-20 object-cover rounded-lg"/> },
          { header: 'Title', render: (c) => <span className="font-medium">{c.title}</span> },
          { header: 'Link', render: (c) => <span className="text-xs text-gray-400 font-mono">{c.linkType}: {c.linkValue}</span> },
      ], (c) => setFormState({ type: 'promo', data: c }), onDeletePromoCard);

      case 'testimonials': return renderSimpleTable(testimonials.sort((a,b) => a.order - b.order), [
          { header: 'Order', render: (t) => <span className="font-mono text-gray-500">{t.order}</span> },
          { header: 'Thumbnail', render: (t) => <img src={t.imageUrl} className="h-12 w-20 object-cover rounded-lg"/> },
          { header: 'Title', render: (t) => <span className="text-sm font-medium">{t.title}</span> },
          { header: 'Featured', render: (t) => t.isFeatured ? <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Yes</span> : '-' },
      ], (t) => setFormState({ type: 'testimonial', data: t }), onDeleteTestimonial);

      case 'notifications': return renderSimpleTable(notifications, [
          { header: 'Status', render: (n) => <span className={`px-2 py-1 rounded-full text-xs font-bold ${n.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{n.isActive ? 'Active' : 'Inactive'}</span> },
          { header: 'Message', render: (n) => <span className="text-sm text-gray-700">{n.message}</span> },
      ], (n) => setFormState({ type: 'notification', data: n }), onDeleteNotification);

      case 'popup': return <PopupModalForm content={popupModalContent} onSave={onUpdatePopupModal} />;
      case 'siteSettings': return <SiteInfoForm siteInfo={siteInfo} onSave={onUpdateSiteInfo} />;
      case 'leads': return renderLeadsTable();
      
      case 'logs': return (
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                    <TableHeader>
                        <Th>Time</Th>
                        <Th>User</Th>
                        <Th>Status</Th>
                        <Th>IP</Th>
                    </TableHeader>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {loginLogs.map(log => (
                            <tr key={log.id} className="hover:bg-gray-50">
                                <Td className="text-sm text-gray-500">{log.timestamp.toLocaleString()}</Td>
                                <Td className="font-medium">{log.username}</Td>
                                <Td><span className={`px-2 py-1 rounded-full text-xs font-bold ${log.status === 'Success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{log.status}</span></Td>
                                <Td className="font-mono text-xs text-gray-400">{log.ip}</Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      );

      case 'calendar': return renderSimpleTable(calendarEvents.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()), [
          { header: 'Date', render: (e) => <span className="text-sm font-medium">{e.date}</span> },
          { header: 'Event', render: (e) => <div><div className="font-bold text-sm">{e.title}</div><div className="text-xs text-gray-500">{e.description}</div></div> },
          { header: 'Type', render: (e) => <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{e.type}</span> },
      ], (e) => setFormState({ type: 'calendar', data: e }), onDeleteCalendarEvent);

      case 'gallery': return renderSimpleTable(galleryAlbums, [
          { header: 'Cover', render: (a) => <img src={a.coverImage} className="h-12 w-16 object-cover rounded-lg"/> },
          { header: 'Album', render: (a) => <div><div className="font-bold text-sm">{a.title}</div><div className="text-xs text-gray-500">{a.images.length} items</div></div> },
          { header: 'Date', render: (a) => <span className="text-xs text-gray-500">{a.date}</span> },
      ], (a) => setFormState({ type: 'gallery', data: a }), onDeleteGalleryAlbum);

      default: return null;
    }
  }

  const getAddNewButtonText = () => {
    // ... (logic same as before)
    switch (activeTab) {
      case 'homes': return 'New Design';
      case 'portfolio': return 'New Project';
      case 'banners': return 'New Banner';
      case 'articles': return 'New Article';
      case 'pages': return 'New Page';
      case 'promos': return 'New Promo';
      case 'testimonials': return 'New Testimonial';
      case 'notifications': return 'New Alert';
      case 'calendar': return 'New Event';
      case 'gallery': return 'New Album';
      default: return 'Add New';
    }
  };

  const SidebarItem = ({ id, label, icon }: { id: ActiveTab, label: string, icon: React.ReactNode }) => (
      <button 
        onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
            activeTab === id 
            ? 'bg-primary text-white shadow-md transform translate-x-1' 
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
          <span className={`${activeTab === id ? 'text-white' : 'text-gray-400'}`}>{icon}</span>
          <span>{label}</span>
      </button>
  );

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static flex-shrink-0 flex flex-col`}>
          <div className="h-20 flex items-center px-8 border-b border-gray-50">
             <div className="text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                Admin<span className="text-gray-800">Panel</span>
             </div>
          </div>
          
          <div className="p-4 space-y-1 overflow-y-auto flex-1">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-4 px-4">Content</div>
              <SidebarItem id="homes" label="Home Designs" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>} />
              <SidebarItem id="portfolio" label="Portfolio" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
              <SidebarItem id="articles" label="Articles" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>} />
              <SidebarItem id="pages" label="Custom Pages" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>} />
              <SidebarItem id="calendar" label="Calendar" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
              <SidebarItem id="gallery" label="Gallery" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />

              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6 px-4">Marketing & Leads</div>
              <SidebarItem id="leads" label="Leads / CRM" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>} />
              <SidebarItem id="banners" label="Banners" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
              <SidebarItem id="promos" label="Promotions" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>} />
              <SidebarItem id="testimonials" label="Testimonials" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>} />

              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6 px-4">System</div>
              <SidebarItem id="siteSettings" label="Settings" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} />
              <SidebarItem id="notifications" label="Alerts" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>} />
              <SidebarItem id="popup" label="Popup" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>} />
              <SidebarItem id="logs" label="Logs" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>} />
          </div>
          <div className="p-4 border-t border-gray-100">
             <button onClick={onLogout} className="flex items-center justify-center w-full gap-2 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
             </button>
          </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
         {/* Header */}
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8 z-10">
           <div className="flex items-center">
              <button className="lg:hidden mr-4 text-gray-600" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h2>
           </div>
           
           <div className="flex items-center gap-4">
               <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                   <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">AD</div>
                   <div className="text-sm">
                       <div className="font-bold text-gray-900">Admin User</div>
                       <div className="text-xs text-gray-500">Super Admin</div>
                   </div>
               </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
                    <p className="text-gray-500 mt-1">Manage your website content efficiently.</p>
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
                        else if (activeTab === 'calendar') setFormState({ type: 'calendar', data: null });
                        else if (activeTab === 'gallery') setFormState({ type: 'gallery', data: null });
                    }}
                    disabled={activeTab === 'leads'}
                    className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primaryLight transition-all duration-300 shadow-lg shadow-primary/30 hover:-translate-y-0.5 flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                    >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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

      {/* Modals */}
      {formState.type !== 'none' && (
          // Form modals (Logic remains same, styles can be updated in individual forms if needed)
          // ... existing modal rendering logic
          <>
            {formState.type === 'home' && <HomeForm home={formState.data} onSave={(d) => { if(formState.data) onUpdateHome({...d, id: formState.data.id}); else onAddHome(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'banner' && <BannerForm banner={formState.data} onSave={(d) => { if(formState.data) onUpdateBanner({...d, id: formState.data.id}); else onAddBanner(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'article' && <ArticleForm article={formState.data} onSave={(d) => { if(formState.data) onUpdateArticle({...d, id: formState.data.id}); else onAddArticle(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'portfolio' && <PortfolioForm project={formState.data} onSave={(d) => { if(formState.data) onUpdatePortfolioProject({...d, id: formState.data.id}); else onAddPortfolioProject(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'page' && <CustomPageForm page={formState.data} onSave={(d) => { if(formState.data) onUpdatePage({...d, id: formState.data.id}); else onAddPage(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'promo' && <PromoCardForm card={formState.data} onSave={(d) => { if(formState.data) onUpdatePromoCard({...d, id: formState.data.id}); else onAddPromoCard(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'testimonial' && <TestimonialForm testimonial={formState.data} onSave={(d) => { if(formState.data) onUpdateTestimonial({...d, id: formState.data.id}); else onAddTestimonial(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'notification' && <NotificationForm notification={formState.data} onSave={(d) => { if(formState.data) onUpdateNotification({...d, id: formState.data.id}); else onAddNotification(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'lead' && formState.data && <LeadForm lead={formState.data} onSave={(d) => { onUpdateLead(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'calendar' && <CalendarForm event={formState.data} onSave={(d) => { if(formState.data) onUpdateCalendarEvent({...d, id: formState.data.id}); else onAddCalendarEvent(d); handleCloseForm(); }} onClose={handleCloseForm} />}
            {formState.type === 'gallery' && <GalleryForm album={formState.data} onSave={(d) => { if(formState.data) onUpdateGalleryAlbum({...d, id: formState.data.id}); else onAddGalleryAlbum(d); handleCloseForm(); }} onClose={handleCloseForm} />}
          </>
      )}
    </div>
  );
};

export default AdminPanel;
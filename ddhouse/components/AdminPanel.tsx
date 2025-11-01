'use client';
import React, { useState } from 'react';
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject } from '@/lib/types';
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
}

type ActiveTab = 'homes' | 'portfolio' | 'banners' | 'articles' | 'pages' | 'promos' | 'testimonials' | 'notifications' | 'popup' | 'siteInfo' |'leads';
type FormState = 
  | { type: 'none' }
  | { type: 'home'; data: HomeDesign | null }
  | { type: 'banner'; data: Banner | null }
  | { type: 'article'; data: Article | null }
  | { type: 'page'; data: CustomPage | null }
  | { type: 'promo'; data: PromoCard | null }
  | { type: 'testimonial'; data: Testimonial | null }
  | { type: 'portfolio'; data: PortfolioProject | null }
  | { type: 'notification'; data: SiteNotification | null };

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
  leads,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('homes');
  const [formState, setFormState] = useState<FormState>({ type: 'none' });

  const handleCloseForm = () => {
    setFormState({ type: 'none' });
  };

  const renderHomeTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">รูปภาพ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ชื่อ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">พื้นที่ (ตร.ม.)</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ห้องนอน</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ห้องน้ำ</th>
            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">แนะนำ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
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
                  aria-label={home.isFeatured ? 'นำออกจากรายการแนะนำ' : 'เพิ่มในรายการแนะนำ'}
                  title={home.isFeatured ? 'นำออกจากรายการแนะนำ' : 'เพิ่มในรายการแนะนำ'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${home.isFeatured ? 'text-white' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'home', data: home })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeleteHome(home.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">รูปภาพ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={banner.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b"><img src={banner.imageUrl} alt={`แบนเนอร์ ${index + 1}`} className="w-32 h-16 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'banner', data: banner })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeleteBanner(banner.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">รูปภาพ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">หัวข้อ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ผู้เขียน</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">วันที่เผยแพร่</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
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
                  <button onClick={() => setFormState({ type: 'article', data: article })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeleteArticle(article.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">รูปภาพ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ชื่อโครงการ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">หมวดหมู่</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">สถานที่</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
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
                  <button onClick={() => setFormState({ type: 'portfolio', data: project })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeletePortfolioProject(project.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">หัวข้อ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Slug</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b font-medium text-gray-800">{page.title}</td>
              <td className="py-3 px-4 border-b text-gray-600 font-mono text-xs">/{page.slug}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'page', data: page })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeletePage(page.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ลำดับ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">รูปภาพ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">หัวข้อ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ขนาด</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ลิงก์</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
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
                  <button onClick={() => setFormState({ type: 'promo', data: card })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeletePromoCard(card.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ลำดับ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">รูปภาพ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">หัวข้อ</th>
            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">แนะนำ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">วิดีโอ URL</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.sort((a,b) => a.order - b.order).map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b font-medium text-gray-800">{item.order}</td>
              <td className="py-3 px-4 border-b"><img src={item.imageUrl} alt={item.title} className="w-24 h-12 object-cover rounded-md"/></td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{item.title}</td>
              <td className="py-3 px-4 border-b text-center">{item.isFeatured ? 'ใช่' : 'ไม่'}</td>
              <td className="py-3 px-4 border-b text-gray-600 font-mono text-xs"><a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{item.videoUrl}</a></td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'testimonial', data: item })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeleteTestimonial(item.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">สถานะ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ข้อความ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {item.isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                </span>
              </td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{item.message}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button onClick={() => setFormState({ type: 'notification', data: item })} className="text-blue-600 hover:text-blue-800 font-semibold">แก้ไข</button>
                  <button onClick={() => onDeleteNotification(item.id)} className="text-red-600 hover:text-red-800 font-semibold">ลบ</button>
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
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">วันที่</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">ชื่อ</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">เบอร์โทร</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">อีเมล</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">งบประมาณ (บาท)</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">สถานที่</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-gray-600 text-xs">{lead.timestamp.toLocaleString('th-TH')}</td>
              <td className="py-3 px-4 border-b font-medium text-gray-800">{lead.firstName} {lead.lastName}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.phone}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.email}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.budget.toLocaleString()}</td>
              <td className="py-3 px-4 border-b text-gray-600">{lead.district}, {lead.province}</td>
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
      default: return null;
    }
  }

  const getAddNewButtonText = () => {
    switch (activeTab) {
      case 'homes': return 'เพิ่มแบบบ้านใหม่';
      case 'portfolio': return 'เพิ่มโครงการใหม่';
      case 'banners': return 'เพิ่มแบนเนอร์ใหม่';
      case 'articles': return 'เพิ่มบทความใหม่';
      case 'pages': return 'เพิ่มหน้าใหม่';
      case 'promos': return 'เพิ่มโปรโมการ์ดใหม่';
      case 'testimonials': return 'เพิ่มรีวิวใหม่';
      case 'notifications': return 'เพิ่มประกาศใหม่';
      default: return 'เพิ่มใหม่';
    }
  };


  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">แดชบอร์ดผู้ดูแลระบบ</h1>
         {activeTab !== 'popup' && activeTab !== 'siteInfo' && (
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
          <button onClick={() => setActiveTab('homes')} className={`${activeTab === 'homes' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>แบบบ้าน</button>
          <button onClick={() => setActiveTab('portfolio')} className={`${activeTab === 'portfolio' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>ผลงาน</button>
          <button onClick={() => setActiveTab('banners')} className={`${activeTab === 'banners' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>สไลด์แบนเนอร์</button>
          <button onClick={() => setActiveTab('articles')} className={`${activeTab === 'articles' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>บทความ</button>
          <button onClick={() => setActiveTab('pages')} className={`${activeTab === 'pages' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>หน้าเพจ</button>
          <button onClick={() => setActiveTab('promos')} className={`${activeTab === 'promos' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>โปรโมการ์ด</button>
          <button onClick={() => setActiveTab('testimonials')} className={`${activeTab === 'testimonials' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>รีวิว</button>
          <button onClick={() => setActiveTab('notifications')} className={`${activeTab === 'notifications' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>ประกาศ</button>
          <button onClick={() => setActiveTab('popup')} className={`${activeTab === 'popup' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>ป๊อปอัพ</button>
          <button onClick={() => setActiveTab('siteInfo')} className={`${activeTab === 'siteInfo' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>ข้อมูลเว็บไซต์</button>
          <button onClick={() => setActiveTab('leads')} className={`${activeTab === 'leads' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>ข้อมูลติดต่อ</button>
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
    </div>
  );
};

export default AdminPanel;
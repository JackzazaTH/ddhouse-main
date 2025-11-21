
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import AdminPanel from '@/components/AdminPanel';
import LoginModal from '@/components/LoginModal';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const {
        homes, handleAddHome, handleUpdateHome, handleDeleteHome,
        banners, handleAddBanner, handleUpdateBanner, handleDeleteBanner,
        articles, handleAddArticle, handleUpdateArticle, handleDeleteArticle,
        customPages, handleAddCustomPage, handleUpdateCustomPage, handleDeleteCustomPage,
        promoCards, handleAddPromoCard, handleUpdatePromoCard, handleDeletePromoCard,
        testimonials, handleAddTestimonial, handleUpdateTestimonial, handleDeleteTestimonial,
        portfolioProjects, handleAddPortfolioProject, handleUpdatePortfolioProject, handleDeletePortfolioProject,
        notifications, handleAddNotification, handleUpdateNotification, handleDeleteNotification,
        popupModalContent, handleUpdatePopupModal,
        siteInfo, handleUpdateSiteInfo,
        leads,
        addToast,
        handleUpdateLead,
        handleDeleteLead,
        loginLogs,
        handleAddLoginLog,
    } = useAppContext();

    const handleLogin = (username: string, password: string) => {
        // Hardcoded credentials as per requirements
        // In a real app, this should be validated on the server
        if (username === 'admin' && password === 'admin789') {
            setIsAuthenticated(true);
            handleAddLoginLog(username, 'Success');
            addToast('Welcome back, Admin!', 'success');
        } else {
            handleAddLoginLog(username, 'Failed');
            addToast('Invalid username or password.', 'error');
        }
    };
    
    const handleLogout = () => {
        // Do not set isAuthenticated(false) here to avoid flashing the login modal before redirect.
        // The state will be reset when the component unmounts anyway.
        addToast('Logged out successfully.', 'info');
        router.push('/');
    }

    if (!isAuthenticated) {
        return (
            <LoginModal
                onClose={() => window.history.back()}
                onSubmit={handleLogin}
            />
        );
    }
    
    return (
        <AdminPanel
            homes={homes}
            onAddHome={handleAddHome}
            onUpdateHome={handleUpdateHome}
            onDeleteHome={handleDeleteHome}
            banners={banners}
            onAddBanner={handleAddBanner}
            onUpdateBanner={handleUpdateBanner}
            onDeleteBanner={handleDeleteBanner}
            articles={articles}
            onAddArticle={handleAddArticle}
            onUpdateArticle={handleUpdateArticle}
            onDeleteArticle={handleDeleteArticle}
            pages={customPages}
            onAddPage={handleAddCustomPage}
            onUpdatePage={handleUpdateCustomPage}
            onDeletePage={handleDeleteCustomPage}
            promoCards={promoCards}
            onAddPromoCard={handleAddPromoCard}
            onUpdatePromoCard={handleUpdatePromoCard}
            onDeletePromoCard={handleDeletePromoCard}
            testimonials={testimonials}
            onAddTestimonial={handleAddTestimonial}
            onUpdateTestimonial={handleUpdateTestimonial}
            onDeleteTestimonial={handleDeleteTestimonial}
            portfolioProjects={portfolioProjects}
            onAddPortfolioProject={handleAddPortfolioProject}
            onUpdatePortfolioProject={handleUpdatePortfolioProject}
            onDeletePortfolioProject={handleDeletePortfolioProject}
            notifications={notifications}
            onAddNotification={handleAddNotification}
            onUpdateNotification={handleUpdateNotification}
            onDeleteNotification={handleDeleteNotification}
            popupModalContent={popupModalContent}
            onUpdatePopupModal={handleUpdatePopupModal}
            siteInfo={siteInfo}
            onUpdateSiteInfo={handleUpdateSiteInfo}
            leads={leads}
            onUpdateLead={handleUpdateLead}
            onDeleteLead={handleDeleteLead}
            loginLogs={loginLogs}
            onLogout={handleLogout}
        />
    );
}

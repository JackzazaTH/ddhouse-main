'use client';
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import AdminPanel from '@/components/AdminPanel';
import PasswordModal from '@/components/PasswordModal';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        // FIX: Destructure lead management handlers from context.
        handleUpdateLead,
        handleDeleteLead,
    } = useAppContext();

    const handleAdminLoginAttempt = (password: string) => {
        if (password === '1234') {
            setIsAuthenticated(true);
            addToast('Login successful!', 'success');
        } else {
            addToast('Incorrect password.', 'error');
        }
    };

    if (!isAuthenticated) {
        return (
            <PasswordModal
                onClose={() => window.history.back()}
                onSubmit={handleAdminLoginAttempt}
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
            // FIX: Corrected typo from handleDeletePage to handleDeleteCustomPage.
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
            // FIX: Pass lead management handlers to AdminPanel.
            onUpdateLead={handleUpdateLead}
            onDeleteLead={handleDeleteLead}
            addToast={addToast}
        />
    );
}
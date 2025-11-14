import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useAppContext } from './context/AppContext';
import { View } from './lib/types';
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotificationBanner from "./components/NotificationBanner";
import VideoModal from "./components/VideoModal";
import MainPopupModal from "./components/MainPopupModal";
import ToastContainer from './components/ToastContainer';
import PasswordModal from './components/PasswordModal';
import AdminPanel from './components/AdminPanel';
import HomePage from './app/page';
import DesignsPage from './app/designs/page';
import ArticlesPage from './app/articles/page';
import PortfolioPage from './app/portfolio/page';
import HomeDetailPage from './app/designs/[id]/page';
import ArticleDetailPage from './app/articles/[slug]/page';
import PortfolioDetailPage from './app/portfolio/[slug]/page';
import CustomPageSlug from './app/[slug]/page';

type Route = {
    view: View;
    slug: string | null;
    queryParams: URLSearchParams;
}

const App: React.FC = () => {
    const context = useAppContext();
    const [route, setRoute] = useState<Route>({ view: 'list', slug: null, queryParams: new URLSearchParams() });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            const [path, queryString] = hash.split('?');
            const segments = path.split('/').filter(Boolean);

            const view = (segments[0] as View) || 'list';
            const slug = segments[1] || null;
            
            setRoute({ view, slug, queryParams: new URLSearchParams(queryString) });
            window.scrollTo(0, 0);
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Parse initial route

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleNavigate = (view: View, slug?: string) => {
        let path = `/${view}`;
        if (slug) {
            path += `/${slug}`;
        }
        window.location.hash = path;
    };

    const handleSearch = (term: string) => {
        window.location.hash = `/designs?q=${encodeURIComponent(term)}`;
    };

    const handleAdminClick = () => {
        if (route.view === 'admin') {
            handleNavigate('list');
        } else {
            handleNavigate('admin');
        }
    };
    
    const handleAdminLoginAttempt = (password: string) => {
        if (password === '1234') {
            setIsAuthenticated(true);
            context.addToast('Login successful!', 'success');
        } else {
            context.addToast('Incorrect password.', 'error');
        }
    };


    const renderView = () => {
        const { view, slug, queryParams } = route;

        switch (view) {
            case 'list':
                // FIX: Pass onNavigate prop to HomePage.
                return <HomePage onNavigate={handleNavigate} />;
            case 'designs':
                // FIX: Pass onNavigate and queryParams props to DesignsPage.
                return <DesignsPage onNavigate={handleNavigate} queryParams={queryParams} />;
            case 'detail':
                 // FIX: Pass onNavigate prop to HomeDetailPage.
                 return <HomeDetailPage params={{ id: slug || '' }} onNavigate={handleNavigate} />;
            case 'articles':
                // FIX: Pass onNavigate prop to ArticlesPage.
                return <ArticlesPage onNavigate={handleNavigate} />;
            case 'articleDetail':
                // FIX: Pass onNavigate prop to ArticleDetailPage.
                return <ArticleDetailPage params={{ slug: slug || '' }} onNavigate={handleNavigate} />;
            case 'portfolio':
                // FIX: Pass onNavigate prop to PortfolioPage.
                return <PortfolioPage onNavigate={handleNavigate} />;
            case 'portfolioDetail':
                // FIX: Pass onNavigate prop to PortfolioDetailPage.
                return <PortfolioDetailPage params={{ slug: slug || '' }} onNavigate={handleNavigate} />;
            case 'admin':
                if (!isAuthenticated) {
                     return (
                        <PasswordModal
                            onClose={() => handleNavigate('list')}
                            onSubmit={handleAdminLoginAttempt}
                        />
                    );
                }
                return (
                    <AdminPanel
                        homes={context.homes} onAddHome={context.handleAddHome} onUpdateHome={context.handleUpdateHome} onDeleteHome={context.handleDeleteHome}
                        banners={context.banners} onAddBanner={context.handleAddBanner} onUpdateBanner={context.handleUpdateBanner} onDeleteBanner={context.handleDeleteBanner}
                        articles={context.articles} onAddArticle={context.handleAddArticle} onUpdateArticle={context.handleUpdateArticle} onDeleteArticle={context.handleDeleteArticle}
                        pages={context.customPages} onAddPage={context.handleAddCustomPage} onUpdatePage={context.handleUpdateCustomPage} onDeletePage={context.handleDeleteCustomPage}
                        promoCards={context.promoCards} onAddPromoCard={context.handleAddPromoCard} onUpdatePromoCard={context.handleUpdatePromoCard} onDeletePromoCard={context.handleDeletePromoCard}
                        testimonials={context.testimonials} onAddTestimonial={context.handleAddTestimonial} onUpdateTestimonial={context.handleUpdateTestimonial} onDeleteTestimonial={context.handleDeleteTestimonial}
                        portfolioProjects={context.portfolioProjects} onAddPortfolioProject={context.handleAddPortfolioProject} onUpdatePortfolioProject={context.handleUpdatePortfolioProject} onDeletePortfolioProject={context.handleDeletePortfolioProject}
                        notifications={context.notifications} onAddNotification={context.handleAddNotification} onUpdateNotification={context.handleUpdateNotification} onDeleteNotification={context.handleDeleteNotification}
                        popupModalContent={context.popupModalContent} onUpdatePopupModal={context.handleUpdatePopupModal}
                        siteInfo={context.siteInfo} onUpdateSiteInfo={context.handleUpdateSiteInfo}
                        leads={context.leads} onUpdateLead={context.handleUpdateLead} onDeleteLead={context.handleDeleteLead}
                    />
                );
            case 'customPage':
                // FIX: Pass onNavigate prop to CustomPageSlug.
                return <CustomPageSlug params={{ slug: slug || ''}} onNavigate={handleNavigate} />;
            default:
                 // Handle other top-level slugs as custom pages
                const isKnownView = ['list', 'designs', 'articles', 'portfolio', 'admin'].includes(view);
                if (!isKnownView) {
                     // FIX: Pass onNavigate prop to CustomPageSlug.
                     return <CustomPageSlug params={{ slug: view }} onNavigate={handleNavigate} />;
                }
                // FIX: Pass onNavigate prop to HomePage.
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <ToastContainer toasts={context.toasts} removeToast={context.removeToast} />
            {context.activeNotification && context.showNotification && (
                <NotificationBanner notification={context.activeNotification} onClose={() => context.setShowNotification(false)} />
            )}
            <Header
                homes={context.homes}
                onSearch={handleSearch}
                onNavigate={handleNavigate}
                currentView={route.view}
                selectedPageSlug={route.slug}
                siteInfo={context.siteInfo}
            />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <Suspense fallback={<div>Loading...</div>}>
                    {renderView()}
                </Suspense>
            </main>
            <Footer siteInfo={context.siteInfo} onAdminClick={handleAdminClick} isAdminView={route.view === 'admin'} />
            
            {context.videoModalUrl && (
                <VideoModal videoUrl={context.videoModalUrl} onClose={() => context.setVideoModalUrl(null)} />
            )}
            {context.isMainPopupOpen && (
                <MainPopupModal
                    content={context.popupModalContent}
                    onClose={() => context.setIsMainPopupOpen(false)}
                    onNavigate={handleNavigate}
                />
            )}
        </div>
    );
};

export default App;
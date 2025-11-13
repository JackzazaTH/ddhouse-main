import React, { useState, useEffect, useRef } from 'react';
import { HomeDesign, View } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (term: string) => void;
  homes: HomeDesign[];
  onNavigate?: (view: View, slug?: string) => void;
}

// --- Helper Components ---

// A wrapper component to safely use the useRouter hook for Next.js environment.
const SearchPopupWithRouter: React.FC<SearchPopupProps> = (props) => {
  const router = useRouter();
  
  const handleSelectHome = (id: string) => {
    props.onClose();
    router.push(`/designs/${id}`);
  };

  return <SearchPopupUI {...props} handleSelectHome={handleSelectHome} />;
}

// The UI component that can be used in both SPA and Next.js environments.
const SearchPopupUI: React.FC<SearchPopupProps & { handleSelectHome: (id: string) => void }> = ({ isOpen, onClose, onSearch, homes, handleSelectHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHomes, setFilteredHomes] = useState<HomeDesign[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm(''); // Reset search term when closed
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
        setFilteredHomes([]);
        return;
    }

    const results = homes
      .filter(home => home.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5); // Limit to 5 results for preview

    setFilteredHomes(results);
  }, [searchTerm, homes]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      onClose();
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex justify-center items-start pt-20 md:pt-32 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-popup-title"
    >
      <div 
        className="w-full max-w-2xl p-4 animate-fade-in-down"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="search-popup-title" className="sr-only">Search for a home design</h2>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="ค้นหาแบบบ้านที่คุณต้องการ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pr-16 text-lg bg-white border-2 border-transparent rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-accent focus:border-transparent text-gray-800 placeholder-gray-400"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-secondary transition-colors"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
        
        {searchTerm && (
          <div className="mt-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto">
            {filteredHomes.length > 0 ? (
              <ul>
                {filteredHomes.map(home => (
                  <li key={home.id}>
                    <button 
                      onClick={() => handleSelectHome(home.id)}
                      className="w-full flex items-center p-4 text-left hover:bg-gray-100 transition-colors"
                    >
                      <img src={home.images[0]} alt={home.name} className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-800">{home.name}</p>
                        <p className="text-sm text-gray-600">{home.area} m² · {home.bedrooms} beds · {home.bathrooms} baths</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No matching home designs found.
              </div>
            )}
          </div>
        )}
      </div>
       <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    </div>
  );
};


// --- Main Component ---

const SearchPopup: React.FC<SearchPopupProps> = (props) => {
  // If onNavigate is provided, we are in SPA mode.
  if (props.onNavigate) {
    const handleSelectHome = (id: string) => {
      props.onClose();
      // Use the passed-in navigation function for SPAs
      props.onNavigate!('detail', id);
    };
    return <SearchPopupUI {...props} handleSelectHome={handleSelectHome} />;
  }

  // Otherwise, we are in Next.js mode and can use the router hook safely.
  return <SearchPopupWithRouter {...props} />;
};

export default SearchPopup;


import React, { useState, useEffect, useRef } from 'react';
import { HomeDesign } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (term: string) => void;
  homes: HomeDesign[];
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose, onSearch, homes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHomes, setFilteredHomes] = useState<HomeDesign[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
  
  const handleSelectHome = (id: string) => {
    onClose();
    router.push(`/designs/${id}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
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
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex justify-center items-start pt-24 md:pt-32 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-popup-title"
    >
      <div 
        className="w-full max-w-3xl p-4 animate-fade-in-down"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="search-popup-title" className="sr-only">Search for a home design</h2>
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="ค้นหาแบบบ้านที่ต้องการ (เช่น Modern, Loft, 3 ห้องนอน)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-36 py-5 text-lg bg-white border-none rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 text-gray-800 placeholder-gray-400 transition-all"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-28 flex items-center pr-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="absolute top-2 right-2 bottom-2 bg-primary text-white px-6 rounded-xl hover:bg-red-700 transition-all font-medium shadow-md"
          >
            ค้นหา
          </button>
        </form>
        
        {searchTerm && (
          <div className="mt-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto border border-gray-100">
            {filteredHomes.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {filteredHomes.map(home => (
                  <li key={home.id}>
                    <button 
                      onClick={() => handleSelectHome(home.id)}
                      className="w-full flex items-center p-4 text-left hover:bg-gray-50 transition-colors group"
                    >
                      <img src={home.images[0]} alt={home.name} className="w-20 h-16 object-cover rounded-lg mr-5 shadow-sm group-hover:shadow-md transition-shadow" />
                      <div>
                        <p className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">{home.name}</p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <span>{home.area} ตร.ม.</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{home.bedrooms} ห้องนอน</span>
                        </p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-300 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>ไม่พบแบบบ้านที่ตรงกับคำค้นหา "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>
       <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
          aria-label="Close search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    </div>
  );
};

export default SearchPopup;

'use client';
import React, { useState, useRef } from 'react';
import { CustomPage } from '@/lib/types';

interface CustomPageFormProps {
  page: CustomPage | null;
  onSave: (data: Omit<CustomPage, 'id'>) => void;
  onClose: () => void;
}

// Simple Rich Text Editor Component
const RichTextEditor: React.FC<{ value: string; onChange: (value: string) => void; }> = ({ value, onChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const wrapSelection = (wrapper: [string, string]) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);

        const newText = `${before}${wrapper[0]}${selectedText}${wrapper[1]}$after`;
        
        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = start + wrapper[0].length;
            textarea.selectionEnd = end + wrapper[0].length;
        }, 0);
    };

    const applyList = (tag: 'ul' | 'ol') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        const listItems = selectedText
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `  <li>${line.trim()}</li>`)
            .join('\n');
            
        if (listItems.length === 0) {
            wrapSelection([`<${tag}>\n  <li>List item</li>\n</${tag}>`, '']);
            return;
        }
            
        const listHtml = `<${tag}>\n${listItems}\n</${tag}>`;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);
        const newText = `${before}${listHtml}${after}`;
        onChange(newText);
    };

    const applyLink = () => {
        const url = prompt("Enter the URL:", "https://");
        if (url) {
            wrapSelection([`<a href="${url}" target="_blank" rel="noopener noreferrer">`, `</a>`]);
        }
    };
    
    const toolbarButtonClasses = "px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 text-sm font-medium transition-colors";
    
    return (
        <div>
            <div className="flex flex-wrap items-center gap-2 border border-b-0 border-gray-300 rounded-t-md p-2 bg-gray-50">
                <button type="button" onClick={() => wrapSelection(['<h2 class="text-2xl font-bold mb-4">', '</h2>'])} className={toolbarButtonClasses}>H2</button>
                <button type="button" onClick={() => wrapSelection(['<h3 class="text-xl font-bold mb-2">', '</h3>'])} className={toolbarButtonClasses}>H3</button>
                <button type="button" onClick={() => wrapSelection(['<p class="mb-4">', '</p>'])} className={toolbarButtonClasses}>P</button>
                <div className="w-px h-5 bg-gray-300"></div>
                <button type="button" onClick={() => wrapSelection(['<strong>', '</strong>'])} className={`${toolbarButtonClasses} font-bold`}>B</button>
                <button type="button" onClick={() => wrapSelection(['<em>', '</em>'])} className={`${toolbarButtonClasses} italic`}>I</button>
                <div className="w-px h-5 bg-gray-300"></div>
                <button type="button" onClick={() => applyList('ul')} className={toolbarButtonClasses}>List</button>
                <button type="button" onClick={() => applyList('ol')} className={toolbarButtonClasses}>Numbered List</button>
                <button type="button" onClick={applyLink} className={toolbarButtonClasses}>Link</button>
            </div>
            <textarea
                ref={textareaRef}
                name="content"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Start writing your page content here..."
                className="p-3 bg-white text-gray-800 border border-gray-300 rounded-b-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors h-64 font-mono text-sm"
            />
        </div>
    );
};


const CustomPageForm: React.FC<CustomPageFormProps> = ({ page, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<CustomPage, 'id'>>({
    title: page?.title || '',
    slug: page?.slug || '',
    content: page?.content || '',
    seo: {
      title: page?.seo?.title || '',
      description: page?.seo?.description || '',
    }
  });
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const inputClasses = "p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setFormData(prev => ({ 
          ...prev, 
          title: value,
          slug: generateSlug(value)
      }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo!,
        [name]: value,
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <div className="p-8 flex-grow overflow-y-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">{page ? 'Edit Page' : 'Add New Page'}</h2>
            
            <div className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Page Title" className={inputClasses} required />
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="URL Slug (auto-generated)" className={`${inputClasses} bg-gray-200 cursor-not-allowed`} required readOnly />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <RichTextEditor 
                    value={formData.content}
                    onChange={(newContent) => setFormData(prev => ({ ...prev, content: newContent }))}
                  />
                </div>
            </div>

            {/* SEO Section */}
            <div className="mt-6 border-t pt-6">
              <button type="button" onClick={() => setIsSeoOpen(!isSeoOpen)} className="w-full text-left font-semibold text-lg text-gray-700 flex justify-between items-center">
                SEO Settings
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isSeoOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isSeoOpen && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                    <input type="text" name="title" value={formData.seo?.title} onChange={handleSeoChange} placeholder="SEO-friendly title for search engines" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea name="description" value={formData.seo?.description} onChange={handleSeoChange} placeholder="Brief summary for search engine results (max 160 chars)" className={`h-20 ${inputClasses}`} maxLength={160} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 px-8 py-4 flex justify-end space-x-4 border-t">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-red-900">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomPageForm;

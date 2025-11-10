'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../lib/axios';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import ImageUpload from '../../components/ImageUpload';

export default function EditorPage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const { success, error } = useToast();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [coverImage, setCoverImage] = useState<{
    url: string;
    publicId: string;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const save = async () => {
    // Prevent multiple calls
    if (saving) return;
    
    // Validation
    if (!title.trim()) {
      error('Missing Title', 'Please enter a title for your post');
      return;
    }
    
    setSaving(true);
    try {
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await axios.post('/posts', { 
        title: title.trim(), 
        content: content.trim(), 
        status: 'draft',
        slug,
        coverImage: coverImage ? {
          url: coverImage.url,
          publicId: coverImage.publicId,
          width: coverImage.width,
          height: coverImage.height
        } : undefined
      });
      success('Draft Saved!', 'Your post has been saved as a draft');
    } catch (err) {
      console.error('Error saving draft:', err);
      error('Save Failed', 'Failed to save your draft. Please try again.');
    }
    setSaving(false);
  };

  const publish = async () => {
    // Prevent multiple calls
    if (saving) return;
    
    // Validation
    if (!title.trim()) {
      error('Missing Title', 'Please enter a title for your post');
      return;
    }
    
    setSaving(true);
    try {
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await axios.post('/posts', { 
        title: title.trim(), 
        content: content.trim(), 
        status: 'published',
        slug,
        coverImage: coverImage ? {
          url: coverImage.url,
          publicId: coverImage.publicId,
          width: coverImage.width,
          height: coverImage.height
        } : undefined
      });
      success('Post Published!', 'Your post is now live and visible to everyone');
      // Clear form after successful publish
      setTitle('');
      setContent('');
      setCoverImage(null);
    } catch (err) {
      console.error('Error publishing post:', err);
      error('Publish Failed', 'Failed to publish your post. Please try again.');
    }
    setSaving(false);
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let replacement = '';
    switch (format) {
      case 'bold':
        replacement = `**${selectedText}**`;
        break;
      case 'italic':
        replacement = `*${selectedText}*`;
        break;
      case 'heading':
        replacement = `## ${selectedText}`;
        break;
      case 'link':
        replacement = `[${selectedText}](url)`;
        break;
      default:
        replacement = selectedText;
    }
    
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
  };

  const insertImage = () => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const imageMarkdown = '![Image description](image-url)';
    const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
    setContent(newContent);
  };

  const handleImageUploaded = (imageData: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }) => {
    setCoverImage(imageData);
  };

  const removeCoverImage = async () => {
    if (coverImage) {
      try {
        // Encode the publicId for URL
        const encodedPublicId = encodeURIComponent(coverImage.publicId);
        await axios.delete(`/images/delete/${encodedPublicId}`);
        setCoverImage(null);
      } catch (error) {
        console.error('Error deleting image:', error);
        setCoverImage(null); // Remove from UI even if deletion fails
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: '#6B7A3F'}}></div>
          <div className="text-lg font-medium" style={{color: '#2C2F26'}}>{t('loading')}...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #F5F6F2 0%, #EAEBD6 50%, #E2E4DC 100%)'}}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2" style={{background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 50%, #A8B48C 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
            {t('createNewPost')} ✨
          </h1>
          <p className="text-lg" style={{color: '#5C5F56'}}>{t('shareYourStory')}</p>
        </div>
        
        <div className="rounded-2xl p-8 shadow-xl animate-slide-up" style={{backgroundColor: '#FFFFFF', borderColor: '#D4D6D0', border: '1px solid'}}>
          {/* Cover Image Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4" style={{color: '#2C2F26'}}>Cover Image (Optional)</h3>
            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img 
                  src={coverImage.url} 
                  alt="Cover" 
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={removeCoverImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  🗑️
                </button>
              </div>
            ) : (
              <ImageUpload onImageUploaded={handleImageUploaded} className="mb-4" />
            )}
          </div>

          {/* Title Input */}
          <input 
            className="w-full p-4 rounded-xl border mb-6 text-lg transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50" 
            style={{
              borderColor: '#D4D6D0',
              backgroundColor: '#F5F6F2',
              color: '#2C2F26'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6B7A3F';
              e.target.style.boxShadow = '0 0 0 3px rgba(107, 122, 63, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D4D6D0';
              e.target.style.boxShadow = 'none';
            }}
            placeholder={t('enterPostTitle')} 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          
          <div className="mb-6">
            <div className="flex gap-3 mb-4 p-3 rounded-xl" style={{backgroundColor: '#E8EAE1'}}>
              <button 
                type="button"
                onClick={() => insertFormatting('bold')}
                className="px-4 py-2 rounded-lg border transition-all hover:scale-105 text-sm font-bold"
                style={{backgroundColor: '#FFFFFF', borderColor: '#D4D6D0', color: '#2C2F26'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B7A3F'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                B
              </button>
              <button 
                type="button"
                onClick={() => insertFormatting('italic')}
                className="px-4 py-2 rounded-lg border transition-all hover:scale-105 text-sm italic"
                style={{backgroundColor: '#FFFFFF', borderColor: '#D4D6D0', color: '#2C2F26'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B7A3F'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                I
              </button>
              <button 
                type="button"
                onClick={() => insertFormatting('heading')}
                className="px-4 py-2 rounded-lg border transition-all hover:scale-105 text-sm font-bold"
                style={{backgroundColor: '#FFFFFF', borderColor: '#D4D6D0', color: '#2C2F26'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B7A3F'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                H2
              </button>
              <button 
                type="button"
                onClick={() => insertFormatting('link')}
                className="px-4 py-2 rounded-lg border transition-all hover:scale-105 text-sm"
                style={{backgroundColor: '#FFFFFF', borderColor: '#D4D6D0', color: '#2C2F26'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B7A3F'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                {t('link')}
              </button>
              <button 
                type="button"
                onClick={insertImage}
                className="px-4 py-2 rounded-lg border transition-all hover:scale-105 text-sm"
                style={{backgroundColor: '#FFFFFF', borderColor: '#D4D6D0', color: '#2C2F26'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B7A3F'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                📷 Image
              </button>
            </div>
            
            <textarea
              id="content"
              className="w-full h-80 p-4 rounded-xl border resize-y transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderColor: '#D4D6D0',
                backgroundColor: '#F5F6F2',
                color: '#2C2F26'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6B7A3F';
                e.target.style.boxShadow = '0 0 0 3px rgba(107, 122, 63, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D4D6D0';
                e.target.style.boxShadow = 'none';
              }}
              placeholder={`${t('startWriting')}

${t('markdownSupport')}:
- **${t('boldText')}**
- *${t('italicText')}*  
- ## ${t('headings')}
- [${t('links')}](url)`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <div className="text-sm mt-2 flex justify-between items-center">
              <span style={{color: '#7A7D73'}}>{t('markdownSupported')} • {content.length} {t('characters')}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl filter contrast-125 brightness-110">📝</span>
                <span style={{color: '#6B7A3F'}} className="font-medium">{t('readyToPublish')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                save();
              }}
              className="px-8 py-3 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg text-white font-medium" 
              style={{backgroundColor: '#A8ABA1'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7A7D73'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A8ABA1'}
              disabled={saving}
            >
              {saving ? '💾 ' + t('saving') + '...' : '💾 ' + t('saveDraft')}
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                publish();
              }}
              className="px-8 py-3 text-white rounded-xl transition-all transform hover:scale-105 hover:shadow-xl font-medium" 
              style={{background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 100%)'}}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              disabled={saving}
            >
              {saving ? '🚀 ' + t('publishing') + '...' : '🚀 ' + t('publish')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

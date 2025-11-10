'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import axios from '../../lib/axios';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  status: 'draft' | 'published';
  coverImage?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  };
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useLanguage();
  const { user, loading, refreshAuth } = useAuth();

  const fetchUserPosts = useCallback(async () => {
    try {
      setLoadingData(true);
      const response = await axios.get('/posts/my-posts');
      const allPosts = response.data;
      
      setPosts(allPosts.filter((post: Post) => post.status === 'published'));
      setDrafts(allPosts.filter((post: Post) => post.status === 'draft'));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }
      fetchUserPosts();
    }
  }, [user, loading, router, fetchUserPosts]);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">{t('loading')}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          <button 
            onClick={fetchUserPosts}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="text-center py-8">
            <h1 
              className="text-4xl font-bold mb-2 animate-slide-up" 
              style={{
                background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 50%, #A8B48C 100%)', 
                WebkitBackgroundClip: 'text', 
                backgroundClip: 'text', 
                color: 'transparent'
              }}
            >
              {t('welcomeBack')}, {user?.username || 'Writer'}! ✨
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg animate-slide-up-delay">
              {t('yourCreativeSpace')}
            </p>
          </div>

          {/* Quick Actions - Role-based */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Write New Post */}
            <Link 
              href="/editor" 
              className="group relative overflow-hidden rounded-2xl text-white p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
              style={{background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 100%)'}}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">✍️</div>
                <h3 className="font-bold text-lg mb-2 text-white">{t('writeNewPost')}</h3>
                <p className="text-sm text-white/90">{t('startMasterpiece')}</p>
              </div>
            </Link>
          
            {/* Posts Count */}
            <div 
              className="group rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up-delay border" 
              style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}
            >
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">📝</div>
              <h3 className="font-bold text-lg mb-2" style={{color: '#2C2F26'}}>
                {user?.role === 'admin' ? 'All Posts' : posts.length + ' ' + t('published')}
              </h3>
              <p className="text-sm" style={{color: '#5C5F56'}}>
                {user?.role === 'admin' ? 'Platform content' : t('yourPublishedStories')}
              </p>
            </div>
            
            {/* Drafts or Users */}
            <div 
              className="group rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up-delay-2 border" 
              style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}
            >
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {user?.role === 'admin' ? '👥' : '💾'}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{color: '#2C2F26'}}>
                {user?.role === 'admin' ? 'Users' : drafts.length + ' ' + t('drafts')}
              </h3>
              <p className="text-sm" style={{color: '#5C5F56'}}>
                {user?.role === 'admin' ? 'Platform users' : t('worksInProgress')}
              </p>
            </div>
          
            {/* Admin Quick Access */}
            {user?.role === 'admin' && (
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Link 
                  href="/admin" 
                  className="group relative overflow-hidden rounded-2xl text-white p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
                  style={{background: 'linear-gradient(135deg, #8B5A2B 0%, #CD853F 100%)'}}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">👑</div>
                    <h3 className="font-bold text-lg mb-2 text-white">Admin Dashboard</h3>
                    <p className="text-sm text-white/90">Manage users and content</p>
                  </div>
                </Link>
                
                <div 
                  className="group rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up-delay border" 
                  style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}
                >
                  <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🌐</div>
                  <h3 className="font-bold text-lg mb-2" style={{color: '#2C2F26'}}>Platform Stats</h3>
                  <p className="text-sm" style={{color: '#5C5F56'}}>Overall analytics</p>
                </div>
              </div>
            )}
          </div>

          {/* Role-based Content */}
          {user?.role === 'admin' ? (
            /* Admin Overview */
            <section className="mb-8 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Platform Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="rounded-2xl p-6 border" 
                  style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}
                >
                  <h3 className="text-xl font-bold mb-4" style={{color: '#2C2F26'}}>Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: '#F5F7F0'}}>
                      <span style={{color: '#5C5F56'}}>New users today</span>
                      <span className="font-semibold" style={{color: '#2C2F26'}}>0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: '#F5F7F0'}}>
                      <span style={{color: '#5C5F56'}}>Posts today</span>
                      <span className="font-semibold" style={{color: '#2C2F26'}}>0</span>
                    </div>
                  </div>
                </div>

                <div 
                  className="rounded-2xl p-6 border" 
                  style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}
                >
                  <h3 className="text-xl font-bold mb-4" style={{color: '#2C2F26'}}>System Health</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg" style={{backgroundColor: '#F5F7F0'}}>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span style={{color: '#5C5F56'}}>Database OK</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg" style={{backgroundColor: '#F5F7F0'}}>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span style={{color: '#5C5F56'}}>Auth service OK</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            /* User Drafts Section */
            <section className="mb-8 animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{t('recentDrafts')}</h2>
                <Link 
                  href="/editor" 
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{backgroundColor: '#6B7A3F'}}
                >
                  <span className="text-lg font-bold">+</span>
                  <span>{t('newDraft')}</span>
                </Link>
              </div>
              
              {drafts.length > 0 ? (
                <div className="space-y-4">
                  {drafts.map((draft) => (
                    <div 
                      key={draft._id} 
                      className="group bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 border-l-4 border-l-amber-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 transition-colors">
                            {draft.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
                            {draft.excerpt || draft.content.substring(0, 150) + '...'}
                          </p>
                          <div className="text-xs text-neutral-500 mt-3 flex items-center gap-2">
                            <span>📅</span>
                            <span>{t('lastEdited')} {new Date(draft.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-3 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="px-3 py-1 text-primary-600 hover:bg-primary-50 rounded-md transition-colors text-sm font-medium">
                            {t('edit')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-600">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t('noDrafts')}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mb-4">{t('startWriting')}</p>
                  <Link 
                    href="/editor" 
                    className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{backgroundColor: '#6B7A3F'}}
                  >
                    <span className="text-lg font-bold">+</span>
                    <span>{t('createFirstDraft')}</span>
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Published Posts */}
          <section className="animate-fade-in-up-delay">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {user?.role === 'admin' ? 'Recent Platform Posts' : t('yourPublishedPosts')}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {posts.length} {user?.role === 'admin' ? 'total posts' : t('posts')}
                </span>
                <button 
                  onClick={fetchUserPosts}
                  className="flex items-center gap-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-200"
                >
                  <span className="text-lg">🔄</span>
                  <span>{t('refresh')}</span>
                </button>
              </div>
            </div>
            
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div 
                    key={post._id} 
                    className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Cover Image */}
                    {post.coverImage?.url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.coverImage.url} 
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt || post.content.substring(0, 120) + '...'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-2">
                          <span className="capitalize">{post.status}</span>
                          {post.coverImage?.url && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">📷</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-600">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  {user?.role === 'admin' ? 'No Posts on Platform' : t('noPublishedPosts')}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                  {user?.role === 'admin' ? 'No posts have been published yet' : t('publishFirstPost')}
                </p>
                {user?.role !== 'admin' && (
                  <Link 
                    href="/editor" 
                    className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{backgroundColor: '#6B7A3F'}}
                  >
                    <span className="text-lg font-bold">+</span>
                    <span>{t('writeFirstPost')}</span>
                  </Link>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

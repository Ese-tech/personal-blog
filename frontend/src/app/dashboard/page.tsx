'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user data and posts from API
    // This is a placeholder - you'll need to implement the API calls
    setUser({ name: 'Your Name', email: 'you@example.com' });
    setPosts([
      { id: 1, title: 'My First Published Post', excerpt: 'This is a published post...', status: 'published', createdAt: '2025-11-09' }
    ]);
    setDrafts([
      { id: 2, title: 'Work in Progress', excerpt: 'Still working on this...', status: 'draft', createdAt: '2025-11-09' }
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-2xl mb-2">✨</div>
          <div>Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Welcome back, {user?.name || 'Writer'}! ✨
        </h1>
        <p className="text-gray-600">Your creative space awaits.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link 
          href="/editor" 
          className="card hover:shadow-lg transition-shadow text-center p-6 bg-linear-to-br from-primary to-secondary text-white"
        >
          <div className="text-2xl mb-2">✍️</div>
          <h3 className="font-semibold">Write New Post</h3>
          <p className="text-sm opacity-90">Start your next masterpiece</p>
        </Link>
        
        <div className="card text-center p-6">
          <div className="text-2xl mb-2">📝</div>
          <h3 className="font-semibold">{posts.length} Published</h3>
          <p className="text-sm text-gray-600">Your published stories</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="text-2xl mb-2">💾</div>
          <h3 className="font-semibold">{drafts.length} Drafts</h3>
          <p className="text-sm text-gray-600">Works in progress</p>
        </div>
      </div>

      {/* Drafts Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Drafts</h2>
          <Link href="/editor" className="text-primary hover:underline text-sm">
            + New Draft
          </Link>
        </div>
        
        {drafts.length > 0 ? (
          <div className="space-y-4">
            {drafts.map((draft: any) => (
              <div key={draft.id} className="card p-4 border-l-4 border-l-accent">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{draft.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{draft.excerpt}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      Last edited {draft.createdAt}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="text-primary hover:underline text-sm">Edit</button>
                    <button className="text-gray-500 hover:underline text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center p-8 text-gray-500">
            <div className="text-4xl mb-2">📄</div>
            <p>No drafts yet</p>
            <Link href="/editor" className="text-primary hover:underline text-sm">
              Create your first draft
            </Link>
          </div>
        )}
      </section>

      {/* Published Posts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Published Posts</h2>
          <button className="text-primary hover:underline text-sm">
            View All
          </button>
        </div>
        
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post: any) => (
              <PostCard 
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={user?.name}
                date={post.createdAt}
                slug={`post-${post.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center p-8 text-gray-500">
            <div className="text-4xl mb-2">🌟</div>
            <p>No published posts yet</p>
            <p className="text-sm mt-1">Share your thoughts with the world!</p>
          </div>
        )}
      </section>
    </div>
  );
}
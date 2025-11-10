'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../lib/axios';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../contexts/ToastContext';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'viewer' | 'user' | 'admin';
  createdAt: string;
}

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
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const { success, error, warning } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const fetchAllData = useCallback(async () => {
    setLoadingData(true);
    try {
      // Fetch all posts
      const postsResponse = await axios.get('/posts/all');
      setPosts(postsResponse.data);
      
      // Fetch all users
      const usersResponse = await axios.get('/users/all');
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/dashboard');
      return;
    }
    
    if (user && user.role === 'admin') {
      fetchAllData();
    }
  }, [user, loading, router, fetchAllData]);

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter(p => p._id !== postId));
      success('Post Deleted', 'The post has been successfully deleted');
    } catch (err) {
      console.error('Error deleting post:', err);
      error('Delete Failed', 'Failed to delete the post. Please try again.');
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      await axios.put(`/users/${userId}/role`, { role: newRole });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole as any } : u));
      success('Role Updated', `User role has been changed to ${newRole}`);
    } catch (err) {
      console.error('Error updating user role:', err);
      error('Update Failed', 'Failed to update user role. Please try again.');
    }
  };

  const togglePostStatus = async (postId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await axios.put(`/posts/${postId}`, { status: newStatus });
      setPosts(posts.map(p => p._id === postId ? { ...p, status: newStatus as any } : p));
      success('Status Changed', `Post has been ${newStatus} successfully`);
    } catch (err) {
      console.error('Error updating post status:', err);
      error('Update Failed', 'Failed to update post status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: '#6B7A3F'}}></div>
          <div className="text-lg font-medium" style={{color: '#2C2F26'}}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{color: '#2C2F26'}}>Access Denied</h1>
          <p style={{color: '#5C5F56'}}>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #F5F6F2 0%, #EAEBD6 50%, #E2E4DC 100%)'}}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2" style={{background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 50%, #A8B48C 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
            Admin Dashboard 👑
          </h1>
          <p className="text-lg" style={{color: '#5C5F56'}}>Manage your platform content and users</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'posts' 
                ? 'text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={activeTab === 'posts' ? {background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 100%)'} : {backgroundColor: '#E8EAE1'}}
          >
            📝 All Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'users' 
                ? 'text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={activeTab === 'users' ? {background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 100%)'} : {backgroundColor: '#E8EAE1'}}
          >
            👥 All Users ({users.length})
          </button>
        </div>

        {/* Content */}
        {loadingData ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: '#6B7A3F'}}></div>
            <p style={{color: '#5C5F56'}}>Loading admin data...</p>
          </div>
        ) : (
          <>
            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{color: '#2C2F26'}}>All Posts Management</h2>
                  <button
                    onClick={fetchAllData}
                    className="px-4 py-2 rounded-lg text-white transition-all hover:scale-105"
                    style={{backgroundColor: '#6B7A3F'}}
                  >
                    🔄 Refresh
                  </button>
                </div>
                
                {posts.length === 0 ? (
                  <div className="text-center py-12 rounded-xl" style={{backgroundColor: '#FFFFFF', border: '1px solid #D4D6D0'}}>
                    <p style={{color: '#5C5F56'}}>No posts found</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div key={post._id} className="rounded-xl p-6 shadow-sm hover:shadow-lg transition-all" style={{backgroundColor: '#FFFFFF', border: '1px solid #D4D6D0'}}>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4 flex-1">
                          {/* Cover Image Thumbnail */}
                          {post.coverImage?.url && (
                            <div className="shrink-0">
                              <img 
                                src={post.coverImage.url} 
                                alt="Cover" 
                                className="w-20 h-20 object-cover rounded-lg border"
                                style={{borderColor: '#D4D6D0'}}
                              />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold" style={{color: '#2C2F26'}}>{post.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                post.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {post.status === 'published' ? '✅ Published' : '📝 Draft'}
                              </span>
                            </div>
                            <p className="text-sm mb-3" style={{color: '#5C5F56'}}>
                              By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
                              {post.coverImage?.url && (
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">📷 Has Image</span>
                              )}
                            </p>
                            <p className="text-sm" style={{color: '#7A7D73'}}>
                              {post.excerpt || post.content.substring(0, 200) + '...'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => togglePostStatus(post._id, post.status)}
                            className="px-3 py-1 rounded-lg text-sm font-medium transition-all hover:scale-105"
                            style={{backgroundColor: '#8A9A5B', color: 'white'}}
                          >
                            {post.status === 'published' ? '📝 Unpublish' : '🚀 Publish'}
                          </button>
                          <button
                            onClick={() => deletePost(post._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all hover:scale-105"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{color: '#2C2F26'}}>User Management</h2>
                  <button
                    onClick={fetchAllData}
                    className="px-4 py-2 rounded-lg text-white transition-all hover:scale-105"
                    style={{backgroundColor: '#6B7A3F'}}
                  >
                    🔄 Refresh
                  </button>
                </div>
                
                {users.length === 0 ? (
                  <div className="text-center py-12 rounded-xl" style={{backgroundColor: '#FFFFFF', border: '1px solid #D4D6D0'}}>
                    <p style={{color: '#5C5F56'}}>No users found</p>
                  </div>
                ) : (
                  users.map((userItem) => (
                    <div key={userItem._id} className="rounded-xl p-6 shadow-sm hover:shadow-lg transition-all" style={{backgroundColor: '#FFFFFF', border: '1px solid #D4D6D0'}}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold" style={{color: '#2C2F26'}}>{userItem.username}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              userItem.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : userItem.role === 'user'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {userItem.role === 'admin' ? '👑 Admin' : userItem.role === 'user' ? '👤 User' : '👁️ Viewer'}
                            </span>
                          </div>
                          <p className="text-sm" style={{color: '#5C5F56'}}>
                            {userItem.email} • Joined {new Date(userItem.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={userItem.role}
                            onChange={(e) => changeUserRole(userItem._id, e.target.value)}
                            className="px-3 py-1 rounded-lg border text-sm"
                            style={{borderColor: '#D4D6D0', backgroundColor: '#F5F6F2'}}
                            disabled={userItem._id === user._id} // Can't change own role
                          >
                            <option value="viewer">Viewer</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
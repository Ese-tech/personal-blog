'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

interface User {
  id: string;
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  joinedAt: string;
  postsCount: number;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  slug: string;
}

export default function ProfilePage() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user profile and posts from API
    // This is a placeholder - you'll need to implement the API call
    setUser({
      id: '1',
      name: 'Jane Smith',
      username: 'janesmith',
      bio: 'Passionate writer, design enthusiast, and coffee lover. I write about minimalism, creativity, and the beauty in everyday moments. Always exploring new ways to express ideas through words.',
      socialLinks: {
        twitter: 'https://twitter.com/janesmith',
        instagram: 'https://instagram.com/janesmith',
        website: 'https://janesmith.com'
      },
      joinedAt: '2025-01-15',
      postsCount: 12
    });

    setPosts([
      {
        id: '1',
        title: 'The Beauty of Minimalist Design',
        excerpt: 'In a world filled with visual noise and information overload, minimalist design offers a breath of fresh air...',
        createdAt: '2025-11-08',
        slug: 'beauty-of-minimalist-design'
      },
      {
        id: '2',
        title: 'Finding Inspiration in Everyday Moments',
        excerpt: 'Sometimes the most beautiful stories come from the simplest experiences. Here\'s how I find inspiration...',
        createdAt: '2025-11-05',
        slug: 'finding-inspiration-everyday-moments'
      },
      {
        id: '3',
        title: 'The Art of Slow Living',
        excerpt: 'In our fast-paced world, there\'s something magical about slowing down and savoring each moment...',
        createdAt: '2025-11-02',
        slug: 'art-of-slow-living'
      }
    ]);

    setLoading(false);
  }, [params.username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-2xl mb-2">👤</div>
          <div>Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-6xl mb-4">🤷‍♀️</div>
        <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
        <p className="text-gray-600 mb-4">The profile you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <div className="card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-secondary"
              />
            ) : (
              <div className="w-24 h-24 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">@{user.username}</p>
            
            {user.bio && (
              <p className="text-gray-700 mb-4 leading-relaxed">{user.bio}</p>
            )}

            {/* Stats */}
            <div className="flex gap-6 mb-4 text-sm">
              <div>
                <span className="font-semibold text-primary">{user.postsCount}</span>
                <span className="text-gray-600 ml-1">
                  {user.postsCount === 1 ? 'post' : 'posts'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Joined</span>
                <span className="ml-1">
                  {new Date(user.joinedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
            </div>

            {/* Social Links */}
            {user.socialLinks && (
              <div className="flex gap-4">
                {user.socialLinks.website && (
                  <a
                    href={user.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm flex items-center gap-1"
                  >
                    🌐 Website
                  </a>
                )}
                {user.socialLinks.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm flex items-center gap-1"
                  >
                    🐦 Twitter
                  </a>
                )}
                {user.socialLinks.instagram && (
                  <a
                    href={user.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm flex items-center gap-1"
                  >
                    📸 Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Latest Posts by {user.name}
          </h2>
          <span className="text-gray-500 text-sm">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={user.name}
                date={post.createdAt}
                slug={post.slug}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center p-12 text-gray-500">
            <div className="text-6xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p>{user.name} hasn't published any posts yet.</p>
            <p className="text-sm mt-1">Check back later for new content!</p>
          </div>
        )}
      </section>

      {/* Load More Button (if needed) */}
      {posts.length >= 10 && (
        <div className="text-center mt-8">
          <button className="btn-secondary">
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
}
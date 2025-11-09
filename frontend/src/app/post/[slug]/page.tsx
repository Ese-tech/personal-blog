'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
  };
  createdAt: string;
  tags?: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // TODO: Fetch post by slug from API
    // This is a placeholder - you'll need to implement the API call
    setPost({
      id: '1',
      title: 'The Beauty of Minimalist Design',
      content: `# The Beauty of Minimalist Design

In a world filled with visual noise and information overload, minimalist design offers a breath of fresh air. It's not just about making things look clean and simple – it's about creating purposeful, meaningful experiences that resonate with users on a deeper level.

## What Makes Minimalism So Powerful?

Minimalist design follows the principle that **less is more**. By removing unnecessary elements, we can:

- Focus attention on what truly matters
- Create a sense of calm and clarity
- Improve user experience through simplicity
- Allow content to speak for itself

> "Simplicity is the ultimate sophistication." – Leonardo da Vinci

## Key Principles

### 1. White Space
White space (or negative space) is not empty space – it's a powerful design element that gives content room to breathe.

### 2. Typography
Choose fonts carefully. Good typography can carry the entire design experience.

### 3. Color Palette
Limit your color palette. A restrained use of color creates harmony and elegance.

## Conclusion

Minimalist design isn't about stripping away everything – it's about keeping only what serves a purpose. Every element should have a reason for being there.

*What do you think about minimalist design? Share your thoughts in the comments below!*`,
      author: {
        name: 'Jane Smith',
        username: 'janesmith'
      },
      createdAt: '2025-11-08',
      tags: ['design', 'minimalism', 'ux']
    });

    setComments([
      {
        id: '1',
        author: 'Alice Cooper',
        content: 'Beautiful article! I completely agree about the power of white space.',
        createdAt: '2025-11-08',
        replies: [
          {
            id: '1-1',
            author: 'Jane Smith',
            content: 'Thank you Alice! White space is often undervalued.',
            createdAt: '2025-11-08'
          }
        ]
      },
      {
        id: '2',
        author: 'Bob Designer',
        content: 'This really changed how I think about my designs. Less really can be more!',
        createdAt: '2025-11-09'
      }
    ]);

    setLoading(false);
  }, [params.slug]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // TODO: Submit comment to API
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Current User', // Replace with actual user
      content: newComment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-2xl mb-2">📖</div>
          <div>Loading post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
        <p className="text-gray-600 mb-4">The post you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-6">
      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <Link 
            href={`/profile/${post.author.username}`}
            className="flex items-center gap-2 hover:text-primary"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs">
              {post.author.name.charAt(0)}
            </div>
            <span className="font-medium">{post.author.name}</span>
          </Link>
          <span>•</span>
          <time>{new Date(post.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</time>
        </div>

        {post.tags && (
          <div className="flex gap-2 mb-6">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-secondary text-primary text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
      </div>

      {/* Comments Section */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="btn-primary"
              disabled={!newComment.trim()}
            >
              Post Comment
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-2 border-l-secondary pl-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                  {comment.author.charAt(0)}
                </div>
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-gray-500 text-xs">•</span>
                <time className="text-gray-500 text-xs">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </div>
              
              <p className="text-gray-700 mb-3">{comment.content}</p>
              
              <button className="text-primary text-sm hover:underline">
                Reply
              </button>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="border-l-2 border-l-gray-200 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                          {reply.author.charAt(0)}
                        </div>
                        <span className="font-medium text-sm">{reply.author}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <time className="text-gray-500 text-xs">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </time>
                      </div>
                      <p className="text-gray-700 text-sm">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </section>
    </article>
  );
}
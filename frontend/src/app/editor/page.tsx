'use client';

import { useState } from 'react';
import axios from 'axios';

export default function EditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await axios.post('http://localhost:5000/api/posts', { 
        title, 
        content, 
        status: 'draft',
        slug 
      });
      alert('Draft saved!');
    } catch (error) {
      alert('Error saving draft');
    }
    setSaving(false);
  };

  const publish = async () => {
    setSaving(true);
    try {
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await axios.post('http://localhost:5000/api/posts', { 
        title, 
        content, 
        status: 'published',
        slug 
      });
      alert('Post published!');
    } catch (error) {
      alert('Error publishing post');
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Create New Post ✨</h1>
      
      <input 
        className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:border-primary focus:outline-none" 
        placeholder="Enter your post title..." 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      
      <div className="mb-4">
        <div className="flex gap-2 mb-2 p-2 bg-gray-50 rounded-lg">
          <button 
            type="button"
            onClick={() => insertFormatting('bold')}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100 text-sm font-bold"
          >
            B
          </button>
          <button 
            type="button"
            onClick={() => insertFormatting('italic')}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100 text-sm italic"
          >
            I
          </button>
          <button 
            type="button"
            onClick={() => insertFormatting('heading')}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100 text-sm font-bold"
          >
            H2
          </button>
          <button 
            type="button"
            onClick={() => insertFormatting('link')}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100 text-sm"
          >
            Link
          </button>
        </div>
        
        <textarea
          id="content"
          className="w-full h-64 p-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none resize-y"
          placeholder="Start writing your amazing post... 

You can use Markdown formatting:
- **bold text**
- *italic text*  
- ## headings
- [links](url)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        <div className="text-sm text-gray-500 mt-1">
          Supports Markdown formatting • {content.length} characters
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={save} 
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors" 
          disabled={saving}
        >
          {saving ? '💾 Saving...' : '💾 Save Draft'}
        </button>
        <button 
          onClick={publish} 
          className="px-6 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-full hover:opacity-90 transition-opacity" 
          disabled={saving}
        >
          {saving ? '🚀 Publishing...' : '🚀 Publish'}
        </button>
      </div>
    </div>
  );
}

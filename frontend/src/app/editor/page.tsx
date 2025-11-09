"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await axios.post('/api/posts', { title, content, status: 'draft' });
      alert('Saved');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <input className="w-full p-3 rounded border mb-4" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="mb-4">
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <div className="flex gap-3">
        <button onClick={save} className="rounded-full bg-primary text-white py-2 px-4" disabled={saving}>{saving ? 'Saving...' : 'Save draft'}</button>
      </div>
    </div>
  );
}

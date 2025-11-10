'use client';

import { useState, useRef } from 'react';
import axios from '../lib/axios';

interface ImageUploadProps {
  onImageUploaded: (imageData: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }) => void;
  className?: string;
}

export default function ImageUpload({ onImageUploaded, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        onImageUploaded({
          url: response.data.url,
          publicId: response.data.public_id,
          width: response.data.width,
          height: response.data.height,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${dragActive 
            ? 'border-green-400 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        style={{
          borderColor: dragActive ? '#6B7A3F' : '#D4D6D0',
          backgroundColor: dragActive ? '#F0F3E8' : '#F9FAF7'
        }}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 mb-4" style={{borderColor: '#6B7A3F'}}></div>
            <p style={{color: '#5C5F56'}}>Uploading image...</p>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-4">📸</div>
            <p className="text-lg font-medium mb-2" style={{color: '#2C2F26'}}>
              {dragActive ? 'Drop image here' : 'Upload Cover Image'}
            </p>
            <p className="text-sm" style={{color: '#5C5F56'}}>
              Drag & drop or click to select<br/>
              JPG, PNG, WebP • Max 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
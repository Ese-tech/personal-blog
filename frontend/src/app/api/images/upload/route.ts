import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cloudinary } from '@/lib/cloudinary';

// Upload image to Cloudinary - copied from Express route
export async function POST(request: NextRequest) {
  try {
    await verifyToken(request);
    
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
    }

    // Convert file to buffer and then to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'lumapress-blog', // Organize images in a folder
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 630, crop: 'limit' }, // Limit max size
        { quality: 'auto' }, // Quality optimization
        { fetch_format: 'auto' } // Format optimization (WebP, etc.)
      ]
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    const err = error as Error;
    if (err.message === 'Not authenticated' || err.message === 'Invalid token') {
      return NextResponse.json({ message: err.message }, { status: 401 });
    }
    return NextResponse.json({ 
      message: 'Image upload failed',
      error: err.message 
    }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cloudinary } from '@/lib/cloudinary';

// Delete image from Cloudinary - copied from Express route
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ publicId: string }> }) {
  try {
    await verifyToken(request);
    
    const { publicId } = await params;
    
    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return NextResponse.json({ success: true, message: 'Image deleted successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to delete image' }, { status: 400 });
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    const err = error as Error;
    if (err.message === 'Not authenticated' || err.message === 'Invalid token') {
      return NextResponse.json({ message: err.message }, { status: 401 });
    }
    return NextResponse.json({ 
      message: 'Image deletion failed',
      error: err.message 
    }, { status: 500 });
  }
}
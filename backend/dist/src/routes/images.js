import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { cloudinary } from '../config/cloudinary';
import multer from 'multer';
const router = express.Router();
// Configure multer for memory storage (no local files)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            const error = new Error('Only image files are allowed');
            error.code = 'INVALID_FILE_TYPE';
            cb(error, false);
        }
    }
});
// Upload image to Cloudinary
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }
        // Convert buffer to base64
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
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
        res.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height
        });
    }
    catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({
            message: 'Image upload failed',
            error: error.message
        });
    }
});
// Delete image from Cloudinary
router.delete('/delete/:publicId', verifyToken, async (req, res) => {
    try {
        const { publicId } = req.params;
        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
            res.json({ success: true, message: 'Image deleted successfully' });
        }
        else {
            res.status(400).json({ success: false, message: 'Failed to delete image' });
        }
    }
    catch (error) {
        console.error('Cloudinary delete error:', error);
        res.status(500).json({
            message: 'Image deletion failed',
            error: error.message
        });
    }
});
export default router;

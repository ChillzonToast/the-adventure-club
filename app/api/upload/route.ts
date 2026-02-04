import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Compress to JPEG using sharp and resize to max 800px width to save DB space
        // Quality 60 is a good balance for DB storage
        const compressedBuffer = await sharp(buffer)
            .resize({ width: 800, withoutEnlargement: true })
            .jpeg({ quality: 60 })
            .toBuffer();

        // Convert to Base64 Data URI
        const base64Image = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        // Return the Data URI as the "url"
        return NextResponse.json({ success: true, url: base64Image });
    } catch (error) {
        console.error('Upload conversion error:', error);
        return NextResponse.json({ success: false, message: 'Upload processing failed' }, { status: 500 });
    }
}

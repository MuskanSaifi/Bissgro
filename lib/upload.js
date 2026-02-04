import fs from 'fs';
import path from 'path';
import { uploadImage as cloudinaryUpload, deleteImage as cloudinaryDelete } from './cloudinary';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const LOCAL_PREFIX = 'local:';

/** Get extension from mime type */
function getExt(mimeType) {
  const map = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp' };
  return map[mimeType] || 'jpg';
}

/** Save image to local public/uploads folder (fallback when Cloudinary fails) */
function saveLocal(buffer, folder, mimeType) {
  const ext = getExt(mimeType);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const dir = path.join(UPLOADS_DIR, folder);
  const filepath = path.join(dir, filename);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, buffer);

  const webPath = `/uploads/${folder}/${filename}`;
  return { url: webPath, publicId: `${LOCAL_PREFIX}${webPath}` };
}

/** Upload to Cloudinary, fallback to local if Cloudinary fails (e.g. cloud_name disabled) */
export async function uploadImage(buffer, folder = 'blog', mimeType = 'image/jpeg') {
  try {
    const result = await cloudinaryUpload(buffer, folder, mimeType);
    return { url: result.secure_url, publicId: result.public_id };
  } catch (err) {
    const msg = err?.message || '';
    if (msg.includes('disabled') || err?.http_code === 401 || msg.includes('401')) {
      console.warn('Cloudinary unavailable, using local storage:', msg);
      return saveLocal(buffer, folder, mimeType);
    }
    throw err;
  }
}

/** Delete image - handles both Cloudinary and local storage */
export async function deleteImage(publicId) {
  if (!publicId) return;
  if (publicId.startsWith(LOCAL_PREFIX)) {
    const relPath = publicId.slice(LOCAL_PREFIX.length);
    const filepath = path.join(process.cwd(), 'public', relPath);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    return;
  }
  return cloudinaryDelete(publicId);
}

/** Extract local image paths from HTML (for cleanup when contentImagePublicIds not set) */
export function extractLocalPathsFromHtml(html) {
  if (!html) return [];
  const ids = [];
  const regex = /src=["'](\/uploads\/[^"']+)["']/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    ids.push(`${LOCAL_PREFIX}${m[1]}`);
  }
  return ids;
}

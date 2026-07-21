import { v2 as cloudinary } from 'cloudinary';

function ensureCloudinaryConfig() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      'Cloudinary env missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET on the server.'
    );
  }

  cloudinary.config({ cloud_name, api_key, api_secret });
}

/** Upload image buffer to Cloudinary via stream (avoids huge base64 payloads). */
export async function uploadImage(buffer, folder = 'blog', mimeType = 'image/jpeg') {
  ensureCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        timeout: 120000,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

/** Delete image from Cloudinary by public_id */
export async function deleteImage(publicId) {
  ensureCloudinaryConfig();
  return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}

/** Extract Cloudinary public_ids from HTML content (for cleanup on delete) */
export function extractPublicIdsFromHtml(html) {
  if (!html) return [];
  const ids = [];
  const regex =
    /res\.cloudinary\.com\/[^/]+\/image\/upload(?:\/[^/]+)*\/([^"'\s.]+(?:\/[^"'\s.]+)*)(?:\.(?:jpg|jpeg|png|gif|webp))?/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const id = m[1];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export default cloudinary;

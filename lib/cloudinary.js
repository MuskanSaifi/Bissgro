import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** Upload image buffer to Cloudinary. folder: 'blog' | 'blog-content', mimeType: e.g. 'image/jpeg' */
export async function uploadImage(buffer, folder = 'blog', mimeType = 'image/jpeg') {
  const base64 = buffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'image',
  });
  return result;
}

/** Delete image from Cloudinary by public_id */
export async function deleteImage(publicId) {
  return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}

/** Extract Cloudinary public_ids from HTML content (for cleanup on delete) */
export function extractPublicIdsFromHtml(html) {
  if (!html) return [];
  const ids = [];
  // Match cloudinary image URLs: .../upload/.../public_id.ext
  const regex = /res\.cloudinary\.com\/[^/]+\/image\/upload(?:\/[^/]+)*\/([^"'\s.]+(?:\/[^"'\s.]+)*)(?:\.(?:jpg|jpeg|png|gif|webp))?/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const id = m[1];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export default cloudinary;

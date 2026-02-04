import { deleteImage } from './upload';

/** Extract all image publicIds from page sections (and optional meta) */
export function extractImagePublicIdsFromPage(page) {
  const ids = new Set();
  if (page.metaImagePublicId) ids.add(page.metaImagePublicId);
  for (const section of page.sections || []) {
    const c = section.content || {};
    if (c.imagePublicId) ids.add(c.imagePublicId);
    for (const item of c.items || []) {
      if (item.imgPublicId) ids.add(item.imgPublicId);
    }
  }
  return Array.from(ids);
}

/** Extract publicIds from sections payload (used when saving) */
export function extractImagePublicIdsFromSections(sections, metaImagePublicId) {
  const ids = new Set();
  if (metaImagePublicId) ids.add(metaImagePublicId);
  for (const section of sections || []) {
    const c = section.content || {};
    if (c.imagePublicId) ids.add(c.imagePublicId);
    for (const item of c.items || []) {
      if (item.imgPublicId) ids.add(item.imgPublicId);
    }
  }
  return Array.from(ids);
}

/** Delete orphaned images when content is updated */
export async function deleteOrphanedImages(oldIds, newIds) {
  const toDelete = oldIds.filter((id) => id && !newIds.includes(id));
  for (const publicId of toDelete) {
    try {
      await deleteImage(publicId);
    } catch (err) {
      console.warn('Failed to delete image:', publicId, err);
    }
  }
}

/** Delete all page images from Cloudinary */
export async function deletePageImages(page) {
  const ids = extractImagePublicIdsFromPage(page);
  for (const publicId of ids) {
    try {
      await deleteImage(publicId);
    } catch (err) {
      console.warn('Failed to delete image:', publicId, err);
    }
  }
}

/**
 * STORAGE PLACEHOLDER
 * Replace with Supabase Storage / S3 / Cloudflare R2 in Phase 2
 */

export interface UploadResult {
  url:  string
  key:  string
  size: number
}

export async function uploadFile(
  file: File,
  folder = 'general'
): Promise<UploadResult> {
  // TODO: implement Supabase Storage upload
  console.log('Storage not implemented — placeholder', { folder })
  return {
    url:  `/placeholder/${folder}/${file.name}`,
    key:  `${folder}/${file.name}`,
    size: file.size,
  }
}

export async function deleteFile(key: string): Promise<void> {
  // TODO: implement file deletion
  console.log('Storage delete not implemented', { key })
}

export function getPublicUrl(key: string): string {
  // TODO: return CDN url
  return `/placeholder/${key}`
}

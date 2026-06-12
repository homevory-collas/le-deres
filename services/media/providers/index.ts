// services/media/providers/index.ts
// Storage provider adapters: Cloudflare R2, AWS S3, Backblaze B2.
// All use S3-compatible API (R2 and B2 are S3-compatible).

export type MediaCategory = 'content' | 'thumbnails' | 'profiles' | 'products' | 'ai' | 'live' | 'documents' | 'temp'
export type MediaMimeType  = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' | 'video/mp4' | 'video/webm' | 'application/pdf' | string

// ─── DTOs ─────────────────────────────────────────────────
export interface UploadFileDTO {
  key?:          string           // custom key; auto-generated if omitted
  filename:      string
  mimeType:      MediaMimeType
  size:          number           // bytes
  category:      MediaCategory
  isPublic:      boolean
  metadata?:     Record<string, string>
  expiresIn?:    number           // seconds; for presigned URL generation
}

export interface UploadedFileDTO {
  key:           string
  url:           string           // direct URL (if public)
  cdnUrl?:       string           // CDN URL (preferred)
  publicUrl:     string           // canonical public URL
  size:          number
  mimeType:      MediaMimeType
  provider:      string
  bucket:        string
  category:      MediaCategory
  uploadedAt:    Date
  metadata?:     Record<string, string>
}

export interface PresignedUploadDTO {
  uploadUrl:     string           // PUT this URL directly from browser
  key:           string           // object key once uploaded
  fields?:       Record<string, string>  // extra form fields (for S3 POST)
  expiresAt:     Date
}

export interface DeleteFileDTO {
  key:           string
  permanently?:  boolean          // false = soft-delete / versioned
}

export interface GenerateThumbnailDTO {
  sourceKey:     string
  outputKey:     string
  width:         number
  height:        number
  quality?:      number           // 1-100, default 80
  format?:       'jpeg' | 'webp' | 'png'
  fit?:          'cover' | 'contain' | 'fill'
}

export interface ListFilesDTO {
  prefix?:       string
  category?:     MediaCategory
  maxKeys?:      number
  cursor?:       string           // for pagination
}

export interface StorageFileDTO {
  key:           string
  size:          number
  lastModified:  Date
  cdnUrl:        string
  mimeType?:     string
  metadata?:     Record<string, string>
}

// ─── Base interface ───────────────────────────────────────
interface StorageAdapter {
  name:          string
  bucket:        string
  cdnDomain?:    string
  upload(file: Buffer | Blob, dto: UploadFileDTO): Promise<UploadedFileDTO>
  uploadFromUrl(sourceUrl: string, dto: UploadFileDTO): Promise<UploadedFileDTO>
  generatePresignedUpload(dto: UploadFileDTO): Promise<PresignedUploadDTO>
  delete(key: string): Promise<void>
  getPublicUrl(key: string): string
  getPresignedDownloadUrl(key: string, expiresIn?: number): Promise<string>
  list(dto: ListFilesDTO): Promise<{ files: StorageFileDTO[]; nextCursor?: string }>
  exists(key: string): Promise<boolean>
  copy(sourceKey: string, destKey: string): Promise<void>
}

// ─── Cloudflare R2 Adapter ────────────────────────────────
// Install: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
// R2 uses S3-compatible API with custom endpoint
// Env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_KEY, R2_BUCKET, R2_CDN_DOMAIN

export class CloudflareR2Adapter implements StorageAdapter {
  name        = 'cloudflare-r2'
  bucket:      string
  cdnDomain?:  string
  // private client: S3Client

  constructor(private config: { accountId: string; accessKeyId: string; secretKey: string; bucket: string; cdnDomain?: string }) {
    this.bucket    = config.bucket
    this.cdnDomain = config.cdnDomain
    // TODO:
    // import { S3Client } from '@aws-sdk/client-s3'
    // this.client = new S3Client({
    //   region: 'auto',
    //   endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    //   credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretKey },
    // })
    console.log('[R2] Adapter initialized — bucket:', config.bucket)
  }

  async upload(file: Buffer | Blob, dto: UploadFileDTO): Promise<UploadedFileDTO> {
    // TODO:
    // import { PutObjectCommand } from '@aws-sdk/client-s3'
    // const key = dto.key ?? this.generateKey(dto)
    // await this.client.send(new PutObjectCommand({
    //   Bucket: this.bucket, Key: key,
    //   Body: file instanceof Blob ? Buffer.from(await file.arrayBuffer()) : file,
    //   ContentType: dto.mimeType,
    //   Metadata: dto.metadata,
    //   ACL: dto.isPublic ? 'public-read' : 'private',
    // }))
    // return { key, url: this.getPublicUrl(key), cdnUrl: this.getCdnUrl(key), ... }
    throw new Error('[R2] upload: not yet integrated. npm install @aws-sdk/client-s3')
  }

  async uploadFromUrl(sourceUrl: string, dto: UploadFileDTO): Promise<UploadedFileDTO> {
    // TODO: fetch(sourceUrl) then upload
    throw new Error('[R2] uploadFromUrl: not yet integrated.')
  }

  async generatePresignedUpload(dto: UploadFileDTO): Promise<PresignedUploadDTO> {
    // TODO:
    // import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
    // import { PutObjectCommand } from '@aws-sdk/client-s3'
    // const key = dto.key ?? this.generateKey(dto)
    // const url = await getSignedUrl(this.client, new PutObjectCommand({ Bucket: this.bucket, Key: key, ContentType: dto.mimeType }), { expiresIn: dto.expiresIn ?? 3600 })
    // return { uploadUrl: url, key, expiresAt: new Date(Date.now() + (dto.expiresIn ?? 3600) * 1000) }
    throw new Error('[R2] generatePresignedUpload: not yet integrated.')
  }

  async delete(key: string): Promise<void> {
    // TODO: this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }))
    throw new Error('[R2] delete: not yet integrated.')
  }

  getPublicUrl(key: string): string {
    if (this.cdnDomain) return `https://${this.cdnDomain}/${key}`
    return `https://${this.config.accountId}.r2.cloudflarestorage.com/${this.bucket}/${key}`
  }

  async getPresignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
    // TODO: getSignedUrl with GetObjectCommand
    throw new Error('[R2] getPresignedDownloadUrl: not yet integrated.')
  }

  async list(dto: ListFilesDTO): Promise<{ files: StorageFileDTO[]; nextCursor?: string }> {
    // TODO: ListObjectsV2Command
    return { files: [] }
  }

  async exists(key: string): Promise<boolean> {
    // TODO: HeadObjectCommand
    return false
  }

  async copy(sourceKey: string, destKey: string): Promise<void> {
    // TODO: CopyObjectCommand
    throw new Error('[R2] copy: not yet integrated.')
  }

  private generateKey(dto: UploadFileDTO): string {
    const ext = dto.filename.split('.').pop()
    return `${dto.category}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  }
}

// ─── AWS S3 Adapter ───────────────────────────────────────
// Uses same @aws-sdk/client-s3 as R2 (S3-compatible)
// Env: AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET, AWS_CLOUDFRONT_DOMAIN

export class AWSS3Adapter extends CloudflareR2Adapter {
  name = 'aws-s3'

  constructor(config: { region: string; accessKeyId: string; secretKey: string; bucket: string; cdnDomain?: string }) {
    super({ accountId: '', ...config })
    // TODO: different S3Client config (no custom endpoint, uses region-based)
    // this.client = new S3Client({ region: config.region, credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretKey } })
    console.log('[S3] Adapter initialized — bucket:', config.bucket, 'region:', config.region)
  }

  getPublicUrl(key: string): string {
    if (this.cdnDomain) return `https://${this.cdnDomain}/${key}`
    return `https://${this.bucket}.s3.amazonaws.com/${key}`
  }
}

// ─── Backblaze B2 Adapter ────────────────────────────────
// Backblaze B2 offers S3-compatible API (b2compat endpoint)
// Env: B2_KEY_ID, B2_APP_KEY, B2_BUCKET, B2_ENDPOINT, B2_CDN_DOMAIN

export class BackblazeB2Adapter extends CloudflareR2Adapter {
  name = 'backblaze-b2'

  constructor(config: { keyId: string; appKey: string; bucket: string; endpoint: string; cdnDomain?: string }) {
    super({ accountId: '', accessKeyId: config.keyId, secretKey: config.appKey, bucket: config.bucket, cdnDomain: config.cdnDomain })
    // TODO: S3Client with B2 S3-compatible endpoint
    // endpoint: 'https://s3.us-west-004.backblazeb2.com' (varies by region)
    console.log('[B2] Adapter initialized — bucket:', config.bucket)
  }

  getPublicUrl(key: string): string {
    if (this.cdnDomain) return `https://${this.cdnDomain}/${key}`
    return `/placeholder/b2/${key}`
  }
}

// ─── Thumbnail generation (Cloudflare Images or sharp) ────
export class ThumbnailService {
  async generate(dto: GenerateThumbnailDTO, storage: StorageAdapter): Promise<UploadedFileDTO> {
    // Option A: Cloudflare Images (recommended for R2 users)
    // POST https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1

    // Option B: sharp (server-side)
    // TODO:
    // import sharp from 'sharp'
    // const source = await fetch(storage.getPublicUrl(dto.sourceKey))
    // const buffer = Buffer.from(await source.arrayBuffer())
    // const thumbnail = await sharp(buffer)
    //   .resize(dto.width, dto.height, { fit: dto.fit ?? 'cover' })
    //   .toFormat(dto.format ?? 'webp', { quality: dto.quality ?? 80 })
    //   .toBuffer()
    // return storage.upload(thumbnail, { filename: dto.outputKey, mimeType: `image/${dto.format ?? 'webp'}`, ... })
    throw new Error('ThumbnailService: not yet integrated. npm install sharp')
  }

  // Video thumbnail extraction
  async extractVideoThumbnail(videoKey: string, timestampSeconds: number, storage: StorageAdapter): Promise<UploadedFileDTO> {
    // TODO: use ffmpeg (via fluent-ffmpeg or child_process)
    // ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 thumbnail.jpg
    throw new Error('ThumbnailService.extractVideoThumbnail: requires ffmpeg')
  }
}

export const thumbnailService = new ThumbnailService()

// ─── Factory ──────────────────────────────────────────────
export function createStorageAdapter(): StorageAdapter {
  switch (process.env.STORAGE_PROVIDER) {
    case 'cloudflare-r2': return new CloudflareR2Adapter({
      accountId:   process.env.R2_ACCOUNT_ID    ?? '',
      accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
      secretKey:   process.env.R2_SECRET_KEY    ?? '',
      bucket:      process.env.R2_BUCKET        ?? '',
      cdnDomain:   process.env.R2_CDN_DOMAIN,
    })
    case 'aws-s3': return new AWSS3Adapter({
      region:      process.env.AWS_REGION           ?? 'eu-west-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID    ?? '',
      secretKey:   process.env.AWS_SECRET_ACCESS_KEY ?? '',
      bucket:      process.env.AWS_S3_BUCKET        ?? '',
      cdnDomain:   process.env.AWS_CLOUDFRONT_DOMAIN,
    })
    case 'backblaze-b2': return new BackblazeB2Adapter({
      keyId:    process.env.B2_KEY_ID   ?? '',
      appKey:   process.env.B2_APP_KEY  ?? '',
      bucket:   process.env.B2_BUCKET   ?? '',
      endpoint: process.env.B2_ENDPOINT ?? '',
      cdnDomain:process.env.B2_CDN_DOMAIN,
    })
    default: {
      // Return mock adapter for development
      return new CloudflareR2Adapter({ accountId:'mock', accessKeyId:'mock', secretKey:'mock', bucket:'mock' })
    }
  }
}

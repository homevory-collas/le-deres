// lib/services/media/storage.ts
// Storage provider abstraction layer.
// Do NOT connect real providers yet — swap in Phase 5.

export interface StorageFile {
  key:          string
  url:          string
  publicUrl:    string
  size:         number
  mimeType:     string
  metadata?:    Record<string, string>
  createdAt:    Date
}

export interface UploadOptions {
  folder?:      string
  filename?:    string
  metadata?:    Record<string, string>
  isPublic?:    boolean
  maxSizeMB?:   number
}

export interface StorageProvider {
  name:         string
  upload(file: File | Buffer, options?: UploadOptions): Promise<StorageFile>
  delete(key: string): Promise<void>
  getUrl(key: string, expiresIn?: number): Promise<string>
  list(prefix?: string): Promise<StorageFile[]>
  exists(key: string): Promise<boolean>
  metadata(key: string): Promise<StorageFile | null>
}

// ─── Mock provider (development) ─────────────────────────
export class MockStorageProvider implements StorageProvider {
  name = 'mock'

  async upload(file: File | Buffer, options: UploadOptions = {}): Promise<StorageFile> {
    const filename = options.filename ?? (file instanceof File ? file.name : `upload-${Date.now()}`)
    const folder   = options.folder ?? 'uploads'
    const key      = `${folder}/${Date.now()}-${filename}`
    console.log(`[MockStorage] upload → ${key}`)
    return {
      key,
      url:       `/mock-storage/${key}`,
      publicUrl: `/placeholder/${key}`,
      size:      file instanceof File ? file.size : (file as Buffer).length,
      mimeType:  file instanceof File ? file.type : 'application/octet-stream',
      metadata:  options.metadata,
      createdAt: new Date(),
    }
  }

  async delete(key: string): Promise<void> {
    console.log(`[MockStorage] delete → ${key}`)
  }

  async getUrl(key: string, expiresIn = 3600): Promise<string> {
    return `/placeholder/${key}?expires=${expiresIn}`
  }

  async list(prefix = ''): Promise<StorageFile[]> {
    return []
  }

  async exists(key: string): Promise<boolean> {
    return false
  }

  async metadata(key: string): Promise<StorageFile | null> {
    return null
  }
}

// ─── Cloudflare R2 adapter (placeholder) ─────────────────
export class CloudflareR2Provider implements StorageProvider {
  name = 'cloudflare-r2'
  // TODO: npm install @aws-sdk/client-s3 (R2 uses S3-compatible API)
  // private client: S3Client

  constructor(private config: { accountId: string; accessKeyId: string; secretKey: string; bucket: string }) {
    // TODO: initialize S3Client with R2 endpoint
    console.log('[CloudflareR2] initialized (placeholder — not connected)')
  }

  async upload(): Promise<StorageFile> { throw new Error('CloudflareR2: not implemented') }
  async delete(): Promise<void>        { throw new Error('CloudflareR2: not implemented') }
  async getUrl(key: string)            { return `/r2/${key}` }
  async list()                         { return [] }
  async exists()                       { return false }
  async metadata()                     { return null }
}

// ─── AWS S3 adapter (placeholder) ────────────────────────
export class AWSS3Provider implements StorageProvider {
  name = 'aws-s3'
  // TODO: npm install @aws-sdk/client-s3

  constructor(private config: { region: string; accessKeyId: string; secretKey: string; bucket: string }) {
    console.log('[AWSS3] initialized (placeholder — not connected)')
  }

  async upload(): Promise<StorageFile> { throw new Error('AWSS3: not implemented') }
  async delete(): Promise<void>        { throw new Error('AWSS3: not implemented') }
  async getUrl(key: string)            { return `https://s3.amazonaws.com/${this.config.bucket}/${key}` }
  async list()                         { return [] }
  async exists()                       { return false }
  async metadata()                     { return null }
}

// ─── Backblaze B2 adapter (placeholder) ──────────────────
export class BackblazeB2Provider implements StorageProvider {
  name = 'backblaze-b2'
  // TODO: npm install backblaze-b2 or use S3-compatible endpoint

  constructor(private config: { keyId: string; appKey: string; bucketId: string }) {
    console.log('[BackblazeB2] initialized (placeholder — not connected)')
  }

  async upload(): Promise<StorageFile> { throw new Error('BackblazeB2: not implemented') }
  async delete(): Promise<void>        { throw new Error('BackblazeB2: not implemented') }
  async getUrl(key: string)            { return `/b2/${key}` }
  async list()                         { return [] }
  async exists()                       { return false }
  async metadata()                     { return null }
}

// ─── Storage service factory ──────────────────────────────
export function createStorageProvider(provider?: string): StorageProvider {
  switch (provider ?? process.env.STORAGE_PROVIDER) {
    case 'cloudflare-r2': return new CloudflareR2Provider({
      accountId:   process.env.R2_ACCOUNT_ID!,
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretKey:   process.env.R2_SECRET_KEY!,
      bucket:      process.env.R2_BUCKET!,
    })
    case 'aws-s3': return new AWSS3Provider({
      region:      process.env.AWS_REGION!,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretKey:   process.env.AWS_SECRET_KEY!,
      bucket:      process.env.AWS_S3_BUCKET!,
    })
    case 'backblaze-b2': return new BackblazeB2Provider({
      keyId:    process.env.B2_KEY_ID!,
      appKey:   process.env.B2_APP_KEY!,
      bucketId: process.env.B2_BUCKET_ID!,
    })
    default: return new MockStorageProvider()
  }
}

// Singleton instance
export const storage = createStorageProvider()

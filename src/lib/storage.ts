import { env } from './env';

export interface ImageVariantOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
  fit?: 'cover' | 'contain' | 'fill';
}

export class StorageService {
  private static readonly DEFAULT_BUCKET = 'media';

  /**
   * Generates an optimized image URL using Supabase Storage transformation or CDN
   */
  static getImageUrl(path: string, options: ImageVariantOptions = {}): string {
    if (!path) return '';

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    const baseUrl = env.NEXT_PUBLIC_CDN_URL || `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${this.DEFAULT_BUCKET}`;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    const params = new URLSearchParams();
    if (options.width) params.set('width', options.width.toString());
    if (options.height) params.set('height', options.height.toString());
    if (options.quality) params.set('quality', (options.quality || 80).toString());
    if (options.format) params.set('format', options.format);
    if (options.fit) params.set('resize', options.fit);

    const queryString = params.toString();
    return queryString ? `${baseUrl}/${cleanPath}?${queryString}` : `${baseUrl}/${cleanPath}`;
  }

  /**
   * Returns responsive srcSet candidates for standard editorial viewports
   */
  static getResponsiveSrcSet(path: string, sizes: number[] = [640, 768, 1024, 1280, 1536]): string {
    return sizes
      .map(width => `${this.getImageUrl(path, { width, quality: 80, format: 'webp' })} ${width}w`)
      .join(', ');
  }
}

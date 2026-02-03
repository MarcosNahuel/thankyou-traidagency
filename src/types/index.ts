export interface Testimonial {
  id: string;
  image_url: string;
  order: number;
}

export interface ThankYouContent {
  id: string;
  vsl_embed: string; // HTML embed code
  pdf_url: string | null;
  pdf_filename: string | null;
  youtube_channel_url: string | null;
  youtube_video_embed: string | null; // HTML embed code
  testimonials: Testimonial[];
  created_at: string;
  updated_at: string;
}

export interface ContentUpdatePayload {
  vsl_embed?: string;
  pdf_url?: string | null;
  pdf_filename?: string | null;
  youtube_channel_url?: string | null;
  youtube_video_embed?: string | null;
  testimonials?: Testimonial[];
}

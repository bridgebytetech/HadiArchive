// ========================================
// API Response Types
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string>;
  timestamp: number;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// ========================================
// Content Types
// ========================================

export interface Video {
  id: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  videoType?: string;
  source?: string;
  sourceUrl?: string;
  date?: string;
  tags?: string[];
  viewCount?: number;
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Photo {
  id: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  imageType?: string;
  location?: string;
  photographer?: string;
  source?: string;
  date?: string;
  tags?: string[];
  albumId?: string;
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Audio {
  id: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  audioUrl: string;
  audioType?: string;
  duration?: string;
  source?: string;
  date?: string;
  tags?: string[];
  transcriptBn?: string;
  transcriptEn?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Speech {
  id: string;
  titleBn: string;
  titleEn?: string;
  contentBn: string;
  contentEn?: string;
  date?: string;
  occasion?: string;
  venue?: string;
  source?: string;
  tags?: string[];
  videoId?: string;
  audioId?: string;
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Writing {
  id: string;
  titleBn: string;
  titleEn?: string;
  contentBn: string;
  contentEn?: string;
  writingType?: string;
  date?: string;
  publishedIn?: string;
  source?: string;
  tags?: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Poem {
  id: string;
  titleBn: string;
  titleEn?: string;
  contentBn: string;
  contentEn?: string;
  date?: string;
  dedicatedTo?: string;
  source?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Quote {
  id: string;
  quoteBn: string;
  quoteEn?: string;
  contextBn?: string;
  contextEn?: string;
  date?: string;
  source?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface NewsPress {
  id: string;
  headlineBn: string;
  headlineEn?: string;
  summaryBn?: string;
  summaryEn?: string;
  fullContentBn?: string;
  fullContentEn?: string;
  mediaName?: string;
  mediaType?: string;
  journalist?: string;
  originalUrl?: string;
  screenshotUrl?: string;
  publishDate?: string;
  tags?: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface TimelineEvent {
  id: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  date: string;
  endDate?: string;
  eventType?: string;
  location?: string;
  imageUrls?: string[];
  importance?: string;
  displayOrder?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Location {
  id: string;
  nameBn: string;
  nameEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  address?: string;
  locationType?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl?: string;
  imageUrls?: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface SpecialEvent {
  id: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  eventType?: string;
  date: string;
  time?: string;
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  attendees?: string;
  leadBy?: string;
  source?: string;
  tags?: string[];
  photos?: EventPhoto[];
  videos?: EventVideo[];
  relatedEventIds?: string[];
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface EventPhoto {
  url: string;
  caption?: string;
  order?: number;
}

export interface EventVideo {
  url: string;
  title?: string;
  thumbnailUrl?: string;
  duration?: string;
}

export interface Tribute {
  id: string;
  authorName: string;
  authorEmail?: string;
  authorLocation?: string;
  authorPhoto?: string;
  authorRelation?: string;
  tributeType?: string;
  contentBn: string;
  contentEn?: string;
  mediaUrls?: string[];
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  featured?: boolean;
  published?: boolean;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  createdAt?: string;
}

export interface PublicRequest {
  id: string;
  requestType: string;
  contentType?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  reference?: string;
  attachmentUrls?: string[];
  status?: string;
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt?: string;
}

export interface SocialPost {
  id: string;
  platform: string;
  contentBn?: string;
  contentEn?: string;
  originalUrl?: string;
  screenshotUrl?: string;
  mediaUrls?: string[];
  postDate?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  tags?: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface DocDocument {
  id: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  documentType?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  date?: string;
  issuedBy?: string;
  source?: string;
  tags?: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

// ========================================
// Admin Types
// ========================================

export interface Admin {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
  permissions?: string[];
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalVideos: number;
  totalPhotos: number;
  totalAudios: number;
  totalSpeeches: number;
  totalWritings: number;
  totalPoems: number;
  totalQuotes: number;
  totalNews: number;
  totalDocuments: number;
  totalSocialPosts: number;
  totalTimelineEvents: number;
  totalLocations: number;
  totalSpecialEvents: number;
  totalTributes: number;
  totalContent: number;
  pendingTributes: number;
  pendingRequests: number;
}

export interface ImageUploadResponse {
  id: string;
  url: string;
  displayUrl: string;
  title?: string;
  width?: number;
  height?: number;
  size?: number;
  deleteUrl?: string;
  image?: ImageInfo;
  thumb?: ImageInfo;
  medium?: ImageInfo;
}

export interface ImageInfo {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

export interface QuickUploadResponse {
  imageUrl: string;
  thumbnailUrl: string;
  mediumUrl: string;
  deleteUrl: string;
}

// ========================================
// Auth Types
// ========================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  admin: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
  };
}

// ========================================
// Request Types (for forms)
// ========================================

export interface VideoRequest {
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  videoType?: string;
  source?: string;
  sourceUrl?: string;
  date?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}

export interface PhotoRequest {
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  imageType?: string;
  location?: string;
  photographer?: string;
  source?: string;
  date?: string;
  tags?: string[];
  albumId?: string;
  featured?: boolean;
  published?: boolean;
}

export interface TributeRequest {
  authorName: string;
  authorEmail?: string;
  authorLocation?: string;
  authorPhoto?: string;
  authorRelation?: string;
  tributeType?: string;
  contentBn: string;
  contentEn?: string;
  mediaUrls?: string[];
}



export interface PublicRequestForm {
  requestType: string;
  contentType?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  reference?: string;
  attachmentUrls?: string[];
}

// types/index.ts এর শেষে যোগ করুন
export interface TimelineItem {
  id: string;
  date: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn: string;
  descriptionEn?: string;
  locationBn?: string;
  locationEn?: string;
  imageUrls?: string[];
  type: string;
  published: boolean;
}

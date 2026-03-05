export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MicroCMSListContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface Region extends MicroCMSListContent {
  name: string;
  order?: number;
}

export interface Property extends MicroCMSListContent {
  title: string;
  type: 'sell' | 'rent';
  category: 'property' | 'land';
  label?: string;
  status: 'available' | 'sold';
  description?: string;
  mainImage: MicroCMSImage;
  images?: MicroCMSImage[];
  location?: string;
  nearestStation?: string;
  landArea?: number;
  buildingArea?: number;
  layout?: string;
  constructionDate?: string;
  schoolDistrict?: string;
  transactionType?: string;
  price?: number;
  rent?: number;
  remarks?: string;
  story?: Story;
  regions?: Region[];
}

export interface Story extends MicroCMSListContent {
  title: string;
  subtitle?: string;
  content: string;
  thumbnail: MicroCMSImage;
  images?: MicroCMSImage[];
  property?: Property;
  regions?: Region[];
  category?: 'daily' | 'regional' | 'property';
}

export interface CustomerVoice extends MicroCMSListContent {
  title: string;
  customerName: string;
  category?: 'inherited' | 'found' | 'other';
  location?: string;
  propertyType?: string;
  date?: string;
  content: string;
  image?: MicroCMSImage;
  order?: number;
}

export interface QA {
  fieldId: string;
  question: string;
  answer: string;
}

export interface StaffInterview extends MicroCMSListContent {
  staffName: string;
  position?: string;
  photo?: MicroCMSImage;
  questions: QA[];
  order?: number;
}

export interface Page extends MicroCMSListContent {
  slug: string;
  title: string;
  content: string;
}

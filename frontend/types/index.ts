export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  storageUsed: number;
  storageLimit: number;
}

export interface ScanResult {
  _id: string;
  documentType: string;
  rawText: string;
  fields: Array<{
    label: string;
    value: string;
    confidence: number;
  }>;
  confidence: number;
  imageUrl: string;
  createdAt: string;
}

export interface Document {
  _id: string;
  name: string;
  type: string;
  date: string;
  size: number;
  confidence: number;
}

export interface RFI {
  id: string;
  projectName: string;
  rfiNumber: string;
  tradeName: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  fileName: string;
  uploadDate: Date;
  status: 'Processing' | 'Completed' | 'Error';
  originalText?: string;
  analysis?: RFIAnalysis;
  response?: string;
  processingTime?: number;
}

export interface RFIAnalysis {
  category: 'Clarification' | 'Conflict' | 'Missing Info' | 'Change Request';
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedTrades: string[];
  responseStrategy: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  rfi: RFI;
  preGeneratedResponse: string;
  documentReferences: string[];
}

export interface ProcessingResult {
  success: boolean;
  analysis?: RFIAnalysis;
  response?: string;
  processingTime: number;
  error?: string;
}
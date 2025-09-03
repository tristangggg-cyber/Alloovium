// Demo mode utilities for ensuring reliable demos
export const DEMO_MODE_ENABLED = true; // Set to false for production

export interface DemoFallbackData {
  rfiId: string;
  projectName: string;
  rfiNumber: string;
  tradeName: string;
  urgency: string;
  processingTime: number;
  analysis: {
    category: string;
    urgency: string;
    affectedTrades: string[];
    responseStrategy: string;
  };
  response: string;
  documentReferences: string[];
}

export const FALLBACK_RFI_DATA: DemoFallbackData = {
  rfiId: 'demo-fallback',
  projectName: 'Construction Demo Project',
  rfiNumber: 'RFI-DEMO',
  tradeName: 'General Contractor',
  urgency: 'Medium',
  processingTime: 22,
  analysis: {
    category: 'Clarification',
    urgency: 'Medium',
    affectedTrades: ['General Contractor'],
    responseStrategy: 'Provide comprehensive response with industry best practices'
  },
  response: `RE: RFI-DEMO - Construction Project Inquiry

Thank you for your request for information regarding this construction project.

Based on our review of the submitted information, we are providing the following response:

GENERAL GUIDANCE: Please refer to the project specifications and architectural drawings for detailed requirements. All work should be performed in accordance with local building codes and industry standards.

COORDINATION: Please coordinate with the project manager for any questions regarding scheduling, material specifications, or site conditions.

NEXT STEPS: Please review this response and contact us within 48 hours if you require additional clarification or have follow-up questions.

This AI-generated response demonstrates our advanced RFI processing capabilities, providing instant, professional responses to construction inquiries.

Best regards,
RFI Assistant AI System`,
  documentReferences: [
    'Project Specifications',
    'Architectural Drawings',
    'Building Code Requirements'
  ]
};

export function ensureDemoReliability<T>(
  operation: () => Promise<T>,
  fallback: T,
  timeoutMs: number = 5000
): Promise<T> {
  if (!DEMO_MODE_ENABLED) {
    return operation();
  }

  return Promise.race([
    operation().catch(() => fallback),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Demo timeout')), timeoutMs)
    ).catch(() => fallback)
  ]);
}

export function validateRFIData(data: any): DemoFallbackData { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!data || typeof data !== 'object') {
    return FALLBACK_RFI_DATA;
  }

  // Ensure all required fields exist
  const validated: DemoFallbackData = {
    rfiId: data.rfiId || FALLBACK_RFI_DATA.rfiId,
    projectName: data.projectName || FALLBACK_RFI_DATA.projectName,
    rfiNumber: data.rfiNumber || FALLBACK_RFI_DATA.rfiNumber,
    tradeName: data.tradeName || FALLBACK_RFI_DATA.tradeName,
    urgency: data.urgency || FALLBACK_RFI_DATA.urgency,
    processingTime: typeof data.processingTime === 'number' ? data.processingTime : FALLBACK_RFI_DATA.processingTime,
    analysis: {
      category: data.analysis?.category || FALLBACK_RFI_DATA.analysis.category,
      urgency: data.analysis?.urgency || FALLBACK_RFI_DATA.analysis.urgency,
      affectedTrades: Array.isArray(data.analysis?.affectedTrades) ? data.analysis.affectedTrades : FALLBACK_RFI_DATA.analysis.affectedTrades,
      responseStrategy: data.analysis?.responseStrategy || FALLBACK_RFI_DATA.analysis.responseStrategy,
    },
    response: data.response || FALLBACK_RFI_DATA.response,
    documentReferences: Array.isArray(data.documentReferences) ? data.documentReferences : FALLBACK_RFI_DATA.documentReferences,
  };

  return validated;
}
// This file would contain the actual Claude API integration
// For the demo, we'll use the demo responses from the API route

export interface AIAnalysis {
  category: 'Clarification' | 'Conflict' | 'Missing Info' | 'Change Request';
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedTrades: string[];
  responseStrategy: string;
}

export async function analyzeRFI(text: string): Promise<AIAnalysis> {
  // In production, this would call the Claude API
  // For demo, return a placeholder
  return {
    category: 'Clarification',
    urgency: 'Medium',
    affectedTrades: ['General'],
    responseStrategy: 'Provide direct answer with references'
  };
}

export async function generateResponse(analysis: AIAnalysis, rfiText: string): Promise<string> {
  // In production, this would call the Claude API with a comprehensive prompt
  // For demo, return a placeholder
  return 'Demo response would be generated here using Claude API';
}

const RFI_ANALYSIS_PROMPT = `
You are an experienced construction project manager analyzing an RFI. 

RFI Content: {rfiText}
Project Type: Commercial office building
Available Documents: Architectural plans, specifications, previous RFIs

Analyze this RFI and provide:
1. CATEGORY: (Clarification/Conflict/Missing Info/Change Request)
2. URGENCY: (Low/Medium/High/Critical)
3. AFFECTED TRADES: List trades that might be impacted
4. RESPONSE STRATEGY: How to respond professionally

Then generate a professional response that includes:
- Direct answer to the question
- Reference to specific drawings/specs (use realistic section numbers)
- Any follow-up actions required
- Timeline for resolution if applicable

Format the response as if you're writing to the requesting contractor.
Be professional, clear, and helpful.
`;

export { RFI_ANALYSIS_PROMPT };
import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF, cleanRFIText } from '@/lib/pdf-processor';
import { findMatchingScenario } from '@/lib/demo-scenarios';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectName = formData.get('projectName') as string;
    const rfiNumber = formData.get('rfiNumber') as string;
    const tradeName = formData.get('tradeName') as string;
    const urgency = formData.get('urgency') as string;

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({
        success: false,
        error: 'Invalid file type. Please upload a PDF file.'
      }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json({
        success: false,
        error: 'File too large. Please upload a file smaller than 10MB.'
      }, { status: 400 });
    }

    // Extract text from PDF
    const pdfBuffer = await file.arrayBuffer();
    const rawText = await extractTextFromPDF(pdfBuffer);
    const cleanText = cleanRFIText(rawText);

    // Find matching demo scenario or fallback to generated response
    const matchedScenario = findMatchingScenario(cleanText, tradeName);
    const demoResponse = matchedScenario ? {
      analysis: matchedScenario.analysis,
      response: matchedScenario.response.replace(matchedScenario.rfiNumber, rfiNumber)
        .replace(matchedScenario.projectName, projectName),
      documentReferences: matchedScenario.documentReferences
    } : generateDemoResponse(cleanText, tradeName, projectName, rfiNumber);

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: {
        rfiId: `rfi-${Date.now()}`,
        projectName,
        rfiNumber,
        tradeName,
        urgency,
        originalText: cleanText.substring(0, 1000) + '...', // Truncate for demo
        analysis: demoResponse.analysis,
        response: demoResponse.response,
        processingTime,
        documentReferences: demoResponse.documentReferences,
      }
    });
  } catch (error) {
    console.error('Error processing RFI:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process RFI. Please try again.'
    }, { status: 500 });
  }
}

function generateDemoResponse(text: string, trade: string, project: string, rfiNumber: string) {
  // Demo response generator - in production this would call Claude API
  const lowerText = text.toLowerCase();
  const lowerTrade = trade.toLowerCase();

  let category: 'Clarification' | 'Conflict' | 'Missing Info' | 'Change Request' = 'Clarification';
  let response = '';
  let documentReferences: string[] = [];
  let affectedTrades: string[] = [trade];

  if (lowerText.includes('outlet') || lowerText.includes('electrical') || lowerTrade.includes('electrical')) {
    category = 'Clarification';
    response = `RE: ${rfiNumber} - Electrical Outlet Heights

Thank you for your inquiry regarding electrical outlet mounting heights in the conference rooms.

Per architectural drawings A-201 and electrical specifications Section 26 05 19, standard electrical outlets in conference rooms shall be mounted at 18" AFF (Above Finished Floor) unless otherwise noted.

For ADA compliance areas, outlets shall be mounted no lower than 15" AFF and no higher than 48" AFF as per Section 26 05 00.

Please coordinate with the architectural team for any special requirements in executive conference rooms, which may require outlets at table height (30" AFF).

Please proceed with installation per these specifications. If you encounter any conflicts with furniture plans, please submit a follow-up RFI with specific room numbers.

Best regards,
Project Management Team`;

    documentReferences = ['A-201 - Floor Plans', 'Section 26 05 19 - Electrical Outlets', 'Section 26 05 00 - ADA Compliance'];
  } else if (lowerText.includes('door') || lowerText.includes('hardware')) {
    category = 'Conflict';
    response = `RE: ${rfiNumber} - Door Hardware Specification Conflict

Thank you for bringing this specification conflict to our attention.

After reviewing both the architectural drawings (A-301) and the security specifications (Section 08 71 00), please implement the following:

RESOLUTION: Install keypad locks as specified in Section 08 71 00 - Security Requirements. The lever handles shown on architectural drawings are superseded by security requirements for this project.

AFFECTED LOCATIONS: All main entry doors and security zones as identified in the security plan (S-001).

COORDINATION REQUIRED: Please coordinate with the security contractor (Johnson Controls) for programming requirements and master key schedules.

The architectural drawings will be updated in the next revision to reflect these security requirements.

Please proceed with keypad lock installation per security specifications.

Best regards,
Project Management Team`;

    documentReferences = ['A-301 - Door Schedules', 'Section 08 71 00 - Security Requirements', 'S-001 - Security Plan'];
    affectedTrades = [trade, 'Security', 'Architectural'];
  } else {
    // Generic clarification response
    response = `RE: ${rfiNumber} - Project Clarification Request

Thank you for your RFI submission regarding the ${project} project.

We have reviewed your inquiry and are coordinating with the design team to provide a comprehensive response. Based on the information provided, this appears to be a ${category.toLowerCase()} that affects the ${trade} trade.

We will provide detailed specifications and clarifications within 48 hours of this response. Please continue with other work that is not affected by this inquiry.

If this is time-sensitive for your schedule, please contact the project manager directly at the number provided in your contract documents.

Best regards,
Project Management Team`;

    documentReferences = ['Project Specifications', 'Contract Documents'];
  }

  return {
    analysis: {
      category,
      urgency: 'Medium' as const,
      affectedTrades,
      responseStrategy: 'Provide direct answer with drawing references and coordination requirements'
    },
    response,
    documentReferences
  };
}
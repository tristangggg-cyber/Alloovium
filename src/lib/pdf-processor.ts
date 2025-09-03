import pdfParse from 'pdf-parse';

export async function extractTextFromPDF(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    const buffer = Buffer.from(pdfBuffer);
    const data = await pdfParse(buffer);
    
    // Clean up the extracted text
    const cleanText = data.text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .trim();
    
    return cleanText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export function cleanRFIText(text: string): string {
  // Remove common PDF artifacts and formatting issues
  return text
    .replace(/^\d+\s*$/gm, '') // Remove standalone page numbers
    .replace(/^.*?confidential.*$/gim, '') // Remove confidential headers/footers
    .replace(/^.*?proprietary.*$/gim, '') // Remove proprietary notices
    .replace(/\f/g, '') // Remove form feed characters
    .replace(/[\u00A0\u2000-\u200B\u2028-\u2029\u202F\u205F\u3000]/g, ' ') // Replace various unicode spaces
    .replace(/\s*\n\s*/g, '\n') // Clean up line breaks
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive line breaks
    .trim();
}
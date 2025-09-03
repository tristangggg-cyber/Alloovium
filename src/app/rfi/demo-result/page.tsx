'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Download, 
  Mail, 
  Clock, 
  CheckCircle, 
  FileText,
  ArrowLeft,
  Edit2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RFIResultPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState('');
  const [rfiData, setRfiData] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    // Try to get data from sessionStorage first
    const storedData = sessionStorage.getItem('rfiResult');
    if (storedData) {
      setRfiData(JSON.parse(storedData));
    } else {
      // Fallback to demo data
      setRfiData(demoFallbackData);
    }
  }, []);

  // Fallback demo data if no stored data is available
  const demoFallbackData = {
    rfiId: 'rfi-demo-001',
    projectName: 'Sunset Office Complex',
    rfiNumber: 'RFI-001',
    tradeName: 'Electrical',
    urgency: 'Medium' as const,
    processingTime: 24,
    analysis: {
      category: 'Clarification' as const,
      urgency: 'Medium' as const,
      affectedTrades: ['Electrical', 'Architectural'],
      responseStrategy: 'Provide direct answer with drawing references and coordination requirements'
    },
    response: `RE: RFI-001 - Electrical Outlet Heights

Thank you for your inquiry regarding electrical outlet mounting heights in the conference rooms.

Per architectural drawings A-201 and electrical specifications Section 26 05 19, standard electrical outlets in conference rooms shall be mounted at 18" AFF (Above Finished Floor) unless otherwise noted.

For ADA compliance areas, outlets shall be mounted no lower than 15" AFF and no higher than 48" AFF as per Section 26 05 00.

Please coordinate with the architectural team for any special requirements in executive conference rooms, which may require outlets at table height (30" AFF).

Please proceed with installation per these specifications. If you encounter any conflicts with furniture plans, please submit a follow-up RFI with specific room numbers.

Best regards,
Project Management Team`,
    documentReferences: [
      'A-201 - Floor Plans',
      'Section 26 05 19 - Electrical Outlets', 
      'Section 26 05 00 - ADA Compliance'
    ]
  };

  const handleEdit = () => {
    if (!rfiData) return;
    setEditedResponse(rfiData.response);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // In production, save the edited response
    setIsEditing(false);
  };

  const handleCopy = async () => {
    if (!rfiData) return;
    await navigator.clipboard.writeText(isEditing ? editedResponse : rfiData.response);
    // Show toast notification in production
  };

  const handleDownload = () => {
    if (!rfiData) return;
    const blob = new Blob([isEditing ? editedResponse : rfiData.response], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rfiData.rfiNumber}-Response.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmail = () => {
    if (!rfiData) return;
    const subject = `Response to ${rfiData.rfiNumber}`;
    const body = encodeURIComponent(isEditing ? editedResponse : rfiData.response);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (!rfiData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading RFI results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{rfiData.rfiNumber}</h1>
            <p className="text-muted-foreground">{rfiData.projectName}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{rfiData.processingTime || 24}s</span>
          </Badge>
          <Badge variant="default" className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>Completed</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Response */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Generated Response</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex items-center space-x-1"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              </div>
              <CardDescription>
                AI-generated response ready for review and distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editedResponse}
                    onChange={(e) => setEditedResponse(e.target.value)}
                    className="w-full h-96 p-4 border border-input bg-background rounded-md text-sm font-mono resize-none"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveEdit}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">
                      {rfiData.response}
                    </pre>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleCopy} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button onClick={handleDownload} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download as Text
                    </Button>
                    <Button onClick={handleEmail} variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send via Email
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* RFI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <div className="mt-1">
                  <Badge variant="secondary">{rfiData.analysis.category}</Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Urgency</label>
                <div className="mt-1">
                  <Badge 
                    variant={rfiData.analysis.urgency === 'High' ? 'destructive' : 'secondary'}
                  >
                    {rfiData.analysis.urgency}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Affected Trades</label>
                <div className="mt-2 flex flex-wrap gap-1">
                  {rfiData.analysis.affectedTrades.map((trade: string) => (
                    <Badge key={trade} variant="outline" className="text-xs">
                      {trade}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document References */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Referenced Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(rfiData.documentReferences || []).map((doc: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Project</label>
                <p className="text-sm">{rfiData.projectName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Trade</label>
                <p className="text-sm">{rfiData.tradeName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Processing Time</label>
                <p className="text-sm">{rfiData.processingTime || 24} seconds</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
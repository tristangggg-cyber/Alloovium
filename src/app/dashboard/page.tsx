'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, TrendingUp, Zap } from 'lucide-react';
import FileUploadZone from '@/components/upload/FileUploadZone';

export default function Dashboard() {
  const recentRFIs = [
    {
      id: '001',
      project: 'Sunset Office Complex',
      rfiNumber: 'RFI-001',
      trade: 'Electrical',
      status: 'Completed',
      urgency: 'Medium',
      timeAgo: '2 hours ago',
    },
    {
      id: '002', 
      project: 'Metro Hospital',
      rfiNumber: 'RFI-045',
      trade: 'HVAC',
      status: 'Processing',
      urgency: 'High',
      timeAgo: '1 day ago',
    },
    {
      id: '003',
      project: 'Downtown Retail',
      rfiNumber: 'RFI-023',
      trade: 'Plumbing',
      status: 'Completed',
      urgency: 'Low',
      timeAgo: '3 days ago',
    },
  ];

  const stats = [
    {
      label: 'RFIs Processed',
      value: '247',
      change: '+12%',
      icon: FileText,
      changeType: 'positive' as const,
    },
    {
      label: 'Avg Response Time',
      value: '24 sec',
      change: '-8 min',
      icon: Clock,
      changeType: 'positive' as const,
    },
    {
      label: 'Time Saved',
      value: '156 hrs',
      change: '+23%',
      icon: TrendingUp,
      changeType: 'positive' as const,
    },
    {
      label: 'Success Rate',
      value: '98.4%',
      change: '+2.1%',
      icon: Zap,
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">RFI Dashboard</h1>
        <p className="text-muted-foreground">
          Process construction RFIs instantly with AI-powered responses
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* File Upload Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload New RFI</CardTitle>
              <CardDescription>
                Drag and drop a PDF file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone />
            </CardContent>
          </Card>
        </div>

        {/* Recent RFIs */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent RFIs</CardTitle>
              <CardDescription>Latest processed requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentRFIs.map((rfi) => (
                <div key={rfi.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">{rfi.rfiNumber}</p>
                      <Badge
                        variant={rfi.urgency === 'High' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {rfi.urgency}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{rfi.project}</p>
                    <p className="text-xs text-muted-foreground">{rfi.trade} • {rfi.timeAgo}</p>
                  </div>
                  <Badge
                    variant={rfi.status === 'Completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {rfi.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
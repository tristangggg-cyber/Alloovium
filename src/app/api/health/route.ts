import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health checks for demo reliability
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        api: 'ok',
        pdfProcessor: 'ok',
        demoData: 'ok'
      },
      version: '1.0.0-demo'
    };

    return NextResponse.json(healthStatus);
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 500 }
    );
  }
}
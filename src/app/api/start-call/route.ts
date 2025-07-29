import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { workflowId } = await request.json();
    
    // Call Vapi API to start workflow
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY || 'eec3d55e-912b-4415-adfd-82abf31cc67c'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow: workflowId,
        type: 'webCall'
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to start call');
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error starting call:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to start call' },
      { status: 500 }
    );
  }
}
// Create a Vapi Assistant (not workflow)
const privateKey = 'eec3d55e-912b-4415-adfd-82abf31cc67c';

async function createAssistant() {
  try {
    const response = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${privateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Adams Performance Coach",
        firstMessage: "Hello! I'm your Adams Performance Coach. I'm here to help create a personalized fitness program just for you. Let's start by understanding your fitness goals, current activity level, and any specific needs you have. What brings you here today?",
        model: {
          provider: "openai",
          model: "gpt-4",
          temperature: 0.7,
          systemPrompt: "You are Adams Performance Coach, an expert fitness and performance coach. Your role is to conduct a friendly, conversational fitness consultation and create personalized workout plans. Ask about fitness goals, experience level, available time, equipment, and any limitations. Be encouraging, professional, and knowledgeable. After gathering information, create a comprehensive program with workout schedules, exercise recommendations, and nutrition guidelines."
        },
        voice: {
          provider: "11labs",
          voiceId: "21m00Tcm4TlvDq8ikWAM"
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US"
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error:', data);
      return;
    }

    console.log('✅ Assistant created successfully!');
    console.log('Assistant ID:', data.id);
    console.log('\nAdd this to your .env.local:');
    console.log(`NEXT_PUBLIC_VAPI_ASSISTANT_ID=${data.id}`);
    
  } catch (error) {
    console.error('Failed to create assistant:', error);
  }
}

createAssistant();
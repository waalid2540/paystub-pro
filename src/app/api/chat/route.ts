import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, step } = await request.json();

    const prompts = [
      `You are a helpful AI assistant helping someone create a paystub. The user just said: "${message}". 
       This is step ${step} of the paystub creation process. 
       Ask for their employer/company name next. Keep it friendly and professional. Be concise.`,
      
      `You are helping create a paystub. The user provided: "${message}" as their company name. 
       Now ask for their hourly rate or annual salary. Be professional and concise.`,
      
      `You are helping create a paystub. The user provided: "${message}" as their pay rate. 
       Now ask for the pay period dates (e.g., "March 1-15, 2024"). Be professional and concise.`,
      
      `You are helping create a paystub. The user provided: "${message}" as their pay period. 
       Now ask for the number of hours worked in this period. Be professional and concise.`,
      
      `You are helping create a paystub. The user provided: "${message}" as their hours worked. 
       Say something like "Perfect! I have all the information I need. Let me generate your professional paystub now!" 
       Be excited and professional.`
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant specializing in creating professional paystubs. You are friendly, professional, and efficient."
        },
        {
          role: "user",
          content: prompts[step - 1] || "Help the user complete their paystub creation process."
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "How can I help you with your paystub?";

    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback responses if OpenAI fails
    const fallbackResponses = [
      "Great! Now I need some information about your employer. What's the company name?",
      "Perfect! What's your hourly rate or annual salary?",
      "Excellent! What pay period should this paystub cover? (e.g., March 1-15, 2024)",
      "Almost done! How many hours did you work in this pay period?",
      "Perfect! I have everything I need. Let me generate your professional paystub now! 🎉"
    ];
    
    const step = await request.json().then(data => data.step).catch(() => 1);
    const response = fallbackResponses[step - 1] || "How can I help you with your paystub?";
    
    return NextResponse.json({ response });
  }
}
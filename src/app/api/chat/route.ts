import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, step } = await request.json();

    const prompts = [
      `You are a professional AI assistant helping create a paystub. The user just said: "${message}" (this is their name). 
       Now ask for their company name. Be professional and friendly. Ask: "Great to meet you! What's the name of the company you work for?"`,
      
      `You are helping create a paystub. The user provided: "${message}" as their company name. 
       Now ask if they are an employee or contractor. Ask: "Are you a W-2 employee or a 1099 contractor at ${message}?"`,
      
      `You are helping create a paystub. The user specified they are: "${message}". 
       Now ask how they are paid. Ask: "How are you paid - hourly or salary? And what's your rate/salary amount?"`,
      
      `You are helping create a paystub. The user provided: "${message}" as their pay information. 
       Now ask about pay frequency. Ask: "How often are you paid? (Weekly, Bi-weekly, Semi-monthly, or Monthly)"`,
      
      `You are helping create a paystub. The user provided: "${message}" as their pay frequency. 
       Now ask for the specific pay period. Ask: "What pay period should this paystub cover? Please provide the start and end dates (e.g., 'January 1-15, 2024')"`,
       
      `You are helping create a paystub. The user provided: "${message}" as their pay period. 
       Now ask for hours worked (if hourly) or confirm salary amount. Ask: "How many hours did you work during this pay period? (If salary, just say 'salary')"`,
       
      `You are helping create a paystub. The user provided: "${message}" for hours/salary confirmation. 
       Now ask for company address. Ask: "What's the company's address? (Street, City, State, ZIP)"`,
       
      `You are helping create a paystub. The user provided: "${message}" as the company address. 
       Now ask for their SSN (last 4 digits only). Ask: "What are the last 4 digits of your Social Security Number? (This is for the paystub display only - we keep all information secure)"`,
       
      `You are helping create a paystub. The user provided: "${message}" as their SSN digits. 
       Say: "Perfect! I have all the information needed to generate your professional paystub. This will include detailed earnings, deductions, taxes, and year-to-date calculations. Ready to generate your paystub?"`,
       
      `You are helping create a paystub. Say: "Excellent! Your professional paystub is being generated with all the details including earnings breakdown, tax deductions, and professional formatting. Click the Generate button below!"`
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
      "Great to meet you! What's the name of the company you work for?",
      "Are you a W-2 employee or a 1099 contractor at this company?",
      "How are you paid - hourly or salary? And what's your rate/salary amount?",
      "How often are you paid? (Weekly, Bi-weekly, Semi-monthly, or Monthly)",
      "What pay period should this paystub cover? Please provide the start and end dates (e.g., 'January 1-15, 2024')",
      "How many hours did you work during this pay period? (If salary, just say 'salary')",
      "What's the company's address? (Street, City, State, ZIP)",
      "What are the last 4 digits of your Social Security Number? (This is for the paystub display only - we keep all information secure)",
      "Perfect! I have all the information needed to generate your professional paystub. Ready to generate?",
      "Excellent! Click the Generate button below to create your professional paystub! 🎉"
    ];
    
    const step = await request.json().then(data => data.step).catch(() => 1);
    const response = fallbackResponses[step - 1] || "How can I help you with your paystub?";
    
    return NextResponse.json({ response });
  }
}
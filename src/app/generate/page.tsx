"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Bot, 
  ArrowLeft, 
  MessageSquare, 
  User,
  Building,
  DollarSign,
  Calendar,
  Download
} from "lucide-react";

export default function GeneratePage() {
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Hi! I'm your AI assistant. I'll help you create a professional paystub quickly. What's your full name?"
    }
  ]);

  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...messages, { type: "user", content: userInput }];
    setMessages(newMessages);
    const currentInput = userInput;
    setUserResponses(prev => [...prev, currentInput]);
    setUserInput("");
    setIsTyping(true);

    try {
      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          step: step
        }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        type: "ai",
        content: data.response
      }]);
      setStep(prev => prev + 1);
      
      // If we're at step 9 or higher, show generate button
      if (step >= 9) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: "ai",
            content: "🎉 Ready to generate your paystub! Click the button below to create your professional PDF."
          }]);
        }, 1000);
      }
      
    } catch (error) {
      console.error('Error:', error);
      // Fallback to original responses
      const responses = [
        "Great! Now I need some information about your employer. What's the company name?",
        "Perfect! What's your hourly rate or annual salary?",
        "Excellent! What pay period should this paystub cover? (e.g., March 1-15, 2024)",
        "Almost done! How many hours did you work in this pay period?",
        "Perfect! I have everything I need. Let me generate your professional paystub now."
      ];
      
      setMessages(prev => [...prev, {
        type: "ai",
        content: responses[step - 1] || "Let me generate your paystub now!"
      }]);
      setStep(prev => prev + 1);
    }
    
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeName: userResponses[0] || 'Employee',
          companyName: userResponses[1] || 'Company',
          payRate: userResponses[2] || '$15.00',
          payPeriod: userResponses[3] || 'Current Period',
          hoursWorked: userResponses[4] || '40',
          colorTheme: 'blue'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Create download link
        const byteCharacters = atob(data.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setMessages(prev => [...prev, {
          type: "ai",
          content: "🎉 Success! Your professional paystub has been generated and downloaded. Thank you for using PaystubPro!"
        }]);
      } else {
        throw new Error('PDF generation failed');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessages(prev => [...prev, {
        type: "ai",
        content: "❌ Sorry, there was an error generating your paystub. Please try again."
      }]);
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">PaystubPro</span>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              AI Assistant Active
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-blue-600" />
                  Generation Progress
                </CardTitle>
                <CardDescription>
                  Follow the AI assistant to complete your paystub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`flex items-center space-x-3 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Name & Company</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Building className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Employment Type</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${step >= 5 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 5 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Pay & Frequency</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${step >= 7 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 7 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Hours & Address</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${step >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 10 ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Download className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Generate & Download</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                  AI Paystub Assistant
                </CardTitle>
                <CardDescription>
                  Chat with our AI to generate your professional paystub
                </CardDescription>
              </CardHeader>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input */}
              <div className="border-t p-4">
                {step >= 10 ? (
                  <div className="text-center">
                    <Button 
                      onClick={handleGeneratePDF}
                      disabled={isGenerating}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Generate & Download PDF
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your response..."
                      className="flex-1 px-6 py-4 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-900 font-medium bg-white placeholder-gray-500"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!userInput.trim() || isTyping}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common paystub types to get you started faster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <User className="h-8 w-8 text-blue-600" />
                  <span className="font-medium">Self-Employed</span>
                  <span className="text-sm text-gray-500">For freelancers and contractors</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Building className="h-8 w-8 text-green-600" />
                  <span className="font-medium">Small Business</span>
                  <span className="text-sm text-gray-500">For business owners</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <span className="font-medium">Hourly Employee</span>
                  <span className="text-sm text-gray-500">For hourly workers</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
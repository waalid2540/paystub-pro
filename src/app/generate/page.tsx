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
  Download,
  Sparkles,
  Shield,
  CheckCircle2,
  Send,
  Palette
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
  const [selectedTheme, setSelectedTheme] = useState('corporate');

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
          colorTheme: selectedTheme,
          companyAddress: userResponses[6] || '',
          employeeSSN: userResponses[7] || '1234'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-all duration-200 group">
                <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </div>
                <span className="font-semibold">Back to Home</span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-black text-slate-900">PaystubPro</span>
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-3 py-1">
                  Enterprise AI
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-bold px-4 py-2 border border-green-200">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assistant Active
              </Badge>
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-0 shadow-2xl bg-white/70 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-white/20 rounded-lg mr-3">
                    <Bot className="h-6 w-6" />
                  </div>
                  Enterprise AI Process
                </CardTitle>
                <CardDescription className="text-blue-100 font-medium">
                  Professional-grade paystub generation workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${step >= 1 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${step >= 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-300 text-gray-500'}`}>
                      {step > 1 ? <CheckCircle2 className="h-6 w-6" /> : <User className="h-6 w-6" />}
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${step >= 1 ? 'text-blue-700' : 'text-gray-500'}`}>Personal Details</span>
                      <p className="text-sm text-gray-600 font-medium">Name & Company Info</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${step >= 3 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${step >= 3 ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-300 text-gray-500'}`}>
                      {step > 3 ? <CheckCircle2 className="h-6 w-6" /> : <Building className="h-6 w-6" />}
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${step >= 3 ? 'text-blue-700' : 'text-gray-500'}`}>Employment Status</span>
                      <p className="text-sm text-gray-600 font-medium">W-2 or 1099 Classification</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${step >= 5 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${step >= 5 ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-300 text-gray-500'}`}>
                      {step > 5 ? <CheckCircle2 className="h-6 w-6" /> : <DollarSign className="h-6 w-6" />}
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${step >= 5 ? 'text-blue-700' : 'text-gray-500'}`}>Compensation</span>
                      <p className="text-sm text-gray-600 font-medium">Salary & Pay Frequency</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${step >= 7 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${step >= 7 ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-300 text-gray-500'}`}>
                      {step > 7 ? <CheckCircle2 className="h-6 w-6" /> : <Calendar className="h-6 w-6" />}
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${step >= 7 ? 'text-blue-700' : 'text-gray-500'}`}>Time & Location</span>
                      <p className="text-sm text-gray-600 font-medium">Hours & Address Details</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${step >= 10 ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${step >= 10 ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg' : 'bg-gray-300 text-gray-500'}`}>
                      {step >= 10 ? <CheckCircle2 className="h-6 w-6" /> : <Download className="h-6 w-6" />}
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${step >= 10 ? 'text-emerald-700' : 'text-gray-500'}`}>Generation</span>
                      <p className="text-sm text-gray-600 font-medium">Professional PDF Export</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
              <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-2xl">
                  <div className="p-3 bg-white/20 rounded-xl mr-4">
                    <MessageSquare className="h-7 w-7" />
                  </div>
                  Enterprise AI Assistant
                  <Sparkles className="ml-3 h-6 w-6 text-yellow-300" />
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg font-medium">
                  Professional-grade conversational AI for enterprise paystub generation
                </CardDescription>
              </CardHeader>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-br from-slate-50/50 to-blue-50/30">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-6 py-4 shadow-lg ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border border-blue-500' 
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xl'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {message.type === 'ai' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-1 flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className={`text-base leading-relaxed ${message.type === 'user' ? 'font-medium' : 'font-normal'}`}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white text-slate-800 rounded-2xl px-6 py-4 shadow-xl border border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-slate-600 font-medium">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input */}
              <div className="border-t border-slate-200 p-8 bg-white">
                {step >= 10 ? (
                  <div className="space-y-8">
                    {/* Color Theme Selector */}
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
                      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center flex items-center justify-center">
                        <Palette className="mr-3 h-7 w-7 text-blue-600" />
                        🎨 Professional Color Themes
                      </h3>
                      <div className="grid grid-cols-5 gap-4">
                        {[
                          { id: 'corporate', name: 'Corporate Blue', color: 'bg-blue-600', accent: 'border-blue-500' },
                          { id: 'executive', name: 'Executive Gray', color: 'bg-gray-600', accent: 'border-gray-500' },
                          { id: 'modern', name: 'Modern Green', color: 'bg-green-600', accent: 'border-green-500' },
                          { id: 'classic', name: 'Classic Purple', color: 'bg-purple-600', accent: 'border-purple-500' },
                          { id: 'professional', name: 'Professional Pink', color: 'bg-pink-600', accent: 'border-pink-500' }
                        ].map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => setSelectedTheme(theme.id)}
                            className={`p-4 rounded-xl border-3 transition-all duration-300 transform hover:scale-105 ${
                              selectedTheme === theme.id
                                ? `${theme.accent} bg-white shadow-xl ring-4 ring-blue-200`
                                : 'border-slate-300 hover:border-slate-400 bg-white shadow-lg hover:shadow-xl'
                            }`}
                          >
                            <div className={`w-full h-12 ${theme.color} rounded-lg mb-3 shadow-lg`}></div>
                            <div className="text-sm font-bold text-slate-700">{theme.name}</div>
                            {selectedTheme === theme.id && (
                              <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto mt-2" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Generate Button */}
                    <div className="text-center">
                      <Button 
                        onClick={handleGeneratePDF}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-emerald-500"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            Generating Enterprise PDF...
                          </>
                        ) : (
                          <>
                            <Download className="mr-3 h-6 w-6" />
                            🚀 Generate Professional PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your professional response..."
                        className="w-full px-8 py-6 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg text-slate-900 font-medium bg-white placeholder-slate-500 shadow-lg transition-all duration-300"
                        disabled={isTyping}
                      />
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!userInput.trim() || isTyping}
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-6 rounded-2xl text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-t-xl">
              <CardTitle className="text-2xl font-bold flex items-center">
                <Sparkles className="mr-3 h-6 w-6 text-yellow-400" />
                Enterprise Quick Start Templates
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Professional paystub templates for common employment scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Button variant="outline" className="h-auto p-8 flex flex-col items-center space-y-4 border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <span className="font-bold text-xl text-blue-700">Self-Employed</span>
                  <span className="text-sm text-slate-600 font-medium text-center">For freelancers, consultants, and independent contractors</span>
                </Button>
                <Button variant="outline" className="h-auto p-8 flex flex-col items-center space-y-4 border-2 border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
                    <Building className="h-10 w-10 text-white" />
                  </div>
                  <span className="font-bold text-xl text-green-700">Small Business</span>
                  <span className="text-sm text-slate-600 font-medium text-center">For business owners and LLC members</span>
                </Button>
                <Button variant="outline" className="h-auto p-8 flex flex-col items-center space-y-4 border-2 border-purple-200 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl">
                    <DollarSign className="h-10 w-10 text-white" />
                  </div>
                  <span className="font-bold text-xl text-purple-700">Hourly Employee</span>
                  <span className="text-sm text-slate-600 font-medium text-center">For hourly workers and part-time employees</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
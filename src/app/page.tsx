import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Shield, 
  Check, 
  Bot,
  Palette,
  Clock
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">PaystubPro</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
              <Link href="#templates" className="text-gray-600 hover:text-blue-600">Templates</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/generate">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Generate Paystub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-white text-blue-600 text-lg px-6 py-2 font-bold shadow-lg">🤖 AI-Powered HR Suite</Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Professional Paystubs in 
            <span className="text-yellow-300 block"> 60 Seconds</span>
          </h1>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            🚀 Generate professional paystubs, contracts, and manage your workforce with our AI-powered platform. 
            Perfect for freelancers, small businesses, and self-employed individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/generate">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-6 text-xl font-black shadow-2xl transform hover:scale-105 transition-all">
                <Bot className="mr-3 h-6 w-6" />
                🚀 START WITH AI CHAT
              </Button>
            </Link>
            <Link href="/form">
              <Button size="lg" className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 px-12 py-6 text-xl font-black shadow-2xl transform hover:scale-105 transition-all">
                <Palette className="mr-3 h-6 w-6" />
                📋 PROFESSIONAL FORM
              </Button>
            </Link>
          </div>
          
          {/* Feature Choice Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Bot className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">🤖 AI Assistant</h3>
              <p className="text-blue-100 text-lg mb-6">
                Let our AI guide you through a conversational process. Just chat and answer questions naturally.
              </p>
              <ul className="text-blue-100 space-y-2">
                <li>✅ Natural conversation</li>
                <li>✅ Smart follow-up questions</li>
                <li>✅ Beginner-friendly</li>
                <li>✅ Fast and easy</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Palette className="h-12 w-12 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">📋 Professional Form</h3>
              <p className="text-blue-100 text-lg mb-6">
                Complete a comprehensive form with all professional fields. Perfect for detailed control.
              </p>
              <ul className="text-blue-100 space-y-2">
                <li>✅ Complete field control</li>
                <li>✅ Advanced options</li>
                <li>✅ Professional features</li>
                <li>✅ Multiple pay dates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">💪 EVERYTHING YOU NEED</h2>
            <p className="text-2xl text-gray-700 font-semibold">One platform for all your HR document needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-4 border-blue-500 hover:border-blue-700 transition-all bg-white shadow-xl hover:shadow-2xl transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <Bot className="h-16 w-16 text-blue-600 mb-6 mx-auto" />
                <CardTitle className="text-2xl font-black text-gray-900 mb-4">🤖 AI-POWERED GENERATION</CardTitle>
                <CardDescription className="text-lg text-gray-700 font-medium leading-relaxed">
                  Smart chatbot collects your information and generates professional documents instantly
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-4 border-green-500 hover:border-green-700 transition-all bg-white shadow-xl hover:shadow-2xl transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <Download className="h-16 w-16 text-green-600 mb-6 mx-auto" />
                <CardTitle className="text-2xl font-black text-gray-900 mb-4">⚡ ONE-CLICK DOWNLOAD</CardTitle>
                <CardDescription className="text-lg text-gray-700 font-medium leading-relaxed">
                  Download high-quality PDFs instantly. No complicated processes or waiting
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-4 border-purple-500 hover:border-purple-700 transition-all bg-white shadow-xl hover:shadow-2xl transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <Palette className="h-16 w-16 text-purple-600 mb-6 mx-auto" />
                <CardTitle className="text-2xl font-black text-gray-900 mb-4">🎨 PROFESSIONAL TEMPLATES</CardTitle>
                <CardDescription className="text-lg text-gray-700 font-medium leading-relaxed">
                  Choose from multiple color themes and designs that look professional and trustworthy
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-4 border-red-500 hover:border-red-700 transition-all bg-white shadow-xl hover:shadow-2xl transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <Shield className="h-16 w-16 text-red-600 mb-6 mx-auto" />
                <CardTitle className="text-2xl font-black text-gray-900 mb-4">🛡️ LEGAL COMPLIANCE</CardTitle>
                <CardDescription className="text-lg text-gray-700 font-medium leading-relaxed">
                  All templates meet legal requirements and include proper tax calculations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-4 border-orange-500 hover:border-orange-700 transition-all bg-white shadow-xl hover:shadow-2xl transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <Clock className="h-16 w-16 text-orange-600 mb-6 mx-auto" />
                <CardTitle className="text-2xl font-black text-gray-900 mb-4">⏰ TIME TRACKING</CardTitle>
                <CardDescription className="text-lg text-gray-700 font-medium leading-relaxed">
                  Track hours, manage schedules, and automate payroll calculations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-4 border-indigo-500 hover:border-indigo-700 transition-all bg-white shadow-xl hover:shadow-2xl transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <FileText className="h-16 w-16 text-indigo-600 mb-6 mx-auto" />
                <CardTitle className="text-2xl font-black text-gray-900 mb-4">📄 CONTRACT GENERATOR</CardTitle>
                <CardDescription className="text-lg text-gray-700 font-medium leading-relaxed">
                  Create employment contracts, NDAs, and freelance agreements with AI assistance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black text-white mb-6">💰 SIMPLE, TRANSPARENT PRICING</h2>
            <p className="text-2xl text-gray-300 font-semibold">Choose the plan that works for you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-4 border-blue-500 bg-white shadow-2xl transform hover:scale-105 transition-all">
              <CardHeader className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-black mb-4">💎 ONE-TIME</CardTitle>
                <div className="text-6xl font-black mt-4 mb-2">
                  $5.99
                  <span className="text-2xl font-normal">/paystub</span>
                </div>
                <CardDescription className="mt-2 text-blue-100 text-xl font-semibold">Perfect for occasional use</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">1 Professional Paystub</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">AI-Powered Generation</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">Multiple Color Themes</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">Instant PDF Download</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 text-xl font-black shadow-xl">
                  🚀 GET STARTED
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl transform hover:scale-105 transition-all relative">
              <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 text-lg font-black shadow-xl animate-pulse">
                🔥 MOST POPULAR
              </Badge>
              <CardHeader className="text-center p-8 text-white">
                <CardTitle className="text-3xl font-black mb-4">⭐ UNLIMITED</CardTitle>
                <div className="text-6xl font-black mt-4 mb-2">
                  $7.99
                  <span className="text-2xl font-normal">/month</span>
                </div>
                <CardDescription className="mt-2 text-yellow-100 text-xl font-semibold">For businesses and frequent users</CardDescription>
              </CardHeader>
              <CardContent className="p-8 bg-white rounded-b-lg">
                <ul className="space-y-4">
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">UNLIMITED Paystubs</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">AI Contract Generator</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">Time Tracking & Scheduling</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">Priority Support</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <Check className="h-6 w-6 text-green-500 mr-3 font-bold" />
                    <span className="font-semibold">Team Management</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 text-xl font-black shadow-xl">
                  🚀 START FREE TRIAL
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6" />
                <span className="text-xl font-bold">PaystubPro</span>
              </div>
              <p className="text-gray-400">
                Professional HR documents powered by AI. Fast, secure, and legally compliant.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/generate" className="hover:text-white">Generate Paystub</Link></li>
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PaystubPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
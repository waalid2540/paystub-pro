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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800">AI-Powered HR Suite</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional Paystubs in 
            <span className="text-blue-600"> 60 Seconds</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional paystubs, contracts, and manage your workforce with our AI-powered platform. 
            Perfect for freelancers, small businesses, and self-employed individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Bot className="mr-2 h-5 w-5" />
                Start with AI Chat
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="px-8 py-3">
                <Palette className="mr-2 h-5 w-5" />
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">One platform for all your HR document needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Bot className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI-Powered Generation</CardTitle>
                <CardDescription>
                  Smart chatbot collects your information and generates professional documents instantly
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Download className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>One-Click Download</CardTitle>
                <CardDescription>
                  Download high-quality PDFs instantly. No complicated processes or waiting
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Palette className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Professional Templates</CardTitle>
                <CardDescription>
                  Choose from multiple color themes and designs that look professional and trustworthy
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Legal Compliance</CardTitle>
                <CardDescription>
                  All templates meet legal requirements and include proper tax calculations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Clock className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Time Tracking</CardTitle>
                <CardDescription>
                  Track hours, manage schedules, and automate payroll calculations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <FileText className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Contract Generator</CardTitle>
                <CardDescription>
                  Create employment contracts, NDAs, and freelance agreements with AI assistance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works for you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">One-Time</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $5.99
                  <span className="text-lg font-normal text-gray-600">/paystub</span>
                </div>
                <CardDescription className="mt-2">Perfect for occasional use</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>1 Professional Paystub</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>AI-Powered Generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Multiple Color Themes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Instant PDF Download</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gray-900 hover:bg-gray-800">
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-500 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Unlimited</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $7.99
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">For businesses and frequent users</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited Paystubs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>AI Contract Generator</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Time Tracking & Scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Team Management</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
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
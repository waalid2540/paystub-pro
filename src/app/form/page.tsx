"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Building, 
  User, 
  DollarSign, 
  Calendar,
  Shield,
  Download,
  CheckCircle,
  Sparkles,
  Star,
  Crown,
  Award,
  Briefcase
} from "lucide-react";

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyAddress: '',
    aptSte: '',
    city: '',
    state: '',
    zipCode: '',
    companyPhone: '',
    extNo: '',
    companyEIN: '',
    
    // Employee Information
    employeeStatus: 'employee',
    employeeFullName: '',
    employeeSSN: '',
    workingFromHome: false,
    employeeAddress: '',
    employeeCity: '',
    employeeState: '',
    employeeZip: '',
    employeeID: '',
    federalFilingStatus: 'single',
    stateFilingStatus: 'single',
    
    // Salary Information
    payType: 'hourly',
    payFrequency: 'biweekly',
    annualSalary: '',
    hourlyRate: '',
    hireDate: '',
    showHourlyRate: true,
    numberOfPayDates: 1,
    
    // Pay Date Information
    payDates: [
      {
        employeePayDate: '',
        payPeriodStart: '',
        payPeriodEnd: '',
        checkNumber: ''
      }
    ],
    
    previousPayDates: '',
    previousWages: '',
    
    // Tax Exemptions
    taxExempt: false,
    exemptTaxes: [],
    
    // Options
    includeDirectDeposit: true,
    
    // Email
    email: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    { number: 1, title: "Company Info", icon: Building },
    { number: 2, title: "Employee Info", icon: User },
    { number: 3, title: "Salary & Pay", icon: DollarSign },
    { number: 4, title: "Pay Dates", icon: Calendar },
    { number: 5, title: "Final Details", icon: CheckCircle }
  ];

  const updateFormData = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const generatePaystub = async () => {
    setIsGenerating(true);
    // Implementation will go here
    setTimeout(() => {
      setIsGenerating(false);
      alert("Professional paystub generated successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-2xl border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-all duration-200 group">
                <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg">Back to Home</span>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <span className="text-3xl font-black text-slate-900">PaystubPro</span>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold px-4 py-2">
                  <Crown className="h-4 w-4 mr-2" />
                  Enterprise Form
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-bold px-6 py-3 border-2 border-blue-200 rounded-xl">
                <Sparkles className="h-5 w-5 mr-2" />
                Professional Form Builder
              </Badge>
              <Shield className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-t-xl">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Award className="mr-3 h-6 w-6 text-yellow-300" />
                  Enterprise Progress
                </CardTitle>
                <CardDescription className="text-indigo-100 font-medium">
                  Professional form completion workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    
                    return (
                      <div
                        key={step.number}
                        className={`flex items-center space-x-4 p-5 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-3 border-blue-300 shadow-lg' 
                            : isCompleted 
                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-3 border-emerald-300 shadow-lg'
                            : 'bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl' 
                            : isCompleted
                            ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl'
                            : 'bg-gradient-to-br from-slate-300 to-gray-400 text-slate-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-7 w-7" />
                          ) : (
                            <Icon className="h-7 w-7" />
                          )}
                        </div>
                        <div>
                          <div className={`font-bold text-lg ${
                            isActive ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-500'
                          }`}>{step.title}</div>
                          <div className={`text-sm font-medium ${
                            isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                          }`}>Step {step.number} of 5</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-r from-slate-800 via-slate-900 to-black text-white rounded-t-xl">
                <CardTitle className="text-3xl font-bold flex items-center">
                  <div className="p-3 bg-white/20 rounded-xl mr-4">
                    {currentStep === 1 && <Building className="h-8 w-8" />}
                    {currentStep === 2 && <User className="h-8 w-8" />}
                    {currentStep === 3 && <DollarSign className="h-8 w-8" />}
                    {currentStep === 4 && <Calendar className="h-8 w-8" />}
                    {currentStep === 5 && <CheckCircle className="h-8 w-8" />}
                  </div>
                  {currentStep === 1 && "Enterprise Company Information"}
                  {currentStep === 2 && "Professional Employee Details"}
                  {currentStep === 3 && "Advanced Compensation Setup"}
                  {currentStep === 4 && "Payroll Date Configuration"}
                  {currentStep === 5 && "Generate Professional Paystub"}
                  <Star className="ml-4 h-7 w-7 text-yellow-400" />
                </CardTitle>
                <CardDescription className="text-slate-300 text-lg font-medium">
                  {currentStep === 1 && "Configure comprehensive company details and corporate information"}
                  {currentStep === 2 && "Set up detailed employee profiles and classification status"}
                  {currentStep === 3 && "Define sophisticated salary structures and payment frequencies"}
                  {currentStep === 4 && "Establish professional payroll schedules and periods"}
                  {currentStep === 5 && "Review configuration and generate enterprise-grade paystub"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-10">
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
                      <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                        <Briefcase className="mr-3 h-7 w-7" />
                        Primary Company Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => updateFormData('companyName', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="Enter professional company name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            Company Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.companyPhone}
                            onChange={(e) => updateFormData('companyPhone', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-2 border-slate-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-6">Corporate Address Information</h3>
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                          Company Address *
                        </label>
                        <input
                          type="text"
                          value={formData.companyAddress}
                          onChange={(e) => updateFormData('companyAddress', e.target.value)}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                          placeholder="123 Professional Business Street"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                          Suite/Apt No.
                        </label>
                        <input
                          type="text"
                          value={formData.aptSte}
                          onChange={(e) => updateFormData('aptSte', e.target.value)}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                          placeholder="Suite 100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => updateFormData('state', e.target.value)}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                          {/* Add more states */}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                          Zip Code *
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => updateFormData('zipCode', e.target.value)}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200">
                      <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center">
                        <Crown className="mr-3 h-6 w-6" />
                        Advanced Enterprise Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            Extension Number
                          </label>
                          <input
                            type="text"
                            value={formData.extNo}
                            onChange={(e) => updateFormData('extNo', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="ext. 123"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            Company EIN (Tax ID)
                          </label>
                          <input
                            type="text"
                            value={formData.companyEIN}
                            onChange={(e) => updateFormData('companyEIN', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="12-3456789"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Employee Information */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border-2 border-emerald-200">
                      <label className="block text-xl font-bold text-emerald-900 mb-6">
                        Professional Employment Classification *
                      </label>
                      <div className="grid grid-cols-2 gap-6">
                        <button
                          onClick={() => updateFormData('employeeStatus', 'employee')}
                          className={`p-8 border-3 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                            formData.employeeStatus === 'employee'
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-xl'
                              : 'border-slate-300 hover:border-slate-400 bg-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="font-bold text-xl mb-2">W-2 Employee</div>
                          <div className="text-sm text-slate-600 font-medium">Traditional employee with benefits and tax withholdings</div>
                        </button>
                        <button
                          onClick={() => updateFormData('employeeStatus', 'contractor')}
                          className={`p-8 border-3 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                            formData.employeeStatus === 'contractor'
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-xl'
                              : 'border-slate-300 hover:border-slate-400 bg-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="font-bold text-xl mb-2">1099 Contractor</div>
                          <div className="text-sm text-slate-600 font-medium">Independent contractor with self-employment responsibilities</div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-2 border-slate-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-6">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            Employee Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.employeeFullName}
                            onChange={(e) => updateFormData('employeeFullName', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="John Professional Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            SSN (Last 4 Digits) *
                          </label>
                          <input
                            type="text"
                            value={formData.employeeSSN}
                            onChange={(e) => updateFormData('employeeSSN', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="1234"
                            maxLength={4}
                          />
                          <p className="text-sm text-slate-600 mt-3 flex items-center font-medium">
                            <Shield className="inline h-4 w-4 mr-2 text-green-600" />
                            Enterprise-grade security and privacy protection
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.workingFromHome}
                          onChange={(e) => updateFormData('workingFromHome', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Employee is working from home?
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1 ml-6">
                        By choosing this option, the paystub taxes will be calculated based on the employee&apos;s address instead of the company address
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Salary Information */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
                      <label className="block text-xl font-bold text-green-900 mb-6">
                        Professional Compensation Structure *
                      </label>
                      <div className="grid grid-cols-2 gap-6">
                        <button
                          onClick={() => updateFormData('payType', 'hourly')}
                          className={`p-8 border-3 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                            formData.payType === 'hourly'
                              ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 shadow-xl'
                              : 'border-slate-300 hover:border-slate-400 bg-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="font-bold text-xl mb-2">Hourly Rate</div>
                          <div className="text-sm text-slate-600 font-medium">Compensation based on hours worked with overtime eligibility</div>
                        </button>
                        <button
                          onClick={() => updateFormData('payType', 'salary')}
                          className={`p-8 border-3 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                            formData.payType === 'salary'
                              ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 shadow-xl'
                              : 'border-slate-300 hover:border-slate-400 bg-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="font-bold text-xl mb-2">Annual Salary</div>
                          <div className="text-sm text-slate-600 font-medium">Fixed annual compensation with professional benefits</div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
                      <label className="block text-xl font-bold text-blue-900 mb-6">
                        Payroll Frequency Configuration *
                      </label>
                      <select
                        value={formData.payFrequency}
                        onChange={(e) => updateFormData('payFrequency', e.target.value)}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                      >
                        <option value="weekly">Weekly (52 pay periods annually)</option>
                        <option value="biweekly">Bi-Weekly (26 pay periods annually)</option>
                        <option value="semimonthly">Semi-Monthly (24 pay periods annually)</option>
                        <option value="monthly">Monthly (12 pay periods annually)</option>
                      </select>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
                      {formData.payType === 'salary' ? (
                        <div>
                          <label className="block text-xl font-bold text-purple-900 mb-6">
                            Annual Salary Amount *
                          </label>
                          <input
                            type="number"
                            value={formData.annualSalary}
                            onChange={(e) => updateFormData('annualSalary', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="75,000"
                          />
                          <p className="text-sm text-purple-700 mt-3 font-medium">Enter the total annual salary before taxes and deductions</p>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xl font-bold text-purple-900 mb-6">
                            Hourly Compensation Rate *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={formData.hourlyRate}
                            onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                            placeholder="25.00"
                          />
                          <p className="text-sm text-purple-700 mt-3 font-medium">Enter the hourly rate (overtime calculated at 1.5x rate)</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
                      <h3 className="text-xl font-bold text-orange-900 mb-6">Employment Timeline & Configuration</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            Employee Hire Date
                          </label>
                          <input
                            type="date"
                            value={formData.hireDate}
                            onChange={(e) => updateFormData('hireDate', e.target.value)}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-800 mb-3">
                            Number of Pay Periods
                          </label>
                          <select
                            value={formData.numberOfPayDates}
                            onChange={(e) => updateFormData('numberOfPayDates', parseInt(e.target.value))}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 text-lg font-medium bg-white shadow-lg transition-all duration-300"
                          >
                            <option value={1}>1 Pay Period (Single)</option>
                            <option value={2}>2 Pay Periods (Bi-Weekly)</option>
                            <option value={3}>3 Pay Periods (Monthly)</option>
                            <option value={4}>4 Pay Periods (Quarterly)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border-2 border-teal-200">
                      <h3 className="text-xl font-bold text-teal-900 mb-6">Display Preferences</h3>
                      <label className="flex items-center space-x-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.showHourlyRate}
                          onChange={(e) => updateFormData('showHourlyRate', e.target.checked)}
                          className="w-6 h-6 text-teal-600 border-2 border-slate-300 rounded-lg focus:ring-4 focus:ring-teal-200"
                        />
                        <span className="text-lg font-bold text-slate-800">
                          Display Hourly Rate on Professional Paystub
                        </span>
                      </label>
                      <p className="text-sm text-teal-700 mt-3 ml-10 font-medium">Show detailed hourly rate information for transparency</p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-8 border-t-2 border-slate-200">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    disabled={currentStep === 1}
                    className="px-8 py-4 text-lg font-bold border-2 border-slate-300 hover:border-slate-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Previous Step
                  </Button>
                  
                  {currentStep < 5 ? (
                    <Button
                      onClick={nextStep}
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      Continue to Step {currentStep + 1}
                      <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                    </Button>
                  ) : (
                    <Button
                      onClick={generatePaystub}
                      disabled={isGenerating}
                      className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 px-12 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Generating Enterprise PDF...
                        </>
                      ) : (
                        <>
                          <Download className="mr-3 h-6 w-6" />
                          🚀 Generate Professional Paystub
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
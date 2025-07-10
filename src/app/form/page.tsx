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
  CheckCircle
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">PaystubPro</span>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              Professional Form Builder
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
                <CardDescription>Complete all steps to generate your paystub</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    
                    return (
                      <div
                        key={step.number}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                            : isCompleted 
                            ? 'bg-green-50 text-green-700 border-2 border-green-200'
                            : 'bg-gray-50 text-gray-500'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive 
                            ? 'bg-blue-600 text-white' 
                            : isCompleted
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{step.title}</div>
                          <div className="text-sm opacity-75">Step {step.number}</div>
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
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {currentStep === 1 && "Company Information"}
                  {currentStep === 2 && "Employee Information"}
                  {currentStep === 3 && "Salary Information"}
                  {currentStep === 4 && "Pay Date Information"}
                  {currentStep === 5 && "Final Details & Generate"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Enter your company details and contact information"}
                  {currentStep === 2 && "Provide employee details and status information"}
                  {currentStep === 3 && "Configure salary, pay type, and frequency"}
                  {currentStep === 4 && "Set up pay dates and pay periods"}
                  {currentStep === 5 && "Review and generate your professional paystub"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.companyPhone}
                          onChange={(e) => updateFormData('companyPhone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Address *
                      </label>
                      <input
                        type="text"
                        value={formData.companyAddress}
                        onChange={(e) => updateFormData('companyAddress', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apt/Ste No.
                        </label>
                        <input
                          type="text"
                          value={formData.aptSte}
                          onChange={(e) => updateFormData('aptSte', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Suite 100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => updateFormData('state', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zip Code *
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => updateFormData('zipCode', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Advanced Company Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Extension Number
                          </label>
                          <input
                            type="text"
                            value={formData.extNo}
                            onChange={(e) => updateFormData('extNo', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ext. 123"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company EIN
                          </label>
                          <input
                            type="text"
                            value={formData.companyEIN}
                            onChange={(e) => updateFormData('companyEIN', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="12-3456789"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Employee Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What is this employee&apos;s status? *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => updateFormData('employeeStatus', 'employee')}
                          className={`p-4 border-2 rounded-lg text-left transition-colors ${
                            formData.employeeStatus === 'employee'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium">Employee</div>
                          <div className="text-sm text-gray-600">W-2 Employee</div>
                        </button>
                        <button
                          onClick={() => updateFormData('employeeStatus', 'contractor')}
                          className={`p-4 border-2 rounded-lg text-left transition-colors ${
                            formData.employeeStatus === 'contractor'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium">Contractor</div>
                          <div className="text-sm text-gray-600">1099 Contractor</div>
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Employee Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.employeeFullName}
                          onChange={(e) => updateFormData('employeeFullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Employee SSN (Last 4 Digits) *
                        </label>
                        <input
                          type="text"
                          value={formData.employeeSSN}
                          onChange={(e) => updateFormData('employeeSSN', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1234"
                          maxLength={4}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          <Shield className="inline h-3 w-3 mr-1" />
                          All personal information is kept private and secure
                        </p>
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
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How is this employee paid? *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => updateFormData('payType', 'hourly')}
                          className={`p-4 border-2 rounded-lg text-left transition-colors ${
                            formData.payType === 'hourly'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium">Hourly</div>
                          <div className="text-sm text-gray-600">Paid by the hour</div>
                        </button>
                        <button
                          onClick={() => updateFormData('payType', 'salary')}
                          className={`p-4 border-2 rounded-lg text-left transition-colors ${
                            formData.payType === 'salary'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium">Salary</div>
                          <div className="text-sm text-gray-600">Fixed annual salary</div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How Often Is This Employee Paid? *
                      </label>
                      <select
                        value={formData.payFrequency}
                        onChange={(e) => updateFormData('payFrequency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-Weekly</option>
                        <option value="semimonthly">Semi-Monthly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    {formData.payType === 'salary' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Annual Salary *
                        </label>
                        <input
                          type="number"
                          value={formData.annualSalary}
                          onChange={(e) => updateFormData('annualSalary', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="50000"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hourly Rate *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.hourlyRate}
                          onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="15.00"
                        />
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Employee Hire Date
                        </label>
                        <input
                          type="date"
                          value={formData.hireDate}
                          onChange={(e) => updateFormData('hireDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Pay Dates Needed
                        </label>
                        <select
                          value={formData.numberOfPayDates}
                          onChange={(e) => updateFormData('numberOfPayDates', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={1}>1 Pay Date</option>
                          <option value={2}>2 Pay Dates</option>
                          <option value={3}>3 Pay Dates</option>
                          <option value={4}>4 Pay Dates</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.showHourlyRate}
                          onChange={(e) => updateFormData('showHourlyRate', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Show Hourly Rate On Pay Stub
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    disabled={currentStep === 1}
                    className="px-6"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 5 ? (
                    <Button
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 px-6"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      onClick={generatePaystub}
                      disabled={isGenerating}
                      className="bg-green-600 hover:bg-green-700 px-8"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Generate Paystub
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
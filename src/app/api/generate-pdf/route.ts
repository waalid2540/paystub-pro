import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

interface PaystubData {
  employeeName: string;
  companyName: string;
  payRate: string;
  payPeriod: string;
  hoursWorked: string;
  colorTheme?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PaystubData = await request.json();
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Set color theme
    const colors = {
      blue: { primary: [26, 75, 153], secondary: [240, 248, 255], accent: [59, 130, 246] },
      green: { primary: [22, 101, 52], secondary: [240, 253, 244], accent: [34, 197, 94] },
      purple: { primary: [88, 28, 135], secondary: [250, 245, 255], accent: [168, 85, 247] },
      red: { primary: [153, 27, 27], secondary: [254, 242, 242], accent: [239, 68, 68] },
      gray: { primary: [55, 65, 81], secondary: [249, 250, 251], accent: [107, 114, 128] }
    };
    
    const theme = colors[data.colorTheme as keyof typeof colors] || colors.blue;
    
    // Professional Header with Company Branding
    doc.setFillColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.rect(0, 0, 210, 35, 'F');
    
    // Company Logo Area (Left)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(data.companyName, 15, 25);
    
    // Paystub Title (Right)
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('EMPLOYEE PAYSTUB', 210 - 15, 15, { align: 'right' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Pay Date: ${new Date().toLocaleDateString()}`, 210 - 15, 25, { align: 'right' });
    
    // Employee and Company Information Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    
    // Left Column - Employee Info
    doc.text('EMPLOYEE INFORMATION', 15, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Name: ${data.employeeName}`, 15, 60);
    doc.text(`Employee ID: EMP-${Math.floor(Math.random() * 10000)}`, 15, 68);
    doc.text(`SSN: XXX-XX-1234`, 15, 76);
    doc.text(`Address: 123 Main St, City, State 12345`, 15, 84);
    
    // Right Column - Pay Period Info  
    doc.setFont('helvetica', 'bold');
    doc.text('PAY PERIOD INFORMATION', 110, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`Pay Period: ${data.payPeriod}`, 110, 60);
    doc.text(`Pay Date: ${new Date().toLocaleDateString()}`, 110, 68);
    doc.text(`Pay Frequency: Bi-Weekly`, 110, 76);
    doc.text(`Check #: ${Math.floor(Math.random() * 100000)}`, 110, 84);
    
    // Professional Table Header for Earnings
    const startY = 100;
    doc.setFillColor(theme.secondary[0], theme.secondary[1], theme.secondary[2]);
    doc.rect(15, startY, 180, 12, 'F');
    doc.setDrawColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.setLineWidth(0.5);
    doc.rect(15, startY, 180, 12);
    
    doc.setTextColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('EARNINGS', 18, startY + 8);
    
    // Earnings Table Headers
    const earningsHeaderY = startY + 20;
    doc.setFillColor(248, 249, 250);
    doc.rect(15, earningsHeaderY, 180, 10, 'F');
    doc.rect(15, earningsHeaderY, 180, 10);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DESCRIPTION', 18, earningsHeaderY + 7);
    doc.text('HOURS', 80, earningsHeaderY + 7);
    doc.text('RATE', 115, earningsHeaderY + 7);
    doc.text('CURRENT', 145, earningsHeaderY + 7);
    doc.text('YTD', 175, earningsHeaderY + 7);
    
    // Calculate detailed earnings
    const hours = parseFloat(data.hoursWorked) || 40;
    const hourlyRate = parseFloat(data.payRate.replace(/[^0-9.]/g, '')) || 15;
    const regularHours = Math.min(hours, 40);
    const overtimeHours = Math.max(0, hours - 40);
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * 1.5;
    const grossPay = regularPay + overtimePay;
    const ytdGross = grossPay * 26; // Assuming 26 pay periods
    
    // Earnings Rows
    let currentY = earningsHeaderY + 12;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    // Regular Pay Row
    doc.rect(15, currentY, 180, 8);
    doc.text('Regular Pay', 18, currentY + 6);
    doc.text(regularHours.toString(), 80, currentY + 6);
    doc.text(`$${hourlyRate.toFixed(2)}`, 115, currentY + 6);
    doc.text(`$${regularPay.toFixed(2)}`, 145, currentY + 6);
    doc.text(`$${(regularPay * 26).toFixed(2)}`, 175, currentY + 6);
    
    currentY += 8;
    if (overtimeHours > 0) {
      doc.rect(15, currentY, 180, 8);
      doc.text('Overtime Pay', 18, currentY + 6);
      doc.text(overtimeHours.toString(), 80, currentY + 6);
      doc.text(`$${(hourlyRate * 1.5).toFixed(2)}`, 115, currentY + 6);
      doc.text(`$${overtimePay.toFixed(2)}`, 145, currentY + 6);
      doc.text(`$${(overtimePay * 26).toFixed(2)}`, 175, currentY + 6);
      currentY += 8;
    }
    
    // Gross Total Row
    doc.setFillColor(theme.secondary[0], theme.secondary[1], theme.secondary[2]);
    doc.rect(15, currentY, 180, 10, 'F');
    doc.rect(15, currentY, 180, 10);
    doc.setFont('helvetica', 'bold');
    doc.text('GROSS EARNINGS', 18, currentY + 7);
    doc.text(`$${grossPay.toFixed(2)}`, 145, currentY + 7);
    doc.text(`$${ytdGross.toFixed(2)}`, 175, currentY + 7);
    
    // Deductions Section
    currentY += 20;
    doc.setFillColor(theme.secondary[0], theme.secondary[1], theme.secondary[2]);
    doc.rect(15, currentY, 180, 12, 'F');
    doc.rect(15, currentY, 180, 12);
    
    doc.setTextColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.setFontSize(12);
    doc.text('DEDUCTIONS', 18, currentY + 8);
    
    // Deductions Headers
    currentY += 12;
    doc.setFillColor(248, 249, 250);
    doc.rect(15, currentY, 180, 10, 'F');
    doc.rect(15, currentY, 180, 10);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DESCRIPTION', 18, currentY + 7);
    doc.text('CURRENT', 145, currentY + 7);
    doc.text('YTD', 175, currentY + 7);
    
    // Calculate detailed deductions
    const federalTax = grossPay * 0.12;
    const socialSecurity = grossPay * 0.062;
    const medicare = grossPay * 0.0145;
    const stateTax = grossPay * 0.05;
    const healthInsurance = 125.00;
    const dental = 25.00;
    const retirement401k = grossPay * 0.06;
    
    const totalDeductions = federalTax + socialSecurity + medicare + stateTax + healthInsurance + dental + retirement401k;
    
    // Deduction Rows
    const deductions = [
      { name: 'Federal Income Tax', current: federalTax },
      { name: 'Social Security', current: socialSecurity },
      { name: 'Medicare', current: medicare },
      { name: 'State Income Tax', current: stateTax },
      { name: 'Health Insurance', current: healthInsurance },
      { name: 'Dental Insurance', current: dental },
      { name: '401(k) Contribution', current: retirement401k }
    ];
    
    doc.setFont('helvetica', 'normal');
    currentY += 10;
    
    deductions.forEach(deduction => {
      currentY += 8;
      doc.rect(15, currentY, 180, 8);
      doc.text(deduction.name, 18, currentY + 6);
      doc.text(`$${deduction.current.toFixed(2)}`, 145, currentY + 6);
      doc.text(`$${(deduction.current * 26).toFixed(2)}`, 175, currentY + 6);
    });
    
    // Total Deductions
    currentY += 8;
    doc.setFillColor(theme.secondary[0], theme.secondary[1], theme.secondary[2]);
    doc.rect(15, currentY, 180, 10, 'F');
    doc.rect(15, currentY, 180, 10);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL DEDUCTIONS', 18, currentY + 7);
    doc.text(`$${totalDeductions.toFixed(2)}`, 145, currentY + 7);
    doc.text(`$${(totalDeductions * 26).toFixed(2)}`, 175, currentY + 7);
    
    // Net Pay Section (Highlighted)
    currentY += 15;
    const netPay = grossPay - totalDeductions;
    doc.setFillColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.rect(15, currentY, 180, 15, 'F');
    doc.rect(15, currentY, 180, 15);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('NET PAY', 18, currentY + 10);
    doc.text(`$${netPay.toFixed(2)}`, 145, currentY + 10);
    doc.text(`$${(netPay * 26).toFixed(2)}`, 175, currentY + 10);
    
    // Professional Footer
    currentY += 25;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('This document is computer generated and does not require a signature.', 15, currentY);
    doc.text(`Generated by PaystubPro | ${new Date().toLocaleDateString()} | www.paystubpro.com`, 15, currentY + 8);
    doc.text('For questions regarding this paystub, contact HR or Payroll Department.', 15, currentY + 16);
    
    // Convert PDF to base64
    const pdfBuffer = doc.output('arraybuffer');
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    
    return NextResponse.json({ 
      success: true, 
      pdf: pdfBase64,
      filename: `paystub-${data.employeeName.replace(/\s+/g, '-')}-${Date.now()}.pdf`
    });
    
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to generate PDF' 
    }, { status: 500 });
  }
}
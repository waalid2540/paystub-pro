import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

interface PaystubData {
  employeeName: string;
  companyName: string;
  payRate: string;
  payPeriod: string;
  hoursWorked: string;
  colorTheme?: string;
  companyAddress?: string;
  employeeSSN?: string;
  employeeAddress?: string;
  employeeID?: string;
  payDate?: string;
  checkNumber?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PaystubData = await request.json();
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Professional Color Themes
    const colorThemes = {
      corporate: { 
        primary: [21, 94, 117], 
        secondary: [240, 249, 255], 
        accent: [14, 165, 233],
        text: [15, 23, 42]
      },
      executive: { 
        primary: [75, 85, 99], 
        secondary: [248, 250, 252], 
        accent: [99, 102, 241],
        text: [30, 41, 59]
      },
      modern: { 
        primary: [16, 185, 129], 
        secondary: [236, 253, 245], 
        accent: [5, 150, 105],
        text: [6, 78, 59]
      },
      classic: { 
        primary: [147, 51, 234], 
        secondary: [250, 245, 255], 
        accent: [124, 58, 237],
        text: [76, 29, 149]
      },
      professional: { 
        primary: [220, 38, 127], 
        secondary: [253, 242, 248], 
        accent: [190, 24, 93],
        text: [157, 23, 77]
      }
    };
    
    const theme = colorThemes[data.colorTheme as keyof typeof colorThemes] || colorThemes.corporate;
    
    // === PROFESSIONAL PAYSTUB HEADER ===
    // Main header background
    doc.setFillColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    // White company info box
    doc.setFillColor(255, 255, 255);
    doc.rect(10, 5, 95, 30, 'F');
    doc.setDrawColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.setLineWidth(1);
    doc.rect(10, 5, 95, 30);
    
    // Company information
    doc.setTextColor(theme.text[0], theme.text[1], theme.text[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(data.companyName.toUpperCase(), 12, 15);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(data.companyAddress || '123 Business St, City, ST 12345', 12, 22);
    doc.text('Phone: (555) 123-4567 | EIN: 12-3456789', 12, 27);
    doc.text('www.company.com', 12, 32);
    
    // Paystub title and details (right side)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYROLL STATEMENT', 210 - 10, 18, { align: 'right' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const payDate = data.payDate || new Date().toLocaleDateString();
    const checkNum = data.checkNumber || Math.floor(Math.random() * 100000).toString();
    doc.text(`Pay Date: ${payDate}`, 210 - 10, 28, { align: 'right' });
    doc.text(`Check #: ${checkNum}`, 210 - 10, 35, { align: 'right' });
    
    // === EMPLOYEE & PAY INFORMATION BOXES ===
    let startY = 50;
    
    // Employee Information Box
    doc.setFillColor(theme.secondary[0], theme.secondary[1], theme.secondary[2]);
    doc.rect(10, startY, 90, 35, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(10, startY, 90, 35);
    
    // Employee Info Header
    doc.setFillColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.rect(10, startY, 90, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('EMPLOYEE INFORMATION', 55, startY + 5.5, { align: 'center' });
    
    // Employee Details
    doc.setTextColor(theme.text[0], theme.text[1], theme.text[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const empID = data.employeeID || `EMP-${Math.floor(Math.random() * 10000)}`;
    const empSSN = data.employeeSSN || '1234';
    const empAddress = data.employeeAddress || '456 Employee Ave, City, ST 12345';
    
    doc.text(`Name: ${data.employeeName}`, 12, startY + 15);
    doc.text(`Employee ID: ${empID}`, 12, startY + 21);
    doc.text(`SSN: XXX-XX-${empSSN}`, 12, startY + 27);
    doc.text(`Address: ${empAddress}`, 12, startY + 33);
    
    // Pay Period Information Box
    doc.setFillColor(theme.secondary[0], theme.secondary[1], theme.secondary[2]);
    doc.rect(110, startY, 90, 35, 'F');
    doc.rect(110, startY, 90, 35);
    
    // Pay Period Header
    doc.setFillColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.rect(110, startY, 90, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('PAY PERIOD INFORMATION', 155, startY + 5.5, { align: 'center' });
    
    // Pay Period Details
    doc.setTextColor(theme.text[0], theme.text[1], theme.text[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(`Pay Period: ${data.payPeriod}`, 112, startY + 15);
    doc.text(`Pay Date: ${payDate}`, 112, startY + 21);
    doc.text(`Pay Frequency: Bi-Weekly`, 112, startY + 27);
    doc.text(`Check Number: ${checkNum}`, 112, startY + 33);
    
    // === PROFESSIONAL EARNINGS TABLE ===
    startY = 95;
    
    // Main earnings table background
    doc.setFillColor(255, 255, 255);
    doc.rect(10, startY, 190, 80, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(10, startY, 190, 80);
    
    // Earnings section header
    doc.setFillColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.rect(10, startY, 190, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('EARNINGS & DEDUCTIONS', 105, startY + 8, { align: 'center' });
    
    doc.setTextColor(theme.primary[0], theme.primary[1], theme.primary[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    // Split table into two sections: EARNINGS (left) and DEDUCTIONS (right)
    const tableY = startY + 15;
    
    // === EARNINGS SECTION (LEFT SIDE) ===
    doc.setFillColor(theme.accent[0], theme.accent[1], theme.accent[2]);
    doc.rect(12, tableY, 88, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('EARNINGS', 56, tableY + 6.5, { align: 'center' });
    
    // Earnings column headers
    doc.setFillColor(245, 245, 245);
    doc.rect(12, tableY + 10, 88, 8, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(12, tableY + 10, 88, 8);
    
    doc.setTextColor(theme.text[0], theme.text[1], theme.text[2]);
    doc.setFontSize(8);
    doc.text('DESCRIPTION', 14, tableY + 15.5);
    doc.text('HOURS', 45, tableY + 15.5);
    doc.text('RATE', 62, tableY + 15.5);
    doc.text('CURRENT', 75, tableY + 15.5);
    doc.text('YTD', 91, tableY + 15.5);
    
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
    let currentY = tableY + 20;
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
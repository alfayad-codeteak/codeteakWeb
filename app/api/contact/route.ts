import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import connectDB from '@/lib/db';
import ContactSubmission from '@/lib/models/ContactSubmission';
import * as submissionsStore from '@/lib/submissions-store';

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const timestamp = new Date();

    // Store submission in database (if MongoDB is configured) or in-memory fallback
    let savedSubmission;
    try {
      if (process.env.MONGODB_URI) {
        await connectDB();
        savedSubmission = await ContactSubmission.create({
          firstName,
          lastName,
          email,
          message,
          timestamp,
          status: 'new', // Default status for new submissions
        });
        console.log('Submission saved to database:', savedSubmission._id);
      } else {
        // Fallback to in-memory storage
        const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        savedSubmission = {
          id: submissionId,
          firstName,
          lastName,
          email,
          message,
          timestamp: timestamp.toISOString(),
          status: 'new' as const,
        };
        submissionsStore.addSubmission(savedSubmission);
        console.log('Submission stored in memory:', submissionId);
      }
    } catch (dbError) {
      console.error('Database storage error:', dbError);
      // Continue even if database storage fails
    }

    // Send email notification using Resend (if configured)
    if (resend) {
      try {
        const emailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.RESEND_TO_EMAIL || 'info@codeteak.com',
          subject: `New Contact Form Submission from ${firstName} ${lastName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #FC4B01;">New Contact Form Submission</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Submitted:</strong> ${timestamp.toLocaleString()}</p>
              </div>
              <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #FC4B01;">
                <h3 style="margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                <p>This is an automated email from your CodeTeak website contact form.</p>
              </div>
            </div>
          `,
          replyTo: email,
        });

        console.log('Email sent successfully:', emailResult);
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the request if email fails, just log it
      }

      // Send auto-reply to user
      try {
        // Get the base URL for logo (use your actual domain in production)
        // In production, replace this with your actual domain
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://codeteak.com');
        const logoUrl = `${baseUrl}/logo/logo-white.svg`; // Use white logo for email
        
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: email,
          subject: 'Thank you for contacting CodeTeak',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <!-- Header with Logo -->
                      <tr>
                        <td align="center" style="padding: 40px 20px 20px 20px; background: linear-gradient(135deg, #FC4B01 0%, #e04401 100%); border-radius: 12px 12px 0 0;">
                          <img src="${logoUrl}" alt="CodeTeak Logo" style="max-width: 200px; height: auto; display: block;" />
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h1 style="color: #FC4B01; font-size: 28px; margin: 0 0 20px 0; font-weight: bold;">
                            Thank You for Contacting CodeTeak!
                          </h1>
                          
                          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Dear ${firstName},
                          </p>
                          
                          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Thank you for reaching out to CodeTeak! We have successfully received your message and truly appreciate you taking the time to contact us.
                          </p>
                          
                          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Our team has been notified and we will review your message carefully. We will get back to you as soon as possible, typically within 24-48 hours.
                          </p>
                          
                          <div style="background-color: #f9f9f9; border-left: 4px solid #FC4B01; padding: 20px; margin: 30px 0; border-radius: 4px;">
                            <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                              Your Message:
                            </p>
                            <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                          </div>
                          
                          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                            We look forward to connecting with you and helping you achieve your goals.
                          </p>
                          
                          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0;">
                            Best regards,<br>
                            <strong style="color: #FC4B01;">The CodeTeak Team</strong>
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 12px 12px; border-top: 1px solid #eeeeee;">
                          <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                            This is an automated confirmation email. Please do not reply to this message.<br>
                            If you have any urgent inquiries, please contact us directly at 
                            <a href="mailto:info@codeteak.com" style="color: #FC4B01; text-decoration: none;">info@codeteak.com</a>
                          </p>
                          <p style="color: #999999; font-size: 12px; margin: 15px 0 0 0; text-align: center;">
                            © ${new Date().getFullYear()} CodeTeak. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
      } catch (autoReplyError) {
        console.error('Failed to send auto-reply:', autoReplyError);
      }
    } else {
      console.log('Resend API key not configured. Skipping email notifications.');
    }

    console.log('Contact Form Submission processed:', savedSubmission);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve submissions (for admin/dashboard)
export async function GET(request: NextRequest) {
  try {
    // Authentication: Accept either ADMIN_API_KEY or OTP (5374)
    const authHeader = request.headers.get('authorization');
    const PREDEFINED_OTP = "5374";
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const isValidApiKey = process.env.ADMIN_API_KEY && token === process.env.ADMIN_API_KEY;
    const isValidOtp = token === PREDEFINED_OTP;
    
    if (!isValidApiKey && !isValidOtp) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let allSubmissions;
    
    // Fetch from database if MongoDB is configured, otherwise use in-memory
    if (process.env.MONGODB_URI) {
      await connectDB();
      allSubmissions = await ContactSubmission.find({})
        .sort({ timestamp: -1 })
        .limit(100)
        .lean();
    } else {
      allSubmissions = submissionsStore.getSubmissions();
    }

    return NextResponse.json(
      { 
        success: true,
        submissions: allSubmissions,
        count: Array.isArray(allSubmissions) ? allSubmissions.length : 0
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

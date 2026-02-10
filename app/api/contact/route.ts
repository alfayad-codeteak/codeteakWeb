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

    // Validate required fields (lastName is optional)
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, email, and message are required' },
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
          lastName: lastName || '',
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
          lastName: lastName || '',
          email,
          message,
          timestamp: timestamp.toISOString(),
          status: 'new' as const,
        };
        submissionsStore.addSubmission(savedSubmission);
        console.log('Submission stored in memory:', submissionId);
      }
    } catch (dbError: any) {
      console.error('Database storage error:', dbError);
      console.error('Error details:', {
        message: dbError?.message,
        name: dbError?.name,
        code: dbError?.code
      });
      
      // Fall back to in-memory storage if database fails
      console.warn('Database save failed, storing in memory as fallback');
      const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      savedSubmission = {
        id: submissionId,
        firstName,
        lastName: lastName || '',
        email,
        message,
        timestamp: timestamp.toISOString(),
        status: 'new' as const,
      };
      submissionsStore.addSubmission(savedSubmission);
      console.log('Submission stored in memory as fallback:', submissionId);
    }

    // Append to Google Sheet via Apps Script web app if configured
    const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName: lastName || '',
          email,
          message,
          timestamp: timestamp.toISOString(),
        }),
      }).catch((err) => console.error('Apps Script webhook error:', err));
    }

    // Return response immediately - emails will be sent asynchronously
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      },
      { status: 200 }
    );

    // Send emails asynchronously (fire and forget) - don't block the response
    if (resend) {
      // Send emails in parallel without blocking the response
      Promise.all([
        // Send notification email to admin
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.RESEND_TO_EMAIL || 'info@codeteak.com',
          subject: `New Contact Form Submission from ${firstName}${lastName ? ' ' + lastName : ''}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #FC4B01;">New Contact Form Submission</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${firstName}${lastName ? ' ' + lastName : ''}</p>
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
        }).catch((emailError) => {
          console.error('Failed to send admin notification email:', emailError);
        }),

        // Send auto-reply to user
        (async () => {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
              (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://codeteak.com');
            const logoUrl = `${baseUrl}/logo/logo-white.svg`;
            
            return resend.emails.send({
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
                          <tr>
                            <td align="center" style="padding: 40px 20px 20px 20px; background: linear-gradient(135deg, #FC4B01 0%, #e04401 100%); border-radius: 12px 12px 0 0;">
                              <img src="${logoUrl}" alt="CodeTeak Logo" style="max-width: 200px; height: auto; display: block;" />
                            </td>
                          </tr>
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
            throw autoReplyError;
          }
        })(),
      ]).catch((error) => {
        console.error('Error sending emails:', error);
      });
    } else {
      console.log('Resend API key not configured. Skipping email notifications.');
    }

    return response;
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

    // Parse query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const skip = (page - 1) * limit;

    // Type for submission response (handles both MongoDB and in-memory store)
    type SubmissionResponse = {
      _id?: string | any;
      id?: string;
      firstName: string;
      lastName?: string;
      email: string;
      message: string;
      timestamp: Date | string;
      createdAt?: Date | string;
      status?: 'new' | 'solved';
    };

    let allSubmissions: SubmissionResponse[] = [];
    let totalCount = 0;
    
    // Fetch from database if MongoDB is configured, otherwise use in-memory
    if (process.env.MONGODB_URI) {
      try {
        console.log('Attempting to connect to MongoDB...');
        await connectDB();
        console.log('MongoDB connected successfully');
        
        // Get total count (optimized with countDocuments)
        console.log('Fetching submission count...');
        totalCount = await ContactSubmission.countDocuments({}).exec();
        console.log(`Total submissions in database: ${totalCount}`);
        
        // Optimized query with indexed fields, efficient sorting, and pagination
        console.log(`Fetching submissions (page: ${page}, limit: ${limit})...`);
        const dbSubmissions = await ContactSubmission.find({})
          .sort({ timestamp: -1, createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
          .select('firstName lastName email message timestamp status createdAt')
          .exec();
        
        // Convert MongoDB documents to response format (convert ObjectId to string)
        allSubmissions = (Array.isArray(dbSubmissions) ? dbSubmissions : []).map((doc: any) => ({
          _id: doc._id?.toString() || doc._id,
          firstName: doc.firstName,
          lastName: doc.lastName || '',
          email: doc.email,
          message: doc.message,
          timestamp: doc.timestamp,
          createdAt: doc.createdAt,
          status: doc.status || 'new',
        }));
        
        console.log(`Successfully fetched ${allSubmissions?.length || 0} submissions`);
      } catch (dbError: any) {
        console.error('Database error:', dbError);
        console.error('Error details:', {
          message: dbError?.message,
          name: dbError?.name,
          stack: dbError?.stack,
          mongoUri: process.env.MONGODB_URI ? 'MONGODB_URI is set' : 'MONGODB_URI is NOT set'
        });
        
        // Fall back to in-memory store if database connection fails
        console.warn('MongoDB connection failed, falling back to in-memory store');
        const all = submissionsStore.getSubmissions();
        totalCount = all.length;
        allSubmissions = all
          .sort((a, b) => {
            const dateA = new Date(a.timestamp || 0).getTime();
            const dateB = new Date(b.timestamp || 0).getTime();
            return dateB - dateA;
          })
          .slice(skip, skip + limit)
          .map((sub) => ({
            id: sub.id,
            firstName: sub.firstName,
            lastName: sub.lastName || '',
            email: sub.email,
            message: sub.message,
            timestamp: sub.timestamp,
            status: sub.status || 'new',
          }));
      }
    } else {
      console.log('MONGODB_URI not configured, using in-memory store');
      const all = submissionsStore.getSubmissions();
      totalCount = all.length;
      // Simple pagination for in-memory store
      allSubmissions = all
        .sort((a, b) => {
          const dateA = new Date(a.timestamp || 0).getTime();
          const dateB = new Date(b.timestamp || 0).getTime();
          return dateB - dateA;
        })
        .slice(skip, skip + limit)
        .map((sub) => ({
          id: sub.id,
          firstName: sub.firstName,
          lastName: sub.lastName || '',
          email: sub.email,
          message: sub.message,
          timestamp: sub.timestamp,
          status: sub.status || 'new',
        }));
    }

    // Ensure we always return an array
    if (!Array.isArray(allSubmissions)) {
      allSubmissions = [];
    }

    return NextResponse.json(
      { 
        success: true,
        submissions: allSubmissions,
        count: allSubmissions.length,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        mongoConfigured: !!process.env.MONGODB_URI
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    console.error('Error stack:', error?.stack);
    return NextResponse.json(
      { 
        error: 'Failed to fetch submissions',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

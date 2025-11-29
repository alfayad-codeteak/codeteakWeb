import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ContactSubmission from '@/lib/models/ContactSubmission';
import * as submissionsStore from '@/lib/submissions-store';

const PREDEFINED_OTP = "5374";

// Helper function to check authentication
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '');
  const isValidApiKey = process.env.ADMIN_API_KEY && token === process.env.ADMIN_API_KEY;
  const isValidOtp = token === PREDEFINED_OTP;
  
  return isValidApiKey || isValidOtp;
}

// PATCH endpoint to update message status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Handle params as Promise (Next.js 15+) or direct object (Next.js 14)
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const submissionId = resolvedParams.id;

    const { status } = await request.json();
    
    if (!status || !['new', 'solved'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "new" or "solved"' },
        { status: 400 }
      );
    }

    let updatedSubmission;

    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        updatedSubmission = await ContactSubmission.findByIdAndUpdate(
          submissionId,
          { status },
          { new: true }
        ).lean();

        if (!updatedSubmission) {
          return NextResponse.json(
            { error: 'Message not found in database' },
            { status: 404 }
          );
        }
      } catch (dbError: any) {
        console.error('Database error:', dbError);
        return NextResponse.json(
          { error: `Database error: ${dbError?.message || 'Unknown error'}` },
          { status: 500 }
        );
      }
    } else {
      // Fallback: Update in-memory storage
      const updated = submissionsStore.updateSubmissionStatus(submissionId, status as 'new' | 'solved');
      
      if (!updated) {
        // Message not found in in-memory storage
        // This usually means MongoDB is not configured, or the submission was stored with a different ID format
        return NextResponse.json(
          { 
            error: `Message not found. Status updates require MongoDB to be configured. Please set MONGODB_URI in your environment variables. Without MongoDB, status updates cannot be persisted.` 
          },
          { status: 404 }
        );
      }
      
      updatedSubmission = updated;
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Status updated successfully',
        submission: updatedSubmission,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating message status:', error);
    return NextResponse.json(
      { error: `Failed to update status: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// DELETE endpoint to delete a message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Handle params as Promise (Next.js 15+) or direct object (Next.js 14)
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const submissionId = resolvedParams.id;

    if (process.env.MONGODB_URI) {
      await connectDB();
      const deletedSubmission = await ContactSubmission.findByIdAndDelete(submissionId);

      if (!deletedSubmission) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
    } else {
      // Fallback: Delete from in-memory storage
      const deleted = submissionsStore.deleteSubmission(submissionId);
      
      if (!deleted) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
      
      console.warn('Message deleted from in-memory storage. This will not persist across server restarts. Please set up MongoDB for production.');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}


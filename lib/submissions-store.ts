// Shared in-memory storage for submissions (fallback when MongoDB is not configured)
// In production, use MongoDB instead

export interface SubmissionData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  timestamp: string;
  status?: 'new' | 'solved';
}

let submissions: SubmissionData[] = [];

export function getSubmissions(): SubmissionData[] {
  return submissions;
}

export function addSubmission(submission: SubmissionData): void {
  submissions.push(submission);
}

export function updateSubmissionStatus(id: string, status: 'new' | 'solved'): SubmissionData | null {
  const index = submissions.findIndex((sub) => sub.id === id);
  if (index !== -1) {
    submissions[index] = { ...submissions[index], status };
    return submissions[index];
  }
  return null;
}

export function deleteSubmission(id: string): boolean {
  const index = submissions.findIndex((sub) => sub.id === id);
  if (index !== -1) {
    submissions.splice(index, 1);
    return true;
  }
  return false;
}

export function findSubmissionById(id: string): SubmissionData | undefined {
  return submissions.find((sub) => sub.id === id);
}


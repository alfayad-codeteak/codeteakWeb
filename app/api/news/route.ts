import { NextResponse } from 'next/server';

// Cache configuration
const CACHE_DURATION = 60 * 60; // 1 hour in seconds
let cachedData: {
  data: any;
  timestamp: number;
} | null = null;

export async function GET() {
  try {
    // Get API key and trim any whitespace
    const apiKey = process.env.NEWS_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'News API key is not configured. Please add NEWS_API_KEY to your .env.local file and restart the server.' },
        { status: 500 }
      );
    }

    // Log API key info (first 8 chars only for security)
    console.log('NewsAPI Key Status:', {
      present: !!apiKey,
      length: apiKey.length,
      preview: apiKey.substring(0, 8) + '...',
    });

    // Check cache
    const now = Date.now();
    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION * 1000) {
      return NextResponse.json(cachedData.data, {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        },
      });
    }

    // Fetch from NewsAPI
    // Try header method first (recommended), with fallback to query parameter
    const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=20`;
    
    // Try with X-Api-Key header first
    let response = await fetch(url, {
      next: { revalidate: CACHE_DURATION },
      headers: {
        'Accept': 'application/json',
        'X-Api-Key': apiKey,
      },
    });

    // If header method fails with 401, try query parameter method as fallback
    if (!response.ok && response.status === 401) {
      console.log('Header method failed, trying query parameter method...');
      const urlWithKey = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=20&apiKey=${apiKey}`;
      response = await fetch(urlWithKey, {
        next: { revalidate: CACHE_DURATION },
        headers: {
          'Accept': 'application/json',
        },
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Log error details for debugging
      console.error('NewsAPI Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        apiKeyPresent: !!apiKey,
        apiKeyLength: apiKey?.length,
      });
      
      // Handle specific error cases
      let errorMessage = 'Failed to fetch news';
      if (response.status === 401) {
        if (errorData.code === 'apiKeyInvalid') {
          errorMessage = 'Invalid NewsAPI key. Please verify your API key is correct and active.';
        } else if (errorData.code === 'apiKeyMissing') {
          errorMessage = 'NewsAPI key is missing. Please add NEWS_API_KEY to your .env.local file.';
        } else {
          errorMessage = errorData.message || 'Authentication failed. Please check your NewsAPI key.';
        }
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: errorData.message || errorData.code || 'Unknown error',
          status: response.status,
          code: errorData.code
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Cache the data
    cachedData = {
      data,
      timestamp: now,
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
      },
    });
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


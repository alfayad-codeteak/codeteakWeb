import { NextResponse } from 'next/server';

// Cache configuration
const CACHE_DURATION = 10 * 60; // 10 minutes in seconds
let cachedData: {
  data: any;
  timestamp: number;
  location: string;
} | null = null;

export async function GET(request: Request) {
  try {
    // Get API key and trim any whitespace
    const apiKey = process.env.OPENWEATHER_API_KEY?.trim();

    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '12.8744'; // Bengaluru default
    const lon = searchParams.get('lon') || '77.6137';

    if (!apiKey) {
      console.error('OpenWeather API key is missing from environment variables');
      return NextResponse.json(
        { error: 'OpenWeather API key is not configured. Please add OPENWEATHER_API_KEY to your .env.local file and restart the server.' },
        { status: 500 }
      );
    }

    // Log API key info (first 8 chars only for security)
    console.log('OpenWeather API Key Status:', {
      present: !!apiKey,
      length: apiKey.length,
      preview: apiKey.substring(0, 8) + '...',
    });

    const locationKey = `${lat},${lon}`;

    // Check cache
    const now = Date.now();
    if (cachedData && cachedData.location === locationKey && (now - cachedData.timestamp) < CACHE_DURATION * 1000) {
      return NextResponse.json(cachedData.data, {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        },
      });
    }

    // Fetch from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(url, {
      next: { revalidate: CACHE_DURATION },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Log error details for debugging
      console.error('OpenWeatherMap API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        apiKeyPresent: !!apiKey,
        apiKeyLength: apiKey?.length,
        url: url.replace(apiKey, 'HIDDEN'),
      });
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch weather',
          details: errorData.message || errorData.cod === 401 ? 'Invalid API key' : 'Unknown error',
          code: errorData.cod
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Cache the data
    cachedData = {
      data,
      timestamp: now,
      location: locationKey,
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
      },
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


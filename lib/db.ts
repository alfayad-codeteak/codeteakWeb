import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use global variable to cache the connection in development
declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    const error = new Error('Please define the MONGODB_URI environment variable inside .env.local');
    console.error('MongoDB connection error:', error.message);
    throw error;
  }

  // Check if mongoose is already connected (readyState: 0=disconnected, 1=connected)
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return mongoose.connection;
  }

  if (cached.conn) {
    // Check if the cached connection is still valid
    if ((mongoose.connection as any).readyState === 1) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds (increased for Vercel)
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    };

    console.log('Creating new MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connection established successfully');
      console.log('Connection readyState:', mongoose.connection.readyState);
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection failed:', error);
      console.error('Error details:', {
        message: error?.message,
        name: error?.name,
        code: error?.code
      });
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    console.error('Error in MongoDB connection promise:', e?.message || e);
    console.error('Error code:', e?.code);
    throw e;
  }

  return cached.conn;
}

export default connectDB;


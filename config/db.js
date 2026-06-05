const mongoose = require('mongoose');

/**
 * Robust MongoDB Connection Handler
 * Removed deprecated options and focused on bypassing network blocks.
 * Compatible with Vercel serverless (no process.exit).
 */

// Cache connection for serverless warm starts
let cachedConnection = null;

const connectDB = async () => {
    // If already connected, reuse the connection
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('♻️ Reusing existing database connection');
        return cachedConnection;
    }

    console.log('🔍 DEBUG - MONGODB_URI exists:', !!process.env.MONGODB_URI);

    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('--------------------------------------------------');
        console.error('❌ CRITICAL ERROR: MONGODB_URI is missing.');
        console.error('Make sure MONGODB_URI is set in Vercel Environment Variables.');
        console.error('--------------------------------------------------');
        throw new Error('MONGODB_URI is not defined');
    }

    try {
        console.log('--------------------------------------------------');
        console.log('🔗 Initiating Database Connection...');

        // Removed useNewUrlParser and useUnifiedTopology to stop warnings
        // Driver version 4.0+ handles these automatically.
        cachedConnection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000, // Increased to 30s for slow connections
            socketTimeoutMS: 45000,
            family: 4 // Forces IPv4 to bypass certain ISP DNS/routing glitches
        });

        console.log('✅ SUCCESS: THE AMAZE Database Connected!');
        console.log('--------------------------------------------------');

        return cachedConnection;

    } catch (error) {
        console.error('--------------------------------------------------');
        console.error('❌ DATABASE CONNECTION FAILED');
        console.error(`Message: ${error.message}`);
        console.error('🔍 DIAGNOSIS: Check MongoDB Atlas Network Access.');
        console.error('ACTION: 1. Verify 0.0.0.0/0 in Atlas. 2. Check MONGODB_URI in Vercel env.');
        console.error('--------------------------------------------------');

        throw error;
    }
};

module.exports = connectDB;

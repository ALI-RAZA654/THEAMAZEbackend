const mongoose = require('mongoose');

/**
 * Robust MongoDB Connection Handler
 * Removed deprecated options and focused on bypassing network blocks.
 */
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('--------------------------------------------------');
        console.error('❌ CRITICAL ERROR: MONGODB_URI is missing in your .env file.');
        console.error('--------------------------------------------------');
        process.exit(1);
    }

    try {
        console.log('--------------------------------------------------');
        console.log('🔗 Initiating Database Connection...');

        // Removed useNewUrlParser and useUnifiedTopology to stop warnings
        // Driver version 4.0+ handles these automatically.
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000, // Increased to 30s for slow connections
            socketTimeoutMS: 45000,
            family: 4 // Forces IPv4 to bypass certain ISP DNS/routing glitches
        });

        console.log('✅ SUCCESS: THE AMAZE Database Connected!');
        console.log('--------------------------------------------------');

    } catch (error) {
        console.error('--------------------------------------------------');
        console.error('❌ DATABASE CONNECTION FAILED');
        console.error(`Message: ${error.message}`);
        console.error('🔍 DIAGNOSIS: Network Blockage detected.');
        console.error('ACTION: 1. Turn on a VPN. 2. Verify 0.0.0.0/0 in Atlas.');
        console.error('--------------------------------------------------');

        process.exit(1);
    }
};

// Handle global rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    process.exit(1);
});

module.exports = connectDB;

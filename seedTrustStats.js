const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TrustStat = require('./models/TrustStat');
const connectDB = require('./config/db');

dotenv.config();

const seedTrustStats = async () => {
    try {
        await connectDB();

        await TrustStat.deleteMany({});
        console.log('TrustStats cleared.');

        const stats = [
            { icon: 'fas fa-users', value: '10,000+', label: 'Happy Customers' },
            { icon: 'fas fa-star', value: '4.9 ★', label: 'Average Rating' },
            { icon: 'fas fa-undo', value: '30-Day', label: 'Easy Returns' },
            { icon: 'fas fa-globe', value: 'FREE', label: 'Worldwide Shipping' }
        ];

        await TrustStat.insertMany(stats);
        console.log('TrustStats seeded successfully.');
        process.exit();
    } catch (error) {
        console.error('Error seeding TrustStats:', error);
        process.exit(1);
    }
};

seedTrustStats();

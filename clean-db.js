const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Hero = require('./models/Hero');

const cleanDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB for cleaning...');

        const hero = await Hero.findOne({});
        if (hero) {
            let updated = false;
            if (hero.heading === 'undefined' || hero.heading === 'ahaua') {
                hero.heading = 'DIGITAL SCULPTURES.';
                updated = true;
            }
            if (hero.subtext === 'undefined') {
                hero.subtext = 'Redefining the relationship between advanced textiles and human form through high-conversion aesthetic engineering.';
                updated = true;
            }
            if (hero.videoLink === 'undefined') {
                hero.videoLink = '';
                updated = true;
            }

            if (updated) {
                await hero.save();
                console.log('Hero section cleaned and reset to valid defaults.');
            } else {
                console.log('Hero section was already valid.');
            }
        }

        console.log('Cleaning complete.');
        process.exit(0);
    } catch (err) {
        console.error('Cleaning failed:', err);
        process.exit(1);
    }
};

cleanDB();

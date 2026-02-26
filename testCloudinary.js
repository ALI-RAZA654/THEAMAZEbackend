const dotenv = require('dotenv');
dotenv.config();
const { cloudinary } = require('./config/cloudinary');

cloudinary.api.resources({ max_results: 1 }, function (error, result) {
    if (error) {
        console.error("Cloudinary Error:", error);
    } else {
        console.log("Cloudinary connection successful. Resources:", result.resources);
    }
});

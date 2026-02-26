const http = require('http');

const data = JSON.stringify({
    orderItems: [{
        name: "Test Product",
        qty: 1,
        image: "https://via.placeholder.com/100",
        price: 500
        // No product ID - simulating fallback numeric product
    }],
    shippingAddress: {
        address: "123 Street",
        city: "Karachi",
        postalCode: "", // Empty - form allows blank
        country: "Pakistan"
    },
    customerInfo: {
        firstName: "Test",
        lastName: "User",
        email: "test@test.com",
        phone: "03001234567"
    },
    paymentMethod: "cod",
    totalAmount: 750
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', body);
    });
});

req.on('error', (e) => {
    console.error('Error:', e.message);
});

req.write(data);
req.end();

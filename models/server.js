require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.home = '';

        this.authPath = '/api/auth';
        this.qrPath = '/api/qr';
        this.usersPath = '/api/users'
        this.stallPath = '/api/stalls'
        this.paymentPath = '/api/payment'
        this.shoppingsPath = '/api/shoppings'
        this.reviewsPath = '/api/reviews'
        this.couponPath = '/api/coupon'
        this.eventsPath = '/api/events'
        this.middlewares();

        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.qrPath, require('../routes/qr'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.stallPath, require('../routes/stall'));
        this.app.use(this.paymentPath, require('../routes/payment'));
        this.app.use(this.shoppingsPath, require('../routes/shopcoins'));
        this.app.use(this.reviewsPath, require('../routes/reviews'));
        this.app.use(this.couponPath, require('../routes/coupons'));
        this.app.use(this.eventsPath, require('../routes/events'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en puerto: ${this.port}`);
        });
    }
}

module.exports = Server;
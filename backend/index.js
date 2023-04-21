require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const appRouter = require('./routes/route-service');
const sequelize = require('./Model/db');
const cookieParcer  = require('cookie-parser');

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public'),{ maxAge: '1d'}));

app.use(cookieParcer());
app.use(cors({
    credentials: true,
    origin: process.env.HOST,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',appRouter);

const start = async () => {
    try {
        await sequelize.authenticate();

        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();




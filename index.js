import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import { Server } from 'socket.io';
import User from './models/User.js';

const app = express();
const port = process.env.PORT || 5000;

// Create Server
const server = app.listen(port, () => {
    console.log(`The database listening at http://localhost:${port}`);
});

//Mongoose
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// Instead BodyParser
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Cross-origin resource sharing
app.use(cors());
const countries = ['Turkey', 'USA', 'England', 'Germany', 'France', 'Australia', 'Finland', 'Greece', 'Holland', 'Ireland', 'Italy', 'Japan']

const createUsers = () => {
    for (let i = 0; i < 50; i++) {
        const username = `user${i}`;
        const country = countries[Math.floor(Math.random() * countries.length)];
        const rank = Math.floor(Math.random() * 1000);
        const rankYesterday = Math.floor(Math.random() * 1000);
        const money = 0;
        const user = new User({ username, country, rank, rankYesterday, money });
        try {
            user.save();
        } catch (err) {
            console.log(err);
        }
    }
}

createUsers()
//Routes
app.get('/', createUsers);


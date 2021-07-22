import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import { Server } from 'socket.io';
import usersRoutes from './routes/users.js';
import schedule from 'node-schedule';
import { createMoney, distributeMoney, defineAnewRank } from './middlewares/simulates.js';

const app = express();
const port = process.env.PORT || 5000;

// Create Server
const server = app.listen(port, () => {
    console.log(`The server listening at http://localhost:${port}`);
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

// Routing
app.use('/users', usersRoutes);

// For realtime features
const connection = mongoose.connection;
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000']
    }
});

connection.once("open", () => {
    const usersChangeStream = connection.collection("users").watch();
    io.on('connection', socket => {
        usersChangeStream.on('change', data => {
            socket.emit('changeDb', true)
        })
    })
})

// Simulation for realizing the task requirements
const job1 = schedule.scheduleJob('1 1 * * * *', createMoney);
const job3 = schedule.scheduleJob('0 2 * * * *', defineAnewRank);
const job2 = schedule.scheduleJob('0 0 * * * 0', distributeMoney);




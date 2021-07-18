import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import { Server } from 'socket.io';
import usersRoutes from './routes/users.js';

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

app.use('/users', usersRoutes);


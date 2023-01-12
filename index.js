import express from 'express';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from "./routes/auth.js";
import productRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected to Mongo database ->', res.connections[0].name))
    .catch((err) => console.log(err));

app
    .get('/', (req, res) => {
        res.send('Welcome to Pricebook app!');
    })
    .use('/api/auth', authRouter)
    .use('/api/products', productRouter)
    .use('/api/users', usersRouter);

app.listen(4000, 'localhost', () => {
    console.log('Listening on http://localhost:4000');
})
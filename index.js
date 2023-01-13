import express from 'express';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from "./routes/auth.js";
import productRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";
import cors from 'cors'

const app = express();
dotenv.config();



const corsOptions = {
    origin: process.env.APP_URL
}

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected to Mongo database ->', res.connections[0].name))
    .catch((err) => console.log(err));

app
    .get('/api', (req, res) => {
        res.send('Welcome to Pricebook app!');
    })
    .use('/api/auth', authRouter)
    .use('/api/products', productRouter)
    .use('/api/users', usersRouter);

// app.listen(4000, 'localhost', () => {
//     console.log('Listening on http://localhost:4000');
// })

app.listen(80, () => {
    console.log('CORS-enabled web server listening on port 80');
})
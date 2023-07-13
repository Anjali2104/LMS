
import  express  from 'express';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes';
import errorMiddleware from './middlewares/error.middleware';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTED_URL],
    credentials:true
}));
app.use(cookieParser());

app.use('/ping', (req,res) => {
    res.send('Pong');
})
app.use('/api/v1/user' , userRoutes)
app.all('*', (req,res) => {
    res.status(404).send('OOPS!! 404 page not found');
});
app.use(erorMiddleware);

export default app;
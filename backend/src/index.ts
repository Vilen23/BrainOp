import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth-routes'
import postRoute from './routes/post-route'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend's domain
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser())

//RouteHandler
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute)

app.listen(8000);

import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth-routes'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend's domain
    credentials: true,
  }));
app.use(express.json());

app.use('/api/auth',authRoute)

app.listen(8000);

import express from 'express';
import mongoose from 'mongoose';
import UserRoutes from './routes/user'; // Notice the capital 'U' to match the class name

const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Instantiate the UserRoutes class and get the router instance
const userRoutes = new UserRoutes(); 
app.use('/api/users', userRoutes.getRoutes());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

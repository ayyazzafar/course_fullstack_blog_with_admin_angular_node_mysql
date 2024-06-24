import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
dotenv.config({
  path:'./src/.env'
});
import 'express-async-errors';
import './database/index';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import commentRoutes from './routes/comment.routes';
import postRoutes from './routes/post.routes';
import tagRoutes from './routes/tag.routes';
import logger from './shared/logger.util';



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  logger.error({
    message:err.message, stack: err.stack
  });

  res.status(500).send('Something went wrong');
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});



// code to generate a random string
// console.log(require("crypto").randomBytes(64).toString("base64"))
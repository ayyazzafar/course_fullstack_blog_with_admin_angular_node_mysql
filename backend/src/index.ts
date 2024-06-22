import dotenv from 'dotenv';
dotenv.config({
  path:'./src/.env'
});
import express from 'express';

import './database/index'
import categoryRoutes from './routes/category.routes';
import tagRoutes from './routes/tag.routes';
import postRoutes from './routes/post.routes';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/posts', postRoutes)


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
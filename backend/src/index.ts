import express from 'express';

import './database/index'

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World! ABC');
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
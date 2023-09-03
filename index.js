// medium = require('./integrations/medium');
import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const port = process.env.PORT;



app.get('/', (req, res) => {
    // medium.postArticle();
    // medium.testConnection();

  res.send('Express + TypeScript Server');
});




app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});



import express from 'express';
import dotenv from 'dotenv';
import {
  urlencodedMiddleware,
  jsonMiddleware,
  securityMiddleware,
  compressionMiddleware,
  rateLimitMiddleware,
  morganMiddleware
} from './middlewares/middlewares.js';
import Database from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Database.connect();

app.use(securityMiddleware);      
app.use(compressionMiddleware);   
app.use(rateLimitMiddleware);     
app.use(morganMiddleware);        
app.use(jsonMiddleware);          
app.use(urlencodedMiddleware);    

app.get('/', (req, res) => {
  res.json({ message: 'API Backend funcionando corretamente!' });
});

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});

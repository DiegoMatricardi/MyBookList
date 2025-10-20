import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import {
  urlencodedMiddleware,
  jsonMiddleware,
  securityMiddleware,
  compressionMiddleware,
  rateLimitMiddleware,
  morganMiddleware
} from './middlewares/middlewares.js';
import Database from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import livroRoutes from './routes/livroRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import loginRoutes from './routes/loginRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

Database.connect();

app.use(cors({
  origin: "http://localhost:8080" // porta do Vue
}));

app.use(securityMiddleware);      
app.use(compressionMiddleware);   
app.use(rateLimitMiddleware);     
app.use(morganMiddleware);        
app.use(jsonMiddleware);          
app.use(urlencodedMiddleware);    
app.use(usuarioRoutes);
app.use(livroRoutes);
app.use(categoriaRoutes);
app.use(loginRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'API Backend funcionando corretamente!' });
});

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});

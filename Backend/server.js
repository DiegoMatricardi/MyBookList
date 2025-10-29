import dotenv from 'dotenv';
import express from 'express';
import Database from './config/db.js';
import {
  compressionMiddleware,
  corsMiddleware,
  jsonMiddleware,
  morganMiddleware,
  rateLimitMiddleware,
  securityMiddleware,
  urlencodedMiddleware
} from './middlewares/middlewares.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import livroRoutes from './routes/livroRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

Database.connect();

app.use(securityMiddleware);
app.use(compressionMiddleware);
app.use(rateLimitMiddleware);
app.use(morganMiddleware);
app.use(jsonMiddleware);
app.use(urlencodedMiddleware);
app.use(corsMiddleware);
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

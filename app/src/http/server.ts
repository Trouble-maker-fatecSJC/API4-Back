import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import estacaoRoutes from '../routes/estacao.js'; 

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/estacao', estacaoRoutes);

app.listen(8800);
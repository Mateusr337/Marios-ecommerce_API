import './setup.js';
import errorFunctions from './utils/errorFunctions.js';
import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import router from './Routers/index.js';

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.use(errorFunctions.errorHandlingMiddleware);

export default app;

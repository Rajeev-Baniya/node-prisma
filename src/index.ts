import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { settings } from './config/env';
import getLogger from './utils/logger';
import { mainRouter } from './controllers/auth/main.routes';
import Base from './models/Base.model';
import { GenericErrorHandler } from './middlewares/error.middleware';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

const logger = getLogger({
  file: 'server.ts',
  module: 'Base Entry Point',
  path: '/config/server.ts',
});

const port = settings.port || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.use('/api', mainRouter);

app.get('/test', (req, res) => {
  res.send('server running');
});

app.use(GenericErrorHandler as ErrorRequestHandler);

/**
 * Establish a connection with the database and starts the server, listening at specified port
 * @returns {Promise<void>} Returns a promise
 */
async function startServer(): Promise<void> {
  try {
    await Base.connect();
    app.listen(port, () => {
      logger.info(`Server has started on port ${port}`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);
  }
}

startServer().catch(logger.error);

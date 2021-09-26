const config = require('@/config.js');
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import { createConnection } from 'typeorm';
import { morganMiddleware } from '@middlewares/morganMiddleware';
import errorMiddleware from '@middlewares/errorMiddleware';
import { IndexRoutes } from '@routes/index.route';
import { Logger } from '@utils/logger';
import { catchAllMiddleware } from '@middlewares/catchAllMiddleware';
import { dbConnectionObj } from './db/connection.db';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  public constructor() {
    this.app = express();
    this.port = config.get('port') || 3000;
    this.env = config.get('env') || 'development';

    this.env !== 'testing' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`=================================`);
      Logger.info(`======= ENV: ${this.env} =======`);
      Logger.info(`======= DB: ${dbConnectionObj.name} =======`);
      Logger.info(`🚀 App listening on port ${this.port}`);
      Logger.info(`=================================`);
    });
  }

  private async connectToDatabase() {
    await createConnection(dbConnectionObj);
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials'),
        exposedHeaders: ['Set-Cookie', 'Date', 'ETag']
      })
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(hpp({ whitelist: ['order'] }));
    this.app.use(morganMiddleware);
    this.app.use(cookieParser());
  }

  private initializeRoutes() {
    this.app.use('/', new IndexRoutes().router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
    this.app.use(catchAllMiddleware);
  }
}

export default App;

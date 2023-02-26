import express from 'express';
import bodyParser from 'body-parser';
import carRegistrationRouter from './routes/carRegistrationRoutes';
import carRentRouter from './routes/carRentRoutes';
import driverRegistrationRouter from './routes/driverRegistrationRoutes';
import AppDataSource from './models/data-source/data-source';
import 'reflect-metadata';
import 'dotenv/config';

export default class App {
    private app: express.Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.start();
    }

    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use(
            '/api/v1',
            carRegistrationRouter,
            driverRegistrationRouter,
            carRentRouter,
        );
    }

    async start() {
        await AppDataSource.initialize()
            .then(() => {
                this.app.listen(process.env.PORT, () => {
                    console.log(
                        `Aplicação em execução na porta ${process.env.PORT}`,
                    );
                });
            })
            .catch((e) => {
                throw e;
            });
    }
}

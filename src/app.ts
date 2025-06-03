import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs, swaggerUiOptions } from './config/swagger.config';
import jwtGuard from './middleware/jwt.guard';
import gameRoute from "./route/game.route";
import resourceRoute from "./route/resource.route";

const app : Express = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}))

// Swagger UI 설정
app.use('/upload/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// jwt middleware
app.use('/upload/api/protected', jwtGuard);
app.use('/upload/api/protected/game', gameRoute);
app.use('/upload/api/protected/resource', resourceRoute);

export default app;
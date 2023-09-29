import {Elysia} from "elysia";
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import {getHelloWorld} from "./routes/hello.ts";
import {color} from "console-log-colors";

async function boostrap() {
    const app = new Elysia();

    initializeDecorators(app);
    initializeSwagger(app);
    initializeCors(app);
    initializeRoutes(app);

    app.listen(process.env.PORT ?? 3000, ({hostname, port}) => {
        console.log(color.cyan(`🚀 Running at http://${hostname}:${port}`));
    })
}

function initializeDecorators(app: Elysia) {
    app.decorate('hello', () => 'Hello World');
    app.decorate('user', ({ lastname }: { lastname: string }) => ({name: 'John', lastname}));
}

function initializeSwagger(app: Elysia) {
    app.use(swagger({
        path: '/docs',
        autoDarkMode: true,
        version: process.env.VERSION ?? '1.0.0',
        documentation: {
            info: {
                version: process.env.VERSION ?? '1.0.0',
                title: 'ElysiaJS',
                description: 'API Documentation',
            }
        }
    }));
}

function initializeCors(app: Elysia) {
    app.use(cors({
        origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
}

function initializeRoutes(app: Elysia) {
    app.get('/', () => 'Api is running');
    app.get('/hello', (param) => getHelloWorld(param))
}

boostrap();
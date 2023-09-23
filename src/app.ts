import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found-handler";
import Routes from "./routes";
import "express-async-errors";


const app: express.Application = express();

app.use(helmet()); // Adds or removes http headers to comply with web security standards. 
app.use(cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(Routes);


app.use(errorHandler);
app.use(notFoundHandler);

export default app;

// class App {

//     public app: express.Application;

//     constructor() {
//         this.app = express();

//         this.config();

//         this.app.use(errorHandler);// this should be at the last
//     }

//     private config(): void {
//         this.app.use(helmet()); // Adds or removes http headers to comply with web security standards. 
//         this.app.use(cors());

// // parse json request body
// this.app.use(express.json());

// // parse urlencoded request body
// this.app.use(express.urlencoded({ extended: true }));
// this.app.use(Routes);
//     }

// }

// export default new App().app;
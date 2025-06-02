import express, { Express } from "express";
import bodyParser from 'body-parser';
import { listItems, addItem, toggleItem, removeItem } from './routes';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.get("/api/list", listItems);
app.post("/api/add", addItem);
app.post("/api/toggle", toggleItem);
app.post("/api/remove", removeItem);
app.listen(port, () => console.log(`Server listening on ${port}`));

import express from "express";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

dotenv.config();

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL}),
}));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const socketServer = new Server(httpServer);

socketManager(socketServer);
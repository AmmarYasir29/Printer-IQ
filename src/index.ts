import "reflect-metadata";
import { createConnection } from "typeorm";
import router from "./router";
import * as express from "express";
import { errRes } from "./helper/tools";
import * as fileUpload from "express-fileupload";
const cors = require("cors");
const app = express();
const Port = process.env.PORT || 3000;

createConnection()
  .then(async (connection) => {
    app.use(fileUpload({}));
    app.use(express.json());
    app.use(cors());
    app.use("/", router);
    app.use((req, res, next) => errRes(res, "404 Not Found the page!"));
  })
  .catch((error) => console.log(error));

app.listen(Port, () => console.log(`run on port ${Port} !`));

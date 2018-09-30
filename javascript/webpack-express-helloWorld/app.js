import express from "express";

import { baseResolver } from "../shared/utils/path";
import { isProd } from "../shared/utils/logic";

const {
  DIR = "",
  NODE_ENV = "development",
  HOST = "localhost",
  PORT = 1000
} = process.env;
const app = express();

app.use(express.static("public"));
app.get("*", (req, res) =>
  res.sendFile(baseResolver("./public/helloWorld.html"))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

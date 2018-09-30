import express from "express";
import { baseResolver } from "../shared/utils/path";
import { isProd } from "../shared/utils/logic";

const debug = require("debug")("server");
const app = express();
const baseBuildDir = baseResolver(`./build/${__BASEDIR__}`);

debug("Starting...");

app.use("/", express.static(baseBuildDir, { index: false }));

app.get("/*", (req, res) => {
  res.sendFile(baseResolver(`./build/${__BASEDIR__}/index.html`));
});

app.listen(__PORT__, () => {
  console.log(`Listening on: http://${__HOST__}:${__PORT__}`);
});

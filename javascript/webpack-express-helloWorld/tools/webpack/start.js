import path from "path";
import express from "express";
// import { renderFile } from "ejs";

const debug = require("debug")("server");
const app = express();
const baseResolver = require("./../../../shared/utils/path/baseResolver");
const baseBuildDir = baseResolver(`./build/${__BASEDIR__}`);

debug("Starting...");

// app.engine("html", renderFile);
// app.set("view engine", "html");
// app.set("views", baseBuildDir);

app.use("/", express.static(baseBuildDir, { index: false }));

app.get("/*", (req, res) => {
  res.sendFile(baseResolver(`./build/${__BASEDIR__}/index.html`));
  // res.render("./index", { req, res });
});

app.listen(__PORT__, () => {
  console.log(`Listening on: http://${__HOST__}:${__PORT__}`);
});

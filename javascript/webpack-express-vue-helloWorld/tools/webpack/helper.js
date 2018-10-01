const ifElse = require("./../../../shared/utils/logic/ifElse");
const {
  DIR = "",
  NODE_ENV = "development",
  HOST = "localhost",
  PORT = 1000
} = process.env;
const isDev = NODE_ENV === "development";
const isProd = !isDev;
const ifDev = ifElse(isDev);
const ifProd = ifElse(isProd);
module.exports = {
  isDev,
  isProd,
  ifDev,
  ifProd
};

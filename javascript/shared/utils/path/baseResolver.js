const path = require("path");
const appRootDir = require("app-root-dir");

const baseResolver = (dirPath = "") => {
  return path.resolve(appRootDir.get(), dirPath);
};

module.exports = baseResolver;

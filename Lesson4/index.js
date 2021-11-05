#!/usr/bin/env node
const yargs = require("yargs");
const {getFileNamesInDirectory, promptUser, showFileContents} = require('./utils');

const options = yargs
  .usage("Usage: -p <path> -f <find>")
  .option("p", { alias: "path", describe: "Path to file", type: "string", demandOption: false })
  .option("f", { alias: "find", describe: "Find substring", type: "string", demandOption: false })
  .argv;

const CWD = options.path ?? process.cwd();
(async () => {
    const filesInCwd = await getFileNamesInDirectory(CWD);
    const userInput = await promptUser(filesInCwd);
    await showFileContents(userInput, options.find);
})();

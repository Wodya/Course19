#!/usr/bin/env node
const path = require('path');
const yargs = require("yargs");
const {getFileNamesInDirectory, promptUser, showFileContents} = require('./utils');

const CWD = process.cwd();

(async () => {
    const filesInCwd = await getFileNamesInDirectory(CWD);
    const userInput = await promptUser(filesInCwd);
    await showFileContents(path.join(CWD, userInput));
})();

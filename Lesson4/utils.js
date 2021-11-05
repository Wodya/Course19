const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const {Transform} = require('stream');
const {EOL} = require('os');
require('colors');
const {green} = require("colors");

const isFile = (filepath) => {
    return fs.lstatSync(filepath).isFile();
}
const isDir = (filepath) => {
    return fs.lstatSync(filepath).isDirectory();
}

const getFileNamesInDirectory = async (directory) => {
    const itemsInDirectory = await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            resolve(data.map(p => path.join(directory, p)));
        });
    });
    let files = itemsInDirectory.filter((data) => {
        return isFile(data);
    });
    const dirs = itemsInDirectory.filter((data) => {
        return isDir(data);
    });
    for(let dir of dirs) {
        const filesSubDir = await getFileNamesInDirectory(dir);
        files = files.concat(filesSubDir);
    }
    return files;
}

const promptUser = async (choices) => {
    const optionKey = 'optionKey';

    const result = await inquirer.prompt([{
        name: optionKey,
        type: 'list',
        message: 'Please choose a file to read',
        choices,
    }]);

    return result[optionKey];
}

const getStrWithFindSubstring = (str, findString) => {
    const pos= str.indexOf(findString);
    if(pos < 0)
        return null;
    return str.substring(0, pos) + green(str.substring(pos, pos + findString.length)) + str.substring(pos + findString.length);
}

const showFileContents = async (filepath, findString) => {
    console.log(findString);
    return new Promise((resolve) => {
        const transform = new Transform({
            transform(chunk, encoding, callback) {
                const strArr = chunk.toString().split(EOL);
                for(const str of strArr) {
                    if (findString === undefined)
                        this.push(str + EOL);
                    else {
                        const resultStr = getStrWithFindSubstring(str, findString);
                        if(resultStr !== null)
                            this.push(resultStr + EOL);
                    }
                }
                callback();
            }
        });

        const stream = fs.createReadStream(filepath, 'utf-8');
        stream.on('end', resolve);
        stream.pipe(transform).pipe(process.stdout);

    });
}

module.exports = {
    getFileNamesInDirectory,
    promptUser,
    showFileContents,
}

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const isFile = (filepath) => {
    return fs.lstatSync(filepath).isFile();
}

const getFileNamesInDirectory = async (directory) => {
    const itemsInDirectory = await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            resolve(data);
        });
    });

    return itemsInDirectory.filter((data) => {
        return isFile(path.join(directory, data));
    })
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

const showFileContents = async (filepath) => {
    return new Promise((resolve) => {
        const stream = fs.createReadStream(filepath, 'utf-8');
        stream.on('end', resolve);
        stream.pipe(process.stdout);
    });
}

module.exports = {
    getFileNamesInDirectory,
    promptUser,
    showFileContents,
}

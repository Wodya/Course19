const fs = require('fs');
const path = require('path');
const {EOL} = require('os');

const isDir = (filepath, rootDir) => {
    return filepath === undefined ? true : fs.lstatSync(path.join(rootDir, filepath)).isDirectory();
}

const getHtmlFromFileList = async (fileList, rootDir, relativePath) => {
    return new Promise( (resolve) => {
        let content = fileList.map(cur => {
            const element = isDir(cur, path.join(rootDir, relativePath ?? '')) ? `<h2>${cur}</h2>` : cur;
            return `<p><a href="?path=${path.join(relativePath ?? '', cur)}">${element}</a></p>`
        }).reduce((prev, cur) => prev + EOL + cur);
        let html = fs.readFileSync(path.join(__dirname, 'file_list.html')).toString();
        resolve(html.replace('{{content}}', content));
    });
};

const getFileNamesInDirectory = (relativeDir, rootDir) => {
    return fs.readdirSync(path.join(rootDir,relativeDir ?? ''));
}

module.exports = {
    isDir,
    getHtmlFromFileList,
    getFileNamesInDirectory,
}

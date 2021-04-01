var fs = require('fs');
var md5 = require('md5');

/**
 * @param  {Array} args
 * Parses command argument
 * @return {object} filePath, fileName
 */
function getFileDetails(args) {
    
    const filePath = args[2];
    const fileNamePaths = args[2].split('/');
    const fileName = fileNamePaths[fileNamePaths.length - 1];

    return { filePath, fileName }
}

/**
 * @param  {string} filepath
 * Reads file from filepath
 * @return {ArrayBuffer} data || {Error} error
 */
function readFile(filepath) {

    try {
        const data = fs.readFileSync(filepath);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @param  {ArrayBuffer} data
 * Generates md5 hash from ArrayBuffer
 * @return {string} hash
 */
function generateMD5(data) {

    const hash = md5(data).toUpperCase();

    return hash;
}

module.exports = { readFile, generateMD5, getFileDetails };
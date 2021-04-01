require('dotenv').config();
const { checkCommands } = require('./helpers/commands')
const { getFileDetails, readFile, generateMD5 } = require('./helpers/file')
const { scan } = require('./helpers/scan');

/**
 * Main Execution of the project
 * 1. Checks for valid command to run the scripts
 * 2. Get buffer from file
 * 3. Generates hash
 * 4. Scans the file
 */
function main() {

    try {

        const args = [...process.argv];

        checkCommands(args);

        const { filePath, fileName } = getFileDetails(args);

        const fileStream = readFile(filePath);

        const hash = generateMD5(fileStream);

        scan(fileName, fileStream, hash);

    } catch (e) {
        console.error(e);
    }
}

main();







/**
 * @param  {Array} args
 * 
 * Checks for valid command
 */
function checkCommands(args) {
    if (args.length !== 3) {
        commandUsageError();
    }
}

/**
 * @throws {Error} Invalid command
 */
function commandUsageError() {
    console.error("Unrecognized command:");
    console.error("Command Usage: npm run upload_file [filepath]");
    throw new Error("Invalid command");
}



module.exports = { checkCommands };
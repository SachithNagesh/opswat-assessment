const { getResultsByHash, uploadFile, getResultsByDataId } = require('../api/opswat')
const { checkResult, printResult } = require('../helpers/utils')

/**
 * @param  {string} fileName
 * @param  {ArrayBuffer} fileStream
 * @param  {string} hash
 * 
 * Performs scan on a file
 * @return prints results
 */
function scan(fileName, fileStream, hash) {

    getResultsByHash(hash).then((result) => {

        console.log("-------------------------------------------------------------");
        console.log(" Scanning file for threats using OPSWAT Metadefender API");
        console.log("-------------------------------------------------------------");

        // Only error returned herer would be hash not found
        if (result.error) {

            console.log("\n The Hash does not exist");
            console.log("\n Uploading file to OPSWAT Metadefender API:");

            // Upload file
            uploadFile(fileName, fileStream).then((response) => {

                const data_id = response.data_id;
                console.log(`\n File successfully uploaded!`)
                return data_id;

            }).then((data_id) => {

                // Check result by getting results getResultsByDataId
                checkResult(data_id, getResultsByDataId).then((data) => {
                    console.log(`\n Retrieving scan results using data_id: ${data_id}`);
                    // Prints results
                    printResult(data);
                }).catch((error) => {
                    console.error(error);
                })

            }).catch((error) => {
                console.error(error);
            });

        } else {
            // Prints results if hash is found
            console.log("\n Hash found");
            printResult(result);
        }

    }).catch((error) => {
        console.error(error);
    });

}

module.exports = { scan };
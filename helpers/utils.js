/**
 * @param  {string} data_id
 * @param  {function(string)} retrieveResultsByDataId
 * 
 * Checks results to see if the scan result is 100% completed else repeatedly retreives data till scan results is 100%
 * @return {} data
 * 
 */
async function checkResult(data_id, retrieveResultsByDataId) {

    const data = await retrieveResultsByDataId(data_id);

    if (data?.scan_results?.progress_percentage == 100) {
        return data;
    } else {
        return await checkResult(data_id, retrieveResultsByDataId);
    }

}
/**
 * @param  {object} data
 * 
 * Prints scan results
 */
function printResult(data) {

    console.log(`\n Printing scan results:`);

    const scan_results = data.scan_results;
    const fileName = data.file_info.display_name;
    const overall_status = scan_results.scan_all_result_a === 'No Threat Detected' ? 'Clean' : scan_results.scan_all_result_a;

    console.log("\n Filename: " + fileName);
    console.log(" overall_status: " + overall_status);

    const scan_details = scan_results.scan_details;

    Object.keys(scan_details).map((scan) => {
        console.log("\n engine: " + scan);
        console.log(" threat_found: " + (scan_details[scan].threat_found ? scan_details[scan].threat_found : 'Clean'));
        console.log(" scan_result: " + scan_details[scan].scan_result_i);
        console.log(" scan_result: " + scan_details[scan].scan_result_i);
        console.log(" def_time: " + scan_details[scan].def_time);
    });

    console.log("\nEND");
}

module.exports = { checkResult, printResult }
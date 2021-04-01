const fetch = require('node-fetch');

const OPSWAT_BASE_URL = "https://api.metadefender.com"

/**
 * @param  {string} hash
 * 
 * Performs HTTP GET to retrieve data for existing hash
 * @return {json} data || {Error} Error Message
 */
async function getResultsByHash(hash) {

    const url = `${OPSWAT_BASE_URL}/v4/hash/${hash}`

    var options = {
        headers: {
            "apikey": process.env.OPSWAT_API_KEY
        }
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
        if (data.error.code === 404003) {
            return data;
        } else {
            throw new Error(data.error.messages[0]);
        }
    } else {
        return data;
    }

}
/**
 * @param  {} fileName
 * @param  {} fileStream
 * 
 * Performs HTTP POST to upload file to Metadefender's API
 * @return {json} data || {} Error
 */
async function uploadFile(fileName, fileStream) {

    const url = `${OPSWAT_BASE_URL}/v4/file`

    var options = {
        method: 'POST',
        body: fileStream,
        headers: {
            "apikey": process.env.OPSWAT_API_KEY,
            "Content-Type": "application/octet-stream",
            "filename": fileName
        }
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.messages[0]);
    } else {
        return data;
    }
}

/**
 * @param  {string} data_id
 * 
 * Performs HTTP GET to retrieve data by using data_id
 * @return {json} data || {} Error
 */
async function getResultsByDataId(data_id) {

    const url = `${OPSWAT_BASE_URL}/v4/file/${data_id}`

    var options = {
        headers: {
            "apikey": process.env.OPSWAT_API_KEY
        }
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.messages[0]);
    } else {
        return data;
    }

}

module.exports = { getResultsByHash, uploadFile, getResultsByDataId }
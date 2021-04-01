# OPSWAT ASSESSMENT

The program scans files for threats using OPSWAT's Metadefender API

## Requirements

1. Install `node.js ^14`
2. Install `npm ^6`

## Application Set-up
1. Clone the repo.
2. `cd opswat-assessment`
2. Install node modules using the command `npm install`
3. Fill OPSWAT Metadefender api-key by creating a `.env` using the `.env.example`

## Running the application

After the application set-up, run the command below from your terminal in the application's root folder.

`npm run upload_file [pathToFile]`

## Result

The program will then scan the file using OPSWAT's Metadefender API and does the following:

1. Calculates the hash of the file.
2. Looks for existing results in API for the hash of the file 
3. If yes, skip to 6.
4. If it does not exist, uploads the file and gets the data_id from the uploaded file's response.
5. Uses the data_id to pull the results of the uploaded file.
6. Displaysresults in the format

```

filename: samplefile.txt 
overall_status: Clean

engine: Ahnlab
thread_found: SomeBadMalwareWeFound
scan_result: 1
def_time: 2017-12-05T13:54:00.000Z

engine: Cyren
thread_found: Clean
scan_result: 0
def_time: 2017-12-05T17:43:00.000Z

...

END

```

## Folder-Structure

1. `index.js` - Starting point of the program
2. `/api` - Contains 3 functions used for API calls
3. `/helpers` - Contains required helper functions accordingly in respective files
4. `package.json` - Contains information about the project, dependencies and scripts to run

## Third-party libraries used

1. `node-fetch` for making HTTP calls to OPSWAT's API
2. `dot-env` to make use of .env
3. `md-5` to generate md5 hash of the file

## Author

Sachith Nagesh

## License

[MIT](https://choosealicense.com/licenses/mit/)

let fss = require('fs');
const readline = require('readline');
// Use fs.readFile() method to read the file 
const file = readline.createInterface({
    input: fss.createReadStream('test-report.txt'),
});
file.on('line', (line) => {
    extractData(line);
    if(line == "Ran all test suites."){
        createCSV();
    }
});

let i = 0;
let j = 0;
let records = [];
let testName = [];
let testResult = [];
function extractData(line) {
    if (i == 0) {
        records.push({ date: line });
    }
    if ((line.indexOf("PASS") == 0) == true) {
        testResult[j] = "PASS";
        var start = (line.indexOf("t/") + 2);
        var end = (line.indexOf("js") + 2);
        testName[j] = line.substring(start, end);
        records.push({ name: testName[j], testresult: testResult[j] });
        j++;
    }
    else if (line.indexOf("FAIL") == 0) {
        testResult[j] = "FAIL";
        var start = (line.indexOf("t/") + 2);
        var end = (line.indexOf("js") + 2);
        testName[j] = line.substring(start, end);
        records.push({ name: testName[j], testresult: testResult[j] });
        j++;
    }
    i = i + 1;
}
function createCSV() {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'test-result.csv',
        header: [
            { id: 'date', title: 'DATE' },
            { id: 'name', title: 'TEST NAME' },
            { id: 'testresult', title: 'TEST RESULT' }
        ]
    });
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Testing completed check the results in test-result.csv');
            console.log('\n...To check for the errors open test-result.txt');
        });
}
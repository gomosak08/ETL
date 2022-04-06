const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse; 
const FileSysten = require("fs");
const { fileURLToPath } = require("url");

CSVToJSON().fromFile("./source.csv").then(source => {
    console.log(source);
    source.push({
        "sku":"54632",
        "title":"Fortnite",
        "hardware":"nintendo switch",
        "price": "00.00"

    });
    const csv = JSONToCSV(source);
    FileSysten.writeFileSync("./destination.csv",csv);

});
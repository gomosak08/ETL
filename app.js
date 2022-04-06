const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse; 
const FileSysten = require("fs");
const { fileURLToPath } = require("url");
const convert = require('xml-js');
const XLSX = require("xlsx");

function mod_file(dict){
    for( const data in dict){
        const dato = dict[data];
        
        if (!isNaN(dato)){
            dict[data] = parseFloat(dato)+5;
        } else{
            dict[data] = dato.split('').reverse().join('');

        }
    }
}



CSVToJSON().fromFile("./dataset.xlsx").then(source => {
    console.log('Source file: \n',source);
    source.forEach(line => {
        mod_file(line);
    });
    console.log('Modified file: \n',source);

    const csv = JSONToCSV(source);
    console.log(csv);
    FileSysten.writeFileSync("./destination.csv",csv);

});

console.log(parseInt('hola'));

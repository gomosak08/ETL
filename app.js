const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse; 
const FileSystem = require("fs");
const { fileURLToPath } = require("url");
const convert = require('xml-js');
const xml = require('xml');

const ExcelJS = require('exceljs');


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

function breaking_dict(dict){
    parse_js = [];
    for (const col in dict){
        parse_js.push({[col]:dict[col]});
    }
    return parse_js;
}

async function read_xlsx(filename){
    workbook = new ExcelJS.Workbook();
    const result = await workbook.xlsx.readFile(filename);
    
    return result;
}



CSVToJSON().fromFile("./source.csv").then(source => {
    console.log('Source file: \n',source);
    source.forEach(line => {
        mod_file(line);
    });
    console.log('Modified file: \n',source);
    const js =  JSON.stringify({data:source},null,1);
    console.log('json',js);
    // console.log(source);
    FileSystem.writeFile("file.json",js,'utf8',(error)=>{
        if (error){
            throw error;
        }
    });

    const csv = JSONToCSV(source);
    console.log(csv);
    FileSystem.writeFileSync("./destination.csv",csv);


});




const book = read_xlsx('movies.xlsx');
const resu =  book.then(function(res){
    let names = [];
    let data = [];
    const rows = res._worksheets[1]._rows;
    rows[0]._cells.forEach(cell => {
        names.push(cell._value.model.value.split(" ").join(""));
    });
    rows.slice(1,rows.lenght).forEach(row => {
        let r = {};
        for (const ind of names.keys()){
            r[names[ind]] = row._cells[ind]._value.model.value;
            
        }
        data.push(r);
    });
    return data;
});


var x = resu.then(function(val){

    val.forEach(row => {
        mod_file(row);
    });
    parsed = [];
    val.forEach(row => {
        parsed.push(breaking_dict(row));
    });

    var xm = [{movies:[{_attr:{type:'Marvel movies'}}]}];
    parsed.forEach(row => {

        xm[0].movies.push({movie:row});
    });
    final_xml = xml(xm,true);
    FileSystem.writeFileSync("./destination.xml",final_xml);
    console.log('xlsx to xml:');
    console.log(final_xml);
});

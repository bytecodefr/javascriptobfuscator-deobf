const fs = require('fs');
const beautify = require('js-beautify').js;

let debug = false; // If you want to debug, set this to true

let jsCode = fs.readFileSync("input.js",{encoding:'utf-8',flag:'r'});


let stringsTable = jsCode.split(";")[0].split("=")[1];

let strings = eval('('+stringsTable+')');
let stringsName = jsCode.split(";")[0].split("=")[0].split("var ")[1];

if(debug){console.log("String array name: "+stringsName);console.log("Strings:");console.log(strings);console.log("Cleaning up...");}


//Beautifing a bit (this ain't supposed to be a beautifier)
jsCode = jsCode.replaceAll(stringsName,"deobfed");
jsCode = jsCode.replaceAll("_0x","deobf_var_")
jsCode = beautify(jsCode)



for(let i=0;i<strings.length;i++) {
    let string = strings[i].replaceAll('"','\\"');

    jsCode = jsCode.replaceAll("deobfed["+i+"]",'"'+string+'"');
    
}

jsCode = jsCode.split("\n").slice(1).join('\n');

console.log("Cleaned code!\n");
fs.writeFileSync("output.js","// Deobfuscated by Avian!\n// I apologize for variables looking like shit\n\n"+jsCode);
console.log("Deobfuscated, check output.js");

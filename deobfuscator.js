

// Imports

const fs = require('fs');
const beautify = require('js-beautify').js;

let debug = false; // If you want to debug, set this to true

let jsCode = fs.readFileSync("input.js",{encoding:'utf-8',flag:'r'}); // Obfuscated code


let stringsArray = jsCode.split(";")[0].split("=")[1]; // Get the string version of the..strings. (I can't explain this any better)

let strings = eval('('+stringsArray+')'); // Converts the strings into an actual array we can use.
let stringsName = jsCode.split(";")[0].split("=")[0].split("var ")[1]; // Gets the string array name

if(debug){console.log("String array name: "+stringsName);console.log("Strings:");console.log(strings);console.log("Cleaning up...");} // Debug stuff


//Beautifing the code
jsCode = jsCode.replaceAll(stringsName,"deobfed"); // Replacing the string array with a new one, which is more readable and recognizable
jsCode = jsCode.replaceAll("_0x","deobf_var_") // Replacing all annoying variables, with a new one (this is still annoying, but if you can fix it, please try to contribute this repo)
jsCode = beautify(jsCode)



for(let i=0;i<strings.length;i++) {
    let string = strings[i].replaceAll('"','\\"'); // Making sure we don't have a qoutation mark in our qoutation marks.

    jsCode = jsCode.replaceAll("deobfed["+i+"]",'"'+string+'"'); // Replacing the strings array with a new non-annoying string.
    
}

jsCode = jsCode.split("\n").slice(1).join('\n'); // Removing the strings array

console.log("Cleaned code!\n");

fs.writeFileSync("output.js","// Deobfuscated by Avian!\n// I apologize for variables looking like shit\n\n"+jsCode); // Writing to the file and adding credits.

console.log("Deobfuscated, check output.js");

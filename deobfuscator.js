

// Imports

const fs = require('fs');
const beautify = require('js-beautify').js;

let debug = true; // If you want to debug, set this to true

let jsCode = fs.readFileSync("input.js",{encoding:'utf-8',flag:'r'}); // Obfuscated code


let stringsArray = jsCode.split(";")[0].split("=")[1]; // Get the string version of the..strings. (I can't explain this any better)

let strings = eval('('+stringsArray+')'); // Converts the strings into an actual array we can use.
let stringsName = jsCode.split(";")[0].split("=")[0].split("var ")[1]; // Gets the string array name


if (debug) {
    console.log("String array name: "+stringsName);
    console.log("Strings:");console.log(strings);
}

console.log("Cleaning up...");

//Beautifing the code
jsCode = jsCode.replaceAll(stringsName,"deobfed"); // Replacing the string array with a new one, which is more readable and recognizable
jsCode = jsCode.replaceAll("_0x","var_") // Replacing all annoying variables

let vars = jsCode.matchAll(/var_(\w+)/g) // yeah regex

// making vars cool (example: var_1)
if (vars != null) {
    for (const match of vars) {
        jsCode = jsCode.replaceAll(match[1], count);
    }
}

let goodStartChars = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
    'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_'
]

let replaceHexChars = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
    'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '~', '!',
    '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '=', '+', '{', '}', '[', ']', ' ',
    '|', '\'', '"', ';', ':', '.', ',', '/', '?',
    '<', '>', '`', '0', '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '\t', '\r'
]

let hex = jsCode.matchAll(/\x(..)/g);

if (hex != null) {
    for (const match of hex) {
        let charcode = parseInt(match[1], 16);
        let char = String.fromCharCode(charcode);
        
        if (char == "\n") char = "\\n"
        if (char == "\r") char = "\\r"
        if (char == "\t") char = "\\t"

        if (replaceHexChars.includes(char)) {
            jsCode = jsCode.replace("\\x" + match[1], char);
        }
    }
}

for(let i=0;i<strings.length;i++) {
    let string = strings[i].replaceAll('"','\\"'); // Making sure we don't have a qoutation mark in our qoutation marks.

    string = string.replaceAll("\\", "\\\\");
    string = string.replaceAll("\n", "\\n");
    string = string.replaceAll("\r", "\\r");
    string = string.replaceAll("\t", "\\t");

    jsCode = jsCode.replaceAll("deobfed["+i+"]",'"'+string+'"'); // Replacing the strings array with a new non-annoying string.

    if (goodStartChars.includes(string[0])) {
        jsCode = jsCode.replaceAll(`["${string}"]`, `.${string}`)
    }
}

// little beautify

jsCode = beautify(jsCode)

jsCode = jsCode.split("\n").slice(1).join('\n'); // Removing the strings array

console.log(jsCode)

console.log("Cleaned code!");



fs.writeFileSync("output.js","// Deobfuscated by Avian!\n// Variables look decent now.\n\n"+jsCode); // Writing to the file and adding credits.

console.log("Deobfuscated, check output.js");

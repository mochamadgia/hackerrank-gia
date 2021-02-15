'use strict';

const fs = require('fs');
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the dayOfProgrammer function below.
function dayOfProgrammer(year) {
    let day = [];
    let dop = 256;
    let date = '';
    if (year >= 1700 && year < 1918) {
        if (isAleapYear(year, 'julian'))
            date = '12.09.' + year;
        else
            date = '13.09.' + year;
    } else if (year == 1918) {
        date = '26.09.' + year;
    } else {
        if (isAleapYear(year, 'gregorian')) {
            date = '12.09.' + year;
        } else {
            date = '13.09.' + year;
        }
    }


    function isAleapYear(y, type) {
        if (type == 'gregorian')
            return y % 400 == 0 || (y % 4 == 0 && y % 100 != 0);
        else
            return y % 4 == 0;
    }

    return date;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}

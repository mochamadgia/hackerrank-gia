'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    /*
     * Write your code here.
     */
    if (s.indexOf('PM') > -1) {
        let result = s.split(':').map((item, index, arr) => {
            if (index == 0 && (parseInt(item) % 12 != 0))
                return ((parseInt(item) + 12) % 24).toString();
            else if (index == 0)
                return (parseInt(item)).toString();
            else if (index == arr.length - 1)
                return item.replace("PM", "");
            else
                return item;

        });
        return result.join(':');
    } else {
        let result = s.split(':').map((item, index, arr) => {
            if (index == 0 && (Math.floor(parseInt(item) / 10) == 0 || parseInt(item) % 12 == 0)) {
                return "0" + (parseInt(item) % 12).toString();
            } else if (index == 0 && Math.floor(parseInt(item) / 10) == 1) {
                return (parseInt(item) % 12).toString();
            } else if (index == arr.length - 1) {
                return item.replace("AM", "");
            } else {
                return item;
            }
        });
        return result.join(':');
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}

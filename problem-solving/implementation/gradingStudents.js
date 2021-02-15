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

/*
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

function gradingStudents(grades) {
    let arr = [];
    for (let i in grades) {
        let result = 0;
        if (grades[i] < 38) {
            result = grades[i];
        } else if (grades[i] >= 38 && grades[i] <= 40) {
            result = 40;
        } else {
            let a = grades[i] / 5;
            if (a % 5 != 0) {
                if (5 * (Math.floor(a + 1)) - grades[i] < 3) {
                    result = 5 * Math.floor(a + 1);
                } else {
                    result = grades[i];
                }
            } else {
                result = grades[i];
            }

        }
        arr.push(result);
    }

    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const gradesCount = parseInt(readLine().trim(), 10);

    let grades = [];

    for (let i = 0; i < gradesCount; i++) {
        const gradesItem = parseInt(readLine().trim(), 10);
        grades.push(gradesItem);
    }

    const result = gradingStudents(grades);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

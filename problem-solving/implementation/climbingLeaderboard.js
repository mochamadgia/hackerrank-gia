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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    var setScore = new Set(scores);
    scores = Array.from(setScore);
    var arr = [];
    let pos = scores.length;
    for (let i = 0; i < alice.length; i++) {
        //let pos = 0;
        for (let j = pos - 1; j >= 0; j--) {

            if (alice[i] < scores[j]) {
                pos = j + 2;
                arr.push(pos);
                break;
            } else if (alice[i] == scores[j]) {
                pos = j + 1;
                arr.push(pos);
                break;
            } else if (j == 0 && alice[i] > scores[pos]) {
                pos = 1;
                arr.push(pos);
                break;
            }

        }
    }
    //arr.push(scores.length);
    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

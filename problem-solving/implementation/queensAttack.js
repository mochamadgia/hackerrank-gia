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
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the queensAttack function below.
function queensAttack(n, k, r_q, c_q, obstacles) {
    let u = n - r_q;
    let d = r_q - 1;
    let r = n - c_q;
    let l = c_q - 1;
    let dur = Math.min(u, r);
    let ddr = Math.min(d, r);
    let dul = Math.min(u, l);
    let ddl = Math.min(d, l);

    for (let obs in obstacles) {
        if (obstacles[obs][0] == r_q) {
            if (obstacles[obs][1] > c_q) {
                r = Math.min(r, obstacles[obs][1] - c_q - 1);
            } else {
                l = Math.min(l, c_q - 1 - obstacles[obs][1]);
            }
        } else if (obstacles[obs][1] == c_q) {
            if (obstacles[obs][0] > r_q) {
                u = Math.min(u, obstacles[obs][0] - r_q - 1);
            } else {
                d = Math.min(d, r_q - 1 - obstacles[obs][0]);
            }
        } else if (Math.abs(obstacles[obs][0] - r_q) == Math.abs(obstacles[obs][1] - c_q)) {
            if (obstacles[obs][0] > r_q) {
                if (obstacles[obs][1] > c_q) {
                    dur = Math.min(dur, obstacles[obs][1] - c_q - 1);
                } else {
                    dul = Math.min(dul, c_q - 1 - obstacles[obs][1]);
                }
            } else {
                if (obstacles[obs][1] > c_q) {
                    ddr = Math.min(ddr, obstacles[obs][1] - c_q - 1);
                } else {
                    ddl = Math.min(ddl, c_q - 1 - obstacles[obs][1]);
                }
            }
        }
    }



    return u + d + l + r + dur + dul + ddr + ddl;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const r_qC_q = readLine().split(' ');

    const r_q = parseInt(r_qC_q[0], 10);

    const c_q = parseInt(r_qC_q[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    let result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + "\n");

    ws.end();
}

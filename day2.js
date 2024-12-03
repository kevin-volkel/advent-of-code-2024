const fs = require('fs');

let input = [];

fs.readFile('inputs/day2.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    input = data;
//     input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`

    input = input.split('\n').map( (line) => line.split(' ').map( (num) => Number(num)));
    
    
    part1();
    part2();
});

const isLineSafe = (line) => {
    let safe = true;
    let direction = 0; // 0 = undecided, 1 = ascending, -1 = descending
    for(let numIndex = 0; numIndex < line.length - 1; numIndex++) {
        let currNum = line[numIndex];
        let nextNum = line[+numIndex + 1]
        if(currNum == nextNum){
            safe = false;
            break;
        }
        if(currNum < nextNum) {
            // Ascending
            if(direction == -1) {
                safe = false;
                break;
            }
            direction = 1;
            
        }
        if(currNum > nextNum) {
            // Descending
            if(direction == 1) {
                safe = false;
                break;
            }
            direction = -1;
        }
        let diff = Math.abs(nextNum - currNum)
        if(diff > 3) {
            safe = false;
            break;
        }
    }
    return safe;
}

const part1 = () => {
    let safeReports = 0;
    for(line of input) {
        let safe = isLineSafe(line)
        if(safe) safeReports++;
    }

    console.log(`Part 1: ${safeReports}`);
}

const part2 = () => {
    let safeReports = 0;
    for(line of input) {
        let safe = isLineSafe(line);
        if(safe) {
            safeReports++;
            continue;
        }

        for(numIndex in line){
            let newLine = line.filter( (_, i) => i != numIndex)
            if(isLineSafe(newLine)){
                safe = true;
                break;
            }
        }

        if(safe) {
            safeReports++;
            continue;
        }
    }

    console.log(`Part 2: ${safeReports}`)
}
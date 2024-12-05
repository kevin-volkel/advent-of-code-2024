const fs = require('fs');

const XMAS = 'XMAS'

let input = "";


fs.readFile('inputs/day4.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    inputStr = data;
//     inputStr = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`
    
    input = inputStr.split('\n').map(line => line.split(''))
    
    part1();
    part2();
});

const getPossibleDirections = (row, col) => {
    let directions = [];

    if(row >= 3) {
        directions.push('up')
        if(col >= 3) {
            directions.push('up-left')
        }
        if(col <= input[row].length - 4) {
            directions.push('up-right')
        }
    }
    if(row <= input.length - 4) {
        if(col >= 3) {
            directions.push('down-left')
        }
        if(col <= input[row].length - 4) {
            directions.push('down-right')
        }
        directions.push('down')
    }

    return directions;
}

const part1 = () => {

    //* Check for left and right using regex
    let re1 = /(XMAS)/g
    let re2 = /(SAMX)/g
    let xmasMatches = inputStr.match(re1);
    let samxMatches = inputStr.match(re2)
    let total = xmasMatches.length + samxMatches.length;
    

    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++){
            if(input[row][col] == 'X'){
                let directions = getPossibleDirections(row, col);
                
                for(let direction of directions){
                    let valid = true;
                    switch(direction){
                        case 'up':
                            //* Check for "XMAS" going up
                            for(let i = 1; i <= 3; i++) {
                                if(input[row - i][col] != XMAS.charAt(i)){
                                    valid = false;
                                    break;
                                }
                            }
                            total += valid;
                            break;
                        case 'down':
                            //* Check for "XMAS" going down
                            for(let i = 1; i <= 3; i++) {
                                if(input[row + i][col] != XMAS.charAt(i)){
                                    valid = false;
                                    break;
                                }
                            }
                            total += valid;
                            break;
                        case 'up-right':
                            //* Check for "XMAS" going up-right
                            for(let i = 1; i <= 3; i++) {
                                if(input[row - i][col + i] != XMAS.charAt(i)){
                                    valid = false;
                                    break;
                                }
                            }
                            total += valid;
                            break;
                        case 'up-left':
                            //* Check for "XMAS" going up-left
                            for(let i = 1; i <= 3; i++) {
                                if(input[row - i][col - i] != XMAS.charAt(i)){
                                    valid = false;
                                    break;
                                }
                            }
                            total += valid;
                            break;
                        case 'down-left':
                            //* Check for "XMAS" going down-left
                            for(let i = 1; i <= 3; i++) {
                                if(input[row + i][col - i] != XMAS.charAt(i)){
                                    valid = false;
                                    break;
                                }
                            }
                            total += valid;
                            break;
                        case 'down-right':
                            //* Check for "XMAS" going down-left
                            for(let i = 1; i <= 3; i++) {
                                if(input[row + i][col + i] != XMAS.charAt(i)){
                                    valid = false;
                                    break;
                                }
                            }
                            total += valid;
                            break;
                        default:
                            console.error('UNEXPECTED DIRECTION')
                    }
                }
            }

        }
    }

    console.log(`Part 1: ${total}`)
}


const getX = (row, col) => {
    // Returns bottom-right, bottom-left, top-left, top-right
    return [input[row + 1][col + 1], input[row + 1][col - 1], input[row - 1][col - 1], input[row - 1][col + 1]]
}

const part2 = () => {
    const possibleXMAS = [
        ['M', 'M', 'S', 'S'],
        ['M', 'S', 'S', 'M'],
        ['S', 'S', 'M', 'M'],
        ['S', 'M', 'M', 'S'],
    ]
    let total = 0;

    for(let row = 1; row < input.length - 1; row++) {
        for(let col = 1; col < input[row].length - 1; col++) {
            if(input[row][col] == 'A'){
                let x = getX(row, col);

                for(line of possibleXMAS) {
                    let valid = true;
                    for(char in line){
                        if(line[char] != x[char]){
                            valid = false
                            break;
                        }
                        if(valid == false) {
                            break;
                        }
                    }
                    if(valid == true){
                        total++
                        break;
                    }
                }
            }
        }
    }

    console.log(`Part 2: ${total}`)
}
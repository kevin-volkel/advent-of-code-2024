const fs = require('fs');

let input = "";

fs.readFile('inputs/day8.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    inputStr = data;
//     inputStr = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`
    
    input = inputStr.split('\n').map(line => line.split('').filter( (char) => char != '\r'))
    
    // part1();
    part2();
});

const printArray = (arr) => {
    for(let i = 0; i < arr.length; i++){
        let str = ''
        for(let k = 0; k < arr[i].length; k++) {
            str += arr[i][k] + " "
        }
        console.log(str)
    }
}

const getDistanceBetweenPoints = ([row1, col1], [row2, col2]) => {
    // return Math.abs( (row1 - row2) + (col1 - col2))
    return Math.sqrt(Math.pow((col1 - col2), 2) + Math.pow((row1 - row2), 2))
}

const getSlope = ([row1, col1], [row2, col2]) => {
    return [(row2 - row1), (col2 - col1)]
}

const getPointsAlongSlope = (start, slope) => {
    let [rise, run] = slope;
    let currPoint = [start[0], start[1]]
    let points = [currPoint];

    while(true) {
        let nextPoint = [currPoint[0] + rise, currPoint[1] + run]
        if((nextPoint[0] < 0 || nextPoint[0] >= input.length) || (nextPoint[1] < 0 || nextPoint[1] >= input[0].length)) {
            break;
        }
        points.push([nextPoint[0], nextPoint[1]])
        currPoint = nextPoint;
    }

    currPoint = [start[0], start[1]]
    while(true) {
        let nextPoint = [currPoint[0] - rise, currPoint[1] - run]
        if((nextPoint[0] < 0 || nextPoint[0] >= input.length) || (nextPoint[1] < 0 || nextPoint[1] >= input[0].length)) {
            break;
        }

        points.push([nextPoint[0], nextPoint[1]])
        currPoint = nextPoint;
    }

    return points
}

const printSignalGrid = (signal1, signal2, antinode) => {
    let grid = [];



    for(let i = 0; i < input.length; i++) {
        grid.push([]);
        for(let k = 0; k < input[0].length; k++) {
            grid[i].push('.')
        }
    }

    grid[signal1[0]][signal1[1]] = 'A'
    grid[signal2[0]][signal2[1]] = 'A'
    grid[antinode[0]][antinode[1]] = '#'

    printArray(grid)
    console.log();
}

//! 368 too high
const part1 = () => {
    let matchingSignals = []

    // printArray(input)

    for(let row1 = 0; row1 < input.length; row1++) {
        for(let col1 = 0; col1 < input[row1].length; col1++) {
            if(input[row1][col1] == '.') continue;
            let signal1 = input[row1][col1];
            
            for(let row2 = 0; row2 < input.length; row2++) {
                for(let col2 = 0; col2 < input[row2].length; col2++) {
                    if(input[row2][col2] == '.') continue;
                    if((row1 == row2) && (col1 == col2)) continue;
                    let signal2 = input[row2][col2];
                    if(signal1 == signal2) {
                        orderedCoords = [[row1, col1], [row2, col2]]
                        otherCoords = [[row2, col2], [row1, col1]]
                        
                        let repeat = false;
                        for(let signal of matchingSignals){
                            if(JSON.stringify(signal) == JSON.stringify(orderedCoords)){
                                repeat = true;
                                break;
                            }
                            if(JSON.stringify(signal) == JSON.stringify(otherCoords)){
                                repeat = true;
                                break;
                            }

                        }
                        if(!repeat){
                            matchingSignals.push(orderedCoords)
                        }
                    }
                }
            }
        }
    }

    console.log(input)
    
    let antinodeArr = [];

    for(let signal of matchingSignals) {
        let slope = getSlope(signal[0], signal[1])
        let pointsAlongSlope = getPointsAlongSlope(signal[0], slope)
        

        for(let [row, col] of pointsAlongSlope) {
            if((row == signal[0][0]) && (col == signal[0][1])) continue;
            if((row == signal[1][0]) && (col == signal[1][1])) continue;

            let distance1 = getDistanceBetweenPoints(signal[0], [row, col]);
            let distance2 = getDistanceBetweenPoints(signal[1], [row, col]);

            
            if(distance1 == 2 * distance2 || distance2 == 2 * distance1) {
                // console.log(`Signals at (${signal[0][0]} ${signal[0][1]}) and (${signal[1][0]} ${signal[1][1]}) make antinode at (${row} ${col})`)
                let repeat = false;
                for(let antinode of antinodeArr){
                    if(JSON.stringify(antinode) == JSON.stringify([row, col])){
                        repeat = true;
                        break;
                    }
                }
                if(!repeat) {
                    antinodeArr.push([row, col])
                    // printSignalGrid(signal[0], signal[1], [row, col]) 
                    
                }
            }
        }
    }

    console.log(antinodeArr.length)
}




const part2 = () => {
    let matchingSignals = []

    // printArray(input)

    for(let row1 = 0; row1 < input.length; row1++) {
        for(let col1 = 0; col1 < input[row1].length; col1++) {
            if(input[row1][col1] == '.') continue;
            let signal1 = input[row1][col1];
            
            for(let row2 = 0; row2 < input.length; row2++) {
                for(let col2 = 0; col2 < input[row2].length; col2++) {
                    if(input[row2][col2] == '.') continue;
                    if((row1 == row2) && (col1 == col2)) continue;
                    let signal2 = input[row2][col2];
                    if(signal1 == signal2) {
                        orderedCoords = [[row1, col1], [row2, col2]]
                        otherCoords = [[row2, col2], [row1, col1]]
                        
                        let repeat = false;
                        for(let signal of matchingSignals){
                            if(JSON.stringify(signal) == JSON.stringify(orderedCoords)){
                                repeat = true;
                                break;
                            }
                            if(JSON.stringify(signal) == JSON.stringify(otherCoords)){
                                repeat = true;
                                break;
                            }

                        }
                        if(!repeat){
                            matchingSignals.push(orderedCoords)
                        }
                    }
                }
            }
        }
    }
    
    let antinodeArr = [];

    for(let signal of matchingSignals) {
        let slope = getSlope(signal[0], signal[1])
        let pointsAlongSlope = getPointsAlongSlope(signal[0], slope)
        

        for(let [row, col] of pointsAlongSlope) {
            let repeat = false;
            for(let antinode of antinodeArr){
                if(JSON.stringify(antinode) == JSON.stringify([row, col])){
                    repeat = true;
                    break;
                }
            }
            if(!repeat) {
                antinodeArr.push([row, col])
            }
            
        }
    }

    console.log(antinodeArr.length)
}

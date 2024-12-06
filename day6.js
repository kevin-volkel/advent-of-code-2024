const fs = require('fs');

let input = "";

fs.readFile('inputs/day6.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    inputStr = data;
//     inputStr = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`
    
    input = inputStr.split('\n').map(line => line.split(''))
    
    // part1();
    part2();
});

let Direction = {
    UP: {
        moveForward: (guardPos) => {
            return [guardPos[0] - 1, guardPos[1]]
        },
        str: 'UP'
    },
    DOWN: {
        moveForward: (guardPos) => {
            return [+guardPos[0] + 1, guardPos[1]]
        },
        str: 'DOWN'
    },
    LEFT: {
        moveForward: (guardPos) => {
            return [guardPos[0], guardPos[1] - 1]
            
        },
        str: 'LEFT'
    },
    RIGHT: {
        moveForward: (guardPos) => {
            return [guardPos[0], +guardPos[1] + 1]
        },
        str: 'RIGHT'
    }
}
const turnDirections = {
    UP: Direction.RIGHT,
    DOWN: Direction.LEFT,
    LEFT: Direction.UP,
    RIGHT: Direction.DOWN,
}

const printArray = (arr) => {
    for(let i = 0; i < arr.length; i++){
        let str = ''
        for(let k = 0; k < arr[i].length; k++) {
            str += arr[i][k] + " "
        }
        console.log(str)
    }
}

const part1 = () => {
    let guardPos = [-1, -1];

    //* Find the guard
    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++){
            if(input[row][col] == '^'){
                guardPos = [row, col];
            }
        }
    }

    let guardInMap = true;
    let direction = Direction.UP;
    while(guardInMap) {
        turning = true;
        while(turning){
            turning = false;
            let nextSpot = direction.moveForward(guardPos);

            if((nextSpot[0] < 0 || nextSpot[0] >= input.length) || (nextSpot[1] < 0 || nextSpot[1] >= input[0].length)){
                guardInMap = false;
                break;
            }

            if(input[nextSpot[0]][nextSpot[1]] == '#'){
                //! Need to turn
                direction = turnDirections[direction.str];
                turning = true;
            }
        }

        //* Next spot is clear. Move guard to next spot, mark current spot with X
        input[guardPos[0]][guardPos[1]] = 'X'
        guardPos = direction.moveForward(guardPos);
    }

    let xCount = 0
    input.forEach( line => line.forEach( char => {
        if(char == 'X') xCount++;
    }));

    console.log(`Part 1: ${xCount}`)
}


const isInLoop = (input) => {
    let guardPos = [-1, -1];

    //* If a guard revisits the same location, with the same direction, then it must be a loop
    let directionTracker = {}
    for(let row = 0; row < input.length; row++){
        directionTracker[row] = {};
        for(let col = 0; col < input[row].length; col++){
            directionTracker[row][col] = [];
        }
    }

    //* Find the guard
    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++){
            if(input[row][col] == '^'){
                guardPos = [row, col];
            }
        }
    }

    let guardInMap = true;
    let direction = Direction.UP;
    while(guardInMap) {
        let nextSpot = [];
        turning = true;
        while(turning){
            turning = false;
            nextSpot = direction.moveForward(guardPos);

            if((nextSpot[0] < 0 || nextSpot[0] >= input.length) || (nextSpot[1] < 0 || nextSpot[1] >= input[0].length)){
                guardInMap = false;
                break;
            }

            if(input[nextSpot[0]][nextSpot[1]] == '#'){
                //! Need to turn
                direction = turnDirections[direction.str];
                turning = true;
            }
        }

        if(!guardInMap){
            return false;
        }

        //* Next spot is clear
        if(directionTracker[nextSpot[0]][nextSpot[1]].includes(direction)){
            //! Loop found. Returning True
            return true;
        }
        directionTracker[nextSpot[0]][nextSpot[1]].push(direction);
        

        guardPos = direction.moveForward(guardPos);
    }
}

const part2 = () => {
    let totalLoops = 0;

    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++){
            if(input[row][col] != '^' && input[row][col] != '#') {
                let newInput = input.map( line => line.map( (char) => char));
                newInput[row][col] = '#'
                
                totalLoops += isInLoop(newInput)
            }
        }
    }

    console.log(`Part 2: ${totalLoops}`)
}

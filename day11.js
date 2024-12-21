const fs = require('fs');

let input = [];

fs.readFile('inputs/day10.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // inputStr = data;
    inputStr = `125 17`
    inputStr = `4189 413 82070 61 655813 7478611 0 8`
    inputStr = `4189`
    
    const TEST_AMOUNT = 1;
    
    let totalPart1 = 0;
    let totalPart2 = 0;
    for(let i = 0; i < TEST_AMOUNT; i++) {
        input = inputStr.split(' ').map( num => Number(num));
        let startTime = Date.now();
        // part1();
        let endTime = Date.now();
        // console.log(`This run took ${endTime - startTime}ms`)
        totalPart1 += endTime - startTime;
        startTime = Date.now();
        part2();
        endTime = Date.now();
        console.log(`This run took ${endTime - startTime}ms`)
        totalPart2 += endTime - startTime;
    }

    // console.log(`Avg Part 1 Runtime: ${totalPart1 / TEST_AMOUNT}`)
    console.log(`Avg Part 2 Runtime: ${totalPart2 / TEST_AMOUNT}`)

});



const NUMBER_OF_BLINKS = 50;
const part1 = () => {
    let part1Input = [...input]
    for(let blink = 0; blink < NUMBER_OF_BLINKS; blink++ ){
        //! A single blink
        for(let i = 0; i < part1Input.length; i++) {
            if(part1Input[i] == 0) {
                part1Input[i] = 1;
                continue;
            }
            if(`${part1Input[i]}`.length % 2 == 0) {
                let str = `${part1Input[i]}`;
                let firstHalf = str.substring(0, str.length / 2)
                let secondHalf = str.substring(str.length / 2, str.length)

                part1Input.splice(i, 1, Number(firstHalf), Number(secondHalf))
                i++;
                continue;
            }
            part1Input[i] *= 2024;
        }
    }
    console.log(part1Input.length)
}

let generateReaches = (maxReach) => {
    let reaches = [];
    for(let i = 0; i < maxReach; i++){
        console.log(`Generating Reach #${i + 1}`)
        let reachArr = controlledBlinks(+i + 2, [0])
        reaches.push([i+1, reachArr].flat());
    }
    return reaches.reverse();
}
const controlledBlinks = (numOfBlinks, input) => {
    for(let blink = 0; blink < numOfBlinks; blink++ ){
        // console.log(`Blink #${blink}`)
        input = input.map( (item) => {
            if(item.constructor == Array) {
                item[0]--;
                if(item[0] == 0) {
                    // Remove the first element from 'item'
                    item.shift();
                    return item;
                }
                return [item];
            }
            if(item == 0) {
                return 1;
            }
            itemStr = item.toString();
            if(itemStr.length % 2 == 0) {
                let strLength = itemStr.length;
                let halfPoint = strLength / 2;

                let firstHalf = itemStr.substring(0, halfPoint)
                let secondHalf = itemStr.substring(halfPoint, strLength)

                return [+firstHalf, +secondHalf];
            }
            return item * 2024;
        }).flat()
    }
    return input;
}


const part2 = () => {
    let reaches = generateReaches(35)
    for(let blink = 0; blink < NUMBER_OF_BLINKS; blink++ ){
        console.log(`Blink #${blink}`)
        input = input.map( (item) => {
            if(item.constructor == Array) {
                item[0]--;
                if(item[0] == 0) {
                    // Remove the first element from 'item'
                    item.shift();
                    return item;
                }
                return [item];
            }
            if(item == 0) {

                // 0
                // 1
                // 2024
                // 20 24
                // 2 0 2 4
                // 4048 1 4048 8096
                

                // Instead of setting to 1, recognize the pattern and set it to [2, 0, 2, 4] in 4 blinks
                let reach = (NUMBER_OF_BLINKS - blink);
                if(reach > 1) {
                    for(let reachArr of reaches) {
                        if(reach > reachArr[0]) return [[...reachArr]]
                    }
                }
                
                return 1;
            }
            itemStr = item.toString();
            if(itemStr.length % 2 == 0) {
                let strLength = itemStr.length;
                let halfPoint = strLength / 2;

                let firstHalf = itemStr.substring(0, halfPoint)
                let secondHalf = itemStr.substring(halfPoint, strLength)

                return [+firstHalf, +secondHalf];
            }
            return item * 2024;
        }).flat()
    }
    console.log(input.length)
}
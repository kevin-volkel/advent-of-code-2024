const fs = require('fs');

let input = "";

fs.readFile('inputs/day9.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    inputStr = data;
    // inputStr = `2333133121414131402`
    
    input = inputStr.split('').map( num => +num);
    
    // part1();
    part2();
});

const CheckForFinish = (arr) => {
    let numbersFinished = false;
    for(elem of arr) {
        if(elem == '.') {
            numbersFinished = true;
        }
        if(numbersFinished && elem != '.'){
            return false;
        }
    }

    return true;
}

const part1 = () => {
    let blockArr = input.map( (num ,i) => new Array(num).fill((i % 2 == 0) ? i/2 : '.')).flat()

    let endIndex = blockArr.length - 1;
    
    for(let i in blockArr) {
        // console.log(`${i} / ${blockArr.length} = ${(i / blockArr.length * 100).toFixed(2)}%`)
        if(blockArr[i] != '.') continue;
        
        blockArr[i] = blockArr[endIndex];
        blockArr[endIndex] = '.'

        if(CheckForFinish(blockArr)) {
            break;
        };

        endIndex--;
        while(blockArr[endIndex] == '.') {
            endIndex--;
        }
    }


    let total = 0;
    for(let i in blockArr) {
        if(blockArr[i] == '.') break;
        total += blockArr[i] * i;
    }

    console.log(`Part 1: ${total}`)
}

const FindOpenSpot = (blockArr, blockIndex) => {
    let block = blockArr[blockIndex]
    for(let i in blockArr) {
        if(blockArr[i].length < block.length){
            continue;
        }
        if(i >= blockIndex) return -1;
        if(blockArr[i][0] == '.') return i;
    }
    return -1;
}

const MergeEmptyBlocks = (blockArr) => {
    for(let i = 0; i < blockArr.length; i++) {
        if(i == blockArr.length - 1) return;
        if(blockArr[i][0] != '.') continue;
        if(blockArr[i + 1][0] != '.') continue;
        
        let newEmptyBlock = new Array(blockArr[i].length + blockArr[i + 1].length).fill('.');
        blockArr.splice(i, 2, newEmptyBlock);
        i--
    }
}

const MergeBlockWithOpening = (blockArr, openingIndex, blockIndex) => {
    if(blockArr[openingIndex].length == blockArr[blockIndex].length) {
        // Just swap the two
        blockArr[openingIndex] = blockArr[blockIndex];
        blockArr[blockIndex] = blockArr[blockIndex].map( _ => '.')
        // console.log(blockArr.flat().join(''))
        MergeEmptyBlocks(blockArr);
        return;
    }

    let opening = blockArr[openingIndex];
    let block = blockArr[blockIndex];
    let newOpeningLength = opening.length - block.length;

    blockArr[openingIndex] = block;
    blockArr[blockIndex] = blockArr[blockIndex].map( _ => '.')
    blockArr.splice(+openingIndex + 1, 0, new Array(newOpeningLength).fill('.'))

    MergeEmptyBlocks(blockArr);
    // console.log(blockArr.flat().join(''))
}

const part2 = () => {
    let blockArr = input.map( (num ,i) => new Array(num).fill((i % 2 == 0) ? i/2 : '.')).filter( (val) => val.length != 0);

    let justNumbers = blockArr.filter( arr => arr[0] != '.').reverse();
    // console.log(justNumbers)
    
    // for(let i = blockArr.length - 1; i >= 0; i--) {
    //     // console.log(`${blockArr.length - i} / ${blockArr.length} = ${((blockArr.length - i) / blockArr.length * 100).toFixed(2)}%`)
    //     if(blockArr[i][0] == '.') continue;


    //     let openingIndex = FindOpenSpot(blockArr, i)
    //     if(openingIndex == -1) continue;

    //     // console.log(`Moving ${blockArr[i][0]} block to opening at ${openingIndex}`)
    //     MergeBlockWithOpening(blockArr, openingIndex, i);
    //     // i = blockArr.length - 1;
    // }

    for(let i in justNumbers) {
        console.log(`${i} / ${blockArr.length} = ${((i) / blockArr.length * 100).toFixed(2)}%`)

        let blockIndex = blockArr.findIndex( arr => JSON.stringify(arr) == JSON.stringify(justNumbers[i]))
        
        let openingIndex = FindOpenSpot(blockArr, blockIndex)
        if(openingIndex == -1) continue;
        
        // console.log(`Moving ${blockArr[blockIndex][0]} block to opening at ${openingIndex}`)
        MergeBlockWithOpening(blockArr, openingIndex, blockIndex);
        // i = blockArr.length - 1;
    }

    blockArr = blockArr.flat();

    let total = 0;
    for(let i in blockArr) {
        if(blockArr[i] == '.') continue;
        total += blockArr[i] * i;
    }

    console.log(`Part 2: ${total}`)
}
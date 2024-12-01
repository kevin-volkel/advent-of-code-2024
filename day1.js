const fs = require('fs');

let input = "";
let list1 = [];
let list2 = [];

fs.readFile('inputs/day1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    input = data.split('\n');
    
    //! TEST INPUT OVERRIDE
//     input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`.split('\n')
    
    //* Split into two lists
    for(let i = 0; i < input.length; i++){
        [list1[i], list2[i]] = input[i].split('   ')
        list2[i] = list2[i].split('\r')[0]
    }

    part1();
    part2();
});

const part1 = () => {
    //* Sort each list from least to greatest
    list1 = list1.sort((a, b) => a - b)
    list2 = list2.sort((a, b) => a - b)

    //* Loop through the lists
    let total = 0;
    for(let i = 0; i < list1.length; i++){
        let distance = Math.abs(list1[i] - list2[i]) 
        total += distance;
    }

    console.log(`Part 1: ${total}`)
}

const part2 = () => {
    let repeatedNumbers = {}
    //* Loop through the right list
    for(let i = 0; i < list2.length; i++){
        if(repeatedNumbers[list2[i]] == undefined) {
            repeatedNumbers[list2[i]] = 1;
        } else {
            repeatedNumbers[list2[i]] += 1;
        }
    }

    //* Loop through the left list
    let total = 0;
    for(let i = 0; i < list1.length; i++) {
        if(repeatedNumbers[list1[i]] != undefined) {
            total += (+repeatedNumbers[list1[i]] * +list1[i])
        }
    } 

    console.log(`Part 2: ${total}`)
}
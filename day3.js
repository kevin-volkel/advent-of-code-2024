const fs = require('fs');

let input = "";


fs.readFile('inputs/day3.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    input = data;
    // input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
    
    
    part1();
    part2();
});

const part1 = () => {
    const re = /mul\(\d{1,3},\d{1,3}\)/g;

    let matches = input.match(re);
    
    let total = 0;
    for(let match of matches) {
        let [fnum, snum] = match.split('mul(')[1].split(')')[0].split(',')

        total += +fnum * +snum;
    }

    console.log(`Part 1: ${total}`)
}

const part2 = () => {
    const re = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g;

    let matches = input.match(re);
    
    let total = 0;
    let enabled = true;
    for(let match of matches) {
        if(match == "do()") {
            enabled = true;
            continue;
        } else if(match ==  "don't()") {
            enabled = false;
            continue;
        }
        if(!enabled){
            continue;
        }

        let [fnum, snum] = match.split('mul(')[1].split(')')[0].split(',')
        total += +fnum * +snum;
    }

    console.log(`Part 2: ${total}`)
}
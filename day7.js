const fs = require('fs');

let input = "";

fs.readFile('inputs/day7.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    inputStr = data;
//     inputStr = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`
    
    input = inputStr.split('\n').map((line, i) => {
        line = line.split(' ')
        line[0] = line[0].substring(0, line[0].length - 1)
        return line.map( num => Number(num))
    })
    
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

const generateAllOperations = (numOfOperators, operationArray) => {
    if(numOfOperators == 0) {
        return operationArray
    }
    let totalCombos = Math.pow(2, numOfOperators)
    //! Create the array if this the first call
    if(operationArray.length == 0) {
        operationArray = new Array(totalCombos).fill()
        for(array in operationArray){
            operationArray[array] = [];
        }
    }

    for(let i = 0; i < totalCombos / 2; i++) {
        operationArray[i].push('+')
    }
    let firstHalf = operationArray.slice(0, operationArray.length / 2)
    firstHalf = generateAllOperations(numOfOperators - 1, firstHalf)
    
    for(let i = totalCombos / 2; i < totalCombos; i++){
        operationArray[i].push('*')
    }
    let secondHalf = operationArray.slice(operationArray.length / 2, operationArray.length)
    secondHalf = generateAllOperations(numOfOperators - 1, secondHalf)

    return [firstHalf, secondHalf].flat(1);
}


const part1 = () => {
    let totalSum = 0;

    for(let equation of input) {
        let operationArray = [];
        operationArray = generateAllOperations(equation.length - 2, operationArray)
        
        
        for(combo of operationArray) {
            let result = 0;
            let workingEquation = [...equation]
            for(let numIndex = 1; numIndex < workingEquation.length - 1; numIndex++) {
                let operation = combo[numIndex - 1];
                let fnum = workingEquation[numIndex];
                let snum = workingEquation[numIndex + 1];
                result = (operation == '*') ? fnum * snum : fnum + snum;

                if(result > equation[0]){
                    break;
                }

                workingEquation[numIndex + 1] = result;
            }
            if(result == equation[0]){
                totalSum += equation[0];
                break;
            }
        }
    }
    
    console.log(`Part 1: ${totalSum}`)
}


const generatePart2Operations = (numOfOperators, operationArray) => {
    if(numOfOperators == 0) {
        return operationArray
    }
    let totalCombos = Math.pow(3, numOfOperators)
    //! Create the array if this the first call
    if(operationArray.length == 0) {
        operationArray = new Array(totalCombos).fill()
        for(array in operationArray){
            operationArray[array] = [];
        }
    }

    //! Using thirds instead of halves
    let oneThird = (totalCombos / 3);
    let twoThirds = (2 * totalCombos / 3);

    for(let i = 0; i < oneThird; i++) {
        operationArray[i].push('+')
    }
    let firstThird = operationArray.slice(0, oneThird)
    firstThird = generatePart2Operations(numOfOperators - 1, firstThird)
    
    for(let i = oneThird; i < twoThirds; i++){
        operationArray[i].push('*')
    }
    let secondThird = operationArray.slice(oneThird, twoThirds)
    secondThird = generatePart2Operations(numOfOperators - 1, secondThird)
    
    for(let i = twoThirds; i < totalCombos; i++) {
        operationArray[i].push('||')
    }
    let thirdThird = operationArray.slice(twoThirds, totalCombos)
    thirdThird = generatePart2Operations(numOfOperators - 1, thirdThird)

    return [firstThird, secondThird, thirdThird].flat(1);
}

const part2 = () => {
    let totalSum = 0;
    let count = 0;

    for(let equation of input) {
        count++;
        console.log(`On number ${count} (${((count / input.length) * 100).toFixed(2)}%)`)

        let operationArray = [];
        operationArray = generatePart2Operations(equation.length - 2, operationArray)
        
        
        for(combo of operationArray) {
            let result = 0;
            let workingEquation = [...equation]
            for(let numIndex = 1; numIndex < workingEquation.length - 1; numIndex++) {
                switch(combo[numIndex - 1]){
                    case '*':
                        result = workingEquation[numIndex] * workingEquation[numIndex + 1];
                        break;
                    case '+':
                        result = workingEquation[numIndex] + workingEquation[numIndex + 1];
                        break;
                    case '||':
                        result = Number(`${workingEquation[numIndex]}` + `${workingEquation[numIndex + 1]}`)
                }

                if(result > equation[0]){
                    break;
                }

                workingEquation[numIndex + 1] = result;
            }
            if(result == equation[0]){
                totalSum += equation[0];
                break;
            }
        }
    }
    
    console.log(`Part 2: ${totalSum}`)
}

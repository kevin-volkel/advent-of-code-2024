const fs = require('fs');
const { start } = require('repl');

let input = "";

fs.readFile('inputs/day10.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    inputStr = data;
    inputStr = `543067650323210321032110356789890110710189878760134567
612148941212306782345091235410765227893258759651021298
701238932301456798106787549323454336794567549842330807
898547215450589867287654678892961245987654456732498910
987656306769678956398013234781870301256003301201567821
234543215878760145478920105690210982340112210341056932
109650124981232230569834124567345673451234985452347845
018744323890341021656765033438454589298545676701037796
199803210787650110765017842129823672107655677812378987
785012345654789541874326956010510563201234389983405676
174321498723498632903455467173421454102348210234514430
065430239014323721212762398982567876218959650149623521
145540128765017890101871081071018967327968743898734678
236692134984178768718981012567894458456876212798604329
987783005673269659654108923458763349663212108789015012
896654012562154546743267830309854218767103419276126787
765780123473043432890154321212903109878756578125435698
434099874984012301740125654567812893469017647030165556
323101065765101787434436763058906732154178736543256765
013298187890678696325569892143215440043289128954343894
010367296541549045016678765014300351234567037760012983
329458305032132134787867410967891267653438546891898012
458789414145010120196986323898763298344129655432743210
567076523236678743285898456777654101201098766653658901
456167654107549658374567689985403100312434985567877014
343228943298938569843210576876312238920125676656986323
651014543498127478755765435410278947437876985543235434
743223672567078369876890324320127656506987234350145632
894102981089569232125981210451256543215432122341076541
765091234676352101034674323401237894101341001456789830
014780365445443032126501012532345743103210112565898321
123689876034321145098432107645236743254101101876543210
094545763125210056788943258896107858969010332987674301
785430432106782169877652349787567967678321245696784561
876021569045893458965601654343478914565414326781093870
987109878010432167014298710234323901258905015492012901
789219894324569052123109620123217892109876012323458692
654308765543678743013234538994106543010870965410069783
789877787632189852101110145885287676521961871012178654
034565896601087601211001406776896789437652676523468743
121053795542194512389132312345445676548943989430549012
262342187634765433498545434531230107401232104321678298
876533014123892324567696526540043298340981010780890187
983414523016101019876587017832134781256672125690743296
032101654327892100345678789901295690764543434321652345
123089789236743981234589654800387789835678987787601336
854176590187656876104310343211456876544549016098543223
965765410194545675465231230898565963233432145123210112
876894321243232980370110141767653210112321039654101101
146765232100101061289879852632154100203410128789210322
036787103761267876518768763543069911012543454376325412
123498654854356987405650654985678892327632567215436701
210567569983543292314321569876301765438761078904589898
325456478754330101223433478765432654349652987615678765`
    
    input = inputStr.split('\n').map( (line => line.split('').map(num => +num)));
    
    // part1();
    part2();
});

/**
 * Checks if the trail continues in one of the 4 directions
 * @param {Number} row The row 
 * @param {Number} col The col 
 */
const checkDirections = (row, col) => {
    let coordsToCheck = [];
    let currHeight = input[row][col]
    if(row > 0) {
        if(input[row - 1][col] == currHeight + 1) {
            coordsToCheck.push([row - 1, col])
        }
    }
    if(row < input.length - 1) {
        if(input[+row + 1][col] == currHeight + 1) {
            coordsToCheck.push([+row + 1, col])
        }
    }

    if(col > 0) {
        if(input[row][col - 1] == currHeight + 1) {
            coordsToCheck.push([row, col - 1])
        }
    }
    if(col < input[row].length - 1) {
        if(input[row][+col + 1] == currHeight + 1) {
            coordsToCheck.push([row, +col + 1])
        }
    }

    return coordsToCheck;
}


let totalNines = 0
let ninesReached = [];


/**
 * Find all possible trails from a starting trailhead
 * @param {Number} row The row of the starting trailhead
 * @param {Number} col The col of the starting trailhead
 */
const findNines = (queue, visited) => {
    if(queue.length == 0) return;
    let currPath = queue.pop();
    // console.log(currPath)
    let [row, col] = currPath;

    let currNum = input[row][col]
    
    //! Check for any paths
    let directionsToCheck = checkDirections(row, col);
    
    if(currNum == 8) {
        for(direction of directionsToCheck) {
            let alreadyVisited = false;
            for(visitedPoint of visited) {
                if(visitedPoint[0] == direction[0] && visitedPoint[1] == direction[1]) {
                    alreadyVisited = true;
                    break;
                }
            }
            if(!alreadyVisited) {
                visited.push(direction);
                totalNines++;
            }
        }
        findNines(queue, visited);
        return;
    }

    for(direction of directionsToCheck) {
        queue.push(direction)
    }

    findNines(queue, visited);
}

//! 742 too high
const part1 = () => {
    let startingPaths = [];

    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++){
            if(input[row][col] == 0) startingPaths.push([row, col])
        }
    }

    for(let i = 0; i < startingPaths.length; i++){
        // totalNines = 0;
        let visited = [];
        findNines([startingPaths[i]], visited);
    }

    console.log(`Part 1: ${totalNines}`)
}

let totalRatings = 0;

const findRatings = (queue) => {
    if(queue.length == 0) return;
    let currPath = queue.pop();
    // console.log(currPath)
    let [row, col] = currPath;

    let currNum = input[row][col]
    
    //! Check for any paths
    let directionsToCheck = checkDirections(row, col);
    
    if(currNum == 8) {
        totalRatings += directionsToCheck.length;
        findRatings(queue);
        return;
    }

    for(direction of directionsToCheck) {
        queue.push(direction)
    }

    findRatings(queue);
}

const part2 = () => {
    let startingPaths = [];

    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++){
            if(input[row][col] == 0) startingPaths.push([row, col])
        }
    }

    for(let i = 0; i < startingPaths.length; i++){
        findRatings([startingPaths[i]])
        // console.log(startingPaths[i], totalRatings)
    }

    console.log(`Part 2: ${totalRatings}`)
}
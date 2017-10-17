/**
 * Created by amandaghassaei on 10/16/17.
 */

var options = [
    [52,49,52,29,39,6],
    [48,31,47,23,43,11],
    [53,25,34,13,29,13],
    [49,19,27,19,27,8],
    [34,27,34,9,13,5],
    [38,13,32,11,16,11],
    [54,31,50,13,24,13],
    [23,9,11,5,11,5]
];


for (var i=0;i<options.length;i++){
    for (var j=0;j<options[i].length;j++){
        if (test_match(options[i][j])) console.log(JSON.stringify(options[i][j]));
    }
}
console.log("finished");

function test_match(combo){
    return ((combo[0]+combo[1]+combo[2]+combo[3])/2 == (combo[4]+combo[5])/2);
}

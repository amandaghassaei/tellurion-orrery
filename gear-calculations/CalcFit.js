/**
 * Created by amandaghassaei on 10/17/17.
 */

var min_teeth = 8;
var max_teeth = 55;

var matches = [];

for (var i=0;i<options.length;i++){
    var scales = [];
    for (var j=0;j<options[i].length;j++){
        var scale = calc_scaling(options[i][j]);
        scales.push(scale);
    }
    var best_index = indexOfMin(scales);
    var best = options[i][best_index];
    matches.push(best);
}

function calc_scaling(combo){
    return (combo[4]+combo[5])/(combo[0]+combo[1]+combo[2]+combo[3]);
}

function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = Math.abs(1-Math.abs(arr[0]));
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (Math.abs(1-Math.abs(arr[i]))<min) {
            minIndex = i;
            min = Math.abs(1-Math.abs(arr[i]));
        }
    }

    return minIndex;
}

function make_tsv(array){
    var string = "";
    if (array===undefined) array = matches;
    for (var i=0;i<array.length;i++){
        var item = array[i];
        string += item.join("\t") + "\n";
    }
    return string;
}

console.log("moon orbit");
console.log(make_tsv());//paste this into google docs





function calc_ratio(_teeth, _combo) {
    return _teeth[0] / _teeth[1] * _combo[0] / _combo[1];
}

function calc_error(ratio, val) {
    return Math.abs((ratio - val) / val);
}

var node_regression = 1.053764597;

var allNodeTrains = [];
for (var i=0;i<matches.length;i++){
    var best = calcGearTrain(node_regression*matches[i][1]/matches[i][0], min_teeth, max_teeth, 1, Infinity, true)[1][0];
    allNodeTrains.push(best);
}
console.log("nodes");
console.log(make_tsv(allNodeTrains));

var perigee_precession = 0.8870107566;
var allPerigeeTrains = [];
for (var i=0;i<matches.length;i++){
    var best = calcGearTrain(perigee_precession*matches[i][1]/matches[i][0], min_teeth, max_teeth, 1, Infinity, true)[1][0];
    allPerigeeTrains.push(best);
}
console.log("perigee");
console.log(make_tsv(allPerigeeTrains));

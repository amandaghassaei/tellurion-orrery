/**
 * Created by amandaghassaei on 10/17/17.
 */


var orbit_train = [49,12,34,10,49,55];

var bestFits = [];
for (var i=0;i<options.length;i++){
    var minError = Infinity;
    var bestIndex = 0;
    for (var j=0;j<options[i].length;j++){
        var error = calc_scaling_error(options[i][j]);
        if (error<minError) bestIndex = j;
    }
    bestFits.push(options[i][bestIndex].slice());
}
console.log(make_tsv(bestFits));


function calc_scaling_error(combo){
    var stage1error = (combo[0]+combo[1])/(orbit_train[2]+orbit_train[3]);
    var stage2error = (combo[2]+combo[3])/(orbit_train[0]+orbit_train[1]);
    return stage1error*stage1error+stage2error*stage2error;//euclidean dist
}



function make_tsv(array){
    var string = "";
    for (var i=0;i<array.length;i++){
        var item = array[i];
        string += item.join("\t") + "\n";
    }
    return string;
}
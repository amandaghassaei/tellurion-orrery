/**
 * Created by amandaghassaei on 10/16/17.
 */

var moon_orbit = 12.36874634; //desired ratio

var min_teeth = 5;
var max_teeth = 55;
var num_stages = 3;
var max_error = 10/360/100/moon_orbit;
var num_hits_to_save = 200; //saves the top n combinations that meet max_error

var teeth = [];
for (var i=0;i<num_stages*2;i++){
    teeth.push(min_teeth);
}
var hits = []; //[ratio, [[x,x,x,x,x,x], [x,x,x,x,,x,x]], error]

function calc_ratio(_teeth) {
    var num = 1;
    var denom = 1;
    for (var i=0;i<num_stages;i++){
        num *= _teeth[2 * i];
        denom *= _teeth[2 * i + 1];
    }
    return num / denom;
}

function check_hits(ratio, error){
    if (error>max_error) return;
    var index = -1;
    for (var i=0;i<hits.length;i++) {
        var hit = hits[i];
        if (hit[0] == ratio) {
            hit[1].push(teeth.slice());
            return;//duplicate
        }
        if (index < 0 && error < hit[2])  index = i;
    }
    if (hits.length < num_hits_to_save && index<0) {
        hits.push([ratio, [teeth.slice()], error]);//add to end of list
        return;
    }
    if (index < 0) return; //worse than existing
    hits.pop();//remove last element
    hits.splice(index, 0, [ratio, [teeth.slice()], error]);
}


function calc_error(ratio) {
    return Math.abs((ratio - moon_orbit) / moon_orbit);
}

function increment_teeth(index) {
    if (index >= teeth.length) return true;
    teeth[index] += 1;
    if (teeth[index] > max_teeth){
        teeth[index] = min_teeth;
        return increment_teeth(index + 1);
    }
    return false;
}

var finished = false;
var total_iter = Math.pow((max_teeth-min_teeth+1), 2*num_stages);
var iter_num = 0;
while(!finished) {
    var ratio = calc_ratio(teeth);
    var error = calc_error(ratio);
    check_hits(ratio, error);

    if (iter_num%10000000 == 0) console.log((100*iter_num/total_iter).toFixed(2) + "%");
    iter_num += 1;

    finished = increment_teeth(0);//increment teeth num
}

function log_output(){
    console.log("");
    if (hits.length == 0) console.log("no hits found");
    for (var i=0;i<hits.length;i++){
        var hit = hits[i];
        console.log(hit[0] + "\t" + JSON.stringify(hit[1][0]) + "\t" + hit[2]);
    }
}

log_output();

function make_tsv(){
    var string = "";
    for (var i=0;i<hits.length;i++){
        var hit = hits[i];
        string += hit[1][0].join("\t") + "\n";
    }
    return string;
}

console.log("");
console.log(make_tsv());//paste this into google docs

function make_csv(){
    var string = "";
    for (var i=0;i<hits.length;i++){
        var hit = hits[i];
        string += hit[1][0].join(",") + "\n";
    }
    return string;
}

console.log("");
console.log(make_csv());//paste this into google docs

function get_combinations(){
    var string = "";
    for (var i=0;i<hits.length;i++){
        var hit = hits[i];
        string += "[";
        for (var j=0;j<hit[1].length;j++){
            string += "[" + hit[1][j].join(",") + "]";
            if (j<hit[1].length-1) string += ",";
        }
        string += "],\n";
    }
    return string;
}

console.log("");
console.log(get_combinations());
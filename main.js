var hanoi;
var iterator;
var count = 1;
var positions = ["A", "B", "C"];
var firstTerm = 3;
var ratio = 4/5;
var stopButton = false;

var Hanoi = function(size) {
    this.size = size;
    this.discs = this.setDiscs();
}

/* Logic */
// snapshotは[1's posision, 2's posision, .. , length's posision]のように,
// 各大きさのディスクがどこにあるかを表現している.
function click(size, count, direction) {
    return getSnapshot(size, count + direction);
}
function getSnapshot(size, count) {
    var snapshot = new Array(size);
    for(var i = 0; i < size; i++) {
        var discNumber = i + 1;
        snapshot[i] = getDiscPosition(size, discNumber, count);
    }
    return snapshot;
}
function getDiscPosition(size, discNumber, count) {
    var upperBound = Math.pow(2, discNumber - 1);
    var range = Math.pow(2, discNumber);
    var representative = count % (range * 3);
    var position = 0;
    var direction = getMoveDirection(size, discNumber);
    if(representative < upperBound) {
        position = 0;
    } else if(representative < upperBound + range) {
        position += direction * 1;
    } else if(representative < upperBound + range * 2) {
        position += direction * 2;
    } else {
        position = 0;
    }
    if(position < 0) {
        position += 3;
    }
    return position;
}
// 1: 正の方向, -1: 負の方向
function getMoveDirection(size, discNumber) {
    return Math.pow(-1, size + discNumber + 1);
}
/* Projection */
function projection(snapshot) {
    var mainScreen = document.createElement("div");
    for (var i = 0; i < snapshot.length; i++) {
        var position = snapshot[i];
        var disc = setupDisc(i + 1, position);
        mainScreen.appendChild(disc);
    }
    return mainScreen;
}

function setupDisc(discNumber, position) {
    var disc = document.createElement("div");
    disc.innerText = discNumber;
    disc.setAttribute("style", difineStyle(discNumber, position));
    disc.setAttribute("class", "disc");
    return disc;
}
function difineStyle(discNumber, position) {
    var width = 3;
    for (var i = 0; i < discNumber; i++) {
        width += Math.pow(ratio, i);
    }

    var left = 50 * position;

    var style = 
          "width:" + width + "rem;"
        + "left:" + left + "%;";
    return style;
}

/* Legacy Codes */
Hanoi.prototype.setDiscs = function() {
    clear();
    var discs = new Array();
    for (var i = 0; i < this.size; i++) {
        var disc = new Disc(i);
        discs.push(disc);
        disc.initializePosition();
    }
    return discs;
}

var Disc = function(number) {
    this.number = number;
    this.position = 0;
}
Disc.prototype.initializePosition = function() {
    var position = this.position;
    var label = this.number + 1;
    var disc = document.createElement("div");

    var width = firstTerm;
    for (var i = 0; i < this.number; i++) {
        width += Math.pow(ratio, i);
    }

    disc.innerText = label;
    disc.setAttribute("class", "disc");
    disc.setAttribute("id", "disc" + label);
    disc.style.width = width + "rem";
    var Tower = document.getElementById("tower" + positions[position]);
    Tower.appendChild(disc);
}
Disc.prototype.changePosition = function(position) {
    var from = this.position;
    var to   = position;
    this.position = to;
    var label = this.number + 1;
    var disc = document.getElementById("disc" + label);
    var fromTower = document.getElementById("tower" + positions[from]);
    fromTower.removeChild(disc);
    var toTower = document.getElementById("tower" + positions[to]);
    toTower.insertBefore(disc, toTower.firstChild);
}

function getDiscNumberToMove(count) {
    var discNumber = 0;
    while(count % 2 == 0) {
        count = count / 2;
        discNumber++;
    }
    return discNumber;
}

function rotateDisc(hanoi, direction, discNumber) {
    var disc = hanoi.discs[discNumber];
    var position = disc.position;
    var newPosition = position + direction;
    if (newPosition < 0) {
        newPosition += 3;
    }
    if (newPosition > 2) {
        newPosition -= 3;
    }
    disc.changePosition(newPosition);
}

function solve(hanoi) {
        var discNumber = getDiscNumberToMove(count);
        var direction = getMoveDirection(hanoi.size, discNumber);
        rotateDisc(hanoi, direction, discNumber);
        count++;
}

function initialize() {
    build();
}

function clear() {
    for (var i = 0; i < 3; i++) {
        document.getElementById("tower" + positions[i]).innerHTML = "";
    }
}

function build() {
    var size = Number(document.getElementById("towerSize").value);
    count = 1;
    hanoi = new Hanoi(size);
    stop();
    play();
}

function reset() {
    clear();
    build();
}

function play() {
    if(!stopButton && (count < Math.pow(2, hanoi.size))) {
        solve(hanoi);
        setTimeout(play, 500);
    }
}

function stop() {
    stopButton = true;
}
function next() {
    solve(hanoi);
}

function start() {
    stopButton = false;
    play();
}



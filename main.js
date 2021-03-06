/* Logic */
// snapshotは[1's posision, 2's posision, .. , length's posision]のように,
// 各大きさのディスクがどこにあるかを表現している.
function click(size, count, direction) {
    return getSnapshot(size, count + direction);
}
function getSnapshot(size, count) {
    var snapshot = new Array();
    for(var i = 0; i < size; i++) {
        var discNumber = i + 1;
        snapshot[i] = getDiscPosition(size, discNumber, count);
    }
    return snapshot;
}
function getDiscPosition(size, discNumber, count) {
    var lowerBound = Math.pow(2, discNumber - 1);
    var range = Math.pow(2, discNumber);
    var representative = count % (range * 3);
    var position = 0;
    var direction = getMoveDirection(size, discNumber);
    if(representative < lowerBound) {
        position = 0;
    } else if(representative < lowerBound + range) {
        position += direction * 1;
    } else if(representative < lowerBound + range * 2) {
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
    return Math.pow(-1, 1 + size + discNumber);
}

/* Projection */
function projection(towerSize, count) {
    document.getElementById("towerSize").value = towerSize;
    document.getElementById("count").innerText = count;
    document.getElementById("limit").innerText = Math.pow(2, towerSize) - 1;
    var snapshot = getSnapshot(towerSize, count);
    replaceMainScreen(snapshot);
    rotateDiscs(snapshot);
}
function replaceMainScreen(snapshot) {
    var mainScreen = getMainScreen(snapshot);
    var oldMainScreen = document.getElementById("mainScreen");
    document.body.replaceChild(mainScreen, oldMainScreen);
}
function getMainScreen(snapshot) {
    var mainScreen = document.createElement("div");
    mainScreen.setAttribute("id", "mainScreen");
    var towers = getTowers(snapshot);
    for (var i = 0; i < 3; i++) {
        mainScreen.appendChild(towers[i]);
    }
    return mainScreen;
}
function getTowers(snapshot) {
    var towers = new Array();
    for (var i = 0; i < 3; i++) {
        var towerNumber = i;
        var tower = document.createElement("div");
        tower.setAttribute("class", "tower");
        tower.setAttribute("id", "tower" + towerNumber);
        var discs = getDiscs(snapshot, towerNumber);
        for (var j = 0; j < discs.length; j++) {
            tower.appendChild(discs[j]);
        }
        towers.push(tower);
    }
    return towers;
}
function getDiscs(snapshot, towerNumber) {
    var discs = new Array();
    for (var i = 0; i < snapshot.length; i++) {
        if(snapshot[i] == towerNumber) {
            var discNumber = i;
            var disc = document.createElement("div");
            disc.innerText = discNumber + 1;
            disc.setAttribute("style", difineDiscStyle(discNumber, towerNumber));
            disc.setAttribute("class", "disc");
            discs.push(disc);
        }
    }
    return discs;
}
function difineDiscStyle(discNumber, position) {
    var width = 2;
    for (var i = 0; i < discNumber; i++) {
        width += Math.pow(4/5, i);
    }
    var left = 50 * position;
    var style = 
          "width:" + width + "rem;"
        + "left:" + left + "%;";
    return style;
}
// Canvas
function rotateDiscs(snapshot) {
    var canvas = document.getElementById("subScreen");
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 3;
    var context = canvas.getContext("2d");
    var angle = - (2 * Math.PI) / 3;
    context.clearRect(0,0,centerX * 2, centerY * 2);
    // draw circls
    for(var i = 0; i < snapshot.length; i++) {
        context.beginPath();
        context.strokeStyle = "gray";
        context.lineWidth = 14;
        context.lineCap = "round";
        var radius = i * 15 + 15;
        var startAngle = (snapshot[i] + 1) * angle - Math.PI / 2;
        var endAngle = snapshot[i] * angle - Math.PI / 2;
        context.arc(centerX, centerY, radius, startAngle, endAngle, false);
        context.stroke();
    }
}
function setCanvasSize() {
    var canvas = document.getElementById("subScreen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Interface
function build() {
    setCanvasSize();
    var towerSize = document.getElementById("towerSize").value;
    towerSize = parseInt(towerSize);
    projection(towerSize, 0);
}
var playInterval;
function play() {
    var playButton = document.getElementById("play");
    var towerSize = document.getElementById("towerSize").value;
    towerSize = parseInt(towerSize);
    if (playButton.value == "on") {
        clearInterval(playInterval);
        playButton.value = "off";
        playButton.innerText = "Play";
    } else {
        playInterval = setInterval(next, 1000);
        playButton.value = "on";
        playButton.innerText = "Stop";
    }
}
function next() {
    setCanvasSize();
    var towerSize = document.getElementById("towerSize").value;
    var count = document.getElementById("count").innerText;
    towerSize = parseInt(towerSize);
    count = parseInt(count);
    projection(towerSize, ++count);
}
function back() {
    var towerSize = document.getElementById("towerSize").value;
    var count = document.getElementById("count").innerText;
    towerSize = parseInt(towerSize);
    count = parseInt(count);
    projection(towerSize, --count);
}

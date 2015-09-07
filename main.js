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

// Interface
function build() {
}
function reset() {
}
function next() {
}
function back() {
}

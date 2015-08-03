function* generator() {
    var i = 1;
    while(true) {
        document.getElementById("hoge").innerHTML = "hoge" + i;
        yield;
        i++;
    }
}
var g = generator();


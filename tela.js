var WIDTH = 50;
var HEIGHT = 50;

var boxes = [];
var count = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        boxes.push(new Box(i * (WIDTH + 10), j * (HEIGHT + 10), HEIGHT,WIDTH, count));    
        count++;
    }
}

var ctx;

$(document).ready(function() {
    var c = $("#canvas")[0];
    ctx = c.getContext("2d");
    ctx.font = "15px Arial";
    setInterval(desenha, 500);    
});

function Box(x, y, w, h, value) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;    
    this.fillStyle = "red";    
    this.value = value;
}

function desenha() {
    var b;
    for (var i in boxes) {
        b = boxes[i];
        ctx.fillStyle = b.fillStyle;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = "#fff";
        ctx.fillText(b.value, b.x + (WIDTH / 2) - 3, b.y + (HEIGHT / 2) + 3);
    }
        
}
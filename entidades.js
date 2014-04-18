/**
 * Created by henrique on 18/04/14.
 */

function Estado(deOndeVim, img, manhatan) {
    this.deOndeVim = deOndeVim
    this.img = img;
    this.manhatan = manhatan;
}


function Box(x, y, w, h, value) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fillStyle = "#000";
    this.value = value;
}


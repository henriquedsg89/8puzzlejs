/**
 * Created by henrique on 18/04/14.
 */

function Estado(deOndeVim, img, nivel, manhattan) {
    this.deOndeVim = deOndeVim
    this.img = img;
    this.nivel = nivel;
    this.manhatan = manhattan;
    this.custo = nivel + manhattan;
}


function Box(x, y, w, h, value) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fillStyle = "#000";
    this.value = value;
}


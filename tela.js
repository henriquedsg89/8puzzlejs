var boxSendoDesenhada;
var boxesParaDesenhar = [];

$(document).ready(function() {
    var c = $("#canvas")[0];
    ctx = c.getContext("2d");
    ctx.font = "bold 20px arial";
});

function iniciaBoxes() {
    var img;
    while (estadoSendoLido != null) {
        img = estadoSendoLido.img;
        var boxesParaImg = [];

        for (var i = 0; i < 3; i++) {
            var boxesArray = [];

            for (var j = 0; j < 3; j++) {
               boxesArray.push(new Box(j * (WIDTH + 10), i * (HEIGHT + 10), HEIGHT, WIDTH, img[i][j]));
            }

            boxesParaImg.push(boxesArray);
        }
        boxesParaDesenhar.push(boxesParaImg);

        estadoSendoLido = estadoSendoLido.deOndeVim;
    }
    boxesParaDesenhar.reverse();
}

function desenha() {
    var listaDeCaminhoFeliz = boxesParaDesenhar;
    var img = boxesParaDesenhar[0];

    if (boxesParaDesenhar.length == 0) {
        clearInterval(intervalId);
        $("#ordenar_btn").attr('disabled', false);
        return;
    }

    var proximaPosDoZero;
    if (listaDeCaminhoFeliz.length >= 2) {
        proximaPosDoZero = findPosicaoDoZeroParaBoxes(listaDeCaminhoFeliz[1]);
    }

    limpaCanvasBox();

    var nextBoxZero;
    if (listaDeCaminhoFeliz.length >= 2) {
        nextBoxZero = listaDeCaminhoFeliz[1][proximaPosDoZero[0]][proximaPosDoZero[1]];
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            boxSendoDesenhada = img[i][j];

            if (boxSendoDesenhada != undefined && nextBoxZero != undefined && boxSendoDesenhada.value == 0) {
                if (boxSendoDesenhada.x > nextBoxZero.x) {
                    boxSendoDesenhada.x -= 5;
                } else if (boxSendoDesenhada.x < nextBoxZero.x) {
                    boxSendoDesenhada.x += 5;
                }

                if (boxSendoDesenhada.y > nextBoxZero.y) {
                    boxSendoDesenhada.y -= 5;
                } else if (boxSendoDesenhada.y < nextBoxZero.y) {
                    boxSendoDesenhada.y += 5;
                }
            } else if (proximaPosDoZero != null && i == proximaPosDoZero[0] && j == proximaPosDoZero[1]) {
                var posicaoDoZero = findPosicaoDoZeroParaBoxes(img);
                if ((posicaoDoZero[0] == 0 && boxSendoDesenhada.y > 0 ||
                    (posicaoDoZero[0] == 1 && boxSendoDesenhada.y > 60))) {
                    boxSendoDesenhada.y -= 5;
                } else if ((posicaoDoZero[0] == 2 && boxSendoDesenhada.y < 120) ||
                    (posicaoDoZero[0] == 1 && boxSendoDesenhada.y < 60)) {
                    boxSendoDesenhada.y += 5;
                } else if ((posicaoDoZero[1] == 2 && boxSendoDesenhada.x < 120)  ||
                    (posicaoDoZero[1] == 1 && boxSendoDesenhada.x < 60)) {
                    boxSendoDesenhada.x += 5;
                } else if ((posicaoDoZero[1] == 1 && boxSendoDesenhada.x > 60) ||
                    (posicaoDoZero[1] == 0 && boxSendoDesenhada.x > 0)) {
                    boxSendoDesenhada.x -= 5;
                }
            }

            if (boxSendoDesenhada.value == 0 && (nextBoxZero == null ||
                (boxSendoDesenhada.x == nextBoxZero.x && boxSendoDesenhada.y == nextBoxZero.y))) {
                listaDeCaminhoFeliz.shift();
            }

            desenhaBox(boxSendoDesenhada);
        }

    }
}

function desenhaBox(b) {
    if (b.value == 0) {
        ctx.fillStyle = "blue";
    } else {
        ctx.fillStyle = b.fillStyle;
    }
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.fillStyle = "#fff";
    ctx.fillText(b.value, b.x + (WIDTH / 2) - 5, b.y + (HEIGHT / 2) + 5);
}
function limpaCanvasBox() {
    ctx.fillStyle = "rgb(255, 253, 195)";
    ctx.fillRect(0,0,200,200);
}
/**
 * Created by henrique on 02/04/14.
 */

function Estado(deOndeVim,img,nivel) {
    this.deOndeVim = deOndeVim;
    this.img = img;
    this.nivel = nivel;        
}

function ehFinal(img) {
    var valor = 1;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (img[i][j].value != 0) {
                if (img[i][j].value != valor) {
                    return false;
                }
                valor++;
            }

        }
    }
    return true;
}

function findPosicaoDoZero(img) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (img[i][j].value == 0) {
                return [i, j];
            }
        }
    }
    return null;
}

function copiaImg(original) {
    var novoTab = [[],[],[]];
    var newBox, oldBox;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            oldBox = original[i][j];
            newBox = new Box(oldBox.x, oldBox.y, oldBox.w, oldBox.h, oldBox.value);

            novoTab[i][j] = newBox;
        }
    }
    return novoTab;
}
    
function moveParaCimaTabuleiro(img) {
    var posicaoDoZero = findPosicaoDoZero(img);
    var iDoZero = posicaoDoZero[0];
    var jDoZero = posicaoDoZero[1];

    if (iDoZero == 0) {
        return null;//nao tem tab pra cima
    } else {
        var valorDeCima = img[iDoZero - 1][jDoZero].value;
        img[iDoZero][jDoZero].value = valorDeCima;
        img[iDoZero - 1][jDoZero].value = 0;
        return img;
    }
}

function moveParaBaixoTabuleiro(img) {
    var posicaoDoZero = findPosicaoDoZero(img);
    var iDoZero = posicaoDoZero[0];
    var jDoZero = posicaoDoZero[1];

    if (iDoZero == 2) {
        return null;//nao tem tab pra cima
    } else {
        var valorDeBaixo = img[iDoZero + 1][jDoZero].value;
        img[iDoZero][jDoZero].value = valorDeBaixo;
        img[iDoZero + 1][jDoZero].value = 0;
        return img;
    }
}

function moveParaEsqTabuleiro(img) {
    var posicaoDoZero = findPosicaoDoZero(img);
    var iDoZero = posicaoDoZero[0];
    var jDoZero = posicaoDoZero[1];

    if (jDoZero == 0) {
        return null;//nao tem tab pra eqs
    } else {
        var valorEsq = img[iDoZero][jDoZero - 1].value;
        img[iDoZero][jDoZero].value = valorEsq;
        img[iDoZero][jDoZero - 1].value = 0;
        return img;
    }
}

function moveDirTabuleiro(img) {
    var posicaoDoZero = findPosicaoDoZero(img);
    var iDoZero = posicaoDoZero[0];
    var jDoZero = posicaoDoZero[1];

    if (jDoZero == 2) {
        return null;//nao tem tab pra cima
    } else {
        var valorDir = img[iDoZero][jDoZero + 1].value;
        img[iDoZero][jDoZero].value = valorDir;
        img[iDoZero][jDoZero + 1].value = 0;
        return img;
    }
}

function populaOpcoes(tab, nivel) {
    var opcoes = [];
    var cima = moveParaCimaTabuleiro(copiaImg(tab.img));
    if (cima != null) {
        opcoes.push(new Estado(tab, cima, nivel));
    }
    
    var baixo = moveParaBaixoTabuleiro(copiaImg(tab.img));
    if (baixo != null) {
        opcoes.push(new Estado(tab, baixo, nivel));
    }
    
    var esq = moveParaEsqTabuleiro(copiaImg(tab.img));
    if (esq != null) {
        opcoes.push(new Estado(tab, esq, nivel));
    }
    
    var dir = moveDirTabuleiro(copiaImg(tab.img));
    if (dir != null) {
        opcoes.push(new Estado(tab, dir, nivel));
    }
    
    return opcoes;
}

function Box(x, y, w, h, value) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fillStyle = "#000";
    this.value = value;
}

var boxSendoDesenhada;
function desenha() {    
    var tabAlert = listaDeCaminhoFeliz[listaDeCaminhoFeliz.length -1];
    if (tabAlert == null) {
        clearInterval(intervalId);
        $("#ordenar_btn").attr('disabled', false);
        return;
    }
        var proximaPosDoZero;
        if (listaDeCaminhoFeliz.length >= 2) {
            proximaPosDoZero = findPosicaoDoZero(listaDeCaminhoFeliz[listaDeCaminhoFeliz.length - 2].img);
        }

        limpaCanvasBox();            
        
        var nextBoxZero;
        if (listaDeCaminhoFeliz.length >= 2) {
            nextBoxZero = listaDeCaminhoFeliz[listaDeCaminhoFeliz.length - 2].img[proximaPosDoZero[0]][proximaPosDoZero[1]];                        
        }
        
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                boxSendoDesenhada = tabAlert.img[i][j];                    

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
                    var posicaoDoZero = findPosicaoDoZero(tabAlert.img);                    
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
                
                if (boxSendoDesenhada.value == 0 && (nextBoxZero == null || (boxSendoDesenhada.x == nextBoxZero.x && boxSendoDesenhada.y == nextBoxZero.y))) {
                    listaDeCaminhoFeliz.pop();
                }
                
                desenhaBox(boxSendoDesenhada);
            }
    
    }
}

function desenhaBox(b, proxBox) {    
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

var listaDeCaminhoFeliz = [];
var WIDTH = 50;
var HEIGHT = 50;
var ctx;
var intervalId;

function ordenar() {
    $("#ordenar_btn").attr('disabled', true);

    var img = [[$("#0_0").val().toNum(),$("#0_1").val().toNum(),$("#0_2").val().toNum()],
               [$("#1_0").val().toNum(),$("#1_1").val().toNum(),$("#1_2").val().toNum()],
               [$("#2_0").val().toNum(),$("#2_1").val().toNum(),$("#2_2").val().toNum()]];

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            img[i][j] = new Box(j * (WIDTH + 10), i * (HEIGHT + 10), HEIGHT, WIDTH, img[i][j]);
        }
    }

    var estadoRaiz = new Estado(null,img,0);

    var fila = [];
    fila.push(estadoRaiz);

    var achou = false;
    var nivelAtual = 0;

    var tabuleiro;
    while (!achou) {
        tabuleiro = fila.shift();
        achou = ehFinal(tabuleiro.img);
        nivelAtual = tabuleiro.nivel;

        populaOpcoes(tabuleiro, nivelAtual).map(function(opt) {
            fila.push(opt);
        });
    }


    var tabuleiroAnterior = tabuleiro;
    while (tabuleiroAnterior != null) {
        listaDeCaminhoFeliz.push(tabuleiroAnterior);
        tabuleiroAnterior = tabuleiroAnterior.deOndeVim;
    }

    var c = $("#canvas")[0];
    ctx = c.getContext("2d");
    ctx.font = "bold 20px arial";

    intervalId = setInterval(desenha, 50);
}

String.prototype.toNum = function(){
    return parseInt(this, 10);
}
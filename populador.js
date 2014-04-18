/**
 * Created by henrique on 18/04/14.
 */

function moveParaCimaTabuleiro(img) {
    var posicaoDoZero = findPosicaoDoZero(img);
    var iDoZero = posicaoDoZero[0];
    var jDoZero = posicaoDoZero[1];

    if (iDoZero == 0) {
        return null;//nao tem tab pra cima
    } else {
        var valorDeCima = img[iDoZero - 1][jDoZero];
        img[iDoZero][jDoZero] = valorDeCima;
        img[iDoZero - 1][jDoZero] = 0;
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
        var valorDeBaixo = img[iDoZero + 1][jDoZero];
        img[iDoZero][jDoZero] = valorDeBaixo;
        img[iDoZero + 1][jDoZero] = 0;
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
        var valorEsq = img[iDoZero][jDoZero - 1];
        img[iDoZero][jDoZero] = valorEsq;
        img[iDoZero][jDoZero - 1] = 0;
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
        var valorDir = img[iDoZero][jDoZero + 1];
        img[iDoZero][jDoZero] = valorDir;
        img[iDoZero][jDoZero + 1] = 0;
        return img;
    }
}

function populaOpcoes(img) {
    var cima = moveParaCimaTabuleiro(img.clone());
    var baixo = moveParaBaixoTabuleiro(img.clone());
    var esq = moveParaEsqTabuleiro(img.clone());
    var dir = moveDirTabuleiro(img.clone());

    return [cima, baixo, esq, dir];
}


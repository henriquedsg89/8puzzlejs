/**
 * Created by henrique on 02/04/14.
 */
var WIDTH = 50;
var HEIGHT = 50;
var ctx;
var intervalId;
var estadoSendoLido;

function ordenar() {

    $("#ordenar_btn").attr('disabled', true);
    var usarManhattan = $("#algor").val() == 2;
    //algor 2 => manhattan


    var img = [
        [$("#0_0").val().toNum(), $("#0_1").val().toNum(), $("#0_2").val().toNum()],
        [$("#1_0").val().toNum(), $("#1_1").val().toNum(), $("#1_2").val().toNum()],
        [$("#2_0").val().toNum(), $("#2_1").val().toNum(), $("#2_2").val().toNum()]
    ];

    var numInversoes = calcNumInversoes(img);
    if (numInversoes % 2 != 0) {//se o num de inversoes for impar, nao eh solucionavel
        alert("Tabuleiro nao solucionavel, numero de inversoes(" + numInversoes + ") e impar. Modifique as entradas.");
        $("#ordenar_btn").attr('disabled', false);
        return;
    } else if (numInversoes > 5) {
        if (!confirm("Uhmmmmm, numero de inversoes(" + numInversoes + ") bem grande. Tem certeza que quer continuar?" +
            " Melhor usar A*")) {
            $("#ordenar_btn").attr('disabled', false);
            return;
        }

    }

    var iniciadoEm = new Date().getTime();

    estadoSendoLido = new Estado(null, img, 0, usarManhattan ? calculaManhattan(img) : 0);

    var filaEstados = [];
    var numEstadosGerados = 0;

    while (!ehFinal(estadoSendoLido.img.clone())) {
        populaOpcoes(estadoSendoLido.img.clone()).map(function(novaImg) {

            if (novaImg != null) {
                var novoEstado = new Estado(estadoSendoLido, novaImg.clone(), estadoSendoLido.nivel + 1,
                    usarManhattan ? calculaManhattan(novaImg) : 0);

                if (!ehRepetido(novoEstado)) {
                    filaEstados.push(novoEstado);
                    numEstadosGerados++;
                }
            }
        });

        if(filaEstados.length % 10000 == 0) {
            console.log("Tamanho da fila = " + filaEstados.length + ", num de estados gerados " + numEstadosGerados);
        }

        if (usarManhattan) {
            filaEstados.sort(sortManhatan);
        }
        estadoSendoLido = filaEstados.shift();
    }

    $("#ordenado").css("visibility", "visible");
    $("#niveis").text(estadoSendoLido.nivel);
    $("#demorou").text((new Date().getTime() - iniciadoEm));
    $("#numEstados").text(numEstadosGerados);

    console.log("Done");
    filaEstados = null;

    alert("Resolvido! A partir de agora sera exibido a sequencia de movimentos.");

    iniciaBoxes();
    intervalId = setInterval(desenha, 50);
}

function sortManhatan(estA, estB) {
    return estA.custo - estB.custo;
}

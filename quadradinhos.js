/**
 * Created by henrique on 02/04/14.
 */
var WIDTH = 50;
var HEIGHT = 50;
var ctx;
var intervalId;
var estadoFinal;

function ordenar() {
    $("#ordenar_btn").attr('disabled', true);

    var img = [
        [$("#0_0").val().toNum(), $("#0_1").val().toNum(), $("#0_2").val().toNum()],
        [$("#1_0").val().toNum(), $("#1_1").val().toNum(), $("#1_2").val().toNum()],
        [$("#2_0").val().toNum(), $("#2_1").val().toNum(), $("#2_2").val().toNum()]
    ];

    var filaImgs = [];
    filaImgs.push(img.clone());
    var filaEstados = [];
    filaEstados.push(new Estado(filaImgs.clone()));

    estadoFinal = filaEstados.shift();

    while (!ehFinal(estadoFinal.filaImgs.last())) {
        populaOpcoes(estadoFinal.filaImgs.last().clone()).map(function(novaImg) {
            if (novaImg != null) {
                var novasImgs = estadoFinal.filaImgs.clone();
                novasImgs.push(novaImg);
                var newEstado = new Estado(novasImgs);
                filaEstados.push(newEstado);
            }
        });

        if(filaEstados.length % 1000 == 0) {
            console.log(filaEstados.length);
        }
        if (filaEstados.length > 1000000) {
            console.log(filaEstados.length + " break");
            return;
        }

        estadoFinal = filaEstados.shift();
    }
    console.log("Done");
    filaEstados = null;

    var c = $("#canvas")[0];
    ctx = c.getContext("2d");
    ctx.font = "bold 20px arial";

    iniciaBoxes();
    intervalId = setInterval(desenha, 50);
}

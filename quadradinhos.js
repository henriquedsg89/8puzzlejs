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

    estadoFinal = new Estado(null, img);

    var filaEstados = [];

    while (!ehFinal(estadoFinal.img.clone())) {
        populaOpcoes(estadoFinal.img.clone()).map(function(novaImg) {
            if (novaImg != null) {
                filaEstados.push(new Estado(estadoFinal, novaImg.clone()));
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

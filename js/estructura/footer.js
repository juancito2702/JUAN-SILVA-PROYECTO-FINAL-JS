//APLICACIÓN DE ANIMACIÓN CON IMÁGEN DE SALUDO-----------------------------------------------------------------------------------------------------------------

$("#juancito27").hide();

$("#muestraOculta").click(function() {
    $("#juancito27").fadeToggle(1000, function() {
        if ($("#muestraOculta").html() == "Ocultar Imagen") {
            $("#muestraOculta").html("Mostrar Imagen");
        } else {
            $("#muestraOculta").html("Ocultar Imagen");
        }
    });
})
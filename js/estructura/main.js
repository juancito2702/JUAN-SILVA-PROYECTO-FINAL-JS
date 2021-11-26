$("#main").append(` <h1>PREGÚNTALE A JUANCITO</h1>

            <div class="main__botones">
                      <button class="btn main__botones__click" id="botonTodos">TODAS LAS MARCAS.</button>
                      <button class="btn main__botones__click" id="soloSika">MARCA SIKA</button>
                      <button class="btn main__botones__click" id="soloSoudal">MARCA SOUDAL</button>
                      <button class="btn main__botones__click" id="soloTopex">MARCA TOPEX</button>
                      <button class="btn main__botones__click" id="soloEspuma">ESPUMAS EXPANSIVAS</button>
            </div>
                        
            <div class="main__productos" id="tienda">
            </div>`);



//APLICACIÓN DE ANIMACIÓN CONCATENADA EN INFORMACIÓN DE SILICONAS--------------------------------------------------------------------------------------------


$("#muestraParrafo").click(function() {
    $("#parrafo").fadeIn("slow");
});

$("#ocultaParrafo").click(function() {
    $("#parrafo").fadeOut("fast", function() {});
});




//APLICACIÓN DE AJAX- UTILIZANDO UN API DE PERSONAS---------------------------------------------------------------------------------------------------------------


function clientesFrecuentes() {
    const URLGET = "https://reqres.in/api/users?page=2";
    $.get(URLGET).done(function(respuesta, estado) {
        console.log("La Api de Clientes Frecuentes es: " + estado);

        if (estado == "success") {
            let arrayLibros = respuesta.data;
            arrayLibros.forEach(empleado => {
                $("#equipo").append("<tr><td>" + empleado.first_name + "<tr><td>" + empleado.email + "</td><td><img src=" + empleado.avatar + "></td></tr>");
            });
        }
    });
}
clientesFrecuentes();




// BOTÓN SORPRESA DE ESCUELA DIGITAL, USANDO LA LIBRERÍA DE JQUERY--------------------------------------------------------------------------------

$("#boton").prepend("<button class=' btn-danger' onclick='escuela();'>ESCUELA DIGITAL 2DA GENERACIÓN. PRESIONA AQUI PARA VER SORPRESA..!!!!</button>");

const escuela = () => {
    Swal.fire({
        title: 'DIOS JESUCRISTO Los Bendiga 💖😊',
        text: 'CURSO DE JAVASCRIPT- NOVIEMBRE 2021.',
        imageUrl: 'img/grupojavascript.jfif',
        imageWidth: 500,
        imageHeight: 500,
        imageAlt: 'GRUPO DE JAVASCRIPT',
    })
}
//MIS VARIABLES Y LOS PRODUCTOS DEL JSON--------------------------------------------------------------------------------------------------

let id = 1;
let catalogo = [];
let carrito;
let cantEnCarrito;
let precioTotal;
let txt;
const URLJSON = "./data/productos.json";



//LOCAL STORAGE--------------------------------------------------------------------------------------------------------------------------


const iniciarLocalStorage = () => {
    localStorage.getItem("carrito") == undefined ?
        (carrito = []) :
        (carrito = JSON.parse(localStorage.getItem("carrito")));

    localStorage.getItem("cantEnCarrito") == undefined ?
        (cantEnCarrito = 0) :
        (cantEnCarrito = JSON.parse(localStorage.getItem("cantEnCarrito")));

    localStorage.getItem("precioTotal") == undefined ?
        (precioTotal = 0) :
        (precioTotal = JSON.parse(localStorage.getItem("precioTotal")));

    $("#itemsCarrito").text(cantEnCarrito);
};


//ACTUALIZACIÓN EN EL LOCAL STORAGE----------------------------------------------------------------------------------------------------

const actualizarLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("cantEnCarrito", JSON.stringify(cantEnCarrito));
    localStorage.setItem("precioTotal", JSON.stringify(precioTotal));
    $("#itemsCarrito").text(cantEnCarrito);
};


//BOTONES MOSTRAR TODOS Y AGREGAR AL CARRITO-------------------------------------------------------------------------------------------


const clickMostrarTodos = () => {
    $(`#botonTodos`).click(() => {
        $(".main__botones__click").prop("disabled", false);
        $(`#botonTodos`).prop("disabled", true);

        $("#tienda").empty();
        animarLoadingTienda();
        crearProductosEnCatalogoDOM();
        clickAgregarCarrito();
    });
};


// MOSTRAR TODOS LOS PRODUCTOS DE LA MARCA SIKA------------------------------------------------------------------------------------

const clickMostrarSika = () => {
    $(`#soloSika`).click(() => {
        $(".main__botones__click").prop("disabled", false);
        $(`#soloSika`).prop("disabled", true);

        $("#tienda").empty();
        animarLoadingTienda();
        crearProductosEnCatalogoDOM("sika");
        clickAgregarCarrito();
    });
};

// MOSTRAR TODOS LOS PRODUCTOS DE LA MARCA SOUDAL-----------------------------------------------------------------------------------

const clickMostrarSoudal = () => {
    $(`#soloSoudal`).click(() => {
        $(".main__botones__click").prop("disabled", false);
        $(`#soloSoudal`).prop("disabled", true);

        $("#tienda").empty();
        animarLoadingTienda();
        crearProductosEnCatalogoDOM("soudal");
        clickAgregarCarrito();
    });
};

// MOSTRAR TODOS LOS PRODUCTOS DE LA MARCA TOPEX----------------------------------------------------------------------------------

const clickMostrarTopex = () => {
    $(`#soloTopex`).click(() => {
        $(".main__botones__click").prop("disabled", false);
        $(`#soloTopex`).prop("disabled", true);

        $("#tienda").empty();
        animarLoadingTienda();
        crearProductosEnCatalogoDOM("topex");
        clickAgregarCarrito();
        $(`.main__botones__click`).prop("disable", false);
    });
};

// MOSTRAR TODOS LOS PRODUCTOS DEL TIPO ESPUMA EXPANSIVA--------------------------------------------------------------------------

const clickMostrarEspuma = () => {
    $("#yourElesoloEspumament").attr("title", "mostrar todos");
    $(`#soloEspuma`).click(() => {
        $(".main__botones__click").prop("disabled", false);
        $(`#soloEspuma`).prop("disabled", true);

        $("#tienda").empty();
        animarLoadingTienda();
        crearProductosEnCatalogoDOM("espuma");
        clickAgregarCarrito();
    });
};

//RECIBIENDO  LOS DATOS DEL JSON---------------------------------------------------------------------------------------------------

const clickAgregarCarrito = () => {
    $.ajax({
        method: "GET",
        url: URLJSON,
        success: (respuesta) => {
            for (let i = 1; i <= respuesta.length; i++) {

                $(`#botonComprar${i}`).click(() => {
                    estaEnCarrito(i);
                    mensajeAgregado();
                });

                $(`#botonComprarModal${i}`).click(() => {
                    estaEnCarrito(i);
                    mensajeAgregado();
                });
            }
        },
    });
};

//MENSAJE DE PRODUCTO AGREGADO AL CARRITO DE COMPRAS---------------------------------------------------------------------------

const mensajeAgregado = () => {
    $("#contenedorMensajeAgregado").append(
        `<div class="confirmacion">
        <p>AGREGADO..!!!.<p>
    </div>`
    );
};

const estaEnCarrito = (idRepetido) => {
    let producto = carrito.find((producto) => producto.id == idRepetido);
    cantEnCarrito = JSON.parse(localStorage.getItem("cantEnCarrito"));
    if (producto) {
        producto.cantidad += 1;
        cantEnCarrito += 1;
        precioTotal += producto.precio;
        actualizarLocalStorage();
    } else {
        agregarCarrito(idRepetido);
    }
};

//AGREGA EL PRODUCTO AL CARRITO Y AUMENTA EN 1 LA CANTIDAD DE ITEMS-------------------------------------------------------------------

const agregarCarrito = (idProducto) => {
    let producto = catalogo.find((producto) => producto.id == idProducto);
    cantEnCarrito = JSON.parse(localStorage.getItem("cantEnCarrito"));
    carrito.push(producto);
    cantEnCarrito += 1;
    precioTotal += producto.precio;
    actualizarLocalStorage();
};



//MI ICONO DE CARRITO DE COMPRAS-----------------------------------------------------------------------------------------------------

const clickIconoCarrito = () => {
    $("#iconoCarrito").click(() => {
        actualizarListaCarrito();
    });
};

//LIMPIAR EL CARRITO DE COMPRAS------------------------------------------------------------------------------------------------------

const actualizarListaCarrito = () => {
    actualizarLocalStorage();
    $("#listaDelCarrito").empty();
    crearListaCarritoDOM();
    activarBotonesVaciarContinuar();
};


const activarBotonesVaciarContinuar = () => {
    if (carrito.length == 0) {
        $("#continuarCompra").prop("disabled", true);
        $("#vaciarCarrito").prop("disabled", true);
    } else {
        $("#continuarCompra").prop("disabled", false);
        $("#vaciarCarrito").prop("disabled", false);
    }
};


// SI HAY MAS DE 1 ITEM DEL MISMO PRODUCTO, RESTAR 1 EN CANTIDAD-------------------------------------------------------------------------------------

const clickBorrarItem = (item) => {
    cantEnCarrito = JSON.parse(localStorage.getItem("cantEnCarrito"));

    $(`#botonEliminar${item.id}`).click(() => {
        item.cantidad > 1 ?
            (item.cantidad -= 1) :
            item.cantidad == 1 ?
            (carrito = carrito.filter((prodEliminar) => prodEliminar.id != item.id)) :
            undefined;

        cantEnCarrito -= 1;
        precioTotal -= item.precio;

        actualizarListaCarrito();
    });
};

// CONST PARA CAMBIAR LA CANTIDAD DE PRODUCTOS EN EL CARRITO, SIEMPRE QUE SEA UN NÚMERO--------------------------------------------------------------

const clickModificarCantidad = (item) => {
    cantEnCarrito = JSON.parse(localStorage.getItem("cantEnCarrito"));
    let cantAnterior = parseInt($(`#inputCantidad${item.id}`).val());

    $(`#inputCantidad${item.id}`).change(() => {
        let cantNueva = parseInt($(`#inputCantidad${item.id}`).val());

        if (cantNueva <= 0 || isNaN(cantNueva) || cantNueva > 100) {
            $(`#inputCantidad${item.id}`).val(cantAnterior);
        } else {
            if (cantNueva > cantAnterior) {
                cantEnCarrito += cantNueva - cantAnterior;
                precioTotal += (cantNueva - cantAnterior) * item.precio;
            } else {
                cantEnCarrito -= cantAnterior - cantNueva;
                precioTotal -= (cantAnterior - cantNueva) * item.precio;
            }

            let producto = carrito.find((producto) => producto == item);

            producto.cantidad = cantNueva;

            actualizarListaCarrito();
        }
    });
};

//ELIMINAR SI HAY PRODUCTOS EN EL CARRITO DE COMPRAS---------------------------------------------------------------------------------------------


const clickVaciarCarrito = () => {
    $("#vaciarCarrito").click(() => {
        vaciarCarrito();
    });
};


// FORMULARIO DE FINALIZAR COMPRA-----------------------------------------------------------------------------------------------------------------


const clickContinuar = () => {
    $("#continuarCompra").click(() => {
        $("#valorEnvio").html(0);
        $("#valorTotalConEnvio").html(precioTotal);
        localStorage.setItem("precioTotalConEnvio", precioTotal);

        animarDatosContacto();
        cambiosEnEnviar();

        $("#finalizarCompra").prop("disabled", true);
    });
};

//ACTUALIZACIÓN DE PRECIO TOTAL CON FLETE DE ENVÍO--------------------------------------------------------------------------------------------------

const cambiosEnEnviar = () => {
    $("#clickRetiro").click(() => {
        $("#valorEnvio").html(0);
        $("#valorTotalConEnvio").html(precioTotal);

        localStorage.setItem("precioTotalConEnvio", precioTotal);
        localStorage.setItem("envio", 0);

        $("#finalizarCompra").prop("disabled", false);
    });

    $("#clickEnvio").click(() => {
        $("#valorEnvio").html(100);
        $("#valorTotalConEnvio").html(precioTotal + 100);

        localStorage.setItem("precioTotalConEnvio", precioTotal + 100);
        localStorage.setItem("envio", 100);

        $("#finalizarCompra").prop("disabled", false);
    });
};

// CONST PARA FINALIZAR LA COMPRA, LUEGO DE VALIDAR TODOS LOS DATOS DEL FORMULARIO-------------------------------------------------------------------

const clickFinalizarCompra = () => {
    $("#finalizarCompra").click(() => {
        txt = "";

        if ($(".infoEnviar").val() != "") {
            for (const i of carrito) {
                txt += `${i.cantidad} x ${i.categoria} ${i.descripcion} = ${
          i.precio * i.cantidad
        } \n`;
            }
            txt += `\n Total segun metodo de envio: $${localStorage.getItem(
        "precioTotalConEnvio"
      )} \n `;
            console.log(txt);
            vaciarCarrito();
        } else {
            alert("COMPLETE LOS DATOS");
        }
    });
};


//CONST PARA LIMPIAR MI CARRITO DE COMPRAS-----------------------------------------------------------------------------------------------------------

const vaciarCarrito = () => {
    carrito = [];
    precioTotal = 0;
    cantEnCarrito = 0;
    localStorage.clear();

    catalogo.forEach((item) => {
        item.cantidad = 1;
    });

    $("#itemsCarrito").text(0);

    $("#listaDelCarrito").empty();
};

//LLAMADO A TODOS LOS BOTONES POR MARCAS Y DE FINALIZAR COMPRA---------------------------------------------------------------------------------------

const botones = () => {
    clickMostrarTodos();
    clickMostrarSika();
    clickMostrarSoudal();
    clickMostrarTopex();
    clickMostrarEspuma();
    clickAgregarCarrito();
    clickIconoCarrito();
    clickVaciarCarrito();
    clickContinuar();
    clickFinalizarCompra();
};

const app = () => {
    iniciarLocalStorage();
    crearProductosEnCatalogoDOM();
    botones();
};

$(document).ready(function() {
    app();
    animarLoading();
    animarTitulo();
    animarTienda();
});
const { getAllUsuarios, getDetallesUsuario, cambiarRol, nuevoUsuario } = require('./controllers/clientes.controller.js');
const { verInformacionPelicula, verPelisCatalogo } = require('./controllers/peliculas.controller.js');
const { cancelarReserva, comprarBoleta } = require('./controllers/boletas.controller.js');
const { verDisponibilidadAsientos } = require('./controllers/funciones.controller.js');

async function casoUso1() {
    let nuevoCliente = {
        nombre: '',
        apellido: '',
        nick: '',
        email: '',
        telefono: '',
        id_tarjeta: '',
        admin: false
    };
    let res = await nuevoUsuario(nuevoCliente);
    console.log(res);
}

async function casoUso2() {
    let res = await verPelisCatalogo();
    console.log(res);
}

async function casoUso3() {
    let idPeli = '66a8951e6cf86599a0039395';

    let res = await verInformacionPelicula(idPeli);
    console.log(res);
}

async function casoUso4() {
    let idFuncion = '66a95317e5d7725b81bbbbda';
    let idCliente = '66ac9e77440bea4a371bd6c3';
    let asiento = 'A1';
    let pago = false;

    let res = await comprarBoleta(idFuncion, idCliente, asiento, pago);
    console.log(res);
}


async function casoUso5() {
    let idFuncion = '66a95317e5d7725b81bbbbda';

    let res = await verDisponibilidadAsientos(idFuncion);
    console.log(res);
}

async function casoUso7() {
    let idBoleta = '66aca3bdc0db60fc35e8f490';

    let res = await cancelarReserva(idBoleta);
    console.log(res);
}


async function casoUso10() {
    let nick = 'admin';

    let res = await getDetallesUsuario(nick);
    console.log(res);
}

async function casoUso11(){
    let nick = "sneatx"
    let rol = "vip"

    let res = await cambiarRol(nick, rol)
    console.log(res)
}

async function casoUso12() {
    let res = await getAllUsuarios();
    console.log(res);
}


// Crear usuario: 
//casoUso1()

// Consultar todas las películas disponibles
//casoUso2()

// Consultar información detallada sobre una película
//casoUso3()

// Compra de boletos
//casoUso4()

// Consulta de disponibilidad de asientos
//casoUso5()

// Cancelar reserva de asientos
//casoUso7()

// Obtener Detalles de Usuario
//casoUso10()

// Actualizar Rol de Usuario
//casoUso11()

// Listar Usuarios
//casoUso12()


const socket = io();
const label = $('#lblNuevoTicket');
socket.on('connect', () => {
    console.log('Conectado al servidor');
});
socket.on('disconnect', () => {
    console.log('Perdimos conexion con el servidor');
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});
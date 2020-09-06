const socket = io();
const labelTicket = $('small');
socket.on('connect', () => {
    console.log('Conectado al servidor');
});
socket.on('disconnect', () => {
    console.log('Perdimos conexion con el servidor');
});

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');
$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', () => {
    socket.emit('atenderTicket', { escritorio }, (data) => {
        const { numero } = data;
        if (numero) {
            labelTicket.text('Ticket ' + numero);
        } else {
            labelTicket.text(data);
        }
    });
});
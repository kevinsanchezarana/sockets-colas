const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        const siguienteTicket = ticketControl.siguienteTicket();
        callback(siguienteTicket);
    });

    client.emit('estadoActual', { actual: ticketControl.getUltimoTicket(), ultimos4: ticketControl.getUltimos4() });

    client.on('atenderTicket', (data, callback) => {
        const { escritorio } = data;
        if (!escritorio) {
            return callback({ err: true, mensaje: 'El escritorio es necesario' });
        }
        const atenderTicket = ticketControl.atenderTicket(escritorio);
        callback(atenderTicket);

        //Actualizar / notificar cambios en los ultimos 4 a todos los clientes conectados
        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });

    });

});
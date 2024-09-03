// socket.js
import io from 'socket.io-client';

export const socket = io('192.168.0.6:5000'); // URL del bavkend, no poner localhost porque no va a andar en el celular

// Agrega un log para verificar la conexión
socket.on('connect', () => {
  console.log('Conectado al servidor Socket.IO');
});

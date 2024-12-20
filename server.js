const express = require('express'); // Importa Express
const app = express(); // Crea la app de Express

// Define la carpeta estática que contiene los archivos públicos
app.use(express.static('public'));

// Sirve el archivo manifest.json
app.get('/manifest.json', (req, res) => {
    res.sendFile(__dirname + '/manifest.json');
});

// Sirve el archivo sw.js
app.get('/sw.js', (req, res) => {
    res.sendFile(__dirname + '/sw.js');
});


// Configura el puerto del servidor
const PORT = 3000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

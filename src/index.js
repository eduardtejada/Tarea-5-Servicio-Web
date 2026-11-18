import express from 'express';
import cors from 'cors';
import { listarContactos, guardarContacto } from './contactosStore.js';

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const manejarListarContactos = (req, res) => {
  try {
    const contactos = listarContactos();
    res.status(200).json(contactos);
  } catch (error) {
    res.status(500).json({
      error: 'Error interno al obtener el listado de contactos.'
    });
  }
};

const manejarGuardarContacto = (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body || {};

    const nombreLimpio = typeof nombre === 'string' ? nombre.trim() : '';
    const apellidoLimpio = typeof apellido === 'string' ? apellido.trim() : '';
    const telefonoLimpio = typeof telefono === 'string' ? telefono.trim() : '';

    if (!nombreLimpio || !apellidoLimpio || !telefonoLimpio) {
      return res.status(400).json({
        error: 'Los campos nombre, apellido y telefono son obligatorios.'
      });
    }

    const contactoGuardado = guardarContacto({
      nombre: nombreLimpio,
      apellido: apellidoLimpio,
      telefono: telefonoLimpio
    });

    res.status(201).json({
      mensaje: 'Contacto almacenado correctamente.',
      contacto: contactoGuardado
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno al almacenar el contacto.'
    });
  }
};

app.get('/', manejarListarContactos);
app.get('/contactos', manejarListarContactos);
app.get('/agenda.php', manejarListarContactos);

app.post('/', manejarGuardarContacto);
app.post('/contactos', manejarGuardarContacto);
app.post('/agenda.php', manejarGuardarContacto);

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada.'
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'El cuerpo de la peticion no contiene JSON valido.'
    });
  }
  res.status(500).json({
    error: 'Error inesperado en el servidor.'
  });
});

app.listen(PUERTO, () => {
  console.log(`Servicio Web de Agenda ejecutandose en http://localhost:${PUERTO}`);
});

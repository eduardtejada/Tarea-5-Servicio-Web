import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_DATOS = path.join(__dirname, '..', 'data', 'contactos.json');

const CONTACTOS_INICIALES = [
  { nombre: 'Raydelto', apellido: 'Hernandez', telefono: '809-555-2222' },
  { nombre: 'Ana', apellido: 'Perez', telefono: '809-555-0101' },
  { nombre: 'Carlos', apellido: 'Reyes', telefono: '829-857-2955' }
];

function asegurarArchivoDatos() {
  const directorio = path.dirname(RUTA_DATOS);
  if (!fs.existsSync(directorio)) {
    fs.mkdirSync(directorio, { recursive: true });
  }
  if (!fs.existsSync(RUTA_DATOS)) {
    fs.writeFileSync(RUTA_DATOS, JSON.stringify(CONTACTOS_INICIALES, null, 2), 'utf8');
  }
}

export function listarContactos() {
  asegurarArchivoDatos();
  const contenido = fs.readFileSync(RUTA_DATOS, 'utf8');
  const datos = JSON.parse(contenido);
  return Array.isArray(datos) ? datos : [];
}

export function guardarContacto({ nombre, apellido, telefono }) {
  const contactos = listarContactos();
  const nuevoContacto = { nombre, apellido, telefono };
  contactos.push(nuevoContacto);
  fs.writeFileSync(RUTA_DATOS, JSON.stringify(contactos, null, 2), 'utf8');
  return nuevoContacto;
}

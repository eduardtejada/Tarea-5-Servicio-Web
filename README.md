# Servicio Web de Agenda (Express)

Servicio web desarrollado con Node.js y Express para la gestión básica de contactos telefónicos, replicando las operaciones de listado y almacenamiento de `http://www.raydelto.org/agenda.php`.

## Operaciones Disponibles

- **Listar contactos (`GET`)**:
  - Rutas: `/`, `/contactos`, `/agenda.php`
  - Respuesta (`200 OK`): Arreglo JSON de contactos con los campos `nombre`, `apellido` y `telefono`.

- **Almacenar contacto (`POST`)**:
  - Rutas: `/`, `/contactos`, `/agenda.php`
  - Cuerpo (`application/json`):
    ```json
    {
      "nombre": "Juan",
      "apellido": "Perez",
      "telefono": "809-555-0199"
    }
    ```
  - Respuesta (`201 Created`): Confirmación y objeto del contacto almacenado.

## Instalación y Ejecución

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor:
   ```bash
   npm start
   ```

El servicio quedará disponible por defecto en `http://localhost:3000`.

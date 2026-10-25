# Registro de pedidos de Coquito Amarillo

Aplicación de aula para registrar pedidos desde un formulario web y guardarlos en `Datos.csv` y MySQL.

El informe completo listo para completar está en `ENTREGA_UNIDAD_2_COMPLETA.docx`; el borrador en Markdown está en `ENTREGA_UNIDAD_2.md`. Para regenerar el Word en Windows, ejecuta `./generar-entrega.ps1` desde PowerShell.

## Requisitos

- Node.js 18 o superior y npm.
- MySQL en ejecución.

## Instalación

1. Crea la base de datos y la tabla ejecutando `database/schema.sql` en MySQL Workbench o en la consola de MySQL.
2. Instala las dependencias con `npm install`.
3. Copia `.env.example` como `.env` y configura el usuario, contraseña y puerto de tu instalación de MySQL.
4. Inicia el servidor con `npm start` y abre `http://localhost:3000`.

El proyecto incluye `Datos.csv` con cinco registros de prueba exigidos por la guía. Cada pedido nuevo se agrega al final. No edites ni compartas el archivo `.env` con credenciales reales.

## Pruebas

Ejecuta `npm test`. Las pruebas de validación, formato CSV y endpoint HTTP no necesitan conexión a MySQL.

## Actividades formativas de la Unidad 2

Los ejercicios están separados de la aplicación principal dentro de `actividades/`:

- Actividad 1: `node actividades/actividad1-tipos.js` (tipos de datos, `typeof`, objeto y template literal).
- Actividad 2: `node actividades/actividad2-ciclos.js` (inventario y ciclos `for`, `for...of` y `while`).
- Actividad 3: `node actividades/actividad3-decisiones.js` (clasificación de stock, descuentos con `switch` y tabla de casos en `actividad3-casos-prueba.md`).
- Actividad 4: abre `actividades/actividad4-panel.html` en el navegador y pulsa **Consultar inventario** para ver la interacción DOM, `map`, `filter`, `reduce` y el error controlado con `try/catch`.
- Actividad 5: `node actividades/actividad5-clientes.js` (herencia, polimorfismo y campo privado); el diagrama está en `actividad5-diagrama.md`.

Guarda capturas de la consola de las actividades 1, 2, 3 y 5, y del navegador para la actividad 4, como evidencia para la entrega.

## Estructura

- `public/`: formulario HTML, estilos y código del navegador.
- `src/RegistroPedido.js`: clase que representa y valida un pedido.
- `src/PersistenciaPedidos.js`: escritura coordinada en MySQL y CSV.
- `src/validaciones.js`: validación del lado del servidor.
- `database/schema.sql`: creación de la base de datos y tabla.
- `test/`: pruebas automatizadas.

## Recorrido de un pedido

El navegador envía el formulario a `POST /api/pedidos`. El servidor vuelve a validar los datos, crea un `RegistroPedido` y los inserta en MySQL dentro de una transacción. También agrega una fila correctamente escapada a `Datos.csv`; si falla una de las escrituras, intenta revertir la otra y responde con un mensaje de error.

## GitHub Pages

La raíz incluye `index.html` para publicar una demostración estática del formulario. Pages no ejecuta Express ni se conecta a MySQL: los pedidos de esa página se guardan únicamente en el almacenamiento local del navegador. Para probar persistencia real, ejecutar la versión Node.js con `npm start` y configurar MySQL.
// Estos valores representan los datos básicos que podríamos guardar de un producto.
const nombre = "Café Especial Coquito Amarillo";
const precio = 18500;
const disponible = true;
let descuento;
const proveedor = null;
const codigoInterno = 9007199254740993n;
const etiquetaPrivada = Symbol("inventario");

// El objeto reúne los datos anteriores en una sola estructura.
const producto = {
  nombre,
  precio,
  disponible,
  descuento,
  proveedor,
  codigoInterno,
  etiquetaPrivada
};

// Object.entries nos deja recorrer cada nombre y valor para revisar su tipo.
// Ojo: JavaScript devuelve "object" para null; es un detalle histórico del lenguaje.
console.log("Tipos de datos del producto:");
for (const [clave, valor] of Object.entries({
  nombre,
  precio,
  disponible,
  descuento,
  proveedor,
  codigoInterno,
  etiquetaPrivada
})) {
  console.log(`${clave}: ${typeof valor}`);
}

// El template literal mezcla texto fijo con valores del objeto.
console.log(`Objeto producto: ${typeof producto}`);
console.log(`${producto.nombre} cuesta $${producto.precio.toLocaleString("es-CO")} y ${producto.disponible ? "está disponible" : "no está disponible"}.`);
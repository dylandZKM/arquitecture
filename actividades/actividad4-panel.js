// Este inventario pequeño permite ver cada operación sin recorrer demasiados datos.
const inventario = [
  { id: 1, nombre: "Café especial", precio: 18500, stock: 12 },
  { id: 2, nombre: "Café tradicional", precio: 14500, stock: 80 },
  { id: 3, nombre: "Café descafeinado", precio: 19500, stock: 0 }
];

// La destructuración recibe solo lo que necesitamos para armar el texto.
const formatearProducto = ({ nombre, precio }) =>
  `${nombre} - $${precio.toLocaleString("es-CO")}`;

const obtenerProducto = (productos, id) => {
  try {
    const producto = productos.find((elemento) => elemento.id === id);
    if (!producto) throw new Error(`No se encontró el producto con id ${id}.`);
    return producto;
  } catch (error) {
    // Un identificador que no existe se informa y no detiene la página.
    console.error("Error al consultar:", error.message);
    return null;
  }
};

// map crea una lista nueva con el precio aumentado por el IVA del 19 %.
const calcularPreciosConIva = (productos) =>
  productos.map(({ nombre, precio }) => ({ nombre, precioConIva: precio * 1.19 }));

const filtrarStockBajo = (productos) =>
  productos.filter(({ stock }) => stock > 0 && stock < 20);

const calcularValorInventario = (productos) =>
  productos.reduce((total, producto) => total + producto.precio * producto.stock, 0);

// Al pulsar el botón, calculamos el reporte y lo escribimos en el elemento del DOM.
document.getElementById("btnConsultar").addEventListener("click", () => {
  const resultado = document.getElementById("resultado");
  const consultado = obtenerProducto(inventario, 1);
  const precios = calcularPreciosConIva(inventario)
    .map(({ nombre, precioConIva }) => `${nombre}: $${precioConIva.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`)
    .join("\n");
  const stockBajo = filtrarStockBajo(inventario).map((producto) => producto.nombre).join(", ") || "Ninguno";
  const total = calcularValorInventario(inventario);

  resultado.textContent = [
    `Producto consultado: ${consultado ? formatearProducto(consultado) : "No disponible"}`,
    `Precios con IVA:\n${precios}`,
    `Productos con stock bajo: ${stockBajo}`,
    `Valor total del inventario: $${total.toLocaleString("es-CO")}`
  ].join("\n\n");

  // Esta búsqueda intencional de un id inexistente permite observar el try/catch
  // en la consola del navegador, como pide el ejercicio.
  obtenerProducto(inventario, 999);
});
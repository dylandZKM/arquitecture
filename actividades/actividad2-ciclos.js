// Hay cinco productos para poder probar el inventario con datos variados,
// incluido uno agotado.
const inventario = [
  { nombre: "Café especial", precio: 18500, stock: 12 },
  { nombre: "Café tradicional", precio: 14500, stock: 28 },
  { nombre: "Café descafeinado", precio: 19500, stock: 0 },
  { nombre: "Chocolate de mesa", precio: 12000, stock: 18 },
  { nombre: "Panela orgánica", precio: 8500, stock: 35 }
];

// Este for recorre el arreglo por índice y suma precio por unidades disponibles.
let valorTotal = 0;
for (let indice = 0; indice < inventario.length; indice += 1) {
  valorTotal += inventario[indice].precio * inventario[indice].stock;
}

console.log(`Valor total del inventario: $${valorTotal.toLocaleString("es-CO")}`);

// for...of es útil cuando solo necesitamos leer cada producto del arreglo.
for (const producto of inventario) {
  const estado = producto.stock > 0 ? "Disponible" : "Agotado";
  console.log(`${producto.nombre}: ${estado}`);
}

// Simulamos vender las unidades de una promoción y contamos cada vuelta del while.
let unidadesPromocion = 5;
let iteraciones = 0;
while (unidadesPromocion > 0) {
  unidadesPromocion -= 1;
  iteraciones += 1;
}

console.log(`La promoción terminó después de ${iteraciones} iteraciones.`);
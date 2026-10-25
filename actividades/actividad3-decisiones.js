// Las condiciones se revisan de arriba hacia abajo: primero descartamos datos
// imposibles y luego clasificamos los rangos de stock.
function clasificarStock(stock) {
  if (!Number.isFinite(stock) || stock < 0) {
    return "Dato inválido";
  } else if (stock === 0) {
    return "Agotado";
  } else if (stock < 20) {
    return "Stock bajo";
  } else if (stock < 100) {
    return "Stock medio";
  }

  return "Stock alto";
}

// switch compara el tipo de cliente con cada categoría y entrega su porcentaje.
function calcularDescuento(tipoCliente) {
  switch (tipoCliente) {
    case "mayorista":
      return 0.15;
    case "frecuente":
      return 0.10;
    case "nuevo":
      return 0.05;
    default:
      return 0;
  }
}

// Estos casos sirven como una tabla de prueba ejecutable: incluye límites y default.
const casosStock = [
  { entrada: -1, esperada: "Dato inválido" },
  { entrada: 0, esperada: "Agotado" },
  { entrada: 15, esperada: "Stock bajo" },
  { entrada: 50, esperada: "Stock medio" },
  { entrada: 120, esperada: "Stock alto" }
];

const casosDescuento = [
  { entrada: "mayorista", esperada: 0.15 },
  { entrada: "frecuente", esperada: 0.10 },
  { entrada: "nuevo", esperada: 0.05 },
  { entrada: "desconocido", esperada: 0 }
];

const casos = [
  ...casosStock.map((caso) => ({
    funcion: "clasificarStock",
    ...caso,
    obtenida: clasificarStock(caso.entrada)
  })),
  ...casosDescuento.map((caso) => ({
    funcion: "calcularDescuento",
    ...caso,
    obtenida: calcularDescuento(caso.entrada)
  }))
];

// Si una salida no coincide con la esperada, dejamos un código distinto de cero
// para que sea fácil detectar el fallo en la terminal.
console.log("Función | Entrada | Esperada | Obtenida | Resultado");
for (const caso of casos) {
  const resultado = Object.is(caso.esperada, caso.obtenida) ? "OK" : "ERROR";
  console.log(`${caso.funcion} | ${caso.entrada} | ${caso.esperada} | ${caso.obtenida} | ${resultado}`);
  if (resultado === "ERROR") process.exitCode = 1;
}

module.exports = { calcularDescuento, clasificarStock };
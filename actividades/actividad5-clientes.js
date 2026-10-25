class Cliente {
  // El historial queda privado: no se puede modificar desde fuera de la clase.
  #historialCompras;

  constructor(id, nombre, correo) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.#historialCompras = [];
  }

  calcularDescuento() {
    // La clase base representa un cliente sin descuento especial.
    return 0;
  }

  registrarCompra(valor) {
    if (!Number.isFinite(valor) || valor <= 0) {
      throw new Error("El valor de compra debe ser mayor que cero.");
    }
    this.#historialCompras.push(valor);
  }

  obtenerResumenCompras() {
    // Exponemos un resumen, no el arreglo privado completo.
    return {
      cantidad: this.#historialCompras.length,
      total: this.#historialCompras.reduce((suma, valor) => suma + valor, 0)
    };
  }
}

class ClienteFrecuente extends Cliente {
  // Cada subclase redefine el método heredado: eso es polimorfismo.
  calcularDescuento() {
    return 0.10;
  }
}

class ClienteMayorista extends Cliente {
  calcularDescuento() {
    return 0.15;
  }
}

const clientes = [
  new ClienteFrecuente(1, "Ana Pérez", "ana@example.com"),
  new ClienteMayorista(2, "Luis Gómez", "luis@example.com")
];

// El mismo recorrido funciona para ambas clases; cada una calcula su descuento.
for (const cliente of clientes) {
  cliente.registrarCompra(100000);
  const resumen = cliente.obtenerResumenCompras();
  console.log(`${cliente.nombre}: descuento ${cliente.calcularDescuento() * 100}%, compras ${resumen.cantidad}, total $${resumen.total.toLocaleString("es-CO")}`);
}

module.exports = { Cliente, ClienteFrecuente, ClienteMayorista };
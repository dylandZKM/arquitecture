const { validarPedido } = require("./validaciones");

class RegistroPedido {
  constructor({ nombreCliente, producto, cantidad, correo }) {
    const datos = {
      nombreCliente: String(nombreCliente ?? "").trim(),
      producto: String(producto ?? "").trim(),
      cantidad: Number(cantidad),
      correo: String(correo ?? "").trim()
    };
    const errores = validarPedido(datos);

    if (errores.length > 0) {
      const error = new Error(errores.join(" "));
      error.name = "ValidationError";
      throw error;
    }

    this.nombreCliente = datos.nombreCliente;
    this.producto = datos.producto;
    this.cantidad = datos.cantidad;
    this.correo = datos.correo;
    this.fechaRegistro = new Date();
  }

  obtenerFechaSql() {
    return this.fechaRegistro.toISOString().slice(0, 19).replace("T", " ");
  }

  obtenerFilaCsv() {
    return [
      this.nombreCliente,
      this.producto,
      this.cantidad,
      this.correo,
      this.fechaRegistro.toISOString()
    ];
  }
}

module.exports = { RegistroPedido };
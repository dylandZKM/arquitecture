function validarPedido(datos) {
  const errores = [];

  if (!datos.nombreCliente) {
    errores.push("El nombre del cliente es obligatorio.");
  }

  if (!datos.producto) {
    errores.push("El producto es obligatorio.");
  }

  if (!Number.isInteger(datos.cantidad) || datos.cantidad < 1) {
    errores.push("La cantidad debe ser un número entero mayor que cero.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
    errores.push("Ingresa un correo electrónico válido.");
  }

  return errores;
}

module.exports = { validarPedido };
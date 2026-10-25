const path = require("node:path");
const express = require("express");
const { RegistroPedido } = require("./RegistroPedido");

function crearAplicacion({ guardarPedido }) {
  const aplicacion = express();
  aplicacion.use(express.json({ limit: "10kb" }));
  aplicacion.use(express.static(path.join(__dirname, "..", "public")));

  aplicacion.post("/api/pedidos", async (solicitud, respuesta) => {
    try {
      const pedido = new RegistroPedido(solicitud.body ?? {});
      await guardarPedido(pedido);
      respuesta.status(201).json({
        mensaje: "Pedido registrado correctamente.",
        pedido: {
          nombreCliente: pedido.nombreCliente,
          producto: pedido.producto,
          cantidad: pedido.cantidad,
          correo: pedido.correo
        }
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        respuesta.status(400).json({ mensaje: error.message });
        return;
      }

      console.error("Error al guardar el pedido:", error.message);
      respuesta.status(500).json({
        mensaje: "No se pudo guardar el pedido. Verifica la conexión e inténtalo de nuevo."
      });
    }
  });

  aplicacion.use((error, solicitud, respuesta, siguiente) => {
    if (respuesta.headersSent) {
      siguiente(error);
      return;
    }

    respuesta.status(400).json({ mensaje: "La solicitud no tiene un formato válido." });
  });

  return aplicacion;
}

module.exports = { crearAplicacion };
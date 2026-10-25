const formulario = document.getElementById("formPedido");
const mensaje = document.getElementById("mensaje");
const botonEnviar = document.getElementById("botonEnviar");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mensaje.textContent = "";
  mensaje.className = "mensaje";
  botonEnviar.disabled = true;
  botonEnviar.firstChild.textContent = "Guardando pedido... ";

  const datos = Object.fromEntries(new FormData(formulario));
  datos.cantidad = Number(datos.cantidad);

  try {
    const respuesta = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.mensaje || "No se pudo registrar el pedido.");
    }

    mensaje.textContent = resultado.mensaje;
    mensaje.classList.add("exito");
    formulario.reset();
  } catch (error) {
    mensaje.textContent = error.message || "No hay conexión con el servidor.";
    mensaje.classList.add("error");
  } finally {
    botonEnviar.disabled = false;
    botonEnviar.firstChild.textContent = "Registrar pedido ";
  }
});
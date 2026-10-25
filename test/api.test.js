const test = require("node:test");
const assert = require("node:assert/strict");
const { crearAplicacion } = require("../src/app");

test("el endpoint registra pedidos válidos y rechaza los inválidos", async (contexto) => {
  let guardados = 0;
  const aplicacion = crearAplicacion({
    guardarPedido: async () => { guardados += 1; }
  });
  const servidor = aplicacion.listen(0);
  await new Promise((resolver) => servidor.once("listening", resolver));
  contexto.after(() => new Promise((resolver, rechazar) => {
    servidor.close((error) => error ? rechazar(error) : resolver());
  }));

  const url = `http://127.0.0.1:${servidor.address().port}/api/pedidos`;
  const pedidoValido = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombreCliente: "Ana Pérez",
      producto: "Café",
      cantidad: 2,
      correo: "ana@example.com"
    })
  });

  assert.equal(pedidoValido.status, 201);
  assert.equal(guardados, 1);

  const pedidoInvalido = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombreCliente: "", producto: "Café", cantidad: 0, correo: "mal" })
  });

  assert.equal(pedidoInvalido.status, 400);
  assert.equal(guardados, 1);
});
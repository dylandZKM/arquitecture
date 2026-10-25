const test = require("node:test");
const assert = require("node:assert/strict");
const { validarPedido } = require("../src/validaciones");
const { RegistroPedido } = require("../src/RegistroPedido");
const { convertirAFilaCsv } = require("../src/csv");

test("acepta un pedido con datos válidos", () => {
  assert.deepEqual(validarPedido({
    nombreCliente: "Ana Pérez",
    producto: "Café",
    cantidad: 2,
    correo: "ana@example.com"
  }), []);
});

test("rechaza cantidad cero y correo con formato inválido", () => {
  const errores = validarPedido({
    nombreCliente: "Ana",
    producto: "Café",
    cantidad: 0,
    correo: "correo-invalido"
  });

  assert.equal(errores.length, 2);
});

test("RegistroPedido normaliza espacios y convierte cantidad", () => {
  const pedido = new RegistroPedido({
    nombreCliente: "  Ana Pérez ",
    producto: " Café molido ",
    cantidad: "3",
    correo: "ana@example.com"
  });

  assert.equal(pedido.nombreCliente, "Ana Pérez");
  assert.equal(pedido.producto, "Café molido");
  assert.equal(pedido.cantidad, 3);
});

test("RegistroPedido rechaza información inválida", () => {
  assert.throws(
    () => new RegistroPedido({ nombreCliente: "", producto: "Café", cantidad: 1, correo: "a@b.co" }),
    { name: "ValidationError" }
  );
});

test("escapa comas, comillas y saltos de línea en CSV", () => {
  assert.equal(convertirAFilaCsv(["Ana, María", 'Café "especial"', 2]), '"Ana, María","Café ""especial""",2\n');
});
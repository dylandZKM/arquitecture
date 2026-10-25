const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { PersistenciaPedidos } = require("../src/PersistenciaPedidos");

test("prepararArchivo separa el próximo registro si el CSV no termina en salto de línea", async (contexto) => {
  const directorio = await fs.mkdtemp(path.join(os.tmpdir(), "coquito-csv-"));
  const rutaCsv = path.join(directorio, "Datos.csv");
  contexto.after(() => fs.rm(directorio, { recursive: true, force: true }));
  await fs.writeFile(rutaCsv, "nombre,producto\nAna,Café", "utf8");

  const persistencia = new PersistenciaPedidos({ pool: {}, rutaCsv });
  await persistencia.prepararArchivo();

  assert.equal(await fs.readFile(rutaCsv, "utf8"), "nombre,producto\nAna,Café\n");
});

test("prepararArchivo crea encabezados para un CSV vacío", async (contexto) => {
  const directorio = await fs.mkdtemp(path.join(os.tmpdir(), "coquito-csv-"));
  const rutaCsv = path.join(directorio, "Datos.csv");
  contexto.after(() => fs.rm(directorio, { recursive: true, force: true }));
  await fs.writeFile(rutaCsv, "", "utf8");

  const persistencia = new PersistenciaPedidos({ pool: {}, rutaCsv });
  await persistencia.prepararArchivo();

  assert.match(await fs.readFile(rutaCsv, "utf8"), /^nombre_cliente,producto,cantidad,correo,fecha_registro\n$/);
});
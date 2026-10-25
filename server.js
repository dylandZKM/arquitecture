require("dotenv").config();

const path = require("node:path");
const mysql = require("mysql2/promise");
const { crearAplicacion } = require("./src/app");
const { PersistenciaPedidos } = require("./src/PersistenciaPedidos");

const puerto = Number(process.env.PORT) || 3000;
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "coquito_amarillo",
  waitForConnections: true,
  connectionLimit: 10
});

const persistencia = new PersistenciaPedidos({
  pool,
  rutaCsv: path.join(__dirname, "Datos.csv")
});

async function iniciarServidor() {
  try {
    await pool.query("SELECT 1");
    await persistencia.prepararArchivo();

    const aplicacion = crearAplicacion({
      guardarPedido: (pedido) => persistencia.guardar(pedido)
    });

    aplicacion.listen(puerto, () => {
      console.log(`Servidor listo en http://localhost:${puerto}`);
    });
  } catch (error) {
    console.error("No fue posible iniciar la aplicación:", error.message);
    await pool.end();
    process.exitCode = 1;
  }
}

iniciarServidor();
const fs = require("node:fs/promises");
const { convertirAFilaCsv } = require("./csv");

const ENCABEZADO_CSV = "nombre_cliente,producto,cantidad,correo,fecha_registro\n";

class PersistenciaPedidos {
  constructor({ pool, rutaCsv }) {
    this.pool = pool;
    this.rutaCsv = rutaCsv;
    this.colaEscrituras = Promise.resolve();
  }

  async prepararArchivo() {
    let archivo;

    try {
      archivo = await fs.open(this.rutaCsv, "r+");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await fs.writeFile(this.rutaCsv, ENCABEZADO_CSV, "utf8");
      return;
    }

    try {
      const estado = await archivo.stat();
      if (estado.size === 0) {
        await archivo.writeFile(ENCABEZADO_CSV, "utf8");
        return;
      }

      const ultimoByte = Buffer.alloc(1);
      await archivo.read(ultimoByte, 0, 1, estado.size - 1);
      if (ultimoByte[0] !== 0x0a) {
        await archivo.write("\n", estado.size, "utf8");
      }
    } finally {
      await archivo.close();
    }
  }

  guardar(pedido) {
    const operacion = this.colaEscrituras.then(() => this.guardarEnAmbosMedios(pedido));
    this.colaEscrituras = operacion.catch(() => {});
    return operacion;
  }

  async guardarEnAmbosMedios(pedido) {
    const conexion = await this.pool.getConnection();
    let archivo;
    let transaccionIniciada = false;
    let tamanoOriginal = 0;

    try {
      await this.prepararArchivo();
      archivo = await fs.open(this.rutaCsv, "a+");
      tamanoOriginal = (await archivo.stat()).size;

      await conexion.beginTransaction();
      transaccionIniciada = true;
      await conexion.execute(
        `INSERT INTO registros
          (nombre_cliente, producto, cantidad, correo, fecha_registro)
         VALUES (?, ?, ?, ?, ?)`,
        [
          pedido.nombreCliente,
          pedido.producto,
          pedido.cantidad,
          pedido.correo,
          pedido.obtenerFechaSql()
        ]
      );

      await archivo.appendFile(convertirAFilaCsv(pedido.obtenerFilaCsv()), "utf8");
      await conexion.commit();
      transaccionIniciada = false;
    } catch (error) {
      if (transaccionIniciada) {
        await conexion.rollback().catch(() => {});
      }

      if (archivo) {
        await archivo.truncate(tamanoOriginal).catch(() => {});
      }

      throw error;
    } finally {
      if (archivo) await archivo.close();
      conexion.release();
    }
  }
}

module.exports = { PersistenciaPedidos };
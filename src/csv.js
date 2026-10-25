function escaparCampoCsv(valor) {
  const texto = String(valor ?? "");

  if (/[",\r\n]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }

  return texto;
}

function convertirAFilaCsv(valores) {
  return `${valores.map(escaparCampoCsv).join(",")}\n`;
}

module.exports = { convertirAFilaCsv };
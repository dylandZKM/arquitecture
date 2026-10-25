# Actividad 5: diagrama de clases

```mermaid
classDiagram
  class Cliente {
    +id
    +nombre
    +correo
    -historialCompras
    +calcularDescuento()
    +registrarCompra(valor)
    +obtenerResumenCompras()
  }
  class ClienteFrecuente {
    +calcularDescuento()
  }
  class ClienteMayorista {
    +calcularDescuento()
  }
  Cliente <|-- ClienteFrecuente
  Cliente <|-- ClienteMayorista
```

`historialCompras` se declara como campo privado (`#historialCompras`); solo la clase base lo puede modificar y exponer mediante un resumen controlado. Las dos subclases redefinen `calcularDescuento()` con tasas distintas.
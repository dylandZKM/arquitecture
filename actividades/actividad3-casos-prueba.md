# Actividad 3: casos de prueba

Los resultados se generan ejecutando `node actividades/actividad3-decisiones.js`.

| Función | Entrada | Salida esperada | Salida obtenida |
| --- | --- | --- | --- |
| `clasificarStock` | `-1` | Dato inválido | Dato inválido |
| `clasificarStock` | `0` | Agotado | Agotado |
| `clasificarStock` | `15` | Stock bajo | Stock bajo |
| `clasificarStock` | `50` | Stock medio | Stock medio |
| `clasificarStock` | `120` | Stock alto | Stock alto |
| `calcularDescuento` | `mayorista` | `0.15` | `0.15` |
| `calcularDescuento` | `frecuente` | `0.10` | `0.10` |
| `calcularDescuento` | `nuevo` | `0.05` | `0.05` |
| `calcularDescuento` | `desconocido` | `0` | `0` |
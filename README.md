# La evolución de los modelos de datos · Infografía interactiva

**Ver la web:** https://jean1722343.github.io/infografia-modelos-de-datos/

El viaje de cómo estructuramos la información (1964–1999), contado en una infografía que se puede tocar. Recorre los cinco modelos de datos:

| Etapa | Año | Modelo | Origen |
|---|---|---|---|
| 1 | 1964 | Jerárquico | IBM IMS · programa Apolo |
| 2 | 1969 | De red | Charles Bachman · IDS / CODASYL |
| 3 | 1970 | Relacional | Edgar F. Codd · IBM |
| 4 | 1986 | Objeto-relacional | Michael Stonebraker · POSTGRES |
| 5 | 1989 | Orientado a objetos | Atkinson et al. · Manifiesto OO / ODMG |

![Captura de la infografía interactiva](assets/img/captura.jpg)

## Cómo se usa

- **Toca cualquier imagen, año o título** para abrir la ficha completa del modelo, con su definición, características, ventajas y desventajas, y una animación que explica cómo organiza los datos.
- Pasa de un modelo a otro con los botones **anterior / siguiente** o con las flechas del teclado. `Esc` cierra la ficha.
- Los chips de arriba te llevan directo a cada año.
- Cada ficha tiene su propio enlace, por ejemplo `…/#relacional`.

## Tecnología

Sitio estático en HTML, CSS y JavaScript puro, sin dependencias ni paso de compilación. Lo publica GitHub Pages.

```
index.html        estructura de la página
css/styles.css    diseño, animaciones y versión para celular
js/data.js        contenido de los cinco modelos y las fuentes
js/app.js         interacción, panel de detalle y animaciones SVG
assets/           ilustraciones y la infografía original
```

Para verla en local: `python -m http.server` dentro de la carpeta y abrir http://localhost:8000

## Créditos

**Equipo 1** · Bases de Datos, Unidad 1: Introducción a las bases de datos · Universidad del Istmo

- Kevin Alexis Garcia Romero
- Alexander De Los Santos López
- Fátima Alejandra Morales Gordon
- Evelin Vázquez Rojas
- Jean Paul Gallegos Cruz

El diseño original de la infografía se hizo en Canva; la descarga está en [`assets/infografia-original.jpg`](assets/infografia-original.jpg).

## Fuentes

- [Historia de las bases de datos](https://infodigital.ciberlinea.net/sistemas/historia-de-las-bases-de-datos/) — infodigital.ciberlinea.net
- [Evolución de los modelos de datos: jerárquico, en red, relacional y orientado a objetos](https://academy-code.codingia.com/evolucion-de-los-modelos-de-datos-jerarquico-en-red-relacional-y-orientado-a-objetos/) — academy-code.codingia.com
- [Historia y evolución de las bases de datos: de 1960 a hoy](https://entidadrelacion.com/historia-bases-de-datos/) — entidadrelacion.com
- [Antecedentes históricos (PostgreSQL)](https://jordinponc.blogspot.com/2017/02/antecedentes-historicos.html) — jordinponc.blogspot.com
- [Breve historia del nacimiento de las bases de datos](https://click-it.es/breve-historia-del-nacimiento-de-las-bases-de-datos/) — click-it.es
- Codd, E. F. (1970). *A Relational Model of Data for Large Shared Data Banks*. Communications of the ACM, 13(6).
- Bachman, C. W. (2009). *The Origin of the Integrated Data Store (IDS)*. IEEE Annals of the History of Computing.
- Atkinson, M. et al. (1989). *The Object-Oriented Database System Manifesto*.

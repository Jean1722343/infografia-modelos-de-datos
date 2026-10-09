/* Contenido de la infografía "La evolución de los modelos de datos".
   Fuente: páginas 2, 3 y 4 del diseño en Canva del equipo (investigación propia a partir de las fuentes listadas). */

window.MODELOS = [
  {
    id: "jerarquico",
    etapa: 1,
    anio: 1964,
    nombre: "Modelo jerárquico",
    origen: "IBM IMS · programa Apolo",
    creador: "IBM (IMS, Information Management System), desarrollado para gestionar los datos de los proveedores del Programa Apolo de la NASA.",
    relacion: "1 : N",
    resumen: "Organiza datos en un árbol invertido con relación padre–hijo. Relación 1 : N; cada hijo tiene un solo padre.",
    pro: "Muy rápido con grandes volúmenes.",
    contra: "Rígido; no permite relaciones N:M.",
    imagen: "assets/img/jerarquico.webp",
    alt: "Mainframe junto a un árbol de nodos: una raíz con sus hijos",
    definicion: "Organiza la información en una estructura de árbol invertido, con nodos interconectados mediante registros de padre e hijo y relaciones jerárquicas estrictas de dependencia.",
    caracteristicas: [
      ["Relación padre–hijo (1:N)", "Cada registro hijo está vinculado a un único registro padre."],
      ["Estructura fija", "Los datos se organizan jerárquicamente desde un nodo raíz hacia abajo."],
      ["Navegación por rutas", "Para consultar un dato hay que recorrer la ruta exacta de punteros físicos desde la raíz."]
    ],
    ventajas: [
      ["Velocidad", "Rendimiento excepcional en volúmenes masivos de datos transaccionales estandarizados (usado en proyectos como SABRE y en la banca)."],
      ["Integridad de datos", "Mantiene una relación clara y directa entre los registros vinculados."]
    ],
    desventajas: [
      ["Rigidez", "Modificar el esquema es muy complejo y obliga a reescribir las aplicaciones que acceden a él."],
      ["Relaciones limitadas", "No puede representar directamente relaciones de muchos a muchos (N:M) sin duplicar información."]
    ]
  },
  {
    id: "red",
    etapa: 2,
    anio: 1969,
    nombre: "Modelo de red",
    origen: "Charles Bachman · IDS, GE",
    creador: "Charles Bachman, con el desarrollo de IDS (Integrated Data Store); estandarizado después por el comité CODASYL (Conference on Data Systems Languages).",
    relacion: "N : M",
    resumen: "Organiza los datos en forma de grafo o red de nodos. Relación N : M; un hijo puede tener varios padres mediante punteros. Estándar CODASYL (1969).",
    pro: "Modela relaciones complejas de muchos a muchos.",
    contra: "Difícil de diseñar y programar.",
    imagen: "assets/img/red.webp",
    alt: "Servidor conectado a una red de nodos con flechas en varias direcciones",
    definicion: "Evolución del modelo jerárquico que representa los datos como un grafo o red de nodos unidos mediante punteros, lo que permite interconexiones más complejas entre registros.",
    caracteristicas: [
      ["Múltiples padres", "Un registro hijo (miembro) puede tener más de un registro padre (dueño)."],
      ["Conexión por punteros", "Usa listas de punteros en memoria para relacionar los nodos de la red."],
      ["Primer estándar", "Estableció el primer estándar formal de bases de datos de la industria (DBTG / CODASYL)."]
    ],
    ventajas: [
      ["Modelado flexible", "Representa con precisión relaciones complejas de muchos a muchos (N:M)."],
      ["Acceso múltiple", "Permite llegar a los datos navegando por diferentes caminos dentro del grafo."]
    ],
    desventajas: [
      ["Complejidad", "Su diseño, programación y mantenimiento resultan muy difíciles."],
      ["Baja independencia de datos", "Hay una dependencia fuerte entre la estructura física de los datos y el código de las aplicaciones."]
    ]
  },
  {
    id: "relacional",
    etapa: 3,
    anio: 1970,
    nombre: "Modelo relacional",
    origen: "Edgar F. Codd · IBM",
    creador: "Edgar F. Codd, en sus publicaciones de investigación en IBM Research. El lenguaje SQL se estandarizó por ANSI/ISO en 1986.",
    relacion: "Tablas + claves",
    resumen: "Organiza la información en tablas independientes compuestas por filas y columnas. Claves (PK y FK). Álgebra relacional. Se consulta con SQL (Oracle, DB2).",
    pro: "Fácil de usar y consultar.",
    contra: "Lento con muchas uniones (JOIN).",
    imagen: "assets/img/relacional.webp",
    alt: "Tablas con clave primaria y clave foránea, un documento SQL y un servidor",
    definicion: "Basado en la teoría de conjuntos y la lógica matemática, almacena la información en tablas independientes (relaciones) formadas por filas (tuplas) y columnas (atributos).",
    caracteristicas: [
      ["Claves de enlace", "Relaciona las tablas mediante claves primarias (PK) y claves foráneas (FK)."],
      ["Consultas declarativas (SQL)", "Se indica qué datos se necesitan, sin preocuparse de cómo los busca el motor."],
      ["Sin punteros", "Elimina el uso explícito de punteros de memoria para vincular la información."]
    ],
    ventajas: [
      ["Facilidad de uso", "Muy sencillo de entender, consultar, diseñar y mantener."],
      ["Independencia de datos", "Separación total entre la estructura lógica de los datos y el código de las aplicaciones."]
    ],
    desventajas: [
      ["Costo computacional", "Pierde rendimiento en consultas masivas que requieren muchas combinaciones (JOIN)."],
      ["Datos complejos", "Le cuesta guardar datos no estructurados o con jerarquías de varios niveles."]
    ]
  },
  {
    id: "objeto-relacional",
    etapa: 4,
    anio: 1986,
    nombre: "Modelo objeto-relacional",
    origen: "Michael Stonebraker · POSTGRES",
    creador: "Michael Stonebraker, con el proyecto POSTGRES en la Universidad de California en Berkeley. Estandarizado en la norma SQL:1999.",
    relacion: "Tablas + objetos",
    resumen: "Extiende las tablas SQL agregando capacidades de Programación Orientada a Objetos. Tablas SQL + tipos de datos complejos, herencia y funciones.",
    pro: "Une SQL con la flexibilidad de objetos.",
    contra: "Más complejo; varía por fabricante.",
    imagen: "assets/img/objeto-relacional.webp",
    alt: "Servidor junto a tablas que guardan objetos 3D y el logotipo de PostgreSQL",
    definicion: "Modelo híbrido que extiende el motor relacional tradicional para incorporar conceptos de la Programación Orientada a Objetos (POO).",
    caracteristicas: [
      ["Objetos dentro de SQL", "Mantiene las tablas relacionales y añade tipos de datos estructurados y personalizados."],
      ["Herencia y funciones", "Permite heredar estructuras entre tablas y ejecutar funciones dentro del propio motor."],
      ["Evolución del lenguaje", "Sustituyó lenguajes experimentales (como PostQuel) por SQL estandarizado con extensiones de objetos."]
    ],
    ventajas: [
      ["Versatilidad", "Combina la solidez de SQL con la flexibilidad de manejar tipos de datos complejos."],
      ["Reutilización de código", "Permite programar lógica de negocio y herencia directamente en la base de datos."]
    ],
    desventajas: [
      ["Mayor complejidad", "Administrar, optimizar y diseñar el motor exige más especialización."],
      ["Diferencias entre fabricantes", "Las extensiones de objetos varían entre motores (PostgreSQL, Oracle, DB2)."]
    ]
  },
  {
    id: "orientado-objetos",
    etapa: 5,
    anio: 1989,
    nombre: "Modelo orientado a objetos",
    origen: "Atkinson et al. · Manifiesto OO / Estándar ODMG",
    creador: "Malcolm Atkinson y colaboradores, con el Manifiesto de Bases de Datos Orientadas a Objetos (1989). Estandarizado en 1993 por el grupo ODMG.",
    relacion: "Objetos",
    resumen: "Guarda la información directamente como objetos (datos + métodos), con encapsulamiento, herencia y polimorfismo integrados con C++ o Java.",
    pro: "Ideal para datos complejos.",
    contra: "Poco usado; sin estándar universal.",
    imagen: "assets/img/orientado-objetos.webp",
    alt: "Tres objetos con datos y métodos unidos por flechas de herencia y polimorfismo",
    definicion: "Modelo posrelacional que almacena la información en forma de objetos, integrando en un solo elemento sus datos (atributos) y su comportamiento (métodos).",
    caracteristicas: [
      ["Pilares de la POO", "Soporta herencia, encapsulamiento y polimorfismo dentro de la base de datos."],
      ["Identificador único (OID)", "Cada objeto tiene una identidad propia, independiente del valor de sus atributos."],
      ["Vinculación directa", "Se integra de forma nativa con lenguajes como C++, Smalltalk y Java."]
    ],
    ventajas: [
      ["Sin desfase de impedancia", "No hace falta traducir los objetos del programa a tablas SQL."],
      ["Aplicaciones complejas", "Excelente en sistemas CAD, multimedia, geográficos y simulaciones."]
    ],
    desventajas: [
      ["Baja adopción comercial", "Las empresas siguieron con el modelo relacional por el alto costo de migrar."],
      ["Sin estándar universal", "No consolidó un lenguaje de consulta tan universal como SQL."]
    ]
  }
];

window.FUENTES = [
  { titulo: "Historia de las bases de datos", sitio: "infodigital.ciberlinea.net", url: "https://infodigital.ciberlinea.net/sistemas/historia-de-las-bases-de-datos/" },
  { titulo: "Evolución de los modelos de datos: jerárquico, en red, relacional y orientado a objetos", sitio: "academy-code.codingia.com", url: "https://academy-code.codingia.com/evolucion-de-los-modelos-de-datos-jerarquico-en-red-relacional-y-orientado-a-objetos/" },
  { titulo: "Historia y evolución de las bases de datos: de 1960 a hoy", sitio: "entidadrelacion.com", url: "https://entidadrelacion.com/historia-bases-de-datos/" },
  { titulo: "Antecedentes históricos (PostgreSQL)", sitio: "jordinponc.blogspot.com", url: "https://jordinponc.blogspot.com/2017/02/antecedentes-historicos.html" },
  { titulo: "Breve historia del nacimiento de las bases de datos", sitio: "click-it.es", url: "https://click-it.es/breve-historia-del-nacimiento-de-las-bases-de-datos/" }
];

window.REFERENCIAS = [
  "Codd, E. F. (1970). A Relational Model of Data for Large Shared Data Banks. Communications of the ACM, 13(6).",
  "IBM. History of IMS: Beginnings at NASA.",
  "Bachman, C. W. (2009). The Origin of the Integrated Data Store (IDS). IEEE Annals of the History of Computing.",
  "Atkinson, M. et al. (1989). The Object-Oriented Database System Manifesto.",
  "PostgreSQL Global Development Group. A Brief History of PostgreSQL."
];

window.EQUIPO = [
  "Kevin Alexis Garcia Romero",
  "Alexander De Los Santos López",
  "Fátima Alejandra Morales Gordon",
  "Evelin Vázquez Rojas",
  "Jean Paul Gallegos Cruz"
];

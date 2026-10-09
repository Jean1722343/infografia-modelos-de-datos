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

/* De dónde sale cada dato: qué dice cada fuente sobre cada modelo (paráfrasis)
   y la referencia académica correspondiente. Índices de window.FUENTES. */
window.CITAS = {
  "jerarquico": {
    fuentes: [
      [2, "IBM lo desarrolló junto con North American Rockwell para el programa Apolo; organiza los registros en árbol, con un solo padre por registro. Indica que IMS se instaló en 1968 y se comercializó en 1969."],
      [0, "Lo ubica en los años 60 como el modelo que organiza la información en forma de árbol."],
      [1, "Lo presenta como el primer modelo implementado: datos en árbol donde cada nodo tiene un padre y puede tener varios hijos."],
      [4, "IMS formó parte de la primera generación de bases de datos y guardaba los datos en listas y árboles."]
    ],
    refs: ["IBM. History of IMS: Beginnings at NASA."]
  },
  "red": {
    fuentes: [
      [2, "Charles Bachman creó IDS en General Electric (1963–1964); los registros se enlazan con punteros y el modelo se estandarizó desde 1969 en los informes de CODASYL."],
      [0, "Bachman creó IDS para General Electric con un modelo de nodos y enlaces pensado para relaciones complejas."],
      [1, "Es parecido al jerárquico, pero un nodo puede tener varios padres, lo que permite relaciones de muchos a muchos."],
      [4, "CODASYL aparece como parte de la primera generación de bases de datos de red."]
    ],
    refs: ["Bachman, C. W. (2009). The Origin of the Integrated Data Store (IDS). IEEE Annals of the History of Computing."]
  },
  "relacional": {
    fuentes: [
      [0, "Codd propuso en 1970 organizar los datos en tablas relacionadas por claves, separando la lógica de su almacenamiento físico."],
      [2, "Codd planteó guardar los datos en tablas y consultarlos diciendo qué se quiere, no cómo recorrerlos; SQL nació en IBM en 1974 como SEQUEL."],
      [1, "Codd lo propuso en los años 70: la información va en tablas con un campo clave, sin registros duplicados."],
      [4, "Edgar F. Codd definió el modelo y publicó reglas para los sistemas relacionales."]
    ],
    refs: ["Codd, E. F. (1970). A Relational Model of Data for Large Shared Data Banks. Communications of the ACM, 13(6)."]
  },
  "objeto-relacional": {
    fuentes: [
      [3, "POSTGRES nació en 1986 en la Universidad de Berkeley, dirigido por Michael Stonebraker, para añadir tipos de datos definidos por el usuario y conceptos de objetos; en 1995 adoptó SQL en lugar de POSTQUEL."],
      [2, "Menciona a Stonebraker y el proyecto POSTGRES (1986) como sucesor de Ingres."]
    ],
    refs: ["PostgreSQL Global Development Group. A Brief History of PostgreSQL."]
  },
  "orientado-objetos": {
    fuentes: [
      [1, "Los SGBD orientados a objetos combinan las funciones de una base de datos con lenguajes orientados a objetos: objetos, clases, herencia y encapsulamiento."],
      [2, "En los años 80 aparecieron bases de datos orientadas a objetos para guardar directamente los objetos de los lenguajes de programación."],
      [0, "Surgió para manejar datos complejos, con clases y herencia."],
      [4, "Surgieron para gestionar datos complejos que las bases relacionales manejaban mal."]
    ],
    refs: ["Atkinson, M. et al. (1989). The Object-Oriented Database System Manifesto."]
  }
};

/* Desarrollador de la web y sus redes (íconos: Simple Icons, CC0) */
window.DEV = {
 "nombre": "Jean Paul Gallegos Cruz",
 "rol": "desarrollador",
 "redes": [
  {
   "red": "LinkedIn",
   "url": "https://www.linkedin.com/in/jeanpaulgc",
   "color": "#0A66C2",
   "d": "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  },
  {
   "red": "Instagram",
   "url": "https://www.instagram.com/jpgallegosc",
   "color": "#E4405F",
   "d": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
  },
  {
   "red": "GitHub",
   "url": "https://github.com/Jean1722343",
   "color": "#181717",
   "d": "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
  },
  {
   "red": "Facebook",
   "url": "https://www.facebook.com/profile.php?id=61593415306721",
   "color": "#0866FF",
   "d": "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
  },
  {
   "red": "TikTok",
   "url": "https://www.tiktok.com/@jpgallegosc",
   "color": "#000000",
   "d": "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
  }
 ]
};

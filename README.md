# CineCampus
CineCampus es una aplicación de gestión de cine que permite la creación y administración de usuarios, la consulta y compra de boletos para películas, así como la reserva y cancelación de asientos. La aplicación está diseñada con una arquitectura modular para facilitar la escalabilidad y el mantenimiento.

## Índice
1. [Estructura de Carpetas](#estructura-de-carpetas)
    - [Descripción de Carpetas y Archivos](#descripción-de-carpetas-y-archivos)
2. [Casos de Uso](#casos-de-uso)
3. [Roles](#roles)
4. [Variables de Entorno](#variables-de-entorno)
5. [Esquema de Base de Datos](#esquema-de-base-de-datos)
    - [Clientes](#clientes)
    - [Tarjetas](#tarjetas)
    - [Películas](#películas)
    - [Funciones](#funciones)
    - [Salas](#salas)
    - [Boletas](#boletas)

## Estructura de Carpetas backend
Este proyecto sigue una estructura modular que facilita la organización y mantenimiento del código. A continuación se describe la estructura de carpetas y su funcionalidad:

```
├── node_modules
├── src
│ ├── config
│ │ ├── connect.js
│ │ ├── roles.js
│ │ └── usuarios.js
│ ├── modules
│ │ ├── boletas
│ │ │ ├── boletas.controller.js
│ │ │ ├── boletas.repository.js
│ │ │ └── boletas.service.js
│ │ ├── clientes
│ │ │ ├── clientes.controller.js
│ │ │ ├── clientes.repository.js
│ │ │ └── clientes.service.js
│ │ ├── funciones
│ │ │ ├── funciones.controller.js
│ │ │ ├── funciones.repository.js
│ │ │ └── funciones.service.js
│ │ ├── peliculas
│ │ │ ├── peliculas.controller.js
│ │ │ ├── peliculas.repository.js
│ │ │ └── peliculas.service.js
│ │ ├── salas
│ │ │ ├── salas.controller.js
│ │ │ ├── salas.repository.js
│ │ │ └── salas.service.js
│ │ └── tarjetas
│ │ ├── tarjetas.controller.js
│ │ ├── tarjetas.repository.js
│ │ └── tarjetas.service.js
├── .env
├── .envExample
├── .gitignore
├── .prettierrc
├── main.js
├── package-lock.json
├── package.json
└── README.md
```

### Descripción de Carpetas y Archivos backend

- **main**: Este es el punto de acceso principal de la aplicación Node.js. Aquí se inicializa el servidor y se configuran los middlewares necesarios.

- **src**: Contiene dos carpetas principales: `config` y `modules`.
  - **config**: 
    - `connect.js`: Establece la conexión a la base de datos.
    - `roles.js`: Define y gestiona los roles de usuarios.
    - `usuarios.js`: Gestión de usuarios.
  - **modules**: Cada módulo corresponde a una colección de la base de datos y está organizado en tres partes:
    - **controller**: Maneja las solicitudes HTTP, recibe datos, llama al servicio correspondiente y devuelve la respuesta adecuada al cliente.
    - **repository**: Maneja la conexión directa a la base de datos, definiendo todas las consultas posibles para esa colección.
    - **service**: Contiene la lógica de negocio y procesamiento de datos, encapsulando la lógica para mantenerla separada de los controladores y repositorios.

## Estructura de Carpetas frontend
La estructura del frontend está organizada de manera modular para facilitar la reutilización de componentes y el manejo de estilos. Aquí se describe la estructura de carpetas del frontend:

```
├── node_modules
├── public
├── src
│   ├── components
│   │   ├── CardInput.jsx
│   │   ├── Carousel.jsx
│   │   ├── CinemaFooter.jsx
│   │   ├── ComingSoon.jsx
│   │   ├── IndexHeader.jsx
│   │   ├── ReturnHeader.jsx
│   │   ├── ReturnHeaderPayments.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SeatRow.jsx
│   │   └── Subtitle.jsx
│   ├── css
│   │   ├── components
│   │   │   ├── CardInput.css
│   │   │   ├── Carousel.css
│   │   │   ├── CinemaFooter.css
│   │   │   ├── ComingSoon.css
│   │   │   ├── IndexHeader.css
│   │   │   ├── ReturnHeader.css
│   │   │   ├── ReturnHeaderPayments.css
│   │   │   ├── SearchBar.css
│   │   │   ├── SeatRow.css
│   │   │   └── Subtitle.css
│   │   ├── pages
│   │       ├── ChooseSeat.css
│   │       ├── Index.css
│   │       ├── Login.css
│   │       ├── MovieDescription.css
│   │       ├── Payments.css
│   │       └── Ticket.css
│   ├── pages
│   │   ├── ChooseSeat.jsx
│   │   ├── Index.jsx
│   │   ├── Login.jsx
│   │   ├── MovieDescription.jsx
│   │   ├── Payments.jsx
│   │   └── Ticket.jsx
│   ├── main.jsx
│   └── Router.jsx
├── .gitignore
├── .eslintrc.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

### Descripción de Carpetas y Archivos frontend

- **src/components**: Contiene componentes reutilizables como botones, entradas de formulario, encabezados, etc.

- **src/css**: Contiene los archivos CSS organizados según componentes y páginas.
- **src/pages**: Contiene los componentes de las páginas principales como Login, MovieDescription, Payments, etc.
- **main.jsx**: Punto de entrada principal de la aplicación React.
- **Router.jsx**: Configuración de las rutas de la aplicación.

### Separación del Backend y Frontend
El backend y frontend están separados en dos entornos distintos, cada uno con sus propias dependencias. Para iniciar ambos entornos, es necesario:

#### Instalar dependencias:

- Navegar a la carpeta del backend y ejecutar npm install.
- Navegar a la carpeta del frontend y ejecutar npm install.

- Iniciar el servidor backend con npm run dev.
- Iniciar el servidor frontend con npm run dev.


### Ventajas de Usar una Estructura de Carpetas Modular

1. **Separación de Responsabilidades:**
   - **Descripción**: La estructura modular permite dividir el código en diferentes módulos, cada uno con una responsabilidad específica.
   - **Beneficio**: Facilita la comprensión y mantenimiento del código, ya que cada módulo se enfoca en una tarea específica, como manejar clientes, películas, funciones, etc.

2. **Escalabilidad:**
   - **Descripción**: Cada módulo es independiente y puede ser desarrollado, testeado y mantenido de manera aislada.
   - **Beneficio**: Es fácil agregar nuevas funcionalidades o modificar las existentes sin afectar otras partes del sistema.

3. **Reutilización de Código:**
   - **Descripción**: La estructura modular promueve la reutilización de código a través de servicios y repositorios compartidos.
   - **Beneficio**: Reduce la duplicación de código y facilita la implementación de cambios en múltiples lugares de la aplicación.

## Casos de Uso

1. **Crear Usuario**:
   - Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).
   - `casoUso1()`

2. **Consultar todas las películas disponibles**:
   - Permitir la consulta de todas las películas disponibles en el catálogo con detalles como título, género, duración y horarios de proyección.
   - `casoUso2()`

3. **Consultar información detallada sobre una película**:
   - Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.
   - `casoUso3()`

4. **Compra de boletos**:
   - Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.
   - `casoUso4()`

5. **Consulta de disponibilidad de asientos**:
   - Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
   - `casoUso5()`

6. **Reservar asientos**:
   - Permitir la selección y reserva de asientos para una proyección específica.
   - `casoUso4()`: Esta implicito, al no pagar la boleta, queda en reserva

7. **Cancelar reserva de asientos**:
   - Permitir la cancelación de una reserva de asiento ya realizada.
   - `casoUso7()`

8. **Aplicación de descuentos para usuarios VIP**:
   - Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.
   - `casoUso4()`: Implicito al hacer compras

9. **Verificación de tarjeta VIP**:
   - Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.
   - `casoUso4()`: Implicito al hacer compras

10. **Obtener Detalles de Usuario**: 
    - Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.
    - `casoUso10()`

11. **Actualizar Rol de Usuario**:
    - Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).
       - `casoUso11()`
12. **Listar Usuarios**: 
    - Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).
    - `casoUso12()`

## Roles

1. **Administrador de la base de datos**:
   - Gestiona la base de datos y asegura su correcto funcionamiento.

2. **Usuario estándar**:
   - Puede consultar el catálogo, comprar boletos, y cancelar reservas.

3. **Usuario VIP**:
   - Tiene todos los permisos de un usuario estándar y además puede aplicar descuentos VIP en sus compras.

## Variables de entorno

### Variables mongo
`
MONGO_USER = admin
MONGO_PORT = 12854
MONGO_PWD = 1878
MONGO_HOST = mongodb://
MONGO_CLUSTER = monorail.proxy.rlwy.net
MONGO_DB = cineCampus
`

### Variables Express
`
EXPRESS_PORT=3000
EXPRESS_HOST = localhost
EXPRESS_STATIC = public
`

### Variables Vite/react
`
VITE_HOST = localhost
VITE_PORT = 4000
`

### Variables Stripe
`
STRIPE_SECRET_KEY=pk_test_51Pu4z6ENv6lYUGDbgvbG1ckBy06gIe7zaZW3ZNmMUwvh1CbXrpvlIQJ3CFKMiisdUSbn1Xu0gjhqA3mfqnIYFa4s00YfmfapxL
STRIPE_PUBLISHABLE_KEY=sk_test_51Pu4z6ENv6lYUGDbzYvJhvhvFCExEJcPOeSlH7VC4z6phnvZhnP9XBUSM0c4Yf91wugqPP2Z5dCOTCkkCD4k86rZ00x1wwlVUP
`

## Esquema de Base de Datos

### Clientes

```json
{
    "_id": "ObjectId()",
    "id_tarjeta": "ObjectId()",
    "nombre": "",
    "apellido": "",
    "nick": "",
    "email": "",
    "telefono": []
}
```

### Tarjetas
```json
{
    "_id": "ObjectId()",
    "estado": "",
    "numero": ""
}
```

### Películas
```json
{
    "_id": "ObjectId()",
    "titulo": "",
    "generos": [],
    "duracion": 2.5,
    "sipnosis": ""
}
```

### Funciones
```json
{
    "_id": "ObjectId()",
    "id_pelicula": "ObjectId()",
    "id_sala": "ObjectId()",
    "fecha_inicio": "Date",
    "fecha_fin": "Date",
    "asientosOcupados": [],
    "precio": "float"
}
```

### Salas
```json
{
    "_id": "ObjectId()",
    "limitFila": "",
    "limitCol": ""
}
```

### Boletas
```json
{
    "_id": "ObjectId()",
    "id_funcion": "ObjectId()",
    "id_cliente": "ObjectId()",
    "fila": "",
    "columna": "",
    "valor": "float",
    "pago" : "bool"
}
```

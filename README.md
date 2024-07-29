# CineCampus

## Estructura de Carpetas
Este proyecto sigue una estructura modular que facilita la organización y mantenimiento del código. A continuación se describe la estructura de carpetas y su funcionalidad:

### main 
Este es el punto de acceso principal de la aplicación Node.js. Aquí se inicializa el servidor y se configuran los middlewares necesarios.

### src 
Contiene dos carpetas principales: config y modules.

#### config 
**connnect:** Aquí se establece la conexión a la base de datos, asegurando que todos los módulos puedan acceder a ella de manera eficiente y segura.

#### modules
Cada módulo dentro de esta carpeta corresponde a una colección de la base de datos. La estructura interna de cada módulo está organizada en carpetas y archivos específicos:

**repository:** Este archivo maneja la conexión directa a la base de datos para la colección del módulo correspondiente. Aquí se definen todas las consultas posibles, como getters y updates para esa colección.

**service:** Contiene la lógica de negocio y procesamiento de datos. Aquí se manejan las consultas complejas, filtrado y extracción de datos, encapsulando la lógica para mantenerla separada de los controladores y repositorios.

**controller:** Actúa como el punto de acceso para las solicitudes HTTP. Recibe las solicitudes, pasa los datos necesarios al servicio correspondiente y devuelve la respuesta adecuada al cliente.

Cada módulo sigue esta estructura para mantener una separación clara de responsabilidades y facilitar el mantenimiento y escalabilidad del proyecto. Esta estructura modular permite una organización clara y separa las responsabilidades entre la conexión a la base de datos, la lógica de negocio y la gestión de solicitudes HTTP, lo que facilita la colaboración y el crecimiento del proyecto.

## Casos de Uso

1. **Crear Usuario**:
   - Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).

2. **Consultar todas las películas disponibles**:
   - Permitir la consulta de todas las películas disponibles en el catálogo con detalles como título, género, duración y horarios de proyección.

3. **Consultar información detallada sobre una película**:
   - Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

4. **Compra de boletos**:
   - Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.

5. **Consulta de disponibilidad de asientos**:
   - Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

6. **Reservar asientos**:
   - Permitir la selección y reserva de asientos para una proyección específica.

7. **Cancelar reserva de asientos**:
   - Permitir la cancelación de una reserva de asiento ya realizada.

8. **Aplicación de descuentos para usuarios VIP**:
   - Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.

9. **Verificación de tarjeta VIP**:
   - Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.

10. **API para Obtener Detalles de Usuario**: 
    - Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.

11. **API para Actualizar Rol de Usuario**:
    - Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).

12. **API para Listar Usuarios**: 
    - Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).

## Roles

1. **Administrador de la base de datos**:
   - Gestiona la base de datos y asegura su correcto funcionamiento.

2. **Usuario estándar**:
   - Puede consultar el catálogo, comprar boletos, y cancelar reservas.

3. **Usuario VIP**:
   - Tiene todos los permisos de un usuario estándar y además puede aplicar descuentos VIP en sus compras.

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
    "duracion": "",
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
    "valor": "float"
}
```

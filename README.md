# CineCampus

## Casos de Uso

1. **Consultar todas las películas disponibles**:
   - Permitir la consulta de todas las películas disponibles en el catálogo con detalles como título, género, duración y horarios de proyección.

2. **Consultar información detallada sobre una película**:
   - Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

3. **Compra de boletos**:
   - Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.

4. **Confirmación de Compra:** 
   - Enviar confirmación de la compra y los detalles del boleto al usuario.

5. **Consulta de disponibilidad de asientos**:
   - Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

6. **Cancelación de reservas**:
   - Permitir la cancelación de una reserva de asiento ya realizada.

7. **Aplicación de descuentos para usuarios VIP**:
   - Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.

8. **Verificación de tarjeta VIP**:
   - Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.

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

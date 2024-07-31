db.createRole({
    role: 'estandar',
    privileges: [
        {
            resource: { db: 'cineCampus', collection: 'boletas' },
            actions: ['find', 'insert', 'update', 'remove']
        },
        {
            resource: { db: 'cineCampus', collection: 'clientes' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'funciones' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'peliculas' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'salas' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'tarjetas' },
            actions: ['find']
        }
    ],
    roles: []
});

db.createRole({
    role: 'vip',
    privileges: [
        {
            resource: { db: 'cineCampus', collection: 'boletas' },
            actions: ['find', 'insert', 'update', 'remove']
        },
        {
            resource: { db: 'cineCampus', collection: 'clientes' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'funciones' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'peliculas' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'salas' },
            actions: ['find']
        },
        {
            resource: { db: 'cineCampus', collection: 'tarjetas' },
            actions: ['find']
        }
    ],
    roles: []
});

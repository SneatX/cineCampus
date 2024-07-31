db.createUser({
    user: 'admin_cinema',
    pwd: '1878',
    roles: [
        { role: 'dbAdmin', db: 'cineCampus' },
        { role: 'userAdmin', db: 'cineCampus' },
        { role: 'readWrite', db: 'cineCampus' },
        { role: 'userAdminAnyDatabase', db: 'admin' },
        { role: 'dbAdminAnyDatabase', db: 'admin' }
    ]
});

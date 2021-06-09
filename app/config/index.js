exports.db =
  process.env.NODE_ENV === 'local'
    ? {
        database: 'shopping',
        username: 'root',
        password: '12345678',
        host: '127.0.0.1',
        port: 3306,
      }
    : {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_USER_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      }

exports.secret = 'jwt_secret'

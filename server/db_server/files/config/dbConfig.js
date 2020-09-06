require('custom-env').env(process.argv[2])

const config = {
    // user: 'postgres',
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    // host: "postgres",
    // host: "localhost",
    // database: "playdb",
    database: process.env.DB_DATABASE,
    // password: "0910shc",
    password: process.env.DB_PASSWORD,
    // port: "5432",
    port: process.env.DB_PORT
};

exports.config = config;
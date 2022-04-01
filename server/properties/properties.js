require('dotenv').config()
if(process.env.ENV == 'Production' || process.env.ENV == 'Development'){
    module.exports = {
        configtest: {
            server: atob(process.env.IP_SQL),
            authentication: {
                type: process.env.TYPE,
                options: {
                    userName: atob(process.env.SQL_USERNAME),
                    password: atob(process.env.SQL_PASSWORD),
                }
            },
            driver: process.env.DRIVER, 
            options: {
                instanceName: atob(process.env.INSTANCE),
                database: atob(process.env.DATABASE),
                rowCollectionOnDone: true,
                rowCollectionOnRequestCompletion: true,
                connectTimeout: 30000,
                requestTimeout: 30000,
                trustServerCertificate: true
            }
        },
        PORT: process.env.PORT || process.env.APP_PORT,
        valor: { "secret": process.env.SECRET },
        ENV: process.env.ENV,
        headersl: {
            [process.env.CTTYPE]: process.env.CTVALUE,
            [process.env.ACLO]: process.env.ACLOV
        },
        headers: {
            [process.env.CTTYPE]: process.env.CTVALUE,
            [process.env.ACLO]: process.env.ACLOV
        }
    }
    
}


'use strict'

const {MongoClient} = require('mongodb')

const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
}= process.env

const mongoURL = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
let connection

async function connectDB() {
    if(connection) return connection
    try {
        let client = await MongoClient.connect(mongoURL,{
            useNewUrlParser: true
        })
        connection = client.db()
    } catch (error) {
        console.error('Could not connect to db', mongoURL, error)
        process.exit(1)
    }
    return connection
}

module.exports = connectDB

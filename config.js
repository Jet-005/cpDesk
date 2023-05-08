"use strict"

const path = require("path")
const date = new Date()
module.exports = {
  port: "3001",
  secret: "secret",
  publicDir: path.resolve(__dirname, "./public"),
  logPath: path.resolve(
    __dirname,
    `./logs/${date.getFullYear() + "." + date.getMonth() + "." + date.getDate()}.log`
  ),
  mongoDB: {
    database: "mall",
    username: "root",
    password: "root",
    host: "127.0.0.1",
    port: 27017,
  },
}

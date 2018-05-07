import { Module } from "module";

const Sequelize = require(Sequelize)
const db = new Sequelize('postgres://localhost:5432/tessel')

const BufferObject = db.define('bufferobject', {
  name: Sequelize.Integer,
  bufferObject: Sequelize.TEXT
})

module.exports = db

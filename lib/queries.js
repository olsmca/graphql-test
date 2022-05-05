'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
  getCourses: async () => {
    let db; let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      console.error(error)
    }
    return courses
  },
  getCourse: async (root, { id }) => {
    let db, course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectId(id) })
    } catch (error) {
      console.error(error)
    }
    return course
  },
  getStudents: async () => {
    let db; let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('students').find().toArray()
    } catch (error) {
      console.error(error)
    }
    return courses
  },
  getStudent: async (root, { id }) => {
    let db, course
    try {
      db = await connectDb()
      course = await db.collection('students').findOne({ _id: ObjectId(id) })
    } catch (error) {
      console.error(error)
    }
    return course
  }
}

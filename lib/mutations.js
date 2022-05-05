'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)

    try {
      let db = await connectDb()
      let course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error(error)
    }
    return newCourse
  },
  createStudent: async (root, { input }) => {

    try {
      let db = await connectDb()
      let student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      console.error(error)
    }
    return input
  },
  editCourse: async(root, {_id,input}) =>{
    let course
    try {
      let db = await connectDb()
      await db.collection('courses').updateOne(
        {_id:ObjectId(_id)},
        {$set: input}
        )
      course = await db.collection('courses').findOne({ _id: ObjectId(_id) })
    } catch (error) {
      console.error(error)
    }
    return course
  },
  editStudent: async(root, {_id,input}) =>{
    let student
    try {
      let db = await connectDb()
      await db.collection('students').updateOne(
        {_id:ObjectId(_id)},
        {$set: input}
        )
        student = await db.collection('students').findOne({ _id: ObjectId(_id) })
    } catch (error) {
      console.error(error)
    }
    return student
  },
  deleteStudent: async(root, {_id}) =>{
    let info
    try {
      let db = await connectDb()
      info = await db.collection('students').deleteOne({_id:ObjectId(_id)})
    } catch (error) {
      console.error(error)
    }
    return info.deletedCount?`Student has been removed`:`Student does not existed`
  },
  deleteCourse: async(root, {_id}) =>{
    let info
    try {
      let db = await connectDb()
      info = await db.collection('courses').deleteOne({_id:ObjectId(_id)})
    } catch (error) {
      console.error(error)
    }
    return info.deletedCount?`Course has been removed`:`Course does not existed`
  }
}

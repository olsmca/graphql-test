'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
  Course: {
    people: async ({ people }) => {

      try {
        if (!people || people.length === 0) return []

        const db = await connectDb()
        const ids = people.map(id => ObjectId(id))
        let peopleData = await db.collection('students').find(
            { _id: { $in: ids } }).toArray()
        return peopleData
      } catch (error) {
        console.error(error)
      }
      
    }
  }
}

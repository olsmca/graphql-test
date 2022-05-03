'use strinct'

const courses = [
  {
    _id: 'anyid',
    title: 'My title 1',
    teacher: 'My teacher',
    description: 'description',
    topic: 'develop'
  },
  {
    _id: 'anyid',
    title: 'My title 2',
    teacher: 'My teacher',
    description: 'description',
    topic: 'develop'
  },
  {
    _id: 'anyid',
    title: 'My title resurrection',
    teacher: 'My teacher',
    description: 'description',
    topic: 'develop'
  }
]

module.exports = {
  getCourses: () => {
    return courses
  }
}

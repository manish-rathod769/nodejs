const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  allocatedRoomCode: {
    type: Number,
    required: true
  },
  courseDetails: {
    courseName: {
      type: String,
      required: true
    },
    courseAdmissionMonth: {
      type: Number,
      required: true
    },
    courseAdmissionYear: {
      type: Number,
      required: true
    },
    coursePassoutMonth: {
      type: Number,
      required: true
    },
    coursePassoutYear: {
      type: Number,
      required: true
    }
  }
});

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;
const mongoose = require('mongoose');

const ObjectIDDataType = mongoose.Schema.Types.ObjectId;

const userSch = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

const adminAndRectorSchema = new mongoose.Schema({
  name: {
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
  refreshToken: {
    type: String
  }
});

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const floorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hostelID : {
    type: ObjectIDDataType,
    required: true
  }
});


const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  floorID: {
    type: ObjectIDDataType,
    required: true
  },
  hostelID: {
    type: ObjectIDDataType,
    required: true
  },
  roomCapacity: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  }
});

const studentPersonalSchema = new mongoose.Schema({
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
  allocatedRoom: {
    type: ObjectIDDataType,
    required: true
  }
});

const studentAcademicSchema = new mongoose.Schema({
  studentID: {
    type: ObjectIDDataType,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseAdmissionMonth: {
    type: String,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    default: 'June',
    required: true
  },
  courseAdmissionYear: {
    type: String,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    default: 'June',
    required: true
  },
  coursePassoutMonth: {
    type: String,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    default: 'June',
    required: true
  },
  coursePassoutYear: {
    type: String,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    default: 'May',
    required: true
  }
});

const studentContactSchema = new mongoose.Schema({
  studentID: {
    type: ObjectIDDataType,
    required: true
  },
  primaryEmail: {
    type: String,
    required: true
  },
  secondaryEmail: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  }
});

const adminModel = mongoose.model("admins", adminAndRectorSchema);
const rectorModel = mongoose.model("rectors", adminAndRectorSchema);
const hostelModel = mongoose.model("hostels", hostelSchema);
const floorModel = mongoose.model("floors", floorSchema);
const roomModel = mongoose.model("rooms", roomSchema);
const studentPersonalModel = mongoose.model("studentPersonal", studentPersonalSchema);
const studentAcademicModel = mongoose.model("studentAcademic", studentAcademicSchema);
const studentContactModel = mongoose.model("studentContact", studentContactSchema)

const userModel = mongoose.model('users', userSch);

module.exports = { 
  userModel,
  adminModel,
  rectorModel,
  hostelModel,
  floorModel,
  roomModel,
  studentPersonalModel,
  studentAcademicModel,
  studentContactModel
}
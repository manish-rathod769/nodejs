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
  hostelCode: {
    type: Number,
    required: true
  }
});

const floorSchema = new mongoose.Schema({
  floorCode: {
    type: Number,
    required: true
  },
  hostelCode : {
    type: Number,
    required: true
  }
});


const roomSchema = new mongoose.Schema({
  roomCode: {
    type: Number,
    required: true
  },
  floorCode: {
    type: Number,
    required: true
  },
  roomCapacity: {
    type: Number,
    required: true,
    min: 1
  }
});

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
const studentModel = mongoose.model("students", studentSchema);
// const studentContactModel = mongoose.model("studentContact", studentContactSchema)

const userModel = mongoose.model('users', userSch);

module.exports = { 
  userModel,
  adminModel,
  rectorModel,
  hostelModel,
  floorModel,
  roomModel,
  studentModel
  // studentContactModel
}
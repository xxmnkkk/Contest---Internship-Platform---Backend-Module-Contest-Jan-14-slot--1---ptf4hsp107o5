const mongoose = require('mongoose');
const Notification = require('../models/Notification');

const internshipSchema = new mongoose.Schema({
  // studentId: MongoDB ObjectId referencing the student applying for the internship.
   studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Assuming there is a 'Student' model
    required: true
  },
  // company: Name of the company providing the internship.
  company: {
    type: String,
    required: true
  },
  // position: Internship position or role.
  position: {
    type: String,
    required: true
  },
  // status: Current status of the internship (Pending, Approved, Rejected).
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});

// Mongoose Hook for sending notifications on internship approval
internshipSchema.post('findOneAndUpdate', async function (doc, next) {
  try {
    // post('findOneAndUpdate'): Hook triggered after an internship is updated. It sends a notification when the internship status is changed to 'Approved'.
    const updatedInternship = await this.model.findOne({_id: result._id});

    if (updatedInternship.status === 'Approved') {
      const notification = new Notification({
      });

      await notification.save();
    }
  } catch (error) {
    console.error('Error sending internship approval notification:', error);
    next(error);
  }
});

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;

const Internship = require('../models/Internship');
const Student = require('../models/Student');

exports.applyForInternship = async (req, res) => {
  try {
    // TODO: Extract necessary details from the request body (studentId, position, company)
    const { studentId, position, company } = req.body;
    // TODO: Check if the student with the given studentId exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // TODO: Create a new Internship instance with the provided details and 'Pending' status
    const internship = new Internship({
      studentId,
      position,
      company,
      status: 'Pending',
    });
    // TODO: Save the new Internship instance to the database
    await internship.save();
    // TODO: Respond with a success message and the created internship

    res.status(201).json({
      message: 'Internship application submitted successfully',
      internship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.approveInternship = async (req, res) => {
  try {
    // TODO: Extract the internshipId from the request parameters
    const { internshipId } = req.params;
    // TODO: Update the status of the internship with the given internshipId to 'Approved'
    const updatedInternship = await Internship.findByIdAndUpdate(
      internshipId,
      { status: 'Approved' },
      { new: true }
    );

    // TODO: Check if the internship was found and updated successfully
    if (!updatedInternship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // TODO: Respond with a success message and the updated internship
    res.status(201).json({
      message: 'Internship approved successfully',
      internship: updatedInternship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

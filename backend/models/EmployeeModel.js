const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    MobileNo: { type: Number, required: true, unique: true },
    Designation: { type: String, required: true },
    Gender: { type: String, required: true },
    Course: { type: [String], required: true },
    Image: { type: String, required: false }, // Make sure it's not `required: true` if using a URL
    Date: { type: String, required: true }
});

const employeemodel = mongoose.model('Employee', EmployeeSchema);
module.exports = employeemodel;

const employeemodel = require('../models/EmployeeModel');
const validator = require('validator');


const employeedata = async (req, res) => {
    console.log('Raw Request Body:', req.body);
    console.log('File:', req.file);
  
    try {
        const { Name, Email, MobileNo, Designation, Gender, Course } = req.body;

        if (!Name || !Email || !MobileNo || !Designation || !Gender || !Course) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
  
        // Parse the Course string to JSON if needed
        const parsedCourse = JSON.parse(Course);
        console.log('Parsed Course:', parsedCourse);
  
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }
  
        const Image = req.file.filename;

        // Validate Email format
        if (!validator.isEmail(Email)) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        // Check if an employee with the same email already exists in the database
        const exist = await employeemodel.findOne({ Email: new RegExp(`^${Email}$`, 'i') }); // Case-insensitive check
  
        if (exist) {
            return res.status(400).json({ message: 'Employee already exists' });
        }
  
        // Create a new employee document
        const newEmployee = new employeemodel({
            Name,
            Email,
            MobileNo,
            Designation,
            Gender,
            Course: parsedCourse,
            Image,
            Date: new Date().toISOString()
        });

        // Save the new employee to the database
        await newEmployee.save();
        return res.status(201).json({ success:true,message: 'Employee added successfully', employee: newEmployee });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ success: false, message: 'Failed to add employee', error: err.message });
    }
};
const employeelist=async(req, res) => {
        try {
            const employees = await employeemodel.find({});
            res.json({ success: true, data: employees });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "Error fetching employees" });
        }
    };
    
module.exports = {employeedata,employeelist};
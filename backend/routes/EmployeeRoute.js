const {employeedata,employeelist}=require('../controllers/EmployeeController');
const mongoose = require('mongoose');

const express=require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeemodel = require('../models/EmployeeModel');
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/addemployee', upload.single('Image'), employeedata);
router.get('/getemployee',employeelist);
router.get('/getemployee/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId (for MongoDB)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const employee = await employeemodel.findById(id);

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
});

router.delete('/deleteemployee/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEmployee = await employeemodel.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
  
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
router.put('/editemployee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if the employee ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    // Update the employee details
    const updatedEmployee = await employeemodel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ success: true, message: 'Employee updated successfully', data: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports=router;

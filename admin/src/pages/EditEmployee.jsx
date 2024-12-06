import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditEmployee.css'; // Include your custom CSS if needed

const EditEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    MobileNo: '',
    Designation: '',
    Gender: '',
    Course: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the employee data by ID to populate the form
    axios.get(`http://localhost:4000/api/getemployee/${id}`)
      .then(response => {
        if (response.data.success) {
          const data = response.data.data;
          setEmployee(data);
          setFormData({
            Name: data.Name || '',
            Email: data.Email || '',
            MobileNo: data.MobileNo || '',
            Designation: data.Designation || '',
            Gender: data.Gender || '',
            Course: data.Course ? data.Course.join(", ") : '' // Ensure this matches the expected format
          });
        } else {
          console.error("Error fetching employee details");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      Gender: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/editemployee/${id}`, {
      Name: formData.Name,
      Email: formData.Email,
      MobileNo: formData.MobileNo,
      Designation: formData.Designation,
      Gender: formData.Gender,
      Course: formData.Course.split(",").map(course => course.trim())
    })
    .then(response => {
      if (response.data.success) {
        alert('Employee updated successfully');
        navigate('/employeedetails');
      } else {
        alert('Failed to update employee');
      }
    })
    .catch(error => {
      console.error("Error updating employee:", error);
      alert('Error updating employee');
    });
  };

  if (!employee) {
    return <div className="loading-message">Loading...</div>; // Display loading message while data is being fetched
  }

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit} className='edit-employee-form'>
        <div className="form-field">
          <label>Name:</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Mobile No:</label>
          <input type="text" name="MobileNo" value={formData.MobileNo} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Designation:</label>
          <select name="Designation" value={formData.Designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-field">
          <label>Gender:</label>
          <div className="gender-options">
            <label>
              <input type="radio" name="Gender" value="Male" checked={formData.Gender === 'Male'} onChange={handleGenderChange} /> Male
            </label>
            <label>
              <input type="radio" name="Gender" value="Female" checked={formData.Gender === 'Female'} onChange={handleGenderChange} /> Female
            </label>
            <label>
              <input type="radio" name="Gender" value="Other" checked={formData.Gender === 'Other'} onChange={handleGenderChange} /> Other
            </label>
          </div>
        </div>
        <div className="form-field">
          <label>Course:</label>
          <input type="text" name="Course" value={formData.Course} onChange={handleChange} />
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;

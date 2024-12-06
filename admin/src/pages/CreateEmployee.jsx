import React, { useState } from 'react';
import '../styles/CreateEmployee.css';
import Navbar from '../pages/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateEmployee = () => {
  const navigate=useNavigate();
  const [data, setData] = useState({
    Name: "",
    Email: "",
    MobileNo: "",
    Designation: "",
    Gender: "",
    Course: [],
    Image: null
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onFileChangeHandler = (e) => {
    setData((prevData) => ({ ...prevData, Image: e.target.files[0] }));
  };

  const onCheckboxChangeHandler = (e) => {
    const { name, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      Course: checked
        ? [...prevData.Course, name]
        : prevData.Course.filter((course) => course !== name)
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('Email', data.Email);
    formData.append('MobileNo', data.MobileNo);
    formData.append('Designation', data.Designation);
    formData.append('Gender', data.Gender);
    formData.append('Course', JSON.stringify(data.Course));
    formData.append('Image', data.Image);
  
    console.log('Form Data before submission:', data);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/addemployee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Debug log to confirm response structure
      console.log('Response data:', response.data);
  
      if (response.data.success) {
        console.log('Employee added successfully:', response.data);
        alert('Employee added successfully!');
        setData({
            Name: "",
            Email: "",
            MobileNo: "",
            Designation: "",
            Gender: "",
            Course: []
          });
          setData((prevData) => ({ ...prevData, Image: null }));
          document.querySelectorAll('input[type="radio"]:checked').forEach((radio) => radio.checked = false);
          document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => checkbox.checked = false);
          navigate('/employeedetails')
        } else {
        console.log('Error: Response success flag not set.');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('An error occurred. Please try again.');
    }
  };
  
  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: 'center', paddingTop: '20px', color: '#1a2a3e' }}>Create Employee</h1>
      <div className="create-employee">
        <form onSubmit={submitHandler}>
          <div className="inputdata">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Employee Name"
              name="Name"
              onChange={onChangeHandler}
              value={data.Name}
            />
          </div>
          <div className="inputdata">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Employee Email"
              name="Email"
              onChange={onChangeHandler}
              value={data.Email}
            />
          </div>
          <div className="inputdata">
            <label>Mobile No:</label>
            <input
              type="number"
              placeholder="Employee Number"
              name="MobileNo"
              onChange={onChangeHandler}
              value={data.MobileNo}
            />
          </div>
          <div className="inputdata">
            <label>Designation:</label>
            <select name="Designation" value={data.Designation} onChange={onChangeHandler}>
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="inputdata">
            <label>Gender:</label>
            <div>
              <input
                type="radio"
                name="Gender"
                value="Male"
                onChange={onChangeHandler}
              /> Male
              <input
                type="radio"
                name="Gender"
                value="Female"
                onChange={onChangeHandler}
              /> Female
            </div>
          </div>
          <div className="inputdata">
            <label>Course:</label>
            <div>
              <input
                type="checkbox"
                name="MCA"
                onChange={onCheckboxChangeHandler}
              /> MCA
              <input
                type="checkbox"
                name="BCA"
                onChange={onCheckboxChangeHandler}
              /> BCA
              <input
                type="checkbox"
                name="BSC"
                onChange={onCheckboxChangeHandler}
              /> BSC
            </div>
          </div>
          <div className="inputdata">
            <label>Image Upload:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={onFileChangeHandler}
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEmployee;

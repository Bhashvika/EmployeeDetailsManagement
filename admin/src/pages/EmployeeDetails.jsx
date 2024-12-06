import React, { useState, useEffect } from 'react';
import '../styles/EmployeeList.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch employee data from the backend
    axios.get('http://localhost:4000/api/getemployee')
      .then(response => {
        if (response.data.success) {
          setEmployeeList(response.data.data);
          setTotalCount(response.data.data.length);
        } else {
          console.error("Error fetching employee list");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const filteredList = employeeList.filter(employee =>
        employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEmployeeList(filteredList);
    } else {
      // If the search term is empty, reset to full list
      setEmployeeList(employeeList);
    }
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      axios.delete(`http://localhost:4000/api/deleteemployee/${id}`)
        .then(response => {
          if (response.data.success) {
            alert('Employee deleted successfully');
            // Update the state to remove the deleted employee
            setEmployeeList(employeeList.filter(employee => employee._id !== id));
            setTotalCount(totalCount - 1);
          } else {
            alert('Failed to delete the employee');
          }
        })
        .catch(error => {
          console.error("Error deleting employee:", error);
          alert('Error deleting the employee');
        });
    }
  };
  return (
    <div className="employee-details">
      <Navbar />
      <div className="content">
        <h2>Employee List</h2>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <div className="stats">
          <h3>Total Employees: <span className="total-count">{totalCount}</span></h3>
          <Link to='/createemployee'><button className="create-btn">Create Employee</button></Link>
        </div>
        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td> {/* Auto-incrementing Unique ID */}
                  <td><img src={`http://localhost:4000/uploads/${employee.Image}`} alt={employee.Name} className="employee-image" /></td>
                  <td>{employee.Name}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.MobileNo}</td>
                  <td>{employee.Designation}</td>
                  <td>{employee.Gender}</td>
                  <td>{employee.Course.join(", ")}</td>
                  <td>{new Date(employee.Date).toLocaleDateString()}</td>
                  <td style={{display:'flex',gap:'20px'}}>
                    <Link to={`/editemployee/${employee._id}`}><button>Edit</button></Link>
                    <button onClick={() => handleDelete(employee._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

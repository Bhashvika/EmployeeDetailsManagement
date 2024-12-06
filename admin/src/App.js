import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import EmployeeDetails from './pages/EmployeeDetails';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/home' element={<Home />}>
          </Route>
          <Route path='/employeedetails' element={<EmployeeDetails />} />
          <Route path='/createemployee' element={<CreateEmployee />} />
          <Route path='/editemployee/:id' element={<EditEmployee/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

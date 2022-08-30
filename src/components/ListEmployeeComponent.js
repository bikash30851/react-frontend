import React from 'react'
import { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link } from 'react-router-dom'

const ListEmployeeComponent = () => {

  const [employees, setemployees] = useState([])

  useEffect(() => {
    getAllEmployees()

  }, [])

  const getAllEmployees = () => {
    EmployeeService.getAllEmployees().then((response) =>{
        setemployees(response.data);
        console.log(response.data);
    }).catch(error => {
        console.log(error)
    });
  }
  
  const deleteEmployee = (employeeId) => {
    EmployeeService.deleteEmployee(employeeId).then((response) => {
        getAllEmployees()
    }).catch(error => {
        console.log(error)
    })
  }

  return (
    <div className='container'>
        <h2 className='text-center'> Employee List </h2>
        <Link to="/add-employee" className='btn btn-primary mb-2'>Add Employee</Link> 
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Employee Id </th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map( 
                        employee => 
                            <tr key={employee.id}>
                                <td> {employee.id} </td>
                                <td> {employee.firstName} </td>
                                <td> {employee.lastName} </td>
                                <td> {employee.emailId} </td>
                                <td> 
                                    <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}> Update </Link>
                                    <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={() => deleteEmployee(employee.id)}> Delete </button>
                                    <Link className='btn btn-info' style={{marginLeft:"10px"}} to={`/view-employee/${employee.id}`}> View </Link>
                                </td>
                            </tr>
                        )   
                } 
            </tbody>
        </table>

    </div>
  )
}

export default ListEmployeeComponent
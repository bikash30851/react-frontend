import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import {Link, useParams} from 'react-router-dom'

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = {firstName, lastName, emailId}

    if(id){
        EmployeeService.updateEmployee(id, employee).then((response) => {
            navigate('/employees')
        }).catch(error => {
            console.log(error);
        })
    }
    else{
        EmployeeService.createEmployee(employee).then((response) => {
            console.log(response.data)
    
            navigate('/employees')
    
        }).catch(error => {
            console.log(error)
        })
    }
    

}

useEffect(() => {
  EmployeeService.getEmployeeById(id).then((response) => {
    setFirstName(response.data.firstName)
    setlastName(response.data.lastName)
    setEmailId(response.data.emailId)
  }).catch(error => {
    console.log(error)
  })
},[id])

const title = () => {
    if(id){
        return <h2 className='text-center'>Update Employee</h2>
    }else {
        return <h2 className='text-center'>Add Employee</h2>
    }

}

  return (
    <div>
        <br/><br/>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        title()
                    }
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>First Name: </label>

                                    <input 
                                        type="text" 
                                        placeholder='Enter First Name'
                                        name='firstName'
                                        className='form-control'
                                        defaultValue={firstName}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    > 
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name: </label>
                                    <input 
                                        type="text" 
                                        placeholder='Enter Last Name'
                                        name='lastName'
                                        className='form-control'
                                        defaultValue={lastName}
                                        onChange = {(e) => setlastName(e.target.value)}
                                    > 
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email Id: </label>
                                    <input 
                                        type="text" 
                                        placeholder='Enter Email Id'
                                        name='emailId'
                                        className='form-control'
                                        defaultValue={emailId}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                    > 
                                    </input>
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}> Submit </button>
                                <Link to='/employees' style={{marginLeft: "10px"}} className="btn btn-danger">cancel</Link>

                            </form>
                        </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent
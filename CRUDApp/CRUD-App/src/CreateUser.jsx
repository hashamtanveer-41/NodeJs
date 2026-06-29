import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateUser = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate();
    const SubmitHandler= (e)=>{
        e.preventDefault();
        axios.post(
            "http://localhost:3000/createUser",
            {name: name, email: email, age: age})
            .then(result => {
                console.log(result)
                navigate("/")
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={SubmitHandler}>
                    <h2>Add user</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter Email" className="form-control"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" onChange={(e)=>setAge(e.target.value)} placeholder="Enter Age" className="form-control"/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default CreateUser

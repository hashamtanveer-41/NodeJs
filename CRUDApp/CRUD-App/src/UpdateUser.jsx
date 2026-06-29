import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
    const {id} = useParams();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(
            `http://localhost:3000/getUser/${id}`,
            {name: name, email: email, age: age})
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
            })
            .catch(err => console.log(err))
    }, []);
    const UpdateHandler= (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:3000/updateUser/${id}`,{name, email, age})
            .then(result => {
                console.log(result)
                navigate("/")
            })
            .catch((err)=> console.log(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={UpdateHandler}>
                    <h2>Update user</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input value={name} type="text" placeholder="Enter Name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter Email" className="form-control"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Enter Age" className="form-control"/>
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateUser

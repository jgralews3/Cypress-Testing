import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import './Form.css';

function Form (){

    const defaultState = {
        name: "",
        email: "",
        password: "",
        terms: false
    }
    const [formState, setFormState] = React.useState(defaultState)
    const [errors, setErrors] = React.useState({...defaultState, terms: ""})
    const [buttonDisabler, setDisabler] = React.useState(true);
    const [users, setUsers] = React.useState([]);

    const formSchema = yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        email: yup.string().required("Please Enter Email").email("Not a valid email"),
        password: yup.string().required("Please Enter Password").min(6, "Password must be at least 6 characters"),
        terms: yup.boolean().oneOf([true], "Please accept Terms and Conditions")
    })

    const validateChange = e => {
    e.persist();
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid =>
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      )
      .catch(error =>
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0]
        })
      );}

    const changeHandler = (e)=>{
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setFormState (
            {...formState, [e.target.name]: value}
        )
        validateChange(e);
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log("submitted");
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setUsers([...users, res.data])
            console.log(res.data)
          })
          .catch(err => console.log(err));
      };

    React.useEffect(()=>{
        formSchema.isValid(formState).then(valid => setDisabler(!valid));
    }, [formState])

    console.log(users);
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name:<input type="text" name="name" onChange={changeHandler} placeholder="Name"></input>
                {errors.length !== 0 && <p>{errors.name}</p>}
                </label>
                <label htmlFor="email">Email:<input type="text" name="email" onChange={changeHandler} placeholder="Email"></input>
                {errors.length !== 0 && <p>{errors.email}</p>}</label>
                <label htmlFor="password">Password:<input type="password" name="password" onChange={changeHandler} placeholder="Password"></input>
                {errors.length !== 0 && <p>{errors.password}</p>}</label>
                <label htmlFor="terms">I have read Terms and Conditions:<input type="checkbox" id="terms" name="terms" onChange={changeHandler}></input></label>
                <button disabled={buttonDisabler}>Submit</button>
            </form>
            {users.length !== 0 && <p id="output">{JSON.stringify(users, null, 2)}</p>}
            {/* create a map */}
            {/* {users.length !== 0 && <pre>Name: {JSON.stringify(users[0].name)}</pre>}
            {users.length !== 0 && <pre>Email: {JSON.stringify(users[0].email)}</pre>}
            {users.length !== 0 && <pre>Password: {JSON.stringify(users[0].password)}</pre>} */}
        </div>
    )
}

export default Form
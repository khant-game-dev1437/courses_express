import React, { Component, useState } from 'react';
import Bootstrap from 'bootstrap/js/dist/button';
import axois from 'axios';

class Credentials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: "",
            user_password: "",
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    async postAjax() {
       axois.post('http://localhost:8000/api/register', this.state)
       .then(response => {
           console.log("response postAjax : ", response);
       })
       .catch(error => {
        console.log("Error in postAjax : " ,error);
       });
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.postAjax();
    }
    credentialsForm() {
        const {user_email, user_password} = this.state;
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    Email: 
                    <br></br>
                    <input type= "email" name="user_email" value={user_email} onChange={this.handleChange} placeholder="Enter Email"></input>
                </label>
                <br></br>
                <label>
                    Password:
                    <br></br>
                    <input type="password" name="user_password"  value={user_password} onChange={this.handleChange} placeholder="Enter Password"></input>
                </label>
                <br></br>
                <button className="btn btn-light" type ='submit'  onClick={this.handleSubmit} placeholder="Click"></button>
            </form>
        )
    }
    render() { 
        return <div>{this.credentialsForm()}</div>;
    }
}



export default Credentials;
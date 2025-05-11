import React, { Component } from 'react'
import axios from 'axios';


class Login extends Component {

  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
      errors:{}
    };

    // binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user);
    
  }

  render() {
    return (
      <div>
        <section className="container">
            {/* <!-- Alert --> */}
            {/* <div className="alert alert-danger">
              Invalid Credentials
            </div> */}

            <h1 className="large text-primary">
              Sign In
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>

            <form  className="form" onSubmit={this.onSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  value={this.state.email}
                  placeholder="Email Address" 
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  value={this.state.password}
                  onChange={this.onChange}  
                />
              </div>
              <input type="submit" value="Login" className="btn btn-primary" />
            </form>

            <p className="my-1">
              Don't have an account? <a href="register.html">Sign Up</a>
            </p>
        </section>
      </div>
    )
  }
}

export default  Login;
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    console.log(newUser);
    
  }

  render() {
    return (
      <div>
        <section className="container">
          <h1 className="large text-primary">
            Sign Up
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={this.onSubmit}>
              {/* name */}
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Name" 
                  name="name"
                  value={this.state.name} 
                  onChange={this.onChange}              
                />
              </div>

              {/* email */}
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={this.state.email} 
                  onChange={this.onChange}
                />
                <small className="form-text">
                  This site uses Gravatar, so if you want a profile image, use a Gravatar email.
                </small>
              </div>

              {/* password */}
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.onChange}
                />
              </div>

              {/* confirm password */}
              <div className="form-group">
                <input 
                  type="password"
                  placeholder="Confirm Password"  
                  name="password2" 
                  value={this.state.password2} 
                  onChange={this.onChange}
                />
              </div>

              {/* submit button */}
              <input 
                type="submit" 
                value="Register" 
                className="btn btn-primary" 
              />
            </form>
          <p className="my-1">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </section>
      </div>
    )
  }
}

export default  Register;
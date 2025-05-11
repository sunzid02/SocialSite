import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

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

    axios.post('/api/users/register', newUser)
      .then(res => console.log(res.data) )
      .catch(err => this.setState({errors: err.response.data }))
    
  }

  render() {

    // const errors = this.state.errors; same thing
    const { errors } = this.state;



    return (
      <div>
        <section className="container">
          <h1 className="large text-primary">
            Sign Up
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" noValidate onSubmit={this.onSubmit}>
              {/* name */}
              <div className="form-group">
                <input 
                  type="text" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                  })}
                  placeholder="Name" 
                  name="name"
                  value={this.state.name} 
                  onChange={this.onChange}              
                />
                {errors.name && (<div className="invalid-feedback"> {errors.name} </div>) }
              </div>

              {/* email */}
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  placeholder="Email Address" 
                  value={this.state.email} 
                  onChange={this.onChange}
                />
                {errors.email && (<div className="invalid-feedback"> {errors.email} </div>) }
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
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}                  
                  value={this.state.password} 
                  onChange={this.onChange}
                />
                {errors.password && (<div className="invalid-feedback"> {errors.password} </div>) }
              </div>

              {/* confirm password */}
              <div className="form-group">
                <input 
                  type="password"
                  placeholder="Confirm Password"  
                  name="password2" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2
                  })}                     
                  value={this.state.password2} 
                  onChange={this.onChange}
                />
                {errors.password2 && (<div className="invalid-feedback"> {errors.password2} </div>) }

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
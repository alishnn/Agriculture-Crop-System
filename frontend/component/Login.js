import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/AuthService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }
    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
      handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.login(this.state.username, this.state.password).then(
            () => {
              this.props.history.push("/profile");
              window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        } else {
          this.setState({
            loading: false
          });
        }
      }
    
      render() {
        return (
         
          <div className="col-md-12" >
            <div className="card card-container" style={{background:"grey",borderRadius:"25px"}}>
              

              <img 
                src="https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/agriculture_20210913_1643808325.jpg"
                alt="profile-img"
                className="profile-img-card"
              />
              <div className="header">
                <h1>Login</h1>
                </div>
              
              <Form 
                onSubmit={this.handleLogin}
                ref={c => {
                  this.form = c;
                }}
              >
    
                <div className="form-group" >
                  <label htmlFor="username" style={{color:"white"}}>Username:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="password" style={{color:"white"}}>Password:</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                  />
                </div>
                <br></br>
    
                <div className="form-group" >
                  <center><button
                    className="btn btn-light btn-block"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button></center>
                </div>
    
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
              </div>
            </div>
        
        );
      }
    }

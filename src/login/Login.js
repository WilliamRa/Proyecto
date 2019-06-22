import React, { Component } from 'react';
import './../css/login.css';
import { connect } from 'react-redux';
import { loginUser } from '../actions/insert';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleLogin = (value) => {
    if (!value.email) {
      document.getElementById("email").innerHTML = "Necesita un Email";
    } else if (!value.password) {
      document.getElementById("pass").innerHTML = "Necesita un Contraseña";
    } else {
      this.props.loginUser(value, (user) => {
        if (user.code) {
          switch (user.code) {
            case "auth/wrong-password":
              document.getElementById("pass").innerHTML = "Contraseña Incorrecto";
              break;

            case "auth/user-not-found":
              document.getElementById("email").innerHTML = "Email Incorrecto";
              break;

            case "auth/invalid-email":
              document.getElementById("email").innerHTML = "Formato del Email Invalido";
              break;

            default:
              break;
          }
        } else {
          this.props.history.push('/chat');
        }
      })
    }
  }

  handleclick = () => {
    this.props.history.push('/Register');
  }

  render() {
    return (
      <Grid container className="constainer">
        <Grid item sm={12} xs={12}>
          <div className="form">
            <form>
              <div>
                <h1>Usuario</h1>
              </div>

              <div className="login">
                <TextField
                  required
                  type="email"
                  className="email"
                  onChange={(event) => this.setState({ email: event.target.value })}
                  label="Email"
                  margin="normal"
                />
              </div>
              <h6 id="email"></h6>

              <div className="login">
                <TextField
                  required
                  type="password"
                  className="pass"
                  onChange={(event) => this.setState({ password: event.target.value })}
                  label="Password"
                  margin="normal"
                />
                <h6 id="pass"></h6>
              </div>
            </form>
            <button className="ingresar"
              onClick={() => this.handleLogin(this.state)}
            >Ingresar</button>
            <button className="registrar" onClick={this.handleclick}>Registrar</button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.sessionReducer.currentUser
})

export default connect(mapStateToProps, { loginUser })(Login);
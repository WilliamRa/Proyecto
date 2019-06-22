import React, { Component } from 'react';
import './../css/register.css';
import { connect } from 'react-redux';
import { Registro } from './../actions/insert'
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordRepeat: ""
    }
  }

  handleClick = () => {
    this.props.history.goBack()
  }

  handle = (event) => {
    event.preventDefault();
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const PassRex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (this.state.username.length === 0) {
      document.getElementById("user").innerHTML = "Necesita un Nombre de Usuario";
    } else if (!regex.exec(this.state.email)) {
      document.getElementById("email").innerHTML = "Email Invalido"
    } else if (this.state.password.length === 0) {
      document.getElementById("pass").innerHTML = "Ingrese Contraseña"
    } else if (!PassRex.test(this.state.password)) {
      document.getElementById("pass").innerHTML = "La contraseña debe ser minimo 8 caracteres y contener una letra"
    } else if (this.state.passwordRepeat !== this.state.password) {
      document.getElementById("passRe").innerHTML = "Contraseña incorrecta";
    } else if (this.state.email.length === 0) {
      document.getElementById("email").innerHTML = "Se necesita un Correo";
    } else {
      this.props.Registro(this.state, () => {
        this.props.history.push("/")
      })
    }
  }

  render() {
    return (

      <Grid container className="constainer">
        <Grid item sm={12} xs={12}>
          <div className="form-register">
            <form>
              <div className="h1">
                <h1>Registro</h1>
              </div >

              <div className="input">
                <TextField type="text"
                  label="Nombre de Usuario"
                  onChange={(event) => this.setState({ username: event.target.value })}
                  required />
              </div>
              <h6 id="user"></h6>

              <div className="input">
                <TextField type="email"
                  label="Email"
                  onChange={(event) => this.setState({ email: event.target.value })}
                  required />
              </div>
              <h6 id="email"></h6>

              <div className="input">
                <TextField type="password"
                  label="Password"
                  onChange={(event) => this.setState({ password: event.target.value })}
                  required />
              </div>
              <h6 id="pass"></h6>

              <div className="input">
                <TextField type="password"
                  label="Confirmar Contraseña"
                  onChange={(event) => this.setState({ passwordRepeat: event.target.value })}
                  required />
              </div>
              <h6 id="passRe"></h6>

              <button className="Register" onClick={this.handle}>Registrar</button>
              <button className="atras" onClick={this.handleClick}>Atras</button>
            </form>
          </div>
        </Grid>
      </Grid>

    );
  }
}


export default connect(null, { Registro })(Register);
import React, { Component } from 'react';
import { newPost, getPost } from '../actions/insert'
import { connect } from 'react-redux';
import Comentarios from './Comentarios';
import './../css/chat.css';
import { Redirect } from 'react-router';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textArea: ""
    }
  }

  componentDidMount = () => {
    this.props.getPost()
  }

  action = (values, id, name) => {
    this.props.newPost(values, id, name)
    document.getElementById("txt").value = ""
  }

  render() {
    if (this.props.session) {
      const { id, name } = this.props.session;
      return (
        <Grid container className="container-chat" spacing={2}>
          <Grid item xs={12}>
            <h2>Bienvenido {this.props.session.name}</h2>
              <form>
                <div className="form-text">
                  <TextField
                    id="txt"
                    label="Ingrese Nuevo Post"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    rowsMax={4}
                    onChange={(event) => this.setState({ textArea: event.target.value })}
                  />
                </div>
              </form>
              <div className="cont-button">
                <Button variant="contained" className="theme"
                  onClick={() => this.action(this.state.textArea, id, name)}
                  disabled={!this.state.textArea}>Publicar</Button>
              </div>

              <div className="chat">
                {
                  this.props.post.map((message, key) => {
                    return <Comentarios message={message} key={key} />
                  })
                }
              </div>
          </Grid>
        </Grid >
      );
    } else {
      return (
        <div className="">
          <Redirect to="/" />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  post: state.postReducer.array,
  session: state.sessionReducer.currentUser

})






export default connect(mapStateToProps, { newPost, getPost })(Chat); 
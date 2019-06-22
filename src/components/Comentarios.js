import React, { Component } from 'react';
import './../css/chat.css';
import { connect } from 'react-redux';
import { Delete, editPost, likesPost, disLikePost } from '../actions/insert';
import './../css/chat.css';
import { ThumbUpAltOutlined, ThumbUp } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


class Comentarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMe: false,
      textArea: "",
      liked: false,
    }
  }

  handleEliminar = (id) => {
    const confirmar = window.confirm("Este Post sera eliminado ¿Quiere Continuar?")
    if (confirmar === true) {
      this.props.Delete(id)
    }
  }

  handleShow = () => {
    this.setState({
      showMe: true
    })
  }

  handleEdit = (message, id, userID, name) => {
    this.setState({
      showMe: false
    })
    this.props.editPost(message, id, userID, name);
  }

  handleCancel = () => {
    this.setState({
      showMe: false
    })
  }

  handleLike = (id, like, userID) => {
    this.props.likesPost(id, like, userID)
  }

  getIcon = (like, id) => {
    const resultLike = like ? like.find((ele) => { return ele === id }) : undefined
    return resultLike
  }

  handleDislike = (userID, like, id) => {
    this.props.disLikePost(userID, like, id)
  }

  render() {
    const { name } = this.props.session;
    const { message, username, id, like } = this.props.message
    const userID = this.props.session.id;
    const resultLike = this.getIcon(like, userID)

    return (
      <Grid className="comentarios" direction="column" container>
        <div>
          {this.state.showMe ? null : <p>{message}</p>}
          {
            this.state.showMe ?
              <div >
                <form>
                  <div className="form-text">
                    <TextField
                      className="edit-chat"
                      fullWidth
                      multiline
                      rows={3}
                      rowsMax={4}
                      onChange={(event) => this.setState({ textArea: event.target.value })}
                      defaultValue={message}
                    />
                  </div>
                </form>

                <button onClick={() => this.handleEdit(this.state.textArea, id, userID, name)}
                  disabled={!this.state.textArea}
                  className="">Publicar</button>
                <button onClick={() => this.handleCancel()} className="">Cancelar</button>
              </div> : null
          }
        </div>
       
          <span> Autor:  {username}</span>
          <div className="prueba">
          {!like ? 0 : like.length}{!resultLike && <ThumbUpAltOutlined onClick={(event) => this.handleLike(id, like, userID)} />}
            {resultLike && <ThumbUp onClick={(event) => this.handleDislike(userID, like, id)} />}
          </div>

        {
          this.state.showMe ? null :
            <div>
              {this.props.session.name === username && <button onClick={() => this.handleEliminar(id)}>Eliminar</button>}
              {this.props.session.name === username && <button onClick={() => this.handleShow()}>Editar</button>}
            </div>
        }
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.sessionReducer.currentUser,
})

export default connect(mapStateToProps, { Delete, editPost, likesPost, disLikePost })(Comentarios);


// <Icon onClick={(event) => this.handleLike(id, like,userID )} ></Icon>
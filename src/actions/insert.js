import Firebase from '../firebase/firebase'

const firebase = new Firebase()

export const newPost = (message, id, name) => dispatch => {
  firebase.newPost(message, id, name)
}

export const getPost = () => dispatch => {
  firebase.getPost((res) => {
    dispatch({
      type: "GET_POST",
      payload: res
    })
  })
}

export const loginUser = (user, cb) => dispatch => {
  firebase.loginUser(user, cb, (user) => {
    dispatch({
      type: "SESSION_UPDATE",
      payload: user
    })
  })
}

export const Registro = (user, cb) => (dispatch) => {
  firebase.registerUser(user, cb, (user) => {
    dispatch({
      type: "REGISTER_USER",
      payload: user,
    });
  })
};

export const Delete = (id) => (dispatch) => {
  firebase.deletePost(id, (id) => {
    dispatch({
      type: "DELETE",
      payload: id
    })
  })
}

export const editPost = (message, id, userID, name) => (dispatch) => {
  firebase.editPost(message, id, userID, name)
}

export const likesPost = (id, like, userID) => (dispatch) => {
  firebase.likePost(id, like, userID, (userID) => {
    dispatch({
      type: "LIKE",
      payload: userID
    })
  })
}

export const disLikePost = (userID, like, id) => dispatch => {
  firebase.disLikePost(userID, like, id)
}


import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDbQRAJWLCQslRqh3DgMiBzXIZw4j4UiOM",
  authDomain: "react-7b2a0.firebaseapp.com",
  databaseURL: "https://react-7b2a0.firebaseio.com",
  projectId: "react-7b2a0",
  storageBucket: "",
  messagingSenderId: "861680923827",
  appId: "1:861680923827:web:24c9a031bb3f54a6"
};

firebase.initializeApp(firebaseConfig);
const users = firebase.database().ref('users');
const post = firebase.database().ref('post');
const auth = firebase.auth();

export default class Firebase {

  newPost = (message, id, name) => {
    post.push({
      message: message,
      userID: id,
      like: [],
      username: name
    })
  }

  getPost = (callback) => {
    post.on('value', (post) => {
      try {
        const Post = post.val();
        const key = Object.keys(Post);
        const cleanArray = []
        key.map((keys) => {
          cleanArray.push({
            ...Post[keys], id: keys
          })
        })
        callback(cleanArray)
      } catch (err) {
        callback([])
      }
    });
  }

  registerUser = (values, cb) => {
    auth.createUserWithEmailAndPassword(values.email, values.password).then(
      (data) => {
        const user = {
          name: values.username,
          email: values.email,
          id: data.user.uid
        }
        users.child(data.user.uid).set({
          ...user,
        })
        cb();
      }
    ).catch(error => {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert(error.message)
          break;
        default:
          break;
      }
    })
  }

  loginUser = (value, cb, callback) => {
    auth.signInWithEmailAndPassword(value.email, value.password).then(data => {
      users.child(data.user.uid).once('value')
        .then(user => {
          const dataUser = user.val()
          callback(dataUser);
          cb(user)
          return user;
        })
    }).catch(error => {
      switch (error.code) {
        case "auth/wrong-password":
          cb(error)
          break;
        case "auth/user-not-found": 
          cb(error)
          break;
        
        case "auth/invalid-email":
          cb(error)
          break;
          
        default:
          break;
      }
    });
  };

  deletePost = (id) => {
    post.child(id).remove()
  }

  editPost = (message, id, userID, name) => {
    firebase.database().ref('post/' + id).update({
      message: message,
      userID: userID,
      username: name
    })
  }

  likePost = (id, like, userID, cb) => {
    if (!like) {
      firebase.database().ref('post/' + id + '/like/').set([userID])
      cb(true)
    } else {
      const clean = new Array();
      like.forEach(like => {
        clean.push(like, userID)
      })
      firebase.database().ref('post/' + id + '/like/').set(clean)
    }
  }

  disLikePost = (userID, like, id) => {
    for (var i = 0; i < like.length; i++) {
      if (like[i] === userID) {
        firebase.database().ref('post/' + id + `/like/${i}`).remove()
      }
    }
  }
}
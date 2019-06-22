
const initalState = {
  array: []
}

const postReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'GET_POST': {
      return { state, array: action.payload }
    }
    
    case 'DELETE':{
      return { state, array: action.payload }
    }

    default:
      return state;
  }
};

export default postReducer;
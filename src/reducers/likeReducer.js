const likeReducer = (state = {}, action) => {
	switch (action.type) {
    case "LIKE": {
    	console.log(action.payload)
      return { ...state,  like: action.payload };
    }

    default: {
      return state;
    }
  }
}

export default likeReducer;

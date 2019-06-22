
const initialState ={
  currentUser: null
}

export const sessionReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SESSION_UPDATE": {
      return { ...state, currentUser: action.payload };
    }

    case "REGISTER_USER": {
      return {...state, user: action.payload};
    }

    default: {
      return state;
    }
  }
};
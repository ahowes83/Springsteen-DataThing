const songsReducer = (state = [], action) => {
  console.log('in songsReducer', action.payload);
  switch (action.type) {
    case 'SET_SONGS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default songsReducer;

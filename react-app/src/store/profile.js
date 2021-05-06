const SELECTED_USER = 'SELECTED_USER';

const getInfo = (info) => ({
  type: SELECTED_USER,
  payload: info
})

export const profileInfo = (name) => async (dispatch) => {
  const res = await fetch(`/api/profiles/${name}`);
  const user = await res.json();
  if (res.ok) {
    await dispatch(getInfo(user));
  }
  else {
    throw res
  }
}

const initialState = {
  userDict: {
    id:'',
    email:'',
    clips:[],
    username:''
  }
}

export default function profileReducer(state = initialState, action) {
  switch(action.type) {
    case SELECTED_USER:
      const newState = { ...action.payload }
      return newState
    default:
      return state;
  }
}

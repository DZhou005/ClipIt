const ALL_CLIPS = 'ALL_CLIPS'

const getClips = (info) => ({
  type: ALL_CLIPS,
  payload: info
})

export const clipInfo = (id) => async (dispatch) => {
  const res = await fetch(`/api/clips/${id}`);
  const clip = await res.json();
  if (res.ok) {
    await dispatch(getClips(clip));
  }
  else {
    throw res
  }
}

const initialState = {
  clipDict: {
    id:'',
    title:'',
    description:'',
    clipUrl:'',
    user:[],
    createdAt:''
  }
}

export default function clipReducer(state = initialState, action) {
  switch(action.type) {
    case ALL_CLIPS:
      const newState = { ...action.payload }
      return newState
    default:
      return state;
  }
}

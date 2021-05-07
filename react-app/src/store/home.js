const ALL_CLIPS = 'ALL_CLIPS'

const getClips = (clip) => ({
  type: ALL_CLIPS,
  payload: clip
})


export const allClipInfo = () => async (dispatch) => {
  const res = await fetch(`/api/allClips/`)
  const clips = await res.json();
  if (res.ok) {
    dispatch(getClips(clips));
  }
  else {
    throw res
  }
}

const initialState = {
  clipDict:[]

}


export default function allClipReducer(state = initialState, action) {
  switch(action.type) {
    case ALL_CLIPS:
      const newState = { ...action.payload }
      return newState
    default:
      return state
  }
}

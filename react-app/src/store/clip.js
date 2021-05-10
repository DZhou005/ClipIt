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

export const likeClip = (userId, clipId) => async (dispatch) => {
  const res = await fetch(`/api/clips/${clipId}/like`, {
    method: "POST",
    userId,
    clipId
  })
  const data = await res.json()
}

export const commentOnClip = (userId, clipId, description) => async (dispatch) => {
  const res = await fetch(`/api/clips/${clipId}/comments`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      clipId,
      description,
    }),
  });
  const data = await res.json()
  return
}

export const unlikeClip = (clipId, likeId) => async dispatch => {
  const res = await fetch(`/api/clips/like/${likeId}`, {
    method: "DELETE",
    likeId,
    clipId,
  })
  const data = await res.json()
}

const initialState = {
  clipDict: {
    id:'',
    title:'',
    description:'',
    clipUrl:'',
    user:[],
    createdAt:'',
    likes:[]
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

const ALL_CLIPS = 'ALL_CLIPS'
const REMOVE_CLIP = 'REMOVE_CLIP'

const getClips = (info) => ({
  type: ALL_CLIPS,
  payload: info
})

const removeClip = () => {
  return {
    type: REMOVE_CLIP
  }
}

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
  return "liked"
}

export const commentOnClip = (userId, clipId, description, username) => async (dispatch) => {
  const res = await fetch(`/api/clips/${clipId}/comments`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      clipId,
      description,
      username,
    }),
  });
  const data = await res.json()
}

export const unlikeClip = (likeId) => async dispatch => {
  const res = await fetch(`/api/clips/like/${likeId}`, {
    method: "DELETE",
    likeId
  })
  const data = await res.json()
  return "unliked"
}

export const editClip = (id, title, description) => async dispatch => {
  const res = await fetch(`/api/clips/edit/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
  const data = await res.json()
}

export const deleteClip = (id) => async dispatch => {
  fetch(`/api/clips/delete/${id}`)
  dispatch(removeClip(id))

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

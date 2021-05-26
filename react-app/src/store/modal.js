const SHOW_EDIT = 'SHOW_EDIT'
const HIDE_EDIT = 'HIDE_EDIT'

export const showEdit = (commentId) => ({
  type: SHOW_EDIT,
  payload: commentId

})

export const hideEdit = (commentId) => ({
  type: HIDE_EDIT,
  payload: commentId
})

const initialState = {
  editForm: null
}


export default function modalReducer(state= initialState, action) {
  switch(action.type) {
    case SHOW_EDIT:
      return {...state, editForm: action.payload}
    case HIDE_EDIT:
      return {...state, editForm: null}
    default:
      return state;
  }
}

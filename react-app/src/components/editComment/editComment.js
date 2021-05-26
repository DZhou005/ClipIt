import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { clipInfo, editComment } from '../../store/clip';
import { hideEdit } from '../../store/modal'
import './editComment.css'

function EditComment({comment}) {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const comments = useSelector(state => state.clipReducer.commentDict)
  // const user = useSelector(state => state.session.user)
  const clip = useSelector(state => state.clipReducer.clipDict.id)
  const [description, setDescription] = useState(comment.description)


  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description)
    dispatch(editComment(comment.id,description))
    await dispatch(clipInfo(id))
    await dispatch(hideEdit(comment.id))
  }

  return (
    <div className='editContainer'>
      {/* {checkForInfo()} */}
      <h1 className="editTitle">Edit comment Here</h1>
      <form className='editForm' onSubmit={handleEdit}>
        Description
        <textarea
        type='text'
        className="editFormDescription"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <div className="editButtons">
          <button className="editFormSubmit" type="submit" onClick={handleEdit}>Submit</button>
        </div>
      </form>

    </div>

  )

}

export default EditComment

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { clipInfo, editClip } from '../../store/clip';
import './edit.css'


function Edit() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const user = useSelector(state => state.session.user)
  const clip = useSelector(state => state.clipReducer.clipDict)
  const [title, setTitle] = useState(clip?.title)
  const [description, setDescription] = useState(clip?.description)

  useEffect(() => {
    (async () => {
      await dispatch(clipInfo(id))
    })();
  },[dispatch]);


  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description)
    dispatch(editClip(id, title, description))
    await dispatch(clipInfo(id))
    history.push(`/clips/${id}`)
  }

  const checkForInfo = () => {
    if(title.length === 0 || description.length === 0 || user.id !== clip.user.id) {
      history.push(`/clips/${id}`)
    }
  }


  return (
    <div className='editContainer'>
      {checkForInfo()}
      <h1 className="editTitle">Edit Here</h1>
      <form className='editForm' onSubmit={handleEdit}>
        Title
        <textarea
        type='text'
        value={title}
        className="editFormTitle"
        onChange={(e) => setTitle(e.target.value)}
        />
        Description
        <textarea
        type='text'
        className="editFormDescription"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <div className="editButtons">
          <button className="editFormSubmit" type="submit" onClick={handleEdit}>Submit</button>
          <Link className="editFormCancel" to={`/clips/${id}`}>Cancel</Link>
        </div>
      </form>

    </div>

  )
}


export default Edit

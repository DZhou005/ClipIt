import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { clipInfo, likeClip, unlikeClip, commentOnClip} from '../../store/clip';
import './clip.css'


function Clip() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const clip = useSelector(state => state.clipReducer.clipDict)
  const user = useSelector(state => state.session.user)
  const userId = user.id
  const likesOnAClip = clip.likes
  const [description, setDescription] = useState('')


  useEffect(() => {
    (async () => {
      await dispatch(clipInfo(id))
    })();
  },[dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(commentOnClip(userId, id, description))
    setDescription('')
    dispatch(clipInfo(id))
  }


  const clipLike = async () => {
    dispatch(likeClip(userId, id))
  }

  const yourLike = () => {
    if (likesOnAClip.length > 0) {
      for (let i = 0; i < likesOnAClip.length; i++) {
        if(likesOnAClip[i].userId === userId) {
          return likesOnAClip[i].id
        }
        else {
          return null
        }
      }
    }
  }


  const unLikeClip = async () => {
    const likeId = yourLike();
    dispatch(unlikeClip(id, likeId))

  }

  const likeChecked = () => {
    if (likesOnAClip?.length > 0) {
      for (let i = 0; i < likesOnAClip.length; i++) {
        if(likesOnAClip[i].userId === userId) {
          return(
            <div className="fas fa-heart liked" onClick={unLikeClip}></div>

          )
        }
      }
    }
    else {
      return(
        <div className="far fa-heart like" onClick={clipLike}></div>
      )
    }
  }


  return (
    <div>
      <h2>{clip.title}</h2>
      <video src={clip.clipUrl} controls type="video/mp4"/>
      <h3>
        <Link to={`/profile/${clip.user?.username}`}>{clip.user?.username}</Link>: {clip.description}
      </h3>
      <h6>uploaded on:{clip.createAt}</h6>
      <div>
        {likeChecked()}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text"
        value={description}
        placeholder="comment"
        onChange={(e) => setDescription(e.target.value)}
         />
         <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default Clip

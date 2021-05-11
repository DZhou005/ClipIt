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
  const userId = user?.id
  const likesOnAClip = clip?.likes
  const username = user?.username
  const commentsArray = useSelector(state => state?.clipReducer?.commentDict)
  const [description, setDescription] = useState('')


  useEffect(() => {
    (async () => {
      await dispatch(clipInfo(id))
    })();
  },[dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(commentOnClip(userId, id, description, username))
    setDescription('')
    dispatch(clipInfo(id))
  }


  const clipLike = async () => {
    await dispatch(likeClip(userId, id))
    dispatch(clipInfo(id))
  }

  const yourLike = () => {
    if (likesOnAClip?.length > 0) {
      for (let i = 0; i < likesOnAClip.length; i++) {
        if(likesOnAClip[i].userId === userId) {
          return likesOnAClip[i].id
        }
      }
    }
  }


  const unLikeClip = async () => {
    const likeId = yourLike();
    dispatch(unlikeClip(likeId))
    dispatch(clipInfo(id))

  }

  const likeChecked = () => {
    if (likesOnAClip?.length > 0) {
      for (let i = 0; i < likesOnAClip?.length; i++) {
        if(likesOnAClip[i]?.userId === userId) {
          return(
            <div className="fas fa-heart liked" onClick={unLikeClip}></div>

          )
        }
      }
    }
      return(
        <div className="far fa-heart like" onClick={clipLike}></div>
       )
  }



  return (
    <div className="clipPageContainer">
      <h2 className='clipPageTitle'>{clip.title}</h2>
      <video className="clipVideo" src={clip.clipUrl} controls type="video/mp4"/>
      <h5>uploaded on:{clip.createAt}</h5>
      <h4 className="likesBtn">{likeChecked()}&nbsp;&nbsp;Likes: {likesOnAClip?.length}</h4>
      <div className="clipProfileLink">
        <Link className="clipDescriptionLink" to={`/profile/${clip.user?.username}`}>{clip.user?.username?.charAt(0).toUpperCase()}</Link> <Link className="clipUserUpload" to={`/profile/${clip.user?.username}`}>{clip.user?.username}:</Link>
      </div>
      <h4 className="clipDescription">
        {clip.description}
      </h4>
      <form onSubmit={handleSubmit}>
        <input type="text"
        className='commentBox'
        value={description}
        placeholder="write your comment here"
        onChange={(e) => setDescription(e.target.value)}
         />
        <button className="commentSubmit" type="submit">Submit</button>
      </form>
      <h3 className="clipComments">Comments</h3>
      <div>
        {commentsArray?.map((comment,i) => {
          return (
            <div key={i}>
              <Link className="clipCommentLink" to={`/profile/${comment.userName}`}>{comment.userName.charAt(0).toUpperCase()}</Link><Link className="clipUserUpload" to={`/profile/${comment.userName}`}>{comment.userName}:</Link> <h4 className="commentDescription">{comment.description}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default Clip

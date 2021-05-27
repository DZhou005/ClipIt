 import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory} from "react-router-dom";
import { clipInfo, likeClip, unlikeClip, commentOnClip, deleteClip, editComment, deleteComment } from '../../store/clip';
import { showEdit, hideEdit } from '../../store/modal'
import './clip.css'
import { Modal } from "../../context/modal"
import  EditComment from "../editComment/editComment"


function Clip() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const clip = useSelector(state => state.clipReducer.clipDict)
  const user = useSelector(state => state.session.user)
  const commentModal = useSelector(state => state.modalReducer.editForm)
  const userId = user?.id
  const likesOnAClip = clip?.likes
  const username = user?.username
  const commentsArray = useSelector(state => state?.clipReducer?.commentDict)
  const [description, setDescription] = useState('')
  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    (async () => {
      await dispatch(clipInfo(id))
    })();
  },[dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(commentOnClip(userId, id, description, username))
    setDescription('')
    dispatch(clipInfo(id))
  }

 async function asyncClipInfo (id,commentId) {
    await dispatch(deleteComment(commentId))
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

  const clipDeleteButton = async () => {
    dispatch(deleteClip(id))
    dispatch(clipInfo(id))
    history.push(`/`)
  }

  const unLikeClip = async () => {
    const likeId = yourLike();
    await dispatch(unlikeClip(likeId))
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

  const checkUser = () => {
    if(clip?.user?.id === user.id || user?.id === 2) {
      return (
        <div>
          <Link className="far fa-edit clipEditButton" to={`/edit/${id}`}></Link>
          <button className="far fa-trash-alt deleteButton" onClick={clipDeleteButton}></button>
        </div>

      )
    }
    else {
      return null
    }
  }

  const checkCommentUser = (commentUser, commentId) => {
    if(commentUser === userId || commentUser === 1) {
      return (
        <button className='far fa-trash-alt commentDeleteButton' onClick={() => asyncClipInfo(id,commentId)}></button>
      )
    }
  }

  const checkCommentEdit = (commentUser, commentId) => {
    if(commentUser === userId || commentUser === 1) {
      return (
        <button className='far fa-edit commentEditButton' onClick={() => dispatch(showEdit(commentId))}></button>
      )
    }
  }

  return (
    <div className="clipPageContainer">
      <h2 className='clipPageTitle'>{clip.title}</h2>
      {checkUser()}
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
      <div className='commentsContainer'>
        {commentsArray?.map((comment,i) => {
          return (
            <div className="commentButtons" key={i}>
              <Link className="clipCommentLink" to={`/profile/${comment.userName}`}>{comment.userName.charAt(0).toUpperCase()}</Link><Link className="clipUserUploadComment" to={`/profile/${comment.userName}`}>{comment.userName}:</Link> <h4 className="commentDescription">{comment.description}</h4>
              <div className="editAndDelete">
                {checkCommentEdit(comment?.userId, comment?.id)}
                {commentModal === comment.id &&
                  <Modal onClose={() => dispatch(hideEdit(comment.id))}>
                    <EditComment comment={comment}/>
                  </Modal>
                }
                {checkCommentUser(comment?.userId, comment?.id)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default Clip

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { clipInfo, likeClip, unlikeClip } from '../../store/clip';
import './clip.css'


function Clip() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const clip = useSelector(state => state.clipReducer.clipDict)
  const user = useSelector(state => state.session.user)
  const userId = user.id
  const likesOnAClip = clip.likes

  useEffect(() => {
    (async () => {
      await dispatch(clipInfo(id))
    })();
  },[dispatch]);


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
    dispatch(unlikeClip(likeId, id))

  }

  const likeChecked = () => {
    if (likesOnAClip.length > 0) {
      for (let i = 0; i < likesOnAClip.length; i++) {
        if(likesOnAClip[i].userId === userId) {
          return(
            <button onClick={unLikeClip}>unLike</button>

          )
        }
      }
    }
    else {
      return(
        <button onClick={clipLike}>Like</button>
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
    </div>
  )
}


export default Clip

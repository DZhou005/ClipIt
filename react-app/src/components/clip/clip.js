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
  const likesOnAClip = clip.like

  console.log(clip.likes,"likessssss")

  useEffect(() => {
    (async () => {
      await dispatch(clipInfo(id))
    })();
  },[dispatch]);


  const clipLike = async () => {
    dispatch(likeClip(userId, id))
  }

  const yourLike = () => {
   if(likesOnAClip.length) {likesOnAClip.map((like) => {
     if (like.userId === userId) {
      return like.id
        }
      })
    }
    else {
      return null;
    }
  }


  const unLikeClip = async () => {
    const likeId = yourLike();
    dispatch(unlikeClip(likeId, id))

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
        <button onClick={clipLike}>Like</button>
        <button onClick={unLikeClip}>unLike</button>

      </div>

    </div>
  )
}


export default Clip

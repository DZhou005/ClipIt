import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { clipInfo } from '../../store/clip';
import './clip.css'


function Clip() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const clip = useSelector(state => state.clipReducer.clipDict)


  useEffect(() => {
    (async () => {
      await dispatch(clipInfo(id))
    })();
  },[dispatch]);


  return (
    <div>
      <h2>{clip.title}</h2>
      <video src={clip.clipUrl} controls type="video/mp4"/>
      <h3>
        <Link to={`/profile/${clip.user.username}`}>{clip.user.username}</Link>: {clip.description}
      </h3>
      <h6>uploaded on:{clip.createAt}</h6>
    </div>
  )
}


export default Clip

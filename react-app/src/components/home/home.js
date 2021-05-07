import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allClipInfo } from '../../store/home';
import './home.css'

function AllClip() {
  const dispatch = useDispatch();
  const clipsArray = useSelector(state => state.allClipReducer.clipDict);
  console.log(clipsArray)

  useEffect(() => {
    (async () => {
      await dispatch(allClipInfo())
    })();
  },[dispatch]);


  return (
    <div className='homePageContainer'>
      <div className='homeInnerContainer'>
      <h2 className='homeTitle'>ClipIt Highlights!</h2>
      {console.log("HELLOOOOOOOOOOOO")}
       {clipsArray.length ? clipsArray.map((clip,i) => {
          return (
            <div className='thumbNails' key={i}>
              <Link to={`/clips/${clip.id}`}>
                <video className='homeThumbNails' src={clip.clipUrl}>
                </video>
                <h4 className="thumbTitle">{clip.title}</h4>
              </Link>
            </div>
          )
        })
         : null
      }
      </div>
    </div>

  )






}

export default AllClip

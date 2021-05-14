  import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allClipInfo } from '../../store/home';
import './home.css'

function AllClip() {
  const dispatch = useDispatch();
  const clipsArray = useSelector(state => state.allClipReducer.clipDict);
  const clips = useSelector(state => state.allClipReducer.clipDict);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    (async () => {
      await dispatch(allClipInfo())
    })();
  },[dispatch]);



  return (
    <div className='homePageContainer'>
      <input className="homeSearch" type='text' placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
      <div className='homeInnerContainer'>
        <h2 className='homeTitle'>Clip It Highlights!</h2>
        {clipsArray.length ? clipsArray.slice(0).reverse().filter((val) => {
          if(searchTerm === "") {
            return val
          }
          else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
        }).map((clip,i) => {
            return (
              <div className='thumbNails' key={i}>
                <Link className="thumbNaildescrip" to={`/clips/${clip.id}`}>
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

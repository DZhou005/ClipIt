import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { profileInfo } from '../../store/profile';
import './profile.css'

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();
  const allClipsArray = useSelector(state => state.profileReducer.userDict.clips);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      await dispatch(profileInfo(name))
    })();
  },[name, dispatch]);

  return (
    <div className='profileContainer'>
      <input className="profileSearch" type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
      <h1 className='profileTitle'>{name}'s clips</h1>
      {allClipsArray.slice(0).reverse().filter((val) => {
        if(searchTerm === "") {
          return val
        }
        else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      }).map((clip,i) => {
        return (
          <div key={i}>
            <Link className="profileThumbNailDesc" to={`/clips/${clip.id}`}>
              <video className='profileThumbNails' src={clip.clipUrl}>
              </video>
              <h4 className="profileThumbNailTitle">{clip.title}</h4>
            </Link>
          </div>
        )


      })}
    </div>
  );
}
export default Profile;

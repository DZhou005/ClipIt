import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { profileInfo } from '../../store/profile';
import './profile.css'

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(profileInfo(name))
    })();
  },[name, dispatch]);

  return (
    <h1>Hello</h1>
  );
}
export default Profile;

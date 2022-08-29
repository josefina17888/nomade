import React, { useEffect, useState }  from 'react';
import { getFeedback } from '../../Redux/Actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Status() {
    const dispatch = useDispatch();
    const feedback = useSelector((state) => state.feedback);
    console.log(feedback)

    useEffect(() => {
        dispatch(getFeedback());
      }, [dispatch]);


    const status = feedback.status
    

return (
<div>{status}</div>
)
}
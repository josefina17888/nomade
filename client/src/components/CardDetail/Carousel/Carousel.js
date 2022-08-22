import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from '../../../Redux/Actions';

export default function ControlledCarousel() {

const dispatch = useDispatch();
    
useEffect(() => {
      dispatch(getDetail(props.match.params._id))
}, [dispatch])

const myLodging = useSelector((state) => state.detail)
const picture1 = myLodging.picture[0]
const picture2 = myLodging.picture[1]
const picture3 = myLodging.picture[2]

const [index, setIndex] = useState(0);

const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };



  return (
    
    <Carousel activeIndex={index} onSelect={handleSelect}>
    
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={picture1}
          alt="First slide"
        />
      </Carousel.Item>
    
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={picture2}
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={picture3}
          alt="Third slide"
        />
      </Carousel.Item>

    </Carousel>
  );
}


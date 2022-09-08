import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from "./CarouselHome.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getLodgings } from "../../Redux/Actions/index";
import Card from "../Card/Card";

export default function TopRated() {
  const selector = useSelector((state) => state.allLodgings);
  const dispatch = useDispatch();
  const lodgingVisibility = selector.filter((e) => e.Visibility === true);

  useEffect(() => {
    dispatch(getLodgings());
  }, [dispatch]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomLodging1 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging2 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging3 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging4 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging5 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging6 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={style.containerTopRated}>

     <div className="d-flex w-100 pe-2 justify-content-center">

        <h2 className={style.tarifa}>Destacados</h2>
      </div>
      <Carousel
        className={style.carousel}
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 1s ease"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging1 ? `detail/${randomLodging1._id}` : ""}
          >
            <div className={style.containerImage}>
            <img
              className={style.imgCard}
              src={randomLodging1 ? randomLodging1.picture[0] : ""}
            ></img>
            </div>
            <h4 className={style.title}>
              {randomLodging1
                ? randomLodging1.city.charAt(0).toUpperCase() +
                  randomLodging1.city.substring(1)
                : ""}
              , {randomLodging1 ? randomLodging1.country : ""}
            </h4>
            <p className={style.parrafo}>
              ${randomLodging1 ? randomLodging1.price : ""}{" "}
              {randomLodging1 ? randomLodging1.currency : ""} noche
            </p>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging2 ? `detail/${randomLodging2._id}` : ""}
          >
            <div className={style.containerImage}>
            <img
              className={style.imgCard}
              src={randomLodging2 ? randomLodging2.picture[0] : ""}
            ></img>
            </div>
            <h4 className={style.title}>
              {randomLodging2
                ? randomLodging2.city.charAt(0).toUpperCase() +
                  randomLodging2.city.substring(1)
                : ""}
              , {randomLodging2 ? randomLodging2.country : ""}
            </h4>
            <p className={style.parrafo}>
              ${randomLodging2 ? randomLodging2.price : ""}{" "}
              {randomLodging2 ? randomLodging2.currency : ""} noche
            </p>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging3 ? `detail/${randomLodging3._id}` : ""}
          >
            <div className={style.containerImage}>
            <img
              className={style.imgCard}
              src={randomLodging3 ? randomLodging3.picture[0] : ""}
            ></img>
            </div>
            <h4 className={style.title}>
              {randomLodging3
                ? randomLodging3.city.charAt(0).toUpperCase() +
                  randomLodging3.city.substring(1)
                : ""}
              , {randomLodging3 ? randomLodging3.country : ""}
            </h4>
            <p className={style.parrafo}>
              ${randomLodging3 ? randomLodging3.price : ""}{" "}
              {randomLodging3 ? randomLodging3.currency : ""} noche
            </p>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging4 ? `detail/${randomLodging4._id}` : ""}
          >
            <div className={style.containerImage}>
            <img
              className={style.imgCard}
              src={randomLodging4 ? randomLodging4.picture[0] : ""}
            ></img>
            </div>
            <h4 className={style.title}>
              {randomLodging4
                ? randomLodging4.city.charAt(0).toUpperCase() +
                  randomLodging4.city.substring(1)
                : ""}
              , {randomLodging4 ? randomLodging4.country : ""}
            </h4>
            <p className={style.parrafo}>
              ${randomLodging4 ? randomLodging4.price : ""}{" "}
              {randomLodging4 ? randomLodging4.currency : ""} noche
            </p>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging5 ? `detail/${randomLodging5._id}` : ""}
          >
            <div className={style.containerImage}>
            <img
              className={style.imgCard}
              src={randomLodging5 ? randomLodging5.picture[0] : ""}
            ></img>
            </div>
            <h4 className={style.title}>
              {randomLodging5
                ? randomLodging5.city.charAt(0).toUpperCase() +
                  randomLodging5.city.substring(1)
                : ""}
              , {randomLodging5 ? randomLodging5.country : ""}
            </h4>
            <p className={style.parrafo}>
              ${randomLodging5 ? randomLodging5.price : ""}{" "}
              {randomLodging5 ? randomLodging5.currency : ""} noche
            </p>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging6 ? `detail/${randomLodging6._id}` : ""}
          >
            <div className={style.containerImage}>
            <img
              className={style.imgCard}
              src={randomLodging6 ? randomLodging6.picture[0] : ""}
            ></img>
            </div>
            <h4 className={style.title}>
              {randomLodging6
                ? randomLodging6.city.charAt(0).toUpperCase() +
                  randomLodging6.city.substring(1)
                : ""}
              , {randomLodging6 ? randomLodging6.country : ""}
            </h4>
            <p className={style.parrafo}>
              ${randomLodging6 ? randomLodging6.price : ""}{" "}
              {randomLodging6 ? randomLodging6.currency : ""} noche
            </p>
          </Link>
        </div>
      </Carousel>
    </div>
  );
}
